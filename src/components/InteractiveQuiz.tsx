import React, { useState } from 'react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/quizData';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, Lightbulb, Award, ArrowLeft, ArrowRight, Printer } from 'lucide-react';

export const InteractiveQuiz: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const filteredQuestions = selectedCategory === 'all'
    ? QUIZ_QUESTIONS
    : QUIZ_QUESTIONS.filter((q) => q.category === selectedCategory);

  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0];
  const totalQuestions = filteredQuestions.length;

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    // Record answer
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
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

  const answeredCount = Object.keys(userAnswers).filter((id) =>
    filteredQuestions.some((q) => q.id === Number(id))
  ).length;

  const score = calculateScore();
  const percentage = Math.round((score / totalQuestions) * 100);

  const handleResetQuiz = () => {
    setUserAnswers({});
    setCurrentIndex(0);
    setShowResults(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
      {/* Quiz Top Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            اختبار Quiz التفاعلي مع التصحيح الفوري
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            اختبر فهمك لمفاهيم HTML, CSS, Git, GitHub والبورتفوليو مع تعليلات مفصلة
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/60 dark:bg-slate-800 rounded-lg text-xs">
          {[
            { id: 'all', label: 'الكل (16)' },
            { id: 'html-css', label: 'HTML & CSS' },
            { id: 'git-github', label: 'Git & GitHub' },
            { id: 'portfolio', label: 'Portfolio' },
            { id: 'integration', label: 'دورة العمل' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setCurrentIndex(0);
                setShowResults(false);
              }}
              className={`px-2.5 py-1 font-medium rounded-md transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Metric Bar */}
      <div className="w-full bg-slate-100 dark:bg-slate-800/80 h-1.5">
        <div
          className="bg-sky-500 h-1.5 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {!showResults ? (
        <div className="p-6">
          {/* Status & Category */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4">
            <span className="font-mono text-sky-600 dark:text-sky-400 font-semibold">
              السؤال {currentIndex + 1} من {totalQuestions}
            </span>
            <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300 font-medium">
              {currentQ.categoryName}
            </span>
            <span className="tabular-nums">
              تمت الإجابة: {answeredCount} / {totalQuestions}
            </span>
          </div>

          {/* Question Text */}
          <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-6 leading-relaxed">
            {currentQ.question}
          </h4>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map((option, idx) => {
              const hasAnswered = userAnswers[currentQ.id] !== undefined;
              const isSelected = userAnswers[currentQ.id] === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let optionStyle = 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-950/40 text-slate-800 dark:text-slate-200';

              if (hasAnswered) {
                if (isCorrect) {
                  optionStyle = 'border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-semibold ring-1 ring-emerald-500';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'border-rose-500 bg-rose-500/10 text-rose-800 dark:text-rose-300 line-through';
                } else {
                  optionStyle = 'opacity-60 border-slate-200 dark:border-slate-800';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(currentQ.id, idx)}
                  className={`w-full text-right p-4 rounded-xl border transition-all text-sm flex items-start justify-between gap-3 ${optionStyle}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mt-0.5">
                      {['أ', 'ب', 'ج', 'د'][idx]}
                    </span>
                    <span className="leading-relaxed">{option}</span>
                  </div>

                  {hasAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  )}
                  {hasAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Immediate Explanation Card if answered */}
          {userAnswers[currentQ.id] !== undefined && (
            <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <HelpCircle className="w-4 h-4 text-sky-500" />
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  التصحيح والتعليل النموذجي:
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                {currentQ.explanation}
              </p>

              <div className="flex items-start gap-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs text-amber-700 dark:text-amber-400">
                <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  <strong className="font-semibold">نصيحة المطور: </strong>
                  {currentQ.tip}
                </span>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              <span>السابق</span>
            </button>

            {currentIndex < totalQuestions - 1 ? (
              <button
                onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-sky-600 text-white rounded-lg hover:bg-sky-500 transition-colors"
              >
                <span>التالي</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setShowResults(true)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors"
              >
                <span>عرض النتيجة النهائية</span>
                <Award className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 mx-auto flex items-center justify-center mb-4">
            <Award className="w-8 h-8" />
          </div>

          <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
            ملخص أدائك في الاختبار
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            راجعت كل المفاهيم الأساسية في تطوير الويب والتحكم في الإصدارات
          </p>

          <div className="inline-flex items-baseline gap-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-6 py-4 rounded-2xl mb-6">
            <span className="text-4xl font-extrabold text-sky-600 dark:text-sky-400 font-mono">
              {score}
            </span>
            <span className="text-lg text-slate-400 font-mono">/ {totalQuestions}</span>
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 mr-3">
              ({percentage}%)
            </span>
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-300 max-w-md mx-auto mb-8">
            {percentage >= 80
              ? 'ممتاز جداً! لديك استيعاب قوي للهندسة المعمارية لصفحات الويب والفرق بين Git و GitHub وكيفية استغلالها لبناء البورتفوليو.'
              : percentage >= 50
              ? 'أداء جيد! لقد فهمت المبادئ الأساسية، وننصح بمراجعة فصول الـ CSS و Git لترسيخ المفاهيم أكثر.'
              : 'بداية التعلم! راجع فصول الدليل المنظم والشروحات بالدارجة وكرر الاختبار لتصل للاحتراف.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleResetQuiz}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold bg-sky-600 text-white rounded-lg hover:bg-sky-500 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة الاختبار من البداية</span>
            </button>
            <button
              onClick={() => {
                setShowResults(false);
                setCurrentIndex(0);
              }}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <span>مراجعة الأسئلة سؤالاً بسؤال</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
