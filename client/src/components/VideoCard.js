import React from 'react';

const VideoCard = ({ video }) => {
  return (
    <div style={styles.card}>
      <iframe
        width="300"
        height="180"
        src={video.youtubeUrl.replace('watch?v=', 'embed/')}
        title={video.title}
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <h3>{video.title}</h3>
      <p>{video.description}</p>

      {/* Show uploader info if available */}
      {video.user && (
        <div style={styles.uploader}>
          <strong>Uploaded by:</strong> {video.user.email}
          {video.user.bio && <p>{video.user.bio}</p>}
          {video.user.location && <p>📍 {video.user.location}</p>}
        </div>
      )}

      {/* Show tags */}
      {video.tags?.length > 0 && (
        <div style={styles.tags}>
          {video.tags.map((tag, idx) => (
            <span key={idx} style={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    margin: '10px',
    width: '320px',
    textAlign: 'center',
  },
  uploader: {
    marginTop: '10px',
    fontSize: '0.9em',
    color: '#555',
  },
  tags: {
    marginTop: '10px',
  },
  tag: {
    marginRight: '5px',
    color: '#007bff',
  },
};

export default VideoCard;
