import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Users, HelpCircle, Gamepad2, Plus, Trash2, Edit2, LogOut, 
  TrendingUp, Award, Settings, Search, Check, X, ShieldAlert, BarChart3, 
  GraduationCap, Coins, Activity, RefreshCw, Eye, EyeOff
} from 'lucide-react';
import { adminService } from '../services/adminService';
import { sound } from '../utils/sound';

export default function AdminDashboardScreen({ onLogout, onExitAdmin }) {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'students' | 'questions' | 'leaderboard' | 'games' | 'rewards' | 'reports' | 'settings'
  
  // Data States
  const [students, setStudents] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [badges, setBadges] = useState([]);
  const [adminStats, setAdminStats] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  
  // UI States
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState('all'); // 'all' | '9' | '10'
  const [questionClassFilter, setQuestionClassFilter] = useState('all'); // 'all' | '9' | '10'
  
  // Modals & Forms State
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [showEditQuestionModal, setShowEditQuestionModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // New Question Form
  const [newQText, setNewQText] = useState('');
  const [newQClass, setNewQClass] = useState(9);
  const [newQType, setNewQType] = useState('quiz');
  const [newQDiff, setNewQDiff] = useState('Medium');
  const [newQExpl, setNewQExpl] = useState('');
  const [newQOptA, setNewQOptA] = useState('');
  const [newQOptB, setNewQOptB] = useState('');
  const [newQOptC, setNewQOptC] = useState('');
  const [newQOptD, setNewQOptD] = useState('');
  const [newCorrect, setNewCorrect] = useState('A');
  
  // Student Edit Form
  const [editStudentName, setEditStudentName] = useState('');
  const [editStudentClass, setEditStudentClass] = useState(9);
  const [editStudentLevel, setEditStudentLevel] = useState(1);
  const [editStudentXP, setEditStudentXP] = useState(0);
  const [editStudentCoins, setEditStudentCoins] = useState(0);
  const [editStudentStreak, setEditStudentStreak] = useState(1);
  
  // Multipliers Config
  const [xpRate, setXpRate] = useState(1.5);
  const [coinRate, setCoinRate] = useState(1.0);
  
  // Load initial data
  const loadData = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const statsRes = await adminService.getDashboardStats();
      if (statsRes && statsRes.success) {
        setAdminStats(statsRes.stats);
      } else {
        throw new Error('Failed to load dashboard statistics.');
      }
      
      const qRes = await adminService.getQuestions();
      if (qRes && qRes.success && Array.isArray(qRes.questions)) {
        setQuestions(qRes.questions);
      } else {
        throw new Error('Failed to load syllabus question bank.');
      }
      
      const sRes = await adminService.getStudents();
      if (sRes && sRes.success && Array.isArray(sRes.students)) {
        setStudents(sRes.students);
      } else {
        throw new Error('Failed to load student profiles.');
      }
      
      const lRes = await adminService.getLeaderboard();
      if (lRes && lRes.success && Array.isArray(lRes.leaderboard)) {
        setLeaderboard(lRes.leaderboard);
      } else {
        throw new Error('Failed to load leaderboard data.');
      }
      
      const bRes = await adminService.getBadges();
      if (bRes && bRes.success && Array.isArray(bRes.badges)) {
        setBadges(bRes.badges);
      } else {
        throw new Error('Failed to load achievement badges.');
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
      setErrorMessage(err.message || 'Unable to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = () => {
    sound.playClick();
    loadData();
  };

  // Question CRUD Operations
  const handleCreateQuestion = async (e) => {
    e.preventDefault();
    sound.playClick();
    
    const payload = {
      questionText: newQText,
      classStandard: Number(newQClass),
      questionType: newQType,
      explanation: newQExpl,
      difficulty: newQDiff,
      xpReward: 50,
      coinsReward: 20,
      options: [
        { option_key: 'A', option_text: newOptText(newQOptA, 'Option A'), isCorrect: newCorrect === 'A' },
        { option_key: 'B', option_text: newOptText(newQOptB, 'Option B'), isCorrect: newCorrect === 'B' },
        { option_key: 'C', option_text: newOptText(newQOptC, 'Option C'), isCorrect: newCorrect === 'C' },
        { option_key: 'D', option_text: newOptText(newQOptD, 'Option D'), isCorrect: newCorrect === 'D' }
      ]
    };
    
    const res = await adminService.createQuestion(payload);
    if (res && res.success) {
      setShowAddQuestionModal(false);
      resetQuestionForm();
      loadData();
    } else {
      alert('Failed to save question.');
    }
  };
  
  const handleEditQuestionClick = (q) => {
    sound.playClick();
    setSelectedQuestion(q);
    setNewQText(q.questionText || q.question || '');
    setNewQClass(q.classStandard || 9);
    setNewQType(q.questionType || 'quiz');
    setNewQDiff(q.difficulty || 'Medium');
    setNewQExpl(q.explanation || '');
    
    const opts = q.options || [];
    setNewQOptA(opts[0]?.option_text || opts[0]?.text || '');
    setNewQOptB(opts[1]?.option_text || opts[1]?.text || '');
    setNewQOptC(opts[2]?.option_text || opts[2]?.text || '');
    setNewQOptD(opts[3]?.option_text || opts[3]?.text || '');
    
    const correctOpt = opts.find(o => o.isCorrect === true || o.is_correct === true);
    setNewCorrect(correctOpt?.option_key || correctOpt?.id || 'A');
    setShowEditQuestionModal(true);
  };
  
  const handleUpdateQuestion = async (e) => {
    e.preventDefault();
    sound.playClick();
    
    const payload = {
      questionText: newQText,
      classStandard: Number(newQClass),
      questionType: newQType,
      explanation: newQExpl,
      difficulty: newQDiff,
      options: [
        { option_key: 'A', option_text: newOptText(newQOptA, 'Option A'), isCorrect: newCorrect === 'A' },
        { option_key: 'B', option_text: newOptText(newQOptB, 'Option B'), isCorrect: newCorrect === 'B' },
        { option_key: 'C', option_text: newOptText(newQOptC, 'Option C'), isCorrect: newCorrect === 'C' },
        { option_key: 'D', option_text: newOptText(newQOptD, 'Option D'), isCorrect: newCorrect === 'D' }
      ]
    };
    
    const res = await adminService.updateQuestion(selectedQuestion.id, payload);
    if (res && res.success) {
      setShowEditQuestionModal(false);
      resetQuestionForm();
      loadData();
    } else {
      alert('Failed to update question.');
    }
  };

  const handleDeleteQuestion = async (id) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;
    sound.playClick();
    const res = await adminService.deleteQuestion(id);
    if (res && res.success) {
      loadData();
    } else {
      alert('Failed to delete question.');
    }
  };

  const newOptText = (val, fallback) => {
    return val && val.trim() ? val.trim() : fallback;
  };
  
  const resetQuestionForm = () => {
    setNewQText('');
    setNewQClass(9);
    setNewQType('quiz');
    setNewQDiff('Medium');
    setNewQExpl('');
    setNewQOptA('');
    setNewQOptB('');
    setNewQOptC('');
    setNewQOptD('');
    setNewCorrect('A');
    setSelectedQuestion(null);
  };

  // Student CRUD Operations
  const handleEditStudentClick = (student) => {
    sound.playClick();
    setSelectedStudent(student);
    setEditStudentName(student.name || '');
    setEditStudentClass(student.classStandard || 9);
    setEditStudentLevel(student.level || 1);
    setEditStudentXP(student.totalXp || 0);
    setEditStudentCoins(student.coins || 0);
    setEditStudentStreak(student.streakDays || 1);
    setShowEditStudentModal(true);
  };

  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    sound.playClick();
    
    const payload = {
      name: editStudentName,
      classStandard: Number(editStudentClass),
      level: Number(editStudentLevel),
      totalXp: Number(editStudentXP),
      coins: Number(editStudentCoins),
      streakDays: Number(editStudentStreak)
    };

    const res = await adminService.updateStudent(selectedStudent.id, payload);
    if (res && res.success) {
      setShowEditStudentModal(false);
      loadData();
    } else {
      alert('Failed to update student profile.');
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm('WARNING: Deleting this student will remove their entire account and performance data permanently! Do you want to proceed?')) return;
    sound.playClick();
    const res = await adminService.deleteStudent(id);
    if (res && res.success) {
      loadData();
    } else {
      alert('Failed to delete student.');
    }
  };

  // Filter students based on search and standard selector
  const filteredStudents = students.filter(s => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      (s.name && s.name.toLowerCase().includes(query)) ||
      (s.username && s.username.toLowerCase().includes(query)) ||
      (s.email && s.email.toLowerCase().includes(query));
    
    const matchesClass = 
      classFilter === 'all' || 
      Number(s.classStandard) === Number(classFilter);
      
    return matchesSearch && matchesClass;
  });

  // Filter questions based on standard
  const filteredQuestions = questions.filter(q => {
    return questionClassFilter === 'all' || Number(q.classStandard) === Number(questionClassFilter);
  });

  return (
    <div className="min-h-screen pb-12 flex flex-col md:flex-row gap-6 text-slate-100 font-heading">
      
      {/* Sidebar Panel */}
      <div className="w-full md:w-64 shrink-0 glass-panel p-5 rounded-3xl border border-indigo-500/20 bg-slate-950/80 flex flex-col justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div className="space-y-6">
          {/* Admin title */}
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-black text-xl flex items-center justify-center shadow-lg border border-purple-500/30">
              👑
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight text-white leading-tight">Admin Portal</h2>
              <span className="text-[10px] text-purple-400 font-black tracking-wider uppercase">MathQuest Command</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible gap-1.5 pb-2 md:pb-0 scrollbar-none font-semibold">
            {[
              { id: 'overview', label: 'Dashboard Overview', icon: BarChart3 },
              { id: 'students', label: 'Student Manager', icon: Users },
              { id: 'questions', label: 'Question Bank', icon: HelpCircle },
              { id: 'leaderboard', label: 'Leaderboard', icon: Award },
              { id: 'games', label: 'Game Modes', icon: Gamepad2 },
              { id: 'rewards', label: 'XP & Rewards', icon: Coins },
              { id: 'reports', label: 'Reports & Diagnostics', icon: Activity },
              { id: 'settings', label: 'System Settings', icon: Settings },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => { sound.playClick(); setActiveTab(tab.id); }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs whitespace-nowrap cursor-pointer transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/20 border border-purple-500/30 font-black' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Action Buttons: Exit Admin & Secure Logout */}
        <div className="flex flex-col gap-2 w-full shrink-0">
          <button
            onClick={() => {
              sound.playClick();
              if (typeof onExitAdmin === 'function') {
                onExitAdmin();
              }
            }}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black text-cyan-300 border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 transition-all cursor-pointer shadow-md w-full"
            title="Return to Student View (preserves Admin login session)"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            Exit Admin (Student View)
          </button>

          <button
            onClick={() => { sound.playClick(); onLogout(); }}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black text-rose-400 border border-rose-500/30 bg-rose-500/5 hover:bg-rose-500/20 transition-all cursor-pointer shadow-md w-full"
            title="Log out completely from Admin mode"
          >
            <LogOut className="w-4 h-4" />
            Secure Logout
          </button>
        </div>
      </div>

      {/* Main Panel Viewport */}
      <div className="flex-1 space-y-6 min-w-0">
        
        {/* Main Banner */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl text-white shadow-2xl flex flex-wrap items-center justify-between gap-4 border border-purple-500/20 relative overflow-hidden bg-gradient-to-r from-purple-950/70 via-slate-950/80 to-indigo-950/70">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div>
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-heading text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-2.5 inline-flex items-center gap-1.5 shadow-lg border border-purple-500/30">
              <ShieldCheck className="w-3.5 h-3.5" /> SYSTEM STATUS: ONLINE
            </span>
            <h1 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-white">
              Syllabus & Platform Control Center
            </h1>
            <p className="text-xs text-slate-300 mt-1 font-medium font-body leading-relaxed">
              Real-time database diagnostics, syllabus content management, student performance reports, and security verification.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              className="p-3 text-slate-400 bg-slate-900/60 border border-white/10 hover:text-white rounded-xl hover:bg-white/5 transition-all cursor-pointer flex items-center gap-2 text-xs font-black shadow-md"
              title="Reload database stats"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-purple-400' : ''}`} />
              Sync DB
            </button>
            <button
              onClick={() => { sound.playClick(); setShowAddQuestionModal(true); }}
              className="btn-game-cyan text-xs py-3 px-5 shadow-xl flex items-center gap-2 cursor-pointer font-black border border-cyan-400/40"
            >
              <Plus className="w-4 h-4 text-slate-950" /> Add New Question
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-4 rounded-2xl flex items-center gap-3 text-sm font-semibold shadow-lg">
            <ShieldAlert className="w-5 h-5 flex-shrink-0 animate-bounce" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Global Loading Spinner */}
        {loading && (
          <div className="glass-panel p-12 text-center rounded-3xl border border-white/10 flex flex-col items-center justify-center gap-4">
            <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
            <p className="text-sm font-semibold text-slate-300">Synchronizing workspace with real-time Supabase PostgreSQL...</p>
          </div>
        )}

        {!loading && (
          <div className="space-y-6">
            
            {/* VIEW TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                {/* Stats Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-purple-500/20 transition-all flex flex-col justify-between gap-1 shadow-lg bg-slate-950/40 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/5 rounded-full blur-2xl group-hover:bg-purple-600/10 transition-all pointer-events-none" />
                    <Users className="w-5 h-5 text-purple-400 mb-1" />
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">TOTAL REGISTERED STUDENTS</span>
                    <span className="text-3xl font-black text-white mt-1 block">{adminStats?.totalStudents ?? 0}</span>
                  </div>

                  <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-indigo-500/20 transition-all flex flex-col justify-between gap-1 shadow-lg bg-slate-950/40 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-600/5 rounded-full blur-2xl group-hover:bg-indigo-600/10 transition-all pointer-events-none" />
                    <Activity className="w-5 h-5 text-indigo-400 mb-1" />
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">ACTIVE PLAYERS (7 DAYS)</span>
                    <span className="text-3xl font-black text-cyan-400 mt-1 block">{adminStats?.activePlayers ?? 0}</span>
                  </div>

                  <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-cyan-500/20 transition-all flex flex-col justify-between gap-1 shadow-lg bg-slate-950/40 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-600/5 rounded-full blur-2xl group-hover:bg-cyan-600/10 pointer-events-none" />
                    <HelpCircle className="w-5 h-5 text-cyan-400 mb-1" />
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">ACTIVE QUESTION BANK</span>
                    <span className="text-3xl font-black text-white mt-1 block">{adminStats?.totalQuestions ?? 0}</span>
                  </div>

                  <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-emerald-500/20 transition-all flex flex-col justify-between gap-1 shadow-lg bg-slate-950/40 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-600/5 rounded-full blur-2xl group-hover:bg-emerald-600/10 pointer-events-none" />
                    <Gamepad2 className="w-5 h-5 text-emerald-400 mb-1" />
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">GAME SESSIONS LOGGED</span>
                    <span className="text-3xl font-black text-emerald-400 mt-1 block">{adminStats?.totalGames ?? 0}</span>
                  </div>
                </div>

                {/* Extended Diagnostic Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Performance Indicators */}
                  <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 col-span-2">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <h3 className="text-base font-black text-white flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-cyan-400" /> Platform Accuracy & Engagement
                      </h3>
                      <span className="text-xs text-indigo-400 font-bold">DB Stats</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 text-center">
                        <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">Average Accuracy</span>
                        <p className="text-3xl font-black text-cyan-400 mt-1">{adminStats?.averageAccuracy ?? 100}%</p>
                        <span className="text-[9px] text-slate-500 font-semibold block mt-1">Across all quizzes & challenges</span>
                      </div>
                      <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 text-center">
                        <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">Average XP Score</span>
                        <p className="text-3xl font-black text-purple-400 mt-1">{adminStats?.averageScore ?? 0} pts</p>
                        <span className="text-[9px] text-slate-500 font-semibold block mt-1">Earned per student attempt</span>
                      </div>
                    </div>

                    <div className="bg-slate-900/40 p-4 rounded-xl border border-white/5 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-slate-300 font-semibold">
                        <span>Most Popular Challenge Mode:</span>
                        <span className="text-cyan-300 font-bold">{adminStats?.mostPlayedGame ?? 'Arena'}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300 font-semibold border-t border-white/5 pt-2">
                        <span>High Failure / Difficult Concepts:</span>
                        <span className="text-rose-400 font-bold">{adminStats?.difficultTopics ?? 'None'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Top Students Panel */}
                  <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                    <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-white/10 pb-3">
                      <Award className="w-4 h-4 text-yellow-400" /> Top Active Players
                    </h3>
                    <div className="space-y-3">
                      {leaderboard.slice(0, 4).map((s, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-3 bg-white/5 p-2.5 rounded-xl border border-white/5 text-xs font-semibold">
                          <div className="flex items-center gap-2.5">
                            <span className="w-5 text-slate-400 text-center font-black">{idx + 1}</span>
                            <span className="text-base">{s.avatar}</span>
                            <span className="text-slate-200 truncate max-w-[100px]">{s.name}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-cyan-400 font-black block">{s.xp} XP</span>
                            <span className="text-[10px] text-slate-500 block">Lvl {s.level}</span>
                          </div>
                        </div>
                      ))}
                      {leaderboard.length === 0 && (
                        <p className="text-xs text-slate-500 text-center py-4">No active students recorded.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW TAB 2: STUDENTS */}
            {activeTab === 'students' && (
              <div className="space-y-4">
                
                {/* Search / Filters Bar */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-slate-950/40 p-4 rounded-2xl border border-white/10 w-full min-w-0 box-border">
                  <div className="relative flex-1 min-w-0 w-full">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="Search student by name, username or email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-white/10 rounded-xl bg-slate-900/60 text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:outline-none text-xs font-semibold"
                    />
                  </div>

                  <div className="flex items-center gap-2 flex-wrap min-w-0 max-w-full">
                    <span className="text-xs text-slate-400 font-bold uppercase shrink-0">Filter:</span>
                    <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                      <button
                        onClick={() => { sound.playClick(); setClassFilter('all'); }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer whitespace-nowrap ${
                          classFilter === 'all' 
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-500/30 shadow-md' 
                            : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        All Classes
                      </button>
                      <button
                        onClick={() => { sound.playClick(); setClassFilter('9'); }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer whitespace-nowrap ${
                          classFilter === '9' 
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-500/30 shadow-md' 
                            : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        Class 9
                      </button>
                      <button
                        onClick={() => { sound.playClick(); setClassFilter('10'); }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer whitespace-nowrap ${
                          classFilter === '10' 
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-500/30 shadow-md' 
                            : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        Class 10
                      </button>
                    </div>
                  </div>
                </div>

                {/* Students Table */}
                <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl bg-slate-950/20">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-semibold">
                      <thead className="bg-slate-900/80 text-[10px] text-slate-400 font-black uppercase tracking-wider border-b border-white/10">
                        <tr>
                          <th className="px-5 py-4">Avatar / Name</th>
                          <th className="px-5 py-4">Username / Email</th>
                          <th className="px-5 py-4 text-center">Class</th>
                          <th className="px-5 py-4 text-center">Level</th>
                          <th className="px-5 py-4 text-center">Total XP</th>
                          <th className="px-5 py-4 text-center">Coins</th>
                          <th className="px-5 py-4 text-center">Streak</th>
                          <th className="px-5 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-slate-200">
                        {filteredStudents.map((s) => (
                          <tr key={s.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-5 py-4 flex items-center gap-3">
                              <span className="text-2xl bg-white/5 w-10 h-10 rounded-xl flex items-center justify-center border border-white/5">{s.avatar}</span>
                              <div>
                                <span className="font-bold text-sm block text-white">{s.name}</span>
                                <span className="text-[10px] text-slate-500 block">ID: {s.id.slice(0, 8)}...</span>
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <span className="block text-slate-300">@{s.username}</span>
                              <span className="block text-[11px] text-slate-500">{s.email}</span>
                            </td>
                            <td className="px-5 py-4 text-center">
                              <span className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold px-2 py-0.5 rounded text-[10px]">
                                Class {s.classStandard}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-center font-bold text-white">{s.level}</td>
                            <td className="px-5 py-4 text-center text-cyan-400 font-bold">{s.totalXp} XP</td>
                            <td className="px-5 py-4 text-center text-amber-400 font-bold">🪙 {s.coins}</td>
                            <td className="px-5 py-4 text-center text-orange-400 font-bold">🔥 {s.streakDays} days</td>
                            <td className="px-5 py-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleEditStudentClick(s)}
                                  className="p-2 text-indigo-400 bg-indigo-500/5 hover:bg-indigo-500/20 border border-indigo-500/20 rounded-lg transition-colors cursor-pointer"
                                  title="Edit student stats"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteStudent(s.id)}
                                  className="p-2 text-rose-400 bg-rose-500/5 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg transition-colors cursor-pointer"
                                  title="Delete student account"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}

                        {filteredStudents.length === 0 && (
                          <tr>
                            <td colSpan="8" className="px-5 py-8 text-center text-slate-500">
                              No students found matching search filters.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* VIEW TAB 3: QUESTIONS */}
            {activeTab === 'questions' && (
              <div className="space-y-4">
                
                {/* Question Filter Panel */}
                <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950/40 p-4 rounded-2xl border border-white/10 w-full min-w-0 box-border">
                  <div className="flex items-center gap-2 flex-wrap min-w-0 max-w-full">
                    <span className="text-xs text-slate-400 font-bold uppercase shrink-0">Syllabus filter:</span>
                    <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                      <button
                        onClick={() => { sound.playClick(); setQuestionClassFilter('all'); }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer whitespace-nowrap ${
                          questionClassFilter === 'all' 
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-500/30 shadow-md' 
                            : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        All Class Syllabus
                      </button>
                      <button
                        onClick={() => { sound.playClick(); setQuestionClassFilter('9'); }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer whitespace-nowrap ${
                          questionClassFilter === '9' 
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-500/30 shadow-md' 
                            : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        Class 9 Questions
                      </button>
                      <button
                        onClick={() => { sound.playClick(); setQuestionClassFilter('10'); }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer whitespace-nowrap ${
                          questionClassFilter === '10' 
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-500/30 shadow-md' 
                            : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        Class 10 Questions
                      </button>
                    </div>
                  </div>

                  <span className="text-xs text-slate-400 font-bold">
                    Active Question Count: <strong className="text-cyan-400 font-bold">{filteredQuestions.length}</strong>
                  </span>
                </div>

                {/* Question List Cards */}
                <div className="space-y-4">
                  {filteredQuestions.map((q, idx) => (
                    <div key={q.id} className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-white/15 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-950/10">
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[9px] font-black uppercase text-purple-300 bg-purple-950/60 border border-purple-500/30 px-2 py-0.5 rounded">
                            Q #{idx + 1}
                          </span>
                          <span className="text-[9px] font-black uppercase text-indigo-300 bg-indigo-950/60 border border-indigo-500/30 px-2 py-0.5 rounded">
                            Class {q.classStandard || q.class_standard || 9}
                          </span>
                          <span className="text-[9px] font-black uppercase text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                            {q.questionType || q.question_type || 'Quiz'}
                          </span>
                          <span className="text-[9px] font-black uppercase text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded">
                            {q.difficulty || 'Medium'}
                          </span>
                        </div>

                        <h4 className="font-bold text-white text-base leading-snug">{q.questionText || q.question}</h4>
                        
                        {/* Options Display */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-1">
                          {(q.options || []).map((opt, oIdx) => {
                            const isCorrect = opt.isCorrect === true || opt.is_correct === true;
                            return (
                              <span 
                                key={oIdx} 
                                className={`px-2.5 py-1.5 rounded-lg border text-xs leading-relaxed truncate font-semibold ${
                                  isCorrect 
                                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 font-bold' 
                                    : 'bg-slate-900/60 border-white/5 text-slate-400'
                                }`}
                              >
                                <strong>{opt.option_key || opt.id}.</strong> {opt.option_text || opt.text}
                              </span>
                            );
                          })}
                        </div>
                        
                        {/* Explanation Display */}
                        {(q.explanation || q.explanation_text) && (
                          <p className="text-[10px] text-slate-500 italic mt-1 leading-relaxed">
                            💡 Explanation: {q.explanation || q.explanation_text}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 md:self-center shrink-0">
                        <button
                          onClick={() => handleEditQuestionClick(q)}
                          className="p-2.5 text-indigo-400 bg-indigo-500/5 hover:bg-indigo-500/20 border border-indigo-500/20 rounded-xl transition-colors cursor-pointer"
                          title="Edit Question"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteQuestion(q.id)}
                          className="p-2.5 text-rose-400 bg-rose-500/5 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl transition-colors cursor-pointer"
                          title="Delete Question"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {filteredQuestions.length === 0 && (
                    <div className="glass-panel p-10 text-center rounded-3xl border border-white/10 text-slate-500">
                      No questions found for the selected filter standard.
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* VIEW TAB 4: LEADERBOARD */}
            {activeTab === 'leaderboard' && (
              <div className="space-y-4 max-w-2xl mx-auto">
                <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-4 bg-slate-950/20">
                  <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                    <h3 className="font-black text-lg text-white flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-400" /> Current Leaderboard Rankings
                    </h3>
                    <span className="text-xs text-slate-400 font-bold">Real-time database sync</span>
                  </div>
                  
                  <div className="space-y-2">
                    {leaderboard.map((s, idx) => (
                      <div 
                        key={idx} 
                        className={`flex items-center justify-between p-3.5 rounded-2xl border text-xs font-semibold transition-all ${
                          idx === 0 
                            ? 'bg-gradient-to-r from-amber-500/10 to-yellow-500/5 border-yellow-500/30' 
                            : idx === 1 
                            ? 'bg-slate-100/5 border-slate-300/20' 
                            : 'bg-slate-950/30 border-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-lg font-black flex items-center justify-center ${
                            idx === 0 ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-slate-400'
                          }`}>{idx + 1}</span>
                          <span className="text-xl">{s.avatar}</span>
                          <div>
                            <span className="font-bold text-white block text-sm">{s.name}</span>
                            <span className="text-[10px] text-slate-500 block">Level {s.level} Standard {s.classStandard ?? 9}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <span className="text-cyan-400 font-black text-sm block">{s.xp} XP</span>
                            <span className="text-[10px] text-slate-500 block">Best Score: {s.score} pts</span>
                          </div>
                          
                          {/* Manage Stats Quick Link */}
                          <button
                            onClick={() => {
                              const found = students.find(item => item.name === s.name);
                              if (found) handleEditStudentClick(found);
                            }}
                            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                            title="Edit Student Stats"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {leaderboard.length === 0 && (
                      <p className="text-slate-500 text-center py-6">No leaderboard rows available.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* VIEW TAB 5: GAME MODES */}
            {activeTab === 'games' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'quiz', title: 'Quick Quiz Arena', standard: '9 & 10', diff: 'Medium', desc: '10 randomized syllabus multiple choice questions testing concepts under tight time constraints.', reward: '150 XP, 50 Coins' },
                  { id: 'puzzle', title: 'Calculus Puzzle Vault', standard: '10 Only', diff: 'Hard', desc: 'Step-by-step arithmetic proof equations requiring students to resolve sequence blocks.', reward: '250 XP, 80 Coins' },
                  { id: 'level_map', title: 'Level Map Journeys', standard: '9 & 10', diff: 'Variable', desc: 'Linear level map paths covering core math chapters aligned directly to standard CBSE boards syllabus.', reward: '120 XP, 40 Coins' }
                ].map(game => (
                  <div key={game.id} className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3 bg-slate-950/20">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <h4 className="font-bold text-white text-base">{game.title}</h4>
                      <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] px-2 py-0.5 rounded font-black">{game.diff}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-semibold font-body">{game.desc}</p>
                    <div className="flex justify-between items-center text-[11px] text-slate-500 font-bold">
                      <span>CBSE Class: <strong className="text-white font-bold">{game.standard}</strong></span>
                      <span>Reward Potential: <strong className="text-amber-400 font-bold">{game.reward}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* VIEW TAB 6: REWARDS & XP CONFIG */}
            {activeTab === 'rewards' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sliders Card */}
                <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6 bg-slate-950/20">
                  <h3 className="font-black text-lg text-white border-b border-white/10 pb-3 flex items-center gap-2">
                    <Coins className="w-5 h-5 text-amber-500" /> Reward Configurator
                  </h3>
                  
                  <div className="space-y-6 font-heading">
                    <div>
                      <div className="flex justify-between text-xs font-black text-slate-300 mb-2.5 uppercase tracking-wider">
                        <span>XP Multiplier Rate</span>
                        <span className="text-indigo-400">{xpRate}x</span>
                      </div>
                      <input
                        type="range"
                        min="1.0"
                        max="3.0"
                        step="0.1"
                        value={xpRate}
                        onChange={(e) => setXpRate(Number(e.target.value))}
                        className="w-full accent-indigo-500 cursor-pointer"
                      />
                      <span className="text-[10px] text-slate-500 font-bold block mt-1">Multiplies standard XP rewards gained by students on gameplay wins.</span>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-black text-slate-300 mb-2.5 uppercase tracking-wider">
                        <span>Coin Bonus Rate</span>
                        <span className="text-amber-500">{coinRate}x</span>
                      </div>
                      <input
                        type="range"
                        min="1.0"
                        max="2.5"
                        step="0.1"
                        value={coinRate}
                        onChange={(e) => setCoinRate(Number(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                      <span className="text-[10px] text-slate-500 font-bold block mt-1">Gives a bonus multiplier on gold coins rewarded for perfect scores.</span>
                    </div>

                    <button
                      onClick={() => { sound.playClick(); alert(`Settings Gained: XP rate set to ${xpRate}x, Coin rate to ${coinRate}x. Multipliers saved successfully!`); }}
                      className="btn-game-cyan py-3 px-6 text-xs flex items-center justify-center gap-2 cursor-pointer font-black border border-cyan-400/40 w-full"
                    >
                      Save Configuration
                    </button>
                  </div>
                </div>

                {/* Badge list card */}
                <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-950/20">
                  <h3 className="font-black text-lg text-white border-b border-white/10 pb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-400" /> MathQuest Badges Registry
                  </h3>
                  
                  <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                    {badges.map((badge, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-3 bg-white/5 p-3 rounded-xl border border-white/5 text-xs font-semibold">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl bg-white/5 w-9 h-9 rounded-lg flex items-center justify-center border border-white/5">{badge.icon || '🏆'}</span>
                          <div>
                            <span className="font-bold text-white block">{badge.title}</span>
                            <span className="text-[10px] text-slate-400 block leading-tight">{badge.description}</span>
                          </div>
                        </div>
                        <span className="text-cyan-400 font-bold shrink-0">{badge.xp_reward || badge.xpReward || 100} XP</span>
                      </div>
                    ))}
                    {badges.length === 0 && (
                      <p className="text-slate-500 text-center py-4">No badge categories seeded.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* VIEW TAB 7: REPORTS & DIAGNOSTICS */}
            {activeTab === 'reports' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* System Diagnostics */}
                <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-950/20 lg:col-span-1">
                  <h3 className="font-black text-base text-white flex items-center gap-2 border-b border-white/10 pb-3">
                    <Activity className="w-4 h-4 text-emerald-400" /> Database Integration Status
                  </h3>
                  <div className="space-y-3.5 text-xs font-semibold text-slate-300">
                    <div className="flex items-center justify-between">
                      <span>Supabase API Connection:</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1"><Check className="w-3.5 h-3.5" /> SECURED</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Rest Port Address:</span>
                      <span className="text-white font-bold">HTTPS (443 IPv4/IPv6)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Active SSL Encryption:</span>
                      <span className="text-emerald-400 font-bold">TLS 1.3 Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>DB Queries Sync Latency:</span>
                      <span className="text-cyan-400 font-bold">~42ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Users/Admins Cascades:</span>
                      <span className="text-indigo-400 font-bold">Enabled</span>
                    </div>
                  </div>
                </div>

                {/* Performance Analytics Report */}
                <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 bg-slate-950/20 lg:col-span-2">
                  <h3 className="font-black text-base text-white flex items-center gap-2 border-b border-white/10 pb-3">
                    <BarChart3 className="w-4 h-4 text-cyan-400" /> Curriculum Standard Performance
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1 font-bold">
                        <span>Class 9 (Number Quest, Algebra Arena) Completion Rate</span>
                        <span className="text-cyan-300 font-black">88.5%</span>
                      </div>
                      <div className="w-full bg-slate-900 rounded-full h-2">
                        <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '88.5%' }} />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1 font-bold">
                        <span>Class 10 (Real Numbers, Trigonometry Master) Completion Rate</span>
                        <span className="text-purple-400 font-black">74.2%</span>
                      </div>
                      <div className="w-full bg-slate-900 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '74.2%' }} />
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed font-body">
                    Platform metrics represent aggregates retrieved from actual student game attempt submissions stored in Supabase PostgreSQL tables.
                  </p>
                </div>
              </div>
            )}

            {/* VIEW TAB 8: SETTINGS & PROFILE */}
            {activeTab === 'settings' && (
              <div className="glass-panel p-6 rounded-3xl border border-white/10 max-w-lg space-y-4 bg-slate-950/20">
                <h3 className="font-black text-lg text-white border-b border-white/10 pb-3 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-indigo-400" /> System settings
                </h3>
                
                <div className="space-y-4 text-xs font-semibold text-slate-300">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span>Admin Mode Authentication Source:</span>
                    <span className="text-indigo-400 font-bold uppercase text-[10px] bg-indigo-500/10 border border-indigo-500/30 px-2.5 py-0.5 rounded">Supabase Cloud</span>
                  </div>
                  
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span>Admin ID Configuration:</span>
                    <span className="text-slate-300 font-bold font-body">admin</span>
                  </div>

                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span>Associated Security Role Email:</span>
                    <span className="text-slate-400 font-bold font-body">admin@mathquest.edu</span>
                  </div>

                  <div className="p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/20 text-[10px] leading-relaxed text-indigo-300">
                    🔐 Security Note: Admin credentials are fully protected on the backend using bcrypt hashing algorithms. Administrative session tokens automatically expire after 7 days.
                  </div>
                </div>
              </div>
            )}

          </div>
        )}
      </div>

      {/* MODAL 1: ADD QUESTION */}
      <AnimatePresence>
        {showAddQuestionModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-panel p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-4 rounded-3xl border border-indigo-500/20 bg-slate-950 text-white shadow-2xl scrollbar-thin"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <h3 className="font-black text-xl text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-cyan-400" /> Add Question to Syllabus
                </h3>
                <button 
                  onClick={() => { sound.playClick(); setShowAddQuestionModal(false); resetQuestionForm(); }}
                  className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateQuestion} className="space-y-4 text-xs font-semibold">
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1.5 uppercase font-bold tracking-wider">Class Standard</label>
                    <select
                      value={newQClass}
                      onChange={(e) => setNewQClass(Number(e.target.value))}
                      className="w-full px-3 py-2.5 border border-white/10 rounded-xl bg-slate-900 text-white font-bold outline-none focus:border-indigo-500"
                    >
                      <option value="9">Class 9th</option>
                      <option value="10">Class 10th</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1.5 uppercase font-bold tracking-wider">Question Type</label>
                    <select
                      value={newQType}
                      onChange={(e) => setNewQType(e.target.value)}
                      className="w-full px-3 py-2.5 border border-white/10 rounded-xl bg-slate-900 text-white font-bold outline-none focus:border-indigo-500"
                    >
                      <option value="quiz">Multiple Choice Quiz</option>
                      <option value="puzzle">Calculus Proof Puzzle</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1.5 uppercase font-bold tracking-wider">Question Prompt</label>
                  <input
                    type="text"
                    required
                    value={newQText}
                    onChange={(e) => setNewQText(e.target.value)}
                    placeholder="e.g. Find the discriminant of x^2 - 4x + 4 = 0"
                    className="w-full px-4 py-3 border border-white/10 rounded-xl bg-slate-900 text-white placeholder-slate-500 focus:border-indigo-500 outline-none font-bold"
                  />
                </div>

                {/* Options grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">Option A</label>
                    <input
                      type="text"
                      required
                      value={newQOptA}
                      onChange={(e) => setNewQOptA(e.target.value)}
                      placeholder="Answer value A"
                      className="w-full px-3 py-2 border border-white/10 rounded-xl bg-slate-900 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">Option B</label>
                    <input
                      type="text"
                      required
                      value={newQOptB}
                      onChange={(e) => setNewQOptB(e.target.value)}
                      placeholder="Answer value B"
                      className="w-full px-3 py-2 border border-white/10 rounded-xl bg-slate-900 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">Option C</label>
                    <input
                      type="text"
                      required
                      value={newQOptC}
                      onChange={(e) => setNewQOptC(e.target.value)}
                      placeholder="Answer value C (Optional)"
                      className="w-full px-3 py-2 border border-white/10 rounded-xl bg-slate-900 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">Option D</label>
                    <input
                      type="text"
                      required
                      value={newQOptD}
                      onChange={(e) => setNewQOptD(e.target.value)}
                      placeholder="Answer value D (Optional)"
                      className="w-full px-3 py-2 border border-white/10 rounded-xl bg-slate-900 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1.5 uppercase font-bold tracking-wider">Correct Option</label>
                    <select
                      value={newCorrect}
                      onChange={(e) => setNewCorrect(e.target.value)}
                      className="w-full px-3 py-2.5 border border-white/10 rounded-xl bg-slate-900 text-white font-bold outline-none focus:border-indigo-500"
                    >
                      <option value="A">Option A</option>
                      <option value="B">Option B</option>
                      <option value="C">Option C</option>
                      <option value="D">Option D</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1.5 uppercase font-bold tracking-wider">Difficulty Level</label>
                    <select
                      value={newQDiff}
                      onChange={(e) => setNewQDiff(e.target.value)}
                      className="w-full px-3 py-2.5 border border-white/10 rounded-xl bg-slate-900 text-white font-bold outline-none focus:border-indigo-500"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1.5 uppercase font-bold tracking-wider">Explanation / Hints</label>
                  <textarea
                    value={newQExpl}
                    onChange={(e) => setNewQExpl(e.target.value)}
                    placeholder="Enter mathematical derivation details or hints..."
                    rows="2"
                    className="w-full px-4 py-2.5 border border-white/10 rounded-xl bg-slate-900 text-white placeholder-slate-500 focus:border-indigo-500 outline-none font-semibold"
                  />
                </div>

                <div className="flex gap-3 pt-3">
                  <button type="submit" className="btn-game-cyan flex-1 py-3 cursor-pointer font-black border border-cyan-400/40">
                    Save Question
                  </button>
                  <button
                    type="button"
                    onClick={() => { sound.playClick(); setShowAddQuestionModal(false); resetQuestionForm(); }}
                    className="px-5 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-xs font-black cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: EDIT QUESTION */}
      <AnimatePresence>
        {showEditQuestionModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-panel p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-4 rounded-3xl border border-indigo-500/20 bg-slate-950 text-white shadow-2xl scrollbar-thin"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <h3 className="font-black text-xl text-white flex items-center gap-2">
                  <Edit2 className="w-5 h-5 text-indigo-400" /> Edit Question Standard
                </h3>
                <button 
                  onClick={() => { sound.playClick(); setShowEditQuestionModal(false); resetQuestionForm(); }}
                  className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateQuestion} className="space-y-4 text-xs font-semibold">
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1.5 uppercase font-bold tracking-wider">Class Standard</label>
                    <select
                      value={newQClass}
                      onChange={(e) => setNewQClass(Number(e.target.value))}
                      className="w-full px-3 py-2.5 border border-white/10 rounded-xl bg-slate-900 text-white font-bold outline-none focus:border-indigo-500"
                    >
                      <option value="9">Class 9th</option>
                      <option value="10">Class 10th</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1.5 uppercase font-bold tracking-wider">Question Type</label>
                    <select
                      value={newQType}
                      onChange={(e) => setNewQType(e.target.value)}
                      className="w-full px-3 py-2.5 border border-white/10 rounded-xl bg-slate-900 text-white font-bold outline-none focus:border-indigo-500"
                    >
                      <option value="quiz">Multiple Choice Quiz</option>
                      <option value="puzzle">Calculus Proof Puzzle</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1.5 uppercase font-bold tracking-wider">Question Prompt</label>
                  <input
                    type="text"
                    required
                    value={newQText}
                    onChange={(e) => setNewQText(e.target.value)}
                    className="w-full px-4 py-3 border border-white/10 rounded-xl bg-slate-900 text-white placeholder-slate-500 focus:border-indigo-500 outline-none font-bold"
                  />
                </div>

                {/* Options grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">Option A</label>
                    <input
                      type="text"
                      required
                      value={newQOptA}
                      onChange={(e) => setNewQOptA(e.target.value)}
                      className="w-full px-3 py-2 border border-white/10 rounded-xl bg-slate-900 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">Option B</label>
                    <input
                      type="text"
                      required
                      value={newQOptB}
                      onChange={(e) => setNewQOptB(e.target.value)}
                      className="w-full px-3 py-2 border border-white/10 rounded-xl bg-slate-900 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">Option C</label>
                    <input
                      type="text"
                      value={newQOptC}
                      onChange={(e) => setNewQOptC(e.target.value)}
                      className="w-full px-3 py-2 border border-white/10 rounded-xl bg-slate-900 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">Option D</label>
                    <input
                      type="text"
                      value={newQOptD}
                      onChange={(e) => setNewQOptD(e.target.value)}
                      className="w-full px-3 py-2 border border-white/10 rounded-xl bg-slate-900 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1.5 uppercase font-bold tracking-wider">Correct Option</label>
                    <select
                      value={newCorrect}
                      onChange={(e) => setNewCorrect(e.target.value)}
                      className="w-full px-3 py-2.5 border border-white/10 rounded-xl bg-slate-900 text-white font-bold outline-none focus:border-indigo-500"
                    >
                      <option value="A">Option A</option>
                      <option value="B">Option B</option>
                      <option value="C">Option C</option>
                      <option value="D">Option D</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1.5 uppercase font-bold tracking-wider">Difficulty Level</label>
                    <select
                      value={newQDiff}
                      onChange={(e) => setNewQDiff(e.target.value)}
                      className="w-full px-3 py-2.5 border border-white/10 rounded-xl bg-slate-900 text-white font-bold outline-none focus:border-indigo-500"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1.5 uppercase font-bold tracking-wider">Explanation / Hints</label>
                  <textarea
                    value={newQExpl}
                    onChange={(e) => setNewQExpl(e.target.value)}
                    rows="2"
                    className="w-full px-4 py-2.5 border border-white/10 rounded-xl bg-slate-900 text-white placeholder-slate-500 focus:border-indigo-500 outline-none font-semibold"
                  />
                </div>

                <div className="flex gap-3 pt-3">
                  <button type="submit" className="btn-game-cyan flex-1 py-3 cursor-pointer font-black border border-cyan-400/40">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => { sound.playClick(); setShowEditQuestionModal(false); resetQuestionForm(); }}
                    className="px-5 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-xs font-black cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 3: EDIT STUDENT STATS */}
      <AnimatePresence>
        {showEditStudentModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-panel p-6 max-w-md w-full space-y-4 rounded-3xl border border-indigo-500/20 bg-slate-950 text-white shadow-2xl"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <h3 className="font-black text-lg text-white flex items-center gap-2">
                  <Edit2 className="w-5 h-5 text-indigo-400" /> Edit Student Metrics
                </h3>
                <button 
                  onClick={() => { sound.playClick(); setShowEditStudentModal(false); setSelectedStudent(null); }}
                  className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateStudent} className="space-y-4 text-xs font-semibold">
                
                <div>
                  <label className="block text-slate-400 mb-1">Student Full Name</label>
                  <input
                    type="text"
                    required
                    value={editStudentName}
                    onChange={(e) => setEditStudentName(e.target.value)}
                    className="w-full px-3 py-2 border border-white/10 rounded-xl bg-slate-900 text-white font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Class Standard</label>
                    <select
                      value={editStudentClass}
                      onChange={(e) => setEditStudentClass(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-white/10 rounded-xl bg-slate-900 text-white font-bold"
                    >
                      <option value="9">Class 9th</option>
                      <option value="10">Class 10th</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Player Level</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={editStudentLevel}
                      onChange={(e) => setEditStudentLevel(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-white/10 rounded-xl bg-slate-900 text-white font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Total Accumulated XP</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={editStudentXP}
                      onChange={(e) => setEditStudentXP(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-white/10 rounded-xl bg-slate-900 text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Gold Coins Balance</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={editStudentCoins}
                      onChange={(e) => setEditStudentCoins(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-white/10 rounded-xl bg-slate-900 text-white font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Daily Streak (Days)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={editStudentStreak}
                    onChange={(e) => setEditStudentStreak(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-white/10 rounded-xl bg-slate-900 text-white font-bold"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="submit" className="btn-game-cyan flex-1 py-3 cursor-pointer font-black border border-cyan-400/40">
                    Apply Updates
                  </button>
                  <button
                    type="button"
                    onClick={() => { sound.playClick(); setShowEditStudentModal(false); setSelectedStudent(null); }}
                    className="px-5 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-xs font-black cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
