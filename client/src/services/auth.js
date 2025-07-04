// src/services/authService.js
import API from './api';

export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
export const getCurrentUser = () => API.get('/auth/me');
export const logout = () => API.post('/auth/logout');
