import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Add this
import { register } from '../services/api';
import './Auth.css';

export default function Register() {
  const navigate = useNavigate(); // ✅ Initialize navigate
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert('✅ Registration successful');
      navigate('/login'); // ✅ Redirect to login page
    } catch (err) {
      alert('❌ Registration failed');
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          placeholder="Name"
          required
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          required
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <select
          required
          onChange={e => setForm({ ...form, role: e.target.value })}
        >
          <option value="">Select Role</option>
          <option value="client">Client</option>
          <option value="freelancer">Freelancer</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
