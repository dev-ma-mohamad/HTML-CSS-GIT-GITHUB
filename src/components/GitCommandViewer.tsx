import React, { useState } from 'react';
import { GIT_COMMANDS, GitCommandDoc } from '../data/coursesData';
import { Language, translations } from '../data/translations';
import {
  Terminal,
  AlertTriangle,
  Copy,
  Check,
  Play,
  HelpCircle,
  Sparkles,
  ShieldAlert,
  Search
} from 'lucide-react';

interface GitCommandViewerProps {
  lang: Language;
}

export const GitCommandViewer: React.FC<GitCommandViewerProps> = ({ lang }) => {
  const t = translations[lang];
  const langKey = lang === 'ar' ? 'ar' : 'en';
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: { ar: 'جميع الأوامر (35+)', en: 'All Commands (35+)' } },
    { id: 'config', label: { ar: 'التثبيت والإعداد', en: 'Installation & Config' } },
    { id: 'start', label: { ar: 'بدء المشروع', en: 'Starting a Project' } },
    { id: 'staging', label: { ar: 'التجهيز والـ Commit', en: 'Staging & Commits' } },
    { id: 'branch', label: { ar: 'إدارة الفروع (Branches)', en: 'Branching' } },
    { id: 'merge', label: { ar: 'الدمج وحل التعارضات', en: 'Merging' } },
    { id: 'remote', label: { ar: 'المستودعات البعيدة والسحابية', en: 'Remote Repos' } },
    { id: 'undo', label: { ar: 'التراجع واستعادة الملفات', en: 'Undoing Changes' } },
    { id: 'stash', label: { ar: 'التخبئة المؤقتة (Stash)', en: 'Git Stash' } },
    { id: 'advanced', label: { ar: 'أوامر متقدمة منقذة', en: 'Advanced Commands' } }
  ];

  const filtered = GIT_COMMANDS.filter((cmd) => {
    const matchCat = activeCategory === 'all' || cmd.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      cmd.command.toLowerCase().includes(q) ||
      cmd.explanation[langKey].toLowerCase().includes(q) ||
      cmd.categoryName[langKey].toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const handleCopy = (command: string, id: string) => {
    navigator.clipboard.writeText(command);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
            <Terminal className="w-4 h-4" />
            <span>GIT COMMANDS MASTER CURRICULUM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {lang === 'ar'
              ? 'دليل أوامر Git الشامل من البداية للاحتراف'
              : 'Complete Git Command-Line Reference & Interactive Guide'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            {lang === 'ar'
              ? 'مرجع مفصل لكل أمر تحتاجه في مسيرتك البرمجية: صيغة الأمر، متى تستخدمه، الناتج المتوقع في الطرفية، أخطاء شائعة، وتحذيرات أمان للأوامر الحساسة.'
              : 'Definitive reference for all Git commands: syntax, real-world context, expected terminal stdout, common pitfalls, and safety guards.'}
          </p>

          {/* Search within commands */}
          <div className="pt-2 max-w-md">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'ar' ? 'ابحث عن أي أمر (مثال: commit, branch, merge)...' : 'Filter commands (e.g. commit, branch, restore)...'}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-4 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-900/90 border border-slate-800 rounded-xl overflow-x-auto text-xs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {cat.label[langKey]}
          </button>
        ))}
      </div>

      {/* Command Cards Grid */}
      <div className="space-y-6">
        {filtered.map((cmd) => {
          const isCopied = copiedId === cmd.id;
          return (
            <div
              key={cmd.id}
              className={`p-6 rounded-2xl border transition-all ${
                cmd.isDestructive
                  ? 'bg-slate-900/90 border-rose-900/60 shadow-rose-950/20'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Top Row: Command pill and category */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm sm:text-base font-bold text-emerald-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800" dir="ltr">
                    $ {cmd.command}
                  </span>
                  {cmd.isDestructive && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-rose-400 bg-rose-950/60 border border-rose-800 px-2 py-0.5 rounded">
                      <ShieldAlert className="w-3 h-3" />
                      {lang === 'ar' ? 'أمر حساس / تدميري' : 'Destructive Command'}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    {cmd.categoryName[langKey]}
                  </span>
                  <button
                    onClick={() => handleCopy(cmd.command, cmd.id)}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? t.copied : t.copyCode}</span>
                  </button>
                </div>
              </div>

              {/* Explanations */}
              <div className="py-4 space-y-3">
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  {cmd.explanation[langKey]}
                </p>

                {/* Safety Warning if destructive */}
                {cmd.safetyWarning && (
                  <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/80 text-xs text-rose-300 flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <p className="leading-relaxed font-semibold">
                      {cmd.safetyWarning[langKey]}
                    </p>
                  </div>
                )}
              </div>

              {/* Terminal Simulation & Example */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Practical Example */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {lang === 'ar' ? 'مثال عملي للاستخدام:' : 'Practical Usage Example:'}
                  </span>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs text-sky-300 text-left" dir="ltr">
                    <code>{cmd.example}</code>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    <strong className="text-slate-300">{t.whenToUse}: </strong>
                    {cmd.whenToUse[langKey]}
                  </p>
                </div>

                {/* Expected Output */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    <Terminal className="w-3 h-3" />
                    {t.terminalOutput}
                  </span>
                  <div className="bg-black/80 border border-slate-800 rounded-xl p-3 font-mono text-xs text-slate-300 text-left overflow-x-auto" dir="ltr">
                    <pre>
                      <code>{cmd.terminalOutput}</code>
                    </pre>
                  </div>
                  <p className="text-[11px] text-amber-400/90">
                    <strong className="text-amber-300">{t.commonMistakes}: </strong>
                    {cmd.commonMistakes[langKey]}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
