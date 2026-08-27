import express from 'express';
import { getProgress, updateProgress, getProgressSummary } from '../controllers/progressController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, getProgress);
router.put('/', authenticateToken, updateProgress);
router.get('/summary', authenticateToken, getProgressSummary);

export default router;
