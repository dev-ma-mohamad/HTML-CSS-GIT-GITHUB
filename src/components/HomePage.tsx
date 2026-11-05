import React from 'react';
import { Language, translations } from '../data/translations';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import {
  Code2,
  Terminal,
  Github,
  Award,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Layers,
  Cpu,
  UploadCloud,
  FileCode,
  Sliders,
  FolderGit2,
  BarChart3,
  CheckCircle2,
  Palette,
  Play
} from 'lucide-react';

interface HomePageProps {
  lang: Language;
  onNavigate: (view: string, lessonId?: string) => void;
  completedLessons: string[];
}

export const HomePage: React.FC<HomePageProps> = ({ lang, onNavigate, completedLessons }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';

  // Calculate actual completion rates
  const htmlDone = completedLessons.filter((id) => id.startsWith('html')).length;
  const cssDone = completedLessons.filter((id) => id.startsWith('css')).length;
  const githubDone = completedLessons.filter((id) => id.startsWith('gh')).length;

  const htmlProgress = Math.min(100, Math.round((htmlDone / 22) * 100));
  const cssProgress = Math.min(100, Math.round((cssDone / 20) * 100));
  const gitProgress = 65; // Interactive terminal & 26 commands progress
  const githubProgress = Math.min(100, Math.round((githubDone / 12) * 100));

  // The 12 requested categories
  const categories = [
    {
      id: 'html-course',
      title: {
        en: 'HTML Academy',
        fr: 'Académie HTML',
        ar: 'أكاديمية HTML',
      }[lang],
      badge: 'HTML5',
      description: {
        en: 'Master semantic web structure: tags, forms, tables, media, accessibility, and modern SEO basics.',
        fr: 'Structure web sémantique : balises, formulaires, tableaux, accessibilité et bases SEO.',
        ar: 'بنية الويب الدلالية من الصفر: الوسوم، النماذج، الجداول، الوسائط، ومعايير SEO و A11y.',
      }[lang],
      lessonsCount: { en: '22 Lessons', fr: '22 Leçons', ar: '22 درساً' }[lang],
      progress: htmlProgress,
      icon: Code2,
      gradient: 'from-orange-500 via-amber-500 to-yellow-500',
      borderGlow: 'hover:border-amber-500/60 hover:shadow-[0_0_25px_rgba(245,158,11,0.25)]',
      btnText: t.startLearning,
    },
    {
      id: 'css-course',
      title: {
        en: 'CSS Academy',
        fr: 'Académie CSS',
        ar: 'أكاديمية CSS',
      }[lang],
      badge: 'CSS3',
      description: {
        en: 'Deep-dive into the Box Model, Flexbox, CSS Grid 2D layouts, responsive queries, and neon keyframes.',
        fr: 'Modèle de boîte, Flexbox, CSS Grid, requêtes média réactives et animations néon.',
        ar: 'نموذج الصندوق، التخطيط المرن (Flexbox)، شبكات Grid، التحريك، والتصميم المتجاوب للشاشات.',
      }[lang],
      lessonsCount: { en: '20 Lessons', fr: '20 Leçons', ar: '20 درساً' }[lang],
      progress: cssProgress,
      icon: Layers,
      gradient: 'from-sky-400 via-blue-500 to-indigo-500',
      borderGlow: 'hover:border-sky-500/60 hover:shadow-[0_0_25px_rgba(56,189,248,0.25)]',
      btnText: t.startLearning,
    },
    {
      id: 'git-course',
      title: {
        en: 'Git Complete Course',
        fr: 'Cours Complet Git',
        ar: 'دورة Git المتكاملة',
      }[lang],
      badge: 'VCS',
      description: {
        en: 'Master version control on your machine: tracking snapshots, commit history, branching, and rebasing.',
        fr: 'Contrôle de version local : snapshots, historique des commits, branches et gestion des conflits.',
        ar: 'آلة الزمن لكودك: تتبع التغييرات، شجرة الفروع، حل التعارضات، وحفظ لقطات المشروع محلياً.',
      }[lang],
      lessonsCount: { en: '26 Commands', fr: '26 Commandes', ar: '26 أمراً مفصلاً' }[lang],
      progress: gitProgress,
      icon: FolderGit2,
      gradient: 'from-emerald-400 via-teal-500 to-cyan-500',
      borderGlow: 'hover:border-emerald-500/60 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)]',
      btnText: t.startLearning,
    },
    {
      id: 'github-course',
      title: {
        en: 'GitHub Complete Course',
        fr: 'Cours Complet GitHub',
        ar: 'دورة GitHub المتكاملة',
      }[lang],
      badge: 'Cloud',
      description: {
        en: 'Collaborate in the cloud: remote repositories, pull requests, code reviews, issues, and GitHub Pages.',
        fr: 'Collaboration cloud : dépôts distants, pull requests, issues et déploiement GitHub Pages.',
        ar: 'السحابة البرمجية العالمية: المستودعات البعيدة، Pull Requests، المراجعات، ونشر المواقع مجاناً.',
      }[lang],
      lessonsCount: { en: '12 Lessons', fr: '12 Leçons', ar: '12 درساً' }[lang],
      progress: githubProgress,
      icon: Github,
      gradient: 'from-purple-500 via-violet-500 to-pink-500',
      borderGlow: 'hover:border-purple-500/60 hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]',
      btnText: t.startLearning,
    },
    {
      id: 'upload-tutorial',
      title: {
        en: 'Upload Your Project to GitHub',
        fr: 'Uploader Votre Projet sur GitHub',
        ar: 'رفع مشروعك بالكامل على GitHub',
      }[lang],
      badge: 'Step-by-Step',
      description: {
        en: 'Comprehensive 11-step visual guide uploading "my-website" from VS Code to GitHub with .gitignore rules.',
        fr: 'Guide visuel pas à pas en 11 étapes pour téléverser votre projet local vers GitHub sans fuite de secrets.',
        ar: 'الدليل البصري المتكامل المكون من 11 خطوة لرفع مشروع my-website من الحاسوب مع حماية الملفات السرية.',
      }[lang],
      lessonsCount: { en: '11 Steps Tutorial', fr: '11 Étapes Détaillées', ar: '11 خطوة عملية' }[lang],
      progress: 90,
      icon: UploadCloud,
      gradient: 'from-cyan-400 via-blue-500 to-purple-600',
      borderGlow: 'hover:border-cyan-400/60 hover:shadow-[0_0_25px_rgba(0,240,255,0.3)]',
      btnText: { en: 'Open Tutorial', fr: 'Ouvrir le Guide', ar: 'فتح الدليل العملي' }[lang],
    },
    {
      id: 'git-commands',
      title: {
        en: 'Git Commands Explained',
        fr: 'Commandes Git Expliquées',
        ar: 'شرح جميع أوامر Git بالتفصيل',
      }[lang],
      badge: '12 Criteria',
      description: {
        en: 'Every command analyzed across 12 criteria: syntax, purpose, where to run, output, errors, and comparisons.',
        fr: 'Chaque commande analysée selon 12 critères : syntaxe, rôle, terminal, sortie, erreurs et comparaisons.',
        ar: 'شرح كل أمر وفق 12 معياراً دقيقاً: الصياغة، متى وأين نكتبه، الناتج المتوقع، الأخطاء، والمقارنات الثنائية.',
      }[lang],
      lessonsCount: { en: '26 Commands + 7 Comp.', fr: '26 Cmds + 7 Comp.', ar: '26 أمراً + 7 مقارنات' }[lang],
      progress: 75,
      icon: Terminal,
      gradient: 'from-rose-500 via-pink-500 to-purple-500',
      borderGlow: 'hover:border-rose-500/60 hover:shadow-[0_0_25px_rgba(244,63,94,0.25)]',
      btnText: { en: 'Explore Commands', fr: 'Explorer les Commandes', ar: 'استكشاف الأوامر' }[lang],
    },
    {
      id: 'css-properties',
      title: {
        en: 'CSS Properties Explained',
        fr: 'Propriétés CSS Expliquées',
        ar: 'شرح خصائص CSS من A إلى J',
      }[lang],
      badge: 'Categories A-J',
      description: {
        en: 'Properties from Basics to Modern CSS with interactive live property value switchers and mistake fixes.',
        fr: 'Propriétés de A à J avec sélecteurs de valeurs interactifs en direct et prévention des erreurs.',
        ar: 'دليل الخصائص من الفئة أ إلى ي مع إمكانية تجربة القيم مباشرة ومعاينة تأثيرها على الصندوق التفاعلي.',
      }[lang],
      lessonsCount: { en: '10 Categories A-J', fr: '10 Catégories A-J', ar: '10 فئات من أ إلى ي' }[lang],
      progress: 80,
      icon: Palette,
      gradient: 'from-pink-500 via-purple-500 to-indigo-500',
      borderGlow: 'hover:border-pink-500/60 hover:shadow-[0_0_25px_rgba(236,72,153,0.25)]',
      btnText: { en: 'Explore CSS A-J', fr: 'Explorer CSS A-J', ar: 'استعراض الخصائص' }[lang],
    },
    {
      id: 'terminal-simulator',
      title: {
        en: 'Interactive Terminal',
        fr: 'Terminal Interactif',
        ar: 'محاكي التيرمينال التفاعلي',
      }[lang],
      badge: 'Shell Engine',
      description: {
        en: 'Realistic bash terminal to run git init, add, commit, branch, and push with guided missions.',
        fr: 'Terminal bash réaliste pour exécuter git init, add, commit, branch et push avec des missions guidées.',
        ar: 'موجه أوامر حي للتدرب على أوامر Git وكتابتها يدوياً مع مهام موجهة وتحليل فوري لحالة المستودع.',
      }[lang],
      lessonsCount: { en: '3 Guided Missions', fr: '3 Missions Guidées', ar: '3 مهمات موجهة' }[lang],
      progress: 60,
      icon: Cpu,
      gradient: 'from-emerald-400 via-green-500 to-teal-600',
      borderGlow: 'hover:border-emerald-400/60 hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]',
      btnText: { en: 'Launch Terminal', fr: 'Lancer le Terminal', ar: 'تشغيل التيرمينال' }[lang],
    },
    {
      id: 'css-playground',
      title: {
        en: 'CSS Visual Playground',
        fr: 'Playground CSS Visuel',
        ar: 'مختبر CSS المرئي بالسلايدرز',
      }[lang],
      badge: 'Live Sliders',
      description: {
        en: 'Real-time controls for neon glows, border-radius, flexbox layout, and instant CSS code generation.',
        fr: 'Contrôles curseurs en direct pour les ombres néon, arrondis, flexbox et génération CSS instantanée.',
        ar: 'مختبر مرئي بأشرطة تمرير لتعديل الحواف، التوهج، والـ Flexbox مع نسخ كود CSS فوراً.',
      }[lang],
      lessonsCount: { en: 'Real-time Canvas', fr: 'Canvas Dynamique', ar: 'لوحة تفاعلية حية' }[lang],
      progress: 100,
      icon: Sliders,
      gradient: 'from-blue-500 via-indigo-500 to-purple-600',
      borderGlow: 'hover:border-blue-400/60 hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]',
      btnText: { en: 'Open Playground', fr: 'Ouvrir le Lab', ar: 'دخول المختبر' }[lang],
    },
    {
      id: 'playground',
      title: {
        en: 'Practice Exercises & Code Editor',
        fr: 'Exercices & Éditeur de Code',
        ar: 'تمارين تطبيقية ومحرر الأكواد',
      }[lang],
      badge: 'Editor',
      description: {
        en: 'In-browser HTML & CSS editor with real-time preview, code download, and pre-built exercise templates.',
        fr: 'Éditeur HTML & CSS dans le navigateur avec prévisualisation en direct et modèles d\'exercices.',
        ar: 'محرر أكواد HTML و CSS حي داخل المتصفح مع معاينة فورية، وتحميل للملفات، وتمارين جاهزة.',
      }[lang],
      lessonsCount: { en: 'Interactive Sandbox', fr: 'Bac à sable', ar: 'بيئة تجريبية حرة' }[lang],
      progress: 85,
      icon: FileCode,
      gradient: 'from-amber-400 via-orange-500 to-rose-500',
      borderGlow: 'hover:border-amber-400/60 hover:shadow-[0_0_25px_rgba(251,191,36,0.25)]',
      btnText: { en: 'Practice Now', fr: 'S\'entraîner', ar: 'ابدأ التدريب' }[lang],
    },
    {
      id: 'quiz',
      title: {
        en: 'Quizzes & Certification Exams',
        fr: 'Quiz & Examens de Certification',
        ar: 'الاختبارات والامتحانات التقييمية',
      }[lang],
      badge: '60+ Qs',
      description: {
        en: 'Evaluate your knowledge with verified multi-choice questions across beginner, intermediate, and advanced.',
        fr: 'Évaluez vos compétences avec des questions à choix multiples vérifiées et corrections détaillées.',
        ar: 'أكثر من 60 سؤالاً امتحانياً تغطي جميع اللغات مع عداد زمني، توضيح الإجابات، وحساب النقاط.',
      }[lang],
      lessonsCount: { en: '60+ Exam Questions', fr: '60+ Questions', ar: '60+ سؤالاً مع التعليل' }[lang],
      progress: 70,
      icon: Award,
      gradient: 'from-yellow-400 via-amber-500 to-orange-600',
      borderGlow: 'hover:border-yellow-400/60 hover:shadow-[0_0_25px_rgba(250,204,21,0.25)]',
      btnText: { en: 'Take Quiz', fr: 'Passer un Quiz', ar: 'بدء الاختبار' }[lang],
    },
    {
      id: 'projects',
      title: {
        en: 'Real Projects & Portfolio',
        fr: 'Projets Réels & Portfolio',
        ar: 'المشاريع العملية وبناء البورتفوليو',
      }[lang],
      badge: 'Portfolio Ready',
      description: {
        en: 'Build real-world developer portfolios, cards, and deploy them live to showcase to clients and recruiters.',
        fr: 'Construisez de vrais portfolios de développeur et déployez-les pour vos futurs clients et recruteurs.',
        ar: 'بناء وتصميم مواقع وبورتفوليو حقيقي من الصفر ونشره على الإنترنت لتقديمه للعملاء وأصحاب العمل.',
      }[lang],
      lessonsCount: { en: '4 Real Projects', fr: '4 Projets Réels', ar: '4 مشاريع تطبيقية' }[lang],
      progress: 50,
      icon: Sparkles,
      gradient: 'from-violet-500 via-fuchsia-500 to-pink-500',
      borderGlow: 'hover:border-fuchsia-400/60 hover:shadow-[0_0_25px_rgba(217,70,239,0.25)]',
      btnText: { en: 'View Projects', fr: 'Voir les Projets', ar: 'عرض المشاريع' }[lang],
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-b border-slate-800 bg-radial from-slate-900 via-slate-950 to-black">
        {/* Ambient background particles & grid */}
        <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[340px] bg-gradient-to-tr from-cyan-500/15 via-purple-500/15 to-pink-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-xs text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.15)] font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-semibold tracking-wide">
              {lang === 'ar'
                ? 'أكاديمية تطوير الويب المتكاملة · HTML · CSS · Git · GitHub'
                : lang === 'fr'
                ? 'Académie Web Développement Complète · HTML · CSS · Git · GitHub'
                : 'Next-Gen Full Developer Learning Platform · 2026 Edition'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
            {lang === 'ar' ? (
              <>
                تعلم تطوير الويب من <span className="rgb-gradient-text">الصفر إلى الاحتراف</span>
              </>
            ) : lang === 'fr' ? (
              <>
                Maîtrisez le Développement Web de <span className="rgb-gradient-text">Zéro à Pro</span>
              </>
            ) : (
              <>
                Master Web Development from <span className="rgb-gradient-text">Zero to Hero</span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {lang === 'ar'
              ? 'منصة شاملة لشرح HTML5، CSS3، Git و GitHub مع محاكي تيرمينال حقيقي، دليل رفع المشاريع، ومختبر CSS المرئي!'
              : lang === 'fr'
              ? 'Apprenez HTML, CSS, Git et GitHub avec un terminal interactif réel, guide de publication de projet et laboratoire CSS visuel.'
              : 'Learn HTML, CSS, Git, and GitHub through interactive lessons, real terminal simulation, upload tutorials, and live CSS playgrounds.'}
          </p>

          {/* Quick Hero CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('upload-tutorial')}
              className="flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:opacity-95 text-white rounded-xl shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <UploadCloud className="w-4 h-4" />
              <span>{lang === 'ar' ? 'دليل رفع مشروعك إلى GitHub' : lang === 'fr' ? 'Guide Upload GitHub' : 'Upload Project to GitHub'}</span>
              {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>

            <button
              onClick={() => onNavigate('terminal-simulator')}
              className="flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-emerald-400 rounded-xl border border-emerald-500/30 transition-all cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.15)]"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'ar' ? 'محاكي التيرمينال' : lang === 'fr' ? 'Terminal Git' : 'Git Terminal Simulator'}</span>
            </button>

            <button
              onClick={() => onNavigate('css-playground')}
              className="flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-purple-300 rounded-xl border border-purple-500/30 transition-all cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.15)]"
            >
              <Sliders className="w-4 h-4 text-purple-400" />
              <span>{lang === 'ar' ? 'مختبر CSS المرئي' : lang === 'fr' ? 'Labo CSS' : 'CSS Playground'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* The 12 Main Clickable Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {lang === 'ar'
                  ? 'لوحة الأقسام والمقررات التفاعلية (12 مساراً)'
                  : lang === 'fr'
                  ? 'Tableau des Modules & Cours Interactifs (12 Catégories)'
                  : 'Interactive Learning Dashboard (12 Modules)'}
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {lang === 'ar'
                ? 'انقر على أي بطاقة للانتقال الفوري إلى الدروس، المحاكيات، أو الاختبارات الخاصة بها'
                : lang === 'fr'
                ? 'Cliquez sur n\'importe quelle carte pour accéder aux leçons, simulateurs ou quiz'
                : 'Click any category card to launch its dedicated lessons, live simulator, or hands-on playground'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <BarChart3 className="w-4 h-4" />
            <span>{t.dashboard}</span>
          </button>
        </div>

        {/* 12 Clickable Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => onNavigate(card.id)}
                className={`group cursor-pointer rounded-3xl bg-slate-900/90 border border-slate-800/90 p-6 flex flex-col justify-between transition-all duration-300 shadow-xl backdrop-blur-sm relative overflow-hidden ${card.borderGlow} hover:-translate-y-1.5`}
              >
                {/* Neon accent corner effect */}
                <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-br ${card.gradient} opacity-5 group-hover:opacity-15 rounded-full blur-2xl transition-opacity pointer-events-none`} />

                <div className="space-y-4">
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`p-3 rounded-2xl bg-gradient-to-tr ${card.gradient} text-slate-950 font-bold shadow-lg`}
                    >
                      <Icon className="w-6 h-6 text-slate-950" />
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-800/90 text-cyan-300 border border-slate-700/80">
                      {card.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {card.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed min-h-[48px]">
                    {card.description}
                  </p>

                  {/* Progress & Lessons Info */}
                  <div className="space-y-1.5 pt-3 border-t border-slate-800/80">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>{card.lessonsCount}</span>
                      <span className="text-cyan-400 font-bold">{card.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className={`bg-gradient-to-r ${card.gradient} h-full transition-all duration-500`}
                        style={{ width: `${card.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-6">
                  <div className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold rounded-xl bg-slate-800/90 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-600 group-hover:text-slate-950 text-slate-200 transition-all">
                    <span>{card.btnText}</span>
                    {isRtl ? (
                      <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* End-to-End Architecture Workflow Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ArchitectureDiagram />
      </section>
    </div>
  );
};
