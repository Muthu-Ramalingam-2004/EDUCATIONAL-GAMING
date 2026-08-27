import { dbService } from '../services/dbService.js';

export function getQuestions(req, res) {
  const { classStandard, type } = req.query;
  let questions = dbService.questions;

  if (classStandard) {
    questions = questions.filter(q => q.classStandard === Number(classStandard));
  }

  if (type) {
    questions = questions.filter(q => q.questionType === type);
  }

  res.json({ success: true, count: questions.length, questions });
}

export function getQuestionsByTopic(req, res) {
  const { topicId } = req.params;
  const questions = dbService.questions.filter(q => q.topicId === topicId);
  res.json({ success: true, count: questions.length, questions });
}

export function getQuestionsByLevel(req, res) {
  const { levelId } = req.params;
  const questions = dbService.questions.slice(0, 5);
  res.json({ success: true, levelId, questions });
}
