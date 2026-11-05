import React, { useState, useEffect } from 'react';
import { Search, X, Code, Terminal, GitBranch, Github, ArrowLeft, ArrowRight } from 'lucide-react';
import { Language, translations } from '../data/translations';
import { HTML_LESSONS, CSS_LESSONS, GIT_COMMANDS, GITHUB_LESSONS } from '../data/coursesData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onNavigate: (type: 'html' | 'css' | 'git' | 'github' | 'playground' | 'quiz' | 'projects', itemId?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, lang, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'html' | 'css' | 'git' | 'github'>('all');
  const t = translations[lang];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle handled outside or if open, close
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Search logic
  const q = query.toLowerCase().trim();
  const langKey = lang === 'ar' ? 'ar' : 'en';

  const results: {
    id: string;
    type: 'html' | 'css' | 'git' | 'github';
    title: string;
    subtitle: string;
    tag: string;
  }[] = [];

  if (activeFilter === 'all' || activeFilter === 'html') {
    HTML_LESSONS.forEach((l) => {
      const match =
        !q ||
        l.title[langKey].toLowerCase().includes(q) ||
        l.explanation[langKey].toLowerCase().includes(q) ||
        (l.syntax && l.syntax.toLowerCase().includes(q));
      if (match) {
        results.push({
          id: l.id,
          type: 'html',
          title: l.title[langKey],
          subtitle: l.explanation[langKey].slice(0, 85) + '...',
          tag: 'HTML5'
        });
      }
    });
  }

  if (activeFilter === 'all' || activeFilter === 'css') {
    CSS_LESSONS.forEach((l) => {
      const match =
        !q ||
        l.title[langKey].toLowerCase().includes(q) ||
        l.explanation[langKey].toLowerCase().includes(q) ||
        l.syntax.toLowerCase().includes(q);
      if (match) {
        results.push({
          id: l.id,
          type: 'css',
          title: l.title[langKey],
          subtitle: l.explanation[langKey].slice(0, 85) + '...',
          tag: 'CSS3'
        });
      }
    });
  }

  if (activeFilter === 'all' || activeFilter === 'git') {
    GIT_COMMANDS.forEach((c) => {
      const match =
        !q ||
        c.command.toLowerCase().includes(q) ||
        c.explanation[langKey].toLowerCase().includes(q) ||
        c.categoryName[langKey].toLowerCase().includes(q);
      if (match) {
        results.push({
          id: c.id,
          type: 'git',
          title: c.command,
          subtitle: c.explanation[langKey].slice(0, 85) + '...',
          tag: c.categoryName[langKey]
        });
      }
    });
  }

  if (activeFilter === 'all' || activeFilter === 'github') {
    GITHUB_LESSONS.forEach((g) => {
      const match =
        !q ||
        g.title[langKey].toLowerCase().includes(q) ||
        g.explanation[langKey].toLowerCase().includes(q);
      if (match) {
        results.push({
          id: g.id,
          type: 'github',
          title: g.title[langKey],
          subtitle: g.explanation[langKey].slice(0, 85) + '...',
          tag: 'GitHub'
        });
      }
    });
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'html':
        return <Code className="w-4 h-4 text-orange-400" />;
      case 'css':
        return <Code className="w-4 h-4 text-sky-400" />;
      case 'git':
        return <Terminal className="w-4 h-4 text-emerald-400" />;
      case 'github':
      default:
        return <Github className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 gap-3">
          <Search className="w-5 h-5 text-sky-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            autoFocus
            className="flex-1 bg-transparent text-white placeholder-slate-400 text-sm outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-white p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded border border-slate-700 hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-slate-800/80 bg-slate-950/60 overflow-x-auto text-xs">
          {[
            { id: 'all', label: t.allCategories },
            { id: 'html', label: 'HTML' },
            { id: 'css', label: 'CSS' },
            { id: 'git', label: 'Git' },
            { id: 'github', label: 'GitHub' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id as any)}
              className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap ${
                activeFilter === f.id
                  ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="mr-auto ml-auto text-[11px] text-slate-500">
            {results.length} {lang === 'ar' ? 'نتيجة' : 'results'}
          </span>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          {results.length > 0 ? (
            results.map((r) => (
              <button
                key={`${r.type}-${r.id}`}
                onClick={() => {
                  onNavigate(r.type, r.id);
                  onClose();
                }}
                className="w-full text-start p-3 rounded-xl hover:bg-slate-800/80 border border-transparent hover:border-slate-700 flex items-start justify-between gap-3 transition-colors group cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 border border-slate-700/80 mt-0.5">
                    {getIcon(r.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white group-hover:text-sky-300">
                        {r.title}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                        {r.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {r.subtitle}
                    </p>
                  </div>
                </div>
                {lang === 'ar' ? (
                  <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-sky-400 shrink-0 mt-2" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 shrink-0 mt-2" />
                )}
              </button>
            ))
          ) : (
            <div className="py-12 text-center text-slate-500 text-sm">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p>{t.searchNoResults}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
