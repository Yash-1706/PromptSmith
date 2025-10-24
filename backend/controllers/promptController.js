const Prompt = require('../models/Prompt');

// @desc    Get all prompts for user
// @route   GET /api/prompts
// @access  Private
const getPrompts = async (req, res) => {
  try {
    const prompts = await Prompt.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(prompts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single prompt
// @route   GET /api/prompts/:id
// @access  Private
const getPrompt = async (req, res) => {
  try {
    const prompt = await Prompt.findOne({ _id: req.params.id, userId: req.user._id });
    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }
    res.json(prompt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new prompt
// @route   POST /api/prompts
// @access  Private
const createPrompt = async (req, res) => {
  try {
    const { title, promptText, category } = req.body;
    const prompt = await Prompt.create({
      userId: req.user._id,
      title,
      promptText,
      category,
    });
    res.status(201).json(prompt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update prompt
// @route   PUT /api/prompts/:id
// @access  Private
const updatePrompt = async (req, res) => {
  try {
    const { title, promptText, category } = req.body;
    const prompt = await Prompt.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { title, promptText, category },
      { new: true }
    );
    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }
    res.json(prompt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete prompt
// @route   DELETE /api/prompts/:id
// @access  Private
const deletePrompt = async (req, res) => {
  try {
    const prompt = await Prompt.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }
    res.json({ message: 'Prompt removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPrompts,
  getPrompt,
  createPrompt,
  updatePrompt,
  deletePrompt,
};