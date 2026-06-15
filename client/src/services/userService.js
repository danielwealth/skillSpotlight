import axios from 'axios';

const API_URL = 'env.API_URL/api/users/';

export const getProfile = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(API_URL + 'me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
