export type Language = 'en' | 'fr' | 'ar';

export interface Translations {
  siteTitle: string;
  siteSubtitle: string;
  home: string;
  courses: string;
  htmlCourse: string;
  cssCourse: string;
  gitCourse: string;
  githubCourse: string;
  uploadToGithub: string;
  gitCommandsExplained: string;
  cssPropertiesExplained: string;
  terminalSimulator: string;
  cssPlayground: string;
  practiceExercises: string;
  playground: string;
  quizzes: string;
  projects: string;
  dashboard: string;
  pdfHandbook: string;
  search: string;
  searchPlaceholder: string;
  searchNoResults: string;
  startLearning: string;
  continueLearning: string;
  completed: string;
  markCompleted: string;
  markIncomplete: string;
  bookmark: string;
  bookmarked: string;
  previous: string;
  next: string;
  lessons: string;
  duration: string;
  difficulty: string;
  beginner: string;
  intermediate: string;
  advanced: string;
  copyCode: string;
  copied: string;
  reset: string;
  runCode: string;
  downloadCode: string;
  openInPlayground: string;
  htmlPreview: string;
  cssEditor: string;
  jsEditor: string;
  livePreview: string;
  expectedResult: string;
  syntax: string;
  lineExplanation: string;
  commonMistakes: string;
  practicalExercise: string;
  miniQuiz: string;
  whenToUse: string;
  safetyWarning: string;
  terminalOutput: string;
  quizTitle: string;
  quizSubtitle: string;
  score: string;
  timer: string;
  submitAnswer: string;
  nextQuestion: string;
  viewResults: string;
  retryQuiz: string;
  explanation: string;
  proTip: string;
  totalScore: string;
  correctAnswers: string;
  incorrectAnswers: string;
  streak: string;
  daysStreak: string;
  overallProgress: string;
  recentActivity: string;
  bookmarksList: string;
  noBookmarks: string;
  printPdf: string;
  toggleLanguage: string;
  toggleTheme: string;
  allCategories: string;
  filterBy: string;
  desktop: string;
  tablet: string;
  mobile: string;
  starterCode: string;
  instructions: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    siteTitle: "WebDev Master",
    siteSubtitle: "Interactive Git, GitHub & CSS Academy",
    home: "Home",
    courses: "Courses",
    htmlCourse: "HTML Academy",
    cssCourse: "CSS Academy",
    gitCourse: "Git Complete Course",
    githubCourse: "GitHub Complete Course",
    uploadToGithub: "Upload Project to GitHub",
    gitCommandsExplained: "Git Commands Explained",
    cssPropertiesExplained: "CSS Properties Explained",
    terminalSimulator: "Interactive Git Terminal",
    cssPlayground: "CSS Visual Playground",
    practiceExercises: "Practice Exercises",
    playground: "Code Playground",
    quizzes: "Quizzes & Exams",
    projects: "Real Projects",
    dashboard: "My Learning Progress",
    pdfHandbook: "PDF Handbook",
    search: "Search lessons & commands...",
    searchPlaceholder: "Search HTML tags, CSS properties, Git commands, or GitHub guides... (Ctrl+K)",
    searchNoResults: "No matching lessons found",
    startLearning: "Start Learning",
    continueLearning: "Continue Learning",
    completed: "Completed",
    markCompleted: "Mark as Completed",
    markIncomplete: "Mark as Incomplete",
    bookmark: "Bookmark",
    bookmarked: "Bookmarked",
    previous: "Previous",
    next: "Next",
    lessons: "lessons",
    duration: "Duration",
    difficulty: "Level",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    copyCode: "Copy Code",
    copied: "Copied!",
    reset: "Reset",
    runCode: "Run Code",
    downloadCode: "Download",
    openInPlayground: "Open in Playground",
    htmlPreview: "HTML Preview",
    cssEditor: "CSS Editor",
    jsEditor: "JavaScript Editor",
    livePreview: "Live Sandbox",
    expectedResult: "Expected Browser Output",
    syntax: "Syntax & Standard Rules",
    lineExplanation: "Line-by-Line Breakdown",
    commonMistakes: "Common Mistakes",
    practicalExercise: "Practical Exercise",
    miniQuiz: "Quick Check Mini Quiz",
    whenToUse: "When to use this command?",
    safetyWarning: "Safety Warning for Destructive Commands",
    terminalOutput: "Expected Terminal Output",
    quizTitle: "Interactive Assessment Engine",
    quizSubtitle: "Test your skills with instant feedback and verified explanations",
    score: "Score",
    timer: "Timer Mode",
    submitAnswer: "Submit Answer",
    nextQuestion: "Next Question",
    viewResults: "View Results",
    retryQuiz: "Retry Quiz",
    explanation: "Verified Explanation",
    proTip: "Developer Pro Tip",
    totalScore: "Total Score",
    correctAnswers: "Correct Answers",
    incorrectAnswers: "Needs Review",
    streak: "Learning Streak",
    daysStreak: "Days Streak",
    overallProgress: "Overall Learning Progress",
    recentActivity: "Recent Activity",
    bookmarksList: "Saved Bookmarks",
    noBookmarks: "No bookmarked lessons yet.",
    printPdf: "Print / Export PDF",
    toggleLanguage: "Language",
    toggleTheme: "Toggle Theme",
    allCategories: "All Categories",
    filterBy: "Filter by",
    desktop: "Desktop",
    tablet: "Tablet",
    mobile: "Mobile",
    starterCode: "Starter Code",
    instructions: "Implementation Steps"
  },
  fr: {
    siteTitle: "WebDev Master",
    siteSubtitle: "Académie Interactive Git, GitHub & CSS",
    home: "Accueil",
    courses: "Formations",
    htmlCourse: "Académie HTML5",
    cssCourse: "Académie CSS3",
    gitCourse: "Cours Complet Git",
    githubCourse: "Cours Complet GitHub",
    uploadToGithub: "Publier son Projet sur GitHub",
    gitCommandsExplained: "Commandes Git Expliquées",
    cssPropertiesExplained: "Propriétés CSS Expliquées",
    terminalSimulator: "Terminal Git Interactif",
    cssPlayground: "Playground Visuel CSS",
    practiceExercises: "Exercices Pratiques",
    playground: "Bac à Sable Code",
    quizzes: "Quiz & Examens",
    projects: "Projets Réels",
    dashboard: "Mes Progrès d'Apprentissage",
    pdfHandbook: "Guide PDF",
    search: "Rechercher des cours et commandes...",
    searchPlaceholder: "Recherchez balises HTML, styles CSS, commandes Git... (Ctrl+K)",
    searchNoResults: "Aucun résultat trouvé",
    startLearning: "Commencer à Apprendre",
    continueLearning: "Continuer l'Apprentissage",
    completed: "Terminé",
    markCompleted: "Marquer comme Terminé",
    markIncomplete: "Marquer comme Incomplet",
    bookmark: "Favoris",
    bookmarked: "Enregistré",
    previous: "Précédent",
    next: "Suivant",
    lessons: "leçons",
    duration: "Durée",
    difficulty: "Niveau",
    beginner: "Débutant",
    intermediate: "Intermédiaire",
    advanced: "Avancé",
    copyCode: "Copier le Code",
    copied: "Copié !",
    reset: "Réinitialiser",
    runCode: "Exécuter & Visualiser",
    downloadCode: "Télécharger",
    openInPlayground: "Ouvrir dans le Bac à Sable",
    htmlPreview: "Aperçu HTML",
    cssEditor: "Éditeur CSS",
    jsEditor: "Éditeur JS",
    livePreview: "Aperçu en Direct",
    expectedResult: "Résultat Attendu",
    syntax: "Syntaxe & Règles",
    lineExplanation: "Explication Ligne par Ligne",
    commonMistakes: "Erreurs Courantes",
    practicalExercise: "Exercice Pratique",
    miniQuiz: "Mini Quiz Rapide",
    whenToUse: "Quand utiliser cette commande ?",
    safetyWarning: "Avertissement de Sécurité",
    terminalOutput: "Sortie du Terminal Attendue",
    quizTitle: "Système de Quiz Interactif",
    quizSubtitle: "Testez vos compétences avec rétroaction instantanée",
    score: "Score",
    timer: "Mode Minuteur",
    submitAnswer: "Valider la Réponse",
    nextQuestion: "Question Suivante",
    viewResults: "Voir les Résultats",
    retryQuiz: "Recommencer",
    explanation: "Explication Détaillée",
    proTip: "Conseil de Développeur",
    totalScore: "Score Total",
    correctAnswers: "Réponses Correctes",
    incorrectAnswers: "À Réviser",
    streak: "Série d'Apprentissage",
    daysStreak: "Jours Consécutifs",
    overallProgress: "Progression Globale",
    recentActivity: "Activité Récente",
    bookmarksList: "Leçons Favorites",
    noBookmarks: "Aucune leçon enregistrée.",
    printPdf: "Imprimer / Exporter PDF",
    toggleLanguage: "Langue",
    toggleTheme: "Changer de Thème",
    allCategories: "Toutes Catégories",
    filterBy: "Filtrer par",
    desktop: "Ordinateur",
    tablet: "Tablette",
    mobile: "Mobile",
    starterCode: "Code de Départ",
    instructions: "Étapes de Réalisation"
  },
  ar: {
    siteTitle: "WebDev Master",
    siteSubtitle: "أكاديمية Git و GitHub و CSS التفاعلية",
    home: "الرئيسية",
    courses: "المسارات التعليمية",
    htmlCourse: "أكاديمية HTML5",
    cssCourse: "أكاديمية CSS3",
    gitCourse: "دورة Git الشاملة",
    githubCourse: "دورة GitHub العملية",
    uploadToGithub: "رفع مشروعك إلى GitHub",
    gitCommandsExplained: "شرح أوامر Git خطوة بخطوة",
    cssPropertiesExplained: "موسوعة خصائص CSS",
    terminalSimulator: "الطرفية التفاعلية لمحاكاة Git",
    cssPlayground: "مختبر CSS المرئي التفاعلي",
    practiceExercises: "تمارين وتحديات عملية",
    playground: "المختبر البرمجي",
    quizzes: "الاختبارات و Quiz",
    projects: "مشاريع عملية متكاملة",
    dashboard: "لوحة تقدمي التعليمي",
    pdfHandbook: "كتاب الـ PDF",
    search: "بحث في الدروس والأوامر...",
    searchPlaceholder: "ابحث عن أي وسم HTML، خاصية CSS، أمر Git، أو موضوع GitHub... (Ctrl+K)",
    searchNoResults: "لم يتم العثور على نتائج مطابقة",
    startLearning: "ابدأ التعلم الآن",
    continueLearning: "متابعة التعلم",
    completed: "مكتمل",
    markCompleted: "تحديد كمكتمل",
    markIncomplete: "إلغاء التحديد",
    bookmark: "حفظ في المفضلة",
    bookmarked: "محفوظ بالمفضلة",
    previous: "السابق",
    next: "التالي",
    lessons: "درساً",
    duration: "المدة",
    difficulty: "المستوى",
    beginner: "مبتدئ",
    intermediate: "متوسط",
    advanced: "متقدم",
    copyCode: "نسخ الكود",
    copied: "تم النسخ بنجاح!",
    reset: "إعادة تعيين",
    runCode: "تشغيل ومعاينة",
    downloadCode: "تحميل المشروع",
    openInPlayground: "تجربة في المختبر",
    htmlPreview: "معاينة HTML",
    cssEditor: "محرر CSS",
    jsEditor: "محرر JavaScript",
    livePreview: "المعاينة المباشرة التفاعلية",
    expectedResult: "النتيجة المتوقعة في المتصفح",
    syntax: "الصيغة وقواعد الكتابة (Syntax)",
    lineExplanation: "شرح تفصيلي لكل سطر كود",
    commonMistakes: "أخطاء شائعة احذر منها",
    practicalExercise: "تمرين تطبيقي عملي",
    miniQuiz: "سؤال اختباري سريع",
    whenToUse: "متى تستخدم هذا الأمر؟",
    safetyWarning: "تحذير أمان للأوامر الحساسة",
    terminalOutput: "النتيجة المتوقعة في الطرفية",
    quizTitle: "نظام الاختبارات التفاعلية",
    quizSubtitle: "اختبر مهاراتك مع تصحيح فوري وتعليلات برمجية دقيقة",
    score: "النتيجة",
    timer: "المؤقت الزمني",
    submitAnswer: "تأكيد الإجابة",
    nextQuestion: "السؤال التالي",
    viewResults: "عرض التقرير النهائي",
    retryQuiz: "إعادة الاختبار",
    explanation: "التصحيح والتعليل النموذجي",
    proTip: "نصيحة المهندس",
    totalScore: "الدرجة النهائية",
    correctAnswers: "الإجابات الصحيحة",
    incorrectAnswers: "إجابات تحتاج مراجعة",
    streak: "حماس التعلم",
    daysStreak: "أيام متواصلة",
    overallProgress: "التقدم الإجمالي العام",
    recentActivity: "النشاط الأخير",
    bookmarksList: "الدروس المحفوظة في المفضلة",
    noBookmarks: "لا توجد دروس محفوظة حالياً.",
    printPdf: "تحميل / طباعة PDF",
    toggleLanguage: "اللغة",
    toggleTheme: "تبديل المظهر",
    allCategories: "جميع الفئات",
    filterBy: "تصفية حسب",
    desktop: "حاسوب",
    tablet: "تابلت",
    mobile: "هاتف",
    starterCode: "كود البداية",
    instructions: "خطوات التنفيذ والإرشادات"
  }
};
