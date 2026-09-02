import React from 'react';
import { Home, Gamepad2, MapPin, BarChart3, Trophy, Medal, User, ShieldAlert, Sparkles, Compass } from 'lucide-react';
import { sound } from '../../utils/sound';

export default function NavigationBar({ currentScreen, onNavigate, isAdmin }) {
  const navItems = [
    { id: 'home', label: 'Home Dashboard', icon: Home },
    { id: 'worlds', label: 'Quiz Worlds', icon: Compass },
    { id: 'modes', label: 'Play Modes', icon: Gamepad2 },
    { id: 'map', label: 'Level Map', icon: MapPin },
    { id: 'progress', label: 'Analytics', icon: BarChart3 },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'achievements', label: 'Badges & Rewards', icon: Medal },
    { id: 'profile', label: 'Player Profile', icon: User },
  ];

  const hasAdminSession = (() => {
    if (isAdmin) return true;
    try {
      const raw = sessionStorage.getItem('mathquest_admin_session');
      if (raw) {
        const parsed = JSON.parse(raw);
        return Boolean(parsed?.token && parsed?.user?.role === 'admin');
      }
    } catch (_) {}
    return false;
  })();

  if (hasAdminSession) {
    navItems.push({ id: 'admin', label: 'Admin Command', icon: ShieldAlert });
  }

  const handleNav = (id) => {
    sound.playClick();
    onNavigate(id);
  };

  return (
    <>
      {/* DESKTOP SIDEBAR NAVIGATION */}
      <aside className="hidden md:flex flex-col w-64 glass-panel border-r border-indigo-200/40 dark:border-white/10 p-4 sticky top-20 h-[calc(100vh-5.5rem)] z-30 shadow-2xl my-4 ml-4">
        
        {/* Brand Logo Header */}
        <div 
          onClick={() => handleNav('home')}
          className="flex items-center gap-3.5 px-3 py-3 mb-4 cursor-pointer group rounded-2xl bg-white/60 dark:bg-white/5 hover:bg-white/90 dark:hover:bg-white/10 border border-indigo-200/50 dark:border-white/10 transition-all shadow-sm"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-400 via-cyan-400 to-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-lg border border-amber-300 group-hover:rotate-6 transition-transform">
            📐
          </div>
          <div>
            <h1 className="font-black text-lg text-slate-900 dark:text-white tracking-tight leading-none font-heading group-hover:text-indigo-600 dark:group-hover:text-cyan-300 transition-colors">
              Educational <span className="text-amber-500 dark:text-amber-400">Quest</span>
            </h1>
            <span className="text-[10px] font-black text-indigo-600 dark:text-cyan-400 uppercase tracking-widest block mt-1">
              Classes 4th – 12th All Subjects
            </span>
          </div>
        </div>

        {/* Navigation Link List */}
        <nav className="flex-1 space-y-2 overflow-y-auto pr-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-heading font-extrabold text-sm transition-all duration-250 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white shadow-lg shadow-indigo-600/30 border border-cyan-400/40 translate-x-1.5'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-indigo-50/80 dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-cyan-300 border border-transparent'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'text-amber-300 scale-110' : 'text-slate-500 dark:text-slate-400'}`} />
                <span className="tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Active Quest Banner */}
        <div className="mt-4 bg-gradient-to-br from-indigo-50/80 via-purple-50/80 to-amber-50/80 dark:from-amber-500/15 dark:via-purple-600/15 dark:to-indigo-900/30 border border-indigo-200 dark:border-amber-400/30 p-3.5 rounded-2xl shadow-md backdrop-blur-md">
          <div className="flex items-center gap-2 mb-1 text-amber-700 dark:text-amber-300 font-heading font-black text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Active Quest</span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-200 font-semibold leading-relaxed font-body">
            Solve 3 Algebra questions today to claim <span className="text-indigo-700 dark:text-amber-400 font-bold">+150 XP</span> & <span className="text-cyan-700 dark:text-cyan-400 font-bold">+50 Coins</span>!
          </p>
        </div>
      </aside>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 glass-header border-t border-indigo-200/50 dark:border-white/15 z-50 px-2 py-2.5 flex justify-around items-center shadow-2xl">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`flex flex-col items-center py-1.5 px-3 rounded-xl transition-all cursor-pointer ${
                isActive ? 'text-indigo-600 dark:text-cyan-400 font-black scale-110 bg-indigo-50 dark:bg-white/10 border border-indigo-200 dark:border-cyan-400/30' : 'text-slate-500 dark:text-slate-400 font-medium'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-amber-500 dark:text-amber-400' : 'text-slate-400'}`} />
              <span className="text-[10px] font-heading mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
