import bcrypt from 'bcryptjs';
import { pool } from './dbConnection.js';
import { initialQuestionsData, initialBadgesData } from '../data/initialQuestions.js';

// ─── PostgreSQL-backed Database Service ───────────────────────────────────────
// All user data is persisted in Supabase PostgreSQL.
// No local JSON file — data survives restarts and redeployments.
//
// Tables used:
//   users     — email, password_hash, role
//   students  — profile, XP, coins, stats (FK → users.id)
//
// In-memory only (non-critical, can be re-seeded from initialQuestions.js):
//   this.questions  — static question bank
//   this.badges     — static badge definitions
// ─────────────────────────────────────────────────────────────────────────────

class PersistentDataStore {
  constructor() {
    // Static data (re-loaded from JS file on every startup — no DB needed)
    this.questions = [...initialQuestionsData];
    this.badges = [...initialBadgesData];

    // DB-backed — accessed via async methods
    // these are only kept for the health check endpoint backward compatibility
    this.users = [];
    this.students = {};

    this._initDb();
  }

  // ─── Startup: Ensure tables exist and seed defaults ──────────────────────
  async _initDb() {
    try {
      await this._ensureTablesExist();
      await this._seedDefaultUsers();
      // Cache counts for health endpoint
      const res = await pool.query('SELECT COUNT(*) FROM users');
      const sRes = await pool.query('SELECT COUNT(*) FROM students');
      const userCount = parseInt(res.rows[0].count, 10);
      const studentCount = parseInt(sRes.rows[0].count, 10);
      // populate in-memory arrays for backward-compat with health endpoint
      this.users = new Array(userCount);
      this.students = Object.fromEntries(new Array(studentCount).fill(null).map((_, i) => [i, {}]));
      console.log(`✅ [DB] PostgreSQL ready. Users: ${userCount}, Students: ${studentCount}`);
    } catch (err) {
      console.error('❌ [DB] Failed to initialize PostgreSQL:', err.message);
      console.error('   The server will still start but authentication will fail.');
      console.error('   Check DATABASE_URL in environment variables.');
    }
  }

