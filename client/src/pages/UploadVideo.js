import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { uploadVideo } from '../services/videoService';

const UploadVideo = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    youtubeUrl: '',
    tags: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Basic YouTube URL validation
    if (!formData.youtubeUrl.includes('youtube.com') && !formData.youtubeUrl.includes('youtu.be')) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    try {
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      await uploadVideo({
        title: formData.title,
        description: formData.description,
        youtubeUrl: formData.youtubeUrl,
        tags: tagsArray
      });

      setMessage('Video uploaded successfully!');
      setFormData({ title: '', description: '', youtubeUrl: '', tags: '' }); // reset form
    } catch (err) {
      console.error('Upload error:', err);
      setError('Upload failed. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <h2 style={{ textAlign: 'center' }}>Upload Your Showcase</h2>
      <form onSubmit={handleUpload} style={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="youtubeUrl"
          placeholder="YouTube URL"
          value={formData.youtubeUrl}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={handleChange}
        />
        <button type="submit">Upload</button>
      </form>

      {message && <p style={styles.success}>{message}</p>}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    marginTop: '20px'
  },
  success: { textAlign: 'center', color: 'green' },
  error: { textAlign: 'center', color: 'red' }
};

export default UploadVideo;
