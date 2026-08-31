import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Coins, ShieldCheck, Sparkles, Sun, Moon, Zap } from 'lucide-react';
import { sound } from '../../utils/sound';
import { useTheme } from '../../context/ThemeContext';

export default function TopHeader({ user, onNavigate, onOpenProfile, isAdmin, onLogout, onExitAdmin }) {
  const { isDark, toggleTheme } = useTheme();
  const xpPercent = Math.min(100, Math.round((user.xp / (user.nextLevelXp || 1000)) * 100));

  return (
    <header className="sticky top-0 z-40 glass-header px-4 py-3 border-b border-indigo-200/40 dark:border-white/10 shadow-xl transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Player Avatar & Level */}
        <div 
          onClick={() => { sound.playClick(); onOpenProfile(); }}
          className="flex items-center gap-3 cursor-pointer group p-2 rounded-2xl bg-white/60 dark:bg-white/5 hover:bg-white/90 dark:hover:bg-white/10 border border-indigo-200/50 dark:border-white/10 transition-all duration-300 shadow-md hover:border-cyan-400/50"
        >
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 flex items-center justify-center text-2xl shadow-lg border-2 border-cyan-400/80 group-hover:scale-105 transition-transform text-white">
              {user.avatar || '⚡'}
            </div>
            <div className="absolute -bottom-1 -right-1.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-[10px] px-1.5 py-0.5 rounded-md border border-slate-950 shadow-md font-heading">
              Lvl {user.level}
            </div>
          </div>

          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <span className="font-black text-slate-900 dark:text-white text-sm tracking-wide group-hover:text-indigo-600 dark:group-hover:text-cyan-300 transition-colors font-heading">
                {user.name}
              </span>
              <span className="bg-indigo-100 dark:bg-indigo-900/80 text-indigo-800 dark:text-indigo-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-500/40">
                Class {user.activeClass}th
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1 font-body">
              <Zap className="w-3 h-3 text-cyan-500 dark:text-cyan-400" /> Maths Adventurer
            </p>
          </div>
        </div>

        {/* Center: Interactive XP Bar */}
        <div className="flex-1 max-w-xs md:max-w-md hidden md:block">
          <div className="flex justify-between items-center text-xs font-black mb-1.5 font-heading">
            <span className="flex items-center gap-1 text-indigo-600 dark:text-cyan-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 animate-spin" style={{ animationDuration: '4s' }} /> XP Level Progress
            </span>
            <span className="text-slate-700 dark:text-slate-300 font-extrabold">
              <span className="text-amber-600 dark:text-amber-400">{user.xp.toLocaleString()}</span> / {user.nextLevelXp?.toLocaleString() || 1000} XP ({xpPercent}%)
            </span>
          </div>
          <div className="w-full bg-slate-200/90 dark:bg-slate-900/90 rounded-full h-4 p-0.5 border border-indigo-200 dark:border-white/15 shadow-inner relative overflow-hidden">
            <div 
              className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-amber-400 h-full rounded-full transition-all duration-700 ease-out shadow-lg shadow-cyan-500/50 shimmer"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>

        {/* Right: Coins, Streak, Theme Toggle & Admin Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Animated Premium Theme Switcher Pill */}
          <div 
            onClick={() => {
              sound.playClick();
              toggleTheme();
            }}
            title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            aria-label="Toggle Light and Dark Mode"
            className="relative w-16 h-9 rounded-full bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-white/20 p-1 flex items-center justify-between cursor-pointer shadow-inner transition-colors duration-300"
          >
            <motion.div 
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`absolute top-1 bottom-1 w-7 rounded-full shadow-md flex items-center justify-center ${
                isDark 
                  ? 'left-[32px] bg-gradient-to-tr from-cyan-400 to-indigo-600 text-slate-950' 
                  : 'left-1 bg-gradient-to-tr from-amber-400 to-yellow-400 text-slate-950'
              }`}
            >
              {isDark ? (
                <Moon className="w-4 h-4 text-slate-950" />
              ) : (
                <Sun className="w-4 h-4 text-slate-950" />
              )}
            </motion.div>

            {/* Inactive Side Icons */}
            <Sun className={`w-4 h-4 ml-1.5 transition-opacity ${!isDark ? 'opacity-0' : 'opacity-40 text-amber-400'}`} />
            <Moon className={`w-4 h-4 mr-1.5 transition-opacity ${isDark ? 'opacity-0' : 'opacity-40 text-indigo-600'}`} />
          </div>

          {/* Streak Badge */}
          <div 
            title="Current Daily Streak"
            className="flex items-center gap-1.5 bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-300 border border-orange-500/30 dark:border-orange-500/40 px-3 py-2 rounded-xl font-black text-xs shadow-sm font-heading"
          >
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-bounce" />
            <span>{user.streakDays || 1}d Streak</span>
          </div>

          {/* Coins Counter */}
          <div 
            title="MathQuest Gold Coins"
            className="flex items-center gap-1.5 bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 dark:border-amber-500/40 px-3 py-2 rounded-xl font-black text-xs shadow-sm font-heading"
          >
            <Coins className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span className="font-heading tracking-wide text-sm">{user.coins?.toLocaleString() || 0}</span>
          </div>

          {/* Admin Switch Button */}
          <button
            onClick={() => {
              sound.playClick();
              if (isAdmin) {
                // Exit Admin Panel — preserves admin token, returns to student view
                if (typeof onExitAdmin === 'function') {
                  onExitAdmin();
                }
              } else {
                onNavigate('admin');
              }
            }}
            className={`px-3.5 py-2 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md font-heading ${
              isAdmin 
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border border-purple-400/50 shadow-purple-500/40' 
                : 'bg-white/80 dark:bg-white/5 hover:bg-white text-slate-700 dark:text-slate-300 border border-indigo-200 dark:border-white/10 hover:border-purple-400/40'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="hidden sm:inline">{isAdmin ? 'Exit Admin' : 'Admin Panel'}</span>
          </button>
        </div>

      </div>
    </header>
  );
}
