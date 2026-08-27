import React, { useState, useEffect } from 'react';
import './index.css';
import { initialUserData } from './data/mockUser';

// Services
import { authService } from './services/authService';
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
    setCurrentScreen('home');
  };

  // Admin Login Success Handler
  const handleAdminLoginSuccess = (adminPayload) => {
    setIsAuthenticated(true);
    setIsAdmin(true);
    setCurrentScreen('admin');
  };

  // Logout Handler
  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setIsAdmin(false);
    setShowSplash(true);
    setCurrentScreen('home');
  };

  // Role Guarded Navigation
  const navigateTo = (screen) => {
    if (screen === 'admin' && !isAdmin) {
      alert('Access Denied. Admin credentials required.');
      setCurrentScreen('home');
      return;
    }
    setCurrentScreen(screen);
  };

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
        setIsAdmin={setIsAdmin}
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
              <AdminDashboardScreen />
            ) : (
              <div className="glass-panel p-8 text-center rounded-3xl space-y-4">
                <h2 className="text-2xl font-black text-rose-600 font-heading">Access Denied</h2>
                <p className="text-sm font-semibold">Admin privileges required to view this Command Center.</p>
                <button onClick={() => navigateTo('home')} className="btn-game-primary py-2 px-6">Return to Home</button>
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
