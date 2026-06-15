import axios from 'axios';

const API_URL = 'env.API_URL/api/videos/';

export const getVideos = async () => {
  const res = await axios.get(API_URL);
  return res.data;
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
