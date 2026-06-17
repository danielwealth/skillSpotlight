import React, { useEffect, useState } from 'react';
import { getVideos } from '../services/videoService';
import VideoCard from './VideoCard';

const VideoPage = () => {
  const [videos, setVideos] = useState([]);

  const refreshVideos = async () => {
    try {
      const data = await getVideos();
      console.log('Fetched videos:', data);
      setVideos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error refreshing videos:', err);
    }
  };

  useEffect(() => {
    refreshVideos();
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {Array.isArray(videos) && videos.length > 0 ? (
        videos.map((video) => (
          <VideoCard
            key={video._id}
            video={video}
            refreshVideos={refreshVideos}
          />
        ))
      ) : (
        <p>No videos found.</p>
      )}
    </div>
  );
};

export default VideoPage;
