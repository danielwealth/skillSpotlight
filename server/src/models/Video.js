// backend/src/models/Video.js
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    youtubeUrl: {
      type: String,
      required: true,
      match: [/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/, 'Invalid YouTube URL'],
    },
    tags: {
      type: [String],
      default: [],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // link to uploader
      required: true,
    },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

module.exports = mongoose.model('Video', videoSchema);
