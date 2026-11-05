import React, { useState } from 'react';
import { Language, translations } from '../data/translations';
import {
  Upload,
  Terminal,
  FolderOpen,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  ExternalLink,
  ShieldAlert,
  GitBranch,
  Github,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Eye,
  Lock,
  Globe
} from 'lucide-react';

interface UploadToGithubTutorialProps {
  lang: Language;
  onOpenTerminal?: (initialCommand?: string) => void;
}

export const UploadToGithubTutorial: React.FC<UploadToGithubTutorialProps> = ({ lang, onOpenTerminal }) => {
  const t = translations[lang];
  const [activeStep, setActiveStep] = useState<number>(1);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      step: 1,
      title: {
        en: 'STEP 1 — Open your project in VS Code',
        fr: 'ÉTAPE 1 — Ouvrir votre projet dans VS Code',
        ar: 'الخطوة 1 — افتح مجلد مشروعك في محرر VS Code'
      },
      description: {
        en: 'Launch Visual Studio Code, click "File" -> "Open Folder..." (or press Ctrl+K Ctrl+O), and select your project folder named "my-website".',
        fr: 'Lancez VS Code, cliquez sur "Fichier" -> "Ouvrir le dossier..." et sélectionnez votre dossier "my-website".',
        ar: 'افتح برنامج Visual Studio Code، اضغط على "File" ثم "Open Folder..." واختر مجلد موقعك الذي يحمل الاسم "my-website".'
      },
      actionNote: {
        en: 'Make sure your folder contains your website files like index.html and style.css.',
        fr: 'Assurez-vous que votre dossier contient vos fichiers index.html et style.css.',
        ar: 'تأكد أن المجلد يحتوي على ملفات موقعك الأساسية مثل index.html و style.css.'
      },
      visualBadge: 'VS Code Explorer'
    },
    {
      step: 2,
      title: {
        en: 'STEP 2 — Open the integrated terminal',
        fr: 'ÉTAPE 2 — Ouvrir le terminal intégré',
        ar: 'الخطوة 2 — افتح الطرفية المدمجة في VS Code'
      },
      description: {
        en: 'In the top menu of VS Code, click "Terminal" -> "New Terminal", or press the keyboard shortcut: Ctrl + ` (backtick) on Windows/Linux or Cmd + ` on macOS.',
        fr: 'Dans le menu supérieur, cliquez sur "Terminal" -> "Nouveau Terminal" ou appuyez sur Ctrl + `.',
        ar: 'من القائمة العلوية في VS Code، اضغط على "Terminal" ثم "New Terminal"، أو استخدم الاختصار: Ctrl + ` في لوحة المفاتيح.'
      },
      actionNote: {
        en: 'The terminal opens directly at the bottom, pointing automatically to your "my-website" folder!',
        fr: 'Le terminal s\'ouvre directement en bas, déjà positionné dans votre dossier my-website.',
        ar: 'ستفتح نافذة سوداء في الأسفل وتكون موجهة تلقائياً داخل مسار مجلد my-website.'
      },
      visualBadge: 'Terminal Prompt'
    },
    {
      step: 3,
      title: {
        en: 'STEP 3 — Initialize Git in your project',
        fr: 'ÉTAPE 3 — Initialiser Git dans le projet',
        ar: 'الخطوة 3 — تهيئة مستودع Git محلياً'
      },
      command: 'git init',
      description: {
        en: 'This command tells Git: "Start watching and tracking this folder!". It creates a hidden database folder named .git.',
        fr: 'Cette commande indique à Git de commencer à surveiller ce dossier en créant un dossier masqué .git.',
        ar: 'هذا الأمر يخبر Git: "ابدأ بمراقبة هذا المجلد وتتبع أي تعديل فيه!". ويقوم بإنشاء مجلد مخفي باسم .git.'
      },
      output: 'Initialized empty Git repository in C:/Users/Dev/my-website/.git/',
      actionNote: {
        en: 'You only ever run this command ONCE at the start of your project.',
        fr: 'À exécuter UNE SEULE FOIS au début de votre projet.',
        ar: 'تنفذ هذا الأمر مرة واحدة فقط عند إنشاء المشروع.'
      }
    },
    {
      step: 4,
      title: {
        en: 'STEP 4 — Check project status (Red vs Green)',
        fr: 'ÉTAPE 4 — Vérifier le statut (Rouge vs Vert)',
        ar: 'الخطوة 4 — فحص حالة الملفات (اللون الأحمر والأخضر)'
      },
      command: 'git status',
      description: {
        en: 'Shows which files Git sees. Files in RED are "untracked" or "modified" but not yet saved in staging.',
        fr: 'Affiche l\'état. Les fichiers en ROUGE sont non suivis ou modifiés, pas encore indexés.',
        ar: 'يعرض حالة المشروع. الملفات باللون الأحمر تعني أنها غير مجهزة في الـ Staging Area ولم يتم تحضيرها للحفظ بعد.'
      },
      output: 'On branch main\n\nNo commits yet\n\nUntracked files:\n  (use "git add <file>..." to include in what will be committed)\n\tindex.html\n\tstyle.css\n\nnothing added to commit but untracked files present',
      actionNote: {
        en: 'Seeing red files is completely normal! In Step 5 we will stage them.',
        fr: 'Voir des fichiers rouges est normal ! À l\'étape 5, nous allons les indexer.',
        ar: 'رؤية الملفات باللون الأحمر أمر طبيعي جداً! في الخطوة التالية سنقوم بتجهيزها.'
      }
    },
    {
      step: 5,
      title: {
        en: 'STEP 5 — Add all project files to staging',
        fr: 'ÉTAPE 5 — Ajouter les fichiers à l\'index',
        ar: 'الخطوة 5 — إضافة وتجهيز جميع الملفات (git add .)'
      },
      command: 'git add .',
      description: {
        en: 'The dot "." means "everything in this directory!". It moves all your files from Red (untracked) to Green (Staged).',
        fr: 'Le point "." signifie "tout le dossier". Il passe vos fichiers du Rouge au Vert.',
        ar: 'النقطة "." تعني "كل الملفات والمجلدات في هذا المسار!". ينقل ملفاتك من اللون الأحمر إلى اللون الأخضر الجاهز للتوثيق.'
      },
      output: '# Silent success. If you run "git status" now, index.html and style.css will be GREEN!',
      actionNote: {
        en: 'Always make sure you have a .gitignore file so secrets (.env) are never added here!',
        fr: 'Vérifiez toujours votre .gitignore pour ne pas ajouter de mots de passe ou de clés API.',
        ar: 'تأكد دائماً من وجود ملف .gitignore لمنع إضافة ملفات كلمات المرور أو .env الحساسة.'
      }
    },
    {
      step: 6,
      title: {
        en: 'STEP 6 — Create your first commit snapshot',
        fr: 'ÉTAPE 6 — Créer votre premier commit',
        ar: 'الخطوة 6 — إنشاء أول لقطة توثيقية (Initial Commit)'
      },
      command: 'git commit -m "Initial commit"',
      description: {
        en: 'A commit is a permanent snapshot in time. The -m stands for "message". Always write a clear descriptive message!',
        fr: 'Un commit est une sauvegarde permanente horodatée. -m signifie "message".',
        ar: 'الـ Commit هو لقطة حفظ دائمة في سجل المشروع. حرف -m يعني رسالة وصفية تشرح ما قمت بإنجازه.'
      },
      output: '[main (root-commit) 3a8b41e] Initial commit\n 2 files changed, 120 insertions(+)\n create mode 100644 index.html\n create mode 100644 style.css',
      actionNote: {
        en: 'Congratulations! Your code is now safely backed up on your local machine.',
        fr: 'Félicitations ! Votre code est sauvegardé en local dans l\'historique Git.',
        ar: 'تهانينا! مشروعك الآن موثق ومحفوظ بأمان في حاسوبك المحلي.'
      }
    },
    {
      step: 7,
      title: {
        en: 'STEP 7 — Create a new GitHub repository',
        fr: 'ÉTAPE 7 — Créer un dépôt sur GitHub',
        ar: 'الخطوة 7 — إنشاء مستودع جديد على موقع GitHub'
      },
      description: {
        en: '1. Open github.com in your browser and sign in.\n2. In the top-right corner, click the "+" icon and choose "New repository".\n3. Repository name: enter "my-website".\n4. Select "Public".\n5. IMPORTANT: Leave "Add a README file" UNCHECKED because we already have a local project!\n6. Click "Create repository".',
        fr: '1. Ouvrez github.com et connectez-vous.\n2. Cliquez sur "+" en haut à droite -> "New repository".\n3. Nommez-le "my-website".\n4. Cochez "Public".\n5. IMPORTANT : Ne cochez PAS "Add README".\n6. Cliquez sur "Create repository".',
        ar: '1. افتح موقع github.com وسجل دخولك.\n2. اضغط على أيقونة (+) أعلى اليمين واختر "New repository".\n3. في خانة Repository name اكتب "my-website".\n4. اختر Public (عام).\n5. تنبيه مهم جداً: اترك خيار Add a README file فارغاً وغير مفعل لأن لدينا مشروعاً محلياً مسبقاً!\n6. اضغط على الزر الأخضر "Create repository".'
      },
      actionNote: {
        en: 'GitHub will now show you a page with your unique repository URL (e.g. https://github.com/USERNAME/my-website.git).',
        fr: 'GitHub affiche maintenant votre URL de dépôt unique.',
        ar: 'سيظهر لك GitHub صفحة تحتوي على رابط مستودعك الخاص.'
      },
      visualBadge: 'GitHub Web Interface'
    },
    {
      step: 8,
      title: {
        en: 'STEP 8 — Connect local project to GitHub',
        fr: 'ÉTAPE 8 — Connecter le projet local à GitHub',
        ar: 'الخطوة 8 — ربط مشروعك المحلي بمستودع GitHub'
      },
      command: 'git remote add origin https://github.com/USERNAME/my-website.git',
      description: {
        en: 'Replace "USERNAME" with your actual GitHub username! This tells Git where your cloud repository lives under the nickname "origin".',
        fr: 'Remplacez "USERNAME" par votre nom d\'utilisateur GitHub ! Cela lie votre dossier local au cloud.',
        ar: 'استبدل كلمة USERNAME باسم حسابك الفعلي على GitHub! هذا الأمر يخبر جهازك برابط المستودع السحابي ويسميه "origin".'
      },
      output: '# Silent success (Git quietly links the remote address)',
      actionNote: {
        en: 'You can verify the connection anytime by typing: git remote -v',
        fr: 'Vérifiez la connexion avec : git remote -v',
        ar: 'يمكنك التحقق من نجاح الربط بكتابة أمر: git remote -v'
      }
    },
    {
      step: 9,
      title: {
        en: 'STEP 9 — Set the default branch to "main"',
        fr: 'ÉTAPE 9 — Définir la branche principale "main"',
        ar: 'الخطوة 9 — ضبط اسم الفرع الرئيسي ليكون "main"'
      },
      command: 'git branch -M main',
      description: {
        en: 'Renames the current default branch to "main" (the international modern standard for primary production branches).',
        fr: 'Renomme la branche courante en "main" (le standard international moderne de GitHub).',
        ar: 'يضمن تسمية الفرع الأساسي باسم "main" المتوافق مع المعايير الدولية الحديثة لـ GitHub.'
      },
      output: '# Silent success',
      actionNote: {
        en: 'Ensures your branch name matches GitHub\'s default "main" branch.',
        fr: 'Garantit la correspondance parfaite avec la branche principale de GitHub.',
        ar: 'يمنع حدوث تشتت بين اسم master القديم واسم main الحديث.'
      }
    },
    {
      step: 10,
      title: {
        en: 'STEP 10 — Upload the project to GitHub!',
        fr: 'ÉTAPE 10 — Téléverser le projet sur GitHub !',
        ar: 'الخطوة 10 — رفع المشروع كاملاً إلى GitHub (git push)'
      },
      command: 'git push -u origin main',
      description: {
        en: 'This command pushes all your files and commit history up to GitHub! The -u sets upstream tracking so in the future you only need to type "git push".',
        fr: 'Envoie tous vos fichiers et commits sur GitHub ! Le paramètre -u configure le suivi pour les futurs push.',
        ar: 'يقوم برفع جميع ملفاتك وتاريخ الـ Commits إلى السحابة! وخيار -u يضبط التتبع لتكتب مستقبلاً git push فقط.'
      },
      output: 'Enumerating objects: 4, done.\nCounting objects: 100% (4/4), done.\nWriting objects: 100% (4/4), 1.25 KiB | 1.25 MiB/s, done.\nTo https://github.com/USERNAME/my-website.git\n * [new branch]      main -> main\nBranch \'main\' set up to track remote branch \'main\' from \'origin\'.',
      actionNote: {
        en: 'If a GitHub sign-in popup appears, click "Sign in with your browser" and authorize.',
        fr: 'Si une fenêtre d\'authentification s\'ouvre, validez la connexion dans votre navigateur.',
        ar: 'إذا ظهرت نافذة تسجيل دخول من GitHub، اضغط على "Sign in with your browser" للموافقة.'
      }
    },
    {
      step: 11,
      title: {
        en: 'STEP 11 — Verify the result on GitHub',
        fr: 'ÉTAPE 11 — Vérifier le résultat sur GitHub',
        ar: 'الخطوة 11 — التحقق من النتيجة ومشاهدة ملفاتك حية'
      },
      description: {
        en: 'Go back to your browser and refresh your GitHub repository page (F5). You will see all your files (index.html, style.css) beautifully displayed online with your commit message!',
        fr: 'Actualisez votre page GitHub (F5). Vos fichiers index.html et style.css apparaissent en ligne !',
        ar: 'ارجع إلى متصفحك واعمل تحديث (Refresh / F5) لصفحة المستودع على GitHub. ستجد كل ملفاتك وكودك مرفوعاً ومتاحاً على الإنترنت بنجاح!'
      },
      actionNote: {
        en: 'Your project is now safe in the cloud and ready to share with recruiters or deploy to GitHub Pages!',
        fr: 'Votre projet est sauvegardé dans le cloud et prêt pour GitHub Pages !',
        ar: 'مشروعك الآن محفوظ بالسحابة وجاهز لمشاركته مع العملاء أو نشره برابط مجاني عبر GitHub Pages!'
      },
      visualBadge: 'Mission Accomplished'
    }
  ];

  const current = steps[activeStep - 1];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950 border border-purple-800 text-xs text-purple-300 font-mono">
            <Upload className="w-3.5 h-3.5" />
            <span>SPECIAL MASTERCLASS: UPLOAD TO GITHUB</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {lang === 'ar'
              ? 'الدليل المصور الشامل: كيف ترفع مشروعك كاملاً من حاسوبك إلى GitHub'
              : lang === 'fr'
              ? 'Tutoriel Complet : Comment publier votre projet depuis votre PC vers GitHub'
              : 'The Ultimate Visual Guide: How to Upload an Entire Project to GitHub'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            {lang === 'ar'
              ? 'شرح خطوة بخطوة بالصور والأوامر الدقيقة لمشروع حقيقي (my-website). من فتح محرر VS Code حتى ظهور الملفات على حسابك في GitHub.'
              : lang === 'fr'
              ? 'Guide pas à pas avec commandes exactes pour un projet réel (my-website), de VS Code jusqu\'à GitHub.'
              : 'Step-by-step beginner-friendly tutorial for a realistic project (my-website). From opening VS Code to live verification on GitHub.'}
          </p>
        </div>
      </div>

      {/* Step Numbers Navigator */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg overflow-x-auto">
        <div className="flex items-center justify-between min-w-[700px] gap-2">
          {steps.map((s) => (
            <button
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              className={`flex-1 flex flex-col items-center py-2 px-1 rounded-xl transition-all cursor-pointer ${
                activeStep === s.step
                  ? 'bg-sky-500/20 border border-sky-500 text-sky-300 font-bold shadow-xs'
                  : activeStep > s.step
                  ? 'bg-emerald-950/30 text-emerald-400 border border-emerald-900/50'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="font-mono text-xs">{s.step < 10 ? `0${s.step}` : s.step}</span>
              <span className="text-[10px] truncate max-w-[80px]">
                {s.step === 1 ? 'VS Code' : s.step === 3 ? 'git init' : s.step === 5 ? 'git add' : s.step === 6 ? 'commit' : s.step === 7 ? 'GitHub' : s.step === 10 ? 'push' : `Step ${s.step}`}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Step Spotlight Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500 text-sky-400 flex items-center justify-center font-bold font-mono text-sm">
              {current.step}
            </span>
            <h3 className="text-lg sm:text-2xl font-bold text-white">
              {current.title[lang]}
            </h3>
          </div>

          <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            {current.visualBadge || 'Step ' + current.step + ' of 11'}
          </span>
        </div>

        {/* Detailed Description */}
        <div className="text-sm sm:text-base text-slate-200 leading-relaxed whitespace-pre-line bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80">
          {current.description[lang]}
        </div>

        {/* Command Box if available */}
        {current.command && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Terminal className="w-4 h-4" />
                {lang === 'ar' ? 'الأمر الذي يجب كتابته في الطرفية:' : 'Terminal Command to Run:'}
              </span>
              <button
                onClick={() => handleCopy(current.command!, current.step)}
                className="flex items-center gap-1 text-xs text-sky-400 hover:text-white px-2.5 py-1 rounded bg-slate-800 border border-slate-700 transition-colors cursor-pointer"
              >
                {copiedIndex === current.step ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIndex === current.step ? t.copied : t.copyCode}</span>
              </button>
            </div>

            <div className="bg-black/90 border border-slate-800 rounded-2xl p-4 font-mono text-sm sm:text-base text-sky-300 flex items-center justify-between text-left" dir="ltr">
              <code>$ {current.command}</code>
            </div>
          </div>
        )}

        {/* Terminal Output if available */}
        {current.output && (
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t.terminalOutput}:
            </span>
            <div className="bg-slate-950 border border-slate-800/90 rounded-2xl p-4 font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto text-left" dir="ltr">
              <pre>
                <code>{current.output}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Action Note */}
        <div className="p-4 rounded-2xl bg-sky-950/30 border border-sky-800/60 text-xs sm:text-sm text-sky-200 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{current.actionNote[lang]}</p>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-800">
          <button
            onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
            disabled={activeStep === 1}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl bg-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors cursor-pointer"
          >
            {lang === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{t.previous}</span>
          </button>

          <button
            onClick={() => setActiveStep((prev) => Math.min(steps.length, prev + 1))}
            disabled={activeStep === steps.length}
            className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold rounded-xl bg-sky-600 hover:bg-sky-500 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <span>{t.next}</span>
            {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Part 2: Uploading Future Changes */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          {lang === 'ar'
            ? 'كيف ترفع أي تعديل جديد في المستقبل؟ (دورة العمل اليومية)'
            : lang === 'fr'
            ? 'Comment publier de futures modifications ? (Routine quotidienne)'
            : 'How to Upload Future Changes (Daily 3-Step Routine)'}
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {lang === 'ar'
            ? 'بعد أن قمت برفع مشروعك لأول مرة، لن تحتاج لتكرار git init أو git remote add origin! كلما عدلت على موقعك مستقبلاً، نفذ هذه الأوامر الثلاثة فقط بالتسلسل:'
            : lang === 'fr'
            ? 'Pour toute future mise à jour, vous n\'avez plus besoin de git init ou remote add origin. Exécutez simplement ces 3 commandes :'
            : 'After initial setup, you never repeat git init or git remote add! Whenever you make edits in the future, simply run these three commands:'}
        </p>

        <div className="bg-black/80 border border-slate-800 rounded-2xl p-4 font-mono text-xs sm:text-sm text-emerald-300 space-y-2 text-left" dir="ltr">
          <div className="flex items-center justify-between">
            <span>git add .</span>
            <span className="text-slate-500 text-xs"># 1. تجهيز كل التعديلات الجديدة</span>
          </div>
          <div className="flex items-center justify-between">
            <span>git commit -m "Update website design and add contact section"</span>
            <span className="text-slate-500 text-xs"># 2. حفظ اللقطة مع رسالة توضيحية</span>
          </div>
          <div className="flex items-center justify-between">
            <span>git push</span>
            <span className="text-slate-500 text-xs"># 3. إرسال التحديثات مباشرة إلى GitHub!</span>
          </div>
        </div>
      </div>

      {/* Part 3: CRITICAL SECURITY & .GITIGNORE */}
      <div className="bg-rose-950/20 border border-rose-900/60 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 text-rose-400 font-bold">
          <ShieldAlert className="w-6 h-6 shrink-0" />
          <h3 className="text-base sm:text-lg">
            {lang === 'ar'
              ? 'تنبيه أمان صارم: ملف .gitignore وحماية كلمات المرور والأسرار'
              : lang === 'fr'
              ? 'Alerte de Sécurité Cruciale : Le fichier .gitignore et les secrets'
              : 'CRITICAL SECURITY: The .gitignore File & Protecting Secrets'}
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {lang === 'ar'
            ? 'إياك ثم إياك ورفع ملفات .env التي تحتوي على مفاتيح API سرية أو كلمات مرور قواعد البيانات إلى GitHub! روبوتات المخترقين تفحص المستودعات العامة كل ثانية. أنشئ ملفاً باسم ".gitignore" في جذر مشروعك واكتب بداخله:'
            : lang === 'fr'
            ? 'Ne téléversez JAMAIS de fichiers .env, de clés API ou de mots de passe sur GitHub ! Créez un fichier .gitignore à la racine et inscrivez-y :'
            : 'NEVER commit .env files containing API keys, database passwords, or private tokens to GitHub! Automated hacker bots scrape public repos every second. Create a ".gitignore" file at the project root and add:'}
        </p>

        <div className="bg-slate-950 border border-rose-900/60 rounded-2xl p-4 font-mono text-xs text-rose-300 text-left" dir="ltr">
          <pre>{`# الأسرار والمفاتيح الحساسة
.env
.env.local
*.pem
*.key

# مجلدات المكتبات الثقيلة
node_modules/
dist/

# ملفات النظام المؤقتة
.DS_Store
Thumbs.db`}</pre>
        </div>
      </div>
    </div>
  );
};
