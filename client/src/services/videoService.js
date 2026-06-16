import axios from 'axios';

// CRA requires REACT_APP_ prefix in .env
// Example .env entry:
// REACT_APP_API_URL=https://your-backend.onrender.com/api

const API_URL = `${process.env.REACT_APP_API_URL}/videos`;

// Fetch all videos
export const getVideos = async () => {
  try {
    const res = await axios.get(API_URL);
    return Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error.response?.data || { message: 'Server error' };
  }
};

// Fetch a single video by ID
export const getVideoById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching video ${id}:`, error);
    throw error.response?.data || { message: 'Server error' };
  }
};

// Upload a new video
export const uploadVideo = async (videoData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const res = await axios.post(API_URL, videoData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (error) {
    console.error('Error uploading video:', error);
    throw error.response?.data || { message: 'Server error' };
  }
};

// Update an existing video
export const updateVideo = async (id, updates) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const res = await axios.put(`${API_URL}/${id}`, updates, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (error) {
    console.error(`Error updating video ${id}:`, error);
    throw error.response?.data || { message: 'Server error' };
  }
};

// Delete a video
export const deleteVideo = async (id) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const res = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (error) {
    console.error(`Error deleting video ${id}:`, error);
    throw error.response?.data || { message: 'Server error' };
  }
};
