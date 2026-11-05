import React, { useState } from 'react';
import { Lesson, HTML_LESSONS, CSS_LESSONS, GITHUB_LESSONS } from '../data/coursesData';
import { Language, translations } from '../data/translations';
import {
  CheckCircle2,
  Bookmark,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  Code,
  Terminal,
  AlertTriangle,
  Lightbulb,
  Play,
  RotateCcw
} from 'lucide-react';

interface CourseViewerProps {
  courseType: 'html' | 'css' | 'github';
  initialLessonId?: string;
  lang: Language;
  completedLessons: string[];
  bookmarkedLessons: string[];
  onToggleComplete: (lessonId: string) => void;
  onToggleBookmark: (lessonId: string) => void;
  onOpenInPlayground: (code: { html?: string; css?: string }) => void;
}

export const CourseViewer: React.FC<CourseViewerProps> = ({
  courseType,
  initialLessonId,
  lang,
  completedLessons,
  bookmarkedLessons,
  onToggleComplete,
  onToggleBookmark,
  onOpenInPlayground
}) => {
  const t = translations[lang];

  // Retrieve course lessons
  let lessons: any[] = [];
  if (courseType === 'html') {
    lessons = HTML_LESSONS;
  } else if (courseType === 'css') {
    lessons = CSS_LESSONS;
  } else {
    lessons = GITHUB_LESSONS;
  }

  const [activeLessonIndex, setActiveLessonIndex] = useState(() => {
    if (initialLessonId) {
      const idx = lessons.findIndex((l) => l.id === initialLessonId);
      if (idx !== -1) return idx;
    }
    return 0;
  });

  const [copiedCode, setCopiedCode] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [miniQuizAnswer, setMiniQuizAnswer] = useState<number | null>(null);

  const currentLesson = lessons[activeLessonIndex] || lessons[0];
  const isCompleted = completedLessons.includes(currentLesson.id);
  const isBookmarked = bookmarkedLessons.includes(currentLesson.id);

  const completedCount = lessons.filter((l) => completedLessons.includes(l.id)).length;
  const progressPercent = Math.round((completedCount / lessons.length) * 100);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleNext = () => {
    if (activeLessonIndex < lessons.length - 1) {
      setActiveLessonIndex((prev) => prev + 1);
      setShowSolution(false);
      setMiniQuizAnswer(null);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (activeLessonIndex > 0) {
      setActiveLessonIndex((prev) => prev - 1);
      setShowSolution(false);
      setMiniQuizAnswer(null);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Lesson Selector */}
        <aside className="lg:col-span-4 sticky top-24 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
            
            {/* Course Header & Progress */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white uppercase tracking-wide">
                  {courseType === 'html'
                    ? t.htmlCourse
                    : courseType === 'css'
                    ? t.cssCourse
                    : t.githubCourse}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {lessons.length} {t.lessons} · {completedCount} {t.completed}
                </p>
              </div>
              <span className="text-sm font-mono font-bold text-sky-400">
                {progressPercent}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden my-3">
              <div
                className="bg-gradient-to-r from-sky-400 to-purple-500 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Lesson List */}
            <div className="max-h-[60vh] overflow-y-auto space-y-1.5 pr-1 mt-3">
              {lessons.map((lesson, idx) => {
                const isCurrent = idx === activeLessonIndex;
                const isDone = completedLessons.includes(lesson.id);
                return (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      setActiveLessonIndex(idx);
                      setShowSolution(false);
                      setMiniQuizAnswer(null);
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }}
                    className={`w-full text-start p-3 rounded-xl transition-all flex items-center justify-between gap-2 text-xs font-medium ${
                      isCurrent
                        ? 'bg-sky-500/20 border border-sky-500 text-sky-300 shadow-sm'
                        : 'bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/80 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="font-mono text-slate-500 shrink-0 text-[11px]">
                        {lesson.order < 10 ? `0${lesson.order}` : lesson.order}
                      </span>
                      <span className="truncate">{lesson.title[lang]}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {isDone && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Lesson Body */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            
            {/* Lesson Header Ribbon */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-sky-400 bg-sky-950 px-2.5 py-1 rounded border border-sky-800/80">
                  {currentLesson.duration || '15 min'}
                </span>
                <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-medium">
                  {currentLesson.difficulty === 'beginner'
                    ? t.beginner
                    : currentLesson.difficulty === 'intermediate'
                    ? t.intermediate
                    : t.advanced}
                </span>
              </div>

              {/* Action Buttons: Mark Complete & Bookmark */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleBookmark(currentLesson.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    isBookmarked
                      ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400' : ''}`} />
                  <span>{isBookmarked ? t.bookmarked : t.bookmark}</span>
                </button>

                <button
                  onClick={() => onToggleComplete(currentLesson.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    isCompleted
                      ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300'
                      : 'bg-sky-600 hover:bg-sky-500 border-sky-500 text-white'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isCompleted ? t.completed : t.markCompleted}</span>
                </button>
              </div>
            </div>

            {/* Title */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {currentLesson.title[lang]}
              </h2>
              {/* Secondary language title subtitle */}
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">
                {lang === 'ar' ? currentLesson.title.en : currentLesson.title.ar}
              </p>
            </div>

            {/* Primary Explanation */}
            <div className="text-sm sm:text-base text-slate-200 leading-relaxed space-y-3 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
              <p>{currentLesson.explanation[lang]}</p>
              <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-400 italic">
                <span className="font-semibold text-slate-300">
                  {lang === 'ar' ? 'الترجمة الإنجليزية: ' : 'Arabic Translation: '}
                </span>
                {lang === 'ar' ? currentLesson.explanation.en : currentLesson.explanation.ar}
              </div>
            </div>

            {/* Syntax Box if available */}
            {currentLesson.syntax && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  {t.syntax}
                </h4>
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 font-mono text-xs sm:text-sm text-sky-300 text-left" dir="ltr">
                  <code>{currentLesson.syntax}</code>
                </div>
              </div>
            )}

            {/* Code Example with Copy & Playground Launcher */}
            {currentLesson.codeExample && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5" />
                    {lang === 'ar' ? 'مثال الكود الحقيقي' : 'Practical Code Example'}
                  </h4>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        onOpenInPlayground({
                          html: currentLesson.codeExample.html,
                          css: currentLesson.codeExample.css
                        })
                      }
                      className="flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 px-2 py-1 rounded bg-sky-950 border border-sky-800 transition-colors"
                    >
                      <Play className="w-3 h-3 fill-sky-400" />
                      <span>{t.openInPlayground}</span>
                    </button>

                    <button
                      onClick={() =>
                        handleCopy(
                          currentLesson.codeExample.html ||
                            currentLesson.codeExample.css ||
                            currentLesson.codeExample.command ||
                            ''
                        )
                      }
                      className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 border border-slate-700 transition-colors"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? t.copied : t.copyCode}</span>
                    </button>
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto text-left" dir="ltr">
                  <pre>
                    <code>
                      {currentLesson.codeExample.html ||
                        currentLesson.codeExample.css ||
                        currentLesson.codeExample.command}
                    </code>
                  </pre>
                </div>
                <p className="text-xs text-slate-400">
                  {currentLesson.codeExample.description[lang]}
                </p>
              </div>
            )}

            {/* Line-by-Line Breakdown if available */}
            {currentLesson.lineExplanations && currentLesson.lineExplanations.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {t.lineExplanation}
                </h4>
                <div className="space-y-1.5">
                  {currentLesson.lineExplanations.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 gap-2 text-xs"
                    >
                      <code className="font-mono text-sky-300 font-semibold text-left shrink-0" dir="ltr">
                        {item.line}
                      </code>
                      <span className="text-slate-300">{item.explanation[lang]}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Expected Result & Common Mistakes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentLesson.expectedResult && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <h5 className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5" />
                    {t.expectedResult}
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentLesson.expectedResult[lang]}
                  </p>
                </div>
              )}

              {currentLesson.commonMistakes && (
                <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-1">
                  <h5 className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {t.commonMistakes}
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentLesson.commonMistakes[lang]}
                  </p>
                </div>
              )}
            </div>

            {/* Practical Exercise Box */}
            {currentLesson.exercise && (
              <div className="p-5 rounded-xl bg-gradient-to-r from-sky-950/40 via-purple-950/30 to-slate-950 border border-sky-800/50 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                    {t.practicalExercise}
                  </h4>
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="text-xs text-purple-400 hover:text-purple-300 underline cursor-pointer"
                  >
                    {showSolution
                      ? lang === 'ar'
                        ? 'إخفاء الحل النموذجي'
                        : 'Hide Solution'
                      : lang === 'ar'
                      ? 'إظهار الحل النموذجي'
                      : 'Reveal Solution'}
                  </button>
                </div>

                <p className="text-sm font-medium text-white">
                  {currentLesson.exercise.task[lang]}
                </p>

                <p className="text-xs text-slate-400">
                  <strong className="text-slate-300">{lang === 'ar' ? 'تلميح: ' : 'Hint: '}</strong>
                  {currentLesson.exercise.hint[lang]}
                </p>

                {showSolution && (
                  <div className="mt-3 p-3 bg-slate-950 border border-purple-800/60 rounded-lg font-mono text-xs text-emerald-300 overflow-x-auto text-left" dir="ltr">
                    <pre>
                      <code>{currentLesson.exercise.solution}</code>
                    </pre>
                  </div>
                )}
              </div>
            )}

            {/* Mini Quiz */}
            {currentLesson.miniQuiz && (
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {t.miniQuiz}
                </h4>

                <p className="text-sm font-semibold text-white">
                  {currentLesson.miniQuiz.question[lang]}
                </p>

                <div className="space-y-2 pt-1">
                  {currentLesson.miniQuiz.options[lang].map((opt: string, oIdx: number) => {
                    const isSelected = miniQuizAnswer === oIdx;
                    const isCorrect = oIdx === currentLesson.miniQuiz.correctIndex;
                    let style = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                    if (miniQuizAnswer !== null) {
                      if (isCorrect) {
                        style = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold';
                      } else if (isSelected && !isCorrect) {
                        style = 'bg-rose-500/20 border-rose-500 text-rose-300 line-through';
                      } else {
                        style = 'opacity-50 border-slate-800';
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        onClick={() => setMiniQuizAnswer(oIdx)}
                        className={`w-full text-start p-3 rounded-lg border text-xs transition-colors flex items-center justify-between ${style}`}
                      >
                        <span>{opt}</span>
                        {miniQuizAnswer !== null && isCorrect && (
                          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {miniQuizAnswer !== null && (
                  <p className="text-xs text-slate-400 pt-2 border-t border-slate-800">
                    <strong className="text-white">{t.explanation}: </strong>
                    {currentLesson.miniQuiz.explanation[lang]}
                  </p>
                )}
              </div>
            )}

            {/* Previous / Next Controls */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-800">
              <button
                onClick={handlePrevious}
                disabled={activeLessonIndex === 0}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
              >
                {lang === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                <span>{t.previous}</span>
              </button>

              <button
                onClick={handleNext}
                disabled={activeLessonIndex === lessons.length - 1}
                className="flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-lg bg-sky-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-sky-500 transition-colors"
              >
                <span>{t.next}</span>
                {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
