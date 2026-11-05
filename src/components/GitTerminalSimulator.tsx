import React, { useState, useRef, useEffect } from 'react';
import {
  Terminal as TerminalIcon,
  Play,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Info,
  ChevronRight,
  HelpCircle,
  Copy,
  Check,
  ShieldCheck
} from 'lucide-react';
import { Language } from '../data/translations';

interface GitTerminalSimulatorProps {
  language: Language;
  onNavigateHome: () => void;
  onNavigateTutorial: () => void;
}

interface CommandHistoryItem {
  id: string;
  command: string;
  output: string;
  explanation?: Record<Language, string>;
  isError?: boolean;
}

interface Mission {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  steps: {
    commandPattern: RegExp;
    hint: Record<Language, string>;
  }[];
}

export const GitTerminalSimulator: React.FC<GitTerminalSimulatorProps> = ({
  language,
  onNavigateHome,
  onNavigateTutorial,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      id: 'welcome-1',
      command: '',
      output:
        'CYBER DEV GIT TERMINAL SIMULATOR v2.4.0\nType "help" to view available commands, or follow the guided missions on the right panel.\nWorking directory: ~/my-website',
    },
  ]);
  const [cmdHistoryList, setCmdHistoryList] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Simulated Git Repository State
  const [gitState, setGitState] = useState<{
    initialized: boolean;
    currentBranch: string;
    branches: string[];
    untrackedFiles: string[];
    stagedFiles: string[];
    commits: { hash: string; message: string; author: string; date: string }[];
    remoteOrigin: string | null;
  }>({
    initialized: false,
    currentBranch: 'main',
    branches: ['main'],
    untrackedFiles: ['index.html', 'style.css', 'app.js', 'README.md'],
    stagedFiles: [],
    commits: [],
    remoteOrigin: null,
  });

  // Current Mission State
  const [activeMissionIndex, setActiveMissionIndex] = useState(0);
  const [missionStepIndex, setMissionStepIndex] = useState(0);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const missions: Mission[] = [
    {
      id: 'm1',
      title: {
        en: 'Mission 1: Initialize & First Commit',
        fr: 'Mission 1: Initialiser & Premier Commit',
        ar: 'المهمة 1: تهيئة المستودع وأول إيداع (Commit)',
      },
      description: {
        en: 'Turn ~/my-website into a Git repository, stage your files, and create your very first commit.',
        fr: 'Transformez ~/my-website en dépôt Git, indexez vos fichiers et créez votre tout premier commit.',
        ar: 'حول مجلد المشروع ~/my-website إلى مستودع جيت، قم بتجهيز الملفات وأنشئ أول حفظ رسمي.',
      },
      steps: [
        {
          commandPattern: /^git\s+init$/,
          hint: {
            en: 'Run "git init" to create the .git folder',
            fr: 'Tapez "git init" pour créer le dossier .git',
            ar: 'اكتب "git init" لتهيئة مجلد .git المخفي',
          },
        },
        {
          commandPattern: /^git\s+status$/,
          hint: {
            en: 'Run "git status" to inspect untracked files',
            fr: 'Tapez "git status" pour voir les fichiers non suivis',
            ar: 'اكتب "git status" لمعاينة الملفات غير المتعقبة بالأحمر',
          },
        },
        {
          commandPattern: /^git\s+add\s+(\.|\*|README\.md|index\.html)$/,
          hint: {
            en: 'Run "git add ." to stage all project files',
            fr: 'Tapez "git add ." pour indexer tous les fichiers',
            ar: 'اكتب "git add ." لإضافة جميع الملفات إلى منطقة التجهيز',
          },
        },
        {
          commandPattern: /^git\s+commit\s+-m\s+["'].+["']$/,
          hint: {
            en: 'Run git commit -m "Initial commit" to save your snapshot',
            fr: 'Tapez git commit -m "Initial commit" pour enregistrer',
            ar: 'اكتب: git commit -m "Initial commit" لحفظ اللقطة',
          },
        },
      ],
    },
    {
      id: 'm2',
      title: {
        en: 'Mission 2: Branching & Isolation',
        fr: 'Mission 2: Branches & Isolation',
        ar: 'المهمة 2: الفروع والعزل البرمجي',
      },
      description: {
        en: 'Create a feature branch, switch to it safely, and check your active branch status.',
        fr: 'Créez une branche de fonctionnalité, basculez dessus et vérifiez son statut.',
        ar: 'أنشئ فرعاً جديداً لتطوير ميزة، انتقل إليه بأمان، وتأكد من الفرع النشط.',
      },
      steps: [
        {
          commandPattern: /^git\s+branch\s+[\w-/]+$/,
          hint: {
            en: 'Create a branch: "git branch feature/navbar"',
            fr: 'Créez une branche : "git branch feature/navbar"',
            ar: 'أنشئ فرعاً جديداً: "git branch feature/navbar"',
          },
        },
        {
          commandPattern: /^git\s+(switch|checkout)\s+feature\/navbar$/,
          hint: {
            en: 'Switch to it: "git switch feature/navbar"',
            fr: 'Basculez dessus : "git switch feature/navbar"',
            ar: 'انتقل للفرع الجديد: "git switch feature/navbar"',
          },
        },
        {
          commandPattern: /^git\s+branch$/,
          hint: {
            en: 'List branches: "git branch"',
            fr: 'Listez les branches : "git branch"',
            ar: 'اعرض قائمة الفروع: "git branch"',
          },
        },
      ],
    },
    {
      id: 'm3',
      title: {
        en: 'Mission 3: Connect Remote & Push',
        fr: 'Mission 3: Lier le Dépôt Distant & Push',
        ar: 'المهمة 3: ربط المستودع السحابي والدفع (Push)',
      },
      description: {
        en: 'Link your local repository to GitHub and push your main branch upstream.',
        fr: 'Liez votre dépôt local à GitHub et poussez votre branche principale.',
        ar: 'اربط مستودعك المحلي بحسابك على جيت هاب وادفع التغييرات إلى السحابة.',
      },
      steps: [
        {
          commandPattern: /^git\s+remote\s+add\s+origin\s+https:\/\/github\.com\/.+$/,
          hint: {
            en: 'Run "git remote add origin https://github.com/username/my-website.git"',
            fr: 'Tapez "git remote add origin https://github.com/username/my-website.git"',
            ar: 'اكتب "git remote add origin https://github.com/username/my-website.git"',
          },
        },
        {
          commandPattern: /^git\s+remote\s+-v$/,
          hint: {
            en: 'Verify remote: "git remote -v"',
            fr: 'Vérifiez le lien : "git remote -v"',
            ar: 'تحقق من الرابط: "git remote -v"',
          },
        },
        {
          commandPattern: /^git\s+push\s+(-u\s+origin\s+[\w-/]+|origin\s+[\w-/]+)$/,
          hint: {
            en: 'Push code: "git push -u origin main"',
            fr: 'Poussez le code : "git push -u origin main"',
            ar: 'ادفع الأكواد: "git push -u origin main"',
          },
        },
      ],
    },
  ];

  const currentMission = missions[activeMissionIndex];

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommandExecution = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    // Add to input history list
    setCmdHistoryList((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    if (cmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    let output = '';
    let isError = false;
    let explanation: Record<Language, string> | undefined = undefined;

    // Command parser simulation
    if (cmd === 'help') {
      output = `Available commands in this cyber simulator:\n  git init                  Initialize new Git repository\n  git status                Show working directory and staging status\n  git add <file> | .        Add files to staging area\n  git commit -m "<msg>"     Record snapshot of staged changes\n  git log | --oneline       Show commit logs\n  git branch [<name>]       List or create branches\n  git switch <name>         Switch branch\n  git checkout -b <name>    Create and switch branch\n  git remote add origin <u> Link remote GitHub repository\n  git remote -v             Show remote repositories\n  git push -u origin <b.>   Upload local branch commits to remote\n  git pull                  Fetch and integrate remote changes\n  git diff                  Show file changes\n  clear                     Clear the terminal screen`;
    } else if (cmd === 'git --version') {
      output = 'git version 2.44.0 (x86_64-cyber-dev)';
    } else if (cmd === 'git config --global user.name "Alex Cyber"' || cmd.startsWith('git config')) {
      output = '';
      explanation = {
        en: 'Configured Git author credentials locally.',
        fr: 'Identifiants de l\'auteur configurés avec succès.',
        ar: 'تم ضبط هوية المستخدم في إعدادات جيت بنجاح.',
      };
    } else if (cmd === 'git init') {
      if (gitState.initialized) {
        output = 'Reinitialized existing Git repository in /home/developer/my-website/.git/';
      } else {
        setGitState((prev) => ({ ...prev, initialized: true }));
        output = 'Initialized empty Git repository in /home/developer/my-website/.git/';
      }
      explanation = {
        en: 'Created hidden .git folder containing object database and refs.',
        fr: 'Dossier caché .git créé avec la base d\'objets et les références.',
        ar: 'تم إنشاء مجلد .git المخفي المسؤول عن تتبع التغييرات وقاعدة بيانات المشروع.',
      };
    } else if (cmd.startsWith('git status')) {
      if (!gitState.initialized) {
        output = 'fatal: not a git repository (or any of the parent directories): .git';
        isError = true;
      } else {
        const branchLine = `On branch ${gitState.currentBranch}\n`;
        let changesLine = '';

        if (gitState.commits.length === 0) {
          changesLine += 'No commits yet\n\n';
        }

        if (gitState.stagedFiles.length > 0) {
          changesLine += 'Changes to be committed:\n  (use "git restore --staged <file>..." to unstage)\n';
          gitState.stagedFiles.forEach((f) => {
            changesLine += `\t\x1b[32mnew file:   ${f}\x1b[0m\n`;
          });
          changesLine += '\n';
        }

        if (gitState.untrackedFiles.length > 0) {
          changesLine += 'Untracked files:\n  (use "git add <file>..." to include in what will be committed)\n';
          gitState.untrackedFiles.forEach((f) => {
            changesLine += `\t\x1b[31m${f}\x1b[0m\n`;
          });
          changesLine += '\n';
        }

        if (gitState.stagedFiles.length === 0 && gitState.untrackedFiles.length === 0) {
          changesLine += 'nothing to commit, working tree clean';
        }

        output = branchLine + changesLine;
      }
    } else if (cmd.startsWith('git add')) {
      if (!gitState.initialized) {
        output = 'fatal: not a git repository (or any of the parent directories): .git';
        isError = true;
      } else {
        const args = cmd.replace('git add', '').trim();
        if (args === '.' || args === '-A' || args === '*') {
          setGitState((prev) => ({
            ...prev,
            stagedFiles: [...prev.stagedFiles, ...prev.untrackedFiles],
            untrackedFiles: [],
          }));
          output = '';
          explanation = {
            en: 'All untracked and modified files moved to the Staging Area (index).',
            fr: 'Tous les fichiers ont été déplacés vers la zone de staging (index).',
            ar: 'تم نقل جميع الملفات إلى منطقة التجهيز (Staging Area) بنجاح.',
          };
        } else {
          setGitState((prev) => {
            const file = args;
            return {
              ...prev,
              stagedFiles: [...prev.stagedFiles, file],
              untrackedFiles: prev.untrackedFiles.filter((f) => f !== file),
            };
          });
          output = '';
        }
      }
    } else if (cmd.startsWith('git commit')) {
      if (!gitState.initialized) {
        output = 'fatal: not a git repository (or any of the parent directories): .git';
        isError = true;
      } else if (gitState.stagedFiles.length === 0) {
        output = 'On branch ' + gitState.currentBranch + '\nnothing to commit, working tree clean';
      } else {
        const match = cmd.match(/["'](.*)["']/);
        const msg = match ? match[1] : 'Commit update';
        const newHash = Math.random().toString(16).substring(2, 9);
        const fileCount = gitState.stagedFiles.length;

        setGitState((prev) => ({
          ...prev,
          commits: [
            {
              hash: newHash,
              message: msg,
              author: 'Developer <dev@code.net>',
              date: new Date().toLocaleDateString(),
            },
            ...prev.commits,
          ],
          stagedFiles: [],
        }));

        output = `[${gitState.currentBranch} (root-commit) ${newHash}] ${msg}\n ${fileCount} file${fileCount > 1 ? 's' : ''} changed, 142 insertions(+)`;
        explanation = {
          en: `Created commit object ${newHash} and advanced ${gitState.currentBranch} pointer.`,
          fr: `Objet commit ${newHash} créé, pointeur de branche mis à jour.`,
          ar: `تم إنشاء كائن حفظ دائم ${newHash} وتحديث مؤشر الفرع النشط.`,
        };
      }
    } else if (cmd === 'git log' || cmd === 'git log --oneline') {
      if (!gitState.initialized) {
        output = 'fatal: not a git repository (or any of the parent directories): .git';
        isError = true;
      } else if (gitState.commits.length === 0) {
        output = 'fatal: your current branch ' + gitState.currentBranch + ' does not have any commits yet';
        isError = true;
      } else {
        if (cmd.includes('--oneline')) {
          output = gitState.commits.map((c) => `${c.hash} ${c.message}`).join('\n');
        } else {
          output = gitState.commits
            .map(
              (c) =>
                `commit ${c.hash}8b394109c\nAuthor: ${c.author}\nDate:   ${c.date}\n\n    ${c.message}\n`
            )
            .join('\n');
        }
      }
    } else if (cmd.startsWith('git branch')) {
      if (!gitState.initialized) {
        output = 'fatal: not a git repository';
        isError = true;
      } else {
        const branchName = cmd.replace('git branch', '').trim();
        if (!branchName) {
          output = gitState.branches
            .map((b) => (b === gitState.currentBranch ? `* \x1b[32m${b}\x1b[0m` : `  ${b}`))
            .join('\n');
        } else {
          if (gitState.branches.includes(branchName)) {
            output = `fatal: A branch named '${branchName}' already exists.`;
            isError = true;
          } else {
            setGitState((prev) => ({
              ...prev,
              branches: [...prev.branches, branchName],
            }));
            output = '';
            explanation = {
              en: `Created new branch reference: refs/heads/${branchName}`,
              fr: `Nouvelle branche créée : refs/heads/${branchName}`,
              ar: `تم إنشاء مرجع الفرع الجديد: refs/heads/${branchName}`,
            };
          }
        }
      }
    } else if (cmd.startsWith('git switch') || cmd.startsWith('git checkout')) {
      if (!gitState.initialized) {
        output = 'fatal: not a git repository';
        isError = true;
      } else {
        const target = cmd
          .replace('git switch', '')
          .replace('git checkout -b', '')
          .replace('git checkout', '')
          .trim();

        if (cmd.includes('-b') && !gitState.branches.includes(target)) {
          setGitState((prev) => ({
            ...prev,
            branches: [...prev.branches, target],
            currentBranch: target,
          }));
          output = `Switched to a new branch '${target}'`;
        } else if (gitState.branches.includes(target)) {
          setGitState((prev) => ({ ...prev, currentBranch: target }));
          output = `Switched to branch '${target}'`;
        } else {
          output = `error: pathspec '${target}' did not match any file(s) known to git`;
          isError = true;
        }
      }
    } else if (cmd.startsWith('git remote add origin')) {
      const url = cmd.replace('git remote add origin', '').trim();
      setGitState((prev) => ({ ...prev, remoteOrigin: url }));
      output = '';
      explanation = {
        en: `Added remote repository pointer: origin -> ${url}`,
        fr: `Pointeur de dépôt distant ajouté : origin -> ${url}`,
        ar: `تم ربط المستودع البعيد origin بالرابط: ${url}`,
      };
    } else if (cmd === 'git remote -v') {
      if (gitState.remoteOrigin) {
        output = `origin  ${gitState.remoteOrigin} (fetch)\norigin  ${gitState.remoteOrigin} (push)`;
      } else {
        output = '';
      }
    } else if (cmd.startsWith('git push')) {
      if (!gitState.remoteOrigin) {
        output = 'fatal: No configured push destination.\nUse "git remote add origin <url>" first.';
        isError = true;
      } else {
        output = `Enumerating objects: 6, done.\nCounting objects: 100% (6/6), done.\nDelta compression using up to 8 threads\nCompressing objects: 100% (4/4), done.\nWriting objects: 100% (6/6), 842 bytes | 842.00 KiB/s, done.\nTotal 6 (delta 0), reused 0 (delta 0), pack-reused 0\nTo ${gitState.remoteOrigin}\n * [new branch]      ${gitState.currentBranch} -> ${gitState.currentBranch}\nbranch '${gitState.currentBranch}' set up to track 'origin/${gitState.currentBranch}'.`;
        explanation = {
          en: `Uploaded local commits to GitHub repository over HTTPS.`,
          fr: `Commits locaux téléversés sur le dépôt GitHub.`,
          ar: `تم رفع التغييرات والحفظ السحابي بنجاح إلى مستودع GitHub!`,
        };
      }
    } else if (cmd === 'git pull') {
      output = 'Already up to date.';
    } else if (cmd === 'git diff') {
      output = 'No working tree changes unstaged.';
    } else {
      output = `bash: ${cmd}: command not found. Type "help" to see available Git simulator commands.`;
      isError = true;
    }

    // Check mission progress
    if (currentMission && missionStepIndex < currentMission.steps.length) {
      const currentStep = currentMission.steps[missionStepIndex];
      if (currentStep.commandPattern.test(cmd)) {
        if (missionStepIndex + 1 < currentMission.steps.length) {
          setMissionStepIndex((prev) => prev + 1);
        } else {
          // Mission completed!
          setMissionStepIndex((prev) => prev + 1);
        }
      }
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: cmd,
        output,
        explanation,
        isError,
      },
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommandExecution(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistoryList.length === 0) return;
      const nextIdx = historyIndex + 1 < cmdHistoryList.length ? historyIndex + 1 : historyIndex;
      setHistoryIndex(nextIdx);
      setInputVal(cmdHistoryList[cmdHistoryList.length - 1 - nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistoryList[cmdHistoryList.length - 1 - nextIdx] || '');
      } else {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  const resetSimulator = () => {
    setGitState({
      initialized: false,
      currentBranch: 'main',
      branches: ['main'],
      untrackedFiles: ['index.html', 'style.css', 'app.js', 'README.md'],
      stagedFiles: [],
      commits: [],
      remoteOrigin: null,
    });
    setHistory([
      {
        id: 'reset-msg',
        command: '',
        output: 'Repository reset to clean initial state.\nWorking directory: ~/my-website',
      },
    ]);
    setMissionStepIndex(0);
  };

  const copyMissionHint = (cmdText: string, id: string) => {
    navigator.clipboard.writeText(cmdText);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const quickCommands = [
    'git init',
    'git status',
    'git add .',
    'git commit -m "Initial commit"',
    'git log --oneline',
    'git branch feature/navbar',
    'git switch feature/navbar',
    'git remote -v',
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="text-xs uppercase font-mono tracking-wider text-slate-400 hover:text-cyan-400 transition-colors"
            >
              ← {language === 'ar' ? 'الرئيسية' : language === 'fr' ? 'Accueil' : 'Home'}
            </button>
            <span className="text-slate-600">/</span>
            <span className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold">
              Interactive Git Terminal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetSimulator}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'إعادة تعيين' : language === 'fr' ? 'Réinitialiser' : 'Reset Repo'}</span>
            </button>

            <button
              onClick={onNavigateTutorial}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/40 text-xs font-mono text-cyan-300 hover:bg-cyan-500/20 transition-colors"
            >
              <span>{language === 'ar' ? 'دليل رفع المشروع بالكامل' : language === 'fr' ? 'Tutoriel GitHub Complet' : 'Upload Tutorial'}</span>
            </button>
          </div>
        </div>

        {/* Title & Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono uppercase tracking-widest shadow-[0_0_12px_rgba(16,185,129,0.2)]">
            <TerminalIcon className="w-4 h-4 text-emerald-400" />
            <span>Real Git Shell Simulator</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
            {language === 'ar'
              ? 'محاكي تيرمينال جيت التفاعلي الحقيقي'
              : language === 'fr'
              ? 'Simulateur Terminal Git Interactif'
              : 'Interactive Git Terminal Simulator'}
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {language === 'ar'
              ? 'تدرب بحرية على أوامر Git وكأنك تعمل على موجه أوامر حقيقي. جرب init، add، commit، branch وتتبع التغيرات خطوة بخطوة مع مهام تعليمية موجهة!'
              : language === 'fr'
              ? 'Entraînez-vous aux commandes Git comme sur un vrai terminal bash. Exécutez init, add, commit, branch et visualisez l\'impact sous le capot.'
              : 'Execute real Git commands in an interactive simulated Bash environment. Practice branching, staging, committing, and remote pushing with zero risk.'}
          </p>
        </div>

        {/* Main Grid: Terminal Window + Guided Missions Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Terminal (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Terminal Window Frame */}
            <div
              onClick={() => inputRef.current?.focus()}
              className="rounded-3xl bg-slate-950 border border-slate-800 shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden font-mono text-sm cursor-text transition-all ring-1 ring-slate-800 focus-within:ring-cyan-500/50"
            >
              {/* Window Titlebar */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800/80 select-none">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs text-slate-400 ml-2 font-mono flex items-center gap-1.5">
                    <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
                    bash - developer@cyber-station:~/my-website
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {gitState.initialized ? (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30 font-semibold">
                      git:({gitState.currentBranch})
                    </span>
                  ) : (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-500 border border-slate-700">
                      no-git
                    </span>
                  )}
                </div>
              </div>

              {/* Terminal Screen Body */}
              <div className="p-5 min-h-[460px] max-h-[580px] overflow-y-auto space-y-4 text-xs sm:text-sm">
                {history.map((h) => (
                  <div key={h.id} className="space-y-1">
                    {h.command && (
                      <div className="flex items-start gap-2 text-slate-400">
                        <span className="text-cyan-400 select-none">developer@cyber:~/my-website$</span>
                        <span className="text-slate-100 font-bold">{h.command}</span>
                      </div>
                    )}
                    {h.output && (
                      <pre
                        className={`whitespace-pre-wrap leading-relaxed ${
                          h.isError
                            ? 'text-rose-400'
                            : h.output.includes('fatal:')
                            ? 'text-rose-400'
                            : 'text-slate-300'
                        }`}
                      >
                        {h.output}
                      </pre>
                    )}
                    {h.explanation && (
                      <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs flex items-start gap-2 mt-1">
                        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{h.explanation[language]}</span>
                      </div>
                    )}
                  </div>
                ))}

                {/* Active Prompt Input Line */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-cyan-400 select-none shrink-0 font-bold text-xs sm:text-sm">
                    developer@cyber:~/my-website{gitState.initialized ? ` (${gitState.currentBranch})` : ''}$
                  </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder='type "help", "git init", "git status"...'
                    autoFocus
                    spellCheck={false}
                    className="flex-1 bg-transparent text-slate-100 outline-none font-mono text-xs sm:text-sm caret-cyan-400"
                  />
                </div>
                <div ref={terminalEndRef} />
              </div>
            </div>

            {/* Quick Command Buttons */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                {language === 'ar' ? 'أوامر سريعة بنقرة واحدة:' : language === 'fr' ? 'Commandes rapides en 1 clic :' : 'Quick 1-Click Commands:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {quickCommands.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleCommandExecution(q)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800 text-xs font-mono text-cyan-300 transition-colors"
                  >
                    <code>{q}</code>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Guided Missions & Git Status (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Mission Selector Card */}
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 space-y-5 backdrop-blur-md shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-slate-100 text-sm">
                    {language === 'ar' ? 'المهمات التعليمية الموجهة' : language === 'fr' ? 'Missions Guidées' : 'Guided Missions'}
                  </h3>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  {activeMissionIndex + 1} / {missions.length}
                </span>
              </div>

              {/* Mission Tabs */}
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {missions.map((m, idx) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setActiveMissionIndex(idx);
                      setMissionStepIndex(0);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all border shrink-0 ${
                      activeMissionIndex === idx
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                        : 'bg-slate-800/80 text-slate-400 border-slate-700/80 hover:text-slate-200'
                    }`}
                  >
                    M{idx + 1}
                  </button>
                ))}
              </div>

              {/* Active Mission Details */}
              <div className="space-y-2">
                <h4 className="font-bold text-cyan-300 text-sm">
                  {currentMission.title[language]}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {currentMission.description[language]}
                </p>
              </div>

              {/* Mission Step List */}
              <div className="space-y-3 pt-2">
                {currentMission.steps.map((step, sIdx) => {
                  const isDone = sIdx < missionStepIndex;
                  const isCurrent = sIdx === missionStepIndex;
                  return (
                    <div
                      key={sIdx}
                      className={`p-3.5 rounded-2xl border transition-all space-y-1.5 ${
                        isDone
                          ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                          : isCurrent
                          ? 'bg-cyan-950/30 border-cyan-500/50 text-cyan-200 ring-1 ring-cyan-500/30'
                          : 'bg-slate-950/40 border-slate-800 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <div
                              className={`w-4 h-4 rounded-full border text-[10px] flex items-center justify-center font-mono ${
                                isCurrent
                                  ? 'border-cyan-400 text-cyan-400 font-bold'
                                  : 'border-slate-700 text-slate-600'
                              }`}
                            >
                              {sIdx + 1}
                            </div>
                          )}
                          <span className="font-semibold text-xs">
                            Step {sIdx + 1}
                          </span>
                        </div>

                        {isDone && (
                          <span className="text-[10px] font-mono uppercase text-emerald-400">
                            Done
                          </span>
                        )}
                      </div>

                      <p className="text-xs leading-normal">
                        {step.hint[language]}
                      </p>
                    </div>
                  );
                })}

                {missionStepIndex >= currentMission.steps.length && (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-cyan-950/40 border border-emerald-500/40 text-center space-y-2">
                    <Sparkles className="w-6 h-6 text-emerald-400 mx-auto" />
                    <p className="text-xs font-bold text-emerald-300">
                      {language === 'ar'
                        ? 'تهانينا! لقد أكملت هذه المهمة بنجاح.'
                        : language === 'fr'
                        ? 'Félicitations ! Mission accomplie avec succès.'
                        : 'Awesome! Mission completed successfully!'}
                    </p>
                    {activeMissionIndex + 1 < missions.length && (
                      <button
                        onClick={() => {
                          setActiveMissionIndex((prev) => prev + 1);
                          setMissionStepIndex(0);
                        }}
                        className="px-4 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
                      >
                        {language === 'ar' ? 'الانتقال للمهمة التالية ←' : language === 'fr' ? 'Mission suivante →' : 'Next Mission →'}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Live Repository Tree Inspector */}
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 space-y-4 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                  <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
                  {language === 'ar' ? 'فاحص حالة المستودع الحية' : language === 'fr' ? 'Inspecteur du Dépôt' : 'Live Repo Inspector'}
                </span>
                <span className="text-xs font-mono text-cyan-400">
                  {gitState.currentBranch}
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">
                    Git Initialized:
                  </span>
                  <span className={gitState.initialized ? 'text-emerald-400' : 'text-rose-400'}>
                    {gitState.initialized ? 'Yes (.git folder active)' : 'No (run git init)'}
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">
                    Staged Files (Green):
                  </span>
                  {gitState.stagedFiles.length > 0 ? (
                    <div className="text-emerald-400">
                      {gitState.stagedFiles.join(', ')}
                    </div>
                  ) : (
                    <span className="text-slate-600">None</span>
                  )}
                </div>

                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">
                    Untracked Files (Red):
                  </span>
                  {gitState.untrackedFiles.length > 0 ? (
                    <div className="text-rose-400">
                      {gitState.untrackedFiles.join(', ')}
                    </div>
                  ) : (
                    <span className="text-slate-600">None</span>
                  )}
                </div>

                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">
                    Commits Count:
                  </span>
                  <span className="text-cyan-300">
                    {gitState.commits.length} snapshot(s)
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">
                    Remote Origin:
                  </span>
                  <span className="text-purple-300 break-all">
                    {gitState.remoteOrigin || 'Not connected'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
