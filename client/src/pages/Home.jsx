import { useEffect, useState } from 'react';
import axios from 'axios';
import JobCard from '../components/JobCard';
import './Home.css';
import { Link } from 'react-router-dom';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed.user);
    }

    axios.get(`${import.meta.env.VITE_API_URL}/job`)
      .then(res => setJobs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="home-wrapper">
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>Connect with Top Freelancers</h1>
          <p>Post projects, receive bids, chat securely, and get work done with confidence.</p>
          {user ? (
            <Link to="/dashboard" className="cta-button">Go to Dashboard</Link>
          ) : null}
        </div>
        <div className="hero-image">
          <img
            src="https://tse2.mm.bing.net/th?id=OIP.rJHaIRw2Fh9oZ7IMkdirLgHaFq&pid=Api&P=0&h=180"
            alt="Freelancer working"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2>🛠 Why Choose Our Platform?</h2>
        <div className="feature-cards">
          <div className="feature"><h3>Post Jobs</h3><p>Create listings and attract talent.</p></div>
          <div className="feature"><h3>Bid on Projects</h3><p>Freelancers submit proposals directly.</p></div>
          <div className="feature"><h3>Message Securely</h3><p>Use in-app chat with confidence.</p></div>
          <div className="feature"><h3>Manage Contracts</h3><p>Track and approve project milestones.</p></div>
        </div>
      </section>

      {/* JOB LISTING */}
      {user && (
        <section className="job-list-section">
          <h2>Available Freelance Projects</h2>
          {jobs.length === 0 ? (
            <p className="no-jobs">No jobs available at the moment.</p>
          ) : (
            <div className="job-list">
              {jobs.map(job => <JobCard key={job._id} job={job} />)}
            </div>
          )}
        </section>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} FreelanceHub. Built with ❤️ using MERN Stack.</p>
        <div className="footer-links">
          <Link to="/">Home</Link>
          {!user && <Link to="/register">Register</Link>}
          {!user && <Link to="/login">Login</Link>}
          {user && <Link to="/dashboard">Dashboard</Link>}
        </div>
      </footer>
    </div>
  );
}
