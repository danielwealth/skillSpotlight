// backend/src/controllers/videoController.js
const Video = require('../models/Video');

// @desc    Get all videos
// @route   GET /api/videos
// @access  Public
const getVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate('user', 'email bio location');
    res.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single video by ID
// @route   GET /api/videos/:id
// @access  Public
const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate('user', 'email bio location');
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.json(video);
  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Upload a new video
// @route   POST /api/videos
// @access  Private
const uploadVideo = async (req, res) => {
  try {
    const { title, description, youtubeUrl, tags } = req.body;

    const video = new Video({
      title,
      description,
      youtubeUrl,
      tags,
      user: req.user.id // attach logged-in user
    });

    const savedVideo = await video.save();
    res.status(201).json(savedVideo);
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a video
// @route   PUT /api/videos/:id
// @access  Private (only owner)
const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    // Only allow owner to update
    if (video.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this video' });
    }

    const updates = {
      title: req.body.title || video.title,
      description: req.body.description || video.description,
      youtubeUrl: req.body.youtubeUrl || video.youtubeUrl,
      tags: req.body.tags || video.tags,
    };

    const updatedVideo = await Video.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(updatedVideo);
  } catch (error) {
    console.error('Error updating video:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a video
// @route   DELETE /api/videos/:id
// @access  Private (only owner)
const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    // Only allow owner to delete
    if (video.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this video' });
    }

    await video.remove();
    res.json({ message: 'Video removed' });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getVideos,
  getVideoById,
  uploadVideo,
  updateVideo,
  deleteVideo,
};
