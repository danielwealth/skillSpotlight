// backend/src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// @desc    Get logged-in user's profile
// @route   GET /api/users/:id
// @access  Private
router.get('/:id', protect, getUserProfile);

// @desc    Update logged-in user's profile
// @route   PUT /api/users/:id
// @access  Private
router.put('/:id', protect, updateUserProfile);

module.exports = router;
