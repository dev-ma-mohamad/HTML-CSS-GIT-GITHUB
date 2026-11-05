import React, { useState } from 'react';
import { Language, translations } from '../data/translations';
import {
  Play,
  RotateCcw,
  Copy,
  Check,
  Download,
  Monitor,
  Tablet,
  Smartphone,
  Code2,
  Sparkles,
  Terminal
} from 'lucide-react';

interface CodePlaygroundProps {
  lang: Language;
  initialCode?: {
    html?: string;
    css?: string;
  };
}

const DEFAULT_HTML = `<!-- كود البورتفوليو الحديث بتأثيرات النيون -->
<div class="cyber-container">
  <header class="cyber-header">
    <div class="logo">&lt;WebDevMaster /&gt;</div>
    <span class="status-indicator">متاح للتوظيف 2026</span>
  </header>

  <main class="hero">
    <h1>مرحباً، أنا مطور واجهات أمامية</h1>
    <p>أقوم ببناء مواقع وتطبيقات ويب سريعة باستخدام HTML5 و CSS3 الحديثة و Git.</p>
    
    <div class="btn-group">
      <button class="btn btn-primary" onclick="triggerGlow()">شاهد أعمالي ⚡</button>
      <button class="btn btn-ghost" onclick="sayHello()">تواصل معي</button>
    </div>
  </main>

  <section class="cards-grid">
    <div class="neon-card">
      <span class="tag">HTML5 & CSS3</span>
      <h3>موقع تجارة إلكترونية</h3>
      <p>تصميم متجاوب بالكامل مع شبكات CSS Grid.</p>
    </div>
    <div class="neon-card">
      <span class="tag">Git & GitHub</span>
      <h3>نظام تحكم بالإصدارات</h3>
      <p>إدارة الفروع ورفع المشاريع على GitHub Pages.</p>
    </div>
  </section>
</div>`;

const DEFAULT_CSS = `/* تنسيقات CSS المستقبلية المتوهجة */
:root {
  --primary: #00f0ff;
  --secondary: #ec4899;
  --bg-deep: #090d16;
  --card-bg: rgba(15, 23, 42, 0.85);
  --border-glow: rgba(0, 240, 255, 0.25);
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  background-color: var(--bg-deep);
  color: var(--text-main);
  line-height: 1.6;
  direction: rtl;
  padding: 1.5rem;
}

.cyber-container {
  max-width: 800px;
  margin: 0 auto;
}

.cyber-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-glow);
}

.logo {
  font-family: monospace;
  font-weight: 800;
  color: var(--primary);
  font-size: 1.25rem;
}

.status-indicator {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.hero {
  text-align: center;
  padding: 3.5rem 1rem;
}

.hero h1 {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #00f0ff, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero p {
  color: var(--text-muted);
  max-width: 550px;
  margin: 0 auto 1.5rem;
}

.btn-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.btn-primary {
  background: linear-gradient(90deg, #00f0ff, #8b5cf6);
  color: #ffffff;
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.35);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 25px rgba(0, 240, 255, 0.6);
}

.btn-ghost {
  background: transparent;
  color: var(--text-main);
  border: 1px solid var(--border-glow);
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
}

.neon-card {
  background: var(--card-bg);
  border: 1px solid var(--border-glow);
  border-radius: 14px;
  padding: 1.5rem;
  transition: transform 0.2s, border-color 0.2s;
}

.neon-card:hover {
  transform: translateY(-4px);
  border-color: var(--primary);
}

.tag {
  font-size: 0.75rem;
  color: var(--primary);
  font-weight: 600;
  display: block;
  margin-bottom: 0.5rem;
}`;

const DEFAULT_JS = `// أكواد تفاعلية إضافية للزر
function triggerGlow() {
  document.body.style.filter = "hue-rotate(90deg)";
  setTimeout(() => {
    document.body.style.filter = "none";
  }, 1000);
}

function sayHello() {
  alert("شكراً لاهتمامك! تم بناء هذه المعاينة عبر مختبر WebDev Master.");
}`;

