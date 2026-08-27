import { dbService } from '../services/dbService.js';

export function getGames(req, res) {
  const games = [
    { id: 'quiz', title: 'QUICK QUIZ', mode: 'quiz', difficulty: 'Medium', xpReward: 150, minLevel: 1 },
    { id: 'puzzle', title: 'MATHS PUZZLE', mode: 'puzzle', difficulty: 'Hard', xpReward: 200, minLevel: 1 },
    { id: 'dragdrop', title: 'DRAG & DROP REORDER', mode: 'dragdrop', difficulty: 'Challenge', xpReward: 220, minLevel: 2 },
    { id: 'timeattack', title: 'TIME ATTACK', mode: 'quiz', difficulty: 'Extreme', xpReward: 250, minLevel: 3 },
    { id: 'formula', title: 'FORMULA MATCH', mode: 'quiz', difficulty: 'Practice', xpReward: 180, minLevel: 4 },
    { id: 'memory', title: 'MEMORY MATCH', mode: 'puzzle', difficulty: 'Medium', xpReward: 190, minLevel: 5 }
  ];
  res.json({ success: true, games });
}

export function getGameById(req, res) {
  const { gameId } = req.params;
  res.json({
    success: true,
    game: { id: gameId, title: gameId.toUpperCase(), mode: gameId, difficulty: 'Medium', xpReward: 150 }
  });
}

export function startGame(req, res) {
  const { gameId } = req.params;
  const questions = dbService.questions.filter(q => q.questionType === (gameId === 'puzzle' ? 'puzzle' : gameId === 'dragdrop' ? 'dragdrop' : 'quiz'));
  const activeQuestions = questions.length > 0 ? questions : dbService.questions;

  res.json({
    success: true,
    sessionId: `sess_${Date.now()}`,
    gameId,
    startTime: new Date().toISOString(),
    questions: activeQuestions
  });
}

export function submitGame(req, res) {
  try {
    const { gameId } = req.params;
    const { answers = [], timeTakenSeconds = 120 } = req.body;
    const studentId = req.user?.id;

    if (!studentId) {
      return res.status(401).json({ success: false, message: 'Authentication required.' });
    }

    const result = dbService.submitGameAttempt({
      studentId,
      gameId,
      answers,
      timeTakenSeconds
    });

    if (!result) {
      return res.status(404).json({ success: false, message: 'Student profile not found.' });
    }

    res.json({
      success: true,
      message: 'Mission Complete!',
      ...result
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export function getGameHistory(req, res) {
  const studentId = req.user?.id;
  if (!studentId) {
    return res.status(401).json({ success: false, message: 'Authentication required.' });
  }
  const history = dbService.gameAttempts.filter(att => att.studentId === studentId);
  res.json({ success: true, history });
}
