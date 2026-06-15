import React from 'react';

const VideoCard = ({ video }) => {
  // Safe YouTube ID extraction
  let videoId = '';
  try {
    const url = new URL(video.youtubeUrl);
    videoId = url.searchParams.get('v') || url.pathname.split('/').pop();
  } catch {
    videoId = '';
  }

  return (
    <div style={styles.card}>
      <h3>{video.title}</h3>
      {videoId ? (
        <iframe
          width="300"
          height="200"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={video.title}
        ></iframe>
      ) : (
        <p>Invalid YouTube URL</p>
      )}
      <p>{video.description}</p>
      {Array.isArray(video.tags) && video.tags.length > 0 && (
        <p><strong>Tags:</strong> {video.tags.join(', ')}</p>
      )}
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    padding: '10px',
    margin: '10px',
    borderRadius: '5px',
    maxWidth: '320px'
  }
};

export default VideoCard;
