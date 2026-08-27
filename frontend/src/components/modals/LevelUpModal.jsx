import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { fireConfetti } from '../../utils/confetti';
import { sound } from '../../utils/sound';

export default function LevelUpModal({ oldLevel, newLevel, onClose, onStartNext }) {
  useEffect(() => {
    fireConfetti();
    sound.playLevelUp();
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        className="glass-panel bg-gradient-to-b from-indigo-950 via-slate-950 to-purple-950 border-2 border-amber-400 rounded-3xl shadow-2xl max-w-md w-full p-8 text-center text-white relative overflow-hidden"
      >
        <div className="orb-glow-gold top-0 left-1/2 -translate-x-1/2 blur-[100px] opacity-50 pointer-events-none" />

        {/* Level Up Badge Icon */}
        <motion.div 
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="relative mx-auto w-24 h-24 mb-4"
        >
          <div className="absolute inset-0 bg-amber-400 rounded-full blur-xl opacity-80 animate-pulse" />
          <div className="relative w-24 h-24 bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-500 rounded-3xl flex items-center justify-center text-5xl shadow-2xl text-slate-950 font-heading font-black border-2 border-white">
            ⚡
          </div>
        </motion.div>

        <h2 className="text-4xl font-black font-heading text-amber-400 tracking-wider uppercase">
          LEVEL UP! 🎉
        </h2>
        
        <div className="flex items-center justify-center gap-5 my-6 bg-white/5 backdrop-blur-md py-4 px-6 rounded-2xl border border-white/10 font-heading">
          <div className="text-center">
            <span className="text-[10px] text-slate-400 uppercase font-black block">Previous Rank</span>
            <span className="text-2xl font-black text-slate-400">Lvl {oldLevel || 2}</span>
          </div>

          <ArrowRight className="w-6 h-6 text-amber-400 animate-pulse" />

          <div className="text-center">
            <span className="text-[10px] text-amber-400 uppercase font-black block">New Rank</span>
            <span className="text-3xl font-black text-amber-300">Lvl {newLevel || 3}</span>
          </div>
        </div>

        <div className="space-y-2 mb-8 text-left bg-cyan-950/40 p-4 rounded-2xl border border-cyan-400/30 text-xs font-body">
          <div className="flex items-center gap-2 text-cyan-300 font-heading font-black">
            <Zap className="w-4 h-4 text-amber-400" /> Unlocked New Maths Challenge Realm!
          </div>
          <p className="text-slate-300 leading-relaxed font-medium">
            You earned higher multiplier XP bonuses for all Quadratic Equation & Geometry matches.
          </p>
        </div>

        <div className="space-y-3 font-heading">
          <button
            onClick={() => {
              sound.playClick();
              onStartNext();
            }}
            className="btn-game-gold w-full py-4 text-base shadow-xl cursor-pointer font-black"
          >
            START NEXT CHALLENGE
          </button>
          
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="btn-game-secondary w-full py-3 text-xs cursor-pointer font-bold"
          >
            Back to Dashboard
          </button>
        </div>

      </motion.div>
    </div>
  );
}
