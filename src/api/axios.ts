import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  
  // E2E Test Injection
  const simulateError = localStorage.getItem('simulate-error');
  if (simulateError) {
    config.headers['x-simulate-error'] = simulateError;
  }
  
  return config;
});
