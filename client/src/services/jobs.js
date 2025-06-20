// src/services/jobService.js
import API from './api';

export const postJob = (data) => API.post('/job', data);
export const getAllJobs = () => API.get('/job');
export const getJobById = (id) => API.get(`/job/${id}`);
export const deleteJob = (id) => API.delete(`/job/${id}`);
