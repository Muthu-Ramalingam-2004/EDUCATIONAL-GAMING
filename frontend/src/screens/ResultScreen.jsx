import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Sparkles, Coins, Home, Play, Gift, FileText, FileSpreadsheet, Download, Loader2, Star } from 'lucide-react';
import { fireConfetti } from '../utils/confetti';
import { sound } from '../utils/sound';
import { exportToPDF, exportToExcel } from '../utils/exportResults';

export default function ResultScreen({ resultData, onClaimRewards, onPlayNext, onHome }) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isGeneratingExcel, setIsGeneratingExcel] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState('success');

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
    starsEarned: 3,
    badgeEarned: '🏆 QUIZ CHAMPION'
  };

  const accuracy = Math.round((stats.correctCount / stats.totalQuestions) * 100);
  const starsEarned = stats.starsEarned !== undefined ? stats.starsEarned : (accuracy >= 90 ? 3 : accuracy >= 70 ? 2 : accuracy >= 50 ? 1 : 0);

  const showNotification = (msg, type = 'success') => {
    setToastMsg(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMsg('');
    }, 4000);
  };

  const handleDownloadPDF = async () => {
    if (isGeneratingPDF) return;
    sound.playClick();
    setIsGeneratingPDF(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      exportToPDF(stats);
      showNotification('PDF Game Report downloaded successfully!', 'success');
    } catch (err) {
      console.error('PDF export failed:', err);
      showNotification('Failed to generate PDF report. Please try again.', 'error');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleDownloadExcel = async () => {
    if (isGeneratingExcel) return;
    sound.playClick();
    setIsGeneratingExcel(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      exportToExcel(stats);
      showNotification('Excel (.xlsx) Results sheet downloaded successfully!', 'success');
    } catch (err) {
      console.error('Excel export failed:', err);
      showNotification('Failed to generate Excel file. Please try again.', 'error');
    } finally {
      setIsGeneratingExcel(false);
    }
  };

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
          Awesome job! You completed the challenge mission!
        </p>

        {/* Star Rating Display */}
        <div className="flex items-center justify-center gap-3 my-5">
          {[1, 2, 3].map((starNum) => {
            const isEarned = starNum <= starsEarned;
            return (
              <motion.div
                key={starNum}
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: isEarned ? 1.15 : 0.9, rotate: 0 }}
                transition={{ delay: starNum * 0.15, type: 'spring' }}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 shadow-2xl ${
                  isEarned
                    ? 'bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-500 border-white text-slate-950 shadow-amber-400/60'
                    : 'bg-slate-900/60 border-white/10 text-slate-600'
                }`}
              >
                <Star className={`w-8 h-8 ${isEarned ? 'fill-slate-950 text-slate-950' : 'text-slate-600'}`} />
              </motion.div>
            );
          })}
        </div>
        <span className="text-xs font-black text-amber-300 uppercase tracking-widest block font-heading">
          {starsEarned === 3 ? '⭐⭐⭐ PERFECT 3-STAR MASTERY!' : starsEarned === 2 ? '⭐⭐ GREAT 2-STAR PERFORMANCE!' : starsEarned === 1 ? '⭐ LEVEL UNLOCKED (1 STAR)' : '0 STARS — RE-TRY FOR HIGHER ACCURACY'}
        </span>

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

        {/* DOWNLOAD GAME RESULTS SECTION */}
        <div className="bg-slate-900/80 border border-indigo-500/30 p-5 rounded-2xl mb-6 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <span className="text-xs font-heading font-black text-cyan-300 uppercase tracking-wider flex items-center gap-2">
              <Download className="w-4 h-4 text-cyan-400" /> Export Official Result Report
            </span>
            <span className="text-[10px] text-slate-400 font-bold">PDF & Excel (.xlsx)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <button
              disabled={isGeneratingPDF}
              onClick={handleDownloadPDF}
              className="py-3 px-4 rounded-xl font-heading font-black text-xs bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white border border-rose-400/40 shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all"
            >
              {isGeneratingPDF ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Generating PDF Report...</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 text-white" />
                  <span>Download as PDF</span>
                </>
              )}
            </button>

            <button
              disabled={isGeneratingExcel}
              onClick={handleDownloadExcel}
              className="py-3 px-4 rounded-xl font-heading font-black text-xs bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border border-emerald-400/40 shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all"
            >
              {isGeneratingExcel ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Generating Excel Sheet...</span>
                </>
              ) : (
                <>
                  <FileSpreadsheet className="w-4 h-4 text-white" />
                  <span>Download as Excel (.xlsx)</span>
                </>
              )}
            </button>
          </div>

          {toastMsg && (
            <div className={`p-2.5 rounded-xl text-xs font-bold text-center border ${
              toastType === 'success' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
            }`}>
              {toastMsg}
            </div>
          )}
        </div>

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
