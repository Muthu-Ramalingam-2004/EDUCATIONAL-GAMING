-- ====================================================================
-- MathQuest Educational Gaming Platform - PostgreSQL Supabase Schema
-- ====================================================================

-- 1. Users table (Authentication & Core Credentials)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Students table (Player Profiles & Stats)
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    avatar VARCHAR(50) DEFAULT '⚡',
    class_standard INT NOT NULL CHECK (class_standard IN (9, 10)),
    level INT DEFAULT 1,
    total_xp INT DEFAULT 0,
    coins INT DEFAULT 100,
    streak_days INT DEFAULT 1,
    games_played INT DEFAULT 0,
    questions_solved INT DEFAULT 0,
    accuracy_pct INT DEFAULT 0,
    best_score INT DEFAULT 0,
    last_active_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Admins table
CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    permissions JSONB DEFAULT '{"manage_questions": true, "manage_rewards": true}'
);

-- 4. Classes table
CREATE TABLE IF NOT EXISTS classes (
    id SERIAL PRIMARY KEY,
    standard INT UNIQUE NOT NULL,
    title VARCHAR(100) NOT NULL
);

-- 5. Subjects table
CREATE TABLE IF NOT EXISTS subjects (
    id SERIAL PRIMARY KEY,
    class_id INT REFERENCES classes(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL DEFAULT 'Mathematics'
);

-- 6. Chapters (Game Worlds) table
CREATE TABLE IF NOT EXISTS chapters (
    id VARCHAR(100) PRIMARY KEY,
    class_standard INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    icon VARCHAR(50) DEFAULT '🎮',
    color_gradient VARCHAR(100) DEFAULT 'from-blue-600 to-indigo-700',
    total_levels INT DEFAULT 5,
    order_index INT DEFAULT 1
);

-- 7. Topics table
CREATE TABLE IF NOT EXISTS topics (
    id VARCHAR(100) PRIMARY KEY,
    chapter_id VARCHAR(100) REFERENCES chapters(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT
);

-- 8. Questions table
CREATE TABLE IF NOT EXISTS questions (
    id VARCHAR(100) PRIMARY KEY,
    chapter_id VARCHAR(100) REFERENCES chapters(id) ON DELETE CASCADE,
    topic_id VARCHAR(100) REFERENCES topics(id) ON DELETE SET NULL,
    class_standard INT NOT NULL,
    level_number INT DEFAULT 1,
    question_type VARCHAR(50) NOT NULL DEFAULT 'quiz' CHECK (question_type IN ('quiz', 'puzzle', 'dragdrop')),
    question_text TEXT NOT NULL,
    problem_statement TEXT,
    sequence_json JSONB,
    explanation TEXT,
    hint TEXT,
    difficulty VARCHAR(50) DEFAULT 'Medium',
    xp_reward INT DEFAULT 50,
    coins_reward INT DEFAULT 20,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Question Options table
CREATE TABLE IF NOT EXISTS question_options (
    id SERIAL PRIMARY KEY,
    question_id VARCHAR(100) REFERENCES questions(id) ON DELETE CASCADE,
    option_key VARCHAR(10) NOT NULL,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE
);

-- 10. Games (Modes) table
CREATE TABLE IF NOT EXISTS games (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    mode VARCHAR(50) NOT NULL,
    difficulty VARCHAR(50) DEFAULT 'Medium',
    xp_reward INT DEFAULT 150,
    min_level INT DEFAULT 1,
    description TEXT
);

-- 11. Game Levels table
CREATE TABLE IF NOT EXISTS game_levels (
    id SERIAL PRIMARY KEY,
    chapter_id VARCHAR(100) REFERENCES chapters(id) ON DELETE CASCADE,
    level_number INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    difficulty VARCHAR(50) DEFAULT 'Easy',
    xp_reward INT DEFAULT 120
);

-- 12. Student Game Attempts table
CREATE TABLE IF NOT EXISTS student_game_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    game_id VARCHAR(100),
    chapter_id VARCHAR(100),
    score INT DEFAULT 0,
    correct_count INT DEFAULT 0,
    total_questions INT DEFAULT 0,
    accuracy_pct INT DEFAULT 0,
    time_taken_seconds INT DEFAULT 0,
    xp_earned INT DEFAULT 0,
    coins_earned INT DEFAULT 0,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. Student Answers table
CREATE TABLE IF NOT EXISTS student_answers (
    id SERIAL PRIMARY KEY,
    attempt_id UUID REFERENCES student_game_attempts(id) ON DELETE CASCADE,
    question_id VARCHAR(100) REFERENCES questions(id) ON DELETE CASCADE,
    selected_option VARCHAR(100),
    is_correct BOOLEAN DEFAULT FALSE
);

-- 14. Student Progress table
CREATE TABLE IF NOT EXISTS student_progress (
    id SERIAL PRIMARY KEY,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    chapter_id VARCHAR(100) REFERENCES chapters(id) ON DELETE CASCADE,
    completed_levels INT DEFAULT 0,
    total_stars INT DEFAULT 0,
    completion_pct INT DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_student_chapter UNIQUE (student_id, chapter_id)
);

-- 15. Badges table
CREATE TABLE IF NOT EXISTS badges (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50) DEFAULT 'Achievement',
    xp_reward INT DEFAULT 100,
    icon VARCHAR(50) DEFAULT '🏆'
);

-- 16. Student Badges table
CREATE TABLE IF NOT EXISTS student_badges (
    id SERIAL PRIMARY KEY,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    badge_id VARCHAR(100) REFERENCES badges(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_student_badge UNIQUE (student_id, badge_id)
);

-- 17. Rewards table
CREATE TABLE IF NOT EXISTS rewards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    reward_type VARCHAR(50) NOT NULL CHECK (reward_type IN ('coins', 'xp', 'badge')),
    amount INT DEFAULT 0,
    badge_id VARCHAR(100),
    source VARCHAR(100) DEFAULT 'mission_complete',
    claimed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 18. Leaderboard View / Snapshot table
CREATE TABLE IF NOT EXISTS leaderboard (
    id SERIAL PRIMARY KEY,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    period VARCHAR(20) NOT NULL CHECK (period IN ('daily', 'weekly', 'monthly', 'overall')),
    rank INT NOT NULL,
    xp INT DEFAULT 0,
    score INT DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance queries
CREATE INDEX IF NOT EXISTS idx_questions_class ON questions(class_standard);
CREATE INDEX IF NOT EXISTS idx_questions_topic ON questions(topic_id);
CREATE INDEX IF NOT EXISTS idx_attempts_student ON student_game_attempts(student_id);
CREATE INDEX IF NOT EXISTS idx_progress_student ON student_progress(student_id);
