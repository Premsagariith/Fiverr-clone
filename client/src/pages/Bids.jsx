import { useEffect, useState } from 'react';
import { fetchBids, fetchJobs } from '../services/api';
import './Bids.css';

export default function Bids() {
  const [bids, setBids] = useState([]);
  const [role, setRole] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.id) {
      setRole(user.role);
      setUserId(user.id);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    fetchBids().then(res => {
      const data = res.data;
      if (role === 'client') {
        // Client sees bids on their jobs
        fetchJobs().then(jRes => {
          const myJobs = jRes.data.filter(j => j.clientId === userId || j.clientId?._id === userId);
          const jobIds = myJobs.map(j => j._id);
          const filtered = data.filter(bid => jobIds.includes(bid.jobId?._id || bid.jobId));
          setBids(filtered);
        });
      } else {
        // Freelancer sees their own bids
        const filtered = data.filter(bid => bid.freelancerId === userId || bid.freelancerId?._id === userId);
        setBids(filtered);
      }
    });
  }, [userId, role]);

  return (
    <div className="bids-wrapper">
      <h2>{role === 'client' ? '📥 Bids Received' : '📤 My Bids'}</h2>
      {bids.length === 0 ? (
        <p>No bids found.</p>
      ) : (
        bids.map(bid => (
          <div key={bid._id} className="bid-card">
            <p><strong>Job:</strong> {bid.jobId?.title || 'N/A'}</p>
            <p><strong>Bid Amount:</strong> ₹{bid.bidAmount}</p>
            <p><strong>{role === 'client' ? 'Freelancer' : 'Client'}:</strong> {
              role === 'client' ? (bid.freelancerId?.name || 'N/A') : (bid.jobId?.clientId?.name || 'N/A')
            }</p>
            {bid.message && <p><strong>Message:</strong> {bid.message}</p>}
          </div>
        ))
      )}
    </div>
  );
}
