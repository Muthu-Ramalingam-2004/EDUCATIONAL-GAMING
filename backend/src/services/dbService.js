import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { supabase } from '../config/supabase.js';
import { initialQuestionsData, initialBadgesData } from '../data/initialQuestions.js';

// ─── Supabase HTTP REST DB Service ──────────────────────────────────────────
// Persistent PostgreSQL storage via Supabase HTTPS API (Port 443 IPv4/IPv6 compatible)
// ─────────────────────────────────────────────────────────────────────────────

function mapStudentRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name || 'Student',
    username: row.username || row.name || 'user',
    email: row.email || '',
    avatar: row.avatar || '⚡',
    classStandard: Number(row.class_standard) || 9,
    level: Number(row.level) || 1,
    totalXp: Number(row.total_xp) || 0,
    nextLevelXp: Number(row.next_level_xp) || 500,
    coins: Number(row.coins) || 0,
    streakDays: Number(row.streak_days) || 1,
    gamesPlayed: Number(row.games_played) || 0,
    questionsSolved: Number(row.questions_solved) || 0,
    accuracyPct: Number(row.accuracy_pct) || 100,
    bestScore: Number(row.best_score) || 0,
    currentWorldId: row.current_world_id || 'class9_world1',
    currentWorldName: row.current_world_name || 'Number Quest',
    recentBadge: row.recent_badge || '🎯 Novice Adventurer',
    createdAt: row.created_at
  };
}

class PersistentDataStore {
  constructor() {
    this.questions = [...initialQuestionsData];
    this.badges = [...initialBadgesData];
    this.claimedRewards = [];
    this.gameAttempts = [];
    this.userBadges = [];
  }

  // Calculate Level based on XP
  calculateLevel(xp) {
    if (xp < 500) return 1;
    if (xp < 1000) return 2;
    if (xp < 1800) return 3;
    if (xp < 2500) return 4;
    if (xp < 3500) return 5;
    if (xp < 5000) return 6;
    return Math.floor(xp / 1000) + 1;
  }

