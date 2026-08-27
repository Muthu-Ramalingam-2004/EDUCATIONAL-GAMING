import express from 'express';
import {
  getDashboardStats,
  getClasses, createClass,
  getChapters, createChapter,
  getTopics, createTopic,
  getAdminQuestions, createQuestion, updateQuestion, deleteQuestion
} from '../controllers/adminController.js';
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply authentication and role check across all admin endpoints
router.use(authenticateToken);
router.use(requireAdmin);

router.get('/dashboard', getDashboardStats);

router.get('/classes', getClasses);
router.post('/classes', createClass);

router.get('/chapters', getChapters);
router.post('/chapters', createChapter);

router.get('/topics', getTopics);
router.post('/topics', createTopic);

router.get('/questions', getAdminQuestions);
router.post('/questions', createQuestion);
router.put('/questions/:id', updateQuestion);
router.delete('/questions/:id', deleteQuestion);

export default router;
