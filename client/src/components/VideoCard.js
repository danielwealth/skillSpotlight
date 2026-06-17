import React from 'react';
import EditVideo from './EditVideo';

const VideoCard = ({ video, currentUserId, refreshVideos }) => {
  const getVideoId = (url) => {
    try {
      if (!url) return null;
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('youtu.be')) return urlObj.pathname.slice(1);
      if (urlObj.searchParams.get('v')) return urlObj.searchParams.get('v');
      return null;
    } catch {
      return null;
    }
  };

  const videoId = getVideoId(video?.youtubeUrl);
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
          title={video?.title || 'Untitled'}
          frameBorder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Invalid or missing YouTube link</p>
      )}

      <h3>{video?.title || 'Untitled'}</h3>
      <p>{video?.description || 'No description available'}</p>

      {video?.user && video.user._id === currentUserId && (
        <EditVideo video={video} onUpdated={refreshVideos} />
      )}

      {video?.user && (
        <div style={styles.uploader}>
          <strong>Uploaded by:</strong> {video.user.email || 'Unknown'}
          {video.user.bio && <p>{video.user.bio}</p>}
          {video.user.location && <p>📍 {video.user.location}</p>}
        </div>
      )}

      {Array.isArray(video?.tags) && video.tags.length > 0 && (
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
  card: { border: '1px solid #ddd', borderRadius: '8px', padding: '10px', margin: '10px', width: '320px', textAlign: 'center' },
  uploader: { marginTop: '10px', fontSize: '0.9em', color: '#555' },
  tags: { marginTop: '10px' },
  tag: { marginRight: '5px', color: '#007bff' },
};

export default VideoCard;
