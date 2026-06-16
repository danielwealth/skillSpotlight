// backend/src/routes/videoRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getVideos,
  getVideoById,
  uploadVideo,
  updateVideo,
  deleteVideo,
} = require('../controllers/videoController');

// Routes
router.get('/', getVideos);
router.get('/:id', getVideoById);
router.post('/', protect, uploadVideo);
router.put('/:id', protect, updateVideo);
router.delete('/:id', protect, deleteVideo);

module.exports = router;
