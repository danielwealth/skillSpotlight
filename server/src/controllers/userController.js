// backend/src/controllers/userController.js
const User = require('../models/User');

// @desc    Get a user's profile (by ID or "me")
// @route   GET /api/users/:id OR GET /api/users/me
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id === 'me' ? req.user.id : req.params.id;
    const user = await User.findById(userId).select('-passwordHash');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a user's profile (by ID or "me")
// @route   PUT /api/users/:id OR PUT /api/users/me
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id === 'me' ? req.user.id : req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update top-level fields
    user.bio = req.body.bio ?? user.bio;
    user.location = req.body.location ?? user.location;

    // Merge nested contacts instead of overwriting
    user.contacts = {
      ...user.contacts,
      email: req.body.email ?? user.contacts?.email,
      phone: req.body.phone ?? user.contacts?.phone,
      linkedin: req.body.linkedin ?? user.contacts?.linkedin,
      github: req.body.github ?? user.contacts?.github,
      whatsapp: req.body.whatsapp ?? user.contacts?.whatsapp,
    };

    const updatedUser = await user.save();
    const safeUser = updatedUser.toObject();
    delete safeUser.passwordHash;

    res.json(safeUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getUserProfile, updateUserProfile };
