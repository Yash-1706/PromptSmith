const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateResponse = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to generate AI response');
  }
};

const refinePrompt = async (originalPrompt, feedback) => {
  const refinementPrompt = `Original prompt: ${originalPrompt}\nFeedback: ${feedback}\nPlease refine this prompt to make it better.`;
  return await generateResponse(refinementPrompt);
};

const evaluatePrompt = async (prompt) => {
  const evaluationPrompt = `Evaluate this prompt for clarity, creativity, and effectiveness: ${prompt}\nProvide a score out of 10 for each category and suggestions for improvement.`;
  return await generateResponse(evaluationPrompt);
};

module.exports = {
  generateResponse,
  refinePrompt,
  evaluatePrompt,
};