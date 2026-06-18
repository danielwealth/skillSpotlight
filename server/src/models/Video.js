// backend/src/models/Video.js
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Video title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters'],
    default: ''
  },
  youtubeUrl: {
    type: String,
    required: [true, 'YouTube URL is required'],
    match: [/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/, 'Must be a valid YouTube link']
  },
  tags: {
    type: [String],
    default: []
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);