  // ─── DDL: Create tables if they don't exist ───────────────────────────────
  async _ensureTablesExist() {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id            TEXT PRIMARY KEY,
        email         TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role          TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin')),
        created_at    TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS students (
        id                TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        name              TEXT NOT NULL,
        username          TEXT NOT NULL,
        email             TEXT NOT NULL,
        avatar            TEXT DEFAULT '⚡',
        class_standard    INT  DEFAULT 9,
        level             INT  DEFAULT 1,
        total_xp          INT  DEFAULT 0,
        next_level_xp     INT  DEFAULT 500,
        coins             INT  DEFAULT 0,
        streak_days       INT  DEFAULT 1,
        games_played      INT  DEFAULT 0,
        questions_solved  INT  DEFAULT 0,
        accuracy_pct      INT  DEFAULT 100,
        best_score        INT  DEFAULT 0,
        current_world_id  TEXT DEFAULT 'class9_world1',
        current_world_name TEXT DEFAULT 'Number Quest',
        recent_badge      TEXT DEFAULT '🎯 Novice Adventurer',
        created_at        TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    console.log('✅ [DB] Tables ensured.');
  }

  // ─── Seed Default Users (idempotent — won't duplicate) ────────────────────
  async _seedDefaultUsers() {
    const demoHash  = bcrypt.hashSync('password123', 10);
    const adminHash = bcrypt.hashSync('admin123', 10);

    // Insert demo student
    await pool.query(`
      INSERT INTO users (id, email, password_hash, role, created_at)
      VALUES ($1, $2, $3, 'student', $4)
      ON CONFLICT (id) DO NOTHING
    `, ['usr_muthu_123', 'muthu@mathquest.edu', demoHash, '2026-08-01T00:00:00.000Z']);

    await pool.query(`
      INSERT INTO students (
        id, name, username, email, avatar, class_standard,
        level, total_xp, next_level_xp, coins, streak_days,
        games_played, questions_solved, accuracy_pct, best_score,
        current_world_id, current_world_name, recent_badge, created_at
      ) VALUES (
        'usr_muthu_123', 'Muthu Ram (Demo)', 'muthu_maths', 'muthu@mathquest.edu',
        '⚡', 9, 12, 2450, 3000, 850, 5, 48, 342, 91, 1250,
        'class9_world2', 'Algebra Arena', '🔥 FAST SOLVER', '2026-08-01T00:00:00.000Z'
      )
      ON CONFLICT (id) DO NOTHING
    `);

    // Insert admin
    await pool.query(`
      INSERT INTO users (id, email, password_hash, role, created_at)
      VALUES ($1, $2, $3, 'admin', $4)
      ON CONFLICT (id) DO NOTHING
    `, ['usr_admin_999', 'admin@mathquest.edu', adminHash, '2026-08-01T00:00:00.000Z']);

    console.log('✅ [DB] Default users seeded (skipped if already exist).');
  }

  // ─── Level Calculator ─────────────────────────────────────────────────────
  calculateLevel(xp) {
    if (xp < 500)  return 1;
    if (xp < 1000) return 2;
    if (xp < 1800) return 3;
    if (xp < 2500) return 4;
    if (xp < 3500) return 5;
    if (xp < 5000) return 6;
    return Math.floor(xp / 1000) + 1;
  }

  // ─── REGISTER USER ────────────────────────────────────────────────────────
  async registerUser({ name, username, email, password, classStandard = 9, role = 'student' }) {
    const cleanEmail = email.trim().toLowerCase();

    // Check for duplicate email
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [cleanEmail]);
    if (existing.rows.length > 0) {
      throw new Error('An account with this email already exists. Please log in instead.');
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const userId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const safeRole = role === 'admin' ? 'student' : (role || 'student');
    const cleanUsername = username ? username.trim() : cleanEmail.split('@')[0];

    // Insert user
    await pool.query(
      `INSERT INTO users (id, email, password_hash, role) VALUES ($1, $2, $3, $4)`,
      [userId, cleanEmail, passwordHash, safeRole]
    );

    let student = null;

    if (safeRole === 'student') {
      const worldId   = Number(classStandard) === 10 ? 'class10_world1' : 'class9_world1';
      const worldName = Number(classStandard) === 10 ? 'Real Numbers'   : 'Number Quest';

      await pool.query(`
        INSERT INTO students (
          id, name, username, email, avatar, class_standard,
          level, total_xp, next_level_xp, coins, streak_days,
          games_played, questions_solved, accuracy_pct, best_score,
          current_world_id, current_world_name, recent_badge
        ) VALUES ($1,$2,$3,$4,'⚡',$5,1,0,500,0,1,0,0,100,0,$6,$7,'🎯 Novice Adventurer')
      `, [userId, name || cleanUsername, cleanUsername, cleanEmail,
          Number(classStandard) || 9, worldId, worldName]);

      student = {
        id: userId,
        name: name || cleanUsername,
        username: cleanUsername,
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
        currentWorldId: worldId,
        currentWorldName: worldName,
        recentBadge: '🎯 Novice Adventurer',
      };
    }

    console.log(`✅ [DB] Registered new user: ${cleanEmail} [${safeRole}] id=${userId}`);
    return {
      user: { id: userId, email: cleanEmail, role: safeRole },
      student,
    };
  }

  // ─── LOGIN USER ───────────────────────────────────────────────────────────
  async loginUser({ email, password, expectedRole }) {
    const cleanEmail = email.trim().toLowerCase();

    const userRes = await pool.query('SELECT * FROM users WHERE email = $1', [cleanEmail]);
    if (userRes.rows.length === 0) {
      console.log(`[DB] Login: user not found for email="${cleanEmail}"`);
      return null;
    }

    const user = userRes.rows[0];

    // Verify password
    let isMatch = false;
    try {
      isMatch = bcrypt.compareSync(password, user.password_hash);
    } catch (e) {
      console.warn('[DB] bcrypt error:', e.message);
    }

    if (!isMatch) {
      console.log(`[DB] Login: wrong password for email="${cleanEmail}"`);
      return null;
    }

    // Role check
    if (expectedRole && user.role !== expectedRole) {
      console.log(`[DB] Login: role mismatch. expected="${expectedRole}", got="${user.role}"`);
      return { roleMismatch: true, userRole: user.role };
    }

    // Fetch student profile if applicable
    let student = null;
    if (user.role === 'student') {
      const stRes = await pool.query('SELECT * FROM students WHERE id = $1', [user.id]);
      if (stRes.rows.length > 0) {
        const row = stRes.rows[0];
        student = {
          id: row.id,
          name: row.name,
          username: row.username,
          email: row.email,
          avatar: row.avatar,
          classStandard: row.class_standard,
          level: row.level,
          totalXp: row.total_xp,
          nextLevelXp: row.next_level_xp,
          coins: row.coins,
          streakDays: row.streak_days,
          gamesPlayed: row.games_played,
          questionsSolved: row.questions_solved,
          accuracyPct: row.accuracy_pct,
          bestScore: row.best_score,
          currentWorldId: row.current_world_id,
          currentWorldName: row.current_world_name,
          recentBadge: row.recent_badge,
        };
      }
    }

    console.log(`✅ [DB] Login success: ${cleanEmail} [${user.role}]`);
    return {
      user: { id: user.id, email: user.email, role: user.role },
      student,
    };
  }

  // ─── GET STUDENT BY ID ────────────────────────────────────────────────────
  async getStudentById(studentId) {
    try {
      const res = await pool.query('SELECT * FROM students WHERE id = $1', [studentId]);
      if (res.rows.length === 0) return null;
      const row = res.rows[0];
      return {
        id: row.id,
        name: row.name,
        username: row.username,
        email: row.email,
        avatar: row.avatar,
        classStandard: row.class_standard,
        level: row.level,
        totalXp: row.total_xp,
        nextLevelXp: row.next_level_xp,
        coins: row.coins,
        streakDays: row.streak_days,
        gamesPlayed: row.games_played,
        questionsSolved: row.questions_solved,
        accuracyPct: row.accuracy_pct,
        bestScore: row.best_score,
        currentWorldId: row.current_world_id,
        currentWorldName: row.current_world_name,
        recentBadge: row.recent_badge,
      };
    } catch (err) {
      console.error('[DB] getStudentById error:', err.message);
      return null;
    }
  }

  // ─── UPDATE STUDENT PROFILE ───────────────────────────────────────────────
  async updateStudentProfile(studentId, updateData) {
    try {
      const fields = [];
      const vals   = [];
      let   idx    = 1;

      if (updateData.name)          { fields.push(`name = $${idx++}`);           vals.push(updateData.name); }
      if (updateData.classStandard) { fields.push(`class_standard = $${idx++}`); vals.push(Number(updateData.classStandard)); }
      if (updateData.avatar)        { fields.push(`avatar = $${idx++}`);          vals.push(updateData.avatar); }

      if (fields.length === 0) return await this.getStudentById(studentId);

      vals.push(studentId);
      await pool.query(`UPDATE students SET ${fields.join(', ')} WHERE id = $${idx}`, vals);
      return await this.getStudentById(studentId);
    } catch (err) {
      console.error('[DB] updateStudentProfile error:', err.message);
      return null;
    }
  }

  // ─── SUBMIT GAME ATTEMPT ──────────────────────────────────────────────────
  async submitGameAttempt({ studentId, gameId = 'quiz', answers = [], timeTakenSeconds = 120 }) {
    try {
      const student = await this.getStudentById(studentId);
      if (!student) {
        console.warn(`[DB] submitGameAttempt: student not found id="${studentId}"`);
        return null;
      }

      let correctCount = 0;
      const totalQuestions = answers.length || 5;

      answers.forEach((ans) => {
        const q = this.questions.find(item => item.id === ans.questionId);
        if (q) {
          const correctOpt = q.options.find(o => o.isCorrect);
          if (correctOpt && correctOpt.id === ans.selectedOption) correctCount++;
        } else {
          if (ans.isCorrect) correctCount++;
        }
      });

      if (answers.length === 0) correctCount = 4;

      const score       = correctCount * 100 + 50;
      const accuracyPct = Math.round((correctCount / totalQuestions) * 100);
      const xpEarned    = correctCount * 30 + 50;
      const coinsEarned = correctCount * 10 + 20;

      const previousLevel = student.level;
      const newTotalXp    = student.totalXp + xpEarned;
      const newLevel      = this.calculateLevel(newTotalXp);
      const levelUp       = newLevel > previousLevel;
      const newCoins      = student.coins + coinsEarned;
      const newBestScore  = Math.max(student.bestScore, score);

      // Update DB
      await pool.query(`
        UPDATE students SET
          total_xp         = $1,
          coins            = $2,
          level            = $3,
          next_level_xp    = $4,
          games_played     = games_played + 1,
          questions_solved = questions_solved + $5,
          best_score       = $6
        WHERE id = $7
      `, [newTotalXp, newCoins, newLevel, (newLevel + 1) * 250, correctCount, newBestScore, studentId]);

      const updatedStudent = { ...student, totalXp: newTotalXp, coins: newCoins, level: newLevel,
        nextLevelXp: (newLevel + 1) * 250, gamesPlayed: student.gamesPlayed + 1,
        questionsSolved: student.questionsSolved + correctCount, bestScore: newBestScore };

      const attempt = {
        id: `att_${Date.now()}`,
        studentId,
        gameId,
        score,
        correctCount,
        totalQuestions,
        accuracyPct,
        timeTakenSeconds,
        xpEarned,
        coinsEarned,
        completedAt: new Date().toISOString(),
      };

      return {
        attempt,
        student: updatedStudent,
        levelUp,
        previousLevel,
        newLevel,
        score,
        correctCount,
        totalQuestions,
        accuracyPct,
        xpEarned,
        coinsEarned,
        timeTaken: `${Math.floor(timeTakenSeconds / 60)}:${String(timeTakenSeconds % 60).padStart(2, '0')}`,
      };
    } catch (err) {
      console.error('[DB] submitGameAttempt error:', err.message);
      return null;
    }
  }

  // ─── CLAIM REWARD ─────────────────────────────────────────────────────────
  async claimReward({ studentId, rewardType = 'coins', amount = 100, badge = null }) {
    try {
      const student = await this.getStudentById(studentId);
      if (!student) return null;

      if (rewardType === 'coins') {
        await pool.query('UPDATE students SET coins = coins + $1 WHERE id = $2', [amount, studentId]);
      }
      if (rewardType === 'xp') {
        await pool.query('UPDATE students SET total_xp = total_xp + $1 WHERE id = $2', [amount, studentId]);
      }
      if (badge) {
        await pool.query('UPDATE students SET recent_badge = $1 WHERE id = $2', [badge, studentId]);
      }

      const updatedStudent = await this.getStudentById(studentId);
      return { success: true, student: updatedStudent };
    } catch (err) {
      console.error('[DB] claimReward error:', err.message);
      return null;
    }
  }

  // ─── LEADERBOARD ──────────────────────────────────────────────────────────
  getLeaderboard(_period = 'daily') {
    return [
      { rank: 1, name: 'Aarav Sharma', avatar: '👑', level: 18, xp: 4850, score: 1420, streak: 12, isCurrentUser: false },
      { rank: 2, name: 'Diya Patel',   avatar: '🌟', level: 16, xp: 4120, score: 1350, streak: 9,  isCurrentUser: false },
      { rank: 3, name: 'Muthu Ram',    avatar: '⚡', level: 12, xp: 2450, score: 1250, streak: 5,  isCurrentUser: false },
      { rank: 4, name: 'Kavya Nair',   avatar: '🔥', level: 14, xp: 3290, score: 1190, streak: 8,  isCurrentUser: false },
      { rank: 5, name: 'Rohan Verma',  avatar: '🎯', level: 11, xp: 2180, score: 1050, streak: 4,  isCurrentUser: false },
    ];
  }

  // ─── ADMIN STATS ──────────────────────────────────────────────────────────
  getAdminStats() {
    const userCount    = typeof this.users === 'object' ? Object.keys(this.users).length : 0;
    const studentCount = typeof this.students === 'object' ? Object.keys(this.students).length : 0;
    return {
      totalStudents:   studentCount || 4,
      totalGames:      12901,
      totalQuestions:  this.questions.length + 445,
      totalChapters:   10,
      activePlayers:   340,
      mostPlayedGame:  'Quick Quiz Arena',
      difficultTopics: 'Quadratic Equation Discriminants & Trigonometry Identities',
      averageScore:    885,
    };
  }

  // ─── HEALTH ENDPOINT COMPAT ───────────────────────────────────────────────
  getStorePath() {
    return 'PostgreSQL (Supabase)';
  }
}

export const dbService = new PersistentDataStore();
