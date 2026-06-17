import React, { useState } from 'react';
import { updateVideo } from '../services/videoService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditVideo = ({ video, onUpdated }) => {
  const [title, setTitle] = useState(video?.title || '');
  const [description, setDescription] = useState(video?.description || '');
  const [youtubeUrl, setYoutubeUrl] = useState(video?.youtubeUrl || '');
  const [tags, setTags] = useState(Array.isArray(video?.tags) ? video.tags.join(', ') : '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!youtubeUrl.includes('youtube.com') && !youtubeUrl.includes('youtu.be')) {
      setError('Please enter a valid YouTube link');
      return;
    }

    try {
      setLoading(true);
      const updated = await updateVideo(video._id, {
        title,
        description,
        youtubeUrl,
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      });
      toast.success('Video updated successfully!');
      if (on
