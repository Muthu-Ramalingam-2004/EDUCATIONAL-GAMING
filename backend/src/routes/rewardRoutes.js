import express from 'express';
import { getRewards, claimReward, getAchievements } from '../controllers/rewardController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, getRewards);
router.post('/claim', authenticateToken, claimReward);
router.get('/achievements', authenticateToken, getAchievements);

export default router;
