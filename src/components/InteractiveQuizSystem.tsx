import React, { useState, useEffect } from 'react';
import { COMPREHENSIVE_QUIZ_BANK, ExtendedQuizQuestion } from '../data/quizBank';
import { Language, translations } from '../data/translations';
import { useAuth } from '../context/AuthContext';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Timer,
  Award,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Lightbulb,
  Check,
  Zap
} from 'lucide-react';

interface InteractiveQuizSystemProps {
  lang: Language;
  onSaveQuizResult?: (score: number, total: number, tech: string) => void;
}

export const InteractiveQuizSystem: React.FC<InteractiveQuizSystemProps> = ({
  lang,
  onSaveQuizResult
}) => {
  const t = translations[lang];
  const langKey = lang === 'ar' ? 'ar' : 'en';
  const { user, recordQuizAttempt } = useAuth();

  const [activeTech, setActiveTech] = useState<'all' | 'html' | 'css' | 'git' | 'github'>('all');
  const [activeDifficulty, setActiveDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isTimerEnabled, setIsTimerEnabled] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [pointAwarded, setPointAwarded] = useState<boolean>(false);

  const filteredQuestions = COMPREHENSIVE_QUIZ_BANK.filter((q) => {
    const matchTech = activeTech === 'all' || q.technology === activeTech;
    const matchDiff = activeDifficulty === 'all' || q.difficulty === activeDifficulty;
    return matchTech && matchDiff;
  });

  const totalQuestions = filteredQuestions.length;
  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0];

  // Timer countdown
  useEffect(() => {
    if (!isTimerEnabled || showResults || !currentQ) return;
    if (userAnswers[currentQ.id] !== undefined) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto select wrong or timeout
          setUserAnswers((ans) => ({
            ...ans,
            [currentQ.id]: -1
          }));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, isTimerEnabled, showResults, currentQ, userAnswers]);

  // Reset timer on question change
  useEffect(() => {
    setTimeLeft(30);
  }, [currentIndex]);

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (userAnswers[questionId] !== undefined) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx
    }));

    if (user) {
      recordQuizAttempt(questionId, optionIdx).then((res) => {
        if (res.earnedPoint) {
          setPointAwarded(true);
          setTimeout(() => setPointAwarded(false), 3500);
        }
      }).catch((error) => {
        console.error('Failed to record quiz attempt:', error);
      });
    }
  };

  const calculateScore = () => {
    let score = 0;
    filteredQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const score = calculateScore();
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  const handleFinish = () => {
    setShowResults(true);
    if (onSaveQuizResult) {
      onSaveQuizResult(score, totalQuestions, activeTech);
    }
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setCurrentIndex(0);
    setShowResults(false);
    setTimeLeft(30);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
      {/* Animated +1 POINT floating badge */}
      {pointAwarded && (
        <div className="absolute top-4 right-4 z-50 animate-bounce flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400 text-slate-950 font-black font-mono text-xs shadow-[0_0_25px_rgba(251,191,36,0.8)] border border-yellow-200">
          <Zap className="w-4 h-4 fill-slate-950 text-slate-950" />
          <span>+1 POINT!</span>
        </div>
      )}

      {/* Top Filter and Controls Bar */}
      <div className="p-5 border-b border-slate-800 bg-slate-950/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sky-400" />
              {t.quizTitle}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">{t.quizSubtitle}</p>
          </div>

          {/* Timer Toggle */}
          <button
            onClick={() => setIsTimerEnabled(!isTimerEnabled)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
              isTimerEnabled
                ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <Timer className="w-3.5 h-3.5" />
            <span>{t.timer}: {isTimerEnabled ? (lang === 'ar' ? 'مفعل' : 'ON') : (lang === 'ar' ? 'معطل' : 'OFF')}</span>
          </button>
        </div>

        {/* Technology Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs overflow-x-auto">
            {[
              { id: 'all', label: t.allCategories },
              { id: 'html', label: 'HTML5' },
              { id: 'css', label: 'CSS3' },
              { id: 'git', label: 'Git' },
              { id: 'github', label: 'GitHub' }
            ].map((tech) => (
              <button
                key={tech.id}
                onClick={() => {
                  setActiveTech(tech.id as any);
                  setCurrentIndex(0);
                  setShowResults(false);
                }}
                className={`px-3 py-1 rounded-md font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  activeTech === tech.id
                    ? 'bg-sky-500 text-white shadow-xs font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {tech.label}
              </button>
            ))}
          </div>

          {/* Difficulty Filters */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs">
            {[
              { id: 'all', label: t.allCategories },
              { id: 'beginner', label: t.beginner },
              { id: 'intermediate', label: t.intermediate },
              { id: 'advanced', label: t.advanced }
            ].map((diff) => (
              <button
                key={diff.id}
                onClick={() => {
                  setActiveDifficulty(diff.id as any);
                  setCurrentIndex(0);
                  setShowResults(false);
                }}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  activeDifficulty === diff.id
                    ? 'bg-purple-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {diff.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800/80 h-1.5">
        <div
          className="bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500 h-1.5 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Main Question Flow or Final Results */}
      {!showResults && currentQ ? (
        <div className="p-6 sm:p-8 space-y-6">
          {/* Header Stats */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono text-sky-400 font-bold">
              {lang === 'ar' ? `السؤال ${currentIndex + 1} من ${totalQuestions}` : `Question ${currentIndex + 1} of ${totalQuestions}`}
            </span>

            <span className="bg-slate-800 px-2.5 py-1 rounded border border-slate-700 text-slate-300 font-mono">
              {currentQ.categoryName[langKey]} · {currentQ.difficulty}
            </span>

            {isTimerEnabled && (
              <span className={`font-mono font-bold px-2 py-0.5 rounded ${
                timeLeft <= 5 ? 'bg-rose-950 text-rose-400 animate-pulse' : 'bg-slate-800 text-amber-300'
              }`}>
                ⏳ {timeLeft}s
              </span>
            )}
          </div>

          {/* Question Text */}
          <h4 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
            {currentQ.question[langKey]}
          </h4>

          {/* Code Snippet if present */}
          {currentQ.codeSnippet && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 font-mono text-xs sm:text-sm text-sky-300 text-left" dir="ltr">
              <code>{currentQ.codeSnippet}</code>
            </div>
          )}

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQ.options[langKey].map((opt, oIdx) => {
              const hasAnswered = userAnswers[currentQ.id] !== undefined;
              const isSelected = userAnswers[currentQ.id] === oIdx;
              const isCorrect = oIdx === currentQ.correctIndex;

              let style = 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-200';

              if (hasAnswered) {
                if (isCorrect) {
                  style = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold ring-1 ring-emerald-500';
                } else if (isSelected && !isCorrect) {
                  style = 'bg-rose-500/20 border-rose-500 text-rose-300 line-through';
                } else {
                  style = 'opacity-40 border-slate-800';
                }
              }

              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(currentQ.id, oIdx)}
                  disabled={hasAnswered}
                  className={`w-full text-start p-4 rounded-xl border transition-all text-xs sm:text-sm flex items-start justify-between gap-3 ${style}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center font-mono text-xs font-bold shrink-0 text-slate-300 mt-0.5">
                      {['A', 'B', 'C', 'D'][oIdx]}
                    </span>
                    <span className="leading-relaxed">{opt}</span>
                  </div>

                  {hasAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  {hasAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation if answered */}
          {userAnswers[currentQ.id] !== undefined && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  {t.explanation}:
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentQ.explanation[langKey]}
              </p>

              <div className="pt-2 border-t border-slate-800 flex items-start gap-2 text-xs text-amber-400">
                <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-amber-300">{t.proTip}: </strong>
                  {currentQ.proTip[langKey]}
                </p>
              </div>
            </div>
          )}

          {/* Controls Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-400 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              {lang === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              <span>{t.previous}</span>
            </button>

            {currentIndex < totalQuestions - 1 ? (
              <button
                onClick={() => setCurrentIndex((prev) => prev + 1)}
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white rounded-lg transition-colors cursor-pointer"
              >
                <span>{t.nextQuestion}</span>
                {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors cursor-pointer"
              >
                <span>{t.viewResults}</span>
                <Award className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : showResults ? (
        /* Results View */
        <div className="p-8 sm:p-12 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-purple-600 text-white mx-auto flex items-center justify-center shadow-lg shadow-sky-500/20">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h4 className="text-2xl font-extrabold text-white">
              {lang === 'ar' ? 'تقرير نتيجة الاختبار النهائي' : 'Final Assessment Report'}
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              {lang === 'ar'
                ? 'ملخص دقيق لإجاباتك ونسبة استيعابك للمفاهيم التقنية'
                : 'Audited performance summary across all evaluated topics'}
            </p>
          </div>

          <div className="inline-flex items-baseline gap-3 bg-slate-950 px-8 py-5 rounded-2xl border border-slate-800 shadow-inner">
            <span className="text-5xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-400">
              {score}
            </span>
            <span className="text-xl font-mono text-slate-500">/ {totalQuestions}</span>
            <span className="text-sm font-bold text-slate-300 font-mono">
              ({percentage}%)
            </span>
          </div>

          <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            {percentage >= 80
              ? lang === 'ar'
                ? 'أداء استثنائي! استيعابك لمعايير HTML و CSS و Git و GitHub يؤهلك لبدء بناء مشاريع حقيقية والمنافسة في سوق العمل.'
                : 'Outstanding mastery! Your grasp of HTML, CSS, Git, and GitHub sets you up for production excellence.'
              : percentage >= 50
              ? lang === 'ar'
                ? 'مستوى جيد جداً! لديك أساس قوي، وننصحك بمراجعة الأسئلة التي تعثرت بها لترسيخ المفاهيم أكثر.'
                : 'Great effort! Solid foundational grasp; review missed questions to solidify edge cases.'
              : lang === 'ar'
              ? 'بداية الطريق! راجع الفصول التعليمية وأعد الاختبار حتى تصل إلى درجة الاحتراف.'
              : 'Keep practicing! Re-read the interactive lessons and test your knowledge again.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={handleResetQuiz}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white rounded-xl shadow-md transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.retryQuiz}</span>
            </button>
            <button
              onClick={() => {
                setShowResults(false);
                setCurrentIndex(0);
              }}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition-all cursor-pointer"
            >
              <span>{lang === 'ar' ? 'مراجعة كل الإجابات' : 'Review All Answers'}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center text-slate-400 text-sm">
          {t.searchNoResults}
        </div>
      )}
    </div>
  );
};
