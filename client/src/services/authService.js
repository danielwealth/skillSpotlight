import axios from 'axios';

// CRA requires REACT_APP_ prefix in .env
// Example .env entry:
// REACT_APP_API_URL=https://your-backend.onrender.com/api

const API_URL = process.env.REACT_APP_API_URL + '/auth/';

export const register = async (userData) => {
  const res = await axios.post(API_URL + 'register', userData);
  return res.data;
};

export const login = async (userData) => {
  const res = await axios.post(API_URL + 'login', userData);
  if (res.data.token) {
    localStorage.setItem('token', res.data.token);
  }
  return res.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};
