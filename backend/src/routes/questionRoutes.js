import express from 'express';
import { getQuestions, getQuestionsByTopic, getQuestionsByLevel } from '../controllers/questionController.js';

const router = express.Router();

router.get('/', getQuestions);
router.get('/topic/:topicId', getQuestionsByTopic);
router.get('/level/:levelId', getQuestionsByLevel);

export default router;
