import { Language } from './translations';

export interface ComprehensiveGitCommand {
  id: string;
  command: string;
  syntax: string;
  category: 'config' | 'init' | 'staging' | 'branching' | 'remote' | 'undo' | 'advanced';
  categoryLabel: Record<Language, string>;
  whatItDoes: Record<Language, string>;
  whyWeUseIt: Record<Language, string>;
  whenToUseIt: Record<Language, string>;
  whereToType: string;
  realExample: string;
  expectedOutput: string;
  whatHappensAfter: Record<Language, string>;
  differenceWithSimilar: Record<Language, string>;
  commonErrorsAndFixes: Record<Language, string>;
  isDestructive?: boolean;
  safetyWarning?: Record<Language, string>;
}

export interface CommandComparison {
  id: string;
  title: string;
  cmdA: string;
  cmdB: string;
  summary: Record<Language, string>;
  comparisonPoints: {
    feature: Record<Language, string>;
    cmdAVal: Record<Language, string>;
    cmdBVal: Record<Language, string>;
  }[];
  verdict: Record<Language, string>;
}

export const ALL_GIT_COMMANDS: ComprehensiveGitCommand[] = [
  {
    id: 'git-version',
    command: 'git --version',
    syntax: 'git --version',
    category: 'config',
    categoryLabel: { en: 'Installation & Config', fr: 'Installation & Config', ar: 'التثبيت والإعداد' },
    whatItDoes: {
      en: 'Displays the currently installed Git software release number on your operating system.',
      fr: 'Affiche le numéro de version de Git actuellement installé sur votre système.',
      ar: 'يفحص ما إذا كان برنامج Git مثبتاً على حاسوبك ويعرض رقم الإصدار الحالي.'
    },
    whyWeUseIt: {
      en: 'To verify that Git is installed correctly and present in your system PATH environment variable.',
      fr: 'Pour vérifier que Git est correctement installé et accessible dans la variable PATH.',
      ar: 'للتأكد من نجاح تثبيت Git ووجوده في مسار النظام (PATH) قبل البدء في كتابة أوامر أخرى.'
    },
    whenToUseIt: {
      en: 'When setting up a new machine, after installing Git, or when troubleshooting path issues.',
      fr: 'Lors de la configuration d\'une nouvelle machine ou après l\'installation de Git.',
      ar: 'عند إعداد جهاز جديد أو بعد تحميل Git مباشرة أو عند الشك في عدم تعرف النظام على الأمر.'
    },
    whereToType: 'VS Code Terminal / Windows PowerShell / Git Bash / macOS Terminal / Linux Shell',
    realExample: 'git --version',
    expectedOutput: 'git version 2.44.0.windows.1',
    whatHappensAfter: {
      en: 'The terminal prints the version string and terminates immediately without changing any files.',
      fr: 'Le terminal affiche la version et s\'arrête sans modifier aucun fichier.',
      ar: 'تطبع الطرفية رقم الإصدار وتتوقف فوراً دون إحداث أي تغيير في ملفات جهازك.'
    },
    differenceWithSimilar: {
      en: 'Unlike "git help", it only returns the version string, not the complete documentation manual.',
      fr: 'Contrairement à "git help", il retourne uniquement la version sans la documentation.',
      ar: 'يختلف عن "git help" بأنه يعرض فقط رقم الإصدار ولا يفتح دليل المساعدة الشامل.'
    },
    commonErrorsAndFixes: {
      en: '"git is not recognized as an internal or external command" -> Solution: Git is not installed or not added to PATH. Download from git-scm.com and check "Add to PATH".',
      fr: '"git n\'est pas reconnu" -> Solution : Installez Git depuis git-scm.com et cochez l\'option PATH.',
      ar: 'ظهور خطأ "git is not recognized" -> الحل: Git غير مثبت أو لم يتم تفعيل خيار Add to PATH أثناء التثبيت.'
    }
  },
  {
    id: 'git-config',
    command: 'git config',
    syntax: 'git config [options] <key> [value]',
    category: 'config',
    categoryLabel: { en: 'Configuration', fr: 'Configuration', ar: 'إعدادات Git' },
    whatItDoes: {
      en: 'Allows you to view and set Git configuration variables that control how Git looks and operates.',
      fr: 'Permet de visualiser et configurer les paramètres régissant le comportement de Git.',
      ar: 'يسمح لك بقراءة وتعديل متغيرات وإعدادات Git التي تتحكم في طريقة عمله ومظهره.'
    },
    whyWeUseIt: {
      en: 'To customize author identity, default branch names, default editors, and alias shortcuts.',
      fr: 'Pour personnaliser l\'identité d\'auteur, la branche par défaut et les éditeurs.',
      ar: 'لتخصيص هوية المطور، اسم الفرع الافتراضي، المحرر المعتمد (VS Code)، والاختصارات السريعة.'
    },
    whenToUseIt: {
      en: 'During initial machine configuration or when modifying project-specific credentials.',
      fr: 'Lors de la configuration initiale ou pour modifier les identifiants d\'un projet.',
      ar: 'عند إعداد الجهاز لأول مرة أو عند الرغبة في تغيير إعدادات مستودع معين.'
    },
    whereToType: 'VS Code Terminal / PowerShell / Git Bash',
    realExample: 'git config --list --show-origin',
    expectedOutput: 'file:C:/Users/User/.gitconfig\tuser.name=Sarah Chen\nfile:C:/Users/User/.gitconfig\tuser.email=sarah@example.com',
    whatHappensAfter: {
      en: 'Git reads or writes settings into either system, global (~/.gitconfig), or local (.git/config) files.',
      fr: 'Git lit ou écrit les paramètres dans ~/.gitconfig ou .git/config.',
      ar: 'يقوم Git بحفظ الإعدادات في ملف .gitconfig في مسار المستخدم أو داخل المستودع.'
    },
    differenceWithSimilar: {
      en: 'Without --global, config applies ONLY to the current repository inside .git/config.',
      fr: 'Sans --global, la configuration s\'applique UNIQUEMENT au dépôt actuel.',
      ar: 'بدون خيار --global، تسري الإعدادات على المستودع الحالي فقط في .git/config.'
    },
    commonErrorsAndFixes: {
      en: 'Modifying config outside a repo without --global results in "fatal: not in a git directory". Fix: Add --global.',
      fr: 'Exécuter sans --global hors d\'un dépôt cause une erreur. Solution : Ajouter --global.',
      ar: 'كتابة git config بدون --global خارج مستودع يظهر خطأ. الحل: أضف خيار --global.'
    }
  },
  {
    id: 'git-config-name',
    command: 'git config --global user.name',
    syntax: 'git config --global user.name "Your Full Name"',
    category: 'config',
    categoryLabel: { en: 'Configuration', fr: 'Configuration', ar: 'إعدادات الهوية' },
    whatItDoes: {
      en: 'Sets the human author name attached to every commit you produce across all projects on your machine.',
      fr: 'Définit le nom d\'auteur associé à chaque commit produit sur votre ordinateur.',
      ar: 'يحدد اسمك الشخصي الذي سيظهر ككاتب لكل Commit تقوم به في كل مشاريع حاسوبك.'
    },
    whyWeUseIt: {
      en: 'Identifies you clearly to teammates and public open-source contributors on GitHub/GitLab.',
      fr: 'Permet à vos collaborateurs d\'identifier précisément qui a écrit le code.',
      ar: 'لتمييز مساهماتك بدقة ومعرفة من قام بكل تعديل عند العمل في فرق برمجية.'
    },
    whenToUseIt: {
      en: 'Must be run once when installing Git or whenever your professional display name changes.',
      fr: 'À exécuter une seule fois après l\'installation de Git.',
      ar: 'يتم تشغيله مرة واحدة فقط عند تثبيت Git لأول مرة في جهازك.'
    },
    whereToType: 'VS Code Terminal / Git Bash / PowerShell',
    realExample: 'git config --global user.name "Hamza Alami"',
    expectedOutput: '# Silent success (no output means configuration was saved successfully)',
    whatHappensAfter: {
      en: 'Updates ~/.gitconfig under the [user] section with name = "Your Full Name".',
      fr: 'Met à jour ~/.gitconfig avec la clé name.',
      ar: 'يتم حفظ السطر name = Hamza Alami داخل ملف ~/.gitconfig.'
    },
    differenceWithSimilar: {
      en: 'Only configures the author name string; does NOT configure your email address.',
      fr: 'Définit uniquement le nom; ne configure pas l\'adresse email.',
      ar: 'يضبط الاسم فقط ولا يضبط البريد الإلكتروني.'
    },
    commonErrorsAndFixes: {
      en: 'Forgetting quotes when name has spaces causes Git to only use the first word. Fix: Always use double quotes.',
      fr: 'Oublier les guillemets tronque le nom. Solution : Utilisez toujours des guillemets doubles.',
      ar: 'نسيان علامات الاقتباس عند وجود مسافات بالاسم يسبب اقتطاعه. الحل: ضع الاسم بين علامتي " ".'
    }
  },
  {
    id: 'git-config-email',
    command: 'git config --global user.email',
    syntax: 'git config --global user.email "your.email@example.com"',
    category: 'config',
    categoryLabel: { en: 'Configuration', fr: 'Configuration', ar: 'إعدادات الهوية' },
    whatItDoes: {
      en: 'Sets the email address attached to your commit metadata, linking commits to your GitHub user profile.',
      fr: 'Associe votre adresse email aux métadonnées des commits pour lier vos contributions GitHub.',
      ar: 'يحدد البريد الإلكتروني المرتبط بكل Commit؛ وهو الرابط الذي يربط مساهماتك بملفك الشخصي على GitHub.'
    },
    whyWeUseIt: {
      en: 'Without matching your GitHub email, your commits will show as an unknown user with no green squares!',
      fr: 'Essentiel pour voir apparaître vos contributions sur votre profil GitHub.',
      ar: 'ضروري لظهور مساهماتك ومربعات النشاط الخضراء على حسابك في GitHub.'
    },
    whenToUseIt: {
      en: 'Immediately after setting user.name during initial workstation setup.',
      fr: 'Immédiatement après user.name lors de la configuration initiale.',
      ar: 'فور إعداد الاسم لأول مرة بعد تثبيت Git.'
    },
    whereToType: 'VS Code Terminal / PowerShell / Git Bash',
    realExample: 'git config --global user.email "hamza@example.com"',
    expectedOutput: '# Silent success',
    whatHappensAfter: {
      en: 'Saves email = your@email.com inside ~/.gitconfig.',
      fr: 'Enregistre l\'email dans ~/.gitconfig.',
      ar: 'يحفظ البريد في ملف .gitconfig العالمي بحاسوبك.'
    },
    differenceWithSimilar: {
      en: 'user.email is your public commit author email, whereas GitHub account login username is distinct.',
      fr: 'user.email est l\'email d\'auteur, distinct du nom d\'utilisateur GitHub.',
      ar: 'هو بريد التوثيق ولا يشترط أن يكون اسم المستخدم، لكن يجب أن يكون مسجلاً في إعدادات GitHub.'
    },
    commonErrorsAndFixes: {
      en: 'Typing an email different from your GitHub account email. Fix: Check GitHub Settings -> Emails and match it.',
      fr: 'Utiliser un email différent de GitHub. Solution : Vérifiez vos emails autorisés sur GitHub.',
      ar: 'استخدام بريد غير مضاف في حساب GitHub. الحل: تأكد من إضافة البريد في إعدادات حساب GitHub.'
    }
  },
  {
    id: 'git-init',
    command: 'git init',
    syntax: 'git init [directory]',
    category: 'init',
    categoryLabel: { en: 'Starting a Project', fr: 'Initialisation', ar: 'بدء المشروع' },
    whatItDoes: {
      en: 'Transforms an ordinary folder into a full-fledged local Git repository by creating a hidden .git directory.',
      fr: 'Transforme un dossier ordinaire en dépôt Git local en créant un sous-dossier masqué .git.',
      ar: 'يحول المجلد العادي إلى مستودع Git محلي بإنشاء مجلد مخفي باسم .git لتسجيل تاريخ التعديلات.'
    },
    whyWeUseIt: {
      en: 'To start version controlling a project from scratch on your computer before making any commits.',
      fr: 'Pour commencer à versionner un nouveau projet localement avant tout commit.',
      ar: 'لبدء تتبع وحفظ لقطات المشروع محلياً في جهازك والرجوع لها في أي وقت.'
    },
    whenToUseIt: {
      en: 'Once at the very beginning of a brand-new project. Do NOT use it if you cloned an existing repo.',
      fr: 'Une seule fois au début d\'un nouveau projet. Ne pas utiliser si vous avez fait un git clone.',
      ar: 'مرة واحدة فقط في بداية أي مشروع جديد في حاسوبك (لا تستخدمه إذا قمت بعمل git clone).'
    },
    whereToType: 'VS Code Terminal inside the root project directory',
    realExample: 'git init',
    expectedOutput: 'Initialized empty Git repository in /home/user/my-website/.git/',
    whatHappensAfter: {
      en: 'A hidden folder named .git is created containing object databases, HEAD pointer, and config.',
      fr: 'Un dossier masqué .git est créé contenant la base de données et les pointeurs de branches.',
      ar: 'يتم إنشاء مجلد مخفي .git يحتوي على قاعدة بيانات Git ومؤشر HEAD.'
    },
    differenceWithSimilar: {
      en: 'git init starts a brand-new blank repo locally; git clone downloads an already-existing repo from the internet.',
      fr: 'git init démarre un dépôt vierge local; git clone télécharge un dépôt distant existant.',
      ar: 'git init يبدأ مشروعاً محلياً فارغاً؛ بينما git clone يستنسخ مشروعاً كاملاً موجوداً على الإنترنت.'
    },
    commonErrorsAndFixes: {
      en: 'CRITICAL MISTAKE: Running git init in your Desktop, Downloads, or User home folder! Fix: Delete the accidental .git folder.',
      fr: 'ERREUR GRAVE : Exécuter git init dans le dossier Bureau ou Utilisateur. Solution : Supprimer le dossier .git accidentel.',
      ar: 'خطأ شائع خطير: تشغيل git init في مجلد سطح المكتب Desktop أو مجلد المستخدم! الحل: حذف مجلد .git المخفي فوراً.'
    }
  },
  {
    id: 'git-status',
    command: 'git status',
    syntax: 'git status [options]',
    category: 'staging',
    categoryLabel: { en: 'Staging & Status', fr: 'Statut & Index', ar: 'فحص الحالة' },
    whatItDoes: {
      en: 'Displays the state of the working directory and staging area: what files are modified, staged, or untracked.',
      fr: 'Affiche l\'état du dossier de travail et de l\'index : fichiers modifiés, indexés ou non suivis.',
      ar: 'يعرض حالة مساحة العمل ومنطقة التجهيز: ما هي الملفات المعدلة، المحفوظة في الـ Staging، وغير المراقبة.'
    },
    whyWeUseIt: {
      en: 'Gives complete visibility before committing so you never commit unfinished or accidental changes.',
      fr: 'Offre une visibilité totale avant d\'enregistrer pour éviter les commits accidentels.',
      ar: 'لمعرفة ما يحدث في مشروعك بدقة قبل الحفظ وتجنب توثيق ملفات ناقصة أو غير مرغوبة.'
    },
    whenToUseIt: {
      en: 'Continuously! Before git add, after git add, before git commit, and after git commit.',
      fr: 'Constamment ! Avant et après chaque commande git add ou commit.',
      ar: 'باستمرار! قبل وبعد كل أمر git add و git commit.'
    },
    whereToType: 'VS Code Terminal inside the repo',
    realExample: 'git status',
    expectedOutput: 'On branch main\nChanges not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n\tmodified:   style.css\n\nUntracked files:\n\tindex.html',
    whatHappensAfter: {
      en: 'Prints detailed status in terminal; red text represents unstaged/untracked, green represents staged.',
      fr: 'Affiche l\'état en couleur : rouge = non indexé, vert = prêt pour le commit.',
      ar: 'يعرض تقريراً ملوناً: الملفات باللون الأحمر غير مجهزة، والملفات بالأخضر جاهزة للـ commit.'
    },
    differenceWithSimilar: {
      en: 'git status shows WHICH files changed; git diff shows EXACTLY WHICH LINES inside files changed.',
      fr: 'git status montre QUELS fichiers ont changé; git diff montre QUELLES LIGNES ont changé.',
      ar: 'git status يوضح أسماء الملفات التي تغيرت؛ بينما git diff يوضح الأسطر التي تم تعديلها بالداخل.'
    },
    commonErrorsAndFixes: {
      en: '"fatal: not a git repository" -> You are not inside a Git project folder. Run "cd <folder>" or "git init".',
      fr: '"fatal: not a git repository" -> Vous n\'êtes pas dans un dépôt. Faites "cd <dossier>" ou "git init".',
      ar: 'ظهور "fatal: not a git repository" -> أنت لست داخل مجلد المشروع. انتقل له بأمر cd أولاً.'
    }
  },
  {
    id: 'git-add',
    command: 'git add',
    syntax: 'git add <file-path>',
    category: 'staging',
    categoryLabel: { en: 'Staging Area', fr: 'Indexation', ar: 'منطقة التجهيز' },
    whatItDoes: {
      en: 'Adds changes in a specific file to the staging area (index), preparing them for the next commit snapshot.',
      fr: 'Ajoute les modifications d\'un fichier spécifique à l\'index pour le prochain commit.',
      ar: 'يجهز التعديلات الموجودة في ملف محدد وينقلها إلى منطقة الـ Staging Area تمهيداً لحفظها.'
    },
    whyWeUseIt: {
      en: 'Allows selective, granular commits (e.g. stage index.html now, leave script.js for later).',
      fr: 'Permet de créer des commits sélectifs et propres fichier par fichier.',
      ar: 'يتيح لك اختيار ملفات معينة لتوثيقها بمفردها وترك باقي الملفات لـ commit آخر.'
    },
    whenToUseIt: {
      en: 'When you completed changes in one specific file and want to commit it independently.',
      fr: 'Quand vous voulez enregistrer un fichier précis indépendamment des autres.',
      ar: 'عندما تنهي تعديل ملف معين وتريد توثيقه في لقطة مستقلة.'
    },
    whereToType: 'VS Code Terminal',
    realExample: 'git add index.html',
    expectedOutput: '# Silent success (run "git status" to see the file highlighted in green)',
    whatHappensAfter: {
      en: 'The file transitions from working directory status to staged index status ready for commit.',
      fr: 'Le fichier passe de l\'état de travail à l\'état indexé vert.',
      ar: 'يتحول الملف من اللون الأحمر إلى اللون الأخضر في تقرير git status.'
    },
    differenceWithSimilar: {
      en: 'git add <file> stages one file; git add . stages all modified and new files in the folder.',
      fr: 'git add <file> indexe un seul fichier; git add . indexe tous les fichiers du dossier.',
      ar: 'git add <file> يجهز ملفاً واحداً؛ بينما git add . يجهز كل الملفات دفعة واحدة.'
    },
    commonErrorsAndFixes: {
      en: '"fatal: pathspec did not match any files" -> Typo in file name or file does not exist in directory.',
      fr: '"fatal: pathspec did not match" -> Faute de frappe dans le nom du fichier.',
      ar: 'خطأ "pathspec did not match" -> اسم الملف مكتوب بشكل غير صحيح أو غير موجود بالمسار.'
    }
  },
  {
    id: 'git-add-dot',
    command: 'git add .',
    syntax: 'git add .',
    category: 'staging',
    categoryLabel: { en: 'Staging Area', fr: 'Indexation', ar: 'منطقة التجهيز' },
    whatItDoes: {
      en: 'Stages ALL modified, new, and deleted files in the current directory and subdirectories.',
      fr: 'Indexe TOUS les fichiers modifiés, nouveaux et supprimés dans le répertoire courant.',
      ar: 'يجهز كل الملفات المعدلة والجديدة والمحذوفة في المجلد الحالي وكل المجلدات الفرعية.'
    },
    whyWeUseIt: {
      en: 'The fastest, most convenient way to stage your entire project changes in one go.',
      fr: 'Le moyen le plus rapide d\'indexer l\'ensemble des modifications du projet.',
      ar: 'أسرع طريقة لتجهيز كل ملفات المشروع في خطوة واحدة بدلاً من كتابة اسم كل ملف.'
    },
    whenToUseIt: {
      en: 'When you are satisfied with all ongoing changes and ready to craft a cohesive commit.',
      fr: 'Lorsque toutes les modifications en cours sont prêtes à être sauvegardées ensemble.',
      ar: 'عندما تنتهي من تعديلات متكاملة وتريد حفظ كل الملفات معاً في Commit واحد.'
    },
    whereToType: 'VS Code Terminal at the project root',
    realExample: 'git add .',
    expectedOutput: '# Silent success',
    whatHappensAfter: {
      en: 'All eligible files are moved into the staging area snapshot.',
      fr: 'Tous les fichiers éligibles sont préparés pour le commit.',
      ar: 'تنتقل كل الملفات المعدلة لمنطقة التجهيز وتصبح جاهزة للحفظ.'
    },
    differenceWithSimilar: {
      en: 'The dot "." means current directory. "git add -A" stages all files across entire repository root.',
      fr: 'Le point "." représente le dossier courant; "git add -A" indexe tout le dépôt.',
      ar: 'النقطة . تعني المسار الحالي وما تحته؛ بينما git add -A تشمل كل المستودع حتى لو كنت في مجلد فرعي.'
    },
    commonErrorsAndFixes: {
      en: 'Staging sensitive files (.env, passwords) or node_modules! Fix: Create a .gitignore file BEFORE running git add .',
      fr: 'Indexer des fichiers secrets (.env) ou node_modules! Solution : Créez un .gitignore d\'abord.',
      ar: 'تجهيز ملفات حساسة (.env) أو مجلد node_modules بالخطأ! الحل: أنشئ ملف .gitignore دائماً أولاً.'
    }
  },
  {
    id: 'git-commit',
    command: 'git commit -m "message"',
    syntax: 'git commit -m "<descriptive message>"',
    category: 'staging',
    categoryLabel: { en: 'Committing', fr: 'Validation', ar: 'التوثيق والحفظ' },
    whatItDoes: {
      en: 'Permanently records a snapshot of the currently staged changes into your project Git database history.',
      fr: 'Enregistre de façon permanente un instantané des modifications indexées dans l\'historique Git.',
      ar: 'يحفظ لقطة زمنية دائمة لكل الملفات الموجودة في الـ Staging Area مع رسالة توضيحية في سجل المشروع.'
    },
    whyWeUseIt: {
      en: 'Creates a verifiable checkpoint you can inspect, share, or revert to at any point in the future.',
      fr: 'Crée un point de sauvegarde horodaté auquel vous pouvez revenir à tout moment.',
      ar: 'ينشئ نقطة استعادة آمنة وموثقة برقم فريد وتاريخ واسم الكاتب يمكنك العودة لها متى شئت.'
    },
    whenToUseIt: {
      en: 'Whenever you complete a working unit of code (feature, bug fix, layout tweak).',
      fr: 'Dès qu\'une unité logique de travail (fonctionnalité, correctif) est terminée.',
      ar: 'كلما أنجزت ميزة مكتملة أو أصلحت خطأ وتريد حفظه في تاريخ المشروع.'
    },
    whereToType: 'VS Code Terminal',
    realExample: 'git commit -m "feat: build responsive portfolio navbar and hero section"',
    expectedOutput: '[main 3a8b41e] feat: build responsive portfolio navbar and hero section\n 2 files changed, 94 insertions(+)\n create mode 100644 style.css',
    whatHappensAfter: {
      en: 'A new commit object with unique SHA-1 hash is generated, HEAD advances, and staging area is reset.',
      fr: 'Un nouvel objet commit est créé avec son hash SHA, HEAD avance, et l\'index redevient vide.',
      ar: 'يتم إنشاء Commit برقم SHA مشفر، ويتقدم مؤشر HEAD، وتفرغ منطقة التجهيز.'
    },
    differenceWithSimilar: {
      en: 'git commit saves locally on your computer; git push uploads those commits to GitHub cloud.',
      fr: 'git commit enregistre localement; git push envoie vers les serveurs cloud de GitHub.',
      ar: 'git commit يحفظ محلياً في حاسوبك؛ بينما git push يرفع هذا الحفظ إلى سحابة GitHub.'
    },
    commonErrorsAndFixes: {
      en: '"nothing to commit, working tree clean" -> You forgot to run git add first. Run git add . then commit.',
      fr: '"nothing to commit" -> Vous avez oublié de faire git add. Faites git add . puis commit.',
      ar: 'ظهور "nothing to commit" -> لقد نسيت عمل git add أولاً. قم بتنفيذ git add . ثم كرر الـ commit.'
    }
  },
  {
    id: 'git-log',
    command: 'git log',
    syntax: 'git log [--oneline] [--graph] [-n <number>]',
    category: 'staging',
    categoryLabel: { en: 'History & Inspection', fr: 'Historique', ar: 'سجل التغييرات' },
    whatItDoes: {
      en: 'Shows the chronological commit history of the repository: author, date, commit SHA hash, and message.',
      fr: 'Affiche l\'historique chronologique des commits : auteur, date, hash SHA et message.',
      ar: 'يعرض سجل الـ Commits التاريخي الزمني للمشروع: كاتب التعديل، التاريخ، رقم الـ Hash، والرسالة.'
    },
    whyWeUseIt: {
      en: 'To review what changes were made, find commit hashes to revert, or audit project progress.',
      fr: 'Pour auditer les changements, retrouver des versions antérieures et voir qui a fait quoi.',
      ar: 'لمراجعة مسار تطوير المشروع ومعرفة أرقام الـ Commits السابقة للرجوع إليها أو مراجعتها.'
    },
    whenToUseIt: {
      en: 'When auditing recent work, preparing release notes, or investigating where a bug originated.',
      fr: 'Lors de l\'audit de code ou pour identifier l\'origine d\'une anomalie.',
      ar: 'عند الرغبة في معرفة تاريخ التعديلات أو البحث عن نقطة زمنية سابقة لاستعادتها.'
    },
    whereToType: 'VS Code Terminal',
    realExample: 'git log --oneline -n 5',
    expectedOutput: '3a8b41e (HEAD -> main) feat: build responsive portfolio navbar\n8d20f11 fix: correct mobile alignment in style.css\n10f44bc feat: setup initial HTML structure',
    whatHappensAfter: {
      en: 'Prints the commit history to terminal. If long, opens terminal pager (press "q" to exit).',
      fr: 'Affiche la liste des commits (appuyez sur "q" pour quitter le paginateur).',
      ar: 'يعرض قائمة بالـ Commits السابقة (اضغط حرف q للخروج والعودة للطرفية).'
    },
    differenceWithSimilar: {
      en: 'git log shows past commits; git status shows current active uncommitted file states.',
      fr: 'git log montre le passé (commits); git status montre le présent (fichiers modifiés).',
      ar: 'git log يعرض الماضي (اللقطات المحفوظة)؛ بينما git status يعرض الحاضر (التعديلات الجارية).'
    },
    commonErrorsAndFixes: {
      en: 'Terminal feels "stuck" with a colon (:) at bottom -> Press "q" on your keyboard to exit pager.',
      fr: 'Le terminal semble bloqué avec un deux-points (:) -> Appuyez sur la touche "q" pour sortir.',
      ar: 'الطرفية تبدو معلقة وتظهر نقطتين (:) في الأسفل -> اضغط مفتاح q في لوحة المفاتيح للخروج فوراً.'
    }
  },
  {
    id: 'git-diff',
    command: 'git diff',
    syntax: 'git diff [file] [--staged]',
    category: 'staging',
    categoryLabel: { en: 'Inspection', fr: 'Différences', ar: 'مقارنة الفروقات' },
    whatItDoes: {
      en: 'Shows line-by-line differences between your current working directory and your last commit or staging area.',
      fr: 'Affiche les différences ligne par ligne entre votre dossier de travail et le dernier commit.',
      ar: 'يعرض الفروقات سطراً بسطر بين ملفاتك الحالية وآخر commit؛ باللون الأخضر للإضافة والأحمر للحذف.'
    },
    whyWeUseIt: {
      en: 'Allows you to review exactly what code you added or deleted before staging and committing.',
      fr: 'Permet de vérifier précisément le code modifié avant de le valider.',
      ar: 'لفحص الكود المعدل بدقة وتجنب ترك أسطر تجريبية أو console.log قبل الحفظ.'
    },
    whenToUseIt: {
      en: 'Before running git add to inspect unstaged changes.',
      fr: 'Avant de faire git add pour inspecter les modifications.',
      ar: 'قبل تشغيل أمر git add لمعاينة التعديلات والتأكد من صحتها.'
    },
    whereToType: 'VS Code Terminal',
    realExample: 'git diff style.css',
    expectedOutput: '@@ -12,4 +12,6 @@\n-  color: red;\n+  color: #00f0ff;\n+  font-weight: 700;',
    whatHappensAfter: {
      en: 'Terminal displays colored line additions (+) and line deletions (-).',
      fr: 'Le terminal affiche les ajouts en vert (+) et les suppressions en rouge (-).',
      ar: 'تعرض الطرفية الأسطر المحذوفة بالأحمر والمضافة بالأخضر.'
    },
    differenceWithSimilar: {
      en: 'git diff compares working tree vs index; git diff --staged compares staged index vs last commit.',
      fr: 'git diff compare les fichiers non indexés; git diff --staged compare l\'index au dernier commit.',
      ar: 'git diff يقارن الملفات غير المجهزة؛ بينما git diff --staged يقارن الملفات المجهزة بـ git add.'
    },
    commonErrorsAndFixes: {
      en: 'Running git diff after git add returns empty! Fix: Run "git diff --staged" to inspect staged files.',
      fr: 'git diff ne renvoie rien après git add. Solution : Utilisez "git diff --staged".',
      ar: 'تشغيل git diff بعد git add لا يظهر شيئاً! الحل: استخدم git diff --staged لفحص الملفات المجهزة.'
    }
  },
  {
    id: 'git-branch',
    command: 'git branch',
    syntax: 'git branch [-a] [-d <name>] [-D <name>]',
    category: 'branching',
    categoryLabel: { en: 'Branching', fr: 'Branches', ar: 'إدارة الفروع' },
    whatItDoes: {
      en: 'Lists all local branches in the repository and marks the active branch with an asterisk (*).',
      fr: 'Liste toutes les branches locales du dépôt et marque la branche active avec un astérisque (*).',
      ar: 'يعرض جميع الفروع المحلية في المستودع ويضع علامة نجمة ولوناً أخضر على الفرع الفعال حالياً.'
    },
    whyWeUseIt: {
      en: 'To check what branch you are standing on and see existing feature branches.',
      fr: 'Pour savoir sur quelle branche vous êtes avant de commencer à coder.',
      ar: 'لمعرفة الفرع الذي تقف عليه حالياً وتجنب كتابة كود في الفرع الخاطئ.'
    },
    whenToUseIt: {
      en: 'Before starting a new feature or before merging branches.',
      fr: 'Avant de créer une nouvelle fonctionnalité ou de faire une fusion.',
      ar: 'قبل البدء في كتابة ميزة جديدة أو قبل دمج الفروع مع بعضها.'
    },
    whereToType: 'VS Code Terminal',
    realExample: 'git branch',
    expectedOutput: '* main\n  feature-navbar\n  fix-login',
    whatHappensAfter: {
      en: 'Terminal prints branch names without modifying any files.',
      fr: 'Le terminal liste les branches sans modifier les fichiers.',
      ar: 'تطبع الطرفية أسماء الفروع دون التأثير على أي ملف.'
    },
    differenceWithSimilar: {
      en: 'git branch lists branches; git branch <name> creates a branch; git switch <name> switches to it.',
      fr: 'git branch liste; git branch <nom> crée; git switch <nom> bascule dessus.',
      ar: 'git branch يعرض الفروع؛ git branch <اسم> ينشئ فرعاً؛ و git switch <اسم> ينتقل إليه.'
    },
    commonErrorsAndFixes: {
      en: 'Working on main by accident. Fix: Create a branch with "git switch -c <name>" first.',
      fr: 'Coder sur main par inadvertance. Solution : Créez une branche dédiée avec "git switch -c".',
      ar: 'العمل في فرع main بالخطأ. الحل: أنشئ فرع ميزة بأمر git switch -c قبل التعديل.'
    }
  },
  {
    id: 'git-switch',
    command: 'git switch',
    syntax: 'git switch <branch-name> | git switch -c <new-branch>',
    category: 'branching',
    categoryLabel: { en: 'Branching', fr: 'Branches', ar: 'التبديل بين الفروع' },
    whatItDoes: {
      en: 'Switches your working directory files to match the specified branch (with -c to create and switch).',
      fr: 'Bascule votre espace de travail sur la branche spécifiée (avec -c pour créer et basculer).',
      ar: 'ينقل بيئة عملك إلى الفرع المحدد ويحدث ملفاتك لتطابق ذلك الفرع (ومع -c ينشئ وينتقل دفعة واحدة).'
    },
    whyWeUseIt: {
      en: 'The modern, unambiguous dedicated command for navigating between Git branches.',
      fr: 'La commande moderne dédiée exclusivement à la navigation entre branches.',
      ar: 'الأمر الحديث المخصص حصراً لإدارة الفروع وتجنب تعقيدات أمر checkout القديم.'
    },
    whenToUseIt: {
      en: 'When starting a feature (git switch -c feature-name) or switching back to main (git switch main).',
      fr: 'Pour commencer une fonctionnalité (-c) ou revenir sur la branche main.',
      ar: 'عند بدء ميزة جديدة بـ git switch -c أو العودة لفرع main.'
    },
    whereToType: 'VS Code Terminal',
    realExample: 'git switch -c feature-dark-mode',
    expectedOutput: 'Switched to a new branch \'feature-dark-mode\'',
    whatHappensAfter: {
      en: 'HEAD updates to point to the new branch; working directory reflects the branch contents.',
      fr: 'HEAD pointe vers la nouvelle branche; les fichiers de l\'éditeur se mettent à jour.',
      ar: 'ينتقل مؤشر HEAD للفرع الجديد وتتغير ملفاتك في محرر VS Code لتطابق الفرع.'
    },
    differenceWithSimilar: {
      en: 'git switch ONLY switches branches. The legacy git checkout did both branch switching and file restoring.',
      fr: 'git switch gère uniquement les branches, évitant la confusion avec git checkout.',
      ar: 'git switch مخصص للفروع فقط؛ بينما git checkout القديم كان يخلط بين الفروع واسترجاع الملفات.'
    },
    commonErrorsAndFixes: {
      en: '"fatal: a branch named already exists" -> Branch already created. Drop the -c flag: "git switch <name>".',
      fr: '"branch already exists" -> La branche existe déjà. Enlevez le -c : "git switch <nom>".',
      ar: 'خطأ أن الفرع موجود مسبقاً -> احذف خيار -c واكتب git switch <اسم_الفرع> مباشرة.'
    }
  },
  {
    id: 'git-checkout',
    command: 'git checkout',
    syntax: 'git checkout <branch-name> | git checkout -b <new-branch>',
    category: 'branching',
    categoryLabel: { en: 'Branching (Legacy)', fr: 'Branches (Ancien)', ar: 'الفروع (التقليدي)' },
    whatItDoes: {
      en: 'Legacy command used to switch branches or restore working tree files.',
      fr: 'Commande historique utilisée pour basculer de branche ou restaurer des fichiers.',
      ar: 'الأمر الكلاسيكي المستخدم قديماً للتبديل بين الفروع أو استرجاع الملفات.'
    },
    whyWeUseIt: {
      en: 'Still widely seen in existing tutorials, scripts, and production CI/CD pipelines.',
      fr: 'Toujours très répandu dans les tutoriels, documentations et scripts CI/CD existants.',
      ar: 'لا يزال مشهوراً جداً في المقالات والشروحات القديمة وأدوات الـ CI/CD.'
    },
    whenToUseIt: {
      en: 'When maintaining older scripts or when preferred over git switch/restore.',
      fr: 'Pour maintenir d\'anciens scripts ou dans les environnements Git plus anciens.',
      ar: 'عند قراءة شروحات قديمة أو في حال اعتيادك عليه؛ مع تفضيل git switch الحديث.'
    },
    whereToType: 'VS Code Terminal',
    realExample: 'git checkout -b feature-payment',
    expectedOutput: 'Switched to a new branch \'feature-payment\'',
    whatHappensAfter: {
      en: 'Creates and checks out the branch.',
      fr: 'Crée et active la nouvelle branche.',
      ar: 'ينشئ الفرع الجديد وينتقل إليه فوراً.'
    },
    differenceWithSimilar: {
      en: 'Modern Git split git checkout into: "git switch" (branches) and "git restore" (files).',
      fr: 'Git moderne a scindé checkout en : git switch (branches) et git restore (fichiers).',
      ar: 'قسمت شركة Git هذا الأمر إلى أمرين أوضح: git switch للفروع، و git restore للملفات.'
    },
    commonErrorsAndFixes: {
      en: 'Accidentally overwriting a file when intending to switch branches. Use modern "git switch" to stay safe.',
      fr: 'Écraser un fichier en voulant changer de branche. Utilisez "git switch" par sécurité.',
      ar: 'إلغاء تعديلات ملف بالخطأ بدل تغيير الفرع. الحل: اعتمد على git switch الآمن دائماً.'
    }
  },
  {
    id: 'git-merge',
    command: 'git merge',
    syntax: 'git merge <branch-to-merge-in>',
    category: 'branching',
    categoryLabel: { en: 'Merging', fr: 'Fusion', ar: 'دمج الفروع' },
    whatItDoes: {
      en: 'Integrates changes from another branch into your current active branch.',
      fr: 'Intègre les modifications d\'une autre branche dans votre branche courante.',
      ar: 'يدمج التعديلات والـ Commits الموجودة في فرع آخر داخل الفرع الذي تقف عليه حالياً.'
    },
    whyWeUseIt: {
      en: 'To bring completed and tested feature branch code safely into main for release.',
      fr: 'Pour intégrer le code d\'une fonctionnalité terminée dans la branche principale main.',
      ar: 'لدمج ميزة تم الانتهاء من اختبارها وإضافتها للفرع الرئيسي main للنشر.'
    },
    whenToUseIt: {
      en: 'Switch to main (git switch main) first, then merge the feature: git merge feature-name.',
      fr: 'Basculez d\'abord sur main, puis exécutez git merge feature-name.',
      ar: 'انتقل لفرع main أولاً بأمر git switch main ثم ادمج الفرع: git merge feature-name.'
    },
    whereToType: 'VS Code Terminal',
    realExample: 'git merge feature-dark-mode',
    expectedOutput: 'Updating 3a8b41e..7b2a19c\nFast-forward\n style.css | 45 ++++++++++\n 1 file changed, 45 insertions(+)',
    whatHappensAfter: {
      en: 'Fast-forwards or creates a merge commit unifying the two history lines.',
      fr: 'Avance rapide (fast-forward) ou création d\'un commit de fusion unifiant les historiques.',
      ar: 'يقوم بدمج سريع Fast-forward أو ينشئ Merge Commit يجمع تاريخ الفرعين.'
    },
    differenceWithSimilar: {
      en: 'git merge preserves true branch history; git rebase rewrites commits linearly.',
      fr: 'git merge préserve l\'historique des branches; git rebase réécrit l\'historique de façon linéaire.',
      ar: 'git merge يحافظ على التاريخ الطبيعي؛ بينما git rebase يعيد ترتيب الـ Commits في خط مستقيم.'
    },
    commonErrorsAndFixes: {
      en: 'MERGE CONFLICT! Git pauses merge. Fix: Open conflicting files in VS Code, choose incoming/current changes, save, git add ., and git commit.',
      fr: 'CONFLIT DE FUSION ! Git s\'arrête. Solution : Résolvez les conflits dans VS Code, enregistrez, faites git add . et git commit.',
      ar: 'حدوث تعارض (Merge Conflict)! لا تقلق، افتح الملف بـ VS Code، اختر التعديل الصحيح، احفظه، ونفذ git add . ثم commit.'
    }
  },
  {
    id: 'git-remote',
    command: 'git remote',
    syntax: 'git remote [-v]',
    category: 'remote',
    categoryLabel: { en: 'Remote Repos', fr: 'Dépôts Distants', ar: 'المستودعات البعيدة' },
    whatItDoes: {
      en: 'Lists all connected remote cloud repositories linked to this local project.',
      fr: 'Liste tous les dépôts distants connectés à ce projet local.',
      ar: 'يعرض جميع المستودعات السحابية البعيدة المرتبطة بهذا المشروع المحلي.'
    },
    whyWeUseIt: {
      en: 'To verify what GitHub or GitLab URL your project is currently configured to push to and fetch from.',
      fr: 'Pour vérifier à quelle URL GitHub votre projet est connecté pour push et pull.',
      ar: 'للتأكد من رابط مستودع GitHub الذي يرفع إليه المشروع ويسحب منه.'
    },
    whenToUseIt: {
      en: 'When checking remote configuration or troubleshooting push/pull failures.',
      fr: 'Lors de la vérification de la configuration distante ou en cas d\'erreur de push.',
      ar: 'عند فحص إعدادات السحابة أو عند فشل الرفع لمعرفة الرابط المضبوط.'
    },
    whereToType: 'VS Code Terminal',
    realExample: 'git remote -v',
    expectedOutput: 'origin  https://github.com/username/my-website.git (fetch)\norigin  https://github.com/username/my-website.git (push)',
    whatHappensAfter: {
      en: 'Prints the remote nickname (usually origin) and its fetch/push URLs.',
      fr: 'Affiche le nom du remote (généralement origin) et ses URLs associées.',
      ar: 'يعرض اسم المستودع البعيد (عادة origin) وروابط الرفع والسحب.'
    },
    differenceWithSimilar: {
      en: 'git remote shows aliases; git remote add creates an alias; git remote set-url modifies an alias.',
      fr: 'git remote affiche; git remote add crée; git remote set-url modifie.',
      ar: 'git remote يعرض الأسماء؛ git remote add ينشئ ارتباطاً جديداً؛ و git remote set-url يعدل الرابط.'
    },
    commonErrorsAndFixes: {
      en: 'No output means no remote is configured yet. Run "git remote add origin <url>" to connect one.',
      fr: 'Aucune sortie signifie qu\'aucun remote n\'est configuré. Utilisez "git remote add origin <url>".',
      ar: 'عدم ظهور أي مخرج يعني أنك لم تربط المشروع بأي مستودع بعد. استخدم git remote add origin.'
    }
  },
  {
    id: 'git-remote-add',
    command: 'git remote add origin',
    syntax: 'git remote add origin <https://github.com/USER/REPO.git>',
    category: 'remote',
    categoryLabel: { en: 'Remote Repos', fr: 'Dépôts Distants', ar: 'ربط المستودع البعيد' },
    whatItDoes: {
      en: 'Creates a named shortcut alias (origin) pointing to a remote GitHub repository URL.',
      fr: 'Crée un alias nommé (origin) pointant vers l\'URL d\'un dépôt GitHub distant.',
      ar: 'يربط مستودعك المحلي بمستودع سحابي على GitHub تحت اسم مختصر قياسي يسمى origin.'
    },
    whyWeUseIt: {
      en: 'Bridges your local computer with your online GitHub repository so you can push and publish.',
      fr: 'Établit la passerelle entre votre machine locale et votre dépôt GitHub en ligne.',
      ar: 'يربط جهازك بالسحابة لتتمكن من رفع الكود ونشره ومشاركته مع العالم.'
    },
    whenToUseIt: {
      en: 'Once when first connecting a local project to a newly created empty repository on GitHub.',
      fr: 'Une seule fois lors de la connexion initiale à un dépôt GitHub vierge.',
      ar: 'مرة واحدة فقط عند ربط مشروع جديد بمستودع فارغ أنشأته على GitHub.'
    },
    whereToType: 'VS Code Terminal',
    realExample: 'git remote add origin https://github.com/sarah/my-website.git',
    expectedOutput: '# Silent success (verify with "git remote -v")',
    whatHappensAfter: {
      en: 'Git records the remote definition inside .git/config under [remote "origin"].',
      fr: 'Git enregistre la définition du remote dans le fichier .git/config.',
      ar: 'يتم تسجيل الرابط في ملف إعدادات .git/config داخل مشروعك.'
    },
    differenceWithSimilar: {
      en: 'git remote add connects a new URL; git remote set-url replaces an existing URL.',
      fr: 'git remote add connecte une nouvelle URL; git remote set-url remplace une URL existante.',
      ar: 'git remote add يربط رابطاً لأول مرة؛ بينما git remote set-url يعدل رابطاً موجوداً سابقاً.'
    },
    commonErrorsAndFixes: {
      en: '"fatal: remote origin already exists" -> You already linked it! Fix: Use "git remote set-url origin <url>" to change it.',
      fr: '"remote origin already exists" -> Déjà lié. Utilisez "git remote set-url origin <url>".',
      ar: 'خطأ "remote origin already exists" -> المستودع مربوط مسبقاً! لتغييره استخدم أمر git remote set-url origin <url>.'
    }
  },
  {
    id: 'git-push',
    command: 'git push',
    syntax: 'git push [-u <remote> <branch>]',
    category: 'remote',
    categoryLabel: { en: 'Remote Repos', fr: 'Dépôts Distants', ar: 'رفع الكود' },
    whatItDoes: {
      en: 'Uploads all local commits on the current branch to the specified remote repository on GitHub.',
      fr: 'Téléverse tous les commits locaux de la branche courante vers le dépôt GitHub distant.',
      ar: 'يرفع كل الـ Commits والتعديلات المحفوظة محلياً إلى مستودعك على GitHub في السحابة.'
    },
    whyWeUseIt: {
      en: 'Shares your code with teammates, backs up your project securely, and triggers deployments (e.g. GitHub Pages).',
      fr: 'Partage votre code, assure une sauvegarde cloud et déclenche les déploiements.',
      ar: 'لنشر موقعك، حفظ نسخة احتياطية سحابية، وتحديث الموقع المنشور على GitHub Pages.'
    },
    whenToUseIt: {
      en: 'After making local commits that are ready to be published to GitHub.',
      fr: 'Après avoir validé vos commits locaux prêts à être partagés.',
      ar: 'بعد الانتهاء من عمل commit محلي وتريد إرسال التحديثات إلى GitHub.'
    },
    whereToType: 'VS Code Terminal',
    realExample: 'git push -u origin main',
    expectedOutput: 'Enumerating objects: 5, done.\nCounting objects: 100% (5/5), done.\nWriting objects: 100% (5/5), 1.2 KiB | 1.2 MiB/s, done.\nTo https://github.com/user/my-website.git\n * [new branch]      main -> main\nBranch \'main\' set up to track remote branch \'main\' from \'origin\'.',
    whatHappensAfter: {
      en: 'Commits appear on GitHub web UI; collaborators can now pull them.',
      fr: 'Les commits apparaissent sur l\'interface web de GitHub; les collaborateurs peuvent les récupérer.',
      ar: 'تظهر التعديلات فوراً على موقع GitHub ويمكن لأي شخص تصفحها أو سحبها.'
    },
    differenceWithSimilar: {
      en: 'git commit saves to local disk; git push transfers those commits across the internet to GitHub.',
      fr: 'git commit sauvegarde localement; git push transfère via internet vers GitHub.',
      ar: 'git commit يحفظ في جهازك فقط؛ بينما git push يرسل التعديلات عبر الإنترنت إلى السحابة.'
    },
    commonErrorsAndFixes: {
      en: '"Updates were rejected because the remote contains work you do not have" -> Someone pushed first! Fix: Run "git pull" first, resolve conflicts if any, then push.',
      fr: '"Updates were rejected" -> Le dépôt distant a des commits en plus. Solution : Faites "git pull" d\'abord.',
      ar: 'رفض الرفع بسبب وجود تعديلات على GitHub ليست بجهازك! الحل: نفذ git pull أولاً ثم ارفع مجدداً.'
    }
  },
  {
    id: 'git-pull',
    command: 'git pull',
    syntax: 'git pull [<remote> <branch>]',
    category: 'remote',
    categoryLabel: { en: 'Remote Repos', fr: 'Dépôts Distants', ar: 'سحب التحديثات' },
    whatItDoes: {
      en: 'Fetches changes from the remote GitHub repository and automatically merges them into your current local branch.',
      fr: 'Récupère les modifications distantes de GitHub et les fusionne automatiquement dans la branche locale.',
      ar: 'يجلب أحدث التعديلات والـ Commits من GitHub ويدمجها أوتوماتيكياً في نسختك المحلية.'
    },
    whyWeUseIt: {
      en: 'To stay up-to-date with work pushed by your teammates or changes made directly on GitHub web UI.',
      fr: 'Pour rester synchronisé avec le travail de vos collaborateurs ou les modifications faites sur GitHub.',
      ar: 'للبقاء على تزامن دائم مع تعديلات زملائك في الفريق وتجنب التعارضات البرمجية.'
    },
    whenToUseIt: {
      en: 'At the start of your workday before writing code, and before running git push.',
      fr: 'Au début de votre journée avant de coder, et avant chaque git push.',
      ar: 'في بداية يوم العمل قبل كتابة أي كود جديد، وقبل تنفيذ أي عملية git push.'
    },
    whereToType: 'VS Code Terminal',
    realExample: 'git pull origin main',
    expectedOutput: 'Updating 3a8b41e..7b2a19c\nFast-forward\n index.html | 14 +++++++++++---\n 1 file changed, 11 insertions(+), 3 deletions(-)',
    whatHappensAfter: {
      en: 'Your local files update immediately to reflect the latest remote commits.',
      fr: 'Vos fichiers locaux sont mis à jour avec les derniers commits distants.',
      ar: 'يتم تحديث ملفات مشروعك في VS Code فوراً لتطابق أحدث نسخة موجودة على GitHub.'
    },
    differenceWithSimilar: {
      en: 'git pull = git fetch + git merge (fetches and immediately merges). git fetch only downloads without merging.',
      fr: 'git pull = git fetch + git merge. git fetch télécharge uniquement sans fusionner.',
      ar: 'git pull = git fetch + git merge (يجلب ويدمج فوراً)؛ بينما git fetch يحمل التعديلات دون دمجها تلقائياً.'
    },
    commonErrorsAndFixes: {
      en: '"error: Your local changes would be overwritten by merge" -> You have unstaged work! Fix: Run "git stash", then "git pull", then "git stash pop".',
      fr: '"Your local changes would be overwritten" -> Travail non sauvegardé! Solution : "git stash", "git pull", puis "git stash pop".',
      ar: 'خطأ أن التعديلات المحلية ستضيع! الحل: خبئ عملك بأمر git stash ثم اسحب بـ git pull ثم استرجعه بـ git stash pop.'
    }
  },
  {
    id: 'git-fetch',
    command: 'git fetch',
    syntax: 'git fetch [<remote>]',
    category: 'remote',
    categoryLabel: { en: 'Remote Repos', fr: 'Dépôts Distants', ar: 'جلب التحديثات' },
    whatItDoes: {
      en: 'Downloads all new commits, files, and branches from remote GitHub without modifying your local working files.',
      fr: 'Télécharge les nouveaux commits et branches depuis GitHub sans modifier vos fichiers locaux.',
      ar: 'يحمل كل التعديلات والفروع الجديدة من GitHub إلى قاعدة بياناتك دون لمس ملفاتك أو دمجها في نسختك الحالية.'
    },
    whyWeUseIt: {
      en: 'Safe inspection: allows you to review what others worked on without risking breaking your current code.',
      fr: 'Inspection sécurisée : permet de voir ce qui a changé sans risquer de casser votre code.',
      ar: 'فحص آمن: يمكنك من رؤية ما كتبه زملاؤك ومقارنته بهدوء دون أن يؤثر على عملك الحالي.'
    },
    whenToUseIt: {
      en: 'When you want to see if remote has changes before deciding whether to merge or rebase.',
      fr: 'Quand vous voulez vérifier les changements distants avant de décider de fusionner.',
      ar: 'عند الرغبة في معرفة ما إذا كانت هناك تحديثات في السحابة قبل اتخاذ قرار الدمج.'
    },
    whereToType: 'VS Code Terminal',
    realExample: 'git fetch origin',
    expectedOutput: 'From https://github.com/user/my-website\n * [new branch]      feature-api -> origin/feature-api',
    whatHappensAfter: {
      en: 'Remote tracking branches (origin/main) update; your working files remain completely untouched.',
      fr: 'Les branches distantes sont mises à jour localement; vos fichiers restent inchangés.',
      ar: 'تتحدث الفروع البعيدة محلياً دون أن يتغير حرف واحد في ملفات مشروعك الحالية.'
    },
    differenceWithSimilar: {
      en: 'git fetch is 100% safe and non-destructive. git pull forcefully merges into your active files.',
      fr: 'git fetch est 100% sûr et non destructif. git pull fusionne directement.',
      ar: 'git fetch آمن 100% ولا يغير ملفاتك؛ بينما git pull يقوم بالدمج الفوري.'
    },
    commonErrorsAndFixes: {
      en: 'Wondering why files didn\'t change after fetch -> Remember: fetch only downloads! Run "git merge origin/main" to apply.',
      fr: 'Les fichiers n\'ont pas changé après fetch -> C\'est normal! Faites "git merge origin/main" pour appliquer.',
      ar: 'الاستغراب من عدم تغير الملفات بعد fetch -> تذكر أن fetch يحمل فقط! للتطبيق نفذ git merge origin/main.'
    }
  },
  {
    id: 'git-clone',
    command: 'git clone',
    syntax: 'git clone <repository-url> [directory]',
    category: 'init',
    categoryLabel: { en: 'Cloning', fr: 'Clonage', ar: 'استنساخ المستودعات' },
    whatItDoes: {
      en: 'Downloads an entire remote repository from GitHub to your computer, including full history, branches, and commits.',
      fr: 'Télécharge un dépôt distant complet depuis GitHub avec tout son historique et ses branches.',
      ar: 'ينسخ مستودعاً كاملاً من GitHub إلى حاسوبك بجميع ملفاته وتاريخ تعديلاته وفروعه السابقة.'
    },
    whyWeUseIt: {
      en: 'To start working on an existing project, contribute to open source, or set up a project on a second computer.',
      fr: 'Pour travailler sur un projet existant, contribuer à l\'open source ou changer d\'ordinateur.',
      ar: 'للعمل على مشروع موجود مسبقاً، المساهمة في البرمجيات المفتوحة، أو تنزيل مشروعك على حاسوب جديد.'
    },
    whenToUseIt: {
      en: 'When onboarding to a team codebase or downloading a project from GitHub for the first time.',
      fr: 'Lors de l\'intégration dans une équipe ou au premier téléchargement d\'un projet GitHub.',
      ar: 'في أول مرة تقوم فيها بتحميل مشروع فريق أو مكتبة من GitHub إلى حاسوبك.'
    },
    whereToType: 'Terminal inside the parent folder where you want the project folder placed',
    realExample: 'git clone https://github.com/facebook/react.git',
    expectedOutput: 'Cloning into \'react\'...\nremote: Enumerating objects: 125000, done.\nReceiving objects: 100% (125000/125000), 85.4 MiB | 12.3 MiB/s, done.',
    whatHappensAfter: {
      en: 'Creates a new folder with the repo name, sets up origin remote, and checks out the default main branch.',
      fr: 'Crée un nouveau dossier, configure le remote origin et extrait la branche main.',
      ar: 'ينشئ مجلداً جديداً يحمل اسم المشروع، ويربط remote باسم origin تلقائياً، ويفتح فرع main.'
    },
    differenceWithSimilar: {
      en: 'git clone creates a copy of an existing remote repo; git init starts a blank repo from scratch locally.',
      fr: 'git clone copie un dépôt existant; git init crée un dépôt vide.',
      ar: 'git clone يستنسخ مشروعاً موجوداً بالفعل؛ بينما git init يبدأ مشروعاً فارغاً من الصفر.'
    },
    commonErrorsAndFixes: {
      en: '"Permission denied (publickey)" -> SSH key not configured in GitHub. Fix: Use the HTTPS URL instead.',
      fr: '"Permission denied (publickey)" -> Clé SSH non configurée. Solution : Utilisez l\'URL HTTPS.',
      ar: 'خطأ الإذن Permission denied -> مفتاح SSH غير مضبوط. الحل: استخدم رابط HTTPS بدلاً من SSH.'
    }
  },
  {
    id: 'git-restore',
    command: 'git restore',
    syntax: 'git restore [--staged] <file-path>',
    category: 'undo',
    categoryLabel: { en: 'Undoing Changes', fr: 'Annulation', ar: 'استرجاع الملفات' },
    isDestructive: true,
    safetyWarning: {
      en: 'WARNING: Without --staged, "git restore <file>" discards all uncommitted edits permanently!',
      fr: 'ATTENTION : Sans --staged, "git restore <file>" efface définitivement toutes vos modifications non validées !',
      ar: 'تحذير أمان: بدون خيار --staged، أمر git restore <file> يحذف كل تعديلاتك غير المحفوظة نهائياً!'
    },
    whatItDoes: {
      en: 'Restores working directory files to the state of the last commit, discarding uncommitted modifications.',
      fr: 'Restaure les fichiers du répertoire de travail à l\'état du dernier commit en effaçant les modifications.',
      ar: 'يعيد الملفات لحالتها في آخر commit ويلغي جميع التعديلات التي قمت بها في مساحة العمل.'
    },
    whyWeUseIt: {
      en: 'Clean, modern way to discard broken experimental edits in a file without touching git history.',
      fr: 'Moyen moderne et propre d\'annuler des modifications cassées dans un fichier.',
      ar: 'طريقة حديثة وسريعة للتراجع عن تعديلات غير ناجحة في ملف والعودة للنسخة السليمة السابقة.'
    },
    whenToUseIt: {
      en: 'When code edits broke a file and you want to cleanly revert it to the clean committed state.',
      fr: 'Quand vous avez cassé un fichier et voulez revenir à la version propre.',
      ar: 'عندما تخرب ملفاً وتريد إلغاء التغييرات والعودة للنسخة الأخيرة النظيفة.'
    },
    whereToType: 'VS Code Terminal',
    realExample: 'git restore style.css',
    expectedOutput: '# Silent success (file content instantly reverts)',
    whatHappensAfter: {
      en: 'Uncommitted edits in style.css disappear; file content matches the latest commit exactly.',
      fr: 'Les modifications non enregistrées disparaissent; le fichier redevient identique au commit.',
      ar: 'تختفي التعديلات غير المحفوظة ويعود محتوى الملف تماماً كما كان في آخر commit.'
    },
    differenceWithSimilar: {
      en: 'git restore affects working tree or index files; git reset alters branch HEAD commit pointers.',
      fr: 'git restore affecte les fichiers; git reset déplace les pointeurs de commits de la branche.',
      ar: 'git restore يؤثر على الملفات نفسها؛ بينما git reset يحرك مؤشر الـ Commits في تاريخ الفرع.'
    },
    commonErrorsAndFixes: {
      en: 'To UNSTAGE a file without losing its edits, ALWAYS pass --staged: "git restore --staged <file>".',
      fr: 'Pour désindexer sans perdre le code, utilisez TOUJOURS : "git restore --staged <file>".',
      ar: 'لإلغاء تجهيز ملف من الـ Staging دون فقدان كودك، استخدم دائماً: git restore --staged <file>.'
    }
  },
  {
    id: 'git-reset',
    command: 'git reset',
    syntax: 'git reset [--soft | --mixed | --hard] <commit-id>',
    category: 'undo',
    categoryLabel: { en: 'Undoing Changes', fr: 'Réinitialisation', ar: 'إعادة التعيين والتراجع' },
    isDestructive: true,
    safetyWarning: {
      en: 'EXTREME CAUTION: "git reset --hard" permanently erases all uncommitted code and destroys history!',
      fr: 'DANGER : "git reset --hard" efface définitivement tout travail non validé et réécrit l\'historique !',
      ar: 'تحذير شديد الخطورة: أمر git reset --hard يمسح كل التعديلات غير المحفوظة ويدمر سجل الـ Commits!'
    },
    whatItDoes: {
      en: 'Resets the current HEAD branch pointer to a previous commit, with optional index and working tree reset.',
      fr: 'Déplace le pointeur de branche HEAD vers un commit antérieur, modifiant l\'historique.',
      ar: 'يرجع مؤشر الفرع HEAD إلى commit سابق في التاريخ؛ مع التحكم في بقاء الملفات أو حذفها.'
    },
    whyWeUseIt: {
      en: 'To undo bad commits, uncommit changes while keeping code (--soft), or obliterate failed experiments.',
      fr: 'Pour annuler des commits erronés tout en gardant le code (--soft) ou repartir de zéro.',
      ar: 'لإلغاء commit قمت به بالخطأ مع الاحتفاظ بكودك بـ --soft، أو التخلص من تجارب فاشلة تماماً.'
    },
    whenToUseIt: {
      en: 'Only on PRIVATE local commits that have NOT been pushed to GitHub yet.',
      fr: 'Uniquement sur des commits locaux PRIVÉS non encore partagés sur GitHub.',
      ar: 'فقط على الـ Commits المحلية الخاصة التي لم يتم رفعها بعد إلى GitHub.'
    },
    whereToType: 'VS Code Terminal',
    realExample: 'git reset --soft HEAD~1',
    expectedOutput: '# HEAD moves back 1 commit; your code changes remain safely staged in your editor!',
    whatHappensAfter: {
      en: 'The previous commit is removed from branch history, but your code remains in staging ready to re-commit.',
      fr: 'Le dernier commit est retiré de l\'historique, mais vos fichiers restent prêts dans l\'index.',
      ar: 'يحذف آخر commit من السجل لكن الكود يظل موجوداً في محرر VS Code لتعديله وإعادة حفظه.'
    },
    differenceWithSimilar: {
      en: 'git reset rewrites history (dangerous on shared branches); git revert creates a safe inverse commit.',
      fr: 'git reset réécrit l\'historique; git revert crée un commit inverse sécurisé.',
      ar: 'git reset يعيد كتابة التاريخ؛ بينما git revert آمن للعمل الجماعي لأنه ينشئ commit جديد يعكس الخطأ.'
    },
    commonErrorsAndFixes: {
      en: 'Accidentally ran --hard and lost code? Use "git reflog" immediately to locate the lost commit SHA and restore it!',
      fr: 'Code perdu après un --hard ? Utilisez "git reflog" pour retrouver le hash du commit perdu !',
      ar: 'فقدت كودك بعد git reset --hard؟ لا تقلق! استخدم أمر git reflog فوراً للبحث عن رقم الـ Hash واستعادته.'
    }
  },
  {
    id: 'git-stash',
    command: 'git stash',
    syntax: 'git stash [push | pop | list | apply | drop]',
    category: 'advanced',
    categoryLabel: { en: 'Stash & Shelving', fr: 'Remisage (Stash)', ar: 'التخبئة المؤقتة' },
    whatItDoes: {
      en: 'Temporarily shelves (stashes) uncommitted modifications in a drawer so you can switch branches cleanly.',
      fr: 'Met de côté (remise) temporairement vos modifications en cours pour retrouver un dossier propre.',
      ar: 'يخبئ تعديلاتك غير المكتملة في درج سري مؤقت ويعيد مجلدك نظيفاً لتتمكن من تغيير الفرع أو عمل pull.'
    },
    whyWeUseIt: {
      en: 'Git refuses to switch branches or pull if you have conflicting uncommitted work. Stash saves the day.',
      fr: 'Git refuse souvent de changer de branche avec du code non validé. Stash résout ce blocage sans commit.',
      ar: 'لأن Git يمنعك أحياناً من تغيير الفرع إذا كان لديك كود غير محفوظ، والـ Stash يحفظ عملك دون الحاجة لـ commit ناقص.'
    },
    whenToUseIt: {
      en: 'When interrupted by an urgent bug fix in another branch while in the middle of incomplete work.',
      fr: 'Quand vous devez réparer un bug urgent ailleurs alors que votre tâche actuelle n\'est pas finie.',
      ar: 'عندما يطلب منك فحص مشكلة طارئة في فرع آخر وأنت في منتصف عمل غير مكتمل.'
    },
    whereToType: 'VS Code Terminal',
    realExample: 'git stash',
    expectedOutput: 'Saved working directory and index state WIP on main: 3a8b41e feat: portfolio',
    whatHappensAfter: {
      en: 'Modified files return to clean commit state; edits are stored safely in stash stack.',
      fr: 'Les fichiers redeviennent propres; les modifications sont stockées dans la pile de remise.',
      ar: 'تعود الملفات لحالتها النظيفة، ويتم حفظ التعديلات في قائمة الـ Stash.'
    },
    differenceWithSimilar: {
      en: 'git stash saves to a temporary stack; git commit saves permanently into repository history.',
      fr: 'git stash sauvegarde temporairement; git commit sauvegarde définitivement.',
      ar: 'git stash تخبئة مؤقتة؛ بينما git commit حفظ دائم في سجل المشروع.'
    },
    commonErrorsAndFixes: {
      en: 'How to get your code back? Run "git stash pop" to re-apply and remove from stash list.',
      fr: 'Pour récupérer vos modifications, faites "git stash pop".',
      ar: 'كيف تسترجع كودك المخبأ؟ نفذ ببساطة أمر git stash pop ليخرج التعديلات ويطبقها فوراً.'
    }
  },
  {
    id: 'git-tag',
    command: 'git tag',
    syntax: 'git tag [-a <tag-name> -m "<message>"]',
    category: 'advanced',
    categoryLabel: { en: 'Releases & Tags', fr: 'Étiquettes (Tags)', ar: 'إصدارات المشروع' },
    whatItDoes: {
      en: 'Creates a permanent named milestone tag (like v1.0.0) pointing to a specific commit in project history.',
      fr: 'Crée un jalon nommé permanent (comme v1.0.0) pointant vers un commit précis pour marquer une version.',
      ar: 'يضع علامة أو وسم إصدار رسمي دائم (مثل v1.0.0 أو v2.1) على commit معين يمثل نسخة نهائية للمشروع.'
    },
    whyWeUseIt: {
      en: 'To mark official production release versions so users and package managers know exact stable releases.',
      fr: 'Pour marquer les versions stables officielles destinées à la production.',
      ar: 'لتحديد الإصدارات الرسمية والمستقرة من موقعك أو تطبيقك التي يتم إطلاقها للجمهور.'
    },
    whenToUseIt: {
      en: 'When deploying a new version to production or publishing a library release.',
      fr: 'Lors de la mise en production d\'une version majeure ou mineure.',
      ar: 'عند إطلاق تحديث رئيسي للموقع أو نشر نسخة رسمية من التطبيق.'
    },
    whereToType: 'VS Code Terminal',
    realExample: 'git tag -a v1.0.0 -m "Release version 1.0.0 stable production"',
    expectedOutput: '# Tag created locally; push with "git push origin v1.0.0"',
    whatHappensAfter: {
      en: 'A tag reference is created; pushing it to GitHub displays an official Release download package.',
      fr: 'Une étiquette est créée; l\'envoyer sur GitHub génère une Release officielle téléchargeable.',
      ar: 'يتم إنشاء الوسم محلياً، وعند رفعه بـ git push origin v1.0.0 يظهر كـ Release رسمي على GitHub.'
    },
    differenceWithSimilar: {
      en: 'Branches continuously move forward with new commits; tags remain anchored permanently to one commit.',
      fr: 'Les branches avancent avec de nouveaux commits; les tags restent fixés au commit étiqueté.',
      ar: 'الفروع تتحرك باستمرار مع كل commit جديد؛ بينما الـ Tag يبقى ثابتاً في مكانه للأبد.'
    },
    commonErrorsAndFixes: {
      en: 'Running "git push" does NOT push tags! Fix: Run "git push origin <tag-name>" or "git push --tags".',
      fr: '"git push" n\'envoie pas les tags par défaut. Solution : Utilisez "git push origin <tag>" ou "--tags".',
      ar: 'أمر git push العادي لا يرفع الـ Tags! الحل: ارفعه صراحة بأمر git push origin v1.0.0.'
    }
  },
  {
    id: 'git-rm',
    command: 'git rm',
    syntax: 'git rm <file> [--cached]',
    category: 'advanced',
    categoryLabel: { en: 'File Management', fr: 'Gestion de Fichiers', ar: 'حذف الملفات من Git' },
    whatItDoes: {
      en: 'Removes files from the working tree and stages the deletion for the next commit snapshot.',
      fr: 'Supprime des fichiers du répertoire de travail et indexe leur suppression pour le prochain commit.',
      ar: 'يحذف الملف من مساحة العمل ويجهز عملية الحذف في الـ Staging للـ commit التالي.'
    },
    whyWeUseIt: {
      en: 'Properly tells Git that a file was intentionally deleted rather than missing.',
      fr: 'Informe proprement Git qu\'un fichier a été supprimé intentionnellement.',
      ar: 'لإخبار Git بأن الملف تم حذفه رسمياً وليس مفقوداً بالخطأ.'
    },
    whenToUseIt: {
      en: 'When deleting unwanted project files, or removing a file from Git tracking without deleting it (--cached).',
      fr: 'Pour supprimer un fichier ou arrêter de le suivre dans Git sans le supprimer du disque (--cached).',
      ar: 'عند حذف ملف نهائياً، أو لإلغاء تتبع ملف من Git مع إبقائه في جهازك عبر خيار --cached.'
    },
    whereToType: 'VS Code Terminal',
    realExample: 'git rm --cached .env',
    expectedOutput: 'rm \'.env\'',
    whatHappensAfter: {
      en: 'The file is un-tracked in Git index. With --cached, the actual file remains safe on your hard disk.',
      fr: 'Le fichier n\'est plus suivi par Git. Avec --cached, le fichier reste intact sur votre disque.',
      ar: 'يتوقف Git عن مراقبة الملف، ومع خيار --cached يبقى الملف في حاسوبك دون حذفه فعلياً.'
    },
    differenceWithSimilar: {
      en: 'Deleting via OS file explorer leaves file as "deleted" in working tree; "git rm" stages deletion immediately.',
      fr: 'Supprimer via l\'explorateur marque le fichier manquant; git rm indexe la suppression.',
      ar: 'الحذف العادي بالفأرة يتطلب عمل git add لاحقاً؛ بينما git rm يوثق الحذف مباشرة في الـ Staging.'
    },
    commonErrorsAndFixes: {
      en: 'Accidentally deleting a file from disk you wanted to keep. Fix: Always use "git rm --cached" if you only want to stop tracking.',
      fr: 'Supprimer le fichier du disque par erreur. Solution : Utilisez toujours --cached pour le garder localement.',
      ar: 'حذف الملف من القرص الصلب بالخطأ! الحل: استخدم دائماً --cached إذا كنت تريد إيقاف تتبعه فقط.'
    }
  },
  {
    id: 'git-mv',
    command: 'git mv',
    syntax: 'git mv <old-filename> <new-filename>',
    category: 'advanced',
    categoryLabel: { en: 'File Management', fr: 'Gestion de Fichiers', ar: 'إعادة تسمية ونقل الملفات' },
    whatItDoes: {
      en: 'Renames or moves a file or directory in your project and stages the move in one operation.',
      fr: 'Renomme ou déplace un fichier et indexe l\'opération en une seule commande.',
      ar: 'يعيد تسمية ملف أو ينقله إلى مجلد آخر ويجهز التغيير فوراً في الـ Staging Area.'
    },
    whyWeUseIt: {
      en: 'Prevents Git from thinking you deleted one file and created a totally unrelated new file, preserving history.',
      fr: 'Permet à Git de conserver l\'historique des modifications en reconnaissant le renommage.',
      ar: 'يضمن احتفاظ Git بتاريخ الملف كاملاً وتعرفه على أن الملف تم تعديل اسمه فقط وليس حذفه وإنشاء ملف جديد.'
    },
    whenToUseIt: {
      en: 'Whenever refactoring project folder structure or renaming files.',
      fr: 'Lors de la réorganisation de dossiers ou du renommage de fichiers.',
      ar: 'عند إعادة تنظيم هيكل مجلدات المشروع أو تعديل أسماء الملفات.'
    },
    whereToType: 'VS Code Terminal',
    realExample: 'git mv old-style.css style.css',
    expectedOutput: '# Silent success',
    whatHappensAfter: {
      en: 'File is renamed on disk and staged in index as "renamed: old-style.css -> style.css".',
      fr: 'Le fichier est renommé sur le disque et indexé comme renommé.',
      ar: 'يتغير اسم الملف في القرص ويُسجل كعملية rename جاهزة للـ commit.'
    },
    differenceWithSimilar: {
      en: 'Equivalent to doing "mv old new" in bash followed by "git add new" and "git rm old".',
      fr: 'Équivalent à renommer le fichier puis faire git add du nouveau et git rm de l\'ancien.',
      ar: 'يعادل إعادة تسمية الملف يدوياً ثم تنفيذ git add للاسم الجديد و git rm للاسم القديم.'
    },
    commonErrorsAndFixes: {
      en: '"fatal: bad source" -> The original file does not exist. Check spelling.',
      fr: '"fatal: bad source" -> Le fichier d\'origine n\'existe pas.',
      ar: 'خطأ bad source -> الملف الأصلي غير موجود بهذا الاسم، تأكد من صحة الحروف.'
    }
  }
];

