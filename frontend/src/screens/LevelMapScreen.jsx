import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Lock, Star, Play, Trophy, ArrowLeft, Zap } from 'lucide-react';
import { sound } from '../utils/sound';

export default function LevelMapScreen({ world, onStartLevel, onBack }) {
  const activeWorld = world || {
    id: 'class9_world2',
    title: 'World 2 – Algebra Arena',
    subtitle: 'Polynomial Factorisation & Linear Equations',
    levels: [
      { id: 1, title: 'Level 1 — Linear Equations', difficulty: 'Easy', stars: 3, completed: true, xp: 120 },
      { id: 2, title: 'Level 2 — Graphing Equations', difficulty: 'Practice', stars: 3, completed: true, xp: 160 },
      { id: 3, title: 'Level 3 — Polynomial Factorisation', difficulty: 'Challenge', stars: 2, completed: false, active: true, xp: 220 },
      { id: 4, title: 'Level 4 — Algebraic Identities', difficulty: 'Hard', stars: 0, completed: false, locked: true, xp: 280 },
      { id: 5, title: 'Level 5 — Algebra Overlord Boss', difficulty: 'Master Boss', stars: 0, completed: false, locked: true, xp: 400, isBoss: true }
    ]
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Navigation & Status Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => { sound.playClick(); onBack(); }}
          className="btn-game-secondary text-xs py-2 px-4 flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Realms
        </button>

        <div className="flex items-center gap-2 bg-amber-500/15 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 px-4 py-2 rounded-2xl text-xs font-heading font-black border border-amber-500/30 dark:border-amber-400/40 shadow-md">
          <Trophy className="w-4 h-4 text-amber-500 fill-amber-400" />
          <span>8 / 15 Stars Earned</span>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 sm:p-8 rounded-3xl text-white shadow-2xl text-center border border-indigo-200/50 dark:border-white/15 relative overflow-hidden bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950"
      >
        <div className="orb-glow-cyan top-0 left-1/4 blur-[130px] opacity-35" />
        <span className="text-amber-400 font-heading font-black text-xs uppercase tracking-widest block mb-1">
          PROGRESSION ROADMAP
        </span>
        <h1 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-white">
          {activeWorld.title}
        </h1>
        <p className="text-xs sm:text-sm text-cyan-200 mt-1 font-medium font-body">
          {activeWorld.subtitle}
        </p>
      </motion.div>

      {/* ROADMAP PROGRESSION SYSTEM */}
      <div className="max-w-xl mx-auto py-8 space-y-10 relative">
        
        {/* Vertical Connecting Neon Path Line */}
        <div className="absolute left-1/2 top-10 bottom-10 w-2.5 bg-gradient-to-b from-emerald-500 via-indigo-500 to-purple-600 -translate-x-1/2 -z-0 rounded-full shadow-lg" />

        {activeWorld.levels.map((lvl, index) => {
          const isCompleted = lvl.completed;
          const isActive = lvl.active;
          const isLocked = lvl.locked;
          const isBoss = lvl.isBoss;

          return (
            <motion.div
              key={lvl.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.08 }}
              className={`relative z-10 flex flex-col items-center ${
                index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
              } gap-4 sm:gap-8 justify-center`}
            >
              
              {/* Level Node Circle */}
              <div className="relative">
                {isActive && (
                  <div className="absolute inset-0 bg-amber-400 rounded-3xl blur-2xl opacity-90 animate-ping" />
                )}
                
                <button
                  disabled={isLocked}
                  onClick={() => {
                    if (!isLocked) {
                      sound.playClick();
                      onStartLevel(lvl);
                    }
                  }}
                  className={`w-22 h-22 rounded-3xl font-heading font-black text-xl flex flex-col items-center justify-center border-4 shadow-2xl transition-all duration-300 transform cursor-pointer ${
                    isCompleted
                      ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 border-white text-white hover:scale-105 shadow-emerald-500/40'
                      : isActive
                      ? 'bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-500 border-slate-950 text-slate-950 scale-110 shadow-amber-400/80 pulse-glow'
                      : 'bg-slate-200 dark:bg-slate-900 border-slate-300 dark:border-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  ) : isActive ? (
                    <Play className="w-9 h-9 fill-slate-950 text-slate-950 animate-bounce" />
                  ) : isBoss ? (
                    <Zap className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  ) : (
                    <Lock className="w-7 h-7 text-slate-400 dark:text-slate-600" />
                  )}
                  <span className="text-[10px] uppercase tracking-wider font-extrabold mt-0.5 font-heading">
                    {isBoss ? 'BOSS' : `Lvl ${lvl.id}`}
                  </span>
                </button>
              </div>

              {/* Level Details Glass Card */}
              <div
                className={`glass-card p-5 w-full sm:w-80 border-2 transition-all ${
                  isActive
                    ? 'border-amber-400 bg-amber-500/10 shadow-xl shadow-amber-400/20'
                    : isCompleted
                    ? 'border-emerald-500/40 bg-emerald-500/10'
                    : 'border-indigo-200/50 dark:border-white/10 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-heading font-black uppercase px-2.5 py-1 rounded-lg border ${
                    isBoss 
                      ? 'bg-purple-600 text-white border-purple-400' 
                      : 'bg-indigo-100 dark:bg-indigo-900/80 text-indigo-800 dark:text-indigo-300 border-indigo-300 dark:border-indigo-500/40'
                  }`}>
                    {lvl.difficulty}
                  </span>

                  <div className="flex gap-1">
                    {[1, 2, 3].map((starIndex) => (
                      <Star
                        key={starIndex}
                        className={`w-4 h-4 ${
                          starIndex <= lvl.stars
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300 dark:text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <h3 className="font-heading font-black text-base text-slate-900 dark:text-white">
                  {lvl.title}
                </h3>

                <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-100 dark:border-white/10 text-xs">
                  <span className="font-heading font-black text-amber-600 dark:text-amber-400">+ {lvl.xp} XP</span>
                  
                  {isActive && (
                    <button
                      onClick={() => {
                        sound.playClick();
                        onStartLevel(lvl);
                      }}
                      className="btn-game-gold text-[11px] py-1.5 px-4 shadow-lg cursor-pointer"
                    >
                      PLAY NOW
                    </button>
                  )}
                </div>

              </div>

            </motion.div>
          );
        })}

      </div>

    </div>
  );
}
