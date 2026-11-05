export interface QuizQuestion {
  id: number;
  category: "html-css" | "git-github" | "portfolio" | "integration";
  categoryName: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  tip: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: "html-css",
    categoryName: "HTML & CSS",
    question: "أي من الوسوم التالية يعتبر وسماً دلالياً (Semantic Tag) مناسباً للترويسة العلوية للموقع؟",
    options: [
      "<div class=\"header\">",
      "<header>",
      "<top>",
      "<heading>"
    ],
    correctIndex: 1,
    explanation: "وسم <header> هو الوسم الدلالي القياسي في HTML5 المخصص لتمثيل ترويسة الصفحة أو القسم. بينما <div class=\"header\"> يفتقر للدلالة البنائية، ووسوم <top> و <heading> غير موجودة في معايير HTML.",
    tip: "الوسوم الدلالية تحسن ترتيب موقعك في محركات البحث (SEO) وتساعد قارئات الشاشة (Screen Readers)."
  },
  {
    id: 2,
    category: "html-css",
    categoryName: "HTML & CSS",
    question: "ماذا تفعل خاصية 'box-sizing: border-box' في CSS؟",
    options: [
      "تضيف إطاراً أحمر سميكاً حول كل العناصر في الصفحة",
      "تضمن أن العرض والارتفاع المحددين يشملان الـ Padding والـ Border دون تمدد غير مرغوب",
      "تجعل العنصر مخفياً في الأجهزة المحمولة",
      "تحول العنصر من block إلى inline تلقائياً"
    ],
    correctIndex: 1,
    explanation: "بشكل افتراضي، إضافة padding أو border يزيد من العرض الكلي للعنصر (content-box). لكن تفعيل border-box يجعل الحشوة والإطار محسوبين ضمن العرض المحدد، مما يمنع انكسار التخطيط (Layout Breakdown).",
    tip: "يُنصح دائماً بوضع `* { box-sizing: border-box; }` في بداية أي ملف CSS."
  },
  {
    id: 3,
    category: "html-css",
    categoryName: "HTML & CSS",
    question: "متى يُفضل استخدام CSS Grid بدلاً من Flexbox؟",
    options: [
      "عندما نريد تغيير لون الخط فقط",
      "عند بناء تخطيط ثنائي الأبعاد يحتوي صفوفاً وأعمدة معاً (2D Layout مثل شبكة مشاريع)",
      "Flexbox أفضل دائماً ولا داعي لاستعمال Grid أبداً",
      "عندما نريد تنسيق الروابط التشعبية فقط"
    ],
    correctIndex: 1,
    explanation: "Flexbox صُمم لتوزيع العناصر في بعد واحد (إما في صف Row أو عمود Column)، بينما CSS Grid صُمم خصيصاً للتخطيطات ثنائية الأبعاد (صفوف وأعمدة متقاطعة معاً).",
    tip: "استخدم Flexbox لشريط التنقل (Navbar) والأزرار، واستخدم Grid لشبكة بطاقات المشاريع والصور."
  },
  {
    id: 4,
    category: "git-github",
    categoryName: "Git & GitHub",
    question: "ما هو الفرق الأساسي والجوهري بين Git و GitHub؟",
    options: [
      "لا يوجد أي فرق، هما نفس الأداة من نفس الشركة",
      "Git أداة محلية في جهازك للتحكم في الإصدارات، بينما GitHub منصة سحابية لاستضافة ومشاركة مستودعات Git",
      "Git مخصص للـ HTML فقط، بينما GitHub مخصص للـ CSS فقط",
      "GitHub برنامج يثبت على الحاسوب بدون إنترنت، و Git موقع إنترنت"
    ],
    correctIndex: 1,
    explanation: "Git هو برنامج محلي يعمل على حاسوبك حتى بدون اتصال بالإنترنت لتسجيل التعديلات وتاريخ الكود. أما GitHub فهو موقع سحابي (Cloud Platform) يمكنك رفع مستودعات Git عليه لمشاركتها مع العالم واستضافتها.",
    tip: "يمكنك استخدام Git بشكل كامل بمفردك دون أن تفتح حساباً على GitHub، لكن GitHub يحتاج إلى Git."
  },
  {
    id: 5,
    category: "git-github",
    categoryName: "Git & GitHub",
    question: "ما الذي يقوم به الأمر 'git add .' في الطرفية (Terminal)؟",
    options: [
      "يقوم بمسح جميع ملفات المشروع نهائياً",
      "ينقل جميع التعديلات والملفات الجديدة إلى منطقة التجهيز (Staging Area)",
      "يرفع الكود مباشرة إلى حسابك على GitHub",
      "يقوم بتشغيل خادم محلي للموقع"
    ],
    correctIndex: 1,
    explanation: "الأمر git add يجهز الملفات المعدلة وينقلها إلى منطقة الـ Staging تمهيداً لحفظها بالـ commit. النقطة (.) تعني كل الملفات والمجلدات في المسار الحالي.",
    tip: "استخدم `git status` قبل وبعد `git add` لتتأكد من الملفات التي تم تجهيزها باللون الأخضر."
  },
  {
    id: 6,
    category: "git-github",
    categoryName: "Git & GitHub",
    question: "أي أمر نستخدمه لتسجيل التعديلات بشكل دائم في تاريخ Git مع رسالة توضيحية؟",
    options: [
      "git save -all",
      "git commit -m \"رسالة التعديل\"",
      "git push origin master",
      "git upload --message"
    ],
    correctIndex: 1,
    explanation: "الأمر git commit مع الخيار -m يوثق لقطة (Snapshot) دائمة للملفات الموجودة في الـ Staging Area مع رسالة تصف التغيير الذي قمت به.",
    tip: "اكتب رسائل Commit واضحة بصيغة الفعل الحاضر مثل: `feat: add responsive navbar` أو `fix: resolve mobile layout issue`."
  },
  {
    id: 7,
    category: "git-github",
    categoryName: "Git & GitHub",
    question: "كيف يمكنك نشر موقعك الثابت (HTML/CSS) مجاناً وبسهولة على الإنترنت عبر GitHub؟",
    options: [
      "عبر تفعيل خدمة GitHub Pages من إعدادات المستودع (Settings -> Pages)",
      "بإرسال الكود في بريد إلكتروني للدعم الفني لمايكروسوفت",
      "عن طريق كتابة الأمر git publish في موجه الأوامر",
      "لا يمكن نشر المواقع مجاناً على GitHub على الإطلاق"
    ],
    correctIndex: 0,
    explanation: "يوفر GitHub ميزة مجانية قوية تسمى GitHub Pages، تتيح لك استضافة مواقع HTML و CSS و JavaScript الثابتة مباشرة من فرعك الرئيسي على نطاق عام مثل username.github.io/repo.",
    tip: "تأكد دائماً أن الملف الرئيسي لموقعك اسمه بالضبط `index.html` بحروف صغيرة ليقرأه GitHub Pages مباشرة."
  },
  {
    id: 8,
    category: "portfolio",
    categoryName: "Portfolio",
    question: "ما هو العنصر الأكثر أهمية الذي يبحث عنه مسؤول التوظيف عند فحص مشروع في بورتفوليو المطور؟",
    options: [
      "أن يحتوي المشروع على خلفية موسيقية متحركة",
      "رابط المعاينة الحية (Live Demo) ورابط الكود المصدري النظيف على GitHub (Source Code)",
      "أن يكون هناك شريط تقدم يكتب: HTML 99.5%",
      "عدد الخطوط والألوان المستخدمة في الصفحة الرئيسية"
    ],
    correctIndex: 1,
    explanation: "مسؤولو التوظيف والمهندسون يقيمون المطور من خلال رؤية المشروع يعمل حياً للتأكد من تجربة المستخدم وسرعة الاستجابة، ثم فحص الكود على GitHub للتأكد من جودة ونظافة الكود واستخدام الوسوم الصحيحة.",
    tip: "كل مشروع في معرضك يجب أن يكون له زرين واضحين: 'Live Demo' و 'GitHub Repo'."
  },
  {
    id: 9,
    category: "portfolio",
    categoryName: "Portfolio",
    question: "لماذا يُنصح بتجنب أشرطة النسبة المئوية للمهارات (مثل: CSS 90% أو HTML 95%) في البورتفوليو؟",
    options: [
      "لأنها صعبة التصميم بـ CSS",
      "لأنها مقاييس ذاتية وغير علمية وتبدو غير احترافية في نظر المهندسين التقنيين",
      "لأن المتصفحات لا تدعم عرض الأرقام والنسب المئوية",
      "لأنها تزيد من وقت تحميل الموقع بشكل كبير"
    ],
    correctIndex: 1,
    explanation: "ماذا يعني بالضبط 90% في CSS؟ هل يعني أنك تعرف 90% من مواصفات W3C؟ الأرقام هنا تكون انطباعية وتظهر قلة النضج المهني. الأفضل هو تصنيف المهارات في مجموعات وعرض مشاريع تثبتها.",
    tip: "استبدل نسب المئوية بقائمة مهارات واضحة وعينات عملية من مشاريعك التي استعملت فيها تلك المهارات."
  },
  {
    id: 10,
    category: "portfolio",
    categoryName: "Portfolio",
    question: "كم عدداً من المشاريع يُنصح بعرضها في بورتفوليو مطور مبتدئ يتقدم لأول وظيفة؟",
    options: [
      "مشروع واحد فقط حتى لو كان غير مكتمل",
      "من 3 إلى 5 مشاريع متقنة ومكتملة تماماً وذات جودة عالية ومتجاوبة مع الهاتف",
      "50 مشروعاً بسيطاً تم نسخها حرفياً من اليوتيوب دون أي فهم",
      "لا داعي لعرض أي مشاريع، تكفي قائمة الشهادات النظرية"
    ],
    correctIndex: 1,
    explanation: "الجودة تتفوق دائماً على الكمية. ثلاثة مشاريع متقنة ومبنية بجهدك الذاتي مع كود نظيف وتصميم متجاوب تعطي انطباعاً أقوى بكثير من عشرات المشاريع المتطابقة المنسوخة.",
    tip: "اجعل أحد المشاريع الثلاثة تطبيقاً لحل مشكلة واقعية تهمك أو تهم مجتمعك المحلي."
  },
  {
    id: 11,
    category: "integration",
    categoryName: "الترابط ودورة العمل",
    question: "ما هو الترتيب الصحيح لدورة حياة مشروع بورتفوليو من البداية حتى الحصول على رابط حي؟",
    options: [
      "GitHub Pages -> git push -> HTML/CSS -> git init",
      "كتابة HTML/CSS -> تهيئة Git محلياً والـ Commit -> إنشاء مستودع على GitHub والـ Push -> تفعيل GitHub Pages",
      "شراء دومين مدفوع -> مسح ملفات الـ CSS -> عمل commit",
      "تشغيل GitHub في الهاتف -> كتابة الكود داخل الـ Terminal -> إغلاق الحاسوب"
    ],
    correctIndex: 1,
    explanation: "التسلسل المهني يبدأ ببناء الواجهة بالكود (HTML/CSS)، ثم تتبع النسخ محلياً بـ Git، ثم رفعها للسحابة (GitHub)، وأخيراً نشرها برابط مجاني عبر GitHub Pages لتقديمها للشركات.",
    tip: "هذه الدورة هي نفسها التي تطبقها كبرى الشركات العالمية في إدارة مشاريع البرمجيات."
  },
  {
    id: 12,
    category: "integration",
    categoryName: "الترابط ودورة العمل",
    question: "إذا قمت بتعديل كود الـ CSS في حاسوبك، ما هي الخطوات لتحديث الموقع المنشور على GitHub Pages؟",
    options: [
      "يجب حذف حساب GitHub وإنشاء حساب جديد تماماً",
      "تنفيذ: git add . ثم git commit -m \"...\" ثم git push فقط، وسيقوم GitHub Pages بالتحديث تلقائياً",
      "إعادة تثبيت نظام الويندوز أو الماك",
      "إرسال الملف بالبلوتوث إلى خوادم GitHub"
    ],
    correctIndex: 1,
    explanation: "بمجرد عمل commit للتعديلات ورفعها بأمر git push إلى فرعك الرئيسي المرتبط بـ GitHub Pages، يقوم GitHub أوتوماتيكياً بإعادة بناء الموقع وتحديث الرابط خلال لحظات.",
    tip: "يمكنك التحقق من حالة التحديث عبر تبويب 'Actions' في مستودعك على GitHub."
  },
  {
    id: 13,
    category: "html-css",
    categoryName: "HTML & CSS",
    question: "أي سطر ميتا (Meta Tag) في HTML ضروري لضمان تجاوب الموقع وعرضه بشكل صحيح في شاشات الهواتف الذكية؟",
    options: [
      "<meta name=\"phone\" content=\"yes\">",
      "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
      "<meta responsive=\"true\">",
      "<meta screen=\"mobile-only\">"
    ],
    correctIndex: 1,
    explanation: "وسم viewport يخبر المتصفح في الهاتف الذكي أن يضبط عرض الصفحة ليتطابق مع عرض شاشة الجهاز الفعلي بدلاً من تصغير صفحة الديسكتوب العريضة.",
    tip: "بدون هذا السطر، لن تعمل استعلامات الوسائط (Media Queries) بشكل سليم في الهواتف."
  },
  {
    id: 14,
    category: "git-github",
    categoryName: "Git & GitHub",
    question: "ما هي الفائدة الأساسية من إنشاء 'فرع' (Branch) جديد في Git أثناء تطوير ميزة جديدة؟",
    options: [
      "لتقليل حجم مساحة القرص الصلب في الحاسوب",
      "لتجربة وتطوير الميزة في بيئة معزولة دون المخاطرة بتعطيل أو تخريب الكود الرئيسي المستقر (main)",
      "الفروع تجعل سرعة الإنترنت في جهازك أسرع أثناء الرفع",
      "Git يفرض حظر الحساب إذا لم تنشئ فرعاً كل 10 دقائق"
    ],
    correctIndex: 1,
    explanation: "الفروع (Branches) توفر عزلاً كاملاً للتجارب والتطوير الموازي. إذا نجحت الميزة تقوم بدمجها (Merge)، وإذا فشلت يمكنك حذف الفرع دون التأثير على النسخة العاملة من الموقع.",
    tip: "استخدم أمر `git switch -c feature-name` لإنشاء فرع جديد والانتقال إليه مباشرة."
  },
  {
    id: 15,
    category: "portfolio",
    categoryName: "Portfolio",
    question: "ماذا يقصد بـ 'Call to Action' (CTA) في قسم الترحيب (Hero Section) بالبورتفوليو؟",
    options: [
      "نص طويل يتحدث عن تاريخ نشأة الإنترنت",
      "زر أو رابط بارز يوجه الزائر للخطوة الأهم التي تريده أن يتخذها (مثل: 'شاهد أعمالي' أو 'تواصل معي')",
      "رسالة خطأ تظهر عندما يفشل تحميل الصفحة",
      "صورة متحركة للوغو في أسفل الصفحة"
    ],
    correctIndex: 1,
    explanation: "الـ CTA هو العنصر التفاعلي الأساسي المصمم لجذب انتباه الزائر وتوجيهه مباشرة إلى الهدف الرئيسي للصفحة (رؤية المشاريع أو إرسال بريد توظيف).",
    tip: "اجعل زر الـ CTA ذا تباين لوني قوي (Primary color) وحجم مريح للنقر بالإصبع على الشاشات."
  },
  {
    id: 16,
    category: "integration",
    categoryName: "الترابط ودورة العمل",
    question: "ما هي وظيفة ملف '.gitignore' في مشاريع الويب و Git؟",
    options: [
      "إلغاء تثبيت برنامج Git من الجهاز",
      "تحديد الملفات والمجلدات التي لا نريد من Git تتبعها أو رفعها إلى GitHub (مثل node_modules والملفات السرية)",
      "تسريع تحميل الموقع على أجهزة الزوار",
      "تشفير ملفات الـ HTML بكلمة مرور"
    ],
    correctIndex: 1,
    explanation: "ملف .gitignore يحتوي على أنماط أسماء الملفات المؤقتة، المفاتيح السرية (.env)، أو المجلدات الثقيلة (مثل node_modules) لمنع إرسالها إلى المستودع السحابي وحمايتها.",
    tip: "لا ترفع أبداً مجلد node_modules أو ملفات .env التي تحتوي مفاتيح سرية إلى مستودع عام على GitHub."
  }
];
