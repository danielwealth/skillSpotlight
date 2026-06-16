// backend/src/routes/videoRoutes.js
const express = require('express');
const router = express.Router();
const { createVideo, getVideos, getVideoById } = require('../controllers/videoController');
const { protect } = require('../middleware/authMiddleware');

// Create new video (requires login)
router.post('/', protect, createVideo);
const {
  getVideos,
  getVideoById,
  uploadVideo,
  updateVideo,
  deleteVideo,
} = require('../controllers/videoController');

router.get('/', getVideos);
router.get('/:id', getVideoById);
router.post('/', protect, uploadVideo);
router.put('/:id', protect, updateVideo);
router.delete('/:id', protect, deleteVideo);


module.exports = router;
