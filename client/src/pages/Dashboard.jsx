import { useEffect, useState } from 'react';
import { fetchJobs, fetchBids, fetchMessages } from '../services/api';
import './Dashboard.css';

export default function Dashboard() {
  const [userName, setUserName] = useState('User');
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('');

  const [jobCount, setJobCount] = useState(0);
  const [bidCount, setBidCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);

  const [myJobs, setMyJobs] = useState([]);
  const [myBids, setMyBids] = useState([]);
  const [myMessages, setMyMessages] = useState([]);

  const [showJobs, setShowJobs] = useState(false);
  const [showBids, setShowBids] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.id) {
      setUserId(user.id);
      setUserName(user.name);
      setRole(user.role);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    fetchJobs().then(res => {
      const jobs = res.data;
      if (role === 'client') {
        const my = jobs.filter(j => j.clientId === userId || j.clientId?._id === userId);
        setMyJobs(my);
        setJobCount(my.length);

        fetchBids().then(bidRes => {
          const bids = bidRes.data.filter(bid =>
            my.some(job => job._id === bid.jobId || job._id === bid.jobId?._id)
          );
          setMyBids(bids);
          setBidCount(bids.length);
        });
      } else {
        setMyJobs(jobs);
        setJobCount(jobs.length);

        fetchBids().then(bidRes => {
          const myBids = bidRes.data.filter(bid => bid.freelancerId === userId || bid.freelancerId?._id === userId);
          setMyBids(myBids);
          setBidCount(myBids.length);
        });
      }
    });

    fetchMessages().then(msgRes => {
      const msgs = msgRes.data.filter(
        m => m.senderId === userId || m.receiverId === userId ||
             m.senderId?._id === userId || m.receiverId?._id === userId
      );
      setMyMessages(msgs);
      setMessageCount(msgs.length);
    });
  }, [userId, role]);

  return (
    <div className="dashboard-wrapper">
      <div className="hero-banner">
        <h1>Welcome, {userName} 👋</h1>
        <p>Your freelance hub at a glance. Manage jobs, bids, and chats all in one place.</p>
      </div>

      <div className="stats-section">
        <div className="stat-card" onClick={() => setShowJobs(!showJobs)}>
          <h3>💼</h3>
          <p className="stat-label">{role === 'client' ? 'Jobs Posted' : 'Available Jobs'}</p>
          <p className="stat-value">{jobCount}</p>
        </div>
        <div className="stat-card" onClick={() => setShowBids(!showBids)}>
          <h3>📊</h3>
          <p className="stat-label">{role === 'client' ? 'Bids Received' : 'Bids Placed'}</p>
          <p className="stat-value">{bidCount}</p>
        </div>
        <div className="stat-card" onClick={() => setShowMessages(!showMessages)}>
          <h3>💬</h3>
          <p className="stat-label">Messages</p>
          <p className="stat-value">{messageCount}</p>
        </div>
      </div>

      {showJobs && (
        <div className="expand-section">
          <h2>{role === 'client' ? '📄 My Jobs' : '📄 Available Jobs'}</h2>
          {myJobs.length === 0 ? (
            <p>No jobs found.</p>
          ) : (
            myJobs.map(job => (
              <div key={job._id} className="job-card">
                <h3>{job.title}</h3>
                <p>{job.description}</p>
                <p><strong>Budget:</strong> ₹{job.budget}</p>
              </div>
            ))
          )}
        </div>
      )}

      {showBids && (
        <div className="expand-section">
          <h2>{role === 'client' ? '📥 Bids Received' : '📤 My Bids'}</h2>
          {myBids.length === 0 ? (
            <p>No bids yet.</p>
          ) : (
            myBids.map(bid => (
              <div key={bid._id} className="bid-card">
                <p><strong>Job:</strong> {bid.jobId?.title || 'N/A'}</p>
                <p><strong>Bid:</strong> ₹{bid.bidAmount}</p>
                <p><strong>{role === 'client' ? 'Freelancer' : 'Client'}:</strong> {
                  role === 'client' ? (bid.freelancerId?.name || 'N/A') : (bid.jobId?.clientId?.name || 'N/A')
                }</p>
              </div>
            ))
          )}
        </div>
      )}

      {showMessages && (
        <div className="expand-section">
          <h2>💌 Messages</h2>
          {myMessages.length === 0 ? (
            <p>No messages found.</p>
          ) : (
            myMessages.map((msg, i) => (
              <div key={i} className="message-card">
                <p><strong>From:</strong> {msg.senderId?.name || msg.senderId}</p>
                <p><strong>To:</strong> {msg.receiverId?.name || msg.receiverId}</p>
                <p>{msg.content}</p>
              </div>
            ))
          )}
        </div>
      )}

      <footer className="dashboard-footer">
        &copy; {new Date().getFullYear()} FreelanceHub. Built with 💙 using MERN.
      </footer>
    </div>
  );
}
