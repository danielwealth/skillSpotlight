import React, { useEffect, useState } from 'react';
import VideoCard from '../components/VideoCard';
import Navbar from '../components/Navbar';
import { getVideos } from '../services/videoService';

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos()
      .then(data => setVideos(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <Navbar />
      <h2 style={{ textAlign: 'center' }}>Latest Showcases</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {videos.map(video => <VideoCard key={video._id} video={video} />)}
      </div>
    </div>
  );
};

export default Home;
