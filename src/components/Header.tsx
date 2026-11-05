import React from 'react';
import { Printer, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  onPrint: () => void;
  darkMode: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onPrint,
  darkMode,
  onToggleTheme
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => onSelectTab('overview')}
          className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 hover:text-sky-600 dark:hover:text-sky-400 transition-colors text-right"
        >
          WebDev Guide · الدليل الشامل
        </button>

        {/* Zone 2: 4–5 Nav Links (Single line, text with hover underlines) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => onSelectTab('html-css')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 dark:hover:text-white ${
              activeTab === 'html-css' ? 'text-sky-600 dark:text-sky-400 font-semibold' : ''
            }`}
          >
            HTML و CSS
          </button>
          <button
            onClick={() => onSelectTab('git-github')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 dark:hover:text-white ${
              activeTab === 'git-github' ? 'text-sky-600 dark:text-sky-400 font-semibold' : ''
            }`}
          >
            Git و GitHub
          </button>
          <button
            onClick={() => onSelectTab('portfolio-guide')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 dark:hover:text-white ${
              activeTab === 'portfolio-guide' ? 'text-sky-600 dark:text-sky-400 font-semibold' : ''
            }`}
          >
            Portfolio
          </button>
          <button
            onClick={() => onSelectTab('comparisons-integration')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 dark:hover:text-white ${
              activeTab === 'comparisons-integration' ? 'text-sky-600 dark:text-sky-400 font-semibold' : ''
            }`}
          >
            الفرق والترابط
          </button>
          <button
            onClick={() => onSelectTab('quiz')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 dark:hover:text-white ${
              activeTab === 'quiz' ? 'text-sky-600 dark:text-sky-400 font-semibold' : ''
            }`}
          >
            Quiz والتصحيح
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onToggleTheme}
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="تبديل الوضع الداكن / الفاتح"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onPrint}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">تحميل / طباعة PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
};
