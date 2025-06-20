// ✅ Combined PostJob + Jobs Component Based on Role
import { useEffect, useState } from 'react';
import { postJob, fetchJobs, placeBid } from '../services/api';
import './PostJob.css';

export default function PostJobOrJobs() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', budget: '' });
  const [message, setMessage] = useState('');
  const [jobs, setJobs] = useState([]);
  const [bidAmount, setBidAmount] = useState('');
  const [bidMessage, setBidMessage] = useState('');
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user?.role === 'freelancer') {
      fetchJobs()
        .then(res => setJobs(res.data))
        .catch(err => console.error('Fetch jobs error', err));
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...form, clientId: user.id };
      await postJob(data);
      setMessage('✅ Job posted successfully!');
      setForm({ title: '', description: '', budget: '' });
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to post job.');
    }
  };

  const handlePlaceBid = async (jobId) => {
    if (!bidAmount.trim()) return alert('Enter bid amount');
    try {
      const data = {
        jobId,
        freelancerId: user?.id,
        bidAmount,
        message: bidMessage
      };
      await placeBid(data);
      alert('✅ Bid placed successfully!');
      setBidAmount('');
      setBidMessage('');
      setSelectedJobId(null);
    } catch (err) {
      alert('❌ Failed to place bid');
      console.error(err);
    }
  };

  if (!user) return <div className="postjob-wrapper">Loading...</div>;

  return (
    <div className="postjob-wrapper">
      {user.role === 'client' ? (
        <>
          <h2>Post a New Job</h2>
          <form onSubmit={handleSubmit}>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Job Title"
              required
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              required
            />
            <input
              name="budget"
              type="number"
              value={form.budget}
              onChange={handleChange}
              placeholder="Budget"
              required
            />
            <button type="submit">Post Job</button>
          </form>
          {message && <p>{message}</p>}
        </>
      ) : (
        <>
          <h2>Available Jobs</h2>
          {jobs.length === 0 ? (
            <p>No jobs available.</p>
          ) : (
            jobs.map(job => (
              <div key={job._id} className="job-card">
                <h3>{job.title}</h3>
                <p>{job.description}</p>
                <p><strong>Budget:</strong> ₹{job.budget}</p>
                <p><strong>Client:</strong> {job.clientId?.name || 'Unknown'}</p>

                {selectedJobId === job._id ? (
                  <div className="bid-form">
                    <input
                      type="number"
                      placeholder="Bid Amount"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                    />
                    <textarea
                      placeholder="Message (optional)"
                      value={bidMessage}
                      onChange={(e) => setBidMessage(e.target.value)}
                    ></textarea>
                    <button onClick={() => handlePlaceBid(job._id)}>Submit Bid</button>
                    <button onClick={() => setSelectedJobId(null)} className="cancel-btn">Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => setSelectedJobId(job._id)}>Place Bid</button>
                )}
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}
