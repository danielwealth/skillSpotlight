// backend/src/controllers/userController.js
const User = require('../models/User');

// @desc    Get a user's profile by ID
// @route   GET /api/users/:id
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a user's profile by ID
// @route   PUT /api/users/:id
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const updates = {
      bio: req.body.bio,
      location: req.body.location,
      contacts: {
        email: req.body.email,
        phone: req.body.phone,
        linkedin: req.body.linkedin,
        github: req.body.github,
        whatsapp: req.body.whatsapp,
      },
    };

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getUserProfile, updateUserProfile };
