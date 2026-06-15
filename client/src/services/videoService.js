import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/videos/'; // for Vite
// or process.env.REACT_APP_API_URL + '/videos/' for CRA

export const getVideos = async () => {
  const res = await axios.get(API_URL);
  return res.data; // make sure this is an array if you plan to .map()
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
