// frontend/src/services/userService.js
import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/users`;

// Get logged-in user's profile
export const getProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error.response?.data || { message: 'Server error' };
  }
};

// Update logged-in user's profile
export const updateProfile = async (profileData) => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.put(`${API_URL}/me`, profileData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error.response?.data || { message: 'Server error' };
  }
};
