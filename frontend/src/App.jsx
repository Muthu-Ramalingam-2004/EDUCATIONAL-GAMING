import React, { useState, useEffect } from 'react';
import './index.css';
import { initialUserData } from './data/mockUser';

// Services
import { authService } from './services/authService';
import { adminService } from './services/adminService';
import { progressService } from './services/progressService';
import { gameService } from './services/gameService';
import { rewardService } from './services/rewardService';

// Layout
import TopHeader from './components/layout/TopHeader';
import NavigationBar from './components/layout/NavigationBar';

// Modals
import RewardClaimModal from './components/modals/RewardClaimModal';
import LevelUpModal from './components/modals/LevelUpModal';
import EditProfileModal from './components/modals/EditProfileModal';

// Screens
import SplashScreen from './screens/SplashScreen';
import AuthScreen from './screens/AuthScreen';
import GameHomeDashboard from './screens/GameHomeDashboard';
import WorldSelectionScreen from './screens/WorldSelectionScreen';
import LevelMapScreen from './screens/LevelMapScreen';
import GameModeScreen from './screens/GameModeScreen';
import GameplayScreen from './screens/GameplayScreen';
import ResultScreen from './screens/ResultScreen';
import AchievementsScreen from './screens/AchievementsScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import ProgressScreen from './screens/ProgressScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminDashboardScreen from './screens/AdminDashboardScreen';

import { useTheme } from './context/ThemeContext';

