import React, { useState } from 'react';
import { Copy, Check, RotateCcw, Monitor, Tablet, Smartphone, Play, Sparkles } from 'lucide-react';

const INITIAL_HTML = `<!-- هيكل البورتفوليو الشخصي -->
<div class="portfolio-wrap">
  <header class="top-nav">
    <div class="brand">&lt;HamzaDev /&gt;</div>
    <nav class="nav-links">
      <a href="#about">عني</a>
      <a href="#skills">المهارات</a>
      <a href="#projects">المشاريع</a>
      <a href="#contact" class="contact-pill">اتصل بي</a>
    </nav>
  </header>

  <main>
    <section class="hero">
      <span class="badge">متاح للعمل الحر والتوظيف · 2026</span>
      <h1>مرحباً، أنا حمزة كاتب كود ويب متقن</h1>
      <p class="tagline">أقوم بتحويل التصاميم إلى مواقع وتطبيقات ويب سريعة باستخدام HTML5 و CSS3 الحديثة و JavaScript.</p>
      <div class="cta-group">
        <a href="#projects" class="btn btn-main">تصفح المشاريع</a>
        <a href="https://github.com" target="_blank" class="btn btn-ghost">حساب GitHub</a>
      </div>
    </section>

    <section id="projects" class="projects">
      <h2>أبرز المشاريع</h2>
      <div class="grid">
        <div class="card">
          <div class="card-tag">HTML · CSS Grid</div>
          <h3>متجر رقمي سريع</h3>
          <p>واجهة متجر إلكتروني متجاوبة بالكامل تدعم الوضع الليلي وسلة التسوق.</p>
          <div class="card-links">
            <a href="#" class="demo-link">معاينة مباشرة ←</a>
            <a href="#" class="code-link">الكود المصدري</a>
          </div>
        </div>

        <div class="card">
          <div class="card-tag">Responsive · Flexbox</div>
          <h3>لوحة تحكم للمقالات</h3>
          <p>تطبيق إدارة محتوى شخصي خفيف وسريع التحميل على كل الأجهزة.</p>
          <div class="card-links">
            <a href="#" class="demo-link">معاينة مباشرة ←</a>
            <a href="#" class="code-link">الكود المصدري</a>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="foot">
    <p>© 2026 تم البناء بـ HTML & CSS · مرفوع ومستضاف عبر GitHub Pages</p>
  </footer>
</div>`;

const INITIAL_CSS = `/* التنسيقات العصرية للبورتفوليو */
:root {
  --primary: #0284c7;
  --primary-hover: #0369a1;
  --bg-main: #0b1120;
  --surface: #1e293b;
  --border: #334155;
  --text-title: #f8fafc;
  --text-body: #94a3b8;
  --font-family: system-ui, -apple-system, sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-family);
  background-color: var(--bg-main);
  color: var(--text-title);
  line-height: 1.6;
  direction: rtl;
}

.portfolio-wrap {
  min-height: 100vh;
  padding: 1.5rem 1rem;
  max-width: 900px;
  margin: 0 auto;
}

.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border);
}

.brand {
  font-family: monospace;
  font-weight: 700;
  color: var(--primary);
  font-size: 1.15rem;
}

.nav-links {
  display: flex;
  gap: 1.25rem;
  align-items: center;
}

.nav-links a {
  color: var(--text-body);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.15s;
}

.nav-links a:hover {
  color: var(--text-title);
}

.contact-pill {
  background: rgba(2, 132, 199, 0.15);
  color: var(--primary) !important;
  border: 1px solid rgba(2, 132, 199, 0.3);
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  font-weight: 500;
}

.hero {
  padding: 3.5rem 0 3rem;
  text-align: center;
}

.badge {
  display: inline-block;
  font-size: 0.75rem;
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  margin-bottom: 1rem;
}

.hero h1 {
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 800;
  line-height: 1.25;
  margin-bottom: 1rem;
}

.tagline {
  color: var(--text-body);
  max-width: 600px;
  margin: 0 auto 2rem;
  font-size: 1.05rem;
}

.cta-group {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.65rem 1.4rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.btn-main {
  background-color: var(--primary);
  color: #fff;
}

.btn-main:hover {
  background-color: var(--primary-hover);
}

.btn-ghost {
  border: 1px solid var(--border);
  color: var(--text-title);
}

.btn-ghost:hover {
  background-color: var(--surface);
}

.projects {
  padding: 3rem 0;
  border-top: 1px solid var(--border);
}

.projects h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: right;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
}

.card {
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: right;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-3px);
}

.card-tag {
  font-size: 0.75rem;
  color: var(--primary);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.card h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.card p {
  color: var(--text-body);
  font-size: 0.9rem;
  margin-bottom: 1.25rem;
}

.card-links {
  display: flex;
  gap: 1rem;
}

.demo-link {
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
  font-size: 0.85rem;
}

.code-link {
  color: var(--text-body);
  text-decoration: none;
  font-size: 0.85rem;
}

.foot {
  text-align: center;
  padding: 2.5rem 0 1rem;
  color: var(--text-body);
  font-size: 0.8rem;
  border-top: 1px solid var(--border);
}`;

