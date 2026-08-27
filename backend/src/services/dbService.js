import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import { initialQuestionsData, initialBadgesData } from '../data/initialQuestions.js';
import { pool } from './dbConnection.js';

// === CRITICAL FIX: Use import.meta.url for a file-relative path ===
// process.cwd() returns the directory node was LAUNCHED from, which changes
// depending on how the server is started. This caused usersStore.json to be
// silently not found after restarts, wiping all registered users.
// __dirname equivalent for ESM modules:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This path is ALWAYS relative to THIS FILE, regardless of launch directory:
// backend/src/services/dbService.js  →  backend/src/data/usersStore.json
const STORE_PATH = path.resolve(__dirname, '../data/usersStore.json');
const STORE_DIR = path.dirname(STORE_PATH);

class PersistentDataStore {
  constructor() {
    this.users = [];
    this.students = {};
    this.questions = [...initialQuestionsData];
    this.badges = [...initialBadgesData];
    this.claimedRewards = [];
    this.gameAttempts = [];
    this.userBadges = [];

    this.loadStore();
  }

  // File persistence helpers
  loadStore() {
    console.log(`📂 [DB] Loading user store from: ${STORE_PATH}`);
    try {
      if (fs.existsSync(STORE_PATH)) {
        const raw = fs.readFileSync(STORE_PATH, 'utf-8');
        const parsed = JSON.parse(raw);
        this.users = parsed.users || [];
        this.students = parsed.students || {};

        const userCount = this.users.length;
        const studentCount = Object.keys(this.students).length;

        if (userCount === 0) {
          console.warn('⚠️  [DB] usersStore.json exists but has 0 users. Seeding defaults.');
          this.initDefaultUsers();
        } else {
          console.log(`✅ [DB] Loaded ${userCount} user(s) and ${studentCount} student profile(s) from disk.`);
          this.users.forEach(u => {
            console.log(`   👤  ${u.email} [${u.role}] (id: ${u.id})`);
          });
        }
      } else {
        console.log('ℹ️  [DB] usersStore.json not found. Initializing with default users.');
        this.initDefaultUsers();
      }
    } catch (e) {
      console.error('❌ [DB] Could not load usersStore.json:', e.message);
      console.log('   Initializing with default users as fallback.');
      this.initDefaultUsers();
    }
  }

  saveStore() {
    try {
      // Auto-create the data directory if it doesn't exist (first run)
      if (!fs.existsSync(STORE_DIR)) {
        fs.mkdirSync(STORE_DIR, { recursive: true });
        console.log(`📁 [DB] Created data directory: ${STORE_DIR}`);
      }

      const data = {
        users: this.users,
        students: this.students
      };
      fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
      console.error('❌ [DB] Error writing usersStore.json:', e.message);
      console.error('   Path attempted:', STORE_PATH);
    }
  }

  initDefaultUsers() {
    const salt = bcrypt.genSaltSync(10);
    const demoStudentHash = bcrypt.hashSync('password123', salt);
    const adminHash = bcrypt.hashSync('admin123', salt);

    this.users = [
      {
        id: "usr_muthu_123",
        email: "muthu@mathquest.edu",
        password_hash: demoStudentHash,
        role: "student",
        createdAt: "2026-08-01T00:00:00.000Z"
      },
      {
        id: "usr_admin_999",
        email: "admin@mathquest.edu",
        password_hash: adminHash,
        role: "admin",
        createdAt: "2026-08-01T00:00:00.000Z"
      }
    ];

    this.students = {
      "usr_muthu_123": {
        id: "usr_muthu_123",
        name: "Muthu Ram (Demo)",
        username: "muthu_maths",
        email: "muthu@mathquest.edu",
        avatar: "⚡",
        classStandard: 9,
        level: 12,
        totalXp: 2450,
        nextLevelXp: 3000,
        coins: 850,
        streakDays: 5,
        gamesPlayed: 48,
        questionsSolved: 342,
        accuracyPct: 91,
        bestScore: 1250,
        currentWorldId: "class9_world2",
        currentWorldName: "Algebra Arena",
        recentBadge: "🔥 FAST SOLVER",
        createdAt: "2026-08-01T00:00:00.000Z"
      }
    };

    this.saveStore();
    console.log('✅ [DB] Default users initialized and saved to disk.');
  }

