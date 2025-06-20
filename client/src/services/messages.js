// src/services/messageService.js
import API from './api';

export const sendMessage = (data) => API.post('/message', data);
export const getMessagesByUser = (userId) => API.get(`/message/${userId}`);
