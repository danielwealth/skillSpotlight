// backend/src/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { username, email, password, bio, location, contacts } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      passwordHash,
      bio: bio || '',
      location: location || '',
      contacts: contacts || {}, // expects { email, phone, linkedin, github, whatsapp }
    });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      location: user.location,
      contacts: user.contacts,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser, // make sure you define this function too
};