export default function App() {
  const { theme, isDark, toggleTheme } = useTheme();
  
  // Auth Session State
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(initialUserData);
  const [authScreenInitialMode, setAuthScreenInitialMode] = useState('login');
  const [authScreenInitialError, setAuthScreenInitialError] = useState('');

  // Navigation state
  const [currentScreen, setCurrentScreen] = useState('home');
  const [activeMode, setActiveMode] = useState('quiz');
  const [selectedWorld, setSelectedWorld] = useState(null);
  const [gameResult, setGameResult] = useState(null);

  // Modals state
  const [rewardModal, setRewardModal] = useState(null);
  const [levelUpModal, setLevelUpModal] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState(false);

  // 1. Session Restoration on Application Load
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem('mathquest_session');
      if (savedSession) {
        const parsed = JSON.parse(savedSession);
        if (parsed && parsed.token) {
          if (parsed.user && parsed.user.role === 'admin') {
            setIsAdmin(true);
            setIsAuthenticated(true);
            setCurrentScreen('admin');
            
            // Asynchronously verify token validity
            adminService.getDashboardStats();
          } else if (parsed.student) {
            setUser((prev) => ({
              ...prev,
              ...parsed.student,
              xp: parsed.student.totalXp ?? parsed.student.xp ?? prev.xp,
              level: parsed.student.level ?? prev.level,
              coins: parsed.student.coins ?? prev.coins,
              streakDays: parsed.student.streakDays ?? prev.streakDays,
              activeClass: parsed.student.classStandard ?? prev.activeClass
            }));
            setIsAdmin(false);
            setIsAuthenticated(true);
            setCurrentScreen('home');
          }
        }
      }
    } catch (e) {
      console.warn('Session restoration warning:', e);
    }
  }, []);

  // Synchronize player progress with Express Backend API
  useEffect(() => {
    if (!isAuthenticated || isAdmin) return;
    async function syncProgress() {
      try {
        const res = await progressService.getProgress();
        if (res && res.success && res.progress) {
          setUser((prev) => ({
            ...prev,
            level: res.progress.level || prev.level,
            xp: res.progress.totalXp ?? prev.xp,
            coins: res.progress.coins ?? prev.coins,
            streakDays: res.progress.streakDays ?? prev.streakDays,
            name: res.progress.name || prev.name
          }));
        }
      } catch (e) {}
    }
    syncProgress();
  }, [isAuthenticated, isAdmin]);

  // XP & Level-up logic helper
  const addRewards = async (xpEarned, coinsEarned, badge = null) => {
    setUser((prev) => {
      const newXp = prev.xp + xpEarned;
      const newCoins = prev.coins + coinsEarned;

      if (newXp >= prev.nextLevelXp) {
        const nextLvl = prev.level + 1;
        const newTarget = prev.nextLevelXp + 1000;
        setLevelUpModal({ oldLevel: prev.level, newLevel: nextLvl });
        return {
          ...prev,
          xp: newXp,
          coins: newCoins,
          level: nextLvl,
          nextLevelXp: newTarget
        };
      }

      return {
        ...prev,
        xp: newXp,
        coins: newCoins
      };
    });

    if (badge || xpEarned > 0) {
      setRewardModal({ xp: xpEarned, coins: coinsEarned, badge });
    }

    try {
      await rewardService.claimReward({
        rewardType: 'coins',
        amount: coinsEarned,
        badge
      });
      await progressService.updateProgress({ xp: xpEarned, coins: coinsEarned });
    } catch (err) {}
  };

  // Student Login Success Handler
  const handleStudentLoginSuccess = (loginPayload) => {
    const studentData = loginPayload.student || loginPayload.user;
    if (studentData) {
      setUser({
        id: studentData.id || `usr_${Date.now()}`,
        name: studentData.name || 'Student Player',
        username: studentData.username || studentData.name || 'student',
        email: studentData.email || '',
        avatar: studentData.avatar || '⚡',
        activeClass: studentData.classStandard || 9,
        level: studentData.level || 1,
        xp: studentData.totalXp ?? studentData.xp ?? 0,
        nextLevelXp: studentData.nextLevelXp || 500,
        coins: studentData.coins ?? 0,
        streakDays: studentData.streakDays || 1,
        stats: {
          gamesPlayed: studentData.gamesPlayed || 0,
          questionsSolved: studentData.questionsSolved || 0,
          accuracy: studentData.accuracyPct || 100,
          averageTime: "15 sec",
          bestScore: studentData.bestScore || 0,
          perfectQuizzes: 0
        },
        currentWorldId: studentData.currentWorldId || 'class9_world1',
        currentWorldName: studentData.currentWorldName || 'Number Quest',
        recentBadge: studentData.recentBadge || '🎯 Novice Adventurer'
      });
    }

    setIsAuthenticated(true);
    setIsAdmin(false);
    setAuthScreenInitialMode('login');
    setAuthScreenInitialError('');
    setCurrentScreen('home');
  };

  // Admin Login Success Handler
  const handleAdminLoginSuccess = (adminPayload) => {
    setIsAuthenticated(true);
    setIsAdmin(true);
    setAuthScreenInitialMode('login');
    setAuthScreenInitialError('');
    setCurrentScreen('admin');
  };

  // ─── FULL STUDENT LOGOUT ─────────────────────────────────────────────────────
  // Clears all tokens and returns to splash/login.
  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setIsAdmin(false);
    setAuthScreenInitialMode('login');
    setAuthScreenInitialError('');
    setShowSplash(true);
    setCurrentScreen('home');
  };

  // ─── ADMIN "SECURE LOGOUT" (from Admin Panel sidebar) ───────────────────────
  // Clears admin token — next Admin Panel visit requires credentials.
  const handleAdminLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setIsAdmin(false);
    setAuthScreenInitialMode('admin');
    setAuthScreenInitialError('');
    setShowSplash(false);
  };

  // ─── EXIT ADMIN PANEL (return to student dashboard) ─────────────────────────
  // Keeps admin token in localStorage. Next Admin Panel click restores silently.
  const handleExitAdmin = () => {
    setIsAdmin(false);
    setIsAuthenticated(true);
    setCurrentScreen('home');
  };

  // ─── SHOW ADMIN LOGIN (gate button) ─────────────────────────────────────────
  const handleGoToAdminLogin = () => {
    setAuthScreenInitialMode('admin');
    setAuthScreenInitialError('');
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  // ─── ROLE-GUARDED NAVIGATION ────────────────────────────────────────────────
  const navigateTo = (screen) => {
    if (screen === 'admin') {
      // Already in admin mode
      if (isAdmin) {
        setCurrentScreen('admin');
        return;
      }
      // Check for a stored valid admin session (e.g. after "Exit Admin")
      try {
        const raw = localStorage.getItem('mathquest_session');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && parsed.token && parsed.user && parsed.user.role === 'admin') {
            // Silently restore admin session — no credentials needed
            setIsAdmin(true);
            setIsAuthenticated(true);
            setCurrentScreen('admin');
            return;
          }
        }
      } catch (_) {}
      // No valid admin session — show the gate
      setCurrentScreen('admin');
      return;
    }
    setCurrentScreen(screen);
  };

  // Handle unauthorized event globally (expired/invalid token)
  useEffect(() => {
    const handleUnauthorized = (e) => {
      const wasAdmin = isAdmin;
      authService.logout();
      setIsAuthenticated(false);
      setIsAdmin(false);
      if (wasAdmin) {
        setAuthScreenInitialMode('admin');
        setAuthScreenInitialError('Your admin session has expired. Please log in again.');
      } else {
        setAuthScreenInitialMode('login');
        const msg = e.detail?.message;
        setAuthScreenInitialError(
          typeof msg === 'string' && msg && !msg.includes('[object')
            ? msg
            : 'Your session has expired. Please log in again.'
        );
      }
    };

    window.addEventListener('mathquest_unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('mathquest_unauthorized', handleUnauthorized);
    };
  }, [isAdmin]);

  if (showSplash) {
    return (
      <SplashScreen
        onStart={() => {
          setShowSplash(false);
        }}
      />
    );
  }

  if (!isAuthenticated) {
    return (
      <AuthScreen
        onLoginSuccess={handleStudentLoginSuccess}
        onAdminLogin={handleAdminLoginSuccess}
        initialMode={authScreenInitialMode}
        initialError={authScreenInitialError}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F0F4FF] dark:bg-[#060913] text-slate-900 dark:text-slate-100 relative overflow-x-hidden math-bg-grid selection:bg-cyan-500 selection:text-slate-950 transition-colors duration-300">
      
      {/* Background Ambient Glow Orbs */}
      <div className="fixed top-0 left-1/4 orb-glow-cyan blur-[140px] opacity-30 -z-10 pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 orb-glow-purple blur-[140px] opacity-30 -z-10 pointer-events-none" />
      <div className="fixed top-1/3 right-10 orb-glow-gold blur-[120px] opacity-20 -z-10 pointer-events-none" />
      
      {/* Top Gaming Bar */}
      <TopHeader
        user={user}
        onNavigate={navigateTo}
        onOpenProfile={() => navigateTo('profile')}
        isAdmin={isAdmin}
        onLogout={handleLogout}
        onExitAdmin={handleExitAdmin}
      />

      {/* Main Body Layout with Sidebar */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* Navigation Sidebar */}
        <NavigationBar
          currentScreen={currentScreen}
          onNavigate={navigateTo}
          isAdmin={isAdmin}
        />

        {/* Screen Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          
          {/* 3. GAME HOME DASHBOARD */}
          {currentScreen === 'home' && (
            <GameHomeDashboard
              user={user}
              onContinueGame={() => {
                setSelectedWorld(null);
                navigateTo('map');
              }}
              onStartMode={(modeId) => {
                if (modeId === 'modes') {
                  navigateTo('modes');
                } else {
                  setActiveMode(modeId);
                  navigateTo('gameplay');
                }
              }}
              onSelectWorld={(world) => {
                setSelectedWorld(world);
                navigateTo('map');
              }}
            />
          )}

          {/* 4. GAME WORLDS (Class 9 / 10 Chapters) */}
          {currentScreen === 'worlds' && (
            <WorldSelectionScreen
              currentClass={user.activeClass}
              onSelectWorld={(world) => {
                setSelectedWorld(world);
                navigateTo('map');
              }}
            />
          )}

          {/* 5. LEVEL MAP SCREEN */}
          {currentScreen === 'map' && (
            <LevelMapScreen
              world={selectedWorld}
              onStartLevel={(lvl) => {
                setActiveMode('quiz');
                navigateTo('gameplay');
              }}
              onBack={() => navigateTo('worlds')}
            />
          )}

          {/* 6. GAME MODE SELECTION */}
          {currentScreen === 'modes' && (
            <GameModeScreen
              playerLevel={user.level}
              onSelectMode={(modeId) => {
                setActiveMode(modeId);
                navigateTo('gameplay');
              }}
            />
          )}

          {/* 7, 8, 9. GAMEPLAY SCREEN */}
          {currentScreen === 'gameplay' && (
            <GameplayScreen
              mode={activeMode}
              levelInfo={selectedWorld ? { title: selectedWorld.title } : null}
              onCompleteGame={async (results) => {
                setGameResult(results);
                navigateTo('result');

                try {
                  const submitRes = await gameService.submitGame(activeMode, {
                    answers: [],
                    timeTakenSeconds: 105
                  });
                  if (submitRes && submitRes.levelUp) {
                    setLevelUpModal({
                      oldLevel: submitRes.previousLevel,
                      newLevel: submitRes.newLevel
                    });
                  }
                } catch (err) {}
              }}
            />
          )}

          {/* 10. GAME RESULT SCREEN */}
          {currentScreen === 'result' && (
            <ResultScreen
              resultData={gameResult}
              onClaimRewards={(rewardData) => {
                addRewards(rewardData.xp, rewardData.coins, rewardData.badge);
              }}
              onPlayNext={() => {
                navigateTo('gameplay');
              }}
              onHome={() => {
                navigateTo('home');
              }}
            />
          )}

          {/* 13. ACHIEVEMENTS SCREEN */}
          {currentScreen === 'achievements' && (
            <AchievementsScreen />
          )}

          {/* 14. LEADERBOARD SCREEN */}
          {currentScreen === 'leaderboard' && (
            <LeaderboardScreen />
          )}

          {/* 15. PROGRESS SCREEN */}
          {currentScreen === 'progress' && (
            <ProgressScreen user={user} />
          )}

          {/* 16. PROFILE SCREEN */}
          {currentScreen === 'profile' && (
            <ProfileScreen
              user={user}
              onOpenEditProfile={() => setShowEditProfile(true)}
              onLogout={handleLogout}
            />
          )}

          {/* 17. ADMIN DASHBOARD SCREEN */}
          {currentScreen === 'admin' && (
            isAdmin ? (
              <AdminDashboardScreen
                onLogout={handleAdminLogout}
                onExitAdmin={handleExitAdmin}
              />
            ) : (
              <div className="glass-panel p-8 text-center rounded-3xl max-w-md mx-auto my-12 border border-purple-500/25 shadow-2xl space-y-6 bg-slate-900/60 backdrop-blur-xl">
                <div className="w-16 h-16 mx-auto bg-purple-500/10 rounded-full flex items-center justify-center border border-purple-500/30 animate-pulse">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-heading">Admin Mode Required</h2>
                  <p className="text-sm text-slate-300 font-semibold px-4">You must be authenticated as an Administrator to access the Command Center.</p>
                </div>
                <div className="flex flex-col gap-3 pt-2">
                  <button 
                    onClick={handleGoToAdminLogin} 
                    className="btn-game-primary bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold py-3 px-6 rounded-2xl shadow-lg shadow-purple-500/30 transition-all cursor-pointer border-t border-white/20"
                  >
                    Go to Admin Mode Login
                  </button>
                  <button 
                    onClick={() => navigateTo('home')} 
                    className="text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Back to Student Dashboard
                  </button>
                </div>
              </div>
            )
          )}

        </main>

      </div>

      {/* OVERLAY MODALS */}
      {rewardModal && (
        <RewardClaimModal
          reward={rewardModal}
          onClose={() => setRewardModal(null)}
        />
      )}

      {levelUpModal && (
        <LevelUpModal
          oldLevel={levelUpModal.oldLevel}
          newLevel={levelUpModal.newLevel}
          onClose={() => setLevelUpModal(null)}
          onStartNext={() => {
            setLevelUpModal(null);
            navigateTo('gameplay');
          }}
        />
      )}

      {showEditProfile && (
        <EditProfileModal
          user={user}
          onSave={async (updatedData) => {
            setUser((prev) => ({ ...prev, ...updatedData }));
            setShowEditProfile(false);
            try {
              await authService.updateProfile(updatedData);
            } catch (e) {}
          }}
          onClose={() => setShowEditProfile(false)}
        />
      )}

    </div>
  );
}
