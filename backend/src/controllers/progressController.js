import { dbService } from '../services/dbService.js';

// getProgress is now async — getStudentById queries PostgreSQL
export async function getProgress(req, res) {
  const studentId = req.user?.id;

  if (!studentId) {
    return res.status(401).json({ success: false, message: 'Authentication required.' });
  }

  try {
    const student = await dbService.getStudentById(studentId);

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student profile not found for this account.' });
    }

    res.json({
      success: true,
      progress: {
        studentId:        student.id,
        name:             student.name,
        level:            student.level,
        totalXp:          student.totalXp,
        nextLevelXp:      student.nextLevelXp,
        coins:            student.coins,
        streakDays:       student.streakDays,
        gamesPlayed:      student.gamesPlayed,
        questionsSolved:  student.questionsSolved,
        accuracyPct:      student.accuracyPct,
        bestScore:        student.bestScore,
        currentWorldId:   student.currentWorldId,
        currentWorldName: student.currentWorldName,
        recentBadge:      student.recentBadge,
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch progress.' });
  }
}

// updateProgress is now async
export async function updateProgress(req, res) {
  const studentId = req.user?.id;

  if (!studentId) {
    return res.status(401).json({ success: false, message: 'Authentication required.' });
  }

  try {
    const student = await dbService.getStudentById(studentId);

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student profile not found.' });
    }

    const { xp, coins, streakDays, currentWorldId, currentWorldName } = req.body;

    // Build update object for the DB
    const updates = {};
    if (xp) {
      const newXp    = student.totalXp + Number(xp);
      const newLevel = dbService.calculateLevel(newXp);
      updates.totalXp = newXp;
      updates.level   = newLevel;
    }
    if (coins)          updates.coins          = student.coins + Number(coins);
    if (streakDays)     updates.streakDays     = Number(streakDays);
    if (currentWorldId) updates.currentWorldId = currentWorldId;
    if (currentWorldName) updates.currentWorldName = currentWorldName;

    const updated = await dbService.updateStudentProfile(studentId, updates);
    res.json({ success: true, message: 'Progress updated', student: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Failed to update progress.' });
  }
}

export function getProgressSummary(_req, res) {
  res.json({
    success: true,
    class9Mastery:         65,
    class10Mastery:        45,
    overallCompletionPct:  55,
    totalStarsEarned:      23,
    maxStarsPossible:      150,
    topicBreakdown: [
      { title: 'Real Numbers & Surds',      progress: 95 },
      { title: 'Algebra & Polynomials',     progress: 75 },
      { title: 'Geometry & Triangles',      progress: 60 },
      { title: 'Coordinate Geometry',       progress: 85 },
      { title: 'Trigonometry & Ratios',     progress: 40 },
      { title: 'Statistics & Probability',  progress: 50 },
    ]
  });
}
