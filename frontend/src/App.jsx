import React, { useState, useEffect } from 'react';
import './index.css';
import { initialUserData } from './data/mockUser';
import { classWorldsData } from './data/mockWorlds';
import { getChaptersForGradeAndSubject } from './data/curriculumData';

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
  const [selectedGrade, setSelectedGrade] = useState(9);
  const [selectedSubject, setSelectedSubject] = useState('maths');
  const [selectedWorld, setSelectedWorld] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [gameResult, setGameResult] = useState(null);

  // Modals state
  const [rewardModal, setRewardModal] = useState(null);
  const [levelUpModal, setLevelUpModal] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState(false);

  // Session & Gameplay Restoration State
  const [restoredSession, setRestoredSession] = useState(null);

  // 1. Session Restoration on Application Load
  useEffect(() => {
    // Clean up any legacy localStorage auth keys
    try {
      localStorage.removeItem('mathquest_session');
      localStorage.removeItem('mathquest_token');
      localStorage.removeItem('mathquest_admin_session');
      localStorage.removeItem('mathquest_admin_token');
    } catch (_) {}

    try {
      const savedSession = sessionStorage.getItem('mathquest_session');
      if (savedSession) {
        const parsed = JSON.parse(savedSession);
        if (parsed && parsed.token && (parsed.student || parsed.user)) {
          const studentData = parsed.student || parsed.user;
          setUser((prev) => ({
            ...prev,
            ...studentData,
            xp: studentData.totalXp ?? studentData.xp ?? prev.xp,
            level: studentData.level ?? prev.level,
            coins: studentData.coins ?? prev.coins,
            streakDays: studentData.streakDays ?? prev.streakDays,
            activeClass: studentData.classStandard ?? prev.activeClass
          }));
          setIsAdmin(false);
          setIsAuthenticated(true);
          setShowSplash(false);

          // Check if active gameplay session exists for instant refresh recovery
          try {
            const activeGameplayRaw = sessionStorage.getItem('educational_quest_gameplay_session');
            if (activeGameplayRaw) {
              const activeSession = JSON.parse(activeGameplayRaw);
              if (activeSession && activeSession.currentScreen === 'gameplay' && (Date.now() - (activeSession.timestamp || 0) < 7200000)) {
                setActiveMode(activeSession.activeMode || 'quiz');
                if (activeSession.classStandard) setSelectedGrade(activeSession.classStandard);
                if (activeSession.subjectId) setSelectedSubject(activeSession.subjectId);
                if (activeSession.selectedWorld) setSelectedWorld(activeSession.selectedWorld);
                if (activeSession.selectedLevel) setSelectedLevel(activeSession.selectedLevel);
                setRestoredSession(activeSession);
                setCurrentScreen('gameplay');
                return;
              }
            }
          } catch (err) {
            console.warn('Active gameplay session recovery warning:', err);
          }

          setCurrentScreen('home');
          return;
        }
      }
    } catch (e) {
      console.warn('Session restoration warning:', e);
    }

    // No active session in sessionStorage
    setIsAuthenticated(false);
    setIsAdmin(false);
    setShowSplash(true);
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

  // Handle Rewards & Level Up Calculations
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

  // Student Login Success Handler - ALWAYS opens User Game Dashboard ('home')
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
    setShowSplash(false);
    setAuthScreenInitialMode('login');
    setAuthScreenInitialError('');
    setCurrentScreen('home');
  };

  // Admin Login Success Handler - Opens Admin Dashboard ('admin') after explicit Admin authentication
  const handleAdminLoginSuccess = (adminPayload) => {
    setIsAuthenticated(true);
    setIsAdmin(true);
    setShowSplash(false);
    setAuthScreenInitialMode('login');
    setAuthScreenInitialError('');
    setCurrentScreen('admin');
  };

  // ─── FULL STUDENT LOGOUT ─────────────────────────────────────────────────────
  // Clears all tokens and returns to splash/login.
  const handleLogout = () => {
    try {
      sessionStorage.removeItem('educational_quest_gameplay_session');
      localStorage.removeItem('educational_quest_gameplay_session');
    } catch (_) {}
    setRestoredSession(null);
    authService.logout();
    setIsAuthenticated(false);
    setIsAdmin(false);
    setAuthScreenInitialMode('login');
    setAuthScreenInitialError('');
    setShowSplash(true);
    setCurrentScreen('home');
  };

  // ─── ADMIN "SECURE LOGOUT" (from Admin Panel sidebar) ───────────────────────
  const handleAdminLogout = () => {
    authService.adminLogout();
    setIsAdmin(false);
    setCurrentScreen('home');
  };

  // ─── EXIT ADMIN PANEL (return to student dashboard) ─────────────────────────
  const handleExitAdmin = () => {
    setIsAdmin(false);
    setCurrentScreen('home');
  };

  // ─── SHOW ADMIN LOGIN (gate button) ─────────────────────────────────────────
  const handleGoToAdminLogin = () => {
    setAuthScreenInitialMode('admin');
    setAuthScreenInitialError('');
    setIsAuthenticated(false);
    setIsAdmin(false);
    setShowSplash(false);
  };

  // ─── LANDING PAGE "ENTER THE ARENA" AUTH GUARD ──────────────────────────────
  const handleEnterArena = () => {
    try {
      const activeSessionRaw = sessionStorage.getItem('mathquest_session');
      if (activeSessionRaw) {
        const parsed = JSON.parse(activeSessionRaw);
        if (parsed && parsed.token && (parsed.student || parsed.user)) {
          setIsAuthenticated(true);
          setIsAdmin(false);
          setShowSplash(false);
          setCurrentScreen('home');
          return;
        }
      }
    } catch (_) {}

    // No valid active login session -> redirect to User Login page
    setIsAuthenticated(false);
    setIsAdmin(false);
    setAuthScreenInitialMode('login');
    setAuthScreenInitialError('');
    setShowSplash(false);
  };

  // ─── ROLE-GUARDED NAVIGATION ────────────────────────────────────────────────
  const navigateTo = (screen) => {
    if (screen !== 'gameplay') {
      setRestoredSession(null);
      try {
        sessionStorage.removeItem('educational_quest_gameplay_session');
        localStorage.removeItem('educational_quest_gameplay_session');
      } catch (_) {}
    }
    if (screen === 'admin') {
      if (isAdmin) {
        setCurrentScreen('admin');
        return;
      }
      // Check for stored valid admin session in sessionStorage
      try {
        const adminRaw = sessionStorage.getItem('mathquest_admin_session');
        if (adminRaw) {
          const parsedAdmin = JSON.parse(adminRaw);
          if (parsedAdmin && parsedAdmin.token && parsedAdmin.user && parsedAdmin.user.role === 'admin') {
            setIsAdmin(true);
            setCurrentScreen('admin');
            return;
          }
        }
      } catch (_) {}
      // No valid admin session — redirect to Admin Login
      setAuthScreenInitialMode('admin');
      setAuthScreenInitialError('');
      setIsAuthenticated(false);
      setIsAdmin(false);
      setShowSplash(false);
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
        onStart={handleEnterArena}
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
                const chapters = getChaptersForGradeAndSubject(selectedGrade || user.activeClass || 9, selectedSubject || 'maths');
                const activeCh = selectedWorld || chapters[0];
                const topicKey = activeCh ? (activeCh.topicId || activeCh.id) : 'number_systems';
                const unlocked = user.topicProgress?.[topicKey]?.unlockedLevel || user.lastActiveLevelNumber || 1;
                setSelectedWorld(activeCh);
                setSelectedLevel(unlocked);
                navigateTo('map');
              }}
              onStartMode={(modeId) => {
                if (modeId === 'modes') {
                  navigateTo('modes');
                } else {
                  setActiveMode(modeId);
                  setSelectedLevel(user.level || 1);
                  navigateTo('gameplay');
                }
              }}
              onSelectWorld={(world) => {
                setSelectedWorld(world);
                if (world.classStandard) setSelectedGrade(world.classStandard);
                if (world.subjectId) setSelectedSubject(world.subjectId);
                navigateTo('map');
              }}
            />
          )}

          {/* 4. GAME WORLDS (Curriculum Explorer Grades 4-12) */}
          {currentScreen === 'worlds' && (
            <WorldSelectionScreen
              currentClass={selectedGrade || user.activeClass || 9}
              currentSubject={selectedSubject || 'maths'}
              onSelectGrade={(gId) => setSelectedGrade(gId)}
              onSelectSubject={(sId) => setSelectedSubject(sId)}
              onSelectWorld={(world) => {
                setSelectedWorld(world);
                if (world.classStandard) setSelectedGrade(world.classStandard);
                if (world.subjectId) setSelectedSubject(world.subjectId);
                navigateTo('map');
              }}
            />
          )}

          {/* 5. LEVEL MAP SCREEN */}
          {currentScreen === 'map' && (
            <LevelMapScreen
              world={selectedWorld || getChaptersForGradeAndSubject(selectedGrade, selectedSubject)[0]}
              user={user}
              onStartLevel={(lvl) => {
                setActiveMode('quiz');
                setSelectedLevel(lvl.id || 1);
                if (lvl.world) setSelectedWorld(lvl.world);
                navigateTo('gameplay');
              }}
              onBack={() => navigateTo('worlds')}
            />
          )}

          {/* 6. GAME MODE SELECTION */}
          {currentScreen === 'modes' && (
            <GameModeScreen
              playerLevel={user.level}
              currentGrade={selectedGrade || user.activeClass || 9}
              currentSubject={selectedSubject || 'maths'}
              currentTopic={selectedWorld ? selectedWorld.topicId : null}
              onSelectMode={(modeId, ctx) => {
                setActiveMode(modeId);
                if (ctx) {
                  if (ctx.classStandard) setSelectedGrade(ctx.classStandard);
                  if (ctx.subjectId) setSelectedSubject(ctx.subjectId);
                  if (ctx.chapterId) {
                    const chs = getChaptersForGradeAndSubject(ctx.classStandard || selectedGrade, ctx.subjectId || selectedSubject);
                    const matched = chs.find(c => c.id === ctx.chapterId || c.topicId === ctx.topicId) || chs[0];
                    if (matched) setSelectedWorld(matched);
                  }
                }
                setSelectedLevel(1);
                navigateTo('gameplay');
              }}
            />
          )}

          {/* 7, 8, 9. GAMEPLAY SCREEN */}
          {currentScreen === 'gameplay' && (() => {
            const activeChs = getChaptersForGradeAndSubject(selectedGrade || user.activeClass || 9, selectedSubject || 'maths');
            const activeCh = selectedWorld || activeChs[0];
            return (
              <GameplayScreen
                mode={activeMode}
                classStandard={selectedGrade || user.activeClass || 9}
                subjectId={selectedSubject || 'maths'}
                chapterId={activeCh ? activeCh.id : null}
                topicId={activeCh ? activeCh.topicId : null}
                levelInfo={activeCh ? { title: activeCh.title, levelNumber: selectedLevel } : { title: `Level ${selectedLevel}`, levelNumber: selectedLevel }}
                restoredSession={restoredSession}
                onExitGame={() => {
                  setRestoredSession(null);
                  try {
                    sessionStorage.removeItem('educational_quest_gameplay_session');
                    localStorage.removeItem('educational_quest_gameplay_session');
                  } catch (_) {}
                  navigateTo('home');
                }}
                onCompleteGame={(results) => {
                  setRestoredSession(null);
                  try {
                    sessionStorage.removeItem('educational_quest_gameplay_session');
                    localStorage.removeItem('educational_quest_gameplay_session');
                  } catch (_) {}
                  if (results.updatedStudent) {
                    setUser(prev => {
                      const merged = { ...prev, ...results.updatedStudent };
                      try {
                        const raw = sessionStorage.getItem('mathquest_session');
                        if (raw) {
                          const parsed = JSON.parse(raw);
                          sessionStorage.setItem('mathquest_session', JSON.stringify({ ...parsed, student: merged }));
                        }
                      } catch (err) {}
                      return merged;
                    });
                  }
                  setGameResult({
                    ...results,
                    mode: activeMode,
                    levelTitle: activeCh ? activeCh.title : 'Educational Quest Challenge',
                    user: {
                      name: user.name || 'Student Player',
                      username: user.username || 'student',
                      activeClass: selectedGrade || user.activeClass || 9
                    }
                  });
                  navigateTo('result');
                  if (results.levelUp) {
                    setLevelUpModal({
                      oldLevel: results.previousLevel,
                      newLevel: results.newLevel
                    });
                  }
                }}
              />
            );
          })()}

          {/* 10. GAME RESULT SCREEN */}
          {currentScreen === 'result' && (
            <ResultScreen
              resultData={gameResult}
              onClaimRewards={(rewardData) => {
                addRewards(rewardData.xp, rewardData.coins, rewardData.badge);
              }}
              onPlayNext={() => {
                const nextLvl = gameResult?.nextUnlockedLevel || (selectedLevel + 1);
                setSelectedLevel(nextLvl);
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
