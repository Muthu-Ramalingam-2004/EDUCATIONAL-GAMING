import React from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Flame, Trophy, Zap, ShieldCheck } from 'lucide-react';
import { sound } from '../utils/sound';

export default function SplashScreen({ onStart }) {
  return (
    <div className="min-h-screen bg-[#060913] dark:bg-[#060913] light:bg-[#F0F4FF] flex items-center justify-center p-4 relative overflow-hidden text-slate-900 dark:text-white math-bg-grid transition-colors duration-300">
      
      {/* Background Floating Orbs & Mathematical Symbols */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 text-8xl font-black text-indigo-600/20 dark:text-indigo-500/20 float-animation select-none">∑</div>
        <div className="absolute top-1/4 right-16 text-9xl font-black text-purple-600/20 dark:text-purple-500/20 float-animation select-none" style={{ animationDelay: '1.2s' }}>π</div>
        <div className="absolute bottom-20 left-1/4 text-8xl font-black text-cyan-600/20 dark:text-cyan-500/20 float-animation select-none" style={{ animationDelay: '2.5s' }}>√x</div>
        <div className="absolute bottom-12 right-12 text-9xl font-black text-amber-600/20 dark:text-amber-500/20 float-animation select-none" style={{ animationDelay: '1.8s' }}>x²</div>
        
        <div className="orb-glow-cyan top-10 left-1/4 blur-[130px] opacity-40" />
        <div className="orb-glow-purple bottom-10 right-1/4 blur-[130px] opacity-40" />
        <div className="orb-glow-gold top-1/2 right-10 blur-[110px] opacity-30" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl w-full text-center relative z-10 space-y-8 py-10 px-6 glass-panel border border-indigo-200 dark:border-white/15 shadow-2xl rounded-3xl"
      >
        
        {/* Main Gaming Emblem */}
        <div className="inline-block relative">
          <motion.div 
            whileHover={{ scale: 1.08, rotate: 6 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-28 h-28 sm:w-36 sm:h-36 bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-500 rounded-3xl mx-auto flex items-center justify-center text-6xl sm:text-7xl shadow-2xl shadow-amber-400/40 border-4 border-white relative cursor-pointer"
          >
            📐
          </motion.div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-black text-xs px-4 py-1.5 rounded-full border-2 border-white shadow-xl flex items-center gap-1.5 whitespace-nowrap font-heading uppercase tracking-wider">
            <Flame className="w-4 h-4 text-amber-300 fill-amber-300 animate-bounce" /> 4th STD – 12th STD
          </div>
        </div>

        {/* Title & Tagline */}
        <div className="space-y-3 pt-4">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight font-heading uppercase text-slate-900 dark:text-white">
            Educational <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 drop-shadow-lg">Quest</span>
          </h1>
          <p className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-cyan-300 tracking-wide font-heading">
            "Learn, Master & Conquer Every Subject."
          </p>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed font-medium font-body">
            Transform Maths, Science, English, Social Studies, Languages & Computer Science into an epic gamified conquest. Earn XP, unlock realms, climb global leaderboards, and master Classes 4th–12th!
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-3 gap-3.5 pt-2">
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-white/80 dark:bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-indigo-200 dark:border-white/10 shadow-md hover:border-amber-400/50 transition-colors"
          >
            <Trophy className="w-7 h-7 text-amber-500 dark:text-amber-400 mx-auto mb-1.5" />
            <span className="text-xs font-black font-heading text-slate-800 dark:text-slate-200 block">Interactive Worlds</span>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-white/80 dark:bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-indigo-200 dark:border-white/10 shadow-md hover:border-cyan-400/50 transition-colors"
          >
            <Sparkles className="w-7 h-7 text-cyan-600 dark:text-cyan-400 mx-auto mb-1.5 animate-pulse" />
            <span className="text-xs font-black font-heading text-slate-800 dark:text-slate-200 block">Earn XP & Gold</span>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-white/80 dark:bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-indigo-200 dark:border-white/10 shadow-md hover:border-purple-400/50 transition-colors"
          >
            <Zap className="w-7 h-7 text-purple-600 dark:text-purple-400 mx-auto mb-1.5" />
            <span className="text-xs font-black font-heading text-slate-800 dark:text-slate-200 block">Boss Battles</span>
          </motion.div>
        </div>

        {/* Action Button */}
        <div className="pt-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              sound.playClick();
              onStart();
            }}
            className="btn-game-gold text-xl px-12 py-5 w-full sm:w-auto shadow-2xl shadow-amber-400/50 tracking-wider group cursor-pointer"
          >
            <span className="font-black">ENTER THE ARENA</span>
            <Play className="w-6 h-6 text-slate-950 fill-slate-950 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2 font-heading">
          <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> High-Performance Educational Gaming Engine
        </p>

      </motion.div>
    </div>
  );
}
