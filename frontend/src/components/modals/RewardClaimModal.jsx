import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Coins, Sparkles, Trophy, CheckCircle2 } from 'lucide-react';
import { fireConfetti } from '../../utils/confetti';
import { sound } from '../../utils/sound';

export default function RewardClaimModal({ reward, onClose }) {
  useEffect(() => {
    fireConfetti();
    sound.playLevelUp();
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass-panel rounded-3xl border-2 border-amber-400/80 shadow-2xl max-w-md w-full p-8 text-center relative overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-950 to-purple-950"
      >
        <div className="orb-glow-gold top-0 left-1/2 -translate-x-1/2 blur-[100px] opacity-40 pointer-events-none" />

        {/* Glow Icon */}
        <motion.div 
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-20 h-20 bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-500 text-slate-950 rounded-3xl mx-auto flex items-center justify-center text-4xl shadow-2xl shadow-amber-400/50 mb-4 border-2 border-white"
        >
          🎁
        </motion.div>

        <h2 className="text-3xl font-black font-heading text-white tracking-tight">
          REWARD UNLOCKED! 🎉
        </h2>
        <p className="text-xs text-cyan-200 mt-1 font-medium font-body">
          You earned rewards for completing your MathQuest challenge!
        </p>

        {/* Reward Box Details */}
        <div className="my-6 bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between bg-slate-900/90 p-3.5 rounded-xl border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center text-slate-950 font-black">
                <Sparkles className="w-5 h-5 text-slate-950" />
              </div>
              <div className="text-left font-heading">
                <p className="text-[10px] text-slate-400 font-black uppercase">EXPERIENCE BOOST</p>
                <p className="text-lg font-black text-amber-400">+{reward?.xp || 250} XP</p>
              </div>
            </div>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>

          <div className="flex items-center justify-between bg-slate-900/90 p-3.5 rounded-xl border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-slate-950 font-black">
                <Coins className="w-5 h-5 text-slate-950 fill-slate-950" />
              </div>
              <div className="text-left font-heading">
                <p className="text-[10px] text-slate-400 font-black uppercase">MATHQUEST COINS</p>
                <p className="text-lg font-black text-amber-400">+{reward?.coins || 100} Coins</p>
              </div>
            </div>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>

          {reward?.badge && (
            <div className="flex items-center justify-between bg-purple-950/80 p-3.5 rounded-xl border border-purple-500/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-600 text-white rounded-xl flex items-center justify-center font-bold">
                  <Trophy className="w-5 h-5" />
                </div>
                <div className="text-left font-heading">
                  <p className="text-[10px] text-purple-300 font-black">NEW BADGE UNLOCKED</p>
                  <p className="text-sm font-black text-amber-300">{reward.badge}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => {
            sound.playCoin();
            onClose();
          }}
          className="btn-game-gold w-full text-base py-4 shadow-xl cursor-pointer font-heading font-black"
        >
          CLAIM REWARDS NOW
        </button>

      </motion.div>
    </div>
  );
}
