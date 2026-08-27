import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Sparkles, Coins, Home, Play, Gift } from 'lucide-react';
import { fireConfetti } from '../utils/confetti';
import { sound } from '../utils/sound';

export default function ResultScreen({ resultData, onClaimRewards, onPlayNext, onHome }) {
  useEffect(() => {
    fireConfetti();
    sound.playLevelUp();
  }, []);

  const stats = resultData || {
    score: 950,
    correctCount: 9,
    totalQuestions: 10,
    timeTaken: '02:15',
    xpEarned: 250,
    coinsEarned: 100,
    badgeEarned: '🏆 QUIZ CHAMPION'
  };

  const accuracy = Math.round((stats.correctCount / stats.totalQuestions) * 100);

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      
      {/* Hero Victory Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="glass-card p-8 text-center text-white shadow-2xl relative overflow-hidden rounded-3xl border-4 border-amber-400/80 bg-gradient-to-br from-indigo-950 via-slate-950 to-purple-950"
      >
        
        {/* Radial Glow */}
        <div className="orb-glow-gold top-0 left-1/2 -translate-x-1/2 blur-[100px] opacity-40 pointer-events-none" />

        {/* Big Trophy Icon */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-24 h-24 bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-500 text-slate-950 rounded-3xl mx-auto flex items-center justify-center text-5xl shadow-2xl shadow-amber-400/60 mb-5 border-2 border-white"
        >
          🏆
        </motion.div>

        <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 uppercase">
          MISSION COMPLETE! 🎉
        </h1>
        <p className="text-sm font-semibold text-cyan-200 mt-1 font-body">
          Awesome job! You smashed the Maths challenge!
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 my-8 font-heading">
          
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-center">
            <span className="text-[10px] font-black text-slate-300 block uppercase tracking-wider">FINAL SCORE</span>
            <span className="text-2xl font-black text-white">{stats.score}</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-center">
            <span className="text-[10px] font-black text-slate-300 block uppercase tracking-wider">ACCURACY</span>
            <span className="text-2xl font-black text-emerald-400">{accuracy}%</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-center">
            <span className="text-[10px] font-black text-slate-300 block uppercase tracking-wider">CORRECT</span>
            <span className="text-2xl font-black text-amber-300">{stats.correctCount} / {stats.totalQuestions}</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-center">
            <span className="text-[10px] font-black text-slate-300 block uppercase tracking-wider">TIME TAKEN</span>
            <span className="text-2xl font-black text-cyan-300">{stats.timeTaken}</span>
          </div>

        </div>

        {/* Earnings Banner */}
        <div className="bg-gradient-to-r from-amber-500/20 via-yellow-500/25 to-amber-500/20 border border-amber-400/50 p-5 rounded-2xl flex flex-wrap items-center justify-around gap-4 mb-6 shadow-xl">
          <div className="flex items-center gap-2 font-heading">
            <Sparkles className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span className="font-black text-base text-amber-300">+{stats.xpEarned} XP EARNED</span>
          </div>

          <div className="flex items-center gap-2 font-heading">
            <Coins className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span className="font-black text-base text-amber-300">+{stats.coinsEarned} COINS</span>
          </div>
        </div>

        {/* Badge Unlocked Display */}
        {stats.badgeEarned && (
          <div className="inline-flex items-center gap-2 bg-purple-950/80 border border-purple-400/40 px-5 py-2.5 rounded-2xl text-xs font-heading font-black text-purple-200 mb-6 shadow-lg">
            <span>UNLOCKED BADGE:</span>
            <span className="text-amber-300">{stats.badgeEarned}</span>
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 font-heading">
          
          <button
            onClick={() => {
              sound.playClick();
              onClaimRewards({ xp: stats.xpEarned, coins: stats.coinsEarned, badge: stats.badgeEarned });
            }}
            className="btn-game-gold py-4 text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            <Gift className="w-4 h-4" /> CLAIM REWARDS
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onPlayNext();
            }}
            className="btn-game-cyan py-4 text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4" /> PLAY NEXT LEVEL
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onHome();
            }}
            className="btn-game-secondary py-4 text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" /> RETURN HOME
          </button>

        </div>

      </motion.div>

    </div>
  );
}
