// backend/src/models/User.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  phone: {
    type: String,
    match: [/^\+?[0-9]{7,15}$/, 'Phone number must be digits only'],
  },
  linkedin: {
    type: String,
    match: [/^https?:\/\/(www\.)?linkedin\.com\/.*$/, 'Must be a valid LinkedIn URL'],
  },
  github: {
    type: String,
    match: [/^https?:\/\/(www\.)?github\.com\/.*$/, 'Must be a valid GitHub URL'],
  },
  whatsapp: {
    type: String,
    match: [/^\+?[0-9]{7,15}$/, 'WhatsApp number must be digits only'],
  },
}, { _id: false });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username cannot exceed 30 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  passwordHash: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    maxlength: [200, 'Bio cannot exceed 200 characters'],
    default: '',
  },
  location: {
    type: String,
    maxlength: [100, 'Location cannot exceed 100 characters'],
    default: '',
  },
  contacts: {
    type: contactSchema,
    default: {},
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
