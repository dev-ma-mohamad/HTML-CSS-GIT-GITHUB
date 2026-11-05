import React, { useState } from 'react';
import { ALL_GIT_COMMANDS, GIT_COMMAND_COMPARISONS, ComprehensiveGitCommand, CommandComparison } from '../data/gitCommandsData';
import { Language, translations } from '../data/translations';
import {
  Terminal,
  Search,
  Copy,
  Check,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  Scale,
  Code
} from 'lucide-react';

interface GitCommandsExplainedProps {
  lang: Language;
}

export const GitCommandsExplained: React.FC<GitCommandsExplainedProps> = ({ lang }) => {
  const t = translations[lang];

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'comparisons' | 'config' | 'staging' | 'branching' | 'remote' | 'undo'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredCommands = ALL_GIT_COMMANDS.filter((cmd) => {
    const matchTab = activeTab === 'all' || cmd.category === activeTab;
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      cmd.command.toLowerCase().includes(q) ||
      cmd.whatItDoes[lang].toLowerCase().includes(q) ||
      cmd.categoryLabel[lang].toLowerCase().includes(q);
    return matchTab && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
          <Terminal className="w-4 h-4" />
          <span>GIT COMPREHENSIVE COMMAND ENCYCLOPEDIA</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          {lang === 'ar'
            ? 'شرح كل أمر من أوامر Git بالتفصيل الممل خطوة بخطوة'
            : lang === 'fr'
            ? 'Toutes les Commandes Git Expliquées Pas à Pas'
            : 'Git Commands Explained: Step by Step Technical Reference'}
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          {lang === 'ar'
            ? 'كل أمر مشروح بـ 12 معياراً دقيقاً: الصيغة، ما يفعله، لماذا ومتى نستخدمه، أين نكتبه، ناتج الطرفية، مقارنات دقيقة، وحلول الأخطاء الشائعة.'
            : lang === 'fr'
            ? 'Chaque commande est détaillée avec 12 critères : syntaxe, utilité, terminal de frappe, sortie attendue, erreurs et résolutions.'
            : 'Every command dissected with all 12 facets: syntax, purpose, execution context, terminal output, differences, and error resolutions.'}
        </p>

        {/* Search & Tabs */}
        <div className="pt-2 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'ar' ? 'ابحث في الأوامر والشروحات...' : 'Search commands (e.g. commit, push, reset)...'}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'all' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'ar' ? 'جميع الأوامر' : 'All Commands'}
            </button>
            <button
              onClick={() => setActiveTab('comparisons')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'comparisons' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'مقارنات الأوامر المتشابهة' : 'Command Comparisons'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Comparisons Tab View */}
      {activeTab === 'comparisons' ? (
        <div className="space-y-6">
          <div className="p-4 bg-purple-950/20 border border-purple-900/60 rounded-2xl text-xs sm:text-sm text-purple-200">
            <p className="font-semibold">
              {lang === 'ar'
                ? 'المقارنات الفاصلة: يخلط الكثير من المطورين بين أوامر متشابهة (مثل add و commit، أو fetch و pull). إليك الفروقات الجوهرية:'
                : 'Core Disambiguations: Clarifying commonly confused commands with side-by-side matrices.'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {GIT_COMMAND_COMPARISONS.map((comp) => (
              <div key={comp.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <h3 className="text-lg sm:text-xl font-bold text-white font-mono flex items-center gap-2">
                    <span className="text-sky-400">{comp.cmdA}</span>
                    <span className="text-slate-500">VS</span>
                    <span className="text-purple-400">{comp.cmdB}</span>
                  </h3>
                  <span className="text-xs font-mono text-slate-400 bg-slate-800 px-3 py-1 rounded-full">
                    Comparison
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {comp.summary[lang]}
                </p>

                {/* Comparison Table */}
                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-start text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-950 text-slate-300 font-bold border-b border-slate-800">
                        <th className="p-3">المعيار / Feature</th>
                        <th className="p-3 font-mono text-sky-400">{comp.cmdA}</th>
                        <th className="p-3 font-mono text-purple-400">{comp.cmdB}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                      {comp.comparisonPoints.map((pt, pIdx) => (
                        <tr key={pIdx} className="hover:bg-slate-800/40">
                          <td className="p-3 font-semibold text-white">{pt.feature[lang]}</td>
                          <td className="p-3">{pt.cmdAVal[lang]}</td>
                          <td className="p-3">{pt.cmdBVal[lang]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Verdict */}
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-emerald-300 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                  <p>
                    <strong className="text-white">{lang === 'ar' ? 'الخلاصة والقاعدة الذهبية: ' : 'Golden Rule: '}</strong>
                    {comp.verdict[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Regular Commands List with all 12 criteria */
        <div className="space-y-6">
          {filteredCommands.map((cmd) => {
            const isCopied = copiedId === cmd.id;
            return (
              <div
                key={cmd.id}
                className={`bg-slate-900 border rounded-3xl p-6 sm:p-8 shadow-xl space-y-5 transition-all ${
                  cmd.isDestructive ? 'border-rose-900/60' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* 1. Command Header & 12. Copy button */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-base sm:text-lg font-black text-emerald-400 bg-black px-3.5 py-1.5 rounded-xl border border-slate-800" dir="ltr">
                      $ {cmd.command}
                    </span>
                    {cmd.isDestructive && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-rose-400 bg-rose-950/60 border border-rose-800 px-2.5 py-1 rounded-full">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>{lang === 'ar' ? 'أمر حساس' : 'Destructive Warning'}</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg">
                      {cmd.categoryLabel[lang]}
                    </span>
                    <button
                      onClick={() => handleCopy(cmd.command, cmd.id)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? t.copied : t.copyCode}</span>
                    </button>
                  </div>
                </div>

                {/* 2. Exact Syntax & 6. Where to Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <span className="font-bold uppercase tracking-wider text-sky-400">
                      2. {t.syntax}:
                    </span>
                    <p className="font-mono text-sky-300 text-left" dir="ltr">{cmd.syntax}</p>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <span className="font-bold uppercase tracking-wider text-purple-400">
                      6. {lang === 'ar' ? 'أين يكتب هذا الأمر؟' : 'Where to Type:'}
                    </span>
                    <p className="text-slate-300 font-mono text-[11px]">{cmd.whereToType}</p>
                  </div>
                </div>

                {/* 3. What it does, 4. Why we use it, 5. When to use it */}
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
                    <p className="text-slate-200 leading-relaxed">
                      <strong className="text-emerald-400">3. {lang === 'ar' ? 'ماذا يفعل الأمر؟ ' : 'What it does: '}</strong>
                      {cmd.whatItDoes[lang]}
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                      <strong className="text-sky-400">4. {lang === 'ar' ? 'لماذا نستخدمه؟ ' : 'Why we use it: '}</strong>
                      {cmd.whyWeUseIt[lang]}
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                      <strong className="text-amber-400">5. {t.whenToUse}: </strong>
                      {cmd.whenToUseIt[lang]}
                    </p>
                  </div>
                </div>

                {/* 7. Real example & 8. Expected output & 9. What happens after */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      7. {lang === 'ar' ? 'مثال عملي حقيقي:' : 'Real Example:'}
                    </span>
                    <div className="bg-black/90 border border-slate-800 rounded-xl p-3 font-mono text-xs text-sky-300 text-left" dir="ltr">
                      <code>$ {cmd.realExample}</code>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                      <strong className="text-slate-200">9. {lang === 'ar' ? 'ماذا يحدث بعد تنفيذه؟ ' : 'After execution: '}</strong>
                      {cmd.whatHappensAfter[lang]}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                      <Terminal className="w-3.5 h-3.5" />
                      8. {t.terminalOutput}:
                    </span>
                    <div className="bg-black/90 border border-slate-800 rounded-xl p-3 font-mono text-xs text-slate-300 overflow-x-auto text-left" dir="ltr">
                      <pre>
                        <code>{cmd.expectedOutput}</code>
                      </pre>
                    </div>
                  </div>
                </div>

                {/* 10. Difference & 11. Common errors & fix */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-slate-300 space-y-1">
                    <strong className="text-sky-300 block">
                      10. {lang === 'ar' ? 'الفرق بينه وبين الأوامر المشابهة:' : 'Difference with similar commands:'}
                    </strong>
                    <p className="leading-relaxed">{cmd.differenceWithSimilar[lang]}</p>
                  </div>

                  <div className="p-3.5 bg-rose-950/20 rounded-xl border border-rose-900/40 text-rose-200 space-y-1">
                    <strong className="text-rose-400 block flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      11. {cmd.commonErrorsAndFixes[lang].split('->')[0]}
                    </strong>
                    <p className="leading-relaxed">{cmd.commonErrorsAndFixes[lang]}</p>
                  </div>
                </div>

                {/* Safety Warning */}
                {cmd.safetyWarning && (
                  <div className="p-3.5 bg-rose-950/40 border border-rose-800 rounded-xl text-xs text-rose-300 flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <p className="font-semibold leading-relaxed">
                      {cmd.safetyWarning[lang]}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
