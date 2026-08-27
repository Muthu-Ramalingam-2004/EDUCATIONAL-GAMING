import express from 'express';
import { getLeaderboard, getDailyLeaderboard, getWeeklyLeaderboard, getMonthlyLeaderboard, getOverallLeaderboard } from '../controllers/leaderboardController.js';

const router = express.Router();

router.get('/', getLeaderboard);
router.get('/daily', getDailyLeaderboard);
router.get('/weekly', getWeeklyLeaderboard);
router.get('/monthly', getMonthlyLeaderboard);
router.get('/overall', getOverallLeaderboard);
router.get('/:period', getLeaderboard);

export default router;
