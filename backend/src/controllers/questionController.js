import { dbService } from '../services/dbService.js';

export function getQuestions(req, res) {
  const { classStandard, subjectId, topicId, chapterId, level, type, mode } = req.query;
  const questions = dbService.getQuestionsFiltered({
    classStandard: classStandard ? Number(classStandard) : null,
    subjectId: subjectId || null,
    chapterId: chapterId || null,
    topicId: topicId || null,
    levelNumber: level ? Number(level) : null,
    questionType: type || mode || null
  });

  res.json({ success: true, count: questions.length, questions });
}

export function getQuestionsByTopic(req, res) {
  const { topicId } = req.params;
  const { classStandard, subjectId, level } = req.query;
  const questions = dbService.getQuestionsFiltered({
    classStandard: classStandard ? Number(classStandard) : null,
    subjectId: subjectId || null,
    topicId,
    levelNumber: level ? Number(level) : null
  });

  res.json({ success: true, count: questions.length, questions });
}

export function getQuestionsByLevel(req, res) {
  const { levelId } = req.params;
  const { classStandard, subjectId, topicId, chapterId } = req.query;
  const questions = dbService.getQuestionsFiltered({
    classStandard: classStandard ? Number(classStandard) : null,
    subjectId: subjectId || null,
    chapterId: chapterId || null,
    topicId: topicId || null,
    levelNumber: levelId ? Number(levelId) : 1
  });

  res.json({ success: true, levelId, count: questions.length, questions });
}
