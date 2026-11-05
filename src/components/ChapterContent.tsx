import React, { useState } from 'react';
import { Chapter } from '../data/guideContent';
import { Copy, Check, Terminal, Code, CheckCircle, Info, Sparkles } from 'lucide-react';

interface ChapterContentProps {
  chapter: Chapter;
}

export const ChapterContent: React.FC<ChapterContentProps> = ({ chapter }) => {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <article className="space-y-8">
      {/* Chapter Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-sky-600 dark:text-sky-400 mb-2">
          <span>الفصل {chapter.number}</span>
          <span>·</span>
          <span>{chapter.subtitle}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {chapter.title}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed max-w-3xl">
          {chapter.summary}
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-10">
        {chapter.sections.map((section) => (
          <section key={section.id} id={section.id} className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              {section.title}
            </h3>

            {/* Prose Content */}
            <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {section.content}
            </div>

            {/* Key Takeaways if available */}
            {section.keyTakeaways && section.keyTakeaways.length > 0 && (
              <div className="bg-sky-50/60 dark:bg-sky-950/30 border border-sky-200/80 dark:border-sky-800/60 rounded-xl p-4 my-4">
                <h4 className="text-xs font-bold text-sky-900 dark:text-sky-300 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  نقاط جوهرية لا تنساها:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  {section.keyTakeaways.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Table Data if available */}
            {section.tableData && (
              <div className="overflow-x-auto my-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
                <table className="w-full text-right text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
                      {section.tableData.headers.map((h, i) => (
                        <th key={i} className="p-3.5 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                    {section.tableData.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`p-3.5 leading-relaxed ${
                              cIdx === 0
                                ? 'font-bold text-sky-600 dark:text-sky-400 whitespace-nowrap'
                                : 'text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Code Snippets */}
            {section.codeSnippets && section.codeSnippets.length > 0 && (
              <div className="space-y-4 my-6">
                {section.codeSnippets.map((snippet, sIdx) => {
                  const snippetId = `${section.id}-${sIdx}`;
                  const isCopied = copiedSnippet === snippetId;
                  return (
                    <div
                      key={sIdx}
                      className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-sm"
                    >
                      {/* Code Header Bar */}
                      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sky-400 font-semibold">
                            {snippet.filename || snippet.language}
                          </span>
                          <span className="text-slate-500">·</span>
                          <span className="text-slate-400 text-[11px] truncate max-w-[280px] sm:max-w-md">
                            {snippet.description}
                          </span>
                        </div>
                        <button
                          onClick={() => handleCopy(snippet.code, snippetId)}
                          className="flex items-center gap-1 text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-[11px] text-emerald-400">تم النسخ</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span className="text-[11px]">نسخ</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Code Area */}
                      <div className="p-4 overflow-x-auto text-left" dir="ltr">
                        <pre className="text-xs sm:text-sm font-mono text-slate-200 leading-relaxed">
                          <code>{snippet.code}</code>
                        </pre>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        ))}
      </div>
    </article>
  );
};
