import React, { useState } from 'react';
import { updateVideo } from '../services/videoService'; // your axios service

const EditVideo = ({ video, onUpdated }) => {
  const [title, setTitle] = useState(video.title);
  const [description, setDescription] = useState(video.description);
  const [youtubeUrl, setYoutubeUrl] = useState(video.youtubeUrl);
  const [tags, setTags] = useState(video.tags.join(', '));
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!youtubeUrl.includes('youtube.com') && !youtubeUrl.includes('youtu.be')) {
      setError('Please enter a valid YouTube link');
      return;
    }

    try {
      const updated = await updateVideo(video._id, {
        title,
        description,
        youtubeUrl,
        tags: tags.split(',').map((t) => t.trim()),
      });
      onUpdated(updated); // callback to refresh parent list
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating video');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3>Edit Video</h3>
      {error && <p style={styles.error}>{error}</p>}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="text"
        value={youtubeUrl}
        onChange={(e) => setYoutubeUrl(e.target.value)}
        placeholder="YouTube URL"
      />
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma separated)"
      />
      <button type="submit">Save Changes</button>
    </form>
  );
};

const styles = {
  form: {
    border: '1px solid #ddd',
    padding: '10px',
    borderRadius: '8px',
    marginTop: '10px',
  },
  error: {
    color: 'red',
  },
};

export default EditVideo;
