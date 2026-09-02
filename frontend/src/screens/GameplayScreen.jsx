import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Coins, Sparkles, CheckCircle2, XCircle, ArrowRight, HelpCircle, MoveUp, MoveDown, Trophy, Zap, Brain, Target, Layers } from 'lucide-react';
import { gameService } from '../services/gameService';
import { sound } from '../utils/sound';

export default function GameplayScreen({ mode = 'quiz', levelInfo, classStandard, subjectId, chapterId, topicId, restoredSession, onCompleteGame, onExitGame }) {
  const [questionIndex, setQuestionIndex] = useState(restoredSession?.questionIndex || 0);
  const [score, setScore] = useState(restoredSession?.score || 0);
  const [coinsEarned, setCoinsEarned] = useState(restoredSession?.coinsEarned || 0);
  const [xpEarned, setXpEarned] = useState(restoredSession?.xpEarned || 0);
  const [correctCount, setCorrectCount] = useState(restoredSession?.correctCount || 0);
  const [timer, setTimer] = useState(mode === 'timeattack' ? 15 : 30);
  const [userAnswers, setUserAnswers] = useState(restoredSession?.userAnswers || []);
  const [questionsList, setQuestionsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // MCQ & Formula & Puzzle state
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Drag & Drop State
  const [dragDropOrder, setDragDropOrder] = useState([]);
  const [dragDropVerified, setDragDropVerified] = useState(false);
  const [dragDropIsCorrect, setDragDropIsCorrect] = useState(false);

  // Memory Card Flip Matrix State
  const [memoryCards, setMemoryCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCardIds, setMatchedCardIds] = useState([]);
  const [memoryCompleted, setMemoryCompleted] = useState(false);

  // Auto-save gameplay session state for seamless browser refresh recovery
  useEffect(() => {
    if (isLoading || !questionsList || questionsList.length === 0) return;
    const sessionObj = {
      currentScreen: 'gameplay',
      activeMode: mode,
      classStandard,
      subjectId,
      chapterId: chapterId || topicId,
      topicId,
      selectedLevel: levelInfo?.levelNumber || 1,
      selectedWorld: { id: chapterId || topicId, topicId, classStandard, subjectId, title: levelInfo?.title },
      questionIndex,
      score,
      coinsEarned,
      xpEarned,
      correctCount,
      userAnswers,
      timestamp: Date.now()
    };
    try {
      sessionStorage.setItem('educational_quest_gameplay_session', JSON.stringify(sessionObj));
      localStorage.setItem('educational_quest_gameplay_session', JSON.stringify(sessionObj));
    } catch (_) {}
  }, [mode, classStandard, subjectId, chapterId, topicId, levelInfo?.levelNumber, questionIndex, score, coinsEarned, xpEarned, correctCount, userAnswers, isLoading, questionsList]);

  useEffect(() => {
    async function initSession() {
      setIsLoading(true);
      try {
        await gameService.startGame(mode, {
          classStandard,
          subjectId,
          chapterId: chapterId || topicId,
          topicId,
          level: levelInfo?.levelNumber || 1
        });
        
        const response = await gameService.getQuestions({
          classStandard,
          subjectId,
          chapterId: chapterId || topicId,
          topicId,
          level: levelInfo?.levelNumber || 1,
          mode
        });

        if (response && response.success && response.questions && response.questions.length > 0) {
          setQuestionsList(response.questions);
        } else {
          console.error("Backend failed to return questions:", response);
          setQuestionsList([]);
        }
      } catch (err) {
        console.error("Failed to fetch questions:", err);
        setQuestionsList([]);
      } finally {
        setIsLoading(false);
      }
    }
    initSession();
  }, [mode, classStandard, subjectId, topicId, levelInfo?.levelNumber]);

  const currentQ = questionsList.length > 0 ? (questionsList[questionIndex] || questionsList[0]) : null;

  // Initialize Drag & Drop steps when question changes
  useEffect(() => {
    if (mode === 'dragdrop' && currentQ) {
      let steps = [];
      if (currentQ.sequenceJson?.initialShuffled) {
        steps = [...currentQ.sequenceJson.initialShuffled];
      } else if (currentQ.initialShuffled) {
        steps = [...currentQ.initialShuffled];
      } else {
        const correctText = currentQ.options?.find(o => o.isCorrect)?.text || currentQ.answer || 'Correct Result';
        const rawSteps = [
          `Step 1: Understand Concept (${currentQ.topicName || 'Subject Rule'})`,
          `Step 2: Apply Primary Formula / Equation`,
          `Step 3: Evaluate Calculation Steps`,
          `Step 4: Result -> ${correctText}`
        ];
        steps = [...rawSteps].sort(() => 0.5 - Math.random());
      }
      setDragDropOrder(steps);
      setDragDropVerified(false);
      setDragDropIsCorrect(false);
    }
  }, [questionIndex, mode, currentQ]);

  // Initialize Memory Card Matrix when question changes
  useEffect(() => {
    if (mode === 'memory' && currentQ) {
      const correctOpt = currentQ.options?.find(o => o.isCorrect) || { text: currentQ.answer || 'Answer Key' };
      const wrongOpts = currentQ.options?.filter(o => !o.isCorrect) || [];
      const wrongText1 = wrongOpts[0]?.text || 'Alternative 1';
      const wrongText2 = wrongOpts[1]?.text || 'Alternative 2';

      const cardsData = [
        { id: 1, content: `Concept Question: ${currentQ.questionText || currentQ.question}`, pairId: 'pair1', isQ: true },
        { id: 2, content: `Correct Answer: ${correctOpt.text}`, pairId: 'pair1', isQ: false },
        { id: 3, content: `Formula / Definition 2`, pairId: 'pair2', isQ: true },
        { id: 4, content: `Solution: ${wrongText1}`, pairId: 'pair2', isQ: false },
        { id: 5, content: `Formula / Definition 3`, pairId: 'pair3', isQ: true },
        { id: 6, content: `Solution: ${wrongText2}`, pairId: 'pair3', isQ: false },
      ];

      const shuffled = [...cardsData].sort(() => 0.5 - Math.random());
      setMemoryCards(shuffled);
      setFlippedCards([]);
      setMatchedCardIds([]);
      setMemoryCompleted(false);
      setIsAnswered(false);
    }
  }, [questionIndex, mode, currentQ]);

  // Reset timer on question change
  useEffect(() => {
    setTimer(mode === 'timeattack' ? 15 : 30);
  }, [questionIndex, mode]);

  // Countdown timer effect
  useEffect(() => {
    if (isAnswered || dragDropVerified || memoryCompleted) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [questionIndex, isAnswered, dragDropVerified, memoryCompleted]);

  const handleTimeOut = () => {
    if (!isAnswered && !dragDropVerified && !memoryCompleted) {
      sound.playWrong();
      setIsAnswered(true);

      const correctOpt = currentQ?.options ? currentQ.options.find((o) => o.isCorrect) : null;
      setUserAnswers((prev) => [
        ...prev,
        {
          questionNumber: questionIndex + 1,
          question: currentQ?.questionText || currentQ?.question || 'Subject Problem',
          userAnswer: 'Time Expired (No Answer)',
          correctAnswer: correctOpt ? `${correctOpt.id}: ${correctOpt.text}` : (currentQ?.sequenceJson?.answer || currentQ?.answer || 'N/A'),
          isCorrect: false,
          marks: 0,
          explanation: currentQ?.explanation || ''
        }
      ]);
    }
  };

  // MCQ option click handler (quiz, timeattack, formula)
  const handleOptionClick = (option) => {
    if (isAnswered) return;
    setSelectedOption(option.id);
    setIsAnswered(true);

    const isRight = Boolean(option.isCorrect);
    const correctOpt = currentQ.options ? currentQ.options.find((o) => o.isCorrect) : null;

    if (isRight) {
      sound.playCorrect();
      const speedBonus = mode === 'timeattack' ? Math.max(10, timer * 5) : 0;
      setScore((prev) => prev + 100 + speedBonus);
      setCoinsEarned((prev) => prev + 20);
      setXpEarned((prev) => prev + 50);
      setCorrectCount((prev) => prev + 1);
    } else {
      sound.playWrong();
    }

    setUserAnswers((prev) => [
      ...prev,
      {
        questionNumber: questionIndex + 1,
        question: currentQ.questionText || currentQ.question || 'Subject Problem',
        userAnswer: `${option.id}: ${option.text}`,
        correctAnswer: correctOpt ? `${correctOpt.id}: ${correctOpt.text}` : 'N/A',
        isCorrect: isRight,
        marks: isRight ? 100 : 0,
        explanation: currentQ.explanation || ''
      }
    ]);
  };

  // Puzzle answer submit
  const handlePuzzleOptionClick = (optText) => {
    if (isAnswered) return;
    const rightAns = currentQ.sequenceJson?.answer || currentQ.answer || (currentQ.options?.find(o => o.isCorrect)?.text || optText);
    const isRight = optText === rightAns;
    setSelectedOption(optText);
    setIsAnswered(true);

    if (isRight) {
      sound.playCorrect();
      setScore((prev) => prev + 120);
      setCoinsEarned((prev) => prev + 25);
      setXpEarned((prev) => prev + 60);
      setCorrectCount((prev) => prev + 1);
    } else {
      sound.playWrong();
    }

    setUserAnswers((prev) => [
      ...prev,
      {
        questionNumber: questionIndex + 1,
        question: currentQ.questionText || currentQ.question || 'Concept Puzzle',
        userAnswer: String(optText),
        correctAnswer: String(rightAns),
        isCorrect: isRight,
        marks: isRight ? 120 : 0,
        explanation: currentQ.explanation || ''
      }
    ]);
  };

  // Move drag drop steps
  const moveStep = (index, direction) => {
    sound.playClick();
    const newArr = [...dragDropOrder];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newArr.length) return;
    const temp = newArr[index];
    newArr[index] = newArr[targetIdx];
    newArr[targetIdx] = temp;
    setDragDropOrder(newArr);
  };

  const handleVerifyDragDrop = () => {
    let correctOrder = currentQ.sequenceJson?.correctOrder || currentQ.correctOrder;
    if (!correctOrder) {
      const correctText = currentQ.options?.find(o => o.isCorrect)?.text || currentQ.answer || 'Correct Result';
      correctOrder = [
        `Step 1: Understand Concept (${currentQ.topicName || 'Subject Rule'})`,
        `Step 2: Apply Primary Formula / Equation`,
        `Step 3: Evaluate Calculation Steps`,
        `Step 4: Result -> ${correctText}`
      ];
    }
    const isCorrectOrder = JSON.stringify(dragDropOrder) === JSON.stringify(correctOrder);
    setDragDropVerified(true);
    setDragDropIsCorrect(isCorrectOrder);

    if (isCorrectOrder) {
      sound.playCorrect();
      setScore((prev) => prev + 150);
      setCoinsEarned((prev) => prev + 30);
      setXpEarned((prev) => prev + 70);
      setCorrectCount((prev) => prev + 1);
    } else {
      sound.playWrong();
    }

    setUserAnswers((prev) => [
      ...prev,
      {
        questionNumber: questionIndex + 1,
        question: currentQ.questionText || currentQ.question || 'Proof Step Reorder',
        userAnswer: dragDropOrder.join(' ➔ '),
        correctAnswer: correctOrder.join(' ➔ '),
        isCorrect: isCorrectOrder,
        marks: isCorrectOrder ? 150 : 0,
        explanation: 'Proof steps sequence order verification'
      }
    ]);
  };

  // Memory tile flip handler
  const handleMemoryCardClick = (card) => {
    if (flippedCards.length >= 2 || flippedCards.includes(card.id) || matchedCardIds.includes(card.id) || memoryCompleted) return;

    sound.playClick();
    const newFlipped = [...flippedCards, card.id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const card1 = memoryCards.find(c => c.id === newFlipped[0]);
      const card2 = memoryCards.find(c => c.id === newFlipped[1]);

      if (card1.pairId === card2.pairId) {
        sound.playCorrect();
        const newMatched = [...matchedCardIds, card1.id, card2.id];
        setMatchedCardIds(newMatched);
        setFlippedCards([]);

        if (newMatched.length === memoryCards.length) {
          setMemoryCompleted(true);
          setIsAnswered(true);
          setScore((prev) => prev + 180);
          setCoinsEarned((prev) => prev + 35);
          setXpEarned((prev) => prev + 80);
          setCorrectCount((prev) => prev + 1);

          setUserAnswers((prev) => [
            ...prev,
            {
              questionNumber: questionIndex + 1,
              question: currentQ.questionText || currentQ.question || 'Memory Match Matrix',
              userAnswer: 'Matched All Concept Matrix Cards',
              correctAnswer: 'Matched All Concept Matrix Cards',
              isCorrect: true,
              marks: 180,
              explanation: currentQ.explanation || 'All concept tiles matched!'
            }
          ]);
        }
      } else {
        sound.playWrong();
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const handleExitGame = () => {
    try {
      sessionStorage.removeItem('educational_quest_gameplay_session');
      localStorage.removeItem('educational_quest_gameplay_session');
    } catch (_) {}
    if (typeof onExitGame === 'function') onExitGame();
  };

  const handleNext = async () => {
    sound.playClick();
    if (questionIndex + 1 < questionsList.length) {
      setQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
      setMemoryCompleted(false);
    } else {
      try {
        sessionStorage.removeItem('educational_quest_gameplay_session');
        localStorage.removeItem('educational_quest_gameplay_session');
      } catch (_) {}

      const totalQ = questionsList.length;
      const finalCorrect = correctCount;
      const finalWrong = Math.max(0, totalQ - finalCorrect);
      const actualAccuracy = Math.round((finalCorrect / (totalQ || 1)) * 100);

      let submitRes = {};
      try {
        submitRes = await gameService.submitGame(mode, {
          classStandard,
          subjectId,
          chapterId: chapterId || topicId,
          topicId,
          levelNumber: levelInfo?.levelNumber || 1,
          answers: userAnswers,
          timeTakenSeconds: 105,
          score,
          accuracyPct: actualAccuracy,
          correctCount: finalCorrect,
          totalQuestions: totalQ
        }) || {};
      } catch (err) {}

      const starsEarned = submitRes.starsEarned !== undefined 
        ? submitRes.starsEarned 
        : (actualAccuracy >= 90 ? 3 : actualAccuracy >= 70 ? 2 : actualAccuracy >= 50 ? 1 : 0);

      onCompleteGame({
        score: score,
        correctCount: finalCorrect,
        wrongCount: finalWrong,
        totalQuestions: totalQ,
        accuracyPct: actualAccuracy,
        starsEarned: starsEarned,
        nextUnlockedLevel: submitRes.nextUnlockedLevel || ((levelInfo?.levelNumber || 1) + 1),
        xpEarned: submitRes.xpEarned || xpEarned || (finalCorrect * 50),
        coinsEarned: submitRes.coinsEarned || coinsEarned || (finalCorrect * 20),
        timeTaken: '01:45',
        levelUp: submitRes.levelUp || false,
        newLevel: submitRes.newLevel,
        previousLevel: submitRes.previousLevel,
        questionsDetail: userAnswers,
        updatedStudent: submitRes.student
      });
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-12 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-16 h-16 bg-gradient-to-tr from-cyan-500 to-indigo-600 rounded-full flex items-center justify-center animate-spin shadow-xl">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <p className="text-white font-heading font-black text-xl mt-4">Loading Challenge...</p>
      </div>
    );
  }

  if (!questionsList || questionsList.length === 0) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-12 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="bg-rose-500/10 border border-rose-500/30 p-8 rounded-3xl text-center max-w-md">
          <XCircle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
          <h2 className="text-2xl font-heading font-black text-white mb-2">No Questions Found</h2>
          <p className="text-slate-300 font-body mb-6">We couldn't load the questions for this level. Please check your connection or try another topic.</p>
          <button onClick={() => window.location.reload()} className="btn-game-primary px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold cursor-pointer">
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 font-heading">
      
      {/* GAMEPLAY TOP HUD */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-4 sm:p-5 rounded-3xl text-slate-900 dark:text-white shadow-2xl flex flex-wrap items-center justify-between gap-4 border border-indigo-200/50 dark:border-white/15"
      >
        <div>
          <span className="text-[10px] font-heading font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest block">
            {levelInfo?.title || `LEVEL ${levelInfo?.levelNumber || 1} • ${currentQ?.topicName || 'CHALLENGE'}`}
          </span>
          <h2 className="text-xl font-black font-heading text-slate-900 dark:text-white flex items-center gap-2">
            Question {questionIndex + 1} <span className="text-slate-400 dark:text-slate-500 text-sm font-normal">/ {questionsList.length}</span>
          </h2>
        </div>

        {/* HUD Metrics & Exit Option */}
        <div className="flex items-center gap-3 sm:gap-4 font-heading">
          <div className="flex items-center gap-2 bg-indigo-50 dark:bg-white/5 px-3 py-1.5 rounded-2xl border border-indigo-200 dark:border-white/10">
            <Clock className={`w-5 h-5 ${timer <= 5 ? 'text-rose-500 animate-ping' : 'text-cyan-600 dark:text-cyan-400'}`} />
            <span className={`text-base font-black ${timer <= 5 ? 'text-rose-500' : 'text-slate-900 dark:text-white'}`}>{timer}s</span>
          </div>

          <div className="flex items-center gap-2 bg-amber-500/10 px-3.5 py-1.5 rounded-2xl border border-amber-500/30">
            <Coins className="w-5 h-5 text-amber-500" />
            <span className="text-base font-black text-amber-700 dark:text-amber-300">+{coinsEarned}</span>
          </div>

          <div className="flex items-center gap-2 bg-purple-500/10 px-3.5 py-1.5 rounded-2xl border border-purple-500/30">
            <Trophy className="w-5 h-5 text-purple-400" />
            <span className="text-base font-black text-purple-300">{score} PTS</span>
          </div>

          <button
            onClick={handleExitGame}
            className="px-3.5 py-1.5 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 text-xs font-black border border-rose-500/30 transition-all cursor-pointer"
          >
            EXIT GAME
          </button>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-900 rounded-full h-3 p-0.5 border border-indigo-200/40 dark:border-white/10 overflow-hidden shadow-inner">
        <div 
          className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-amber-400 h-full rounded-full transition-all duration-500"
          style={{ width: `${((questionIndex + 1) / questionsList.length) * 100}%` }}
        />
      </div>

      {/* ================================================== */}
      {/* 1. QUIZ / TIME ATTACK / FORMULA GAME MODES */}
      {/* ================================================== */}
      {(mode === 'quiz' || mode === 'timeattack' || mode === 'formula') && (
        <motion.div 
          key={questionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-6 sm:p-8 space-y-6 rounded-3xl border border-indigo-200/50 dark:border-white/15"
        >
          <div className="flex items-center justify-between">
            <span className="bg-indigo-500/15 dark:bg-cyan-500/20 text-indigo-700 dark:text-cyan-300 text-xs font-heading font-black px-3.5 py-1 rounded-full uppercase tracking-wider border border-indigo-500/30 dark:border-cyan-400/40">
              {mode === 'timeattack' ? '⏱ TIME ATTACK SPEEDWAY' : mode === 'formula' ? '🎯 FORMULA MATCH VAULT' : '⚡ QUICK QUIZ'}
            </span>
            <span className="text-xs font-black text-amber-600 dark:text-amber-400">+{currentQ.xpReward || 50} XP</span>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-3xl border border-indigo-500/30 shadow-xl">
            <h3 className="text-xl sm:text-2xl font-black font-heading leading-snug">
              {currentQ.questionText || currentQ.question}
            </h3>
          </div>

          {/* 4 Interactive Choice Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-heading">
            {(currentQ.options || []).map((opt) => {
              const isSelected = selectedOption === opt.id;
              const isRight = opt.isCorrect;

              let btnStyle = 'bg-white dark:bg-white/5 border border-indigo-200 dark:border-white/15 text-slate-900 dark:text-white hover:border-indigo-600 dark:hover:border-cyan-400 hover:bg-indigo-50/50 dark:hover:bg-white/10 shadow-sm';

              if (isAnswered) {
                if (isRight) {
                  btnStyle = 'bg-emerald-50 dark:bg-emerald-500/20 border-2 border-emerald-500 text-emerald-950 dark:text-emerald-200 shadow-md shadow-emerald-500/20';
                } else if (isSelected && !isRight) {
                  btnStyle = 'bg-rose-50 dark:bg-rose-500/20 border-2 border-rose-500 text-rose-950 dark:text-rose-200 shadow-md';
                } else {
                  btnStyle = 'bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 text-slate-400 opacity-50';
                }
              }

              return (
                <button
                  key={opt.id}
                  disabled={isAnswered}
                  onClick={() => handleOptionClick(opt)}
                  className={`p-5 rounded-2xl font-heading font-extrabold text-left text-base sm:text-lg transition-all duration-200 flex items-center justify-between cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black font-heading ${
                      isAnswered && isRight 
                        ? 'bg-emerald-500 text-white' 
                        : isAnswered && isSelected && !isRight 
                        ? 'bg-rose-500 text-white' 
                        : 'bg-indigo-100 dark:bg-white/10 text-indigo-800 dark:text-cyan-300 border border-indigo-200 dark:border-white/10'
                    }`}>
                      {opt.id}
                    </span>
                    <span>{opt.text}</span>
                  </div>

                  {isAnswered && isRight && (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 animate-bounce" />
                  )}
                  {isAnswered && isSelected && !isRight && (
                    <XCircle className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Solution Explanation Box */}
          {isAnswered && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900 text-white p-5 rounded-2xl space-y-2 shadow-xl border border-amber-400/40"
            >
              <div className="flex items-center gap-2 text-amber-400 font-heading font-black text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-400" /> STEP-BY-STEP SOLUTION EXPLANATION
              </div>
              <p className="text-sm text-slate-200 font-medium leading-relaxed font-body">
                {currentQ.explanation || 'Select the correct option based on fundamental principles.'}
              </p>
            </motion.div>
          )}

        </motion.div>
      )}

      {/* ================================================== */}
      {/* 2. CONCEPT PUZZLE LAB MODE */}
      {/* ================================================== */}
      {mode === 'puzzle' && (
        <div className="glass-card p-6 sm:p-8 space-y-6 rounded-3xl border border-indigo-200/50 dark:border-white/15">
          
          <div className="text-center space-y-2">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-heading font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
              🧩 CONCEPT PUZZLE LAB
            </span>
            <h3 className="text-xl sm:text-2xl font-heading font-black text-slate-900 dark:text-white pt-2">
              {currentQ.questionText || currentQ.question}
            </h3>
          </div>

          {/* Sequence Display Tiles */}
          <div className="flex flex-wrap items-center justify-center gap-4 py-8 bg-slate-900 rounded-3xl text-white border border-white/10 shadow-2xl">
            {(currentQ.sequenceJson?.sequence || (
              currentQ.options ? [currentQ.options[0]?.text, currentQ.options[1]?.text, '?', currentQ.options[3]?.text] : ['A', 'B', '?', 'D']
            )).map((num, idx) => (
              <div
                key={idx}
                className={`min-w-16 h-16 sm:min-w-20 sm:h-20 rounded-2xl text-xl sm:text-2xl font-heading font-black flex items-center justify-center shadow-xl p-3 text-center ${
                  num === '?' 
                    ? 'bg-amber-400 text-slate-950 border-4 border-white animate-pulse shadow-amber-400/50' 
                    : 'bg-white/10 backdrop-blur-md border border-white/20'
                }`}
              >
                {num}
              </div>
            ))}
          </div>

          {/* Choice Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-heading">
            {(currentQ.sequenceJson?.options || (currentQ.options ? currentQ.options.map(o => o.text) : ['Option A', 'Option B', 'Option C', 'Option D'])).map((optText) => {
              const isSelected = selectedOption === optText;
              const rightAns = currentQ.sequenceJson?.answer || currentQ.answer || (currentQ.options?.find(o => o.isCorrect)?.text || optText);
              const isRight = optText === rightAns;

              let style = 'bg-white dark:bg-white/5 border border-indigo-200 dark:border-white/15 hover:border-indigo-600 dark:hover:border-cyan-400 text-slate-900 dark:text-white';
              if (isAnswered) {
                if (isRight) style = 'bg-emerald-50 dark:bg-emerald-500/20 border-2 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-black';
                else if (isSelected) style = 'bg-rose-50 dark:bg-rose-500/20 border-2 border-rose-500 text-rose-950 dark:text-rose-200';
                else style = 'bg-slate-100 dark:bg-slate-900/40 opacity-50';
              }

              return (
                <button
                  key={optText}
                  disabled={isAnswered}
                  onClick={() => handlePuzzleOptionClick(optText)}
                  className={`py-4 px-3 rounded-2xl text-lg sm:text-xl font-heading font-black shadow-md transition-all cursor-pointer ${style}`}
                >
                  {optText}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => { sound.playClick(); setShowHint(!showHint); }}
              className="text-xs font-heading font-extrabold text-indigo-600 dark:text-cyan-300 hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-cyan-400" /> {showHint ? 'Hide Hint' : 'Need a Hint?'}
            </button>
          </div>

          {showHint && (
            <div className="bg-amber-500/10 border border-amber-400/40 p-4 rounded-xl text-xs text-amber-800 dark:text-amber-300 font-semibold font-body">
              💡 {currentQ.sequenceJson?.hint || currentQ.explanation || 'Analyze concept relationships to solve.'}
            </div>
          )}

          {isAnswered && (
            <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-1.5 border border-white/10">
              <span className="text-amber-400 font-heading font-black text-xs block">EXPLANATION</span>
              <p className="text-sm font-medium text-slate-200">{currentQ.explanation || 'Solution step validated successfully.'}</p>
            </div>
          )}

        </div>
      )}

      {/* ================================================== */}
      {/* 3. MEMORY MATCH MATRIX GAME MODE */}
      {/* ================================================== */}
      {mode === 'memory' && (
        <div className="glass-card p-6 sm:p-8 space-y-6 rounded-3xl border border-indigo-200/50 dark:border-white/15">
          
          <div className="text-center space-y-2">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white text-xs font-heading font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
              🧠 MEMORY MATCH MATRIX
            </span>
            <h3 className="text-xl sm:text-2xl font-heading font-black text-slate-900 dark:text-white pt-2">
              Flip tiles to match Concept Questions with their exact evaluated Answers!
            </h3>
          </div>

          {/* Memory Tiles Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4">
            {memoryCards.map((card) => {
              const isFlipped = flippedCards.includes(card.id) || matchedCardIds.includes(card.id);
              const isMatched = matchedCardIds.includes(card.id);

              return (
                <button
                  key={card.id}
                  disabled={isMatched}
                  onClick={() => handleMemoryCardClick(card)}
                  className={`min-h-[110px] p-4 rounded-2xl border font-black text-sm transition-all duration-300 flex items-center justify-center text-center cursor-pointer shadow-lg ${
                    isMatched
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 scale-95 opacity-80'
                      : isFlipped
                      ? 'bg-gradient-to-br from-indigo-900 to-slate-900 border-cyan-400 text-white scale-105'
                      : 'bg-slate-900/80 border-white/15 text-slate-400 hover:bg-slate-800 hover:border-white/30'
                  }`}
                >
                  {isFlipped ? (
                    <span className="leading-snug">{card.content}</span>
                  ) : (
                    <div className="flex flex-col items-center gap-1.5">
                      <Brain className="w-8 h-8 text-indigo-400" />
                      <span className="text-[10px] tracking-widest text-slate-400 uppercase font-black">FLIP TILE #{card.id}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {memoryCompleted && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-500/20 border border-emerald-400 p-5 rounded-2xl text-center text-emerald-200 font-black space-y-1"
            >
              <h4 className="text-xl text-emerald-300">🎉 MATRIX MATCH COMPLETE!</h4>
              <p className="text-xs text-slate-200 font-normal">All concept tiles matched successfully. +180 XP & +35 Coins earned!</p>
            </motion.div>
          )}

        </div>
      )}

      {/* ================================================== */}
      {/* 4. DRAG AND DROP STEP REORDER MODE */}
      {/* ================================================== */}
      {mode === 'dragdrop' && (
        <div className="glass-card p-6 sm:p-8 space-y-6 rounded-3xl border border-indigo-200/50 dark:border-white/15">
          
          <div className="bg-slate-900 text-white p-5 rounded-2xl border border-indigo-500/30">
            <span className="text-xs font-heading font-black text-cyan-400 uppercase tracking-widest block mb-1">
              INTERACTIVE PROOF REORDER
            </span>
            <h3 className="text-xl font-heading font-black text-white">
              {currentQ.questionText || currentQ.question}
            </h3>
          </div>

          {/* Reorderable Steps List */}
          <div className="space-y-3 font-heading">
            {dragDropOrder.map((stepText, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-white dark:bg-white/5 border border-indigo-200 dark:border-white/15 rounded-2xl shadow-md hover:border-indigo-600 dark:hover:border-cyan-400 transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white font-heading font-black text-sm flex items-center justify-center shadow-md shrink-0">
                    Step {idx + 1}
                  </span>
                  <span className="font-heading font-extrabold text-slate-900 dark:text-white text-base">{stepText}</span>
                </div>

                {!dragDropVerified && (
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      disabled={idx === 0}
                      onClick={() => moveStep(idx, 'up')}
                      className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg disabled:opacity-30 cursor-pointer"
                    >
                      <MoveUp className="w-5 h-5 text-indigo-600 dark:text-cyan-400" />
                    </button>
                    <button
                      disabled={idx === dragDropOrder.length - 1}
                      onClick={() => moveStep(idx, 'down')}
                      className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg disabled:opacity-30 cursor-pointer"
                    >
                      <MoveDown className="w-5 h-5 text-indigo-600 dark:text-cyan-400" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Submit Verification Button */}
          {!dragDropVerified ? (
            <button
              onClick={handleVerifyDragDrop}
              className="btn-game-gold w-full py-4 text-base shadow-xl cursor-pointer"
            >
              VERIFY SOLUTION ORDER
            </button>
          ) : (
            <div className={`p-4 rounded-2xl text-center font-heading font-black ${
              dragDropIsCorrect ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-950 dark:text-emerald-200 border border-emerald-400' : 'bg-rose-100 dark:bg-rose-500/20 text-rose-950 dark:text-rose-200 border border-rose-400'
            }`}>
              {dragDropIsCorrect ? '🎉 PERFECT ORDER! PROOF STEPS VALIDATED!' : '❌ INCORRECT SEQUENCE. RE-TRY THE PROOF STEPS.'}
            </div>
          )}

        </div>
      )}

      {/* FOOTER ACTION AREA */}
      {(isAnswered || dragDropVerified || memoryCompleted) && (
        <div className="flex justify-end font-heading">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleNext}
            className="btn-game-gold text-lg px-9 py-4 shadow-2xl flex items-center gap-2 group cursor-pointer"
          >
            <span>{questionIndex + 1 === questionsList.length ? 'FINISH MISSION' : 'NEXT QUESTION'}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      )}

    </div>
  );
}