export const CodePlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'html' | 'css'>('html');
  const [htmlCode, setHtmlCode] = useState<string>(INITIAL_HTML);
  const [cssCode, setCssCode] = useState<string>(INITIAL_CSS);
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [copied, setCopied] = useState<boolean>(false);

  const combinedSrcDoc = `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          ${cssCode}
        </style>
      </head>
      <body>
        ${htmlCode}
      </body>
    </html>
  `;

  const handleCopy = () => {
    const textToCopy = activeTab === 'html' ? htmlCode : cssCode;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setHtmlCode(INITIAL_HTML);
    setCssCode(INITIAL_CSS);
  };

  const getViewportWidth = () => {
    switch (viewport) {
      case 'mobile':
        return 'max-w-[375px]';
      case 'tablet':
        return 'max-w-[680px]';
      case 'desktop':
      default:
        return 'w-full';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
      {/* Playground Header */}
      <div className="flex flex-wrap items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              محرر الكود المباشر للبورتفوليو (Live Sandbox)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              عدّل كود الـ HTML و CSS وشاهد النتيجة تظهر حياً في الجانب المقابل
            </p>
          </div>
        </div>

        {/* Viewport & Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-0.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-xs">
            <button
              onClick={() => setViewport('desktop')}
              className={`p-1.5 rounded-md transition-colors ${
                viewport === 'desktop'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
              title="عرض الديسكتوب"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewport('tablet')}
              className={`p-1.5 rounded-md transition-colors ${
                viewport === 'tablet'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
              title="عرض التابلت"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewport('mobile')}
              className={`p-1.5 rounded-md transition-colors ${
                viewport === 'mobile'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
              title="عرض الهاتف"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'تم النسخ' : 'نسخ الكود'}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            title="إعادة التعيين للكود الأصلي"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Editor & Live Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">
        {/* Left Side: Code Editor */}
        <div className="flex flex-col border-b lg:border-b-0 lg:border-l border-slate-200 dark:border-slate-800 bg-slate-950">
          {/* File Tabs */}
          <div className="flex items-center border-b border-slate-800 bg-slate-900 px-3">
            <button
              onClick={() => setActiveTab('html')}
              className={`px-4 py-2 text-xs font-mono font-medium border-b-2 transition-colors ${
                activeTab === 'html'
                  ? 'border-sky-500 text-sky-400 bg-slate-950/60'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              index.html
            </button>
            <button
              onClick={() => setActiveTab('css')}
              className={`px-4 py-2 text-xs font-mono font-medium border-b-2 transition-colors ${
                activeTab === 'css'
                  ? 'border-sky-500 text-sky-400 bg-slate-950/60'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              style.css
            </button>
          </div>

          {/* Textarea Editor */}
          <div className="relative flex-1 p-2">
            <textarea
              value={activeTab === 'html' ? htmlCode : cssCode}
              onChange={(e) => {
                if (activeTab === 'html') {
                  setHtmlCode(e.target.value);
                } else {
                  setCssCode(e.target.value);
                }
              }}
              spellCheck={false}
              className="w-full h-full min-h-[460px] bg-transparent text-slate-200 font-mono text-xs sm:text-sm p-3 outline-none resize-none leading-relaxed selection:bg-sky-500/30 text-left"
              dir="ltr"
            />
          </div>
        </div>

        {/* Right Side: Live Interactive Preview */}
        <div className="flex flex-col bg-slate-900/40 p-4 items-center justify-start overflow-hidden">
          <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
              <span>المعاينة المباشرة التفاعلية (Live Preview)</span>
            </div>
            <span className="font-mono text-xs">
              {viewport === 'mobile' ? '375px' : viewport === 'tablet' ? '680px' : '100%'}
            </span>
          </div>

          <div className={`w-full transition-all duration-200 h-[480px] bg-white rounded-lg shadow-sm overflow-hidden border border-slate-300 dark:border-slate-700 ${getViewportWidth()}`}>
            <iframe
              title="Portfolio Live Preview"
              srcDoc={combinedSrcDoc}
              className="w-full h-full border-0"
              sandbox="allow-scripts"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
