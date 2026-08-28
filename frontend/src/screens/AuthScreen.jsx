import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck, Mail, Lock, User, ArrowRight,
  Sparkles, Trophy, Flame, AlertTriangle, GraduationCap,
  Eye, EyeOff
} from 'lucide-react';
import { authService } from '../services/authService';
import { sound } from '../utils/sound';

// ─── Final Safety Net ──────────────────────────────────────────────────────────
// This function is the LAST line of defense before a value is rendered in JSX.
// It guarantees that what we pass to setErrorMsg() is ALWAYS a non-empty string.
// If anything upstream fails (axios, service, or interceptor), this catches it.
function safeStr(value, fallback) {
  // null / undefined
  if (value === null || value === undefined) return fallback;
  // already a safe string
  if (typeof value === 'string') {
    const trimmed = value.trim();
    // Reject [object Object] or empty string
    if (trimmed && !trimmed.includes('[object')) return trimmed;
    return fallback;
  }
  // Error instance
  if (value instanceof Error) {
    const msg = value.message;
    if (typeof msg === 'string' && msg.trim() && !msg.includes('[object')) {
      return msg.trim();
    }
    return fallback;
  }
  // Plain object — try JSON stringify for debugging, return fallback for user
  if (typeof value === 'object') {
    console.error('[AuthScreen] Received non-string error value:', value);
    return fallback;
  }
  // Number, boolean, etc
  return String(value) || fallback;
}

