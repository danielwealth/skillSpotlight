import axios from 'axios';

const API_URL = 'env.API_URL/api/auth/';

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
