import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, User, GraduationCap } from 'lucide-react';
import { sound } from '../../utils/sound';

export default function EditProfileModal({ user, onSave, onClose }) {
  const [name, setName] = useState(user.name);
  const [activeClass, setActiveClass] = useState(user.activeClass);
  const [avatar, setAvatar] = useState(user.avatar || '⚡');

  const avatarOptions = ['⚡', '👑', '🌟', '💎', '🚀', '🔥', '🎯', '🧠', '🏆'];

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playClick();
    onSave({ name, activeClass: Number(activeClass), avatar });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass-panel rounded-3xl border border-indigo-200 dark:border-white/15 shadow-2xl max-w-md w-full p-6 relative bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
      >
        
        <button
          onClick={() => { sound.playClick(); onClose(); }}
          className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-heading font-black text-slate-900 dark:text-white flex items-center gap-2 mb-4">
          <User className="w-6 h-6 text-indigo-600 dark:text-cyan-400" /> Edit Player Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 font-heading">
          
          {/* Avatar Selection */}
          <div>
            <label className="block text-xs font-heading font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Select Gaming Avatar
            </label>
            <div className="flex flex-wrap gap-2.5 justify-center bg-slate-100 dark:bg-slate-900/90 p-3.5 rounded-2xl border border-slate-200 dark:border-white/10">
              {avatarOptions.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setAvatar(emoji)}
                  className={`w-11 h-11 rounded-xl text-2xl flex items-center justify-center transition-all cursor-pointer ${
                    avatar === emoji
                      ? 'bg-gradient-to-tr from-amber-400 to-yellow-500 border-2 border-white scale-110 shadow-lg shadow-amber-400/40 text-slate-950'
                      : 'bg-white dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Student Name Input */}
          <div>
            <label className="block text-xs font-heading font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Student Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:border-indigo-600 dark:focus:border-cyan-400 font-extrabold outline-none text-sm transition-all"
              required
            />
          </div>

          {/* Class Standard Selection */}
          <div>
            <label className="block text-xs font-heading font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Active Class Standard
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setActiveClass(9)}
                className={`py-3 rounded-xl font-heading font-black text-xs border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeClass === 9
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white border-cyan-400 shadow-lg shadow-cyan-500/30'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10'
                }`}
              >
                <GraduationCap className="w-4 h-4" /> Class 9th
              </button>

              <button
                type="button"
                onClick={() => setActiveClass(10)}
                className={`py-3 rounded-xl font-heading font-black text-xs border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeClass === 10
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white border-cyan-400 shadow-lg shadow-cyan-500/30'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10'
                }`}
              >
                <GraduationCap className="w-4 h-4" /> Class 10th
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button type="submit" className="btn-game-cyan w-full py-3.5 text-xs font-black cursor-pointer">
              Save Profile Changes
            </button>
          </div>

        </form>

      </motion.div>
    </div>
  );
}
