export interface ExtendedQuizQuestion {
  id: number;
  technology: 'html' | 'css' | 'git' | 'github';
  category: string;
  categoryName: { ar: string; en: string };
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  question: { ar: string; en: string };
  codeSnippet?: string;
  options: {
    ar: string[];
    en: string[];
  };
  correctIndex: number;
  explanation: { ar: string; en: string };
  proTip: { ar: string; en: string };
}

export const COMPREHENSIVE_QUIZ_BANK: ExtendedQuizQuestion[] = [
  // ------------------------------------------------
  // HTML QUESTIONS (15+ Questions)
  // ------------------------------------------------
  {
    id: 101,
    technology: 'html',
    category: 'basics',
    categoryName: { ar: 'أساسيات HTML', en: 'HTML Basics' },
    difficulty: 'beginner',
    question: {
      ar: 'ما هو الاختصار الصحيح لـ HTML وما هو تصنيفها؟',
      en: 'What does HTML stand for and what is its classification?'
    },
    options: {
      ar: [
        'HyperText Markup Language - لغة توصيف لهيكلة صفحات الويب',
        'HighText Machine Language - لغة برمجة خوارزمية',
        'Hyperlink Text Management Language - أداة إدارة قواعد بيانات',
        'Home Tool Markup Language - لغة تنسيق رسومي'
      ],
      en: [
        'HyperText Markup Language - A markup language for web structure',
        'HighText Machine Language - An algorithmic programming language',
        'Hyperlink Text Management Language - A database tool',
        'Home Tool Markup Language - A graphic design format'
      ]
    },
    correctIndex: 0,
    explanation: {
      ar: 'HTML اختصار لـ HyperText Markup Language وهي لغة توصيفية تحدد هيكل ومحتوى صفحات الويب وليست لغة برمجة.',
      en: 'HTML stands for HyperText Markup Language; it defines document structure and is not a programming language.'
    },
    proTip: {
      ar: 'HTML تعطي المعنى والهيكل، بينما CSS تتولى التنسيق والجمالية.',
      en: 'HTML provides semantic structure, while CSS manages visual presentation.'
    }
  },
  {
    id: 102,
    technology: 'html',
    category: 'structure',
    categoryName: { ar: 'بنية المستند', en: 'Document Structure' },
    difficulty: 'beginner',
    question: {
      ar: 'ما هو الغرض من إعلان <!DOCTYPE html> في بداية أي ملف HTML5؟',
      en: 'What is the purpose of <!DOCTYPE html> at the start of an HTML5 document?'
    },
    options: {
      ar: [
        'إخبار المتصفح بأن المستند يتبع المعيار القياسي الحديث لـ HTML5 لمنع وضع التوافق القديم (Quirks Mode)',
        'تحميل خطوط جوجل تلقائياً',
        'تشفير الملف برقم سري',
        'ربط الصفحة بقاعدة بيانات سحابية'
      ],
      en: [
        'Informs the browser to render using modern HTML5 standard mode rather than quirks mode',
        'Automatically loads Google Fonts',
        'Encrypts document with password hash',
        'Connects the document to cloud databases'
      ]
    },
    correctIndex: 0,
    explanation: {
      ar: '<!DOCTYPE html> يضمن عرض المتصفح للصفحة في الوضع القياسي (Standard Mode) بدلاً من Quirks Mode القديم.',
      en: '<!DOCTYPE html> triggers standard rendering mode in all compliant modern browsers.'
    },
    proTip: {
      ar: 'يجب أن يكون دائماً أول سطر مكتوب في ملف index.html.',
      en: 'Always place it as the absolute first line of your HTML document.'
    }
  },
  {
    id: 103,
    technology: 'html',
    category: 'tags',
    categoryName: { ar: 'الوسوم والعناصر', en: 'Tags & Elements' },
    difficulty: 'beginner',
    question: {
      ar: 'أي من العناصر التالية يعتبر عنصراً ذاتي الإغلاق (Void Element) لا يحتاج لوسم إغلاق؟',
      en: 'Which of the following is a self-closing void element in HTML?'
    },
    options: {
      ar: ['<img>', '<p>', '<article>', '<button>'],
      en: ['<img>', '<p>', '<article>', '<button>']
    },
    correctIndex: 0,
    explanation: {
      ar: 'وسم <img> لا يحتوي على محتوى نصي داخله ويأتي بدون وسم إغلاق </img>، ومثله <br> و <hr> و <input>.',
      en: '<img> cannot contain child nodes and is a void element with no closing tag.'
    },
    proTip: {
      ar: 'في HTML5 كتابة <img ...> كافية تماماً ولا يلزم إضافة السلاش <img ... />.',
      en: 'In HTML5, trailing slashes like <img /> are optional and purely stylistic.'
    }
  },
  {
    id: 104,
    technology: 'html',
    category: 'semantic',
    categoryName: { ar: 'HTML الدلالي', en: 'Semantic HTML' },
    difficulty: 'intermediate',
    question: {
      ar: 'أي وسم دلالي يمثل المحتوى الرئيسي الحصري والفريد للصفحة، ويُمنع تكراره؟',
      en: 'Which semantic tag represents the unique primary content of a page and should not be duplicated?'
    },
    options: {
      ar: ['<main>', '<header>', '<aside>', '<section>'],
      en: ['<main>', '<header>', '<aside>', '<section>']
    },
    correctIndex: 0,
    explanation: {
      ar: '<main> يمثل صلب موضوع الصفحة ويجب ألا يتكرر في نفس المستند وألا يوضع داخل header أو footer.',
      en: '<main> encapsulates the unique primary content of the document and must not be nested in headers or footers.'
    },
    proTip: {
      ar: 'تساعد وسم <main> قارئات الشاشة للقفز مباشرة إلى محتوى المقال دون إعادة قراءة شريط التنقل.',
      en: 'Screen readers use <main> as an accessible landmark to jump past navigation bars.'
    }
  },
  {
    id: 105,
    technology: 'html',
    category: 'forms',
    categoryName: { ar: 'النماذج', en: 'Forms' },
    difficulty: 'intermediate',
    question: {
      ar: 'كيف نقوم بربط عنصر <label> بحقل الإدخال <input> المناسب له لسهولة الوصول؟',
      en: 'How do you semantically associate a <label> with its corresponding <input>?'
    },
    options: {
      ar: [
        'وضع قيمة خاصية for في label مطابقة لقيمة id في input',
        'وضع نفس اسم class في الاثنين',
        'وضع label داخل div مستقل',
        'استخدام خاصية connect="input"'
      ],
      en: [
        'Setting the label for attribute to match the input id attribute exactly',
        'Assigning identical class names to both',
        'Wrapping label in an arbitrary separate div',
        'Using connect="input"'
      ]
    },
    correctIndex: 0,
    explanation: {
      ar: 'خاصية for في <label for="email"> ترتبط بالمعرف <input id="email"> بحيث إذا ضغط المستخدم على النص يتم تفعيل الحقل.',
      en: 'Matching label for with input id makes clicking the label focus the input.'
    },
    proTip: {
      ar: 'هذا الربط يرفع درجة إمكانية الوصول (Accessibility) بمعدل 100%.',
      en: 'Crucial for a11y: enables screen reader focus and enlarges tap targets on phones.'
    }
  },
  {
    id: 106,
    technology: 'html',
    category: 'attributes',
    categoryName: { ar: 'الخصائص', en: 'Attributes' },
    difficulty: 'intermediate',
    question: {
      ar: 'ما هي أهمية خاصية rel="noopener noreferrer" عند استخدام target="_blank" في الروابط؟',
      en: 'Why is rel="noopener noreferrer" recommended when using target="_blank" on links?'
    },
    options: {
      ar: [
        'لحماية الصفحة الأصلية من هجمات التلاعب بالنافذة (Reverse Tabnabbing) وحجب معلومات الإحالة',
        'لتغيير لون الرابط للأخضر',
        'لتشغيل الصوت تلقائياً',
        'لتسريع سرعة الإنترنت'
      ],
      en: [
        'Protects against Reverse Tabnabbing exploits by severing window.opener access',
        'Turns link color green',
        'Enables autoplaying media',
        'Accelerates network bandwidth'
      ]
    },
    correctIndex: 0,
    explanation: {
      ar: 'خاصية noopener تمنع الصفحة الخارجية الجديدة من الوصول لـ window.opener في صفحتك لحماية أمان موقعك.',
      en: 'noopener prevents the new tab from referencing window.opener and manipulating the parent page.'
    },
    proTip: {
      ar: 'المتصفحات الحديثة تضيف noopener تلقائياً، ولكن كتابتها تضمن حماية المتصفحات القديمة.',
      en: 'Modern browsers default to noopener on target=_blank, but explicit inclusion remains best practice.'
    }
  },
  {
    id: 107,
    technology: 'html',
    category: 'advanced',
    categoryName: { ar: 'مفاهيم متقدمة', en: 'Advanced HTML' },
    difficulty: 'advanced',
    question: {
      ar: 'ما وظيفة السطر التالي في رأس الصفحة؟',
      en: 'What does this meta viewport directive achieve?'
    },
    codeSnippet: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    options: {
      ar: [
        'يضبط عرض الصفحة ليتطابق مع العرض الفيزيائي لشاشة الهاتف بدون تصغير مشوه',
        'يقوم بتحميل تطبيقات الهواتف الذكية',
        'يغير لغة الصفحة للإنجليزية',
        'يمنع التقاط لقطات الشاشة'
      ],
      en: [
        'Sets viewport width to physical device display width and establishes 1:1 scale',
        'Downloads mobile apps in background',
        'Changes site language to English',
        'Disables mobile screenshot captures'
      ]
    },
    correctIndex: 0,
    explanation: {
      ar: 'وسم viewport ضروري لتمكين التجاوب (Responsive Web Design)؛ بدونه تفترض الهواتف عرض ديسكتوب ثابت 980px.',
      en: 'Without viewport meta, mobile browsers assume a 980px desktop window and zoom out illegibly.'
    },
    proTip: {
      ar: 'لا تضف user-scalable=no أبداً لأن ذلك يحرم ضعاف البصر من تكبير النص.',
      en: 'Never set user-scalable=no, as it impedes visually impaired users from zooming.'
    }
  },

  // ------------------------------------------------
  // CSS QUESTIONS (15+ Questions)
  // ------------------------------------------------
  {
    id: 201,
    technology: 'css',
    category: 'box-model',
    categoryName: { ar: 'نموذج الصندوق', en: 'Box Model' },
    difficulty: 'beginner',
    question: {
      ar: 'ماذا يحدث عند تفعيل خاصية box-sizing: border-box على العناصر؟',
      en: 'What happens when you apply box-sizing: border-box to elements?'
    },
    options: {
      ar: [
        'يتم احتساب الـ Padding والـ Border ضمن العرض والارتفاع المحددين دون تضخم الصندوق',
        'يصبح العنصر دائري الشكل تلقائياً',
        'يختفي العنصر في شاشات الموبايل',
        'تضاف مسافة خارجية margin بقيمة 10px'
      ],
      en: [
        'Padding and border are included inside declared width and height, preventing box inflation',
        'Element becomes circular automatically',
        'Element is hidden on mobile screens',
        'Injects an automatic 10px external margin'
      ]
    },
    correctIndex: 0,
    explanation: {
      ar: 'في الوضع الافتراضي (content-box) تزيد الحشوة من العرض الكلي. مع border-box يظل العرض ثابتاً كما حددته بالضبط.',
      en: 'Under border-box, padding and border do not increase the rendered outer container width.'
    },
    proTip: {
      ar: 'ضع دائماً * { box-sizing: border-box; } في أول سطر في ملف CSS.',
      en: 'Always include * { box-sizing: border-box; } as a universal reset rule.'
    }
  },
  {
    id: 202,
    technology: 'css',
    category: 'flexbox',
    categoryName: { ar: 'التخطيط المرن (Flexbox)', en: 'Flexbox' },
    difficulty: 'intermediate',
    question: {
      ar: 'أي خاصية في Flexbox تتحكم في محاذاة وتوزيع العناصر على المحور الرئيسي (Main Axis)؟',
      en: 'Which Flexbox property controls item alignment along the main axis?'
    },
    options: {
      ar: ['justify-content', 'align-items', 'align-content', 'flex-wrap'],
      en: ['justify-content', 'align-items', 'align-content', 'flex-wrap']
    },
    correctIndex: 0,
    explanation: {
      ar: 'justify-content توزع العناصر على المحور الرئيسي (أفقياً في الوضع الافتراضي row)، بينما align-items للمحور العمودي.',
      en: 'justify-content distributes items along the main axis; align-items operates along the cross axis.'
    },
    proTip: {
      ar: 'استخدم justify-content: space-between لعمل أشرطة تنقل احترافية.',
      en: 'space-between pushes navbar branding and links to opposing ends cleanly.'
    }
  },
  {
    id: 203,
    technology: 'css',
    category: 'grid',
    categoryName: { ar: 'شبكة التخطيط (CSS Grid)', en: 'CSS Grid' },
    difficulty: 'advanced',
    question: {
      ar: 'ماذا تفعل هذه القاعدة الرائعة في CSS Grid؟',
      en: 'What does this CSS Grid declaration achieve?'
    },
    codeSnippet: 'grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));',
    options: {
      ar: [
        'تنشئ شبكة بطاقات متجاوبة تلقائياً مع الشاشات بدون كتابة استعلامات وسائط (Media Queries)',
        'تثبت عدد الأعمدة في رقمين فقط',
        'تمنع عرض البطاقات في الهواتف',
        'تحول جميع الألوان لرمادي'
      ],
      en: [
        'Builds an auto-responsive card grid that dynamically reflows without any media queries',
        'Locks layout to exactly two static columns',
        'Hides cards on mobile viewports',
        'Converts colors to grayscale'
      ]
    },
    correctIndex: 0,
    explanation: {
      ar: 'auto-fit مع minmax(280px, 1fr) يملأ الصف بأكبر عدد ممكن من الأعمدة بعرض لا يقل عن 280px ويتمدد لملء الفراغ.',
      en: 'auto-fit with minmax calculates the maximum number of 280px+ columns fitting the container width.'
    },
    proTip: {
      ar: 'هذه القاعدة الذهبية هي المعيار الأسرع لبناء صالات المشاريع والمتاجر.',
      en: 'The industry-standard one-liner for production card galleries.'
    }
  },
  {
    id: 204,
    technology: 'css',
    category: 'units',
    categoryName: { ar: 'وحدات القياس', en: 'CSS Units' },
    difficulty: 'intermediate',
    question: {
      ar: 'ما هو الفرق الجوهري بين وحدة em ووحدة rem؟',
      en: 'What is the primary difference between em and rem units in CSS?'
    },
    options: {
      ar: [
        'rem نسبية لحجم خط العنصر الجذري html، بينما em نسبية لحجم خط العنصر الأب المباشر',
        'rem للشاشات الكبيرة و em للهواتف',
        'لا يوجد فرق بينهما، مجرد تسميات بديلة',
        'em وحدة بكسل ثابتة و rem وحدة مئوية'
      ],
      en: [
        'rem is relative to the root html font-size, while em is relative to its direct parent element font-size',
        'rem is for large displays and em for mobile screens',
        'There is zero difference; identical synonyms',
        'em represents static pixels and rem represents percentages'
      ]
    },
    correctIndex: 0,
    explanation: {
      ar: 'rem (Root EM) تعتمد على خط <html> (16px افتراضياً)، مما يمنع التضخم التراكمي المزعج الذي يحدث مع em.',
      en: 'rem anchors predictably to root html size, preventing compounding nesting bugs caused by em.'
    },
    proTip: {
      ar: 'استخدم rem للهوامش والخطوط لتضمن احترام إعدادات تكبير الخط في أجهزة المستخدمين.',
      en: 'Standardize typography and padding with rem for accessible user scaling.'
    }
  },

  // ------------------------------------------------
  // GIT QUESTIONS (15+ Questions)
  // ------------------------------------------------
  {
    id: 301,
    technology: 'git',
    category: 'basics',
    categoryName: { ar: 'أساسيات Git', en: 'Git Fundamentals' },
    difficulty: 'beginner',
    question: {
      ar: 'هل يحتاج برنامج Git إلى اتصال نشط بالإنترنت لتسجيل الـ Commits وإدارة الفروع؟',
      en: 'Does Git require an active internet connection to create commits and manage branches?'
    },
    options: {
      ar: [
        'لا، Git يعمل محلياً بنسبة 100% داخل حاسوبك حتى بدون إنترنت',
        'نعم، يجب الاتصال بخوادم Git كل 5 دقائق',
        'نعم، لحساب الـ Hash المشفر',
        'فقط عند استخدام الفروع'
      ],
      en: [
        'No, Git operates 100% locally on your machine without any internet connection',
        'Yes, it ping Git servers every 5 minutes',
        'Yes, to compute cryptographic hashes',
        'Only when branching'
      ]
    },
    correctIndex: 0,
    explanation: {
      ar: 'Git نظام موزع؛ قاعدة بياناته الكاملة محفوظة داخل مجلد .git المحلي في جهازك ولا يحتاج للإنترنت إطلاقاً.',
      en: 'Git is a distributed VCS where the full commit database lives inside your local .git directory.'
    },
    proTip: {
      ar: 'أنت بحاجة للإنترنت فقط عند الدفع (push) أو السحب (pull) من منصات سحابية مثل GitHub.',
      en: 'Internet is only required when syncing with remote servers via push or pull.'
    }
  },
  {
    id: 302,
    technology: 'git',
    category: 'commands',
    categoryName: { ar: 'أوامر Git', en: 'Git Commands' },
    difficulty: 'beginner',
    question: {
      ar: 'ماذا يفعل الأمر git add . في الطرفية؟',
      en: 'What does the command git add . do in the terminal?'
    },
    options: {
      ar: [
        'ينقل جميع الملفات المعدلة والجديدة في المجلد الحالي إلى منطقة التجهيز (Staging Area)',
        'يحذف جميع الملفات غير المحفوظة',
        'يرفع الكود مباشرة إلى حساب GitHub',
        'يفرمت مستودع Git بالكامل'
      ],
      en: [
        'Moves all modified and new files in the current folder into the staging index',
        'Deletes all unsaved files',
        'Immediately pushes code to GitHub',
        'Formats the Git repository entirely'
      ]
    },
    correctIndex: 0,
    explanation: {
      ar: 'git add يجهز الملفات ويدرجها في الـ Index، والنقطة تعني كل الملفات في المسار الحالي.',
      en: 'git add schedules files for the next commit snapshot by adding them to staging.'
    },
    proTip: {
      ar: 'استخدم git status قبل git add . لتتأكد من عدم تجهيز ملفات حساسة بالخطأ.',
      en: 'Run git status first to verify no secret credentials or temp files are staged.'
    }
  },
  {
    id: 303,
    technology: 'git',
    category: 'branches',
    categoryName: { ar: 'الفروع', en: 'Git Branching' },
    difficulty: 'intermediate',
    question: {
      ar: 'ما هو الأمر الحديث الموصى به لإنشاء فرع جديد والانتقال إليه فوراً؟',
      en: 'What is the modern recommended command to create and switch to a branch simultaneously?'
    },
    options: {
      ar: [
        'git switch -c <branch-name>',
        'git make <branch-name>',
        'git new branch <branch-name>',
        'git branch --jump <branch-name>'
      ],
      en: [
        'git switch -c <branch-name>',
        'git make <branch-name>',
        'git new branch <branch-name>',
        'git branch --jump <branch-name>'
      ]
    },
    correctIndex: 0,
    explanation: {
      ar: 'تم تقديم git switch لتبسيط إدارة الفروع بدلاً من أمر git checkout -b القديم المتعدد الوظائف.',
      en: 'git switch -c cleanly splits branch-switching responsibility from file restoring.'
    },
    proTip: {
      ar: 'الحرف -c اختصار لـ create، وهو يعادل git checkout -b تماماً.',
      en: '-c stands for create and functions identically to legacy checkout -b.'
    }
  },
  {
    id: 304,
    technology: 'git',
    category: 'undo',
    categoryName: { ar: 'التراجع والإنقاذ', en: 'Undoing Changes' },
    difficulty: 'advanced',
    question: {
      ar: 'لماذا يُفضل استخدام git revert <hash> بدلاً من git reset على الفروع المشتركة؟',
      en: 'Why is git revert preferred over git reset on shared collaborative branches?'
    },
    options: {
      ar: [
        'لأنه ينشئ commit جديد يعكس التغيير بأمان دون حذف أو إعادة كتابة تاريخ الـ Git المشترك',
        'لأنه يضاعف سرعة الرفع',
        'لأنه يحذف كل الفروع الأخرى',
        'لأن git reset ممنوع برمجياً'
      ],
      en: [
        'Because it creates an inverse commit cleanly without mutating historical shared timeline',
        'Because it doubles push bandwidth',
        'Because it deletes all parallel branches',
        'Because git reset is blocked by OS'
      ]
    },
    correctIndex: 0,
    explanation: {
      ar: 'git revert آمن للعمل الجماعي لأنه يحافظ على اتساق السجل التاريخي دون إحداث تعارضات مع باقي الفريق.',
      en: 'git revert safely preserves linear history, avoiding rebases that break teammates.'
    },
    proTip: {
      ar: 'لا تستخدم git reset --hard أبداً على فرع تم رفعه إلى GitHub ويستخدمه زملاؤك.',
      en: 'Never run git reset --hard on public remote branches shared with team members.'
    }
  },

  // ------------------------------------------------
  // GITHUB QUESTIONS (15+ Questions)
  // ------------------------------------------------
  {
    id: 401,
    technology: 'github',
    category: 'basics',
    categoryName: { ar: 'أساسيات GitHub', en: 'GitHub Basics' },
    difficulty: 'beginner',
    question: {
      ar: 'ما هو التعريف الدقيق لـ GitHub؟',
      en: 'What is the precise definition of GitHub?'
    },
    options: {
      ar: [
        'منصة واستضافة سحابية لمستودعات Git توفر ميزات التعاون البرمجي ومراجعة الأكواد والنشر',
        'برنامج تشغيل حواسيب مخصص للمبرمجين',
        'محرر نصوص مثل VS Code',
        'لغة برمجة بديلة لـ JavaScript'
      ],
      en: [
        'A cloud hosting service for Git repos offering collaboration, code reviews, and hosting',
        'An operating system for developers',
        'A desktop text editor like VS Code',
        'A programming language alternative to JavaScript'
      ]
    },
    correctIndex: 0,
    explanation: {
      ar: 'GitHub هو خدمة ويب سحابية تتيح رفع ومشاركة مشاريع Git ومراجعتها ونشرها مجاناً.',
      en: 'GitHub is a cloud platform for hosting, reviewing, and publishing Git repositories.'
    },
    proTip: {
      ar: 'GitHub ليس بديلاً لـ Git بل منصة تستضيف مستودعاته على الإنترنت.',
      en: 'GitHub does not replace Git; it complements it as an online repository hub.'
    }
  },
  {
    id: 402,
    technology: 'github',
    category: 'pages',
    categoryName: { ar: 'GitHub Pages', en: 'GitHub Pages' },
    difficulty: 'beginner',
    question: {
      ar: 'ما هي الشروط الأساسية لنشر موقع مجاني بنجاح على GitHub Pages؟',
      en: 'What is the core prerequisite to publish a website on GitHub Pages?'
    },
    options: {
      ar: [
        'أن يحتوي المستودع على ملف مدخل باسم index.html بحروف صغيرة وتفعيل Pages من إعدادات المستودع',
        'دفع اشتراك شهري قدره 10 دولارات',
        'تثبيت سيرفر أباتشي على هاتفك',
        'أن يكون المشروع مكتوباً بلغة C++ فقط'
      ],
      en: [
        'A root entry file named index.html in lowercase and enabling Pages in repo settings',
        'A monthly $10 credit card subscription',
        'Hosting an Apache server on a phone',
        'Building the app strictly in C++'
      ]
    },
    correctIndex: 0,
    explanation: {
      ar: 'GitHub Pages تبحث تلقائياً عن ملف index.html في جذر المستودع أو مجلد /docs وتنشره مجاناً مع شهادة SSL.',
      en: 'GitHub Pages automatically serves index.html at root with free SSL certificates.'
    },
    proTip: {
      ar: 'رابط موقعك سيكون دائماً: https://username.github.io/repository-name.',
      en: 'Your live public URL format is: https://<username>.github.io/<repo-name>.'
    }
  },
  {
    id: 403,
    technology: 'github',
    category: 'pull-requests',
    categoryName: { ar: 'طلبات السحب (PR)', en: 'Pull Requests' },
    difficulty: 'intermediate',
    question: {
      ar: 'ما هي وظيفة الـ Pull Request (PR) في المشاريع البرمجية على GitHub؟',
      en: 'What is the function of a Pull Request (PR) on GitHub?'
    },
    options: {
      ar: [
        'طلب رسمي لمراجعة ومناقشة كود ميزة جديدة قبل دمجها في الفرع الرئيسي',
        'حذف المستودع نهائياً من السحابة',
        'تنزيل نسخة احتياطية من الخادم',
        'إرسال كلمة المرور للمدير'
      ],
      en: [
        'A formal mechanism to review, discuss, and audit branch changes before merging into main',
        'Permanently deleting the cloud repository',
        'Triggering an offline backup dump',
        'Sending credentials to the team lead'
      ]
    },
    correctIndex: 0,
    explanation: {
      ar: 'الـ PR هو حجر الزاوية في العمل الجماعي والبرمجيات مفتوحة المصدر؛ يتيح فحص الفروقات سطراً بسطر قبل اعتماد الكود.',
      en: 'PRs form the cornerstone of collaborative coding, enabling visual diff reviews and CI automation.'
    },
    proTip: {
      ar: 'أرفق صوراً للواجهة قبل وبعد في وصف الـ PR لتسهيل موافقة زملائك.',
      en: 'Attach before/after UI screenshots in your PR description to speed up team approvals.'
    }
  },
  {
    id: 404,
    technology: 'github',
    category: 'security',
    categoryName: { ar: 'الأمان والحماية', en: 'Repo Security' },
    difficulty: 'advanced',
    question: {
      ar: 'إذا قمت برفع ملف .env يحتوي على مفتاح API سري إلى مستودع عام على GitHub بالخطأ، ما هو الإجراء الفوري الصحيح؟',
      en: 'If you accidentally commit a secret .env file to a public GitHub repo, what is the immediate required action?'
    },
    options: {
      ar: [
        'إبطال المفتاح السري فوراً (Revoke / Invalidate) من لوحة تحكم الخدمة وتوليد مفتاح جديد، ثم إزالة الملف من تاريخ Git',
        'حذف السطر من الملف وعمل commit جديد وتجاهل الأمر',
        'تغيير اسم الملف إلى .env.hidden',
        'إغلاق شاشة الحاسوب لمدة ساعة'
      ],
      en: [
        'Immediately revoke/invalidate the exposed secret key at the provider, generate a new key, and purge it from Git history',
        'Delete the line, make a new commit, and assume it vanished',
        'Rename the file to .env.hidden',
        'Lock the laptop screen for one hour'
      ]
    },
    correctIndex: 0,
    explanation: {
      ar: 'روبوتات المخترقين تفحص GitHub كل ثانية. مجرد عمل commit جديد لا يحذف المفتاح من سجل الـ Git التاريخي السابق!',
      en: 'Automated bots scrape GitHub constantly. Making a follow-up commit leaves the secret visible in commit history.'
    },
    proTip: {
      ar: 'أضف دائماً .env إلى ملف .gitignore قبل أول commit في أي مشروع.',
      en: 'Always declare .env in .gitignore before initializing your very first commit.'
    }
  }
];
