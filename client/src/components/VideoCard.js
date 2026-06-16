import React from 'react';

const VideoCard = ({ video }) => {
  // Extract video ID safely
  const getVideoId = (url) => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('youtu.be')) {
        return urlObj.pathname.slice(1); // short link format
      }
      if (urlObj.searchParams.get('v')) {
        return urlObj.searchParams.get('v'); // standard watch link
      }
      return null;
    } catch {
      return null;
    }
  };

  const videoId = getVideoId(video.youtubeUrl);
  const embedUrl = videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}`
    : null;

  return (
    <div style={styles.card}>
      {embedUrl ? (
        <iframe
          width="300"
          height="180"
          src={embedUrl}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Invalid YouTube link</p>
      )}
      <h3>{video.title}</h3>
      <p>{video.description}</p>

      {video.user && (
        <div style={styles.uploader}>
          <strong>Uploaded by:</strong> {video.user.email}
          {video.user.bio && <p>{video.user.bio}</p>}
          {video.user.location && <p>📍 {video.user.location}</p>}
        </div>
      )}

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
