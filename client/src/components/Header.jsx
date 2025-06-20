import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="app-header">
      <h2 className="brand">FreelanceHub</h2>
      <div className="nav-left">
  <h2 className="brand-name">FreelanceHub</h2>
</div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/post-job">Post Job</Link>
            <Link to="/bids">Bids</Link>
            <Link to="/messages">Messages</Link>
            <Link to="/profile">Profile</Link> |

            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
