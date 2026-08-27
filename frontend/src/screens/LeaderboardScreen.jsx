import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Crown } from 'lucide-react';
import { leaderboardData } from '../data/mockLeaderboard';
import { leaderboardService } from '../services/leaderboardService';
import { sound } from '../utils/sound';

export default function LeaderboardScreen() {
  const [tab, setTab] = useState('daily'); // 'daily' | 'weekly' | 'monthly' | 'overall'
  const [players, setPlayers] = useState(leaderboardData[tab] || leaderboardData.daily);

  useEffect(() => {
    async function fetchRankings() {
      try {
        const res = await leaderboardService.getLeaderboard(tab);
        if (res && res.success && Array.isArray(res.rankings) && res.rankings.length > 0) {
          setPlayers(res.rankings);
        } else {
          setPlayers(leaderboardData[tab] || leaderboardData.daily);
        }
      } catch (err) {
        setPlayers(leaderboardData[tab] || leaderboardData.daily);
      }
    }
    fetchRankings();
  }, [tab]);

  const top1 = players[0];
  const top2 = players[1];
  const top3 = players[2];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 sm:p-8 rounded-3xl text-white shadow-2xl text-center border border-indigo-200/50 dark:border-white/15 relative overflow-hidden bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950"
      >
        <div className="orb-glow-gold top-0 right-0 blur-[130px] opacity-35" />
        <span className="text-amber-400 font-heading font-black text-xs uppercase tracking-widest block mb-1 flex items-center justify-center gap-1.5">
          <Trophy className="w-4 h-4 text-amber-400" /> HALL OF FAME ARENA
        </span>
        <h1 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-white">
          MathQuest Global Leaderboard
        </h1>
        <p className="text-sm text-cyan-200 mt-1 font-medium font-body">
          Compete against CBSE 9th & 10th standard math champions across the nation!
        </p>
      </motion.div>

      {/* Tabs Switcher */}
      <div className="flex items-center justify-center p-1.5 glass-panel rounded-2xl max-w-md mx-auto shadow-xl border border-indigo-200/50 dark:border-white/10 font-heading font-black">
        {['daily', 'weekly', 'monthly', 'overall'].map((t) => (
          <button
            key={t}
            onClick={() => {
              sound.playClick();
              setTab(t);
            }}
            className={`flex-1 py-2.5 text-xs rounded-xl uppercase transition-all cursor-pointer ${
              tab === t
                ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ================================================== */}
      {/* AAA TOP 3 PODIUM DESIGN */}
      {/* ================================================== */}
      <div className="pt-8 pb-4 px-4 flex items-end justify-center gap-3 sm:gap-6 max-w-xl mx-auto">
        
        {/* 2ND PLACE (SILVER - LEFT PODIUM) */}
        {top2 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 flex flex-col items-center"
          >
            <div className="relative mb-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-slate-400 to-slate-200 border-2 border-slate-300 shadow-xl flex items-center justify-center text-3xl font-heading font-black text-slate-950">
                {top2.avatar}
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-700 text-white text-[10px] font-heading font-black px-2.5 py-0.5 rounded-full border border-white shadow-md">
                #2
              </div>
            </div>
            <span className="font-heading font-extrabold text-xs text-slate-900 dark:text-white truncate max-w-[90px]">{top2.name}</span>
            <span className="text-[11px] font-heading font-black text-indigo-600 dark:text-cyan-400">{top2.xp?.toLocaleString()} XP</span>

            {/* Podium Box */}
            <div className="w-full bg-gradient-to-t from-slate-400 to-slate-300 dark:from-slate-800 dark:to-slate-700 h-28 sm:h-36 rounded-t-2xl mt-3 border-t-4 border-slate-400 flex items-center justify-center shadow-2xl">
              <span className="text-4xl font-heading font-black text-slate-700 dark:text-slate-400">2</span>
            </div>
          </motion.div>
        )}

        {/* 1ST PLACE (GOLD - CENTER PODIUM - HIGHEST) */}
        {top1 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 flex flex-col items-center"
          >
            <Crown className="w-8 h-8 text-amber-500 fill-amber-400 animate-bounce mb-1" />
            <div className="relative mb-2">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-500 border-4 border-amber-300 shadow-2xl shadow-amber-400/60 flex items-center justify-center text-4xl font-heading font-black text-slate-950">
                {top1.avatar}
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-xs font-heading font-black px-3 py-0.5 rounded-full border border-slate-950 shadow-md">
                #1
              </div>
            </div>
            <span className="font-heading font-black text-sm text-slate-900 dark:text-white truncate max-w-[110px]">{top1.name}</span>
            <span className="text-xs font-heading font-black text-amber-600 dark:text-amber-400">{top1.xp?.toLocaleString()} XP</span>

            {/* Podium Box */}
            <div className="w-full bg-gradient-to-t from-amber-500 via-yellow-500 to-amber-400 h-36 sm:h-48 rounded-t-2xl mt-3 border-t-4 border-amber-300 flex items-center justify-center shadow-2xl">
              <span className="text-5xl font-heading font-black text-slate-950">1</span>
            </div>
          </motion.div>
        )}

        {/* 3RD PLACE (BRONZE - RIGHT PODIUM) */}
        {top3 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex-1 flex flex-col items-center"
          >
            <div className="relative mb-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-700 to-amber-500 border-2 border-amber-600 shadow-xl flex items-center justify-center text-3xl font-heading font-black text-white">
                {top3.avatar}
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-800 text-white text-[10px] font-heading font-black px-2.5 py-0.5 rounded-full border border-white shadow-md">
                #3
              </div>
            </div>
            <span className="font-heading font-extrabold text-xs text-slate-900 dark:text-white truncate max-w-[90px]">{top3.name}</span>
            <span className="text-[11px] font-heading font-black text-indigo-600 dark:text-cyan-400">{top3.xp?.toLocaleString()} XP</span>

            {/* Podium Box */}
            <div className="w-full bg-gradient-to-t from-amber-800 to-amber-700 dark:from-amber-900 dark:to-amber-800 h-24 sm:h-30 rounded-t-2xl mt-3 border-t-4 border-amber-700 flex items-center justify-center shadow-2xl">
              <span className="text-4xl font-heading font-black text-amber-300">3</span>
            </div>
          </motion.div>
        )}

      </div>

      {/* REMAINING PLAYER RANKINGS TABLE */}
      <div className="glass-panel p-5 space-y-3 rounded-3xl border border-indigo-200/50 dark:border-white/10">
        <h3 className="text-xs font-heading font-black uppercase text-slate-500 dark:text-slate-400 px-3 tracking-wider">
          Player Rankings
        </h3>

        <div className="space-y-2.5 font-heading">
          {players.map((player) => (
            <div
              key={player.rank}
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                player.isCurrentUser
                  ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white border-amber-400 shadow-xl scale-[1.01]'
                  : 'bg-white/80 dark:bg-white/5 text-slate-900 dark:text-white border-indigo-200/60 dark:border-white/10 hover:border-indigo-400 dark:hover:border-cyan-400/40'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={`w-9 h-9 rounded-xl font-heading font-black text-xs flex items-center justify-center ${
                  player.isCurrentUser ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300'
                }`}>
                  #{player.rank}
                </span>

                <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-2xl shadow-md border border-slate-200 dark:border-white/10">
                  {player.avatar}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-black text-base">{player.name}</span>
                    {player.isCurrentUser && (
                      <span className="bg-amber-400 text-slate-950 text-[10px] font-heading font-black px-2 py-0.5 rounded-full">
                        YOU
                      </span>
                    )}
                  </div>
                  <span className={`text-xs font-medium ${player.isCurrentUser ? 'text-cyan-100' : 'text-slate-500 dark:text-slate-400'}`}>
                    Level {player.level} • {player.streak}d Streak 🔥
                  </span>
                </div>
              </div>

              <div className="text-right font-heading">
                <span className={`font-black text-base block ${player.isCurrentUser ? 'text-amber-300' : 'text-indigo-600 dark:text-cyan-400'}`}>
                  {player.xp?.toLocaleString()} XP
                </span>
                <span className={`text-[10px] font-bold ${player.isCurrentUser ? 'text-slate-200' : 'text-slate-400'}`}>
                  Score: {player.score}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
