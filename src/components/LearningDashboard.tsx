import React from 'react';
import { Language, translations } from '../data/translations';
import { HTML_LESSONS, CSS_LESSONS, GITHUB_LESSONS, GIT_COMMANDS } from '../data/coursesData';
import {
  Award,
  Flame,
  BookOpen,
  CheckCircle2,
  Bookmark,
  ArrowRight,
  ArrowLeft,
  Code2,
  Terminal,
  Github,
  Play,
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface LearningDashboardProps {
  lang: Language;
  completedLessons: string[];
  bookmarkedLessons: string[];
  quizScores: { score: number; total: number; tech: string; date: string }[];
  onNavigateToLesson: (type: 'html' | 'css' | 'git' | 'github', lessonId?: string) => void;
  onClearProgress: () => void;
}

export const LearningDashboard: React.FC<LearningDashboardProps> = ({
  lang,
  completedLessons,
  bookmarkedLessons,
  quizScores,
  onNavigateToLesson,
  onClearProgress
}) => {
  const t = translations[lang];
  const langKey = lang === 'ar' ? 'ar' : 'en';

  const totalLessonsCount = HTML_LESSONS.length + CSS_LESSONS.length + GITHUB_LESSONS.length;
  const completedCount = completedLessons.length;
  const remainingCount = Math.max(0, totalLessonsCount - completedCount);
  const overallPercentage = Math.round((completedCount / totalLessonsCount) * 100);

  // Individual progress
  const htmlDone = HTML_LESSONS.filter((l) => completedLessons.includes(l.id)).length;
  const htmlPercent = Math.round((htmlDone / HTML_LESSONS.length) * 100);

  const cssDone = CSS_LESSONS.filter((l) => completedLessons.includes(l.id)).length;
  const cssPercent = Math.round((cssDone / CSS_LESSONS.length) * 100);

  const githubDone = GITHUB_LESSONS.filter((l) => completedLessons.includes(l.id)).length;
  const githubPercent = Math.round((githubDone / GITHUB_LESSONS.length) * 100);

  // Find next uncompleted lesson
  const nextHtml = HTML_LESSONS.find((l) => !completedLessons.includes(l.id));
  const nextCss = CSS_LESSONS.find((l) => !completedLessons.includes(l.id));
  const nextGh = GITHUB_LESSONS.find((l) => !completedLessons.includes(l.id));

  const nextLesson = nextHtml || nextCss || nextGh || HTML_LESSONS[0];
  const nextLessonType = nextHtml ? 'html' : nextCss ? 'css' : nextGh ? 'github' : 'html';

  // Best quiz score
  const bestScore = quizScores.length > 0
    ? Math.max(...quizScores.map((s) => Math.round((s.score / s.total) * 100)))
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Welcome Ribbon with Streak */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-sky-400 bg-sky-950 px-2.5 py-0.5 rounded border border-sky-800">
              STUDENT COMMAND CENTER
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {lang === 'ar' ? 'لوحة تحكم وتتبع تقدمك التعليمي' : 'Student Learning & Performance Dashboard'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            {lang === 'ar'
              ? 'تابع معدل إنجازك في المسارات الأربعة، راجع نتائج اختباراتك، وواصل التعلم من النقطة التي توقفت عندها.'
              : 'Monitor mastery metrics across all four curriculums, review assessment stats, and resume your journey.'}
          </p>
        </div>

        {/* Streak and Continue Action */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-3 rounded-xl border border-slate-800">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
              <Flame className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium">{t.streak}</p>
              <p className="text-sm font-bold text-white font-mono">
                {lang === 'ar' ? '5 أيام متواصلة' : '5 Days Streak'}
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateToLesson(nextLessonType as any, nextLesson.id)}
            className="flex items-center gap-2 px-5 py-3 text-xs font-bold bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-400 hover:to-purple-500 text-white rounded-xl shadow-lg shadow-sky-500/20 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{t.continueLearning}</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">{t.overallProgress}</span>
            <Award className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {overallPercentage}%
          </p>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-sky-400 h-full transition-all duration-300"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">{lang === 'ar' ? 'الدروس المكتملة' : 'Completed Lessons'}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {completedCount} <span className="text-xs font-normal text-slate-500 font-sans">/ {totalLessonsCount}</span>
          </p>
          <p className="text-[11px] text-slate-400">
            {remainingCount} {lang === 'ar' ? 'درساً متبقياً' : 'lessons remaining'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">{lang === 'ar' ? 'أفضل نتيجة Quiz' : 'Best Quiz Result'}</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {bestScore}%
          </p>
          <p className="text-[11px] text-slate-400">
            {quizScores.length} {lang === 'ar' ? 'اختبارات تم إجراؤها' : 'assessments logged'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">{lang === 'ar' ? 'المفضلة المحفوظة' : 'Saved Bookmarks'}</span>
            <Bookmark className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {bookmarkedLessons.length}
          </p>
          <p className="text-[11px] text-slate-400">
            {lang === 'ar' ? 'دروس للرجوع السريع' : 'quick reference bookmarks'}
          </p>
        </div>
      </div>

      {/* Course Breakdown Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-sky-400" />
          {lang === 'ar' ? 'التقدم التفصيلي في المسارات الأربعة' : 'Curriculum Mastery Breakdown'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* HTML Card */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-bold text-white">HTML5 Course</span>
              </div>
              <span className="font-mono text-xs font-bold text-orange-400">{htmlPercent}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-orange-500 h-full transition-all duration-300"
                style={{ width: `${htmlPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <span>{htmlDone} / {HTML_LESSONS.length} {t.lessons}</span>
              <button
                onClick={() => onNavigateToLesson('html')}
                className="text-sky-400 hover:underline cursor-pointer"
              >
                {lang === 'ar' ? 'فتح المسار ←' : 'Open Course →'}
              </button>
            </div>
          </div>

          {/* CSS Card */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-sky-400" />
                <span className="text-sm font-bold text-white">CSS3 Course</span>
              </div>
              <span className="font-mono text-xs font-bold text-sky-400">{cssPercent}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-sky-500 h-full transition-all duration-300"
                style={{ width: `${cssPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <span>{cssDone} / {CSS_LESSONS.length} {t.lessons}</span>
              <button
                onClick={() => onNavigateToLesson('css')}
                className="text-sky-400 hover:underline cursor-pointer"
              >
                {lang === 'ar' ? 'فتح المسار ←' : 'Open Course →'}
              </button>
            </div>
          </div>

          {/* GitHub Card */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-bold text-white">GitHub Course</span>
              </div>
              <span className="font-mono text-xs font-bold text-purple-400">{githubPercent}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-purple-500 h-full transition-all duration-300"
                style={{ width: `${githubPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <span>{githubDone} / {GITHUB_LESSONS.length} {t.lessons}</span>
              <button
                onClick={() => onNavigateToLesson('github')}
                className="text-purple-400 hover:underline cursor-pointer"
              >
                {lang === 'ar' ? 'فتح المسار ←' : 'Open Course →'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bookmarks & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bookmarks */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-amber-400" />
            {t.bookmarksList}
          </h4>

          {bookmarkedLessons.length > 0 ? (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {bookmarkedLessons.map((bId) => {
                const lesson =
                  HTML_LESSONS.find((l) => l.id === bId) ||
                  CSS_LESSONS.find((l) => l.id === bId) ||
                  GITHUB_LESSONS.find((l) => l.id === bId);
                if (!lesson) return null;
                const type = bId.startsWith('html') ? 'html' : bId.startsWith('css') ? 'css' : 'github';
                return (
                  <button
                    key={bId}
                    onClick={() => onNavigateToLesson(type as any, bId)}
                    className="w-full text-start p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="text-xs font-semibold text-white">
                      {lesson.title[langKey]}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {type.toUpperCase()}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-slate-400 leading-relaxed py-4">
              {t.noBookmarks}
            </p>
          )}
        </div>

        {/* Recent Quiz Scores */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-sky-400" />
            {lang === 'ar' ? 'سجل نتائج الاختبارات الأخيرة' : 'Recent Assessment Logs'}
          </h4>

          {quizScores.length > 0 ? (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {quizScores.slice(-5).reverse().map((entry, idx) => {
                const pct = Math.round((entry.score / entry.total) * 100);
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-semibold text-white uppercase font-mono">
                        {entry.tech} QUIZ
                      </span>
                      <p className="text-[10px] text-slate-500">{entry.date}</p>
                    </div>
                    <span className={`font-mono font-bold px-2 py-1 rounded ${
                      pct >= 80 ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-sky-300'
                    }`}>
                      {entry.score} / {entry.total} ({pct}%)
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-slate-400 leading-relaxed py-4">
              {lang === 'ar'
                ? 'لم تقم بإجراء أي اختبار حتى الآن. انتقل إلى تبويب "الاختبارات" لتجربة مهاراتك.'
                : 'No assessment records logged yet. Head to Quizzes to test your skills.'}
            </p>
          )}
        </div>
      </div>

      {/* Progress Reset Button */}
      <div className="flex justify-end pt-4">
        <button
          onClick={onClearProgress}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-400 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{lang === 'ar' ? 'إعادة تعيين التقدم التجريبي' : 'Reset Demo Progress'}</span>
        </button>
      </div>
    </div>
  );
};
