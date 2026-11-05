import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { CourseViewer } from './components/CourseViewer';
import { GitCommandViewer } from './components/GitCommandViewer';
import { GitCommandsExplained } from './components/GitCommandsExplained';
import { UploadToGithubTutorial } from './components/UploadToGithubTutorial';
import { CssPropertiesExplained } from './components/CssPropertiesExplained';
import { GitTerminalSimulator } from './components/GitTerminalSimulator';
import { CssVisualPlayground } from './components/CssVisualPlayground';
import { CodePlayground } from './components/CodePlayground';
import { InteractiveQuizSystem } from './components/InteractiveQuizSystem';
import { LearningDashboard } from './components/LearningDashboard';
import { PracticalProjects } from './components/PracticalProjects';
import { PdfDocumentView } from './components/PdfDocumentView';
import { SearchModal } from './components/SearchModal';
import { Language, translations } from './data/translations';

export default function App() {
  // 1. Language state with localStorage persistence (supports en, fr, ar)
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('webdev_lang');
    if (saved === 'en' || saved === 'fr' || saved === 'ar') return saved;
    return 'ar';
  });

  // 2. Dark mode state with localStorage persistence
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('webdev_theme');
    return saved === 'light' ? false : true;
  });

  // 3. Navigation View
  const [currentView, setCurrentView] = useState<string>('home');
  const [activeLessonId, setActiveLessonId] = useState<string | undefined>();
  const [playgroundStarterCode, setPlaygroundStarterCode] = useState<{ html?: string; css?: string } | undefined>();

  // 4. Learning Progress States
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('webdev_completed');
      return saved ? JSON.parse(saved) : ['html-01', 'html-02'];
    } catch {
      return ['html-01', 'html-02'];
    }
  });

  const [bookmarkedLessons, setBookmarkedLessons] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('webdev_bookmarks');
      return saved ? JSON.parse(saved) : ['html-13', 'css-18'];
    } catch {
      return ['html-13', 'css-18'];
    }
  });

  const [quizScores, setQuizScores] = useState<{ score: number; total: number; tech: string; date: string }[]>(() => {
    try {
      const saved = localStorage.getItem('webdev_quiz_scores');
      return saved ? JSON.parse(saved) : [
        { score: 14, total: 16, tech: 'html', date: '2026-11-05' }
      ];
    } catch {
      return [];
    }
  });

  // 5. Search Modal State
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync RTL / LTR direction and document title
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    localStorage.setItem('webdev_lang', lang);
  }, [lang]);

  // Sync Dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('webdev_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('webdev_theme', 'light');
    }
  }, [darkMode]);

  // Sync Completed lessons to storage
  useEffect(() => {
    localStorage.setItem('webdev_completed', JSON.stringify(completedLessons));
  }, [completedLessons]);

  // Sync Bookmarks to storage
  useEffect(() => {
    localStorage.setItem('webdev_bookmarks', JSON.stringify(bookmarkedLessons));
  }, [bookmarkedLessons]);

  // Sync Quiz Scores
  useEffect(() => {
    localStorage.setItem('webdev_quiz_scores', JSON.stringify(quizScores));
  }, [quizScores]);

  // Keyboard shortcut Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers
  const handleSelectLanguage = (newLang: Language) => {
    setLang(newLang);
  };

  const handleToggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const handleToggleComplete = (lessonId: string) => {
    setCompletedLessons((prev) =>
      prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId]
    );
  };

  const handleToggleBookmark = (lessonId: string) => {
    setBookmarkedLessons((prev) =>
      prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId]
    );
  };

  const handleSaveQuizResult = (score: number, total: number, tech: string) => {
    const newEntry = {
      score,
      total,
      tech,
      date: new Date().toISOString().split('T')[0]
    };
    setQuizScores((prev) => [...prev, newEntry]);
  };

  const handleOpenInPlayground = (code: { html?: string; css?: string }) => {
    setPlaygroundStarterCode(code);
    setCurrentView('playground');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToLesson = (type: 'html' | 'css' | 'git' | 'github', lessonId?: string) => {
    setActiveLessonId(lessonId);
    if (type === 'html') setCurrentView('html-course');
    else if (type === 'css') setCurrentView('css-course');
    else if (type === 'git') setCurrentView('git-course');
    else setCurrentView('github-course');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchNavigate = (type: any, itemId?: string) => {
    if (type === 'html' || type === 'css' || type === 'git' || type === 'github') {
      handleNavigateToLesson(type, itemId);
    } else {
      setCurrentView(type);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleClearProgress = () => {
    const msg =
      lang === 'ar'
        ? 'هل أنت متأكد من تصفير سجل التقدم؟'
        : lang === 'fr'
        ? 'Réinitialiser votre progression ?'
        : 'Reset demo progress?';
    if (window.confirm(msg)) {
      setCompletedLessons([]);
      setBookmarkedLessons([]);
      setQuizScores([]);
      localStorage.removeItem('webdev_completed');
      localStorage.removeItem('webdev_bookmarks');
      localStorage.removeItem('webdev_quiz_scores');
    }
  };

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans transition-colors antialiased selection:bg-cyan-500/30 selection:text-white">
      {/* Top Bar Header */}
      <Header
        currentView={currentView}
        onSelectView={(view) => {
          setCurrentView(view);
          setActiveLessonId(undefined);
        }}
        lang={lang}
        onSelectLanguage={handleSelectLanguage}
        darkMode={darkMode}
        onToggleTheme={handleToggleTheme}
        onOpenSearch={() => setIsSearchOpen(true)}
        onPrintPdf={() => setCurrentView('pdf-view')}
      />

      {/* Main Dynamic View Area */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            lang={lang}
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            completedLessons={completedLessons}
          />
        )}

        {currentView === 'html-course' && (
          <CourseViewer
            courseType="html"
            initialLessonId={activeLessonId}
            lang={lang}
            completedLessons={completedLessons}
            bookmarkedLessons={bookmarkedLessons}
            onToggleComplete={handleToggleComplete}
            onToggleBookmark={handleToggleBookmark}
            onOpenInPlayground={handleOpenInPlayground}
          />
        )}

        {currentView === 'css-course' && (
          <CourseViewer
            courseType="css"
            initialLessonId={activeLessonId}
            lang={lang}
            completedLessons={completedLessons}
            bookmarkedLessons={bookmarkedLessons}
            onToggleComplete={handleToggleComplete}
            onToggleBookmark={handleToggleBookmark}
            onOpenInPlayground={handleOpenInPlayground}
          />
        )}

        {currentView === 'git-course' && (
          <GitCommandViewer lang={lang} />
        )}

        {currentView === 'github-course' && (
          <CourseViewer
            courseType="github"
            initialLessonId={activeLessonId}
            lang={lang}
            completedLessons={completedLessons}
            bookmarkedLessons={bookmarkedLessons}
            onToggleComplete={handleToggleComplete}
            onToggleBookmark={handleToggleBookmark}
            onOpenInPlayground={handleOpenInPlayground}
          />
        )}

        {/* Upload Project to GitHub Tutorial */}
        {currentView === 'upload-tutorial' && (
          <UploadToGithubTutorial
            lang={lang}
            onOpenTerminal={() => setCurrentView('terminal-simulator')}
          />
        )}

        {/* 26 Git Commands Explained with 12 criteria */}
        {currentView === 'git-commands' && (
          <GitCommandsExplained
            lang={lang}
          />
        )}

        {/* CSS Properties Explorer A-J */}
        {currentView === 'css-properties' && (
          <CssPropertiesExplained
            language={lang}
            onNavigateHome={() => setCurrentView('home')}
            onNavigatePlayground={() => setCurrentView('css-playground')}
          />
        )}

        {/* Interactive Git Terminal Simulator */}
        {currentView === 'terminal-simulator' && (
          <GitTerminalSimulator
            language={lang}
            onNavigateHome={() => setCurrentView('home')}
            onNavigateTutorial={() => setCurrentView('upload-tutorial')}
          />
        )}

        {/* Interactive CSS Visual Playground */}
        {currentView === 'css-playground' && (
          <CssVisualPlayground
            language={lang}
            onNavigateHome={() => setCurrentView('home')}
            onNavigateProperties={() => setCurrentView('css-properties')}
          />
        )}

        {/* In-Browser Code Playground */}
        {currentView === 'playground' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <CodePlayground lang={lang} initialCode={playgroundStarterCode} />
          </div>
        )}

        {/* Interactive Quiz System */}
        {currentView === 'quiz' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
            <InteractiveQuizSystem
              lang={lang}
              onSaveQuizResult={handleSaveQuizResult}
            />
          </div>
        )}

        {/* Practical Real Projects */}
        {currentView === 'projects' && (
          <PracticalProjects
            lang={lang}
            onOpenInPlayground={handleOpenInPlayground}
          />
        )}

        {/* Learning Progress Dashboard */}
        {currentView === 'dashboard' && (
          <LearningDashboard
            lang={lang}
            completedLessons={completedLessons}
            bookmarkedLessons={bookmarkedLessons}
            quizScores={quizScores}
            onNavigateToLesson={handleNavigateToLesson}
            onClearProgress={handleClearProgress}
          />
        )}

        {/* Printable PDF Complete Handbook */}
        {currentView === 'pdf-view' && (
          <div className="py-6 px-4">
            <PdfDocumentView onPrint={() => window.print()} />
          </div>
        )}
      </main>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        lang={lang}
        onNavigate={handleSearchNavigate}
      />

      {/* Futuristic Clean Footer */}
      <footer className="no-print border-t border-slate-800 bg-slate-950 py-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-start">
            <p className="font-bold text-slate-300">
              WebDev Master · {lang === 'ar' ? 'أكاديمية احتراف الويب 2026' : lang === 'fr' ? 'Plateforme WebDev Master 2026' : 'Next-Gen Web Engineering Platform'}
            </p>
            <p className="text-slate-500">
              HTML5 · CSS3 · Git Engine · GitHub Cloud Collaboration · Terminal Simulator
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 font-medium">
            <button
              onClick={() => setCurrentView('html-course')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              HTML
            </button>
            <button
              onClick={() => setCurrentView('css-course')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              CSS
            </button>
            <button
              onClick={() => setCurrentView('git-course')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Git
            </button>
            <button
              onClick={() => setCurrentView('github-course')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              GitHub
            </button>
            <button
              onClick={() => setCurrentView('upload-tutorial')}
              className="hover:text-cyan-400 text-slate-400 transition-colors cursor-pointer"
            >
              {lang === 'ar' ? 'رفع المشروع' : lang === 'fr' ? 'Upload' : 'Upload Tutorial'}
            </button>
            <button
              onClick={() => setCurrentView('terminal-simulator')}
              className="hover:text-emerald-400 text-slate-400 transition-colors cursor-pointer"
            >
              Terminal
            </button>
            <button
              onClick={() => setCurrentView('css-playground')}
              className="hover:text-purple-400 text-slate-400 transition-colors cursor-pointer"
            >
              CSS Lab
            </button>
            <button
              onClick={() => setCurrentView('pdf-view')}
              className="hover:text-cyan-400 text-slate-400 transition-colors cursor-pointer"
            >
              {t.pdfHandbook}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
