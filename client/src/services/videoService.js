import axios from 'axios';

// CRA requires REACT_APP_ prefix in .env
// Example .env entry:
// REACT_APP_API_URL=https://your-backend.onrender.com/api

const API_URL = process.env.REACT_APP_API_URL + '/videos/';

export const getVideos = async () => {
  const res = await axios.get(API_URL);
  return res.data; // ensure this is an array if you plan to .map()
};

export const getVideoById = async (id) => {
  const res = await axios.get(API_URL + id);
  return res.data;
};

export const uploadVideo = async (videoData) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(API_URL, videoData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
