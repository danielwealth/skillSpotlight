import React, { useEffect, useState } from 'react';
import { getProfileVideo } from '../services/videoService'; // fetches user's video
import EditVideo from './EditVideo';

const MyVideo = () => {
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const data = await getProfileVideo(); // backend returns user's video object
        setVideo(data);
      } catch (err) {
        console.error('Error fetching video:', err);
      }
    };
    fetchVideo();
  }, []);

  const handleUpdated = (updatedVideo) => {
    setVideo(updatedVideo); // refresh state after edit
  };

  if (!video) return <p>No video uploaded yet.</p>;

  return (
    <div style={styles.container}>
      <h2>{video.title}</h2>
      <p>{video.description}</p>
      <div style={styles.videoWrapper}>
        <iframe
          width="560"
          height="315"
          src={video.youtubeUrl.replace('watch?v=', 'embed/')}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Edit form */}
      <EditVideo video={video} onUpdated={handleUpdated} />
    </div>
  );
};

const styles = {
  container: { padding: '20px', textAlign: 'center' },
  videoWrapper: { marginTop: '20px' }
};

export default MyVideo;
