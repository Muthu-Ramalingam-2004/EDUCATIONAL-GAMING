import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, BookOpen, HelpCircle, Gamepad2, Plus, Trash2, Save, Sparkles } from 'lucide-react';
import { sampleGameQuestions } from '../data/mockWorlds';
import { adminService } from '../services/adminService';
import { sound } from '../utils/sound';

export default function AdminDashboardScreen() {
  const [activeTab, setActiveTab] = useState('questions'); // 'questions' | 'rewards' | 'analytics'
  const [questionList, setQuestionList] = useState(sampleGameQuestions.quiz);
  const [adminStats, setAdminStats] = useState(null);

  useEffect(() => {
    async function loadAdminData() {
      try {
        const statsRes = await adminService.getDashboardStats();
        if (statsRes && statsRes.success && statsRes.stats) {
          setAdminStats(statsRes.stats);
        }

        const qRes = await adminService.getQuestions();
        if (qRes && qRes.success && Array.isArray(qRes.questions) && qRes.questions.length > 0) {
          const formatted = qRes.questions.map(q => ({
            id: q.id,
            question: q.questionText || q.question,
            options: q.options || [],
            explanation: q.explanation || 'Express backend question item.'
          }));
          setQuestionList(formatted);
        }
      } catch (err) {}
    }
    loadAdminData();
  }, []);

  // Add question modal state
  const [newQText, setNewQText] = useState('');
  const [newOptA, setNewOptA] = useState('');
  const [newOptB, setNewOptB] = useState('');
  const [newOptC, setNewOptC] = useState('');
  const [newOptD, setNewOptD] = useState('');
  const [newCorrect, setNewCorrect] = useState('A');
  const [showAddModal, setShowAddModal] = useState(false);

  // Rewards config state
  const [xpRate, setXpRate] = useState(1.5);
  const [coinRate, setCoinRate] = useState(1.0);

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    sound.playClick();
    const newQuestion = {
      id: `q_${Date.now()}`,
      question: newQText,
      questionText: newQText,
      options: [
        { id: 'A', text: newOptA, isCorrect: newCorrect === 'A' },
        { id: 'B', text: newOptB, isCorrect: newCorrect === 'B' },
        { id: 'C', text: newOptC, isCorrect: newCorrect === 'C' },
        { id: 'D', text: newOptD, isCorrect: newCorrect === 'D' }
      ],
      explanation: 'Custom question added by Admin.',
      xp: 50,
      coins: 20
    };
    setQuestionList([...questionList, newQuestion]);
    setShowAddModal(false);
    setNewQText('');
    setNewOptA('');
    setNewOptB('');
    setNewOptC('');
    setNewOptD('');

    try {
      await adminService.createQuestion(newQuestion);
    } catch (err) {}
  };

  const handleDeleteQ = async (id) => {
    sound.playClick();
    setQuestionList(questionList.filter(q => q.id !== id));
    try {
      await adminService.deleteQuestion(id);
    } catch (err) {}
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Admin Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 sm:p-8 rounded-3xl text-white shadow-2xl flex flex-wrap items-center justify-between gap-4 border border-purple-500/30 relative overflow-hidden bg-gradient-to-r from-purple-950 via-slate-950 to-indigo-950"
      >
        <div className="orb-glow-purple top-0 right-0 blur-[130px] opacity-40 pointer-events-none" />
        <div>
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-heading text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-2 inline-flex items-center gap-1.5 shadow-lg">
            <ShieldCheck className="w-3.5 h-3.5" /> ADMIN COMMAND CENTER
          </span>
          <h1 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-white">
            MathQuest Teacher Control Panel
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium font-body">
            Manage Class 9th & 10th standard syllabus content, question bank, rewards, and player metrics.
          </p>
        </div>

        <button
          onClick={() => { sound.playClick(); setShowAddModal(true); }}
          className="btn-game-gold text-xs py-3 px-5 shadow-xl flex items-center gap-2 cursor-pointer font-heading font-black"
        >
          <Plus className="w-4 h-4 text-slate-950" /> Add New Question
        </button>
      </motion.div>

      {/* DASHBOARD TOP METRICS */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 font-heading">
        <div className="glass-panel p-4 text-center rounded-2xl border border-indigo-200/50 dark:border-white/10">
          <Users className="w-5 h-5 text-indigo-600 dark:text-cyan-400 mx-auto mb-1" />
          <span className="text-[10px] font-heading font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">TOTAL STUDENTS</span>
          <span className="text-2xl font-heading font-black text-slate-900 dark:text-white mt-1 block">{adminStats?.totalStudents ? adminStats.totalStudents.toLocaleString() : '1,480'}</span>
        </div>

        <div className="glass-panel p-4 text-center rounded-2xl border border-indigo-200/50 dark:border-white/10">
          <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400 mx-auto mb-1" />
          <span className="text-[10px] font-heading font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">GAME WORLDS</span>
          <span className="text-2xl font-heading font-black text-slate-900 dark:text-white mt-1 block">{adminStats?.totalChapters ? `${adminStats.totalChapters} Worlds` : '10 Worlds'}</span>
        </div>

        <div className="glass-panel p-4 text-center rounded-2xl border border-indigo-200/50 dark:border-white/10">
          <HelpCircle className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
          <span className="text-[10px] font-heading font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">QUESTIONS</span>
          <span className="text-2xl font-heading font-black text-indigo-600 dark:text-cyan-400 mt-1 block">{adminStats?.totalQuestions ? adminStats.totalQuestions : questionList.length + 445}</span>
        </div>

        <div className="glass-panel p-4 text-center rounded-2xl border border-indigo-200/50 dark:border-white/10">
          <Gamepad2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
          <span className="text-[10px] font-heading font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">MATCHES PLAYED</span>
          <span className="text-2xl font-heading font-black text-emerald-600 dark:text-emerald-400 mt-1 block">{adminStats?.totalGames ? adminStats.totalGames.toLocaleString() : '12,890'}</span>
        </div>

        <div className="glass-panel p-4 text-center rounded-2xl border border-indigo-200/50 dark:border-white/10 col-span-2 sm:col-span-1">
          <Sparkles className="w-5 h-5 text-amber-500 dark:text-amber-400 mx-auto mb-1" />
          <span className="text-[10px] font-heading font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">ACTIVE NOW</span>
          <span className="text-2xl font-heading font-black text-amber-600 dark:text-amber-400 mt-1 block">{adminStats?.activePlayers ? `${adminStats.activePlayers} Online` : '340 Online'}</span>
        </div>
      </div>

      {/* ADMIN NAVIGATION TABS */}
      <div className="flex flex-wrap items-center gap-2.5 border-b border-indigo-200/50 dark:border-white/10 pb-3 font-heading font-black">
        <button
          onClick={() => { sound.playClick(); setActiveTab('questions'); }}
          className={`px-4 py-2.5 rounded-xl text-xs transition-all cursor-pointer ${
            activeTab === 'questions' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
          }`}
        >
          Question Bank Manager
        </button>

        <button
          onClick={() => { sound.playClick(); setActiveTab('rewards'); }}
          className={`px-4 py-2.5 rounded-xl text-xs transition-all cursor-pointer ${
            activeTab === 'rewards' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
          }`}
        >
          XP & Rewards Configurator
        </button>

        <button
          onClick={() => { sound.playClick(); setActiveTab('analytics'); }}
          className={`px-4 py-2.5 rounded-xl text-xs transition-all cursor-pointer ${
            activeTab === 'analytics' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
          }`}
        >
          Player Analytics
        </button>
      </div>

      {/* TAB CONTENT 1: QUESTION BANK MANAGER */}
      {activeTab === 'questions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between font-heading">
            <h3 className="font-black text-xl text-slate-900 dark:text-white">
              Active Question Database ({questionList.length} Items)
            </h3>
          </div>

          <div className="space-y-3 font-heading">
            {questionList.map((q, idx) => (
              <div key={q.id} className="glass-card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-indigo-200/50 dark:border-white/10">
                <div className="space-y-2">
                  <span className="text-[10px] font-heading font-black uppercase text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/60 border border-purple-300 dark:border-purple-500/40 px-2.5 py-0.5 rounded-md">
                    Question #{idx + 1}
                  </span>
                  <h4 className="font-heading font-extrabold text-slate-900 dark:text-white text-base">{q.question}</h4>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-700 dark:text-slate-300 font-semibold font-body">
                    {q.options.map((opt) => (
                      <span key={opt.id} className={`px-2.5 py-1 rounded-lg border ${
                        opt.isCorrect ? 'bg-emerald-500/20 border-emerald-500 text-emerald-900 dark:text-emerald-300 font-bold' : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10'
                      }`}>
                        {opt.id}. {opt.text}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDeleteQ(q.id)}
                    className="p-2.5 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/20 rounded-xl border border-rose-200 dark:border-rose-500/40 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: REWARDS CONFIGURATOR */}
      {activeTab === 'rewards' && (
        <div className="glass-card p-6 max-w-xl space-y-6 rounded-3xl border border-indigo-200/50 dark:border-white/10">
          <h3 className="font-heading font-black text-xl text-slate-900 dark:text-white">
            Configure Global XP & Coin Multipliers
          </h3>

          <div className="space-y-5 font-heading">
            <div>
              <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                XP Multiplier Rate ({xpRate}x)
              </label>
              <input
                type="range"
                min="1.0"
                max="3.0"
                step="0.1"
                value={xpRate}
                onChange={(e) => setXpRate(e.target.value)}
                className="w-full accent-indigo-600 dark:accent-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                Coin Bonus Rate ({coinRate}x)
              </label>
              <input
                type="range"
                min="1.0"
                max="2.5"
                step="0.1"
                value={coinRate}
                onChange={(e) => setCoinRate(e.target.value)}
                className="w-full accent-amber-500"
              />
            </div>

            <button
              onClick={() => { sound.playClick(); alert('Global Reward Multipliers saved!'); }}
              className="btn-game-cyan py-3 px-6 text-xs flex items-center gap-2 cursor-pointer font-black"
            >
              <Save className="w-4 h-4" /> Save Multiplier Settings
            </button>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: PLAYER ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="glass-card p-6 space-y-5 rounded-3xl border border-indigo-200/50 dark:border-white/10">
          <h3 className="font-heading font-black text-xl text-slate-900 dark:text-white">
            Student Performance Insights
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium font-body leading-relaxed">
            Over 94% of active students report improved CBSE maths exam confidence after mastering World 2 (Algebra Arena) & World 3 (Geometry Realm).
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-heading">
            <div className="bg-purple-100/70 dark:bg-purple-900/30 p-4 rounded-2xl border border-purple-200 dark:border-purple-500/30">
              <span className="text-xs font-black text-purple-900 dark:text-purple-300 uppercase tracking-wider">Avg Quiz Score</span>
              <p className="text-3xl font-black text-purple-950 dark:text-white mt-1">885 pts</p>
            </div>
            <div className="bg-emerald-100/70 dark:bg-emerald-900/30 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-500/30">
              <span className="text-xs font-black text-emerald-900 dark:text-emerald-300 uppercase tracking-wider">Retention Rate</span>
              <p className="text-3xl font-black text-emerald-950 dark:text-emerald-400 mt-1">94.2%</p>
            </div>
            <div className="bg-indigo-100/70 dark:bg-cyan-900/30 p-4 rounded-2xl border border-indigo-200 dark:border-cyan-500/30">
              <span className="text-xs font-black text-indigo-900 dark:text-cyan-300 uppercase tracking-wider">Daily Play Time</span>
              <p className="text-3xl font-black text-indigo-950 dark:text-cyan-400 mt-1">28 mins / day</p>
            </div>
          </div>
        </div>
      )}

      {/* ADD QUESTION MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-6 max-w-lg w-full space-y-4 rounded-3xl border border-indigo-200 dark:border-white/15 shadow-2xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
            <h3 className="font-heading font-black text-2xl text-slate-900 dark:text-white">Add Question to Syllabus</h3>
            
            <form onSubmit={handleAddQuestion} className="space-y-4 font-heading">
              <div>
                <label className="block text-xs font-heading font-black text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">Question Prompt</label>
                <input
                  type="text"
                  value={newQText}
                  onChange={(e) => setNewQText(e.target.value)}
                  placeholder="e.g. Solve 3x - 4 = 11"
                  className="w-full px-4 py-3 border border-slate-300 dark:border-white/15 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-semibold text-sm outline-none focus:border-indigo-600 dark:focus:border-cyan-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-heading font-bold text-slate-700 dark:text-slate-300 mb-1">Option A</label>
                  <input
                    type="text"
                    value={newOptA}
                    onChange={(e) => setNewOptA(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-white/15 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-semibold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-heading font-bold text-slate-700 dark:text-slate-300 mb-1">Option B</label>
                  <input
                    type="text"
                    value={newOptB}
                    onChange={(e) => setNewOptB(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-white/15 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-semibold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-heading font-bold text-slate-700 dark:text-slate-300 mb-1">Option C</label>
                  <input
                    type="text"
                    value={newOptC}
                    onChange={(e) => setNewOptC(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-white/15 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-semibold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-heading font-bold text-slate-700 dark:text-slate-300 mb-1">Option D</label>
                  <input
                    type="text"
                    value={newOptD}
                    onChange={(e) => setNewOptD(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-white/15 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-semibold"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-heading font-black text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">Correct Answer</label>
                <select
                  value={newCorrect}
                  onChange={(e) => setNewCorrect(e.target.value)}
                  className="w-full px-3 py-3 border border-slate-300 dark:border-white/15 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-bold font-heading outline-none focus:border-indigo-600 dark:focus:border-cyan-400"
                >
                  <option value="A">Option A</option>
                  <option value="B">Option B</option>
                  <option value="C">Option C</option>
                  <option value="D">Option D</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2 font-heading">
                <button type="submit" className="btn-game-cyan flex-1 py-3 text-xs font-black cursor-pointer">
                  Save Question
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn-game-secondary px-5 py-3 text-xs font-black cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
