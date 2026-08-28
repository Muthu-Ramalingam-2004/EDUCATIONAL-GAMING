import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';

// Load env FIRST before any other imports that read process.env
dotenv.config();

// Route Imports
import authRoutes from './routes/authRoutes.js';
import gameRoutes from './routes/gameRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import progressRoutes from './routes/progressRoutes.js';
import rewardRoutes from './routes/rewardRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// DB service import (triggers store load and startup logging)
import { dbService } from './services/dbService.js';

const app = express();
const PORT = parseInt(process.env.PORT || '5000', 10);
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// ─── Global Crash Handlers ──────────────────────────────────────────────────
// Prevent the process from silently dying and causing 502 errors
process.on('uncaughtException', (err) => {
  console.error('💥 [FATAL] Uncaught Exception:', err.message);
  console.error(err.stack);
  // Don't exit — keep server alive for diagnostics
});

process.on('unhandledRejection', (reason) => {
  console.error('💥 [FATAL] Unhandled Promise Rejection:', reason);
  // Don't exit — keep server alive
});

// ─── CORS Middleware ─────────────────────────────────────────────────────────
// Strip trailing slashes from FRONTEND_URL (common misconfiguration)
const cleanFrontendUrl = (FRONTEND_URL || '').replace(/\/+$/, '');

// Origins allowed to call this backend
const allowedOrigins = [
  cleanFrontendUrl,
  'https://educational-maths-gaming.vercel.app', // Production Vercel URL (hardcoded fallback)
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (server-to-server, Postman, curl, mobile)
    if (!origin) return callback(null, true);
    // Exact match against known origins
    if (allowedOrigins.includes(origin)) return callback(null, true);
    // Allow ALL Vercel preview/staging deployments (*.vercel.app)
    if (origin.endsWith('.vercel.app')) return callback(null, true);
    // Allow localhost on any port (development)
    if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) return callback(null, true);

    console.warn(`[CORS] Blocked request from origin: ${origin}`);
    // Return JSON-safe error — don't throw as Express may not serialize it properly
    callback(null, false);
  },
  credentials: false, // false = no cookie passing — safer for cross-origin API
}));

app.use(express.json());

// ─── Health Check Endpoint ───────────────────────────────────────────────────
app.get('/api/health', async (req, res) => {
  try {
    const { pool } = await import('./services/dbConnection.js');
    const userRes    = await pool.query('SELECT COUNT(*) FROM users');
    const studentRes = await pool.query('SELECT COUNT(*) FROM students');
    const userCount    = parseInt(userRes.rows[0].count, 10);
    const studentCount = parseInt(studentRes.rows[0].count, 10);
    res.json({
      success: true,
      message: 'MathQuest backend is running',
      timestamp: new Date().toISOString(),
      database: {
        status:   'connected (PostgreSQL/Supabase)',
        users:    userCount,
        students: studentCount
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Health check failed — database may be unavailable.',
      error:   err.message
    });
  }
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/admin', adminRoutes);

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.path}` });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('🔴 [Server Error]', err.message);
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
function startServer() {
  const server = app.listen(PORT, () => {
    const userCount = dbService.users ? dbService.users.length : 0;
    const studentCount = dbService.students ? Object.keys(dbService.students).length : 0;
    const storePath = dbService.getStorePath();
    const storeExists = fs.existsSync(storePath);

    console.log(`\n${'='.repeat(60)}`);
    console.log(`⚡  MathQuest Backend Server started on port ${PORT}`);
    console.log(`🔗  API Base URL   : http://localhost:${PORT}/api`);
    console.log(`🏥  Health Check   : http://localhost:${PORT}/api/health`);
    console.log(`${'─'.repeat(60)}`);
    console.log(`📂  Store File     : ${storePath}`);
    console.log(`💾  File exists    : ${storeExists ? '✅ YES' : '❌ NO (will be created on first write)'}`);
    console.log(`👥  Users loaded   : ${userCount}`);
    console.log(`🎓  Students loaded: ${studentCount}`);
    console.log(`${'='.repeat(60)}\n`);

    if (userCount === 0) {
      console.warn('⚠️  WARNING: No users loaded. The store may be empty or the path is wrong.');
      console.warn(`   Expected file: ${storePath}`);
    }
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n❌ [STARTUP ERROR] Port ${PORT} is already in use!`);
      console.error(`   Another backend instance may be running.`);
      console.error(`   Kill it with: npx kill-port ${PORT}`);
      console.error(`   Then restart: npm run dev\n`);
      process.exit(1);
    } else {
      console.error('❌ [STARTUP ERROR] Server failed to start:', err.message);
      process.exit(1);
    }
  });
}

startServer();
