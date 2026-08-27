import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { progressService } from '../services/progressService';

export default function ProgressScreen({ user }) {
  const [summaryData, setSummaryData] = useState(null);

  useEffect(() => {
    async function loadSummary() {
      try {
        const res = await progressService.getProgressSummary();
        if (res && res.success) {
          setSummaryData(res);
        }
      } catch (err) {}
    }
    loadSummary();
  }, []);

  const stats = user.stats || {
    gamesPlayed: 48,
    questionsSolved: 342,
    accuracy: 91,
    averageTime: "18 sec",
    bestScore: 1250,
    perfectQuizzes: 14
  };

  const colors = ["bg-indigo-600 dark:bg-indigo-500", "bg-purple-600 dark:bg-purple-500", "bg-emerald-600 dark:bg-emerald-500", "bg-amber-500 dark:bg-amber-400", "bg-cyan-600 dark:bg-cyan-400", "bg-rose-600 dark:bg-rose-500"];
  const topicMastery = summaryData?.topicBreakdown
    ? summaryData.topicBreakdown.map((t, idx) => ({ ...t, color: colors[idx % colors.length] }))
    : [
        { title: "Real Numbers & Surds", progress: 95, color: "bg-indigo-600 dark:bg-indigo-500" },
        { title: "Algebra & Polynomials", progress: 75, color: "bg-purple-600 dark:bg-purple-500" },
        { title: "Geometry & Triangles", progress: 60, color: "bg-emerald-600 dark:bg-emerald-500" },
        { title: "Coordinate Geometry", progress: 85, color: "bg-amber-500 dark:bg-amber-400" },
        { title: "Trigonometry & Ratios", progress: 40, color: "bg-cyan-600 dark:bg-cyan-400" },
        { title: "Statistics & Probability", progress: 50, color: "bg-rose-600 dark:bg-rose-500" }
      ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 sm:p-8 rounded-3xl text-white shadow-2xl border border-indigo-200/50 dark:border-white/15 relative overflow-hidden bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950"
      >
        <div className="orb-glow-cyan top-0 right-0 blur-[130px] opacity-35" />
        <span className="text-amber-400 font-heading font-black text-xs uppercase tracking-widest block mb-1 flex items-center gap-1.5">
          <BarChart3 className="w-4 h-4 text-amber-400" /> LEARNING ANALYTICS ARENA
        </span>
        <h1 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-white">
          Maths Mastery Analytics
        </h1>
        <p className="text-sm text-cyan-200 mt-1 font-medium font-body">
          Visual metrics of your Class 9th & 10th standard syllabus completion, speed, and accuracy.
        </p>
      </motion.div>

      {/* OVERALL STATS CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 font-heading">
        
        <div className="glass-panel p-4 text-center rounded-2xl border border-indigo-200/50 dark:border-white/10">
          <span className="text-[10px] font-heading font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">GAMES PLAYED</span>
          <span className="text-3xl font-heading font-black text-slate-900 dark:text-white mt-1 block">{stats.gamesPlayed}</span>
        </div>

        <div className="glass-panel p-4 text-center rounded-2xl border border-indigo-200/50 dark:border-white/10">
          <span className="text-[10px] font-heading font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">QUESTIONS SOLVED</span>
          <span className="text-3xl font-heading font-black text-indigo-600 dark:text-cyan-400 mt-1 block">{stats.questionsSolved}</span>
        </div>

        <div className="glass-panel p-4 text-center rounded-2xl border border-indigo-200/50 dark:border-white/10">
          <span className="text-[10px] font-heading font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">ACCURACY</span>
          <span className="text-3xl font-heading font-black text-emerald-600 dark:text-emerald-400 mt-1 block">{stats.accuracy}%</span>
        </div>

        <div className="glass-panel p-4 text-center rounded-2xl border border-indigo-200/50 dark:border-white/10">
          <span className="text-[10px] font-heading font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">AVG SPEED</span>
          <span className="text-3xl font-heading font-black text-purple-600 dark:text-purple-400 mt-1 block">{stats.averageTime}</span>
        </div>

        <div className="glass-panel p-4 text-center rounded-2xl border border-indigo-200/50 dark:border-white/10">
          <span className="text-[10px] font-heading font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">BEST SCORE</span>
          <span className="text-3xl font-heading font-black text-amber-600 dark:text-amber-400 mt-1 block">{stats.bestScore}</span>
        </div>

        <div className="glass-panel p-4 text-center rounded-2xl border border-indigo-200/50 dark:border-white/10">
          <span className="text-[10px] font-heading font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">PERFECT QUIZZES</span>
          <span className="text-3xl font-heading font-black text-rose-600 dark:text-rose-400 mt-1 block">{stats.perfectQuizzes}</span>
        </div>

      </div>

      {/* CLASS 9 & CLASS 10 PROGRESS BARS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Class 9 Box */}
        <div className="glass-card p-6 space-y-4 rounded-3xl border border-indigo-200/50 dark:border-white/10">
          <div className="flex items-center justify-between font-heading">
            <h3 className="font-black text-lg text-slate-900 dark:text-white">
              Class 9th Syllabus Completion
            </h3>
            <span className="text-xs font-black text-indigo-700 dark:text-cyan-300 bg-indigo-50 dark:bg-white/10 px-3 py-1 rounded-full border border-indigo-200 dark:border-white/15">
              65% Mastered
            </span>
          </div>

          <div className="w-full bg-slate-200 dark:bg-slate-900 rounded-full h-4 p-0.5 border border-slate-300 dark:border-white/10 shadow-inner overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-amber-400 h-full rounded-full w-[65%] shimmer" />
          </div>

          <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 font-semibold font-body">
            <p className="flex items-center gap-1.5">• Number Quest: <span className="text-amber-600 dark:text-amber-400 font-bold">100% Completed (15/15 Stars)</span></p>
            <p className="flex items-center gap-1.5">• Algebra Arena: <span className="text-indigo-600 dark:text-cyan-400 font-bold">60% Completed (8/15 Stars)</span></p>
            <p className="flex items-center gap-1.5">• Geometry Kingdom: <span className="text-purple-600 dark:text-purple-400 font-bold">20% Completed (3/15 Stars)</span></p>
          </div>
        </div>

        {/* Class 10 Box */}
        <div className="glass-card p-6 space-y-4 rounded-3xl border border-indigo-200/50 dark:border-white/10">
          <div className="flex items-center justify-between font-heading">
            <h3 className="font-black text-lg text-slate-900 dark:text-white">
              Class 10th Syllabus Completion
            </h3>
            <span className="text-xs font-black text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-white/10 px-3 py-1 rounded-full border border-purple-200 dark:border-white/15">
              45% Mastered
            </span>
          </div>

          <div className="w-full bg-slate-200 dark:bg-slate-900 rounded-full h-4 p-0.5 border border-slate-300 dark:border-white/10 shadow-inner overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-emerald-400 h-full rounded-full w-[45%] shimmer" />
          </div>

          <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 font-semibold font-body">
            <p className="flex items-center gap-1.5">• Real Numbers: <span className="text-emerald-600 dark:text-emerald-400 font-bold">80% Completed (12/15 Stars)</span></p>
            <p className="flex items-center gap-1.5">• Algebra Master: <span className="text-indigo-600 dark:text-cyan-400 font-bold">40% Completed (6/15 Stars)</span></p>
            <p className="flex items-center gap-1.5">• Coordinate Quest: <span className="text-amber-600 dark:text-amber-400 font-bold">10% Completed (2/15 Stars)</span></p>
          </div>
        </div>

      </div>

      {/* TOPIC MASTERY BREAKDOWN */}
      <div className="glass-card p-6 space-y-5 rounded-3xl border border-indigo-200/50 dark:border-white/10">
        <h3 className="font-heading font-black text-xl text-slate-900 dark:text-white">
          Concept Topic Mastery
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topicMastery.map((topic) => (
            <div key={topic.title} className="space-y-2 bg-indigo-50/50 dark:bg-white/5 p-4 rounded-2xl border border-indigo-200/50 dark:border-white/10">
              <div className="flex justify-between text-xs font-heading font-black text-slate-900 dark:text-slate-200">
                <span>{topic.title}</span>
                <span className="text-indigo-600 dark:text-cyan-400">{topic.progress}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-900 rounded-full h-3 shadow-inner overflow-hidden">
                <div className={`${topic.color} h-full rounded-full transition-all duration-700`} style={{ width: `${topic.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
