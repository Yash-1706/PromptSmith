const express = require('express');
const router = express.Router();
const {
  testPrompt,
  refinePromptHandler,
  evaluatePromptHandler,
} = require('../controllers/aiController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/test', authMiddleware, testPrompt);
router.post('/refine', authMiddleware, refinePromptHandler);
router.post('/evaluate', authMiddleware, evaluatePromptHandler);

module.exports = router;