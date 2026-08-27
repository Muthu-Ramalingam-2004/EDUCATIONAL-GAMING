import express from 'express';
import { getGames, getGameById, startGame, submitGame, getGameHistory } from '../controllers/gameController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getGames);
router.get('/history', authenticateToken, getGameHistory);
router.get('/:gameId', getGameById);
router.post('/:gameId/start', authenticateToken, startGame);
router.post('/:gameId/submit', authenticateToken, submitGame);

export default router;
