import React from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Trophy, Flame, Coins, Zap, Puzzle, Brain, Clock, MoveHorizontal, ChevronRight, Target } from 'lucide-react';
import { sound } from '../utils/sound';

export default function GameHomeDashboard({ user, onContinueGame, onStartMode, onSelectWorld }) {
  
  const gameModes = [
    {
      id: 'quiz',
      name: '⚡ Quick Quiz',
      mode: 'quiz',
      difficulty: 'Medium',
      xpReward: 150,
      coinsReward: 50,
      icon: Zap,
      gradient: 'from-amber-500 via-orange-600 to-red-600',
      description: 'Fast-paced multiple choice Maths speed battle'
    },
    {
      id: 'puzzle',
      name: '🧩 Maths Puzzle',
      mode: 'puzzle',
      difficulty: 'Hard',
      xpReward: 200,
      coinsReward: 80,
      icon: Puzzle,
      gradient: 'from-purple-600 via-indigo-600 to-blue-600',
      description: 'Solve polynomial patterns & geometric logic'
    },
    {
      id: 'formula',
      name: '🎯 Formula Match',
      mode: 'quiz',
      difficulty: 'Easy',
      xpReward: 120,
      coinsReward: 40,
      icon: Target,
      gradient: 'from-cyan-500 via-blue-600 to-indigo-700',
      description: 'Match algebraic identities & trigonometry equations'
    },
    {
      id: 'timeattack',
      name: '⏱ Time Attack',
      mode: 'quiz',
      difficulty: 'Extreme',
      xpReward: 250,
      coinsReward: 100,
      icon: Clock,
      gradient: 'from-rose-500 via-pink-600 to-red-700',
      description: 'Race against time to answer maximum problems'
    },
    {
      id: 'memory',
      name: '🧠 Memory Challenge',
      mode: 'puzzle',
      difficulty: 'Medium',
      xpReward: 180,
      coinsReward: 60,
      icon: Brain,
      gradient: 'from-emerald-500 via-teal-600 to-cyan-700',
      description: 'Flip cards to match mathematical theorems'
    },
    {
      id: 'numberquest',
      name: '🔢 Number Quest',
      mode: 'dragdrop',
      difficulty: 'Challenge',
      xpReward: 220,
      coinsReward: 90,
      icon: MoveHorizontal,
      gradient: 'from-amber-400 via-yellow-500 to-orange-600',
      description: 'Reorder complex mathematical proof steps'
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* WELCOME BANNER & PLAYER SNAPSHOT */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden border border-indigo-200/50 dark:border-white/15 shadow-xl"
      >
        <div className="orb-glow-cyan top-0 right-0 blur-[130px] opacity-30" />
        <div className="orb-glow-purple bottom-0 left-1/3 blur-[130px] opacity-30" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/15 to-amber-500/15 px-3.5 py-1.5 rounded-full text-xs font-heading font-black text-amber-700 dark:text-amber-300 mb-3 border border-orange-500/30 dark:border-orange-500/40 shadow-sm">
              <Flame className="w-4 h-4 fill-orange-500 text-orange-500 animate-bounce" />
              <span>{user.streakDays || 1} Day Streak • Daily Booster Active</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-slate-900 dark:text-white">
              Welcome Back, {user.name}! 🎮
            </h1>
            <p className="text-sm text-slate-600 dark:text-cyan-200 mt-1 font-medium font-body">
              Standard {user.activeClass}th Quiz Conquest • Ready to claim +250 XP today?
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/80 dark:bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-indigo-200/50 dark:border-white/10 shadow-lg">
            <div className="text-right font-heading">
              <span className="text-[10px] uppercase tracking-widest font-black text-amber-600 dark:text-amber-400 block">CURRENT RANK</span>
              <span className="text-xl font-black text-slate-900 dark:text-white">Level {user.level}</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 text-white font-black text-2xl flex items-center justify-center shadow-lg border-2 border-cyan-400">
              {user.avatar || '⚡'}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ================================================== */}
      {/* 1. MAIN HERO SECTION: LARGE MISSION CARD */}
      {/* ================================================== */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6 sm:p-8 rounded-3xl relative overflow-hidden border-2 border-indigo-300 dark:border-cyan-500/40 shadow-2xl bg-gradient-to-br from-indigo-900/90 via-slate-900/90 to-purple-950/90 text-white"
      >
        <div className="orb-glow-gold -top-10 right-10 blur-[100px] opacity-25" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
          
          <div className="space-y-4 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-heading font-black text-xs px-3.5 py-1 rounded-full tracking-wider uppercase flex items-center gap-1.5 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-slate-950" /> CONTINUE YOUR ADVENTURE
              </span>
              <span className="bg-white/10 text-cyan-300 text-xs font-heading font-extrabold px-3 py-1 rounded-full border border-white/15">
                Class {user.activeClass}th Syllabus
              </span>
            </div>

            <div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading uppercase">
                {user.currentWorldName || 'Algebra Arena'}
              </h2>
              <p className="text-base font-bold text-cyan-300 mt-1 font-heading">
                Level 3: Polynomial Factorisation & Identities
              </p>
            </div>

            {/* Mission Stats Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15">
                <span className="text-[10px] font-heading font-black text-slate-300 block uppercase">Mission</span>
                <span className="text-sm font-heading font-black text-white">Algebra Arena</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15">
                <span className="text-[10px] font-heading font-black text-slate-300 block uppercase">Mission Progress</span>
                <span className="text-sm font-heading font-black text-cyan-300">7 / 10 Solved</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15">
                <span className="text-[10px] font-heading font-black text-slate-300 block uppercase">Difficulty</span>
                <span className="text-sm font-heading font-black text-purple-300">Hard Mode</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15">
                <span className="text-[10px] font-heading font-black text-slate-300 block uppercase">Reward</span>
                <span className="text-sm font-heading font-black text-amber-300 flex items-center gap-1">
                  +250 XP +100 Coins
                </span>
              </div>
            </div>

          </div>

          {/* Large Glowing Action CTA Button */}
          <div className="w-full lg:w-auto flex flex-col items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                sound.playClick();
                onContinueGame();
              }}
              className="btn-game-gold text-xl py-5 px-10 w-full lg:w-80 shadow-2xl shadow-amber-400/50 flex items-center justify-center gap-3 cursor-pointer group"
            >
              <Play className="w-7 h-7 text-slate-950 fill-slate-950 group-hover:translate-x-1 transition-transform" />
              <span className="tracking-wide">CONTINUE PLAYING</span>
            </motion.button>
            <span className="text-xs font-bold text-slate-300 mt-3 font-heading uppercase tracking-wider">
              ⚡ Level 3 • 3 Questions Left To Unlock Chest
            </span>
          </div>

        </div>

      </motion.div>

      {/* ================================================== */}
      {/* 2. PLAYER PROGRESS WIDGETS SECTION */}
      {/* ================================================== */}
      <div className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white font-heading tracking-tight flex items-center gap-2">
          <Trophy className="w-6 h-6 text-amber-500 dark:text-amber-400" /> Player Overview & Progress
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          
          <div className="glass-panel p-4 text-center rounded-2xl border border-indigo-200/50 dark:border-white/10">
            <span className="text-[10px] font-heading font-black text-slate-500 dark:text-slate-400 block uppercase">Current Level</span>
            <div className="text-3xl font-heading font-black text-amber-600 dark:text-amber-400 mt-1">Lvl {user.level}</div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">Pro Adventurer</span>
          </div>

          <div className="glass-panel p-4 text-center rounded-2xl border border-indigo-200/50 dark:border-white/10">
            <span className="text-[10px] font-heading font-black text-slate-500 dark:text-slate-400 block uppercase">XP Progress</span>
            <div className="text-2xl font-heading font-black text-indigo-600 dark:text-cyan-400 mt-1">{user.xp} XP</div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">Target: {user.nextLevelXp}</span>
          </div>

          <div className="glass-panel p-4 text-center rounded-2xl border border-indigo-200/50 dark:border-white/10">
            <span className="text-[10px] font-heading font-black text-slate-500 dark:text-slate-400 block uppercase">Completed Worlds</span>
            <div className="text-3xl font-heading font-black text-purple-600 dark:text-purple-400 mt-1">4 / 6</div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">Class 9 & 10</span>
          </div>

          <div className="glass-panel p-4 text-center rounded-2xl border border-indigo-200/50 dark:border-white/10">
            <span className="text-[10px] font-heading font-black text-slate-500 dark:text-slate-400 block uppercase">Accuracy</span>
            <div className="text-3xl font-heading font-black text-emerald-600 dark:text-emerald-400 mt-1">94%</div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">High Precision</span>
          </div>

          <div className="glass-panel p-4 text-center rounded-2xl border border-indigo-200/50 dark:border-white/10">
            <span className="text-[10px] font-heading font-black text-slate-500 dark:text-slate-400 block uppercase">Best Score</span>
            <div className="text-3xl font-heading font-black text-orange-600 dark:text-orange-400 mt-1">2,850</div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">Time Attack</span>
          </div>

          <div className="glass-panel p-4 text-center rounded-2xl border border-indigo-200/50 dark:border-white/10">
            <span className="text-[10px] font-heading font-black text-slate-500 dark:text-slate-400 block uppercase">Daily Streak</span>
            <div className="text-3xl font-heading font-black text-amber-600 dark:text-amber-400 mt-1">{user.streakDays || 1} Days</div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">Flame Multiplier</span>
          </div>

        </div>
      </div>

      {/* ================================================== */}
      {/* 3. GAME MODE CARDS SECTION */}
      {/* ================================================== */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white font-heading tracking-tight flex items-center gap-2">
              <Zap className="w-6 h-6 text-indigo-600 dark:text-cyan-400" /> Select Game Mode
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium font-body">
              Choose your practice arena to test speed, memory, formulas, and proofs
            </p>
          </div>
          <button
            onClick={() => { sound.playClick(); onStartMode('modes'); }}
            className="text-xs font-heading font-black text-indigo-600 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            All Modes <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {gameModes.map((game, idx) => {
            const Icon = game.icon;
            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * idx }}
                whileHover={{ y: -6 }}
                className="glass-card p-6 rounded-3xl flex flex-col justify-between relative group cursor-pointer border border-indigo-200/50 dark:border-white/10"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${game.gradient} flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="text-right font-heading">
                      <span className="text-[10px] font-black text-slate-400 uppercase block">REWARDS</span>
                      <span className="text-xs font-black text-amber-600 dark:text-amber-400 block">
                        +{game.xpReward} XP
                      </span>
                      <span className="text-xs font-black text-indigo-600 dark:text-cyan-400 block">
                        +{game.coinsReward} Coins
                      </span>
                    </div>
                  </div>

                  <h3 className="font-heading font-black text-xl text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-cyan-300 transition-colors">
                    {game.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed font-medium font-body">
                    {game.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-5 mt-5 border-t border-slate-100 dark:border-white/10 font-heading">
                  <span className="text-xs font-black text-slate-700 dark:text-slate-300 bg-indigo-50 dark:bg-white/5 px-3 py-1 rounded-xl border border-indigo-200 dark:border-white/10">
                    {game.difficulty}
                  </span>

                  <button
                    onClick={() => {
                      sound.playClick();
                      onStartMode(game.mode);
                    }}
                    className="btn-game-cyan text-xs py-2.5 px-5 shadow-md"
                  >
                    PLAY NOW
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
