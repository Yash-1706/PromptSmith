const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  promptText: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: '',
  },
  aiResponses: [{
    responseText: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  versions: [{
    promptText: {
      type: String,
      required: true,
    },
    aiResponse: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Prompt', promptSchema);