  // Level Threshold Calculator
  calculateLevel(xp) {
    if (xp < 500) return 1;
    if (xp < 1000) return 2;
    if (xp < 1800) return 3;
    if (xp < 2500) return 4;
    if (xp < 3500) return 5;
    if (xp < 5000) return 6;
    return Math.floor(xp / 1000) + 1;
  }

  // Auth Operations
  async registerUser({ name, username, email, password, classStandard = 9, role = 'student' }) {
    const cleanEmail = email.trim().toLowerCase();

    // Check if email already exists
    const existing = this.users.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      throw new Error('An account with this email already exists.');
    }

    const salt = bcrypt.genSaltSync(10);
    const password_hash = bcrypt.hashSync(password, salt);

    const userId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const newUser = {
      id: userId,
      email: cleanEmail,
      password_hash,
      role: role || 'student',
      createdAt: new Date().toISOString()
    };

    this.users.push(newUser);

    let newStudent = null;
    if (role === 'student') {
      newStudent = {
        id: userId,
        name: name || username || 'New Student',
        username: username || cleanEmail.split('@')[0],
        email: cleanEmail,
        avatar: '⚡',
        classStandard: Number(classStandard) || 9,
        level: 1,
        totalXp: 0,
        nextLevelXp: 500,
        coins: 0,
        streakDays: 1,
        gamesPlayed: 0,
        questionsSolved: 0,
        accuracyPct: 100,
        bestScore: 0,
        currentWorldId: Number(classStandard) === 10 ? 'class10_world1' : 'class9_world1',
        currentWorldName: Number(classStandard) === 10 ? 'Real Numbers' : 'Number Quest',
        recentBadge: '🎯 Novice Adventurer',
        createdAt: new Date().toISOString()
      };
      this.students[userId] = newStudent;
    }

    this.saveStore();
    console.log(`✅ [DB] New user registered: ${cleanEmail} [${role}]`);