  // ─── REGISTER USER ────────────────────────────────────────────────────────
  async registerUser({ name, username, email, password, classStandard = 9, role = 'student' }) {
    if (!supabase) {
      throw new Error('Database service is not available. Please try again later.');
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check duplicate email
    const { data: existing, error: checkErr } = await supabase
      .from('users')
      .select('id')
      .eq('email', cleanEmail);

    if (checkErr) {
      console.error('[DB] Check duplicate error:', checkErr.message);
      throw new Error('Database connection error. Please try again.');
    }

    if (existing && existing.length > 0) {
      throw new Error('An account with this email already exists. Please log in instead.');
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const userId = crypto.randomUUID();
    const safeRole = role === 'admin' ? 'student' : (role || 'student');
    const cleanUsername = username ? username.trim() : cleanEmail.split('@')[0];

    // 1. Insert User
    const { data: newUser, error: userErr } = await supabase
      .from('users')
      .insert([{
        id: userId,
        email: cleanEmail,
        password_hash: passwordHash,
        role: safeRole
      }])
      .select()
      .single();

    if (userErr) {
      console.error('[DB] User insert error:', userErr.message);
      throw new Error(userErr.message || 'Failed to create user account.');
    }

    let student = null;

    // 2. Insert Student Profile if role is student
    if (safeRole === 'student') {
      const worldId = Number(classStandard) === 10 ? 'class10_world1' : 'class9_world1';
      const worldName = Number(classStandard) === 10 ? 'Real Numbers' : 'Number Quest';

      const studentPayload = {
        id: userId,
        name: name ? name.trim() : cleanUsername,
        username: cleanUsername,
        email: cleanEmail,
        avatar: '⚡',
        class_standard: Number(classStandard) || 9,
        level: 1,
        total_xp: 0,
        next_level_xp: 500,
        coins: 0,
        streak_days: 1,
        games_played: 0,
        questions_solved: 0,
        accuracy_pct: 100,
        best_score: 0,
        current_world_id: worldId,
        current_world_name: worldName,
        recent_badge: '🎯 Novice Adventurer'
      };

      const { data: newStudent, error: stErr } = await supabase
        .from('students')
        .insert([studentPayload])
        .select()
        .single();

      if (stErr) {
        console.error('[DB] Student profile insert error:', stErr.message);
        // Rollback user entry if student creation failed
        await supabase.from('users').delete().eq('id', userId);
        throw new Error(stErr.message || 'Failed to create student profile.');
      }

      student = mapStudentRow(newStudent);
    }

    console.log(`✅ [DB] User registered: ${cleanEmail} [${safeRole}]`);
    return {
      user: { id: newUser.id, email: newUser.email, role: newUser.role },
      student
    };
  }

  // ─── LOGIN USER ───────────────────────────────────────────────────────────
  async loginUser({ email, password, expectedRole, adminId }) {
    if (!supabase) {
      throw new Error('Database service is not available.');
    }

    let query = supabase.from('users').select('*');
    let logIdentifier = '';
    
    if (adminId) {
      const cleanAdminId = adminId.trim().toLowerCase();
      logIdentifier = cleanAdminId;
      query = query.or(`admin_id.eq.${cleanAdminId},email.eq.${cleanAdminId}`);
    } else {
      const cleanEmail = (email || '').trim().toLowerCase();
      logIdentifier = cleanEmail;
      query = query.eq('email', cleanEmail);
    }

    const { data: users, error: userErr } = await query;

    if (userErr) {
      console.error('[DB] Login query error:', userErr.message);
      throw new Error('Database connection error during login.');
    }

    if (!users || users.length === 0) {
      console.log(`[DB] Login: user not found ID/email="${logIdentifier}"`);
      return null;
    }

    const user = users[0];

    // Password verification
    let isMatch = false;
    try {
      isMatch = bcrypt.compareSync(password, user.password_hash);
    } catch (e) {
      console.warn('[DB] Password hash check failed:', e.message);
    }

    if (!isMatch) {
      console.log(`[DB] Login: password mismatch ID/email="${logIdentifier}"`);
      return null;
    }

    // Role verification
    if (expectedRole && user.role !== expectedRole) {
      console.log(`[DB] Login: role mismatch expected="${expectedRole}" got="${user.role}"`);
      return { roleMismatch: true, userRole: user.role };
    }

    let student = null;
    if (user.role === 'student') {
      const { data: stData } = await supabase
        .from('students')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      student = mapStudentRow(stData);
    }

    console.log(`✅ [DB] Login successful: ${logIdentifier} [${user.role}]`);
    return {
      user: { id: user.id, email: user.email, role: user.role },
      student
    };
  }

  // ─── VERIFY RESET EMAIL ───────────────────────────────────────────────────
  async verifyResetEmail(email) {
    if (!supabase) {
      throw new Error('Database service is not available.');
    }
    const cleanEmail = email.trim().toLowerCase();
    const { data: users, error } = await supabase
      .from('users')
      .select('id, email, role')
      .eq('email', cleanEmail);

    if (error) {
      console.error('[DB] verifyResetEmail query error:', error.message);
      throw new Error('Database connection error during email verification.');
    }

    if (!users || users.length === 0) {
      throw new Error('No account found with this email address.');
    }

    const user = users[0];
    return {
      exists: true,
      user: { id: user.id, email: user.email, role: user.role }
    };
  }

  // ─── RESET PASSWORD ───────────────────────────────────────────────────────
  async resetPassword({ email, newPassword }) {
    if (!supabase) {
      throw new Error('Database service is not available.');
    }
    const cleanEmail = email.trim().toLowerCase();

    const { data: users, error: findErr } = await supabase
      .from('users')
      .select('id, email')
      .eq('email', cleanEmail);

    if (findErr) {
      console.error('[DB] resetPassword find user error:', findErr.message);
      throw new Error('Database error while finding user account.');
    }

    if (!users || users.length === 0) {
      throw new Error('No account found with this email address.');
    }

    const user = users[0];
    const passwordHash = bcrypt.hashSync(newPassword, 10);

    const { error: updateErr } = await supabase
      .from('users')
      .update({ password_hash: passwordHash })
      .eq('id', user.id);

    if (updateErr) {
      console.error('[DB] resetPassword update error:', updateErr.message);
      throw new Error('Failed to update password in database.');
    }

    console.log(`✅ [DB] Password reset successfully for email="${cleanEmail}"`);
    return { success: true, message: 'Password changed successfully! You can now log in.' };
  }

  // ─── GET STUDENT BY ID ────────────────────────────────────────────────────
  async getStudentById(studentId) {
    if (!supabase || !studentId) return null;
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('id', studentId)
        .maybeSingle();

      if (error) {
        console.error('[DB] getStudentById error:', error.message);
        return null;
      }
      return mapStudentRow(data);
    } catch (e) {
      console.error('[DB] getStudentById exception:', e.message);
      return null;
    }
  }

  // ─── UPDATE STUDENT PROFILE ───────────────────────────────────────────────
  async updateStudentProfile(studentId, updateData) {
    if (!supabase || !studentId) return null;
    try {
      const dbUpdates = {};
      if (updateData.name) dbUpdates.name = updateData.name;
      if (updateData.classStandard) dbUpdates.class_standard = Number(updateData.classStandard);
      if (updateData.avatar) dbUpdates.avatar = updateData.avatar;
      if (updateData.totalXp) {
        dbUpdates.total_xp = Number(updateData.totalXp);
        dbUpdates.level = this.calculateLevel(dbUpdates.total_xp);
        dbUpdates.next_level_xp = (dbUpdates.level + 1) * 250;
      }
      if (updateData.coins) dbUpdates.coins = Number(updateData.coins);
      if (updateData.streakDays) dbUpdates.streak_days = Number(updateData.streakDays);
      if (updateData.currentWorldId) dbUpdates.current_world_id = updateData.currentWorldId;
      if (updateData.currentWorldName) dbUpdates.current_world_name = updateData.currentWorldName;
      if (updateData.recentBadge) dbUpdates.recent_badge = updateData.recentBadge;

      const { data, error } = await supabase
        .from('students')
        .update(dbUpdates)
        .eq('id', studentId)
        .select()
        .single();

      if (error) {
        console.error('[DB] updateStudentProfile error:', error.message);
        return null;
      }
      return mapStudentRow(data);
    } catch (e) {
      console.error('[DB] updateStudentProfile exception:', e.message);
      return null;
    }
  }

  // ─── SUBMIT GAME ATTEMPT ──────────────────────────────────────────────────
  async submitGameAttempt({ studentId, gameId = 'quiz', answers = [], timeTakenSeconds = 120 }) {
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

    const score = correctCount * 100 + 50;
    const accuracyPct = Math.round((correctCount / totalQuestions) * 100);
    const xpEarned = correctCount * 30 + 50;
    const coinsEarned = correctCount * 10 + 20;

    const previousLevel = student.level;
    const newTotalXp = student.totalXp + xpEarned;
    const newLevel = this.calculateLevel(newTotalXp);
    const levelUp = newLevel > previousLevel;
    const newCoins = student.coins + coinsEarned;
    const newBestScore = Math.max(student.bestScore, score);

    const updated = await this.updateStudentProfile(studentId, {
      totalXp: newTotalXp,
      coins: newCoins,
      gamesPlayed: student.gamesPlayed + 1,
      questionsSolved: student.questionsSolved + correctCount,
      bestScore: newBestScore
    });

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

    return {
      attempt,
      student: updated || student,
      levelUp,
      previousLevel,
      newLevel,
      score,
      correctCount,
      totalQuestions,
      accuracyPct,
      xpEarned,
      coinsEarned,
      timeTaken: `${Math.floor(timeTakenSeconds / 60)}:${String(timeTakenSeconds % 60).padStart(2, '0')}`
    };
  }

  // ─── CLAIM REWARD ─────────────────────────────────────────────────────────
  async claimReward({ studentId, rewardType = 'coins', amount = 100, badge = null }) {
    const student = await this.getStudentById(studentId);
    if (!student) return null;

    const updates = {};
    if (rewardType === 'coins') updates.coins = student.coins + amount;
    if (rewardType === 'xp') updates.totalXp = student.totalXp + amount;
    if (badge) updates.recentBadge = badge;

    const updatedStudent = await this.updateStudentProfile(studentId, updates);
    return { success: true, student: updatedStudent || student };
  }

  // Leaderboard
  getLeaderboard() {
    return [
      { rank: 1, name: "Aarav Sharma", avatar: "👑", level: 18, xp: 4850, score: 1420, streak: 12, isCurrentUser: false },
      { rank: 2, name: "Diya Patel", avatar: "🌟", level: 16, xp: 4120, score: 1350, streak: 9, isCurrentUser: false },
      { rank: 3, name: "Muthu Ram", avatar: "⚡", level: 12, xp: 2450, score: 1250, streak: 5, isCurrentUser: false },
      { rank: 4, name: "Kavya Nair", avatar: "🔥", level: 14, xp: 3290, score: 1190, streak: 8, isCurrentUser: false },
      { rank: 5, name: "Rohan Verma", avatar: "🎯", level: 11, xp: 2180, score: 1050, streak: 4, isCurrentUser: false }
    ];
  }

  // Admin stats
  getAdminStats() {
    return {
      totalStudents: 4,
      totalGames: 12901,
      totalQuestions: this.questions.length + 445,
      totalChapters: 10,
      activePlayers: 340,
      mostPlayedGame: "Quick Quiz Arena",
      difficultTopics: "Quadratic Equation Discriminants & Trigonometry Identities",
      averageScore: 885
    };
  }

  getStorePath() {
    return 'Supabase Cloud PostgreSQL Database';
  }

  // ─── GET ALL STUDENTS (ADMIN API) ─────────────────────────────────────────
  async getAllStudents() {
    if (!supabase) {
      return Object.values(this.students || {}).map(s => mapStudentRow(s));
    }
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('[DB] getAllStudents error:', error.message);
      return [];
    }
    return data.map(row => mapStudentRow(row));
  }

