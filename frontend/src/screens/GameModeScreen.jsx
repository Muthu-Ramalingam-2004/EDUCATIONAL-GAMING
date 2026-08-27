import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Puzzle, MoveHorizontal, Clock, Trophy, Brain, Lock, Play, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

export default function GameModeScreen({ onSelectMode, playerLevel }) {
  const modes = [
    {
      id: 'quiz',
      title: 'QUICK QUIZ ARENA',
      desc: 'Fast-paced multiple choice Maths speed battle testing core standard concepts',
      difficulty: 'Easy - Medium',
      xp: 150,
      icon: Zap,
      gradient: 'from-amber-400 via-orange-500 to-red-600',
      minLevel: 1,
      unlocked: true
    },
    {
      id: 'puzzle',
      title: 'MATHS PUZZLE LAB',
      desc: 'Solve number patterns, exponential sequences, and logic matrix puzzles',
      difficulty: 'Challenge',
      xp: 200,
      icon: Puzzle,
      gradient: 'from-indigo-600 via-purple-600 to-pink-600',
      minLevel: 1,
      unlocked: true
    },
    {
      id: 'dragdrop',
      title: 'PROOF & STEP REORDER',
      desc: 'Arrange step-by-step algebraic solutions and geometry proof sequences',
      difficulty: 'Hard',
      xp: 220,
      icon: MoveHorizontal,
      gradient: 'from-emerald-500 via-teal-600 to-cyan-600',
      minLevel: 2,
      unlocked: true
    },
    {
      id: 'timeattack',
      title: 'TIME ATTACK SPEEDWAY',
      desc: 'Race against a 60-second clock to solve maximum math problems',
      difficulty: 'Extreme',
      xp: 250,
      icon: Clock,
      gradient: 'from-rose-500 via-pink-600 to-red-700',
      minLevel: 3,
      unlocked: (playerLevel || 3) >= 3
    },
    {
      id: 'formula',
      title: 'FORMULA MATCH VAULT',
      desc: 'Match mathematical formulas with geometric shapes and identities',
      difficulty: 'Practice',
      xp: 180,
      icon: Trophy,
      gradient: 'from-cyan-500 via-blue-600 to-indigo-700',
      minLevel: 4,
      unlocked: (playerLevel || 3) >= 4
    },
    {
      id: 'memory',
      title: 'MEMORY MATCH MATRIX',
      desc: 'Flip cards and match twin math equations with their evaluated answers',
      difficulty: 'Medium',
      xp: 190,
      icon: Brain,
      gradient: 'from-purple-600 via-pink-600 to-amber-500',
      minLevel: 5,
      unlocked: (playerLevel || 3) >= 5
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 sm:p-8 rounded-3xl text-white shadow-2xl border border-indigo-200/50 dark:border-white/15 relative overflow-hidden bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950"
      >
        <div className="orb-glow-cyan top-0 right-0 blur-[130px] opacity-35" />
        <span className="text-amber-400 font-heading font-black text-xs uppercase tracking-widest block mb-1 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} /> GAME MODE ARENA
        </span>
        <h1 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-white">
          Select Game Challenge Mode
        </h1>
        <p className="text-sm text-cyan-200 mt-1.5 font-medium font-body">
          Choose your preferred gameplay style. Earn XP, level up your profile, and unlock master modes!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modes.map((mode, idx) => {
          const Icon = mode.icon;
          const isUnlocked = mode.unlocked;

          return (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={isUnlocked ? { y: -6 } : {}}
              className={`glass-card p-6 flex flex-col justify-between relative overflow-hidden transition-all group border border-indigo-200/50 dark:border-white/10 ${
                !isUnlocked ? 'opacity-60 grayscale-[30%]' : ''
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${mode.gradient} flex items-center justify-center text-white text-2xl shadow-xl group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  {!isUnlocked ? (
                    <span className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-heading font-black text-[11px] px-3 py-1 rounded-xl flex items-center gap-1 border border-slate-200 dark:border-white/10">
                      <Lock className="w-3.5 h-3.5 text-rose-500" /> Lvl {mode.minLevel} Req
                    </span>
                  ) : (
                    <span className="bg-amber-500/15 dark:bg-amber-400/20 text-amber-700 dark:text-amber-300 font-heading font-black text-xs px-3 py-1 rounded-xl border border-amber-500/30 dark:border-amber-400/40 shadow-sm">
                      +{mode.xp} XP
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-heading font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-cyan-300 transition-colors">
                  {mode.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed font-medium font-body">
                  {mode.desc}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 dark:border-white/10 flex items-center justify-between font-heading">
                <span className="text-xs font-black text-slate-700 dark:text-slate-300 bg-indigo-50 dark:bg-white/5 px-3 py-1 rounded-xl border border-indigo-200 dark:border-white/10">
                  {mode.difficulty}
                </span>

                {isUnlocked ? (
                  <button
                    onClick={() => {
                      sound.playClick();
                      onSelectMode(mode.id);
                    }}
                    className="btn-game-cyan text-xs py-2.5 px-4 shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>PLAY MODE</span>
                    <Play className="w-3.5 h-3.5 fill-white" />
                  </button>
                ) : (
                  <span className="text-xs font-extrabold text-slate-400 dark:text-slate-500 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" /> Locked (Lvl {mode.minLevel})
                  </span>
                )}
              </div>

            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
