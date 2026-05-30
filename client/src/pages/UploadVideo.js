import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { uploadVideo } from '../services/videoService';

const UploadVideo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [tags, setTags] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      await uploadVideo({ title, description, youtubeUrl, tags: tags.split(',') });
      alert('Video uploaded successfully!');
    } catch (err) {
      alert('Upload failed');
    }
  };

  return (
    <div>
      <Navbar />
      <h2 style={{ textAlign: 'center' }}>Upload Your Showcase</h2>
      <form onSubmit={handleUpload} style={styles.form}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="text" placeholder="YouTube URL" value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} required />
        <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

const styles = {
  form: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginTop: '20px' }
};

export default UploadVideo;
