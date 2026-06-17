import React, { useEffect, useState } from 'react';
import { getVideos } from '../services/videoService';
import VideoCard from './VideoCard';

const VideoPage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getVideos();
        setVideos(data);
      } catch (err) {
        console.error('Error loading videos:', err);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
};

export default VideoPage;