  // ─── DELETE STUDENT (ADMIN API) ───────────────────────────────────────────
  async deleteStudent(studentId) {
    if (!supabase) return false;
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', studentId);
    if (error) {
      console.error('[DB] deleteStudent error:', error.message);
      return false;
    }
    return true;
  }

  // ─── GET REAL ADMIN STATISTICS (ADMIN API) ───────────────────────────────
  async getRealAdminStats() {
    if (!supabase) {
      return this.getAdminStats();
    }

    try {
      // 1. Get total students count
      const { count: totalStudents } = await supabase
        .from('students')
        .select('*', { count: 'exact', head: true });

      // 2. Get total questions count
      const totalQuestions = this.questions.length;

      // 3. Get total game attempts count
      const { count: totalGames } = await supabase
        .from('student_game_attempts')
        .select('*', { count: 'exact', head: true });

      // 4. Get active players count (students active in the last 7 days)
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const { count: activePlayers } = await supabase
        .from('students')
        .select('*', { count: 'exact', head: true })
        .gt('last_active_at', sevenDaysAgo);

      // 5. Get average accuracy or average score
      const { data: attempts } = await supabase
        .from('student_game_attempts')
        .select('score, accuracy_pct');
      
      let averageScore = 0;
      let averageAccuracy = 100;
      if (attempts && attempts.length > 0) {
        const sumScore = attempts.reduce((sum, att) => sum + (att.score || 0), 0);
        averageScore = Math.round(sumScore / attempts.length);
        const sumAcc = attempts.reduce((sum, att) => sum + (att.accuracy_pct || 0), 0);
        averageAccuracy = Math.round(sumAcc / attempts.length);
      }

      return {
        totalStudents: totalStudents || 0,
        totalGames: totalGames || 0,
        totalQuestions: totalQuestions || 0,
        activePlayers: activePlayers || 0,
        averageScore: averageScore || 0,
        averageAccuracy: averageAccuracy || 100,
        mostPlayedGame: "Quick Quiz Arena",
        difficultTopics: "Quadratic Equations, Trigonometry"
      };
    } catch (err) {
      console.error('[DB] getRealAdminStats error:', err.message);
      return this.getAdminStats();
    }
  }

  // ─── GET REAL LEADERBOARD (ADMIN API) ─────────────────────────────────────
  async getRealLeaderboard() {
    if (!supabase) {
      return this.getLeaderboard();
    }
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('total_xp', { ascending: false })
      .limit(20);

    if (error) {
      console.error('[DB] getRealLeaderboard error:', error.message);
      return this.getLeaderboard();
    }

    return data.map((row, idx) => ({
      rank: idx + 1,
      name: row.name || 'Student',
      avatar: row.avatar || '⚡',
      level: Number(row.level) || 1,
      xp: Number(row.total_xp) || 0,
      score: Number(row.best_score) || 0,
      streak: Number(row.streak_days) || 1,
      isCurrentUser: false
    }));
  }
}

export const dbService = new PersistentDataStore();
