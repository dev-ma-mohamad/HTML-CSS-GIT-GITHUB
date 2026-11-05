import React, { useState } from 'react';
import { Language, translations } from '../data/translations';
import { useAuth } from '../context/AuthContext';
import {
  Search,
  Moon,
  Sun,
  Printer,
  Menu,
  X,
  Code2,
  Terminal,
  Github,
  Award,
  Sparkles,
  BookOpen,
  UploadCloud,
  Sliders,
  User,
  LogIn,
  Trophy,
  Zap,
  ShieldAlert,
  ShieldCheck
} from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onSelectView: (view: any) => void;
  lang: Language;
  onToggleLanguage?: () => void;
  onSelectLanguage: (lang: Language) => void;
  darkMode: boolean;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  onPrintPdf: () => void;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
  onOpenLeaderboard: () => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onSelectView,
  lang,
  onSelectLanguage,
  darkMode,
  onToggleTheme,
  onOpenSearch,
  onPrintPdf,
  onOpenAuth,
  onOpenProfile,
  onOpenLeaderboard,
  onOpenAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, isAdmin } = useAuth();
  const t = translations[lang];

  const navItems = [
    { id: 'home', label: t.home },
    { id: 'html-course', label: 'HTML5' },
    { id: 'css-course', label: 'CSS3' },
    { id: 'git-course', label: 'Git' },
    { id: 'github-course', label: 'GitHub' },
    { id: 'upload-tutorial', label: lang === 'ar' ? 'رفع المشروع' : lang === 'fr' ? 'Upload' : 'Upload' },
    { id: 'git-commands', label: lang === 'ar' ? 'أوامر Git' : lang === 'fr' ? 'Commandes' : 'Git Cmds' },
    { id: 'css-properties', label: 'CSS A-J' },
    { id: 'terminal-simulator', label: lang === 'ar' ? 'التيرمينال' : 'Terminal' },
    { id: 'css-playground', label: 'Lab' },
    { id: 'quiz', label: t.quizzes },
    { id: 'dashboard', label: t.dashboard },
  ];

  const handleNavClick = (viewId: string) => {
    onSelectView(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Brand Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 group text-start shrink-0 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center text-slate-950 font-black shadow-md shadow-cyan-500/30">
            <Code2 className="w-4 h-4 text-slate-950" />
          </div>
          <span className="text-base sm:text-lg font-black tracking-tight text-white group-hover:text-cyan-400 transition-colors whitespace-nowrap">
            WebDev<span className="text-cyan-400">Master</span>
          </span>
        </button>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden 2xl:flex items-center gap-3.5 text-xs font-semibold text-slate-300">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`whitespace-nowrap transition-colors hover:text-white cursor-pointer py-1 ${
                  isActive
                    ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold'
                    : 'text-slate-400'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Interactive Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Global Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors text-xs cursor-pointer"
            title="Search (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden md:inline font-mono text-[10px] text-slate-500">
              Ctrl+K
            </span>
          </button>

          {/* Leaderboard Button */}
          <button
            onClick={onOpenLeaderboard}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 text-amber-300 text-xs font-mono font-bold transition-colors cursor-pointer"
            title="Leaderboard"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">{lang === 'ar' ? 'المتصدرين' : 'Rankings'}</span>
          </button>

          {/* User Auth / Profile Badge */}
          {user ? (
            <div className="flex items-center gap-1.5">
              {/* Points Pill */}
              <button
                onClick={onOpenProfile}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-400 font-mono text-xs font-bold shadow-xs hover:border-amber-400 transition-colors cursor-pointer"
                title="Your Points"
              >
                <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{profile?.points || 0} pts</span>
              </button>

              {/* Admin Button if Admin */}
              {isAdmin && (
                <button
                  onClick={onOpenAdmin}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/50 text-purple-300 font-mono text-xs font-bold hover:bg-purple-900/60 transition-colors cursor-pointer"
                  title="Admin Dashboard"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  <span className="hidden md:inline">Admin</span>
                </button>
              )}

              {/* User Avatar Button */}
              <button
                onClick={onOpenProfile}
                className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 transition-colors cursor-pointer"
                title="Account Settings"
              >
                {profile?.photoURL || user.photoURL ? (
                  <img
                    src={profile?.photoURL || user.photoURL || ''}
                    alt="User"
                    className="w-7 h-7 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-white text-xs">
                    {(profile?.displayName || user.email || 'U')[0].toUpperCase()}
                  </div>
                )}
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-95 text-slate-950 text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'دخول / حساب' : 'Sign In'}</span>
            </button>
          )}

          {/* Trilingual Switcher (EN | FR | عربي) */}
          <div className="hidden sm:flex items-center p-0.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold">
            {(['en', 'fr', 'ar'] as const).map((l) => (
              <button
                key={l}
                onClick={() => onSelectLanguage(l)}
                className={`px-1.5 py-0.5 rounded-lg transition-all text-[11px] ${
                  lang === l
                    ? 'bg-cyan-500 text-slate-950 shadow-sm font-extrabold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {l === 'ar' ? 'عربي' : l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
            aria-label={t.toggleTheme}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* PDF Handbook Trigger */}
          <button
            onClick={onPrintPdf}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl transition-colors cursor-pointer shadow-sm shadow-cyan-600/30"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>PDF</span>
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="2xl:hidden p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900 border border-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="2xl:hidden border-t border-slate-800 bg-slate-950 p-4 space-y-3 max-h-[80vh] overflow-y-auto">
          {/* Mobile Language Switcher */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold">
            <span className="text-slate-400">Language:</span>
            <div className="flex gap-1">
              {(['en', 'fr', 'ar'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => onSelectLanguage(l)}
                  className={`px-2 py-1 rounded-lg text-xs ${
                    lang === l ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'
                  }`}
                >
                  {l === 'ar' ? 'عربي' : l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-start p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between ${
                  currentView === item.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-300 hover:bg-slate-900 bg-slate-900/50 border border-slate-800'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex gap-2">
            <button
              onClick={() => {
                onPrintPdf();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold bg-cyan-600 text-white rounded-xl"
            >
              <Printer className="w-4 h-4" />
              <span>{t.printPdf}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
