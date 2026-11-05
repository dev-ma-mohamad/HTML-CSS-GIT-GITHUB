import React, { useState } from 'react';
import { PRACTICAL_PROJECTS, PracticalProject } from '../data/projectsData';
import { Language, translations } from '../data/translations';
import {
  Code2,
  Terminal,
  Play,
  Copy,
  Check,
  CheckCircle,
  Sparkles,
  Lightbulb,
  ExternalLink
} from 'lucide-react';

interface PracticalProjectsProps {
  lang: Language;
  onOpenInPlayground: (code: { html?: string; css?: string }) => void;
}

export const PracticalProjects: React.FC<PracticalProjectsProps> = ({ lang, onOpenInPlayground }) => {
  const t = translations[lang];
  const langKey = lang === 'ar' ? 'ar' : 'en';

  const [activeTab, setActiveTab] = useState<'all' | 'html' | 'css' | 'git' | 'github'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = PRACTICAL_PROJECTS.filter((p) => {
    return activeTab === 'all' || p.technology === activeTab;
  });

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-400">
          <Sparkles className="w-4 h-4" />
          <span>REAL-WORLD APPLICATION LAB</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {lang === 'ar' ? 'مشاريع عملية تطبيقية لكل تقنية' : 'Practical Hands-on Projects by Technology'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          {lang === 'ar'
            ? 'لا تكتفِ بالجانب النظري؛ نفذ مشاريع كاملة مع كود البداية الجاهز، خطوات التنفيذ، وإمكانية التجربة المباشرة في المختبر.'
            : 'Move beyond theory into reality: build tangible deliverables with complete starter templates and live sandboxes.'}
        </p>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 pt-3 overflow-x-auto text-xs">
          {[
            { id: 'all', label: t.allCategories },
            { id: 'html', label: 'HTML Projects' },
            { id: 'css', label: 'CSS Projects' },
            { id: 'git', label: 'Git Projects' },
            { id: 'github', label: 'GitHub Projects' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-sky-500 text-white font-semibold'
                  : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((proj) => {
          const isCopied = copiedId === proj.id;
          return (
            <div
              key={proj.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-5 hover:border-slate-700 transition-colors"
            >
              <div className="space-y-4">
                {/* Header Info */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-800">
                    {proj.technologyName[langKey]}
                  </span>
                  <div className="flex items-center gap-2 text-slate-400">
                    <span>{proj.duration}</span>
                    <span>·</span>
                    <span className="text-slate-300">{proj.difficulty}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white">
                  {proj.title[langKey]}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {proj.description[langKey]}
                </p>

                {/* Steps */}
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {t.instructions}:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {proj.instructions[langKey].map((step, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Expected Result */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                  <strong className="text-slate-300">{t.expectedResult}: </strong>
                  {proj.expectedResult[langKey]}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800 gap-2">
                {proj.starterCode.html || proj.starterCode.css ? (
                  <button
                    onClick={() =>
                      onOpenInPlayground({
                        html: proj.starterCode.html,
                        css: proj.starterCode.css
                      })
                    }
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white rounded-lg transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{t.openInPlayground}</span>
                  </button>
                ) : (
                  <div />
                )}

                <button
                  onClick={() =>
                    handleCopy(
                      proj.starterCode.html ||
                        proj.starterCode.css ||
                        (proj.starterCode.commands ? proj.starterCode.commands.join('\n') : ''),
                      proj.id
                    )
                  }
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? t.copied : t.copyCode}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
