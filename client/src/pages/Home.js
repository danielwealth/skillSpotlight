import React, { useEffect, useState } from 'react';
import VideoCard from '../components/VideoCard';
import Navbar from '../components/Navbar';
import { getVideos } from '../services/videoService';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getVideos();
        if (Array.isArray(data)) {
          setVideos(data);
        } else {
          setVideos([]);
          setError('Unexpected response format');
        }
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError('Failed to load videos');
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div>
      <Navbar />
      <h2 style={{ textAlign: 'center' }}>Latest Showcases</h2>

      {loading && <p style={styles.message}>Loading videos...</p>}
      {error && <p style={styles.error}>{error}</p>}
      {!loading && !error && videos.length === 0 && (
        <p style={styles.message}>No videos available yet.</p>
      )}

      <div style={styles.videoGrid}>
        {videos.map(video => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  videoGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '20px'
  },
  message: {
    textAlign: 'center',
    color: '#555'
  },
  error: {
    textAlign: 'center',
    color: 'red'
  }
};

export default Home;
