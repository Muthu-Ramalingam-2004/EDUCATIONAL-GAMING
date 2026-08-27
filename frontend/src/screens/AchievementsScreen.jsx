import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle2, Award } from 'lucide-react';
import { achievementsData } from '../data/mockAchievements';
import { rewardService } from '../services/rewardService';

export default function AchievementsScreen() {
  const [achievements, setAchievements] = useState(achievementsData);

  useEffect(() => {
    async function loadAchievements() {
      try {
        const res = await rewardService.getAchievements();
        if (res && res.success && Array.isArray(res.achievements) && res.achievements.length > 0) {
          setAchievements(res.achievements);
        }
      } catch (err) {}
    }
    loadAchievements();
  }, []);

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 sm:p-8 rounded-3xl text-white shadow-2xl flex items-center justify-between gap-4 border border-indigo-200/50 dark:border-white/15 relative overflow-hidden bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950"
      >
        <div className="orb-glow-purple top-0 right-0 blur-[130px] opacity-35" />
        <div>
          <span className="text-amber-400 font-heading font-black text-xs uppercase tracking-widest block mb-1 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" /> BADGES & MILESTONES
          </span>
          <h1 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-white">
            Player Trophy Vault
          </h1>
          <p className="text-sm text-cyan-200 mt-1 font-medium font-body">
            Complete special math challenges to unlock rare badges, coins, and bonus XP!
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-white/15 text-center shadow-xl font-heading">
          <span className="text-[10px] font-black text-slate-300 block uppercase tracking-wider">UNLOCKED</span>
          <span className="text-2xl font-black text-amber-400">{unlockedCount} / {achievements.length}</span>
        </div>
      </motion.div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {achievements.map((ach, idx) => {
          const isUnlocked = ach.unlocked;

          return (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              whileHover={isUnlocked ? { y: -5 } : {}}
              className={`glass-card p-6 flex flex-col justify-between transition-all group rounded-3xl border ${
                isUnlocked 
                  ? 'border-amber-400/50 dark:border-amber-400/50 bg-amber-500/10 shadow-lg' 
                  : 'border-indigo-200/50 dark:border-white/10 opacity-60 grayscale-[30%]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-xl group-hover:scale-110 transition-transform ${
                    isUnlocked ? 'bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-500 text-slate-950 border-2 border-white' : 'bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-white/10'
                  }`}>
                    {ach.icon}
                  </div>

                  {isUnlocked ? (
                    <span className="bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[10px] font-heading font-black px-3 py-1 rounded-full flex items-center gap-1 border border-emerald-400/40">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> EARNED
                    </span>
                  ) : (
                    <span className="bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 text-[10px] font-heading font-extrabold px-3 py-1 rounded-full flex items-center gap-1 border border-slate-300 dark:border-white/10">
                      <Lock className="w-3.5 h-3.5 text-rose-500" /> LOCKED
                    </span>
                  )}
                </div>

                <h3 className="font-heading font-black text-lg text-slate-900 dark:text-white">
                  {ach.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed font-medium font-body">
                  {ach.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs font-heading">
                <span className="font-black text-amber-600 dark:text-amber-400">
                  +{ach.xpReward} XP
                </span>

                {isUnlocked ? (
                  <span className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400">
                    {ach.unlockedDate || 'Unlocked'}
                  </span>
                ) : (
                  <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500">
                    {ach.progress || 'Locked'}
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
