import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/videos`;

// ✅ Upload a new video
export const uploadVideo = async (videoData) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authentication token found');

  const res = await axios.post(API_URL, videoData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ✅ Update an existing video
export const updateVideo = async (id, updates) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authentication token found');

  const res = await axios.put(`${API_URL}/${id}`, updates, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ✅ Fetch all videos
export const getVideos = async () => {
  const res = await axios.get(API_URL);
  return Array.isArray(res.data) ? res.data : res.data.videos || [];
};

// ✅ Fetch a single video by ID
export const getVideoById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// ✅ Delete a video
export const deleteVideo = async (id) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authentication token found');

  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ✅ Fetch the logged-in user's profile video
export const getProfileVideo = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authentication token found');

  const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  // Depending on your backend, adjust this:
  // If /users/me returns { updateVideo: "youtube link" }
  // or { video: {...} }
  return res.data.updateVideo || res.data.video || null;
};
