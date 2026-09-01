import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Coins, Sparkles, CheckCircle2, XCircle, ArrowRight, HelpCircle, MoveUp, MoveDown, Trophy, Zap } from 'lucide-react';
import { gameService } from '../services/gameService';
import { sound } from '../utils/sound';

export default function GameplayScreen({ mode = 'quiz', levelInfo, classStandard, subjectId, chapterId, topicId, onCompleteGame }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timer, setTimer] = useState(30);
  const [userAnswers, setUserAnswers] = useState([]);
  const [questionsList, setQuestionsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  // MCQ state
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Puzzle hint state
  const [showHint, setShowHint] = useState(false);

  // Drag Drop State
  const [dragDropOrder, setDragDropOrder] = useState([]);
  const [dragDropVerified, setDragDropVerified] = useState(false);
  const [dragDropIsCorrect, setDragDropIsCorrect] = useState(false);

  const currentQ = questionsList.length > 0 ? (questionsList[questionIndex] || questionsList[0]) : null;

  // Initialize Drag and drop steps if dragdrop mode
  useEffect(() => {
    if (mode === 'dragdrop' && currentQ && (currentQ.sequenceJson?.initialShuffled || currentQ.initialShuffled)) {
      setDragDropOrder([...(currentQ.sequenceJson?.initialShuffled || currentQ.initialShuffled)]);
      setDragDropVerified(false);
    }
  }, [questionIndex, mode, currentQ]);

  // Countdown timer effect
  useEffect(() => {
    if (isAnswered || dragDropVerified) return;
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
  }, [questionIndex, isAnswered, dragDropVerified]);

  const handleTimeOut = () => {
    if (!isAnswered && !dragDropVerified) {
      sound.playWrong();
      setIsAnswered(true);

      const correctOpt = currentQ.options ? currentQ.options.find((o) => o.isCorrect) : null;
      setUserAnswers((prev) => [
        ...prev,
        {
          questionNumber: questionIndex + 1,
          question: currentQ.questionText || currentQ.question || 'Maths Problem',
          userAnswer: 'Time Expired (No Answer)',
          correctAnswer: correctOpt ? `${correctOpt.id}: ${correctOpt.text}` : (currentQ.sequenceJson?.answer || currentQ.answer || 'N/A'),
          isCorrect: false,
          marks: 0,
          explanation: currentQ.explanation || ''
        }
      ]);
    }
  };

  // MCQ option click handler
  const handleOptionClick = (option) => {
    if (isAnswered) return;
    setSelectedOption(option.id);
    setIsAnswered(true);

    const isRight = Boolean(option.isCorrect);
    const correctOpt = currentQ.options ? currentQ.options.find((o) => o.isCorrect) : null;

    if (isRight) {
      sound.playCorrect();
      setScore((prev) => prev + 100);
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
        question: currentQ.questionText || currentQ.question || 'Maths Problem',
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
    const isRight = optText === (currentQ.sequenceJson?.answer || currentQ.answer);
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
        question: currentQ.questionText || currentQ.question || 'Number Sequence Puzzle',
        userAnswer: String(optText),
        correctAnswer: String(currentQ.sequenceJson?.answer || currentQ.answer),
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
    const correctOrder = currentQ.sequenceJson?.correctOrder || currentQ.correctOrder;
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
        question: currentQ.questionText || currentQ.question || 'Proof Reorder Lab',
        userAnswer: dragDropOrder.join(' ➔ '),
        correctAnswer: (currentQ.sequenceJson?.correctOrder || currentQ.correctOrder) ? (currentQ.sequenceJson?.correctOrder || currentQ.correctOrder).join(' ➔ ') : 'N/A',
        isCorrect: isCorrectOrder,
        marks: isCorrectOrder ? 150 : 0,
        explanation: 'Proof steps sequence order verification'
      }
    ]);
  };

  const handleNext = async () => {
    sound.playClick();
    if (questionIndex + 1 < questionsList.length) {
      setQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
      setTimer(30);
    } else {
      // Submit game session to backend
      let submitRes = {};
      try {
        submitRes = await gameService.submitGame(mode, {
          answers: userAnswers,
          timeTakenSeconds: 105
        }) || {};
      } catch (err) {}

      const totalQ = questionsList.length;
      const finalCorrect = correctCount;
      const finalWrong = Math.max(0, totalQ - finalCorrect);
      const actualAccuracy = Math.round((finalCorrect / (totalQ || 1)) * 100);

      onCompleteGame({
        score: score,
        correctCount: finalCorrect,
        wrongCount: finalWrong,
        totalQuestions: totalQ,
        accuracyPct: actualAccuracy,
        xpEarned: xpEarned || (finalCorrect * 50),
        coinsEarned: coinsEarned || (finalCorrect * 20),
        timeTaken: '01:45',
        levelUp: submitRes.levelUp || false,
        newLevel: submitRes.newLevel,
        previousLevel: submitRes.previousLevel,
        questionsDetail: userAnswers
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
          <button onClick={() => window.location.reload()} className="btn-game-primary px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold">
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* GAMEPLAY TOP HUD */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-4 sm:p-5 rounded-3xl text-slate-900 dark:text-white shadow-2xl flex flex-wrap items-center justify-between gap-4 border border-indigo-200/50 dark:border-white/15"
      >
        
        {/* Level & Question info */}
        <div>
          <span className="text-[10px] font-heading font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest block">
            {levelInfo?.title || 'LEVEL 3 • ALGEBRA ARENA'}
          </span>
          <h2 className="text-xl font-heading font-black tracking-wide text-slate-900 dark:text-white">
            Question {questionIndex + 1} / {questionsList.length}
          </h2>
        </div>

        {/* Score & Coins Badges */}
        <div className="flex items-center gap-3 font-heading">
          
          <div className="bg-indigo-50 dark:bg-white/10 px-3.5 py-2 rounded-xl border border-indigo-200 dark:border-white/15 text-xs font-black flex items-center gap-1.5 shadow-sm text-indigo-900 dark:text-white">
            <Trophy className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            <span>SCORE {score}</span>
          </div>

          <div className="bg-amber-500/10 dark:bg-amber-400/20 text-amber-700 dark:text-amber-300 px-3.5 py-2 rounded-xl border border-amber-500/30 dark:border-amber-400/40 text-xs font-black flex items-center gap-1.5 shadow-sm">
            <Coins className="w-4 h-4 text-amber-500 dark:text-amber-400 fill-amber-400" />
            <span>+{coinsEarned}</span>
          </div>

          {/* Countdown Timer */}
          <div className={`px-4 py-2 rounded-xl font-heading font-black text-sm flex items-center gap-2 shadow-md transition-colors ${
            timer <= 5 ? 'bg-rose-600 text-white animate-bounce' : 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white'
          }`}>
            <Clock className="w-4 h-4" />
            <span>00:{timer < 10 ? `0${timer}` : timer}</span>
          </div>

        </div>

      </motion.div>

      {/* ================================================== */}
      {/* 1. QUIZ / TIME ATTACK / FORMULA MCQ MODES */}
      {/* ================================================== */}
      {(mode === 'quiz' || mode === 'timeattack' || mode === 'formula') && (
        <motion.div 
          key={questionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-6 sm:p-8 space-y-6 rounded-3xl border border-indigo-200/50 dark:border-white/15 shadow-2xl"
        >
          
          {/* Question Text Card */}
          <div className="bg-slate-900 dark:bg-slate-900/90 text-white border border-indigo-500/30 dark:border-cyan-400/30 p-6 rounded-2xl shadow-xl">
            <span className="text-xs font-heading font-black text-cyan-400 uppercase tracking-widest block mb-1.5 flex items-center gap-1">
              <Zap className="w-4 h-4 text-amber-400" /> {
                mode === 'timeattack' ? '⏱️ TIME ATTACK SPEEDWAY' : mode === 'formula' ? '🏆 FORMULA MATCH VAULT' : '⚡ QUICK QUIZ ARENA'
              } — QUESTION {questionIndex + 1} OF {questionsList.length}
            </span>
            <h3 className="text-xl sm:text-2xl font-heading font-black text-white leading-relaxed">
              {currentQ.questionText || currentQ.question}
            </h3>
          </div>

          {/* 4 Large Interactive Answer Cards */}
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
      {/* 2. PUZZLE / MEMORY GAME MODES */}
      {/* ================================================== */}
      {(mode === 'puzzle' || mode === 'memory') && (
        <div className="glass-card p-6 sm:p-8 space-y-6 rounded-3xl border border-indigo-200/50 dark:border-white/15">
          
          <div className="text-center space-y-2">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-heading font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
              {mode === 'memory' ? '🧠 MEMORY MATCH MATRIX' : '🧩 CONCEPT PUZZLE LAB'}
            </span>
            <h3 className="text-xl sm:text-2xl font-heading font-black text-slate-900 dark:text-white pt-2">
              {currentQ.questionText || currentQ.question}
            </h3>
          </div>

          {/* Sequence Display Tiles */}
          <div className="flex flex-wrap items-center justify-center gap-4 py-8 bg-slate-900 rounded-3xl text-white border border-white/10 shadow-2xl">
            {(currentQ.sequenceJson?.sequence || currentQ.sequence || (
              currentQ.options ? [currentQ.options[0]?.text, currentQ.options[1]?.text, '?', currentQ.options[3]?.text] : ['2', '4', '?', '8']
            )).map((num, idx) => (
              <div
                key={idx}
                className={`w-18 h-18 sm:w-22 sm:h-22 rounded-2xl text-2xl sm:text-3xl font-heading font-black flex items-center justify-center shadow-xl p-2 text-center ${
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

          {/* Hint Trigger Button */}
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
              💡 {currentQ.sequenceJson?.hint || currentQ.hint || currentQ.explanation || 'Analyze the concept patterns to solve.'}
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
      {/* 3. DRAG AND DROP STEP REORDER MODE */}
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
            {currentQ.problemStatement && (
              <p className="text-sm font-bold text-cyan-200 mt-1 font-body">
                {currentQ.problemStatement}
              </p>
            )}
          </div>

          {/* Reorderable Steps List */}
          <div className="space-y-3 font-heading">
            {(dragDropOrder.length > 0 ? dragDropOrder : (currentQ.options ? currentQ.options.map(o => o.text) : ['Step 1', 'Step 2', 'Step 3', 'Step 4'])).map((stepText, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-white dark:bg-white/5 border border-indigo-200 dark:border-white/15 rounded-2xl shadow-md hover:border-indigo-600 dark:hover:border-cyan-400 transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white font-heading font-black text-sm flex items-center justify-center shadow-md">
                    Step {idx + 1}
                  </span>
                  <span className="font-heading font-extrabold text-slate-900 dark:text-white text-base">{stepText}</span>
                </div>

                {!dragDropVerified && (
                  <div className="flex items-center gap-1">
                    <button
                      disabled={idx === 0}
                      onClick={() => moveStep(idx, 'up')}
                      className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg disabled:opacity-30 cursor-pointer"
                    >
                      <MoveUp className="w-5 h-5 text-indigo-600 dark:text-cyan-400" />
                    </button>
                    <button
                      disabled={idx === (dragDropOrder.length || 4) - 1}
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
      {(isAnswered || dragDropVerified) && (
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