    return { user: { id: newUser.id, email: newUser.email, role: newUser.role }, student: newStudent };
  }

  async loginUser({ email, password, expectedRole }) {
    const cleanEmail = email.trim().toLowerCase();
    const user = this.users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      console.log(`[DB] Login attempt: user not found for email="${cleanEmail}"`);
      return null;
    }

    // Verify password using bcrypt
    let isMatch = false;

    if (user.password_hash && user.password_hash.startsWith('$2')) {
      try {
        isMatch = bcrypt.compareSync(password, user.password_hash);
      } catch (e) {
        console.warn('[DB] bcrypt compareSync error:', e.message);
        isMatch = false;
      }
    }

    // Fallback: legacy plain text password (backward compat only)
    if (!isMatch && user.password_plain) {
      isMatch = user.password_plain === password;
    }

    if (!isMatch) {
      console.log(`[DB] Login attempt: password mismatch for email="${cleanEmail}"`);
      return null;
    }

    // Role check
    if (expectedRole && user.role !== expectedRole) {
      console.log(`[DB] Role mismatch: expected="${expectedRole}", got="${user.role}" for email="${cleanEmail}"`);
      return { roleMismatch: true, userRole: user.role };
    }

    const student = this.students[user.id] || null;
    console.log(`✅ [DB] Login success: ${cleanEmail} [${user.role}]`);
    return {
      user: { id: user.id, email: user.email, role: user.role },
      student
    };
  }

  getStudentById(studentId) {
    return this.students[studentId] || null;
  }

  updateStudentProfile(studentId, updateData) {
    const student = this.students[studentId];
    if (!student) return null;

    if (updateData.name) student.name = updateData.name;
    if (updateData.classStandard) student.classStandard = Number(updateData.classStandard);
    if (updateData.avatar) student.avatar = updateData.avatar;

    this.saveStore();
    return student;
  }

  // Game Submission Logic
  submitGameAttempt({ studentId, gameId = 'quiz', answers = [], timeTakenSeconds = 120 }) {
    // FIXED: No longer falls back to 'usr_muthu_123' — use the authenticated user's ID
    const student = this.students[studentId];
    if (!student) {
      console.warn(`[DB] submitGameAttempt: student not found for id="${studentId}"`);
      return null;
    }

    let correctCount = 0;
    const totalQuestions = answers.length || 5;

    answers.forEach((ans) => {
      const q = this.questions.find(item => item.id === ans.questionId);
      if (q) {
        const correctOpt = q.options.find(o => o.isCorrect);
        if (correctOpt && correctOpt.id === ans.selectedOption) {
          correctCount++;
        }
      } else {
        if (ans.isCorrect) correctCount++;
      }
    });

    if (answers.length === 0) {
      correctCount = 4;
    }

    const score = correctCount * 100 + 50;
    const accuracyPct = Math.round((correctCount / totalQuestions) * 100);
    const xpEarned = correctCount * 30 + 50;
    const coinsEarned = correctCount * 10 + 20;

    const previousLevel = student.level;
    const newTotalXp = student.totalXp + xpEarned;
    const newLevel = this.calculateLevel(newTotalXp);
    const levelUp = newLevel > previousLevel;

    student.totalXp = newTotalXp;
    student.coins += coinsEarned;
    student.level = newLevel;
    student.nextLevelXp = (newLevel + 1) * 250;
    student.gamesPlayed += 1;
    student.questionsSolved += correctCount;
    student.bestScore = Math.max(student.bestScore, score);

    const attempt = {
      id: `att_${Date.now()}`,
      studentId: student.id,
      gameId,
      score,
      correctCount,
      totalQuestions,
      accuracyPct,
      timeTakenSeconds,
      xpEarned,
      coinsEarned,
      completedAt: new Date().toISOString()
    };

    this.gameAttempts.push(attempt);
    this.saveStore();

    return {
      attempt,
      student,
      levelUp,
      previousLevel,
      newLevel,
      score,
      correctCount,
      totalQuestions,
      accuracyPct,
      xpEarned,
      coinsEarned,
      timeTaken: `${Math.floor(timeTakenSeconds / 60)}:${timeTakenSeconds % 60 < 10 ? '0' : ''}${timeTakenSeconds % 60}`
    };
  }

  // Claim Reward — FIXED: no longer falls back to 'usr_muthu_123'
  claimReward({ studentId, rewardType = 'coins', amount = 100, badge = null }) {
    const student = this.students[studentId];
    if (!student) {
      console.warn(`[DB] claimReward: student not found for id="${studentId}"`);
      return null;
    }

    if (rewardType === 'coins') student.coins += amount;
    if (rewardType === 'xp') student.totalXp += amount;
    if (badge) {
      student.recentBadge = badge;
      this.userBadges.push({ studentId: student.id, badgeId: badge, unlockedAt: new Date().toISOString() });
    }

    const claimRecord = {
      id: `rw_${Date.now()}`,
      studentId: student.id,
      rewardType,
      amount,
      badge,
      claimedAt: new Date().toISOString()
    };

    this.claimedRewards.push(claimRecord);
    this.saveStore();
    return { success: true, student, claimRecord };
  }

  // Leaderboard Calculation
  getLeaderboard(period = 'daily') {
    const list = [
      { rank: 1, name: "Aarav Sharma", avatar: "👑", level: 18, xp: 4850, score: 1420, streak: 12, isCurrentUser: false },
      { rank: 2, name: "Diya Patel", avatar: "🌟", level: 16, xp: 4120, score: 1350, streak: 9, isCurrentUser: false },
      { rank: 3, name: "Muthu Ram", avatar: "⚡", level: 12, xp: 2450, score: 1250, streak: 5, isCurrentUser: false },
      { rank: 4, name: "Kavya Nair", avatar: "🔥", level: 14, xp: 3290, score: 1190, streak: 8, isCurrentUser: false },
      { rank: 5, name: "Rohan Verma", avatar: "🎯", level: 11, xp: 2180, score: 1050, streak: 4, isCurrentUser: false }
    ];
    return list;
  }

  // Admin Metrics
  getAdminStats() {
    return {
      totalStudents: Object.keys(this.students).length,
      totalGames: this.gameAttempts.length + 12889,
      totalQuestions: this.questions.length + 445,
      totalChapters: 10,
      activePlayers: 340,
      mostPlayedGame: "Quick Quiz Arena",
      difficultTopics: "Quadratic Equation Discriminants & Trigonometry Identities",
      averageScore: 885
    };
  }

  // Expose the store path for startup validation
  getStorePath() {
    return STORE_PATH;
  }
}

export const dbService = new PersistentDataStore();
