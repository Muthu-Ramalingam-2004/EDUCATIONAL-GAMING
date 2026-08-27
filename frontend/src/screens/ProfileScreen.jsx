import React from 'react';
import { motion } from 'framer-motion';
import { User, Flame, Coins, Sparkles, Trophy, Settings, LogOut, Key, Edit3 } from 'lucide-react';
import { sound } from '../utils/sound';

export default function ProfileScreen({ user, onOpenEditProfile, onLogout }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Player Header Banner Card */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 sm:p-8 text-white relative overflow-hidden rounded-3xl border-2 border-amber-400/60 shadow-2xl bg-gradient-to-br from-indigo-950 via-slate-950 to-purple-950"
      >
        <div className="orb-glow-gold top-0 right-0 blur-[120px] opacity-35" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10 text-center sm:text-left">
          
          {/* Avatar Icon */}
          <div className="relative">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-heading font-black text-5xl sm:text-6xl flex items-center justify-center shadow-2xl border-4 border-white">
              {user.avatar || '⚡'}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 text-xs font-heading font-black px-3 py-1 rounded-xl shadow-lg border border-slate-950">
              Lvl {user.level}
            </div>
          </div>

          {/* Player Main Info */}
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <h1 className="text-3xl font-black font-heading tracking-tight text-white">
                {user.name}
              </h1>
              <span className="bg-amber-400/20 text-amber-300 text-xs font-heading font-black px-3 py-1 rounded-full border border-amber-400/40">
                Class {user.activeClass}th Student
              </span>
            </div>

            <p className="text-xs text-cyan-200 font-semibold font-body">
              @{user.username || 'muthu_maths'} • Joined Aug 2026
            </p>

            {/* Currency Badges */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 pt-2 font-heading">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15 text-xs font-black flex items-center gap-1.5 text-amber-300 shadow-md">
                <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} /> {user.xp?.toLocaleString()} XP
              </div>

              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15 text-xs font-black flex items-center gap-1.5 text-amber-400 shadow-md">
                <Coins className="w-4 h-4 text-amber-400 fill-amber-400" /> {user.coins} Coins
              </div>

              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15 text-xs font-black flex items-center gap-1.5 text-orange-400 shadow-md">
                <Flame className="w-4 h-4 text-orange-400 fill-orange-400 animate-bounce" /> {user.streakDays || 1}d Streak
              </div>
            </div>
          </div>

          {/* Edit Profile CTA */}
          <div>
            <button
              onClick={() => { sound.playClick(); onOpenEditProfile(); }}
              className="btn-game-gold text-xs py-3 px-5 shadow-xl flex items-center gap-2 cursor-pointer"
            >
              <Edit3 className="w-4 h-4" /> Edit Profile
            </button>
          </div>

        </div>

      </motion.div>

      {/* QUICK STATS & BADGES PREVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Statistics Box */}
        <div className="glass-card p-6 space-y-4 rounded-3xl border border-indigo-200/50 dark:border-white/10">
          <h3 className="font-heading font-black text-xl text-slate-900 dark:text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500 dark:text-amber-400" /> Career Gaming Stats
          </h3>

          <div className="space-y-3 text-xs font-heading font-extrabold text-slate-700 dark:text-slate-300">
            <div className="flex justify-between py-2.5 border-b border-slate-100 dark:border-white/10">
              <span className="text-slate-500 dark:text-slate-400">Games Played</span>
              <span className="text-slate-900 dark:text-white font-black">{user.stats?.gamesPlayed || 48}</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-slate-100 dark:border-white/10">
              <span className="text-slate-500 dark:text-slate-400">Questions Solved</span>
              <span className="text-indigo-600 dark:text-cyan-400 font-black">{user.stats?.questionsSolved || 342}</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-slate-100 dark:border-white/10">
              <span className="text-slate-500 dark:text-slate-400">Accuracy Rate</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-black">{user.stats?.accuracy || 91}%</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-slate-500 dark:text-slate-400">Recent Badge</span>
              <span className="text-purple-600 dark:text-purple-400 font-black">{user.recentBadge || '🏆 QUIZ CHAMPION'}</span>
            </div>
          </div>
        </div>

        {/* Options & Account Settings */}
        <div className="glass-card p-6 space-y-4 rounded-3xl border border-indigo-200/50 dark:border-white/10 font-heading">
          <h3 className="font-heading font-black text-xl text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-600 dark:text-cyan-400" /> Settings & Security
          </h3>

          <div className="space-y-2.5">
            <button
              onClick={() => { sound.playClick(); onOpenEditProfile(); }}
              className="w-full p-3.5 bg-indigo-50/70 dark:bg-white/5 hover:bg-indigo-100 dark:hover:bg-white/10 rounded-2xl text-left text-xs font-black text-slate-900 dark:text-white flex items-center justify-between border border-indigo-200/50 dark:border-white/10 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4 text-indigo-600 dark:text-cyan-400" /> Customize Avatar & Name
              </div>
              <span className="text-slate-400">→</span>
            </button>

            <button
              onClick={() => { sound.playClick(); alert('Security Settings Simulated!'); }}
              className="w-full p-3.5 bg-indigo-50/70 dark:bg-white/5 hover:bg-indigo-100 dark:hover:bg-white/10 rounded-2xl text-left text-xs font-black text-slate-900 dark:text-white flex items-center justify-between border border-indigo-200/50 dark:border-white/10 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Key className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Change Security Password
              </div>
              <span className="text-slate-400">→</span>
            </button>

            <button
              onClick={() => { sound.playClick(); onLogout(); }}
              className="w-full p-3.5 bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 rounded-2xl text-left text-xs font-black text-rose-700 dark:text-rose-300 flex items-center justify-between border border-rose-200 dark:border-rose-500/30 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <LogOut className="w-4 h-4 text-rose-600 dark:text-rose-400" /> Switch Account / Logout
              </div>
              <span className="text-rose-500 dark:text-rose-400">→</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
