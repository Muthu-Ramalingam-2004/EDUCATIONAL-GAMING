import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Puzzle, MoveHorizontal, Clock, Trophy, Brain, Play, Sparkles, BookOpen, Layers } from 'lucide-react';
import { sound } from '../utils/sound';
import { SUPPORTED_GRADES, SUBJECTS_BY_GRADE, getChaptersForGradeAndSubject } from '../data/curriculumData';

export default function GameModeScreen({ onSelectMode, playerLevel, currentGrade = 9, currentSubject = 'maths', currentTopic = null }) {
  const [selectedGrade, setSelectedGrade] = useState(currentGrade);
  const [selectedSubject, setSelectedSubject] = useState(currentSubject);

  const availableSubjects = SUBJECTS_BY_GRADE[selectedGrade] || SUBJECTS_BY_GRADE[9];
  const chapters = getChaptersForGradeAndSubject(selectedGrade, selectedSubject);

  const [selectedChapterId, setSelectedChapterId] = useState(
    currentTopic ? (chapters.find(c => c.topicId === currentTopic || c.id === currentTopic)?.id || chapters[0]?.id) : chapters[0]?.id
  );

  const activeChapter = chapters.find(c => c.id === selectedChapterId) || chapters[0];

  const modes = [
    {
      id: 'quiz',
      title: 'QUICK QUIZ ARENA',
      desc: 'Fast-paced multiple choice speed battle testing core standard concepts',
      difficulty: 'Easy - Medium',
      xp: 150,
      icon: Zap,
      gradient: 'from-amber-400 via-orange-500 to-red-600',
      minLevel: 1,
      unlocked: true
    },
    {
      id: 'puzzle',
      title: 'PUZZLE LAB',
      desc: 'Solve interactive number patterns, logical reasoning, and concept sequence puzzles',
      difficulty: 'Challenge',
      xp: 200,
      icon: Puzzle,
      gradient: 'from-indigo-600 via-purple-600 to-pink-600',
      minLevel: 1,
      unlocked: true
    },
    {
      id: 'dragdrop',
      title: 'PROOF & STEP REORDER',
      desc: 'Arrange step-by-step solutions, scientific proofs, and logical sequences in order',
      difficulty: 'Hard',
      xp: 220,
      icon: MoveHorizontal,
      gradient: 'from-emerald-500 via-teal-600 to-cyan-600',
      minLevel: 1,
      unlocked: true
    },
    {
      id: 'timeattack',
      title: 'TIME ATTACK SPEEDWAY',
      desc: 'Race against a 15-second clock to solve maximum subject problems before time runs out',
      difficulty: 'Extreme',
      xp: 250,
      icon: Clock,
      gradient: 'from-rose-500 via-pink-600 to-red-700',
      minLevel: 1,
      unlocked: true
    },
    {
      id: 'formula',
      title: 'FORMULA MATCH VAULT',
      desc: 'Match key subject formulas, laws, and definitions with their exact solutions',
      difficulty: 'Practice',
      xp: 180,
      icon: Trophy,
      gradient: 'from-cyan-500 via-blue-600 to-indigo-700',
      minLevel: 1,
      unlocked: true
    },
    {
      id: 'memory',
      title: 'MEMORY MATCH MATRIX',
      desc: 'Flip tiles and match twin concept statements with evaluated outputs',
      difficulty: 'Medium',
      xp: 190,
      icon: Brain,
      gradient: 'from-purple-600 via-pink-600 to-amber-500',
      minLevel: 1,
      unlocked: true
    }
  ];

  const handleLaunchMode = (modeId) => {
    sound.playClick();
    onSelectMode(modeId, {
      classStandard: selectedGrade,
      subjectId: selectedSubject,
      chapterId: activeChapter?.id,
      topicId: activeChapter?.topicId
    });
  };

  return (
    <div className="space-y-8 pb-12 font-heading">
      
      {/* Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 sm:p-8 rounded-3xl text-white shadow-2xl border border-indigo-200/50 dark:border-white/15 relative overflow-hidden bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950"
      >
        <div className="orb-glow-cyan top-0 right-0 blur-[130px] opacity-35" />
        <span className="text-amber-400 font-heading font-black text-xs uppercase tracking-widest block mb-1 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} /> PLAY MODES MODULE
        </span>
        <h1 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-white">
          Interactive Challenge Modes
        </h1>
        <p className="text-sm text-cyan-200 mt-1.5 font-medium font-body">
          Select your Standard, Subject, and Topic to launch custom challenges across all 6 playable modes!
        </p>
      </motion.div>

      {/* 1. STANDARD SELECTOR (4th STD - 12th STD) */}
      <div className="glass-panel p-5 rounded-3xl border border-indigo-500/20 bg-slate-950/60 space-y-3">
        <span className="text-xs font-black text-slate-400 uppercase tracking-widest block flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-400" /> SELECT STANDARD (4TH STD – 12TH STD)
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none font-heading font-black">
          {SUPPORTED_GRADES.map(g => {
            const stdLabel = `${g.id}th STD`;
            const isSelected = selectedGrade === g.id;
            return (
              <button
                key={g.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedGrade(g.id);
                  const subjs = SUBJECTS_BY_GRADE[g.id] || [];
                  const firstSubj = subjs[0]?.id || 'maths';
                  setSelectedSubject(firstSubj);
                  const chs = getChaptersForGradeAndSubject(g.id, firstSubj);
                  setSelectedChapterId(chs[0]?.id);
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer whitespace-nowrap border shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400 shadow-lg shadow-cyan-500/30 scale-105'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {stdLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. SUBJECT TABS SELECTOR */}
      <div className="glass-panel p-5 rounded-3xl border border-indigo-500/20 bg-slate-950/60 space-y-3">
        <span className="text-xs font-black text-slate-400 uppercase tracking-widest block flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" /> SELECT SUBJECT
        </span>
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {availableSubjects.map(subj => (
            <button
              key={subj.id}
              onClick={() => {
                sound.playClick();
                setSelectedSubject(subj.id);
                const chs = getChaptersForGradeAndSubject(selectedGrade, subj.id);
                setSelectedChapterId(chs[0]?.id);
              }}
              className={`px-5 py-3 rounded-2xl text-xs font-black transition-all cursor-pointer whitespace-nowrap border flex items-center gap-2 shrink-0 ${
                selectedSubject === subj.id
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400 shadow-lg shadow-purple-600/30 scale-105'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>{subj.icon}</span>
              <span>{subj.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. TOPIC REALM SELECTOR */}
      <div className="glass-panel p-5 rounded-3xl border border-indigo-500/20 bg-slate-950/60 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest block">
            SELECT TOPIC / CHAPTER REALM
          </span>
          <span className="text-xs text-cyan-400 font-extrabold">
            {chapters.length} Topics Available
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {chapters.map(ch => {
            const isSelected = selectedChapterId === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedChapterId(ch.id);
                }}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-br from-indigo-900/90 to-slate-900 border-amber-400 shadow-xl shadow-amber-400/20'
                    : 'bg-slate-900/60 border-white/10 hover:border-white/20 text-slate-300'
                }`}
              >
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block mb-1">
                    {ch.chapter || 'TOPIC'}
                  </span>
                  <h4 className="text-sm font-black text-white leading-snug">{ch.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 font-body leading-relaxed">{ch.subtitle}</p>
                </div>
                {isSelected && (
                  <span className="mt-3 text-[10px] font-black uppercase tracking-wider text-cyan-300 bg-cyan-500/20 border border-cyan-400/40 px-2 py-0.5 rounded self-start">
                    ✓ ACTIVE TOPIC
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. GAME MODES GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" /> Play Modes for {activeChapter?.title || 'Selected Topic'}
          </h2>
          <span className="text-xs text-slate-400">{selectedGrade}th Standard • {availableSubjects.find(s=>s.id===selectedSubject)?.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modes.map((mode, idx) => {
            const Icon = mode.icon;

            return (
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                className="glass-card p-6 flex flex-col justify-between relative overflow-hidden transition-all group border border-indigo-200/50 dark:border-white/10"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${mode.gradient} flex items-center justify-center text-white text-2xl shadow-xl group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>

                    <span className="bg-amber-500/15 dark:bg-amber-400/20 text-amber-700 dark:text-amber-300 font-heading font-black text-xs px-3 py-1 rounded-xl border border-amber-500/30 dark:border-amber-400/40 shadow-sm">
                      +{mode.xp} XP
                    </span>
                  </div>

                  <h3 className="text-xl font-heading font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-cyan-300 transition-colors">
                    {mode.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed font-medium font-body">
                    {mode.desc}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100 dark:border-white/10 flex items-center justify-between font-heading">
                  <span className="text-xs font-black text-slate-700 dark:text-slate-300 bg-indigo-50 dark:bg-white/5 px-3 py-1 rounded-xl border border-indigo-200 dark:border-white/10">
                    {mode.difficulty}
                  </span>

                  <button
                    onClick={() => handleLaunchMode(mode.id)}
                    className="btn-game-cyan text-xs py-2.5 px-4 shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>PLAY MODE</span>
                    <Play className="w-3.5 h-3.5 fill-white" />
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
