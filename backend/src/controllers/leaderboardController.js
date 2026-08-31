import { dbService } from '../services/dbService.js';

export async function getLeaderboard(req, res) {
  try {
    const period = req.params.period || req.query.period || 'daily';
    const rankings = await dbService.getLeaderboard(period);
    res.json({ success: true, period, count: rankings.length, rankings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getDailyLeaderboard(req, res) {
  try {
    const rankings = await dbService.getLeaderboard('daily');
    res.json({ success: true, period: 'daily', count: rankings.length, rankings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getWeeklyLeaderboard(req, res) {
  try {
    const rankings = await dbService.getLeaderboard('weekly');
    res.json({ success: true, period: 'weekly', count: rankings.length, rankings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getMonthlyLeaderboard(req, res) {
  try {
    const rankings = await dbService.getLeaderboard('monthly');
    res.json({ success: true, period: 'monthly', count: rankings.length, rankings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getOverallLeaderboard(req, res) {
  try {
    const rankings = await dbService.getLeaderboard('overall');
    res.json({ success: true, period: 'overall', count: rankings.length, rankings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