export const CodePlayground: React.FC<CodePlaygroundProps> = ({ lang, initialCode }) => {
  const t = translations[lang];

  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [htmlCode, setHtmlCode] = useState(initialCode?.html || DEFAULT_HTML);
  const [cssCode, setCssCode] = useState(initialCode?.css || DEFAULT_CSS);
  const [jsCode, setJsCode] = useState(DEFAULT_JS);

  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);

  const combinedSrcDoc = `
    <!DOCTYPE html>
    <html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          ${cssCode}
        </style>
      </head>
      <body>
        ${htmlCode}
        <script>
          ${jsCode}
        </script>
      </body>
    </html>
  `;

  const handleCopy = () => {
    let text = htmlCode;
    if (activeTab === 'css') text = cssCode;
    if (activeTab === 'js') text = jsCode;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setHtmlCode(DEFAULT_HTML);
    setCssCode(DEFAULT_CSS);
    setJsCode(DEFAULT_JS);
  };

  const handleDownload = () => {
    const fullHtml = `<!DOCTYPE html>
<html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">
<head>
  <meta charset="UTF-8">
  <title>Exported WebDev Project</title>
  <style>
${cssCode}
  </style>
</head>
<body>
${htmlCode}
  <script>
${jsCode}
  </script>
</body>
</html>`;
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getViewportClass = () => {
    switch (viewport) {
      case 'mobile':
        return 'max-w-[375px]';
      case 'tablet':
        return 'max-w-[720px]';
      case 'desktop':
      default:
        return 'w-full';
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Playground Ribbon */}
      <div className="flex flex-wrap items-center justify-between p-4 border-b border-slate-800 bg-slate-950/80 gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/40">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              {t.playground}
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                SANDBOX 2026
              </span>
            </h3>
            <p className="text-xs text-slate-400">{t.livePreview}</p>
          </div>
        </div>

        {/* Viewport Toggles & Actions */}
        <div className="flex items-center gap-2">
          {/* Responsive Viewport Buttons */}
          <div className="flex items-center p-1 rounded-lg bg-slate-800 border border-slate-700/80">
            <button
              onClick={() => setViewport('desktop')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewport === 'desktop'
                  ? 'bg-sky-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
              title={t.desktop}
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewport('tablet')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewport === 'tablet'
                  ? 'bg-sky-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
              title={t.tablet}
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewport('mobile')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewport === 'mobile'
                  ? 'bg-sky-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
              title={t.mobile}
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? t.copied : t.copyCode}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white rounded-lg transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.downloadCode}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors cursor-pointer"
            title={t.reset}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Editor & Preview Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[550px]">
        {/* Editor Half */}
        <div className="flex flex-col border-b lg:border-b-0 lg:border-l border-slate-800 bg-slate-950">
          {/* File Tabs */}
          <div className="flex items-center border-b border-slate-800 bg-slate-900 px-3">
            <button
              onClick={() => setActiveTab('html')}
              className={`px-4 py-2.5 text-xs font-mono font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === 'html'
                  ? 'border-sky-400 text-sky-400 bg-slate-950/70'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              index.html
            </button>
            <button
              onClick={() => setActiveTab('css')}
              className={`px-4 py-2.5 text-xs font-mono font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === 'css'
                  ? 'border-sky-400 text-sky-400 bg-slate-950/70'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              style.css
            </button>
            <button
              onClick={() => setActiveTab('js')}
              className={`px-4 py-2.5 text-xs font-mono font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === 'js'
                  ? 'border-sky-400 text-sky-400 bg-slate-950/70'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              script.js
            </button>
          </div>

          {/* Text Area */}
          <div className="flex-1 p-3">
            <textarea
              value={
                activeTab === 'html' ? htmlCode : activeTab === 'css' ? cssCode : jsCode
              }
              onChange={(e) => {
                if (activeTab === 'html') setHtmlCode(e.target.value);
                else if (activeTab === 'css') setCssCode(e.target.value);
                else setJsCode(e.target.value);
              }}
              spellCheck={false}
              className="w-full h-full min-h-[480px] bg-transparent text-slate-100 font-mono text-xs sm:text-sm outline-none resize-none leading-relaxed text-left"
              dir="ltr"
            />
          </div>
        </div>

        {/* Live Preview Half */}
        <div className="flex flex-col bg-slate-950/60 p-4 items-center justify-start overflow-hidden">
          <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 font-semibold text-emerald-400">
              <Play className="w-3.5 h-3.5 fill-emerald-400" />
              <span>{t.livePreview}</span>
            </div>
            <span className="font-mono text-xs text-slate-500">
              {viewport === 'mobile' ? '375px' : viewport === 'tablet' ? '720px' : '100%'}
            </span>
          </div>

          <div
            className={`w-full transition-all duration-200 h-[500px] bg-white rounded-xl shadow-xl overflow-hidden border border-slate-700/80 ${getViewportClass()}`}
          >
            <iframe
              title="Live Sandboxed Code Preview"
              srcDoc={combinedSrcDoc}
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-modals"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
