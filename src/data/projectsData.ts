export interface PracticalProject {
  id: string;
  technology: 'html' | 'css' | 'git' | 'github';
  technologyName: { ar: string; en: string };
  title: { ar: string; en: string };
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  description: { ar: string; en: string };
  instructions: { ar: string[]; en: string[] };
  starterCode: {
    html?: string;
    css?: string;
    commands?: string[];
  };
  expectedResult: { ar: string; en: string };
}

export const PRACTICAL_PROJECTS: PracticalProject[] = [
  // 1. HTML PROJECTS
  {
    id: 'proj-html-profile',
    technology: 'html',
    technologyName: { ar: 'HTML5', en: 'HTML5' },
    title: { ar: 'صفحة الملف الشخصي (Personal Profile Page)', en: 'Personal Profile Page' },
    difficulty: 'beginner',
    duration: '25 min',
    description: {
      ar: 'بناء صفحة تعريفية كاملة تضم صورتك، نبذة عنك، قائمة مهاراتك، وروابط حساباتك الاجتماعية.',
      en: 'Construct a complete profile page featuring your avatar, biography, skill list, and social links.'
    },
    instructions: {
      ar: [
        '1. أنشئ هيكل HTML5 كامل مع وسوم meta المناسبة.',
        '2. استخدم الوسوم الدلالية: header للعنوان، main للمحتوى، و footer للحقوق.',
        '3. أضف صورة الملف الشخصي عبر <img> مع نص بديل alt وصفي.',
        '4. أنشئ قائمة غير مرتبة <ul> للمهارات وروابط خارجية آمنة بـ target="_blank".'
      ],
      en: [
        '1. Set up a valid HTML5 boilerplate with charset and viewport meta tags.',
        '2. Employ semantic tags: header for name, main for body, footer for credits.',
        '3. Embed an avatar with descriptive alt text.',
        '4. Render an unordered list <ul> for skills and secure external links with target="_blank".'
      ]
    },
    starterCode: {
      html: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>ملفي الشخصي</title>
</head>
<body>
  <header>
    <h1>مرحباً، أنا مطور ويب</h1>
    <p>شغوف ببناء واجهات مستخدم سريعة وسهلة الاستخدام.</p>
  </header>
  <main>
    <section>
      <h2>مهاراتي البرمجية:</h2>
      <ul>
        <li>HTML5 Semantic Markup</li>
        <li>CSS3 Responsive Design</li>
        <li>Git & GitHub Version Control</li>
      </ul>
    </section>
  </main>
  <footer>
    <p>تواصل معي: <a href="mailto:dev@example.com">dev@example.com</a></p>
  </footer>
</body>
</html>`
    },
    expectedResult: {
      ar: 'صفحة ويب منسقة وهيكلية واضحة تحتوي على معلوماتك ومهاراتك ورابط بريدك.',
      en: 'A cleanly structured profile page showcasing your background, skills, and contact anchor.'
    }
  },
  {
    id: 'proj-html-resume',
    technology: 'html',
    technologyName: { ar: 'HTML5', en: 'HTML5' },
    title: { ar: 'سيرة ذاتية مبسطة (Simple Resume)', en: 'Simple Resume' },
    difficulty: 'beginner',
    duration: '30 min',
    description: {
      ar: 'تصميم سيرة ذاتية هيكلية تحتوي على التعليم، الخبرات، والشهادات باستخدام جداول وقوائم HTML5.',
      en: 'Craft an ATS-friendly structured resume highlighting education, work experience, and certifications.'
    },
    instructions: {
      ar: [
        '1. قسّم الصفحة إلى أقسام دلالية بـ <section>.',
        '2. استخدم جدول <table> لعرض الخبرات وتواريخها والشركات.',
        '3. نسق عناوين الأقسام بترتيب هرمي سليم من h1 إلى h3.'
      ],
      en: [
        '1. Segment the document into semantic <section> blocks.',
        '2. Structure chronological work history inside a clean <table>.',
        '3. Maintain strict hierarchical heading structure from h1 to h3.'
      ]
    },
    starterCode: {
      html: `<article>
  <header>
    <h1>سارة المنصوري</h1>
    <p>Frontend Developer | Casablanca, Morocco</p>
  </header>
  <section>
    <h2>الخبرات المهنية</h2>
    <table border="1">
      <tr><th>الفترة</th><th>الدور</th><th>الشركة</th></tr>
      <tr><td>2024 - الآن</td><td>مطور واجهات أمامية</td><td>Tech Agency</td></tr>
    </table>
  </section>
</article>`
    },
    expectedResult: {
      ar: 'سيرة ذاتية متناسقة دلالياً تسهل قراءتها بواسطة خوارزميات التوظيف ومحركات البحث.',
      en: 'An ATS-friendly semantic CV easily parsed by screen readers and job crawlers.'
    }
  },

  // 2. CSS PROJECTS
  {
    id: 'proj-css-rgb-btn',
    technology: 'css',
    technologyName: { ar: 'CSS3', en: 'CSS3' },
    title: { ar: 'زر RGB نيون متوهج بحركة متحركة', en: 'Animated RGB Neon Glowing Button' },
    difficulty: 'intermediate',
    duration: '20 min',
    description: {
      ar: 'بناء زر مستقبلي بتأثيرات تدرج RGB متحركة، وتوهج نيون (Box-Shadow) يتفاعل عند مرور الفأرة.',
      en: 'Construct a futuristic cyber button with animated RGB border rotation and neon ambient glow.'
    },
    instructions: {
      ar: [
        '1. أنشئ عنصراً <button class="cyber-btn">.',
        '2. استخدم تدرجاً لونياً خطياً linear-gradient يحتوي على ألوان النيون (سماوي، وردي، بنفسجي).',
        '3. أضف حركة @keyframes بتغيير hue-rotate أو background-position.',
        '4. أضف تأثير :hover لتكبير الزر بنعومة (transform: scale(1.05)).'
      ],
      en: [
        '1. Create a <button class="cyber-btn"> element.',
        '2. Apply a linear gradient of cyber neon colors (cyan, magenta, electric purple).',
        '3. Write a @keyframes animation cycling hue-rotate or shifting background-position.',
        '4. Add a smooth :hover transformation (transform: scale(1.05)).'
      ]
    },
    starterCode: {
      html: `<button class="cyber-btn">ابدأ التعلم الآن ⚡</button>`,
      css: `.cyber-btn {
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(90deg, #00f0ff, #ec4899, #8b5cf6, #00f0ff);
  background-size: 300%;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  animation: glowCycle 6s linear infinite;
}

.cyber-btn:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 0 30px rgba(236, 72, 153, 0.7);
}

@keyframes glowCycle {
  0% { background-position: 0%; }
  100% { background-position: 300%; }
}`
    },
    expectedResult: {
      ar: 'زر نيون مستقبلي تتدفق ألوانه بسلاسة ويتوهج ببريق جذاب عند تمرير المؤشر.',
      en: 'A dazzling cyber button with continuous gradient flow and reactive hover glow.'
    }
  },
  {
    id: 'proj-css-portfolio',
    technology: 'css',
    technologyName: { ar: 'CSS3', en: 'CSS3' },
    title: { ar: 'معرض أعمال متجاوب بالـ Grid و Flexbox', en: 'Responsive Portfolio Grid' },
    difficulty: 'advanced',
    duration: '45 min',
    description: {
      ar: 'بناء شبكة بطاقات لعرض المشاريع تتكيف ذاتياً مع الهواتف والحواسيب باستخدام CSS Grid الحديث.',
      en: 'Assemble a responsive portfolio card grid that auto-adapts across viewports.'
    },
    instructions: {
      ar: [
        '1. وزع البطاقات في حاوية تحمل display: grid.',
        '2. طبق دالة repeat(auto-fit, minmax(280px, 1fr)) لمنع التمرير الأفقي.',
        '3. أضف تأثير انتقال ناعم hover يرفع البطاقة للأعلى بـ translateY(-5px).'
      ],
      en: [
        '1. Set container to display: grid.',
        '2. Use repeat(auto-fit, minmax(280px, 1fr)) for automatic mobile reflow.',
        '3. Inject smooth hover elevation with translateY(-5px) and soft shadow.'
      ]
    },
    starterCode: {
      html: `<div class="portfolio-grid">
  <div class="card"><h3>مشروع 1</h3><p>تطبيق ويب متجاوب</p></div>
  <div class="card"><h3>مشروع 2</h3><p>لوحة تحكم إحصائية</p></div>
  <div class="card"><h3>مشروع 3</h3><p>متجر إلكتروني</p></div>
</div>`,
      css: `.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}
.card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 1.5rem;
  color: #fff;
  transition: transform 0.2s, border-color 0.2s;
}
.card:hover {
  transform: translateY(-4px);
  border-color: #00f0ff;
}`
    },
    expectedResult: {
      ar: 'شبكة بطاقات احترافية ثلاثية الأعمدة في الديسكتوب وتتحول لعمود واحد أنيق في الهاتف.',
      en: 'A polished multi-column desktop grid that folds into a clean single column on mobile.'
    }
  },

  // 3. GIT PROJECTS
  {
    id: 'proj-git-workflow',
    technology: 'git',
    technologyName: { ar: 'Git', en: 'Git' },
    title: { ar: 'دورة عمل Git الكاملة: من الإنشاء إلى الدمج', en: 'Complete Git Branching & Merging Flow' },
    difficulty: 'intermediate',
    duration: '30 min',
    description: {
      ar: 'تطبيق عملي خطوة بخطوة في الطرفية: تهيئة مستودع، إنشاء فرع ميزة، عمل commit، ودمجه في main.',
      en: 'A terminal walkthrough: initialize a repo, branch a feature, commit snapshots, and merge into main.'
    },
    instructions: {
      ar: [
        '1. افتح الطرفية وأنشئ مجلداً جديداً وانتقل إليه.',
        '2. نفذ git init لبدء التتبع المحلي.',
        '3. أنشئ فرعاً جديداً باسم feature-navbar بـ git switch -c.',
        '4. أضف ملفاً ووثقه بـ git commit -m.',
        '5. ارجع لـ main وادمج التعديلات بـ git merge.'
      ],
      en: [
        '1. Open terminal, create a directory and cd into it.',
        '2. Run git init to initialize local tracking.',
        '3. Create and switch to feature-navbar branch using git switch -c.',
        '4. Add a file, stage, and commit with git commit -m.',
        '5. Checkout main and merge changes with git merge.'
      ]
    },
    starterCode: {
      commands: [
        'mkdir my-awesome-project && cd my-awesome-project',
        'git init',
        'echo "<h1>My Project</h1>" > index.html',
        'git add index.html',
        'git commit -m "feat: initial commit"',
        'git switch -c feature-header',
        'echo "<header>Navigation</header>" >> index.html',
        'git commit -am "feat: add header navigation"',
        'git switch main',
        'git merge feature-header'
      ]
    },
    expectedResult: {
      ar: 'دمج ناجح (Fast-forward) وظهور كل التعديلات في فرع main بسجل نظيف.',
      en: 'Clean fast-forward merge unifying the header feature safely into main.'
    }
  },

  // 4. GITHUB PROJECTS
  {
    id: 'proj-gh-deploy',
    technology: 'github',
    technologyName: { ar: 'GitHub', en: 'GitHub' },
    title: { ar: 'نشر موقع بورتفوليو حقيقي على GitHub Pages', en: 'Deploying Live Portfolio via GitHub Pages' },
    difficulty: 'intermediate',
    duration: '20 min',
    description: {
      ar: 'رفع مشروع بورتفوليو من حاسوبك ونشره على رابط عام دائم ومجاني ليراه مسؤولو التوظيف في العالم.',
      en: 'Upload a local portfolio codebase and publish it onto a free lifelong HTTPS URL via GitHub Pages.'
    },
    instructions: {
      ar: [
        '1. تأكد من وجود ملف باسم index.html في جذر المشروع.',
        '2. أنشئ مستودعاً عاماً (Public) على GitHub باسم "my-portfolio".',
        '3. اربط جهازك بـ git remote add origin واضغط git push -u origin main.',
        '4. افتح Settings ➔ Pages واختر فرع main ثم اضغط Save.',
        '5. احصل على الرابط: https://username.github.io/my-portfolio.'
      ],
      en: [
        '1. Ensure your root file is strictly named index.html.',
        '2. Create a public repository on GitHub named "my-portfolio".',
        '3. Link your machine with git remote add origin and run git push -u origin main.',
        '4. Navigate to Settings ➔ Pages, choose main branch and hit Save.',
        '5. Share your live link: https://<username>.github.io/my-portfolio.'
      ]
    },
    starterCode: {
      commands: [
        'git branch -M main',
        'git remote add origin https://github.com/<your-username>/my-portfolio.git',
        'git push -u origin main'
      ]
    },
    expectedResult: {
      ar: 'موقعك متاح للجميع في جميع دول العالم برابط رسمي محمي بـ SSL مجاناً.',
      en: 'Your portfolio is globally deployed with a verified HTTPS certificate.'
    }
  }
];
