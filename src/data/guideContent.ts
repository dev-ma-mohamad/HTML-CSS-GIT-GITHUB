export interface Chapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  content: string;
  keyTakeaways?: string[];
  codeSnippets?: {
    language: string;
    filename?: string;
    description: string;
    code: string;
  }[];
  tableData?: {
    headers: string[];
    rows: string[][];
  };
  tips?: string[];
}

export const GUIDE_METADATA = {
  title: "الدليل الشامل لاحتراف أساسيات الويب",
  englishTitle: "Web Development Master Guide: HTML, CSS, Git, GitHub & Portfolio",
  subtitle: "مرجع تدريبي متكامل ومنظم: المفاهيم، المقارنات، أمثلة الكود العملية، ودليل بناء ونشر البورتفوليو مع بنك أسئلة Quiz",
  author: "مجتمع مطوري الويب العربي والمهندسين المغاربة",
  version: "الإصدار الأكاديمي الشامل 2026",
  lastUpdated: "نوفمبر 2026",
  coverImage: "/src/assets/images/hero_webdev_ecosystem_guide_1793884583115.jpg",
};

export const CHAPTERS: Chapter[] = [
  {
    id: "html-css",
    number: "01",
    title: "HTML و CSS: البنية والمظهر",
    subtitle: "عظام الصفحة وتصميمها العصري",
    summary: "التعريف الدقيق لـ HTML كبنية هيكلية و CSS كطبقة تنسيق بصري، مع أحدث معايير HTML5 و CSS3 الحديثة.",
    sections: [
      {
        id: "html-core",
        title: "1. ما هو HTML؟ (الهيكل والعظام)",
        content: `HTML اختصار لـ HyperText Markup Language (لغة توصيف النص الفائق). هي ليست لغة برمجة، بل لغة توصيف (Markup) تحدد هيكل ومحتوى صفحات الويب عبر عناصر ووسوم (Tags).

بالدارجة المغربية:
HTML هي "الساس والعظام" (Skeleton) ديال أي سيت ويب؛ بحال الدار منين كتكون باقا سيمة وطوب بلا صباغة ولا زليج. هي اللي كتحط العناوين، الفقرات، التصاور، الأزرار، والروابط.

أهم وسوم HTML5 الدلالية (Semantic HTML):
• <header>: الترويسة العلوية للموقع أو للقسم.
• <nav>: روابط التنقل والقائمة الرئيسية.
• <main>: المحتوى الرئيسي الفريد للصفحة.
• <section>: قسم موضوعي مستقل ومترابط.
• <article>: محتوى مستقل بذاته (مثل مقال أو بطاقة مشروع).
• <aside>: شريط جانبي أو معلومات ثانوية.
• <footer>: تذييل الصفحة (حقوق، روابط سريعة، وسائل تواصل).`,
        keyTakeaways: [
          "HTML يحدد المعنى والهيكل الدلالي للمحتوى وليس مظهره",
          "استخدام الوسوم الدلالية يحسن الـ SEO ومحركات البحث ويسهل قراءة الشاشة لذوي الاحتياجات الخاصة (Accessibility)",
          "كل صفحة ويب تبدأ بوسم <!DOCTYPE html> متبوعاً بـ <html> و <head> و <body>"
        ],
        codeSnippets: [
          {
            language: "html",
            filename: "index.html",
            description: "الهيكل الأساسي لصفحة HTML5 دلالية ونظيفة",
            code: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>معرض أعمالي - Portfolio</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <!-- الترويسة -->
    <header class="site-header">
      <div class="logo">مطور ويب</div>
      <nav>
        <a href="#about">عني</a>
        <a href="#projects">المشاريع</a>
        <a href="#contact">اتصل بي</a>
      </nav>
    </header>

    <!-- المحتوى الرئيسي -->
    <main>
      <section id="hero" class="hero">
        <h1>مرحباً، أنا مطور واجهات أمامية</h1>
        <p>أقوم ببناء مواقع وتطبيقات ويب سريعة ومتجاوبة.</p>
        <a href="#projects" class="btn-primary">شاهد أعمالي</a>
      </section>
    </main>

    <!-- التذييل -->
    <footer>
      <p>© 2026 جميع الحقوق محفوظة.</p>
    </footer>
  </body>
</html>`
          }
        ]
      },
      {
        id: "css-core",
        title: "2. ما هو CSS؟ (الصباغة والديكور والتجاوب)",
        content: `CSS اختصار لـ Cascading Style Sheets (صفحات الطرز المتراصة). هي لغة التنسيق المسؤولة عن المظهر الجمالي للصفحة: الألوان، الخطوط، المسافات، الهوامش، التحريك، وطريقة توزيع العناصر على الشاشات المختلفة (Responsive Design).

بالدارجة المغربية:
CSS هو "الفينيسيون والصباغة والفرش": كيعطي الألوان، كيقاد المسافات (padding / margin)، كيحدد شحال غايكون العرض ديال البطاقات، وكيخلي السيت يجي مقاد فالتيليفون والبيسي بنفس الاحترافية.

المفاهيم الجوهرية في CSS:
1. نموذج الصندوق (Box Model): كل عنصر يتكون من المحتوى (Content) ثم الحشوة الداخلية (Padding) ثم الإطار (Border) ثم الهامش الخارجي (Margin).
2. أنظمة التخطيط الحديثة:
   • Flexbox: لتوزيع العناصر ومحاذاتها في بعد واحد (صف أو عمود).
   • CSS Grid: لبناء شبكات معقدة ثنائية الأبعاد (صفوف وأعمدة معاً).
3. استعلامات الوسائط (Media Queries): جعل الموقع متجاوباً ومتوافقاً مع الهواتف الذكية والحواسيب.`,
        keyTakeaways: [
          "خاصية box-sizing: border-box تضمن عدم زيادة حجم العنصر عند إضافة padding أو border",
          "Flexbox ممتاز للقوائم والأشرطة والمحاذاة المباشرة",
          "Grid مثالي لشبكات بطاقات المشاريع والصالات المتجاوبة",
          "المتغيرات (CSS Variables) تسهل صيانة الألوان والخطوط في مشروعك"
        ],
        codeSnippets: [
          {
            language: "css",
            filename: "style.css",
            description: "ملف CSS عصري يستخدم المتغيرات وتصميم البطاقات المتجاوبة",
            code: `:root {
  --primary-color: #0284c7;
  --primary-hover: #0369a1;
  --bg-color: #f8fafc;
  --surface-color: #ffffff;
  --text-main: #0f172a;
  --text-muted: #64748b;
  --border-color: #e2e8f0;
  --radius: 12px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-main);
  line-height: 1.6;
}

/* شبكة المشاريع المتجاوبة بنظام Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 2rem 1rem;
}

.project-card {
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08);
}

.btn-primary {
  display: inline-block;
  background-color: var(--primary-color);
  color: #ffffff;
  padding: 0.6rem 1.25rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.15s ease;
}

.btn-primary:hover {
  background-color: var(--primary-hover);
}`
          }
        ]
      }
    ]
  },
  {
    id: "git-github",
    number: "02",
    title: "Git و GitHub: التحكم في الإصدارات والتعاون",
    subtitle: "آلة الزمن للكود والسحابة المفتوحة للمطورين",
    summary: "فهم الفرق الجذري بين أداة Git المحلية ومنصة GitHub السحابية، مع الأوامر اليومية وسير العمل الاحترافي.",
    sections: [
      {
        id: "git-explained",
        title: "1. ما هو Git؟ (آلة الزمن للكود في جهازك)",
        content: `Git هو نظام تحكم في الإصدارات موزع (Distributed Version Control System). تم إنشاؤه بواسطة لينوس تورفالدس (مؤسس لينكس) عام 2005.

كيف يعمل Git في جهازك؟
Git يشتغل محلياً في حاسوبك، ولا يحتاج إلى إنترنت للعمل. يسجل كل تغيير، حذف، أو إضافة تقوم بها في ملفات مشروعك في شكل "لقطات زمنية" تسمى Commits.

المناطق الثلاث لـ Git (Three Trees):
1. Working Directory (مساحة العمل): الملفات التي تعدلها الآن في محرر الكود (VS Code).
2. Staging Area (منطقة التجهيز / Index): مرحلة اختيار وتجهيز التعديلات التي تريد توثيقها عبر الأمر git add.
3. Git Repository (المستودع المحلي): قاعدة البيانات التي تحتفظ باللقطة الدائمة بعد تنفيذ git commit.`,
        keyTakeaways: [
          "Git يشتغل أوفلاين في حاسوبك 100%",
          "كل Commit يحتوي على معرف فريد (SHA Hash)، كاتب التعديل، التاريخ، ورسالة وصفية",
          "الفروع (Branches) تتيح تجربة ميزات جديدة دون تخريب الكود الرئيسي (main/master)"
        ],
        codeSnippets: [
          {
            language: "bash",
            filename: "Terminal",
            description: "أوامر Git الأساسية اليومية بالتسلسل المنطقي",
            code: `# 1. إعداد هويتك لأول مرة
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 2. تحويل مجلد عادي إلى مستودع Git
git init

# 3. فحص حالة الملفات المعدلة
git status

# 4. إضافة الملفات إلى منطقة التجهيز (Staging)
git add .               # يضيف كل الملفات
# أو إضافة ملف محدد:
git add index.html

# 5. حفظ التعديلات وإعطائها رسالة واضحة
git commit -m "feat: إضافة قسم المشاريع وتنسيقات البطاقات"

# 6. مشاهدة سجل التغييرات التاريخي
git log --oneline -n 5`
          }
        ]
      },
      {
        id: "github-explained",
        title: "2. ما هو GitHub؟ (السحابة، التعاون، ونشر المشاريع)",
        content: `GitHub هو منصة سحابية مملوكة لشركة مايكروسوفت تستضيف مستودعات Git على الإنترنت. إذا كان Git هو محرك السيارة، فإن GitHub هو الطريق السريع وشبكة المواقف العامة.

ماذا يقدم GitHub للمطور؟
1. النسخ الاحتياطي السحابي (Cloud Remote Backup): حماية كودك في حال تلف حاسوبك.
2. التعاون الجماعي (Collaboration): العمل في فرق برمجية عبر Pull Requests ومراجعة الأكواد (Code Reviews).
3. استضافة المواقع المجانية (GitHub Pages): نشر موقعك الثابت (HTML, CSS, JS) مجاناً على رابط عام مثل:
   username.github.io/portfolio
4. السيرة الذاتية الحية للمطور: مساهماتك (Green squares) والمشاريع المفتوحة المصدر تثبت خبرتك العملية لأصحاب العمل والشركات.`,
        keyTakeaways: [
          "GitHub يعتمد على Git، لكن Git لا يحتاج إلى GitHub",
          "مستودع GitHub يسمى Remote Repository ويتم ربطه بأمر git remote add origin",
          "خدمة GitHub Pages تنشر ملفات HTML/CSS مجاناً بنقرة زر وبشهادة SSL أوتوماتيكية"
        ],
        codeSnippets: [
          {
            language: "bash",
            filename: "Terminal",
            description: "طريقة ربط مشروعك المحلي بحسابك على GitHub ورفعه",
            code: `# 1. تسمية الفرع الأساسي main
git branch -M main

# 2. ربط المستودع المحلي بمستودع GitHub الفارغ
git remote add origin https://github.com/username/my-portfolio.git

# 3. رفع الكود لأول مرة مع ضبط التتبع
git push -u origin main

# 4. للمرات القادمة بعد كل commit جديد:
git push`
          }
        ]
      }
    ]
  },
  {
    id: "portfolio-guide",
    number: "03",
    title: "Portfolio: دليلك لبناء معرض أعمال يقنع أصحاب العمل",
    subtitle: "الدليل العملي لإنشاء ونشر بورتفوليو قوي وموثوق",
    summary: "ما هو البورتفوليو، لماذا يعتبر أهم من السيرة الذاتية الورقية، الأقسام الخمسة الضرورية، وكيف تبرز قوتك كمطور.",
    sections: [
      {
        id: "portfolio-essentials",
        title: "1. ما هو الـ Portfolio ولماذا هو سلاحك الأقوى؟",
        content: `الـ Portfolio هو موقع ويب شخصي يعرض هويتك المهنية، مهاراتك التقنية، وأهم المشاريع الحقيقية التي قمت ببنائها.

لماذا يهتم مدراء التوظيف (Tech Recruiters) بالبورتفوليو؟
في عالم البرمجة، الشهادات وحدها لا تكفي. الشركات تريد إجابة عن سؤال واحد: "هل هذا الشخص قادر على كتابة كود نظيف وبناء موقع حقيقي يشتغل؟".
البورتفوليو هو الدليل الملموس والمباشر على قدراتك؛ حيث يرى المسؤول النتيجة المباشرة ويتصفح الكود على GitHub.`,
        keyTakeaways: [
          "المشروع الحقيقي المرفوع أفضل من 10 شهادات نظرية",
          "كل مشروع في البورتفوليو يجب أن يحتوي على رابطين: Live Demo (تجربة حية) و GitHub Repo (الكود المصدري)",
          "السرعة، التجاوب مع الهاتف، والنظافة التصميمية أهم من الحركات والمؤثرات المبالغ فيها"
        ]
      },
      {
        id: "portfolio-sections",
        title: "2. الأقسام الخمسة الذهبية لأي بورتفوليو ناجح",
        content: `لبناء بورتفوليو احترافي يحقق الهدف، ركز على هذه الهيكلية المنظمة:

1. قسم الترحيب (Hero Section):
   • عنوان واضح يحدد من أنت وماذا تفعل (مثال: "مطور واجهات أمامية متخصص في React و CSS المتجاوب").
   • جملة قوية عن القيمة التي تقدمها.
   • زر نداء للعمل (CTA): "شاهد أعمالي" أو "تواصل معي".

2. قسم من أنا (About Me):
   • نبذة شخصية موجزة ومركزة بدون حشو، تبرز شغفك وطريقة حلك للمشاكل.

3. قسم المهارات (Technical Skills):
   • تصنيف المهارات المنطقي (Front-end, Tools, Concepts) بدلاً من وضع أشرطة نسب مئوية وهمية مثل "HTML: 95%".

4. قسم المشاريع المميزة (Featured Projects):
   • 3 إلى 5 مشاريع متقنة ومكتملة.
   • لكل مشروع: صورة واضحة للشاشة، وصف مختصر، التقنيات المستخدمة، رابط المعاينة الحية، ورابط المستودع.

5. قسم التواصل والتذييل (Contact & Footer):
   • بريدك الإلكتروني المباشر، رابط LinkedIn، ورابط GitHub.`,
        keyTakeaways: [
          "تجنب وضع أشرطة تقدم وهمية لمهاراتك (مثال: CSS 90%) لأنها غير منطقية علمياً",
          "ركز على 3 مشاريع قوية ومتقنة بدلاً من 15 مشروعاً بدائياً متشابهاً",
          "تأكد من عمل جميع الروابط والأزرار بدون استثناء"
        ]
      }
    ]
  },
  {
    id: "comparisons-integration",
    number: "04",
    title: "الفروقات الجوهرية ودورة العمل المتكاملة",
    subtitle: "كيف تلتقي هذه الأدوات في مشروع واحد متكامل من الصفر حتى النشر",
    summary: "مقارنات دقيقة ومفصلة تلغي أي لبس بين الأدوات، مع خارطة طريق عملية لسير العمل الحقيقي للمطور.",
    sections: [
      {
        id: "core-differences",
        title: "1. المقارنة الجوهرية والجدول الفاصل",
        content: `كثير من المبتدئين يخلطون بين Git و GitHub، أو يظنون أن HTML و CSS شيئان منفصلان تماماً. هنا التفريق الواضح والدقيق:`,
        tableData: {
          headers: ["العنصر / الأداة", "نوعها وطبيعتها", "مكان التشغيل", "المهمة الأساسية", "هل يمكن العمل بدونها؟"],
          rows: [
            ["HTML", "لغة توصيف (Markup)", "المتصفح (Client)", "بناء هيكل الصفحة الدلالي والعناصر", "لا، هي الأساس الحتمي لكل صفحات الويب"],
            ["CSS", "لغة تنسيق (Stylesheets)", "المتصفح (Client)", "تجميل الصفحة وتحديد التخطيط والتجاوب", "نظرياً نعم، لكن الموقع سيبدو نصاً بدائياً غير جذاب"],
            ["Git", "برنامج تحكم في الإصدارات (CLI)", "جهاز المطور محلياً", "تسجيل التعديلات والنسخ الاحتياطي المحلي والتفريع", "نعم يمكنك البرمجة بدونه، لكنك تخاطر بضياع كودك"],
            ["GitHub", "منصة واستضافة سحابية (Web)", "الخوادم السحابية (Cloud)", "حفظ الكود عن بعد ومشاركته ونشره مجاناً", "نعم توجد بدائل (GitLab, Bitbucket)، لكنه الأكثر شيوعاً عالمياً"],
            ["Portfolio", "موقع نهائي يعرض أعمالك", "يستضاف على GitHub Pages", "إثبات كفاءتك المهنية للعملاء والشركات", "بدونه تصعب فرصة إيجاد عمل تقني موثوق"]
          ]
        }
      },
      {
        id: "workflow-integration",
        title: "2. كيف يشتغلون مع بعض؟ (دورة العمل الحقيقية خطوة بخطوة)",
        content: `إليك السيناريو الواقعي الذي يتبعه كل مطور محترف لبناء ونشر موقعه أو بورتفوليو خاص به:

المرحلة 1: البناء (Building)
تفتح VS Code وتكتب الهيكل بـ HTML (العناوين والبطاقات)، ثم تضيف ملف CSS لتنسيق الألوان وتوزيع العناصر بـ Flexbox و Grid حتى يصبح الموقع جميلاً ومتجاوباً.

المرحلة 2: التوثيق المحلي بـ Git (Version Control)
تفتح الطرفية (Terminal) داخل مجلد المشروع وتنفذ:
1. git init (لبدء المراقبة)
2. git add . (لتحديد التعديلات)
3. git commit -m "feat: إنجاز بورتفوليو متجاوب" (لتوثيق أول نسخة آمنة في التاريخ)

المرحلة 3: المزامنة السحابية على GitHub (Cloud Sync)
تنشئ مستودعاً جديداً على حسابك في GitHub، وتربطه بجهازك عبر:
git remote add origin https://github.com/user/portfolio.git
ثم ترفع الكود بالأمر:
git push -u origin main

المرحلة 4: النشر الحي عبر GitHub Pages (Deployment)
من إعدادات مستودعك على GitHub (Settings -> Pages)، تختار فرع main ومجلد /root، وتضغط Save.
خلال دقيقة واحدة، يصبح معرض أعمالك منشوراً على الإنترنت مجاناً مدى الحياة برابط رسمي تستطيع وضعه في سيرتك الذاتية و LinkedIn!`,
        keyTakeaways: [
          "HTML + CSS = الكود والمنتج الرقمي",
          "Git = أداة التوثيق والحفظ والمتابعة",
          "GitHub = منصة الحفظ السحابي والمستودع العام",
          "GitHub Pages = الخادم المجاني الذي يجعل موقعك متاحاً لكل العالم",
          "Portfolio = النتيجة النهائية المبهرة التي تفتح لك أبواب التوظيف"
        ]
      }
    ]
  },
  {
    id: "practical-code-examples",
    number: "05",
    title: "أمثلة الكود العملية والقابلة للنسخ المباشر",
    subtitle: "قوالب نظيفة وكاملة جاهزة للاستخدام في مشاريعك",
    summary: "كود متكامل لبورتفوليو مصغر، ملفات CSS عصرية، وأوامر الـ Terminal الأكثر استخداماً.",
    sections: [
      {
        id: "portfolio-full-code",
        title: "1. قالب بورتفوليو جاهز ومكتمل (HTML + CSS)",
        content: "هذا كود حقيقي نظيف يمكنك نسخه فوراً في ملفي index.html و style.css لتشغيل موقع بورتفوليو متجاوب وسريع.",
        codeSnippets: [
          {
            language: "html",
            filename: "index.html",
            description: "هيكل البورتفوليو المصغر مع الأقسام الأساسية",
            code: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>بورتفوليو المطور - Portfolio</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- شريط التنقل -->
  <header class="navbar">
    <div class="container nav-container">
      <span class="brand-logo">&lt;DevPortfolio /&gt;</span>
      <nav class="nav-links">
        <a href="#about">عني</a>
        <a href="#skills">المهارات</a>
        <a href="#projects">المشاريع</a>
        <a href="#contact">تواصل</a>
      </nav>
    </div>
  </header>

  <main>
    <!-- قسم الترحيب -->
    <section class="hero-section">
      <div class="container hero-content">
        <h1>أهلاً، أنا مطور ويب واجهات أمامية</h1>
        <p>أحول الأفكار والتصاميم إلى مواقع ويب سريعة، تفاعلية، ومتجاوبة بدقة عالية.</p>
        <div class="hero-actions">
          <a href="#projects" class="btn btn-primary">استكشف أعمالي</a>
          <a href="#contact" class="btn btn-secondary">تواصل معي</a>
        </div>
      </div>
    </section>

    <!-- قسم المشاريع -->
    <section id="projects" class="projects-section">
      <div class="container">
        <h2 class="section-title">المشاريع البارزة</h2>
        <div class="projects-grid">
          
          <article class="project-card">
            <div class="card-body">
              <h3>منصة تجارة إلكترونية مبسطة</h3>
              <p>موقع تسوق إلكتروني سريع مع سلة مشتريات وتصفية متقدمة للمنتجات.</p>
              <div class="tags">
                <span>HTML5</span> · <span>CSS3 Grid</span> · <span>JavaScript</span>
              </div>
              <div class="project-links">
                <a href="https://example.com" target="_blank" class="link-btn">المعاينة الحية</a>
                <a href="https://github.com" target="_blank" class="link-btn code-link">كود GitHub</a>
              </div>
            </div>
          </article>

          <article class="project-card">
            <div class="card-body">
              <h3>تطبيق متابعة الطقس التفاعلي</h3>
              <p>لوحة تحكم مناخية متجاوبة تتصل بـ API خارجي لعرض التوقعات الحية.</p>
              <div class="tags">
                <span>CSS Flexbox</span> · <span>Fetch API</span> · <span>Responsive</span>
              </div>
              <div class="project-links">
                <a href="https://example.com" target="_blank" class="link-btn">المعاينة الحية</a>
                <a href="https://github.com" target="_blank" class="link-btn code-link">كود GitHub</a>
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container footer-content">
      <p>© 2026 تم البناء بواسطة مطور واجهات أمامية · مستضاف على GitHub Pages</p>
    </div>
  </footer>
</body>
</html>`
          },
          {
            language: "css",
            filename: "style.css",
            description: "تنسيقات CSS أنيقة ومتجاوبة مع الهواتف والحواسيب",
            code: `:root {
  --primary: #0284c7;
  --primary-dark: #0369a1;
  --bg: #0f172a;
  --surface: #1e293b;
  --text: #f8fafc;
  --text-muted: #94a3b8;
  --border: #334155;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  background-color: var(--bg);
  color: var(--text);
  line-height: 1.6;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.25rem;
}

/* Navbar */
.navbar {
  border-bottom: 1px solid var(--border);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  background-color: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(8px);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand-logo {
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--primary);
  font-family: monospace;
}

.nav-links a {
  color: var(--text-muted);
  text-decoration: none;
  margin-right: 1.5rem;
  transition: color 0.15s;
}

.nav-links a:hover {
  color: var(--text);
}

/* Hero Section */
.hero-section {
  padding: 5rem 0;
  text-align: center;
}

.hero-content h1 {
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 800;
  margin-bottom: 1rem;
}

.hero-content p {
  color: var(--text-muted);
  font-size: 1.15rem;
  max-width: 600px;
  margin: 0 auto 2rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-primary {
  background-color: var(--primary);
  color: #fff;
}

.btn-primary:hover {
  background-color: var(--primary-dark);
}

.btn-secondary {
  border: 1px solid var(--border);
  color: var(--text);
}

/* Projects Grid */
.projects-section {
  padding: 4rem 0;
}

.section-title {
  font-size: 1.75rem;
  margin-bottom: 2rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.project-card {
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.project-card h3 {
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.project-card p {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

.tags {
  font-size: 0.85rem;
  color: var(--primary);
  margin-bottom: 1.5rem;
}

.project-links {
  margin-top: auto;
  display: flex;
  gap: 1rem;
}

.link-btn {
  font-size: 0.9rem;
  color: #fff;
  text-decoration: none;
  font-weight: 500;
}

.link-btn:hover {
  text-decoration: underline;
}

.code-link {
  color: var(--text-muted);
}

.site-footer {
  border-top: 1px solid var(--border);
  padding: 2rem 0;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.9rem;
}`
          }
        ]
      },
      {
        id: "git-cheatsheet",
        title: "2. ورقة الغش السريعة لأوامر Git (Git Cheat Sheet)",
        content: "جدول مرتب للأوامر الأكثر استعمالاً التي لا يستغني عنها أي مطور ويب.",
        codeSnippets: [
          {
            language: "bash",
            filename: "Git Cheat Sheet",
            description: "قائمة أوامر Git الأكثر استخداماً في المشاريع",
            code: `# التحقق من الإصدار
git --version

# إنشاء مستودع محلي جديد
git init

# استنساخ مستودع من GitHub إلى جهازك
git clone https://github.com/user/repository.git

# معرفة حالة الملفات المعدلة
git status

# إضافة كل التعديلات إلى الـ Staging Area
git add .

# توثيق التعديلات مع رسالة احترافية
git commit -m "feat: description of the change"

# عرض سجل الـ Commits السابق
git log --oneline --graph --decorate

# إنشاء فرع جديد والتحول إليه
git checkout -b feature-navbar
# أو بالطريقة الحديثة:
git switch -c feature-navbar

# دمج فرع في الفرع الحالي
git merge feature-navbar

# ربط المستودع بالسحابة
git remote add origin https://github.com/user/repo.git

# رفع التعديلات إلى GitHub
git push -u origin main

# جلب أحدث التعديلات من GitHub إلى جهازك
git pull origin main`
          }
        ]
      }
    ]
  }
];
