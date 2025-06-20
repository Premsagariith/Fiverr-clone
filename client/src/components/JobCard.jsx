import BidForm from './BidFor_m';
import './JobCard.css'; // Optional for scoped styling

export default function JobCard({ job }) {
  const role = localStorage.getItem('role');

  return (
    <div className="job-card">
      <h2 className="job-title">{job.title}</h2>
      <p className="job-desc">{job.description}</p>

      {role === 'freelancer' && (
        <div className="bid-section">
          <h4 className="bid-title">📥 Submit Your Bid</h4>
          <BidForm jobId={job._id} />
        </div>
      )}
    </div>
  );
}
