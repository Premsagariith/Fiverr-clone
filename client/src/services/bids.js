// src/services/bidService.js
import API from './api';

export const placeBid = (data) => API.post('/bid', data);
export const getBidsForJob = (jobId) => API.get(`/bid/job/${jobId}`);
export const getMyBids = () => API.get('/bid/mine');