export const GIT_COMMAND_COMPARISONS: CommandComparison[] = [
  {
    id: 'add-vs-commit',
    title: 'git add vs git commit',
    cmdA: 'git add',
    cmdB: 'git commit',
    summary: {
      en: 'git add stages changes in the preparation area; git commit permanently writes the snapshot to history.',
      fr: 'git add prépare les changements dans l\'index; git commit enregistre définitivement l\'instantané.',
      ar: 'git add يجهز الملفات في منطقة التحضير؛ بينما git commit يحفظ اللقطة نهائياً في سجل تاريخ المشروع.'
    },
    comparisonPoints: [
      {
        feature: { en: 'Location in Git Tree', fr: 'Emplacement', ar: 'الموقع في شجرة Git' },
        cmdAVal: { en: 'Staging Area (Index)', fr: 'Zone d\'indexation', ar: 'منطقة التجهيز (Staging Area)' },
        cmdBVal: { en: 'Local Repository Database', fr: 'Base de données locale', ar: 'المستودع المحلي الدائم (.git)' }
      },
      {
        feature: { en: 'Reversibility', fr: 'Réversibilité', ar: 'سهولة التراجع' },
        cmdAVal: { en: 'Easily un-staged with "git restore --staged"', fr: 'Facilement annulé avec restore --staged', ar: 'سهل التراجع عبر git restore --staged' },
        cmdBVal: { en: 'Requires new commit or git revert to roll back', fr: 'Nécessite revert ou nouveau commit', ar: 'يحتاج لـ revert أو لقطة جديدة لإلغائه' }
      },
      {
        feature: { en: 'Real-world Analogy', fr: 'Analogie réelle', ar: 'مثال توضيحي واقعي' },
        cmdAVal: { en: 'Putting groceries into the shopping cart', fr: 'Mettre les articles dans le panier', ar: 'وضع المنتجات في عربة التسوق' },
        cmdBVal: { en: 'Paying at the register and getting the receipt', fr: 'Payer en caisse et recevoir le ticket', ar: 'دفع الحساب واستلام الفاتورة الرسمية' }
      }
    ],
    verdict: {
      en: 'You must always "git add" first before you can "git commit". They work as a two-stage safety pipeline.',
      fr: 'Vous devez toujours faire "git add" avant "git commit". C\'est un processus de sécurité en 2 étapes.',
      ar: 'يجب دائماً عمل git add أولاً لاختيار ما تريد حفظه، ثم عمل git commit لتوثيقه.'
    }
  },
  {
    id: 'commit-vs-push',
    title: 'git commit vs git push',
    cmdA: 'git commit',
    cmdB: 'git push',
    summary: {
      en: 'git commit saves on your own computer offline; git push uploads those commits to GitHub over the internet.',
      fr: 'git commit enregistre sur votre PC hors-ligne; git push téléverse vers GitHub via internet.',
      ar: 'git commit يحفظ في حاسوبك بدون إنترنت؛ بينما git push يرفع هذا الحفظ إلى سحابة GitHub عبر الإنترنت.'
    },
    comparisonPoints: [
      {
        feature: { en: 'Internet Required?', fr: 'Internet requis ?', ar: 'هل يحتاج إنترنت؟' },
        cmdAVal: { en: 'NO. Works 100% offline.', fr: 'NON. Fonctionne 100% hors-ligne.', ar: 'لا، يعمل أوفلاين 100% في جهازك.' },
        cmdBVal: { en: 'YES. Must connect to GitHub/GitLab.', fr: 'OUI. Doit joindre GitHub.', ar: 'نعم، يجب الاتصال بسحابة GitHub.' }
      },
      {
        feature: { en: 'Who Can See It?', fr: 'Visibilité', ar: 'من يستطيع رؤيته؟' },
        cmdAVal: { en: 'Only you on your local machine', fr: 'Uniquement vous sur votre machine', ar: 'أنت فقط في حاسوبك الخاص' },
        cmdBVal: { en: 'Teammates and public GitHub visitors', fr: 'Vos collaborateurs et visiteurs GitHub', ar: 'فريق العمل وزوار حسابك على GitHub' }
      }
    ],
    verdict: {
      en: 'Commit often locally as you build; push once you have a tested checkpoint to share.',
      fr: 'Commitez souvent en local; pushez lorsque votre travail est prêt à être partagé.',
      ar: 'احفظ بالـ commit باستمرار في جهازك؛ وعندما تكتمل الميزة ارفعها للجميع بأمر git push.'
    }
  },
  {
    id: 'fetch-vs-pull',
    title: 'git fetch vs git pull',
    cmdA: 'git fetch',
    cmdB: 'git pull',
    summary: {
      en: 'git fetch downloads commits safely without touching files; git pull downloads AND merges immediately.',
      fr: 'git fetch télécharge sans toucher aux fichiers; git pull télécharge ET fusionne immédiatement.',
      ar: 'git fetch يحمل التعديلات بأمان دون لمس ملفاتك؛ بينما git pull يحمل ويدمج التعديلات فوراً.'
    },
    comparisonPoints: [
      {
        feature: { en: 'Safety Level', fr: 'Niveau de sécurité', ar: 'مستوى الأمان' },
        cmdAVal: { en: '100% Safe (zero merge conflicts)', fr: '100% Sûr (zéro conflit)', ar: 'آمن 100% ولا يسبب أي تعارض' },
        cmdBVal: { en: 'Can trigger merge conflicts in working tree', fr: 'Peut provoquer des conflits', ar: 'قد يسبب تعارضاً فورياً في ملفاتك' }
      },
      {
        feature: { en: 'Formula', fr: 'Formule équivalente', ar: 'المعادلة البرمجية' },
        cmdAVal: { en: 'git fetch', fr: 'git fetch', ar: 'git fetch فقط' },
        cmdBVal: { en: 'git fetch + git merge', fr: 'git fetch + git merge', ar: 'git fetch متبوعاً بـ git merge' }
      }
    ],
    verdict: {
      en: 'Use git pull for routine updates. Use git fetch when you want to inspect what colleagues pushed first.',
      fr: 'Utilisez git pull pour les mises à jour courantes; git fetch pour inspecter avant d\'intégrer.',
      ar: 'استخدم git pull للعمل اليومي المباشر، واستخدم git fetch إذا أردت فحص تعديلات الفريق قبل دمجها.'
    }
  },
  {
    id: 'clone-vs-init',
    title: 'git clone vs git init',
    cmdA: 'git clone',
    cmdB: 'git init',
    summary: {
      en: 'git clone downloads an existing repository from the internet; git init starts a blank repository locally.',
      fr: 'git clone copie un dépôt existant distant; git init démarre un dépôt vierge en local.',
      ar: 'git clone يستنسخ مشروعاً موجوداً على الإنترنت؛ بينما git init يبدأ مشروعاً جديداً وفارغاً محلياً.'
    },
    comparisonPoints: [
      {
        feature: { en: 'Starting Point', fr: 'Point de départ', ar: 'نقطة الانطلاق' },
        cmdAVal: { en: 'An existing repo URL on GitHub', fr: 'Une URL de dépôt GitHub existante', ar: 'رابط مشروع جاهز على GitHub' },
        cmdBVal: { en: 'An empty or existing local folder', fr: 'Un dossier local vide ou existant', ar: 'مجلد محلي فارغ في حاسوبك' }
      },
      {
        feature: { en: 'Remote Configured?', fr: 'Remote préconfiguré ?', ar: 'هل يتم ربط السحابة تلقائياً؟' },
        cmdAVal: { en: 'YES! Automatically sets origin remote', fr: 'OUI! origin est automatiquement configuré', ar: 'نعم! يتم ربط origin بالسحابة تلقائياً' },
        cmdBVal: { en: 'NO. Must run "git remote add" manually', fr: 'NON. Doit ajouter le remote manuellement', ar: 'لا، يجب ربطه يدوياً بـ git remote add' }
      }
    ],
    verdict: {
      en: 'Never run "git init" inside a cloned folder! It is already an initialized Git repo.',
      fr: 'N\'exécutez jamais "git init" dans un dossier cloné! Il est déjà un dépôt Git.',
      ar: 'إياك وتشغيل git init داخل مجلد قمت باستنساخه بـ git clone؛ لأنه مهيأ مسبقاً.'
    }
  },
  {
    id: 'switch-vs-checkout',
    title: 'git switch vs git checkout',
    cmdA: 'git switch',
    cmdB: 'git checkout',
    summary: {
      en: 'git switch is the modern dedicated command for branch navigation; git checkout is the legacy multi-tool.',
      fr: 'git switch est la commande moderne dédiée aux branches; git checkout est l\'ancienne commande à tout faire.',
      ar: 'git switch هو الأمر الحديث المخصص حصراً للفروع؛ بينما git checkout هو الأمر القديم المتعدد الاستخدامات.'
    },
    comparisonPoints: [
      {
        feature: { en: 'Introduction Date', fr: 'Date d\'introduction', ar: 'تاريخ الإطلاق' },
        cmdAVal: { en: 'Git 2.23 (Modern standard)', fr: 'Git 2.23 (Standard moderne)', ar: 'إصدار Git 2.23 الحديث (المعيار الموصى به)' },
        cmdBVal: { en: 'Git 1.0 (Original legacy)', fr: 'Git 1.0 (Historique)', ar: 'إصدار Git 1.0 الكلاسيكي' }
      },
      {
        feature: { en: 'Safety', fr: 'Sécurité', ar: 'الأمان' },
        cmdAVal: { en: 'Cannot accidentally overwrite or delete file edits', fr: 'Ne peut pas écraser de fichiers par erreur', ar: 'لا يمكن أن يحذف أو يعيد كتابة كودك بالخطأ' },
        cmdBVal: { en: 'Can accidentally discard uncommitted file modifications', fr: 'Peut écraser des fichiers non indexés', ar: 'قد يلغي تعديلات ملفك إذا أخطأت في الصيغة' }
      }
    ],
    verdict: {
      en: 'Always prefer "git switch" and "git switch -c <name>" in all modern projects.',
      fr: 'Privilégiez toujours "git switch" dans vos projets modernes.',
      ar: 'اعتمد دائماً على git switch و git switch -c في كل مشاريعك البرمجية الحديثة.'
    }
  },
  {
    id: 'restore-vs-reset',
    title: 'git restore vs git reset',
    cmdA: 'git restore',
    cmdB: 'git reset',
    summary: {
      en: 'git restore undoes edits in individual files; git reset rewinds entire commit history pointers.',
      fr: 'git restore annule des modifications de fichiers; git reset recule l\'historique des commits.',
      ar: 'git restore يلغي التعديلات في ملفات محددة؛ بينما git reset يحرك مؤشر تاريخ الـ Commits في الفرع.'
    },
    comparisonPoints: [
      {
        feature: { en: 'Target Scope', fr: 'Cible', ar: 'نطاق التأثير' },
        cmdAVal: { en: 'Specific file contents on disk', fr: 'Contenu d\'un fichier spécifique', ar: 'محتوى ملف محدد في حاسوبك' },
        cmdBVal: { en: 'The branch HEAD commit pointer', fr: 'Le pointeur de commit HEAD de la branche', ar: 'مؤشر الـ HEAD وسجل الـ Commits' }
      }
    ],
    verdict: {
      en: 'Use git restore to discard bad edits in a file. Use git reset to undo an entire commit.',
      fr: 'Utilisez restore pour nettoyer un fichier; reset pour défaire un commit.',
      ar: 'استخدم restore للتراجع عن تعديل ملف؛ واستخدم reset للتراجع عن commit كامل.'
    }
  },
  {
    id: 'merge-vs-rebase',
    title: 'git merge vs git rebase',
    cmdA: 'git merge',
    cmdB: 'git rebase',
    summary: {
      en: 'git merge preserves branch history via a merge commit; git rebase replays commits linearly for a clean line.',
      fr: 'git merge préserve l\'arbre d\'historique; git rebase réécrit l\'historique en ligne droite.',
      ar: 'git merge يحافظ على شجرة الفروع التاريخية؛ بينما git rebase يعيد ترتيب الـ Commits في خط مستقيم ناصع.'
    },
    comparisonPoints: [
      {
        feature: { en: 'History Style', fr: 'Type d\'historique', ar: 'شكل التاريخ' },
        cmdAVal: { en: 'Branching tree with merge commit nodes', fr: 'Arbre avec commits de fusion visibles', ar: 'شجرة متفرعة مع عقد دمج واضحة' },
        cmdBVal: { en: 'Strictly linear single-line timeline', fr: 'Historique linéaire parfaitement droit', ar: 'خط زمني مستقيم بدون أي تفرعات' }
      },
      {
        feature: { en: 'Safe on Public Branches?', fr: 'Sûr sur branches publiques ?', ar: 'هل هو آمن على الفروع العامة؟' },
        cmdAVal: { en: 'YES. Never rewrites historical commit hashes.', fr: 'OUI. Ne réécrit jamais les hashes.', ar: 'نعم آمن، ولا يغير أرقام الـ Hash السابقة.' },
        cmdBVal: { en: 'DANGEROUS! Never rebase commits already pushed to GitHub.', fr: 'DANGEREUX sur branches partagées.', ar: 'خطير! إياك وعمل rebase لكود تم رفعه ومشاركته.' }
      }
    ],
    verdict: {
      en: 'For beginners and team main branches, "git merge" is always the safest and most transparent choice.',
      fr: 'Pour les débutants et le travail en équipe, "git merge" est le choix le plus sûr.',
      ar: 'للمبتدئين وفروع الفرق المشتركة، git merge هو الخيار الأسلم والأكثر أماناً وشفافية.'
    }
  }
];
