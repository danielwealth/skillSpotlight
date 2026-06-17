import React, { useEffect, useState } from 'react';
import { getVideos } from '../services/videoService';
import VideoCard from './VideoCard';

const VideoPage = () => {
  const [videos, setVideos] = useState([]);

  const refreshVideos = async () => {
    try {
      const data = await getVideos();
      setVideos(data);
    } catch (err) {
      console.error('Error refreshing videos:', err);
    }
  };

  useEffect(() => {
    refreshVideos();
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {videos.map((video) => (
        <VideoCard
          key={video._id}
          video={video}
          refreshVideos={refreshVideos}
        />
      ))}
    </div>
  );
};

export default VideoPage;