export default function AuthScreen({ onLoginSuccess, onAdminLogin }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register' | 'admin'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [classStandard, setClassStandard] = useState(9);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Wrapper so setErrorMsg can never receive a non-string
  const setError = (value, fallback = 'Authentication failed. Please try again.') => {
    setErrorMsg(safeStr(value, fallback));
  };

  const clearError = () => setErrorMsg('');

  const handleModeChange = (newMode) => {
    sound.playClick();
    setMode(newMode);
    setShowPassword(false);
    clearError();
  };

  // ─── Main Form Submit ────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    sound.playClick();
    clearError();
    setLoading(true);

    try {
      if (mode === 'register') {
        const res = await authService.register({
          name: name.trim(),
          email: email.trim(),
          password,
          classStandard: Number(classStandard),
        });
        if (res && res.success) {
          onLoginSuccess({ user: res.user, student: res.student, token: res.token });
        } else {
          // Backend returned success:false with no throw — shouldn't happen but guard it
          const msg = (res && typeof res.message === 'string') ? res.message : '';
          setError(msg || null, 'Registration failed. Please check your details and try again.');
        }
      } else if (mode === 'login') {
        const res = await authService.login({
          email: email.trim(),
          password,
        });
        if (res && res.success) {
          onLoginSuccess({ user: res.user, student: res.student, token: res.token });
        } else {
          const msg = (res && typeof res.message === 'string') ? res.message : '';
          setError(msg || null, 'Invalid email or password. Please try again.');
        }
      } else if (mode === 'admin') {
        const res = await authService.adminLogin({
          email: email.trim(),
          password,
        });
        if (res && res.success) {
          onAdminLogin({ user: res.user, token: res.token });
        } else {
          const msg = (res && typeof res.message === 'string') ? res.message : '';
          setError(msg || null, 'Access denied. Invalid admin credentials.');
        }
      }
    } catch (err) {
      // err.message is always a plain string from authService/api.js interceptor
      // safeStr provides the absolute final guard
      const fallbacks = {
        register: 'Registration failed. Please check your details and try again.',
        login: 'Invalid email or password. Please try again.',
        admin: 'Access denied. Invalid admin credentials.',
      };
      setError(err, fallbacks[mode] || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ─── Demo / Quick Start Login ────────────────────────────────────────────────
  // Uses REAL API only — no mock data injected
  const handleDemoLogin = async () => {
    sound.playClick();
    clearError();
    setLoading(true);
    try {
      const res = await authService.login({
        email: 'muthu@mathquest.edu',
        password: 'password123',
      });
      if (res && res.success) {
        onLoginSuccess({ user: res.user, student: res.student, token: res.token });
      } else {
        setError(
          (res && res.message) || null,
          'Demo login failed. The server may be starting up — please try again in 30 seconds.'
        );
      }
    } catch (err) {
      setError(
        err,
        'Demo login failed. The server may be temporarily unavailable. Please try again shortly.'
      );
    } finally {
      setLoading(false);
    }
  };

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F0F4FF] dark:bg-[#060913] flex items-center justify-center p-4 math-bg-grid relative overflow-hidden transition-colors duration-300">

      {/* Background Ambient Glow */}
      <div className="orb-glow-cyan top-1/4 left-1/3 blur-[140px] opacity-35" />
      <div className="orb-glow-purple bottom-1/4 right-1/3 blur-[140px] opacity-35" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-panel max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden border border-indigo-200 dark:border-white/15 shadow-2xl relative z-10"
      >

        {/* Left Gaming Banner */}
        <div className="bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 p-8 text-white flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-indigo-200/30 dark:border-white/10">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-400 text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg border border-white">
                📐
              </div>
              <h2 className="text-3xl font-black tracking-tight font-heading text-white">
                Math<span className="text-amber-400">Quest</span>
              </h2>
            </div>

            <h3 className="text-3xl font-black tracking-tight leading-tight font-heading text-white pt-2">
              Unlock Your Maths Powers! 🚀
            </h3>
            <p className="text-sm text-cyan-200 leading-relaxed font-medium font-body">
              Join thousands of CBSE Class 9th &amp; 10th students conquering Algebra, Geometry, Trigonometry, and Statistics through high-stakes interactive gaming.
            </p>
          </div>

          <div className="my-6 space-y-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-xs relative z-10">
            <div className="flex items-center gap-2.5">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="text-amber-300 font-black font-heading">Level Progression &amp; Gold Coins</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
              <span className="text-orange-300 font-black font-heading">Daily Streaks &amp; XP Multipliers</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-300 font-black font-heading">National Leaderboard &amp; Rank Badges</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-300 font-bold uppercase tracking-widest relative z-10 flex items-center gap-1.5 font-heading">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> CBSE Standard 9 &amp; 10 Aligned
          </div>
        </div>

        {/* Right Form Container */}
        <div className="p-8 flex flex-col justify-center bg-white/90 dark:bg-slate-950/80 backdrop-blur-xl">

          {/* Mode Switcher */}
          <div className="flex items-center justify-between mb-6 bg-slate-100 dark:bg-white/5 p-1.5 rounded-2xl border border-slate-200 dark:border-white/10">
            <button
              onClick={() => handleModeChange('login')}
              className={`flex-1 py-2 text-xs font-black font-heading rounded-xl transition-all cursor-pointer ${
                mode === 'login' ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Student Login
            </button>
            <button
              onClick={() => handleModeChange('register')}
              className={`flex-1 py-2 text-xs font-black font-heading rounded-xl transition-all cursor-pointer ${
                mode === 'register' ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Register
            </button>
            <button
              onClick={() => handleModeChange('admin')}
              className={`flex-1 py-2 text-xs font-black font-heading rounded-xl transition-all cursor-pointer ${
                mode === 'admin' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Admin Mode
            </button>
          </div>

          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-1 font-heading">
            {mode === 'login' && 'Welcome Back, Champion! 👋'}
            {mode === 'register' && 'Create Student Account 🎮'}
            {mode === 'admin' && 'Admin Portal Access 🔐'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 font-semibold font-body">
            {mode === 'admin'
              ? 'Manage math question banks, student progress & system analytics'
              : mode === 'register'
              ? 'Register a new student account to track your level, XP, and badges'
              : 'Enter your student credentials to log into your account'}
          </p>

          {/* Error Message Box — errorMsg is guaranteed to be a string by setError() */}
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-rose-50 dark:bg-rose-500/20 border border-rose-400 text-rose-700 dark:text-rose-200 p-3.5 rounded-xl text-xs font-heading font-black mb-4 flex items-start gap-2"
            >
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              {/* Explicit String() cast — the absolute last safety net */}
              <span>{String(errorMsg)}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-black font-heading text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-indigo-600 dark:text-cyan-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Rahul Kumar"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:border-indigo-600 dark:focus:border-cyan-400 outline-none text-sm font-semibold transition-all"
                    required
                  />
                </div>
              </div>
            )}

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-black font-heading text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">Class Standard</label>
                <div className="grid grid-cols-2 gap-3 font-heading">
                  <button
                    type="button"
                    onClick={() => setClassStandard(9)}
                    className={`py-2.5 rounded-xl text-xs font-black border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      classStandard === 9
                        ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white border-cyan-400 shadow-md'
                        : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-white/10'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4" /> Class 9th
                  </button>
                  <button
                    type="button"
                    onClick={() => setClassStandard(10)}
                    className={`py-2.5 rounded-xl text-xs font-black border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      classStandard === 10
                        ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white border-cyan-400 shadow-md'
                        : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-white/10'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4" /> Class 10th
                  </button>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-black font-heading text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                {mode === 'admin' ? 'Teacher / Admin Email' : 'Student Email'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-indigo-600 dark:text-cyan-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={mode === 'admin' ? 'admin@mathquest.edu' : 'student@mathquest.edu'}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:border-indigo-600 dark:focus:border-cyan-400 outline-none text-sm font-semibold transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black font-heading text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-indigo-600 dark:text-cyan-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:border-indigo-600 dark:focus:border-cyan-400 outline-none text-sm font-semibold transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors focus:outline-none cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-black font-heading text-sm flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer ${
                mode === 'admin'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-600/40'
                  : 'btn-game-cyan'
              } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <span>
                {loading
                  ? 'CONNECTING...'
                  : mode === 'login'
                  ? 'LOGIN & ENTER ARENA'
                  : mode === 'register'
                  ? 'CREATE ACCOUNT'
                  : 'ENTER ADMIN PORTAL'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </form>

          {/* Quick Demo — uses real API, no mock data */}
          {mode !== 'admin' && (
            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-white/10 text-center">
              <button
                onClick={handleDemoLogin}
                disabled={loading}
                className="w-full py-2.5 bg-indigo-50/80 dark:bg-white/5 hover:bg-indigo-100 dark:hover:bg-white/10 text-indigo-800 dark:text-cyan-300 font-heading font-extrabold text-xs rounded-xl border border-indigo-200 dark:border-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <span>⚡ Quick Start / Play as Demo Student</span>
              </button>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
