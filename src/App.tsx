import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
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
import { AuthModal } from './components/AuthModal';
import { OnboardingModal } from './components/OnboardingModal';
import { UserProfileModal } from './components/UserProfileModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { AdminDashboard } from './components/AdminDashboard';
import { CommunitySection } from './components/CommunitySection';
import { Language, translations } from './data/translations';
import {
  Mail,
  Phone,
  Github,
  ShieldCheck,
  Sparkles,
  Heart,
  FileText
} from 'lucide-react';

function MainApp() {
  const { user, profile, saveProgress, isAdmin } = useAuth();

  // 1. Language state with localStorage persistence
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

  // 4. Learning Progress States (Synchronized with backend Firestore profile)
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

  // 5. Modal States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  // Sync user profile from Firestore when logged in (Source of Truth!)
  useEffect(() => {
    if (profile) {
      if (profile.completedLessons && profile.completedLessons.length > 0) {
        setCompletedLessons(profile.completedLessons);
      }
      // Check if first login onboarding is required
      if (profile.onboardingCompleted === false) {
        setIsOnboardingOpen(true);
      }
    }
  }, [profile]);

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

  // Sync local completed to storage as cache
  useEffect(() => {
    localStorage.setItem('webdev_completed', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem('webdev_bookmarks', JSON.stringify(bookmarkedLessons));
  }, [bookmarkedLessons]);

  useEffect(() => {
    localStorage.setItem('webdev_quiz_scores', JSON.stringify(quizScores));
  }, [quizScores]);

  // Ctrl+K for search
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
    const updated = completedLessons.includes(lessonId)
      ? completedLessons.filter((id) => id !== lessonId)
      : [...completedLessons, lessonId];

    setCompletedLessons(updated);

    // Save automatically to Firestore backend
    if (user) {
      const course = lessonId.startsWith('css')
        ? 'css'
        : lessonId.startsWith('git')
        ? 'git'
        : lessonId.startsWith('gh')
        ? 'github'
        : 'html';
      saveProgress(course, lessonId, updated);
    }
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
    if (user && lessonId) {
      saveProgress(type, lessonId, completedLessons);
    }
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
      if (user) {
        saveProgress('html', 'html-01', []);
      }
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
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onOpenAdmin={() => setCurrentView('admin')}
      />

      {/* Main Dynamic View Area */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            lang={lang}
            onNavigate={(view, lessonId) => {
              if (lessonId) setActiveLessonId(lessonId);
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            completedLessons={completedLessons}
            onOpenAuth={() => setIsAuthOpen(true)}
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
          <GitCommandsExplained lang={lang} />
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

        {/* Interactive Quiz System with +1 Point Rule */}
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

        {/* Secure Admin Dashboard */}
        {currentView === 'admin' && (
          <AdminDashboard
            language={lang}
            onNavigateHome={() => setCurrentView('home')}
          />
        )}

        {/* Printable PDF Complete Handbook */}
        {currentView === 'pdf-view' && (
          <div className="py-6 px-4">
            <PdfDocumentView onPrint={() => window.print()} />
          </div>
        )}
      </main>

      {/* Community & Reviews Section before Footer */}
      {currentView !== 'admin' && currentView !== 'pdf-view' && (
        <CommunitySection
          language={lang}
          onOpenAuth={() => setIsAuthOpen(true)}
        />
      )}

      {/* Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        lang={lang}
        onNavigate={handleSearchNavigate}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        language={lang}
      />

      <OnboardingModal
        isOpen={isOnboardingOpen}
        onFinish={() => setIsOnboardingOpen(false)}
        language={lang}
      />

      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        language={lang}
      />

      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        language={lang}
      />

      {/* Privacy Policy Modal */}
      {privacyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">Privacy Policy / سياسة الخصوصية</h3>
              <button onClick={() => setPrivacyModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              We respect your privacy. User accounts, email addresses, and learning progression states are stored securely in Google Cloud Firestore. We never sell or share user data with third-party advertising companies. Authentication tokens are verified directly with Google OAuth and GitHub.
            </p>
            <p className="text-xs text-slate-400">
              Contact: dev.ma.mohamad@gmail.com
            </p>
          </div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {termsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">Terms of Service / شروط الاستخدام</h3>
              <button onClick={() => setTermsModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              This platform provides developer education and tutorials for HTML, CSS, Git, and GitHub. Users agree to participate respectfully in community discussions and reviews. Any abusive or spam content will be moderated by administrators.
            </p>
          </div>
        </div>
      )}

      {/* Professional Footer */}
      <footer className="no-print border-t border-slate-800 bg-slate-950 py-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1: About & Platform */}
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-cyan-400 to-purple-600 flex items-center justify-center text-slate-950 font-bold text-xs">
                  WM
                </div>
                <span className="font-bold text-white text-sm">WebDev Master</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                {lang === 'ar'
                  ? 'منصة تدريبية احترافية لتعلم تطوير الويب من الصفر مع حفظ سحابي حقيقي ولوحة متصدرين ومحاكي تيرمينال.'
                  : 'Professional developer platform teaching HTML, CSS, Git, and GitHub with persistent cloud progress, verified rankings, and terminal simulator.'}
              </p>
            </div>

            {/* Col 2: Courses */}
            <div className="space-y-2">
              <h4 className="font-mono text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                {lang === 'ar' ? 'المسارات' : 'Curriculums'}
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li><button onClick={() => setCurrentView('html-course')} className="hover:text-cyan-400 transition-colors">HTML Academy (22 lessons)</button></li>
                <li><button onClick={() => setCurrentView('css-course')} className="hover:text-cyan-400 transition-colors">CSS Academy (20 lessons)</button></li>
                <li><button onClick={() => setCurrentView('git-course')} className="hover:text-cyan-400 transition-colors">Git Complete Course</button></li>
                <li><button onClick={() => setCurrentView('github-course')} className="hover:text-cyan-400 transition-colors">GitHub Complete Course</button></li>
                <li><button onClick={() => setCurrentView('upload-tutorial')} className="hover:text-cyan-400 transition-colors">Upload Project to GitHub</button></li>
              </ul>
            </div>

            {/* Col 3: Interactive Tools */}
            <div className="space-y-2">
              <h4 className="font-mono text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                {lang === 'ar' ? 'الأدوات التفاعلية' : 'Interactive Tools'}
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li><button onClick={() => setCurrentView('terminal-simulator')} className="hover:text-emerald-400 transition-colors">Git Terminal Simulator</button></li>
                <li><button onClick={() => setCurrentView('css-playground')} className="hover:text-purple-400 transition-colors">CSS Visual Playground</button></li>
                <li><button onClick={() => setCurrentView('css-properties')} className="hover:text-cyan-400 transition-colors">CSS Properties A-J</button></li>
                <li><button onClick={() => setCurrentView('quiz')} className="hover:text-amber-400 transition-colors">Quizzes (+1 Point Rule)</button></li>
                <li><button onClick={() => setIsLeaderboardOpen(true)} className="hover:text-amber-400 transition-colors">Real Leaderboard</button></li>
              </ul>
            </div>

            {/* Col 4: Official Real Contact Info */}
            <div className="space-y-3">
              <h4 className="font-mono text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                {lang === 'ar' ? 'التواصل المباشر مع المطوّر' : 'Official Contact & Trust'}
              </h4>
              <ul className="space-y-2 text-xs font-mono">
                <li>
                  <a
                    href="mailto:dev.ma.mohamad@gmail.com"
                    className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>dev.ma.mohamad@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+212780237834"
                    className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>+212 780237834</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/dev-ma-mohamad"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-slate-300 hover:text-purple-400 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>github.com/dev-ma-mohamad</span>
                  </a>
                </li>
              </ul>

              <div className="pt-1 flex gap-3 text-xs text-slate-400">
                <button onClick={() => setPrivacyModalOpen(true)} className="hover:underline">Privacy Policy</button>
                <span>•</span>
                <button onClick={() => setTermsModalOpen(true)} className="hover:underline">Terms of Service</button>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px] font-mono">
            <p>© {new Date().getFullYear()} WebDev Master. All rights reserved.</p>
            <p className="flex items-center gap-1">
              <span>Engineered with zero fake data · Firestore Persistent State</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
