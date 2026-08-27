import { dbService } from '../services/dbService.js';

export function getDashboardStats(req, res) {
  const stats = dbService.getAdminStats();
  res.json({ success: true, stats });
}

// Classes CRUD
export function getClasses(req, res) {
  res.json({
    success: true,
    classes: [
      { id: 1, standard: 9, title: "Class 9th Mathematics", chaptersCount: 5 },
      { id: 2, standard: 10, title: "Class 10th Mathematics", chaptersCount: 5 }
    ]
  });
}

export function createClass(req, res) {
  const { standard, title } = req.body;
  res.status(201).json({ success: true, message: 'Class created', classItem: { id: Date.now(), standard, title } });
}

// Chapters CRUD
export function getChapters(req, res) {
  res.json({
    success: true,
    chapters: [
      { id: 'c9_w1', title: 'World 1 – Number Quest', classStandard: 9 },
      { id: 'c9_w2', title: 'World 2 – Algebra Arena', classStandard: 9 },
      { id: 'c10_w1', title: 'World 1 – Real Numbers', classStandard: 10 },
      { id: 'c10_w2', title: 'World 2 – Algebra Master', classStandard: 10 }
    ]
  });
}

export function createChapter(req, res) {
  const { title, classStandard, subtitle } = req.body;
  res.status(201).json({ success: true, message: 'Chapter world created', chapter: { id: `c_${Date.now()}`, title, classStandard, subtitle } });
}

// Topics CRUD
export function getTopics(req, res) {
  res.json({
    success: true,
    topics: [
      { id: 't1', title: 'Real Numbers & Euclid Lemma', chapterId: 'c10_w1' },
      { id: 't2', title: 'Polynomial Factorisation', chapterId: 'c9_w2' },
      { id: 't3', title: 'Trigonometric Ratios', chapterId: 'c10_w4' }
    ]
  });
}

export function createTopic(req, res) {
  const { title, chapterId, description } = req.body;
  res.status(201).json({ success: true, message: 'Topic created', topic: { id: `t_${Date.now()}`, title, chapterId, description } });
}

// Questions CRUD
export function getAdminQuestions(req, res) {
  res.json({ success: true, count: dbService.questions.length, questions: dbService.questions });
}

export function createQuestion(req, res) {
  const { questionText, options = [], classStandard = 9, questionType = 'quiz', explanation = '' } = req.body;
  
  const newQ = {
    id: `q_${Date.now()}`,
    classStandard: Number(classStandard),
    questionType,
    questionText,
    options,
    explanation,
    difficulty: 'Medium',
    xpReward: 50,
    coinsReward: 20
  };

  dbService.questions.push(newQ);
  res.status(201).json({ success: true, message: 'Question created successfully', question: newQ });
}

export function updateQuestion(req, res) {
  const { id } = req.params;
  const qIndex = dbService.questions.findIndex(q => q.id === id);
  if (qIndex === -1) {
    return res.status(404).json({ success: false, message: 'Question not found' });
  }

  dbService.questions[qIndex] = { ...dbService.questions[qIndex], ...req.body };
  res.json({ success: true, message: 'Question updated', question: dbService.questions[qIndex] });
}

export function deleteQuestion(req, res) {
  const { id } = req.params;
  dbService.questions = dbService.questions.filter(q => q.id !== id);
  res.json({ success: true, message: 'Question deleted successfully' });
}
