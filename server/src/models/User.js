// backend/src/models/User.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  email: { type: String, match: [/^\S+@\S+\.\S+$/, 'Invalid email format'] },
  phone: { type: String, match: [/^\+?[0-9]{7,15}$/, 'Invalid phone number'] },
  linkedin: { type: String, match: [/^https?:\/\/(www\.)?linkedin\.com\/.*$/, 'Invalid LinkedIn URL'] },
  github: { type: String, match: [/^https?:\/\/(www\.)?github\.com\/.*$/, 'Invalid GitHub URL'] },
  whatsapp: { type: String, match: [/^\+?[0-9]{7,15}$/, 'Invalid WhatsApp number'] },
}, { _id: false });

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 3, maxlength: 30 },
  email: { type: String, required: true, unique: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, 'Invalid email format'] },
  passwordHash: { type: String, required: true },
  bio: { type: String, maxlength: 200, default: '' },
  location: { type: String, maxlength: 100, default: '' },
  contacts: { type: contactSchema, default: {} },
  updateVideo: { type: String, match: [/^https?:\/\/.*$/, 'Must be a valid URL'], default: '' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
