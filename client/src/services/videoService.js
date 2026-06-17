import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/videos`;

// ✅ Update an existing video
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

// ✅ Fetch all videos
export const getVideos = async () => {
  try {
    const res = await axios.get(API_URL);

    if (Array.isArray(res.data)) {
      return res.data;
    }
    if (Array.isArray(res.data.videos)) {
      return res.data.videos;
    }

    console.warn('Unexpected response shape:', res.data);
    return [];
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error.response?.data || { message: 'Server error' };
  }
};

// 🟩 Other functions unchanged…
