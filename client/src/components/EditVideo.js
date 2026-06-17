import React, { useState } from 'react';
import { updateVideo } from '../services/videoService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditVideo = ({ video, onUpdated }) => {
  const [title, setTitle] = useState(video?.title || '');
  const [description, setDescription] = useState(video?.description || '');
  const [youtubeUrl, setYoutubeUrl] = useState(video?.youtubeUrl || '');
  const [tags, setTags] = useState(Array.isArray(video?.tags) ? video.tags.join(', ') : '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!youtubeUrl.includes('youtube.com') && !youtubeUrl.includes('youtu.be')) {
      setError('Please enter a valid YouTube link');
      return;
    }

    try {
      setLoading(true);
      const updated = await updateVideo(video._id, {
        title,
        description,
        youtubeUrl,
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      });
      toast.success('Video updated successfully!');
      if (onUpdated) onUpdated(updated);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating video');
      toast.error('Failed to update video.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3>Edit Video</h3>
      {error && <p style={styles.error}>{error}</p>}
      <input
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
        value={youtubeUrl}
        onChange={(e) => setYoutubeUrl(e.target.value)}
        placeholder="YouTube URL"
      />
      <input
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma separated)"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
};

const styles = {
  form: { border: '1px solid #ddd', padding: '10px', borderRadius: '8px', marginTop: '10px' },
  error: { color: 'red' },
};

export default EditVideo;
