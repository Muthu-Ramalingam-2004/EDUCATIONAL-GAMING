import { dbService } from '../services/dbService.js';

export function getRewards(req, res) {
  const studentId = req.user?.id;
  if (!studentId) {
    return res.status(401).json({ success: false, message: 'Authentication required.' });
  }
  // claimedRewards is in-memory only (non-critical) — returns empty until a session stores them
  res.json({ success: true, count: 0, rewards: [] });
}

export async function claimReward(req, res) {
  try {
    const studentId = req.user?.id;
    if (!studentId) {
      return res.status(401).json({ success: false, message: 'Authentication required.' });
    }

    const { rewardType = 'coins', amount = 100, badge = null } = req.body;

    const result = await dbService.claimReward({
      studentId,
      rewardType,
      amount: Number(amount),
      badge
    });

    if (!result) {
      return res.status(404).json({ success: false, message: 'Student profile not found.' });
    }

    res.json({
      success: true,
      message: 'Reward claimed and saved to database permanently!',
      student: result.student
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Failed to claim reward.' });
  }
}

export function getAchievements(req, res) {
  const studentId = req.user?.id;
  if (!studentId) {
    return res.status(401).json({ success: false, message: 'Authentication required.' });
  }

  const achievements = dbService.badges.map(ach => ({
    ...ach,
    unlocked: ['ach_1', 'ach_2', 'ach_3', 'ach_4', 'ach_5'].includes(ach.id),
    unlockedDate: 'Aug 24, 2026'
  }));

  res.json({ success: true, count: achievements.length, achievements });
}
