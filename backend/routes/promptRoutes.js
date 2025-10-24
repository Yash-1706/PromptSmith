const express = require('express');
const router = express.Router();
const {
  getPrompts,
  getPrompt,
  createPrompt,
  updatePrompt,
  deletePrompt,
} = require('../controllers/promptController');
const authMiddleware = require('../middleware/authMiddleware');

router.route('/').get(authMiddleware, getPrompts).post(authMiddleware, createPrompt);
router
  .route('/:id')
  .get(authMiddleware, getPrompt)
  .put(authMiddleware, updatePrompt)
  .delete(authMiddleware, deletePrompt);

module.exports = router;