import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const updateMessage = (id, data) =>
  axios.put(`/api/messages/${id}`, data);

export const deleteMessage = (id) =>
  axios.delete(`/api/messages/${id}`);


export const login = (data) => API.post('/auth/login', data);
export const register = (data) => API.post('/auth/register', data);
export const fetchProfile = () => API.get('/auth/me');
export const updateProfile = (id, data) => API.put(`/auth/update/${id}`, data);

export const fetchJobs = () => API.get('/jobs');
export const postJob = (data) => API.post('/jobs/post', data);

export const fetchBids = () => API.get('/bids');
export const placeBid = (data) => API.post('/bids/place', data);
export const acceptBid = (id) => API.put(`/bids/${id}/accept`); // Optional future feature

export const fetchMessages = () => API.get('/messages');
export const sendMessage = (data) => API.post('/messages/send', data);

export default API;