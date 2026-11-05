import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ChapterContent } from './components/ChapterContent';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { CodePlayground } from './components/CodePlayground';
import { InteractiveQuiz } from './components/InteractiveQuiz';
import { PdfDocumentView } from './components/PdfDocumentView';
import { CHAPTERS, GUIDE_METADATA } from './data/guideContent';
import {
  FileText,
  BookOpen,
  Terminal,
  HelpCircle,
  Printer,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Share2,
  Code2
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [viewMode, setViewMode] = useState<'guide' | 'pdf-view' | 'playground' | 'quiz'>('guide');
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // Sync dark class on document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handlePrint = () => {
    window.print();
  };

  const handleSelectTab = (tabId: string) => {
    if (tabId === 'quiz') {
      setViewMode('quiz');
    } else if (tabId === 'playground') {
      setViewMode('playground');
    } else {
      setViewMode('guide');
      setActiveTab(tabId);
      // If jumping to a chapter section, scroll to it
      if (tabId !== 'overview') {
        const el = document.getElementById(tabId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onPrint={handlePrint}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
      />

      {/* Main Container */}
      <main className="flex-1">
        {/* Hero Section (Hidden during print) */}
        <section className="no-print border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Text Info */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-sky-600 dark:text-sky-400">الدليل الأكاديمي الشامل</span>
                  <span>·</span>
                  <span>HTML, CSS, Git, GitHub & Portfolio</span>
                  <span>·</span>
                  <span>جاهز للطباعة كـ PDF</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
                  مرجعك المتكامل لاحتراف أدوات الويب وبناء البورتفوليو
                </h1>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                  شرح مبسط وعميق باللغة العربية والدارجة المغربية: الفرق الجذري بين HTML و CSS، الفرق بين Git و GitHub، مخطط دورة العمل الحقيقية، أمثلة كود حية، واختبار Quiz مع التصحيح والتعليل.
                </p>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setViewMode('pdf-view');
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white rounded-lg shadow-sm transition-all cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>معاينة وتحميل PDF (Print Guide)</span>
                  </button>

                  <button
                    onClick={() => setViewMode('playground')}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg transition-all cursor-pointer"
                  >
                    <Code2 className="w-4 h-4 text-sky-500" />
                    <span>محرر الكود المباشر</span>
                  </button>

                  <button
                    onClick={() => setViewMode('quiz')}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg transition-all cursor-pointer"
                  >
                    <HelpCircle className="w-4 h-4 text-amber-500" />
                    <span>اختبار Quiz والتصحيح</span>
                  </button>
                </div>
              </div>

              {/* Graphic Card / Generated Ecosystem Illustration */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 shadow-lg">
                  <img
                    src={GUIDE_METADATA.coverImage}
                    alt="Web Development Ecosystem"
                    className="w-full h-auto object-cover max-h-[320px]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="p-3 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span className="font-mono text-sky-400">WebDev Ecosystem 2026</span>
                    <span>HTML · CSS · Git · GitHub · Pages</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* View Switcher Ribbon (No print) */}
        <div className="no-print sticky top-16 z-30 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-2.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
            
            {/* View Mode Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg text-xs font-medium">
              <button
                onClick={() => setViewMode('guide')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  viewMode === 'guide'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>الدليل التفاعلي الكامل</span>
              </button>

              <button
                onClick={() => setViewMode('pdf-view')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  viewMode === 'pdf-view'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>صفحات كتاب الـ PDF المنظم</span>
              </button>

              <button
                onClick={() => setViewMode('playground')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  viewMode === 'playground'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>محرر الكود المباشر</span>
              </button>

              <button
                onClick={() => setViewMode('quiz')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  viewMode === 'quiz'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>اختبار Quiz (16 سؤالاً)</span>
              </button>
            </div>

            {/* Quick Export Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>طباعة / حفظ كـ PDF</span>
              </button>
            </div>

          </div>
        </div>

        {/* View Mode 1: PDF Document Book Mode */}
        {viewMode === 'pdf-view' && (
          <div className="py-6 px-4">
            <PdfDocumentView onPrint={handlePrint} />
          </div>
        )}

        {/* View Mode 2: Interactive Sandbox */}
        {viewMode === 'playground' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  مختبر كود البورتفوليو التفاعلي
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  جرّب تعديل العناوين، نصوص المشاريع، وألوان الـ CSS ولاحظ التغيير الفوري في شاشات الحواسيب والهواتف
                </p>
              </div>
            </div>
            <CodePlayground />
          </div>
        )}

        {/* View Mode 3: Interactive Quiz Mode */}
        {viewMode === 'quiz' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
            <InteractiveQuiz />
          </div>
        )}

        {/* View Mode 4: Comprehensive Interactive Guide Reader */}
        {viewMode === 'guide' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Sticky Sidebar Index (Desktop) */}
              <aside className="no-print hidden lg:block lg:col-span-3 sticky top-32 space-y-4">
                <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    فهرس الفصول والمواضيع
                  </h3>
                  <nav className="space-y-1">
                    {CHAPTERS.map((ch) => (
                      <a
                        key={ch.id}
                        href={`#${ch.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById(ch.id);
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                          setActiveTab(ch.id);
                        }}
                        className={`block text-xs font-medium py-2 px-2.5 rounded-lg transition-colors ${
                          activeTab === ch.id
                            ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 font-semibold'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <span className="font-mono text-[10px] text-slate-400 ml-1.5">{ch.number}.</span>
                        {ch.title}
                      </a>
                    ))}
                    
                    <button
                      onClick={() => setViewMode('quiz')}
                      className="w-full text-right block text-xs font-medium py-2 px-2.5 rounded-lg text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors"
                    >
                      <span className="font-mono text-[10px] ml-1.5">06.</span>
                      أسئلة Quiz مع التصحيح (16)
                    </button>
                  </nav>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                    <button
                      onClick={() => setViewMode('pdf-view')}
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold bg-sky-600 text-white rounded-lg hover:bg-sky-500 transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>عرض صفحات الـ PDF</span>
                    </button>
                  </div>
                </div>
              </aside>

              {/* Main Reading Flow */}
              <div className="lg:col-span-9 space-y-12">
                
                {/* Visual Architecture Diagram Section */}
                <div id="comparisons-integration">
                  <ArchitectureDiagram />
                </div>

                {/* Chapters Flow */}
                {CHAPTERS.map((chapter) => (
                  <div
                    key={chapter.id}
                    id={chapter.id}
                    className="p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs"
                  >
                    <ChapterContent chapter={chapter} />
                  </div>
                ))}

                {/* Embedded Live Code Playground Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        تجربة الكود عملياً في المحرر المباشر
                      </h3>
                      <p className="text-xs text-slate-500">
                        يمكنك تعديل أي جزء من كود الـ HTML أو CSS أدناه ورؤية النتيجة مباشرة
                      </p>
                    </div>
                  </div>
                  <CodePlayground />
                </div>

                {/* Embedded Quiz Section */}
                <div id="quiz" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        اختبار الـ Quiz التفاعلي مع التصحيح الفوري
                      </h3>
                      <p className="text-xs text-slate-500">
                        16 سؤالاً تطبيقياً مع شرح بالدارجة والفصحى لكل جواب صحيح
                      </p>
                    </div>
                  </div>
                  <InteractiveQuiz />
                </div>

              </div>

            </div>
          </div>
        )}

      </main>

      {/* Clean Footer (No print) */}
      <footer className="no-print mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 الدليل الشامل لأساسيات الويب وبناء البورتفوليو · مخصص للمهندسين والمطورين.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setViewMode('pdf-view')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              نسخة الـ PDF للطباعة
            </button>
            <button
              onClick={() => setViewMode('quiz')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              بنك الأسئلة والتصحيح
            </button>
            <button
              onClick={handlePrint}
              className="text-sky-600 dark:text-sky-400 font-semibold hover:underline"
            >
              حفظ كـ PDF
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
