import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Star, Trophy, ChevronRight, BookOpen, Layers } from 'lucide-react';
import { SUPPORTED_GRADES, SUBJECTS_BY_GRADE, getChaptersForGradeAndSubject } from '../data/curriculumData';
import { sound } from '../utils/sound';

export default function WorldSelectionScreen({ currentClass, currentSubject, onSelectGrade, onSelectSubject, onSelectWorld }) {
  const [selectedGrade, setSelectedGrade] = useState(currentClass || 9);
  const availableSubjects = SUBJECTS_BY_GRADE[selectedGrade] || SUBJECTS_BY_GRADE[9];
  
  const [selectedSubj, setSelectedSubj] = useState(() => {
    if (currentSubject && availableSubjects.some(s => s.id === currentSubject)) {
      return currentSubject;
    }
    return availableSubjects[0]?.id || 'maths';
  });

  const worlds = getChaptersForGradeAndSubject(selectedGrade, selectedSubj);

  const handleGradeChange = (gId) => {
    sound.playClick();
    setSelectedGrade(gId);
    if (onSelectGrade) onSelectGrade(gId);
    const newSubjs = SUBJECTS_BY_GRADE[gId] || SUBJECTS_BY_GRADE[9];
    const defaultSub = newSubjs[0]?.id || 'maths';
    setSelectedSubj(defaultSub);
    if (onSelectSubject) onSelectSubject(defaultSub);
  };

  const handleSubjectChange = (sId) => {
    sound.playClick();
    setSelectedSubj(sId);
    if (onSelectSubject) onSelectSubject(sId);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 sm:p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden border border-indigo-200/50 dark:border-white/15 bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950"
      >
        <div className="orb-glow-purple top-0 right-0 blur-[120px] opacity-35" />
        <div className="flex items-center gap-2 text-amber-400 font-heading font-black text-xs uppercase tracking-wider mb-2">
          <Trophy className="w-4 h-4 text-amber-400" /> QUIZ WORLDS ARENA
        </div>
        <h1 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-white">
          Explore Grades 4th – 12th & Subjects
        </h1>
        <p className="text-sm text-cyan-200 mt-1.5 font-medium font-body">
          Select your grade, subject, and interactive chapter topic to unlock game levels and boss challenges!
        </p>
      </motion.div>

      {/* 1. GRADE SELECTOR PILLS (4th - 12th) */}
      <div className="glass-panel p-3 rounded-3xl border border-indigo-200/50 dark:border-white/10 shadow-xl space-y-2">
        <div className="flex items-center gap-2 px-2 text-xs font-heading font-black text-slate-500 dark:text-cyan-400 uppercase tracking-wider">
          <Layers className="w-4 h-4 text-indigo-500" /> SELECT GRADE STANDARD:
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none font-heading font-black">
          {SUPPORTED_GRADES.map((g) => {
            const isSelected = selectedGrade === g.id;
            return (
              <button
                key={g.id}
                onClick={() => handleGradeChange(g.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap border ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white border-white/30 shadow-lg scale-105'
                    : 'bg-white/50 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-indigo-200/40 dark:border-white/10 hover:bg-indigo-50 dark:hover:bg-white/10'
                }`}
              >
                <span>{g.icon}</span>
                <span>{g.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. SUBJECT SELECTOR TABS */}
      <div className="flex items-center justify-start gap-3 overflow-x-auto p-1.5 glass-panel rounded-2xl shadow-xl border border-indigo-200/50 dark:border-white/10 font-heading font-black">
        <span className="text-xs text-slate-400 dark:text-slate-500 px-3 uppercase tracking-wider flex items-center gap-1">
          <BookOpen className="w-4 h-4" /> SUBJECT:
        </span>
        {availableSubjects.map((sub) => {
          const isSelected = selectedSubj === sub.id;
          return (
            <button
              key={sub.id}
              onClick={() => handleSubjectChange(sub.id)}
              className={`py-2.5 px-5 text-xs rounded-xl transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                isSelected
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              <span>{sub.icon}</span>
              <span>{sub.name}</span>
            </button>
          );
        })}
      </div>

      {/* 3. CHAPTER / WORLD CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {worlds.map((world, idx) => {
          const isUnlocked = world.unlocked;
          return (
            <motion.div
              key={world.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={isUnlocked ? { y: -5 } : {}}
              className={`glass-card p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between transition-all group border border-indigo-200/50 dark:border-white/10 ${
                !isUnlocked ? 'opacity-65 grayscale-[30%]' : ''
              }`}
            >
              <div>
                {/* Header info */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${world.color || 'from-indigo-600 to-purple-600'} flex items-center justify-center text-3xl shadow-xl border-2 border-white/30 text-white group-hover:scale-105 transition-transform`}>
                      {world.icon || '📐'}
                    </div>
                    <div>
                      <span className="text-[10px] font-heading font-black text-indigo-600 dark:text-cyan-400 uppercase tracking-widest block">
                        REALM {idx + 1}
                      </span>
                      <h2 className="text-xl font-heading font-black text-slate-900 dark:text-white leading-tight">
                        {world.title.replace(/.*– /, '')}
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-300 font-medium mt-0.5 font-body">
                        {world.subtitle}
                      </p>
                    </div>
                  </div>

                  {!isUnlocked ? (
                    <div className="bg-slate-100 dark:bg-slate-900/80 text-slate-500 dark:text-slate-400 p-3 rounded-2xl border border-slate-200 dark:border-white/10">
                      <Lock className="w-5 h-5 text-rose-500" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 bg-amber-500/10 dark:bg-amber-400/20 text-amber-700 dark:text-amber-300 font-heading font-black text-xs px-3 py-1.5 rounded-xl border border-amber-500/30 dark:border-amber-400/40 shadow-sm">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                      <span>{world.stars || 12} / {world.maxStars || 15}</span>
                    </div>
                  )}
                </div>

                {/* Progress bar */}
                <div className="space-y-2 my-4">
                  <div className="flex justify-between text-xs font-heading font-black text-slate-700 dark:text-slate-300">
                    <span>Topic Mastery</span>
                    <span className="text-indigo-600 dark:text-cyan-400">{world.progress || 60}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-900 rounded-full h-4 p-0.5 border border-slate-300 dark:border-white/10 shadow-inner relative overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        isUnlocked ? 'bg-gradient-to-r from-cyan-500 via-indigo-500 to-amber-400 shimmer' : 'bg-slate-400 dark:bg-slate-700'
                      }`}
                      style={{ width: `${world.progress || 60}%` }}
                    />
                  </div>
                </div>

              </div>

              {/* Action area */}
              <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                <span className="text-xs font-heading font-bold text-slate-500 dark:text-slate-400">
                  {world.totalLevels || 5} Levels & Boss Challenge
                </span>

                {isUnlocked ? (
                  <button
                    onClick={() => {
                      sound.playClick();
                      onSelectWorld({
                        ...world,
                        classStandard: selectedGrade,
                        subjectId: selectedSubj
                      });
                    }}
                    className="btn-game-cyan text-xs py-2.5 px-5 shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>ENTER REALM</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <span className="text-xs font-heading font-extrabold text-slate-400 dark:text-slate-500 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" /> Unlock Previous Realm First
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

