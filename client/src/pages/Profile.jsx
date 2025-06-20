import { useEffect, useState } from 'react';
import {
  fetchProfile,
  updateProfile,
  fetchBids,
  fetchMessages,
  fetchJobs
} from '../services/api';
import './Profile.css';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState('info');
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: '', email: '' });
  const [bids, setBids] = useState([]);
  const [messages, setMessages] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetchProfile();
        setUser(res.data);
        setForm({ name: res.data.name, email: res.data.email });
      } catch (err) {
        console.error(err);
        const stored = localStorage.getItem('user');
        if (stored) {
          const parsed = JSON.parse(stored);
          setUser(parsed);
          setForm({ name: parsed.name, email: parsed.email });
        } else {
          alert('Login required');
        }
      }
    };
    loadProfile();
  }, []);

  useEffect(() => {
    if (!user?._id) return;

    if (tab === 'bids') {
      fetchBids()
        .then(res => {
          const userBids = res.data.filter(b => b.freelancerId === user._id || b.freelancerId?._id === user._id);
          setBids(userBids);
        })
        .catch(console.error);
    } else if (tab === 'messages') {
      fetchMessages()
        .then(res => {
          const userMsgs = res.data.filter(m =>
            m.senderId === user._id || m.receiverId === user._id ||
            m.senderId?._id === user._id || m.receiverId?._id === user._id
          );
          setMessages(userMsgs);
        })
        .catch(console.error);
    } else if (tab === 'jobs') {
      fetchJobs()
        .then(res => {
          const userJobs = res.data.filter(j => j.clientId === user._id || j.clientId?._id === user._id);
          setJobs(userJobs);
        })
        .catch(console.error);
    }
  }, [tab, user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile(user._id, form);
      setUser(res.data);
      setEditing(false);
      localStorage.setItem('user', JSON.stringify(res.data));
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Update failed');
      console.error(err);
    }
  };

  if (!user) return <div className="profile-wrapper">Loading...</div>;

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <img
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
          alt="Avatar"
          className="profile-avatar"
        />
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p className="role-pill">{user.role?.toUpperCase()}</p>
          <button className="edit-button" onClick={() => setEditing(true)}>Edit Profile</button>
        </div>
      </div>

      {editing && (
        <div className="edit-form">
          <h3>Edit Profile</h3>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name"
              required
            />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              required
            />
            <div className="form-buttons">
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditing(false)} className="cancel-btn">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="profile-tabs">
        <button className={tab === 'info' ? 'active' : ''} onClick={() => setTab('info')}>Info</button>
        {user?.role === 'client' && (
          <button className={tab === 'jobs' ? 'active' : ''} onClick={() => setTab('jobs')}>My Jobs</button>
        )}
        {user?.role === 'freelancer' && (
          <button className={tab === 'bids' ? 'active' : ''} onClick={() => setTab('bids')}>My Bids</button>
        )}
        <button className={tab === 'messages' ? 'active' : ''} onClick={() => setTab('messages')}>Messages</button>
      </div>

      <div className="tab-content">
        {tab === 'info' && (
          <div>
            <p><strong>Email:</strong> {user.email}</p>
            <p>This is your profile info. Use the Dashboard to post jobs or place bids.</p>
          </div>
        )}

        {tab === 'jobs' && (
          <div>
            <h4>📋 My Jobs</h4>
            {jobs.length === 0 ? <p>No jobs posted yet.</p> : (
              <ul>
                {jobs.map(job => (
                  <li key={job._id}>
                    <strong>{job.title}</strong> - ₹{job.budget}
                    <p>{job.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {tab === 'bids' && (
          <div>
            <h4>📄 Your Bids</h4>
            {bids.length === 0 ? <p>No bids yet.</p> : (
              <ul>
                {bids.map(bid => (
                  <li key={bid._id}>
                    <strong>{bid.jobId?.title || 'Untitled Job'}</strong> - ₹{bid.bidAmount}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {tab === 'messages' && (
          <div>
            <h4>💬 Your Messages</h4>
            {messages.length === 0 ? <p>No messages yet.</p> : (
              <ul>
                {messages.map(msg => (
                  <li key={msg._id}>
                    <strong>{msg.senderId?.name || msg.senderId}:</strong> {msg.content}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
