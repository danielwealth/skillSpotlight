import React from 'react';

const VideoCard = ({ video }) => {
  const videoId = video.youtubeUrl.split('v=')[1]; // extract YouTube ID

  return (
    <div style={styles.card}>
      <h3>{video.title}</h3>
      <iframe
        width="300"
        height="200"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={video.title}
      ></iframe>
      <p>{video.description}</p>
      <p><strong>Tags:</strong> {video.tags.join(', ')}</p>
    </div>
  );
};

const styles = {
  card: { border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }
};

export default VideoCard;
