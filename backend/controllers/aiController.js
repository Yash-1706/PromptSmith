const Prompt = require('../models/Prompt');
const { generateResponse, refinePrompt, evaluatePrompt } = require('../utils/geminiClient');

// @desc    Test prompt with Gemini
// @route   POST /api/ai/test
// @access  Private
const testPrompt = async (req, res) => {
  try {
    const { promptId, promptText } = req.body;

    // Generate AI response
    const aiResponse = await generateResponse(promptText);

    // Save to prompt if promptId provided
    if (promptId) {
      const prompt = await Prompt.findOneAndUpdate(
        { _id: promptId, userId: req.user._id },
        {
          $push: {
            aiResponses: { responseText: aiResponse },
            versions: { promptText, aiResponse }
          }
        },
        { new: true }
      );
      if (!prompt) {
        return res.status(404).json({ message: 'Prompt not found' });
      }
      return res.json({ aiResponse, prompt });
    }

    res.json({ aiResponse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Refine prompt using Gemini
// @route   POST /api/ai/refine
// @access  Private
const refinePromptHandler = async (req, res) => {
  try {
    const { promptId, feedback } = req.body;

    const prompt = await Prompt.findOne({ _id: promptId, userId: req.user._id });
    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }

    const refinedPrompt = await refinePrompt(prompt.promptText, feedback);

    res.json({ refinedPrompt });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Evaluate prompt
// @route   POST /api/ai/evaluate
// @access  Private
const evaluatePromptHandler = async (req, res) => {
  try {
    const { promptText } = req.body;

    const evaluation = await evaluatePrompt(promptText);

    res.json({ evaluation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  testPrompt,
  refinePromptHandler,
  evaluatePromptHandler,
};