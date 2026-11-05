export interface Lesson {
  id: string;
  courseId: 'html' | 'css' | 'git' | 'github';
  order: number;
  title: { ar: string; en: string };
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  explanation: { ar: string; en: string };
  syntax?: string;
  codeExample: {
    html?: string;
    css?: string;
    command?: string;
    language: string;
    description: { ar: string; en: string };
  };
  lineExplanations?: { line: string; explanation: { ar: string; en: string } }[];
  expectedResult: { ar: string; en: string };
  commonMistakes: { ar: string; en: string };
  exercise: {
    task: { ar: string; en: string };
    hint: { ar: string; en: string };
    solution: string;
  };
  miniQuiz: {
    question: { ar: string; en: string };
    options: { ar: string[]; en: string[] };
    correctIndex: number;
    explanation: { ar: string; en: string };
  };
}

export interface GitCommandDoc {
  id: string;
  command: string;
  category: string;
  categoryName: { ar: string; en: string };
  explanation: { ar: string; en: string };
  syntax: string;
  example: string;
  terminalOutput: string;
  whenToUse: { ar: string; en: string };
  commonMistakes: { ar: string; en: string };
  safetyWarning?: { ar: string; en: string };
  isDestructive?: boolean;
}

// ----------------------------------------------------
// 1. HTML LESSONS (22 Lessons)
// ----------------------------------------------------
export const HTML_LESSONS: Lesson[] = [
  {
    id: 'html-01',
    courseId: 'html',
    order: 1,
    title: { ar: '01. ما هو HTML؟', en: '01. What is HTML?' },
    difficulty: 'beginner',
    duration: '10 min',
    explanation: {
      ar: 'HTML اختصار لـ HyperText Markup Language (لغة توصيف النص الفائق). هي ليست لغة برمجة ذات منطق شرطي أو حسابي، بل لغة توصيف هيكلية تحدد عناصر الصفحة ومحتواها للمتصفح مثل العناوين والفقرات والصور.',
      en: 'HTML stands for HyperText Markup Language. It is not a programming language with conditional logic, but a markup language that structures web content, instructing browsers how to render text, links, and media.'
    },
    syntax: '<tagname>المحتوى هنا</tagname>',
    codeExample: {
      html: `<h1>مرحباً بك في عالم تطوير الويب</h1>\n<p>HTML هي حجر الأساس لكل صفحات الويب في العالم.</p>`,
      language: 'html',
      description: {
        ar: 'مثال بسيط لوسم عنوان رئيسي وفقرة نصية.',
        en: 'A basic example of a main heading and a paragraph tag.'
      }
    },
    lineExplanations: [
      { line: '<h1>...</h1>', explanation: { ar: 'وسم العنوان الأكبر أهمية في الصفحة.', en: 'The most important primary heading tag on the page.' } },
      { line: '<p>...</p>', explanation: { ar: 'وسم الفقرة النصية لتنسيق الكتل الكتابية.', en: 'The paragraph tag used for running blocks of text.' } }
    ],
    expectedResult: {
      ar: 'يظهر عنوان كبير وبارز بالخط العريض، وتحته سطر نص عادي بحجم قياسي.',
      en: 'A large, bold main heading appears with a regular standard paragraph underneath.'
    },
    commonMistakes: {
      ar: 'نسيان إغلاق الوسم بالسلاش المائل </tagname> أو اعتبار HTML لغة برمجة مثل بايثون أو جافاسكريبت.',
      en: 'Forgetting the closing slash </tagname> or assuming HTML executes computational logic like Python or JS.'
    },
    exercise: {
      task: { ar: 'اكتب عنواناً من المستوى الأول يحمل اسمك، وفقرة تصف اهتمامك بالبرمجة.', en: 'Create an h1 tag with your name and a p tag describing your coding interest.' },
      hint: { ar: 'استخدم <h1> و <p>.', en: 'Use <h1> and <p>.' },
      solution: `<h1>أحمد المطور</h1>\n<p>أتعلم برمجة الويب لبناء تطبيقات حقيقية.</p>`
    },
    miniQuiz: {
      question: { ar: 'ما هي وظيفة لغة HTML في صفحات الويب؟', en: 'What is the primary role of HTML in web pages?' },
      options: {
        ar: ['تحديد هيكل ومحتوى الصفحة', 'تصميم الألوان والحركات فقط', 'الاتصال بقواعد البيانات', 'إدارة المعالجات المركزية'],
        en: ['Structuring and defining content', 'Styling colors and animations only', 'Connecting to databases', 'Managing system CPUs']
      },
      correctIndex: 0,
      explanation: { ar: 'HTML تحدد بنية المستند وعناصره وتعتبر الهيكل العظمي للموقع.', en: 'HTML defines document structure and acts as the skeleton of any website.' }
    }
  },
  {
    id: 'html-02',
    courseId: 'html',
    order: 2,
    title: { ar: '02. بنية مستند HTML القياسية', en: '02. HTML Document Structure' },
    difficulty: 'beginner',
    duration: '15 min',
    explanation: {
      ar: 'كل صفحة ويب تبدأ ببيان نوع المستند <!DOCTYPE html> متبوعاً بوسم <html> الجذري، ثم قسم الرأس <head> للمعلومات الوصفية، وقسم الجسم <body> للمحتوى المرئي.',
      en: 'Every web page starts with <!DOCTYPE html> followed by the root <html> tag, a <head> section for metadata, and the <body> for visible content.'
    },
    syntax: '<!DOCTYPE html>\n<html lang="ar" dir="rtl">\n  <head>...</head>\n  <body>...</body>\n</html>',
    codeExample: {
      html: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8">
    <title>صفحتي الأولى</title>
  </head>
  <body>
    <h1>مستند HTML5 قياسي</h1>
  </body>
</html>`,
      language: 'html',
      description: {
        ar: 'الهيكل الإلزامي الكامل لبناء أي صفحة ويب متوافقة مع المعايير الدولية.',
        en: 'The standard mandatory boilerplate for any modern web document.'
      }
    },
    lineExplanations: [
      { line: '<!DOCTYPE html>', explanation: { ar: 'يخبر المتصفح أن الصفحة تتبع معيار HTML5 الحديث.', en: 'Tells the browser the document complies with HTML5.' } },
      { line: '<meta charset="UTF-8">', explanation: { ar: 'يدعم جميع الأحرف واللغات العالمية بما فيها العربية.', en: 'Enables universal character encoding including Arabic and symbols.' } },
      { line: '<body>', explanation: { ar: 'الحاوية الجامعة لكل ما يشاهده الزائر على شاشته.', en: 'Container holding everything visible to the visitor.' } }
    ],
    expectedResult: {
      ar: 'صفحة صالحة يعرض شريط عنوانها "صفحتي الأولى" وداخلها العنوان المكتوب.',
      en: 'A valid page displaying "صفحتي الأولى" in browser tab and the heading in the viewport.'
    },
    commonMistakes: {
      ar: 'وضع وسوم مرئية مثل <h1> داخل وسم <head> بدلاً من <body>.',
      en: 'Placing visible elements like headings inside <head> instead of <body>.'
    },
    exercise: {
      task: { ar: 'أنشئ هيكل HTML5 كامل لصفحة متجر رقمي مع تحديد اللغة الإنجليزية.', en: 'Create a full HTML5 boilerplate with lang="en" and dir="ltr".' },
      hint: { ar: 'استخدم <!DOCTYPE html> و <title>Store</title>.', en: 'Use <!DOCTYPE html> and <title>Store</title>.' },
      solution: `<!DOCTYPE html>\n<html lang="en" dir="ltr">\n<head>\n  <meta charset="UTF-8">\n  <title>Tech Store</title>\n</head>\n<body>\n  <h1>Welcome to Tech Store</h1>\n</body>\n</html>`
    },
    miniQuiz: {
      question: { ar: 'أين يجب وضع المحتوى المرئي الذي يظهر للمستخدم في المتصفح؟', en: 'Where must all user-visible page content reside?' },
      options: {
        ar: ['داخل وسم <body>', 'داخل وسم <head>', 'خارج وسم <html>', 'داخل وسم <meta>'],
        en: ['Inside <body> tag', 'Inside <head> tag', 'Outside <html> tag', 'Inside <meta> tag']
      },
      correctIndex: 0,
      explanation: { ar: 'كل العناصر المرئية للمستخدم تكتب حصراً داخل <body>.', en: 'All rendered user-facing markup must live inside the <body>.' }
    }
  },
  {
    id: 'html-03',
    courseId: 'html',
    order: 3,
    title: { ar: '03. العناصر والوسوم وخصائصها', en: '03. HTML Elements, Tags & Attributes' },
    difficulty: 'beginner',
    duration: '12 min',
    explanation: {
      ar: 'العنصر في HTML يتألف من وسم البداية، المحتوى، ووسم النهاية. بعض الوسوم ذاتية الإغلاق (Void Tags) مثل <img> و <br>. الخصائص (Attributes) توفر معلومات إضافية للعنصر مثل id و class.',
      en: 'An HTML element comprises an opening tag, content, and closing tag. Void elements (like <img> and <br>) do not have closing tags. Attributes provide extra settings like class, id, and href.'
    },
    syntax: '<tag attribute="value">Content</tag>',
    codeExample: {
      html: `<p id="intro" class="text-lead">نص يحمل معرفاً واسم صنف تنظيمي.</p>\n<hr>\n<br>`,
      language: 'html',
      description: {
        ar: 'استخدام الخصائص id و class والوسوم ذاتية الإغلاق.',
        en: 'Using attributes like id, class, and self-closing tags like hr and br.'
      }
    },
    lineExplanations: [
      { line: 'id="intro"', explanation: { ar: 'معرف فريد لا يتكرر لنفس العنصر في الصفحة الواحدة.', en: 'Unique identifier that cannot repeat on the same page.' } },
      { line: 'class="text-lead"', explanation: { ar: 'صنف تنظيمي يمكن مشاركته بين عدة عناصر لتطبيق CSS.', en: 'Reusable classification shared across elements for styling.' } }
    ],
    expectedResult: {
      ar: 'فقرة نصية متبوعة بخط فاصل أفقي ومسافة سطر فارغة.',
      en: 'A styled paragraph followed by a horizontal rule line and line break.'
    },
    commonMistakes: {
      ar: 'تكرار نفس قيمة id في أكثر من عنصر في الصفحة نفسها.',
      en: 'Reusing the same id attribute across multiple elements.'
    },
    exercise: {
      task: { ar: 'أنشئ فقرة تحمل id باسم "bio" وصنف class باسم "highlight".', en: 'Create a paragraph with id="bio" and class="highlight".' },
      hint: { ar: 'اكتب <p id="bio" class="highlight">...', en: 'Write <p id="bio" class="highlight">...' },
      solution: `<p id="bio" class="highlight">أنا مهندس برمجيات واجهات أمامية.</p>`
    },
    miniQuiz: {
      question: { ar: 'أي من الوسوم التالية يعتبر وسماً ذاتي الإغلاق (Void Tag)؟', en: 'Which of the following is a self-closing void element?' },
      options: {
        ar: ['<img>', '<p>', '<div>', '<h1>'],
        en: ['<img>', '<p>', '<div>', '<h1>']
      },
      correctIndex: 0,
      explanation: { ar: 'وسم <img> لا يحتاج وسم إغلاق </img>.', en: '<img> is a void tag and never takes a closing tag.' }
    }
  },
  {
    id: 'html-04',
    courseId: 'html',
    order: 4,
    title: { ar: '04. العناوين من h1 إلى h6', en: '04. Headings: h1 to h6' },
    difficulty: 'beginner',
    duration: '10 min',
    explanation: {
      ar: 'توفر HTML ستة مستويات من العناوين (h1 إلى h6). h1 هو العنوان الأكثر أهمية ويجب أن يوجد مرة واحدة في الصفحة كعنوان رئيسي، تليه المستويات الفرعية بالترتيب المنطقي.',
      en: 'HTML offers six heading levels (h1 to h6). h1 represents the primary topic and should typically appear once per page, followed hierarchically by h2, h3, down to h6.'
    },
    syntax: '<h1>العنوان الأكبر</h1>\n<h2>عنوان فرعي</h2>\n<h3>عنوان فرعي ثالث</h3>',
    codeExample: {
      html: `<h1>دليل مطور الويب</h1>\n<h2>الوحدة الأولى: الأساسيات</h2>\n<h3>الدرس الأول: العناوين</h3>`,
      language: 'html',
      description: {
        ar: 'تسلسل هرمي سليم للعناوين وفق معايير محركات البحث.',
        en: 'Semantic hierarchical heading structure for SEO.'
      }
    },
    expectedResult: {
      ar: 'ثلاثة عناوين متتالية بأحجام متدرجة من الأكبر إلى الأصغر.',
      en: 'Three headings descending visually from largest to smallest.'
    },
    commonMistakes: {
      ar: 'استخدام وسوم العناوين فقط لتكبير حجم الخط بدلاً من استخدام CSS.',
      en: 'Using heading tags purely for font size instead of styling with CSS.'
    },
    exercise: {
      task: { ar: 'اكتب تسلسلاً هرمياً يبدأ بـ h1 لاسم مدونتك، ثم h2 لعنوان مقال.', en: 'Write an h1 for your blog name and an h2 for an article title.' },
      hint: { ar: 'ابدأ بـ <h1> واختم بـ <h2>.', en: 'Start with <h1> and follow with <h2>.' },
      solution: `<h1>مدونة التقنية الحديثة</h1>\n<h2>دليل استخدام Git للمبتدئين</h2>`
    },
    miniQuiz: {
      question: { ar: 'كم عدد وسوم h1 المستحسن وجودها كعنوان رئيسي للمقال في الصفحة؟', en: 'How many h1 tags are recommended as the primary page title?' },
      options: {
        ar: ['عنوان رئيسي واحد (1)', 'خمسة عناوين على الأقل', 'لا يهم، أي عدد', 'صفر، يمنع استخدامها'],
        en: ['Exactly one (1)', 'At least five', 'Arbitrary unlimited', 'Zero, forbidden']
      },
      correctIndex: 0,
      explanation: { ar: 'عنوان h1 واحد يحدد الموضوع الرئيسي ويفضله خبراء الـ SEO.', en: 'A single h1 clearly specifies document context for search engines.' }
    }
  },
  {
    id: 'html-05',
    courseId: 'html',
    order: 5,
    title: { ar: '05. الفقرات وتنسيق النصوص', en: '05. Paragraphs & Text Formatting' },
    difficulty: 'beginner',
    duration: '12 min',
    explanation: {
      ar: 'تستخدم وسوم <p> للفقرات، مع وسوم التنسيق مثل <strong> لإبراز الأهمية، <em> للتشديد، <mark> للتحديد اللوني، <del> للنص المشطوب، و <ins> للنص المضاف.',
      en: 'Paragraphs use <p>. Inline formatters include <strong> for semantic strong importance, <em> for emphasis, <mark> for highlights, and <del> for struck-through text.'
    },
    syntax: '<p>نص عادي مع <strong>نص مهم جداً</strong> و <em>نص مائل</em>.</p>',
    codeExample: {
      html: `<p>تعلم <strong>Git</strong> يجعلك مطوراً <em>محترفاً</em> ومطلوباً في سوق العمل.</p>`,
      language: 'html',
      description: {
        ar: 'تنسيق النص دلالياً داخل فقرة.',
        en: 'Semantic inline text formatting inside a paragraph.'
      }
    },
    expectedResult: {
      ar: 'فقرة تحتوي على كلمة بخط عريض وكلمة بخط مائل ذات دلالة لأجهزة قراءة الشاشة.',
      en: 'A sentence with bolded strong emphasis and italicized phrasing.'
    },
    commonMistakes: {
      ar: 'استخدام <b> بدلاً من <strong> أو <i> بدلاً من <em> حيث تفتقر للبعد الدلالي.',
      en: 'Using purely visual <b> and <i> instead of semantic <strong> and <em>.'
    },
    exercise: {
      task: { ar: 'أنشئ فقرة تحتوي على كلمة مظللة بـ <mark> وأخرى محذوفة بـ <del>.', en: 'Create a paragraph with a <mark> highlight and a <del> deleted term.' },
      hint: { ar: 'استخدم <mark>خصم</mark> و <del>100$</del>.', en: 'Use <mark>sale</mark> and <del>$100</del>.' },
      solution: `<p>سعر الدورة اليوم <mark>50$</mark> بدلاً من <del>100$</del>.</p>`
    },
    miniQuiz: {
      question: { ar: 'ما هو الوسم الأفضل دلالياً للدلالة على نص ذي أهمية قصوى؟', en: 'Which tag is semantically preferred for critical strong importance?' },
      options: {
        ar: ['<strong>', '<b>', '<bold>', '<big>'],
        en: ['<strong>', '<b>', '<bold>', '<big>']
      },
      correctIndex: 0,
      explanation: { ar: 'وسم <strong> يعطي دلالة للأجهزة وقارئات الشاشة بجانب الخط العريض.', en: '<strong> indicates semantic importance, not merely aesthetic bolding.' }
    }
  },
  {
    id: 'html-06',
    courseId: 'html',
    order: 6,
    title: { ar: '06. الروابط والارتباطات التشعبية (Anchors)', en: '06. Links & Anchors (<a>)' },
    difficulty: 'beginner',
    duration: '15 min',
    explanation: {
      ar: 'وسم <a> يربط الصفحات والمواقع ببعضها عبر الخاصية href. للفتح في نافذة جديدة نستخدم target="_blank" مع rel="noopener noreferrer" لحماية الأمان.',
      en: 'The <a> tag creates hyperlinks via href. To open targets in a new tab, use target="_blank" with rel="noopener noreferrer" for security.'
    },
    syntax: '<a href="https://example.com" target="_blank" rel="noopener noreferrer">زيارة الموقع</a>',
    codeExample: {
      html: `<a href="https://github.com" target="_blank" rel="noopener noreferrer">حسابي على GitHub</a>`,
      language: 'html',
      description: {
        ar: 'رابط خارجي آمن يفتح في علامة تبويب جديدة.',
        en: 'A secure external link opening in a separate browser tab.'
      }
    },
    expectedResult: {
      ar: 'نص ملون ومسطر ينقلك فور الضغط عليه إلى موقع GitHub في نافذة جديدة.',
      en: 'A clickable underlined link that opens GitHub in a fresh tab.'
    },
    commonMistakes: {
      ar: 'نسيان الخاصية href، مما يجعل الرابط غير قابل للنقر.',
      en: 'Omitting the href attribute, rendering the link non-interactive.'
    },
    exercise: {
      task: { ar: 'أنشئ رابطاً ينقلك إلى البريد الإلكتروني عبر mailto:.', en: 'Create an email link using mailto:.' },
      hint: { ar: 'اكتب href="mailto:name@example.com".', en: 'Write href="mailto:name@example.com".' },
      solution: `<a href="mailto:dev@example.com">راسلني عبر البريد</a>`
    },
    miniQuiz: {
      question: { ar: 'أي خاصية تحدد عنوان الصفحة المراد الانتقال إليها في وسم <a>؟', en: 'Which attribute defines the destination URL in an <a> tag?' },
      options: {
        ar: ['href', 'src', 'link', 'url'],
        en: ['href', 'src', 'link', 'url']
      },
      correctIndex: 0,
      explanation: { ar: 'خاصية href (Hypertext Reference) هي المعنية بروابط <a>.', en: 'href specifies the target URL destination.' }
    }
  },
  {
    id: 'html-07',
    courseId: 'html',
    order: 7,
    title: { ar: '07. الصور وخاصية Alt البديلة', en: '07. Images & Alt Attributes (<img>)' },
    difficulty: 'beginner',
    duration: '12 min',
    explanation: {
      ar: 'وسم <img> يدرج الصور عبر خاصية src، بينما خاصية alt إلزامية لتمكين المكفوفين من سماع وصف الصورة ومساعدة محركات البحث عند بطء التحميل.',
      en: 'The <img> element renders images using src. The alt attribute is essential for accessibility screen-readers and displays when network assets fail.'
    },
    syntax: '<img src="path/to/image.jpg" alt="وصف دقيق للصورة" width="400" height="250">',
    codeExample: {
      html: `<img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400" alt="شاشة حاسوب تعرض كود برمجي حديث" width="400">`,
      language: 'html',
      description: {
        ar: 'إدراج صورة مع تحديد النص البديل والأبعاد لمنع قفز التخطيط (CLS).',
        en: 'Embedding an image with descriptive alt text and dimensions.'
      }
    },
    expectedResult: {
      ar: 'عرض الصورة مع النص البديل عند انقطاع الشبكة.',
      en: 'The image renders crisply, displaying fallback alt text if loading fails.'
    },
    commonMistakes: {
      ar: 'ترك خاصية alt فارغة أو كتابة "صورة" دون وصف حقيقي للمحتوى.',
      en: 'Leaving alt completely blank or writing generic words like "image".'
    },
    exercise: {
      task: { ar: 'أضف صورة شعار الموقع مع نص بديل "شعار أكاديمية البرمجة".', en: 'Embed a logo image with alt="Coding Academy Logo".' },
      hint: { ar: 'استخدم <img src="logo.png" alt="...">.', en: 'Use <img src="logo.png" alt="...">.' },
      solution: `<img src="logo.png" alt="شعار أكاديمية البرمجة" width="120">`
    },
    miniQuiz: {
      question: { ar: 'لماذا تعتبر خاصية alt في وسم <img> شديدة الأهمية؟', en: 'Why is the alt attribute in <img> indispensable?' },
      options: {
        ar: ['لإمكانية الوصول (Accessibility) وتحسين محركات البحث والنسخ البديل', 'لتغيير سرعة تحميل الخادم', 'لإضافة ظل ثلاثي الأبعاد للصورة', 'لحذف الصور المكررة'],
        en: ['Accessibility for screen readers, SEO, and fallback text', 'To boost server CPU speeds', 'To inject 3D drop shadows', 'To purge duplicate assets']
      },
      correctIndex: 0,
      explanation: { ar: 'alt تضمن إمكانية وصول ذوي الإعاقة البصرية وتوضح محتوى الصورة لمحركات البحث.', en: 'alt allows screen readers to describe visual assets to visually impaired users.' }
    }
  },
  {
    id: 'html-08',
    courseId: 'html',
    order: 8,
    title: { ar: '08. القوائم: المرتبة وغير المرتبة', en: '08. Lists: ul, ol, and li' },
    difficulty: 'beginner',
    duration: '10 min',
    explanation: {
      ar: 'القوائم غير المرتبة <ul> تعرض نقاط نقطية Bullet points، بينما القوائم المرتبة <ol> ترقم العناصر تسلسلياً (1, 2, 3). كل عنصر داخلها يوضع في <li>.',
      en: 'Unordered lists <ul> display bullet points, while ordered lists <ol> enumerate sequentially. Each item is enclosed within <li>.'
    },
    syntax: '<ul>\n  <li>العنصر الأول</li>\n  <li>العنصر الثاني</li>\n</ul>',
    codeExample: {
      html: `<h3>خطوات نشر الموقع:</h3>
<ol>
  <li>كتابة كود HTML و CSS</li>
  <li>إنشاء مستودع Git والـ Commit</li>
  <li>الرفع إلى GitHub وتفعيل Pages</li>
</ol>`,
      language: 'html',
      description: {
        ar: 'قائمة مرتبة تعرض خطوات متسلسلة.',
        en: 'An ordered list detailing procedural sequential steps.'
      }
    },
    expectedResult: {
      ar: 'قائمة مرقمة أوتوماتيكياً بالأرقام 1 و 2 و 3.',
      en: 'An automatically numbered vertical list: 1, 2, and 3.'
    },
    commonMistakes: {
      ar: 'وضع نصوص حرة أو وسوم <p> مباشرة داخل <ul> دون تغليفها بـ <li>.',
      en: 'Placing bare text directly inside <ul> without wrapping in <li>.'
    },
    exercise: {
      task: { ar: 'أنشئ قائمة غير مرتبة بالتقنيات الأربع الأساسية (HTML, CSS, Git, GitHub).', en: 'Create an unordered list of the four foundational web tools.' },
      hint: { ar: 'استخدم <ul> وبداخلها أربعة <li>.', en: 'Use <ul> with four <li> children.' },
      solution: `<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n  <li>Git</li>\n  <li>GitHub</li>\n</ul>`
    },
    miniQuiz: {
      question: { ar: 'أي وسم يمثل عنصر القائمة الفردي داخل <ul> أو <ol>؟', en: 'Which element represents a single list item within ul or ol?' },
      options: {
        ar: ['<li>', '<item>', '<list>', '<ul>'],
        en: ['<li>', '<item>', '<list>', '<ul>']
      },
      correctIndex: 0,
      explanation: { ar: '<li> اختصار لـ List Item وهو العنصر الفعلي.', en: '<li> stands for List Item and forms the list entries.' }
    }
  },
  {
    id: 'html-09',
    courseId: 'html',
    order: 9,
    title: { ar: '09. الجداول: table و tr و th و td', en: '09. Tables & Tabular Data' },
    difficulty: 'intermediate',
    duration: '15 min',
    explanation: {
      ar: 'تستخدم الجداول لعرض البيانات المجدولة فقط (وليس لبناء تخطيط الصفحة). يتكون الجدول من <table>، صفوف <tr>، خلايا عناوين <th>، وخلايا بيانات <td>، مع <thead> و <tbody>.',
      en: 'Tables display structured tabular metrics. Formed using <table>, table rows <tr>, header cells <th>, and data cells <td> alongside <thead> and <tbody>.'
    },
    syntax: '<table>\n  <tr><th>الأداة</th><th>المهمة</th></tr>\n  <tr><td>Git</td><td>التحكم بالإصدارات</td></tr>\n</table>',
    codeExample: {
      html: `<table border="1">
  <thead>
    <tr>
      <th>التقنية</th>
      <th>النوع</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>HTML</td>
      <td>Markup</td>
    </tr>
    <tr>
      <td>CSS</td>
      <td>Styles</td>
    </tr>
  </tbody>
</table>`,
      language: 'html',
      description: {
        ar: 'جدول مقارنة ثنائي الأعمدة مع رأس وجسم.',
        en: 'A structured two-column comparison table.'
      }
    },
    expectedResult: {
      ar: 'جدول منظم بخلايا واضحة وعناوين بالخط العريض في الصف العلوي.',
      en: 'A tabular data matrix with bold centered header row cells.'
    },
    commonMistakes: {
      ar: 'استخدام الجداول لتوزيع العناصر في الموقع بدلاً من استخدام CSS Flexbox و Grid.',
      en: 'Using HTML tables for overall page layout rather than modern CSS.'
    },
    exercise: {
      task: { ar: 'أنشئ جدولاً بسيطاً يوضح اسمك وتخصصك.', en: 'Create a simple table with your name and role.' },
      hint: { ar: 'استخدم <table> و <tr> و <td>.', en: 'Use <table>, <tr>, and <td>.' },
      solution: `<table>\n  <tr><th>الاسم</th><th>التخصص</th></tr>\n  <tr><td>حمزة</td><td>مطور واجهات</td></tr>\n</table>`
    },
    miniQuiz: {
      question: { ar: 'أي وسم يمثل خلية عنوان الجدول (Table Header)؟', en: 'Which tag represents a header cell in an HTML table?' },
      options: {
        ar: ['<th>', '<td>', '<tr>', '<head>'],
        en: ['<th>', '<td>', '<tr>', '<head>']
      },
      correctIndex: 0,
      explanation: { ar: '<th> اختصار لـ Table Header ويعرض النص عريضاً ومحاذياً للمركز.', en: '<th> specifies Table Header with bold semantic presence.' }
    }
  },
  {
    id: 'html-10',
    courseId: 'html',
    order: 10,
    title: { ar: '10. النماذج واستقبال البيانات (Forms)', en: '10. Forms (<form>)' },
    difficulty: 'intermediate',
    duration: '18 min',
    explanation: {
      ar: 'النموذج <form> هو الحاوية التفاعلية لجمع مدخلات المستخدم وإرسالها للخادم عبر خاصية action وطريقة الإرسال method (مثل GET أو POST).',
      en: 'The <form> element encapsulates input controls allowing users to enter data sent to servers via action and method (GET/POST).'
    },
    syntax: '<form action="/submit" method="POST">\n  <!-- حقول الإدخال هنا -->\n</form>',
    codeExample: {
      html: `<form action="/contact" method="POST">
  <label for="username">الاسم الكامل:</label>
  <input type="text" id="username" name="user_name" required>
  <button type="submit">إرسال البيانات</button>
</form>`,
      language: 'html',
      description: {
        ar: 'نموذج بسيط مع حقل نصي وزر إرسال رسمي.',
        en: 'A contact form with an associated label, input, and submit button.'
      }
    },
    expectedResult: {
      ar: 'تسمية نصية مرتبطة بحقل إدخال يقبل الكتابة وزر عند الضغط عليه يتحقق من ملء الحقل.',
      en: 'An input box connected to its label with an interactive submit button.'
    },
    commonMistakes: {
      ar: 'إهمال ربط <label> مع <input> عبر خاصيتي for و id مما يضر بسهولة الوصول.',
      en: 'Omitting the label-for and input-id association which damages accessibility.'
    },
    exercise: {
      task: { ar: 'أنشئ نموذجاً لطلب الاشتراك البريدي يحتوي على حقل إيميل وزر اشتراك.', en: 'Build a newsletter form with email input and submit button.' },
      hint: { ar: 'استخدم <input type="email">.', en: 'Use <input type="email">.' },
      solution: `<form action="/newsletter" method="POST">\n  <label for="email">بريدك:</label>\n  <input type="email" id="email" required>\n  <button type="submit">اشترك الآن</button>\n</form>`
    },
    miniQuiz: {
      question: { ar: 'أي خاصية في وسم <form> تحدد مسار أو رابط الخادم الذي يستقبل البيانات؟', en: 'Which form attribute defines the server destination endpoint?' },
      options: {
        ar: ['action', 'method', 'target', 'href'],
        en: ['action', 'method', 'target', 'href']
      },
      correctIndex: 0,
      explanation: { ar: 'action تحدد عنوان URL للخادم المعالج للنموذج.', en: 'action dictates the URL that processes the form submission.' }
    }
  },
  {
    id: 'html-11',
    courseId: 'html',
    order: 11,
    title: { ar: '11. أنواع حقول الإدخال (Input Types)', en: '11. HTML Input Types' },
    difficulty: 'intermediate',
    duration: '15 min',
    explanation: {
      ar: 'يوفر HTML5 العديد من أنواع الإدخال المتخصصة: text, password, email, number, checkbox, radio, date, color, file. اختيار النوع الصحيح يسهل الكتابة على الهواتف ويوفر تحققاً تلقائياً.',
      en: 'HTML5 introduces specialized input types: text, password, email, number, date, checkbox, radio, color, and file. Using proper types enables mobile keyboards and native validation.'
    },
    syntax: '<input type="password" placeholder="كلمة المرور">\n<input type="checkbox" id="terms">',
    codeExample: {
      html: `<div>
  <input type="email" placeholder="name@domain.com">
  <input type="password" placeholder="أدخل كلمة المرور">
  <input type="date">
</div>`,
      language: 'html',
      description: {
        ar: 'مجموعة من حقول الإدخال المتخصصة للبريد والسر والتاريخ.',
        en: 'A suite of specialized input controls for email, password, and calendar dates.'
      }
    },
    expectedResult: {
      ar: 'حقل بريد يتحقق من @ وحقل كلمة مرور يخفي الأحرف بنقاط سوداء، وحقل تقويم لاختيار اليوم.',
      en: 'Masked password input, email validator, and an interactive datepicker.'
    },
    commonMistakes: {
      ar: 'استخدام type="text" لكلمات المرور أو البريد الإلكتروني مما يحرم المستخدم من لوحة المفاتيح المخصصة.',
      en: 'Using generic type="text" for passwords or emails, breaking mobile keyboards.'
    },
    exercise: {
      task: { ar: 'أنشئ حقلي إدخال أحدهما رقمي (number) والآخر لاختيار اللون (color).', en: 'Build two inputs: one for number and one for color.' },
      hint: { ar: 'استخدم type="number" و type="color".', en: 'Use type="number" and type="color".' },
      solution: `<input type="number" min="1" max="10">\n<input type="color">`
    },
    miniQuiz: {
      question: { ar: 'أي نوع إدخال يخفي الرموز المدخلة لحماية خصوصية المستخدم؟', en: 'Which input type obscures characters for privacy protection?' },
      options: {
        ar: ['password', 'hidden', 'secret', 'secure'],
        en: ['password', 'hidden', 'secret', 'secure']
      },
      correctIndex: 0,
      explanation: { ar: 'type="password" يحول الأحرف إلى دوائر سوداء مشفرة بصرياً.', en: 'type="password" visually masks characters as bullets.' }
    }
  },
  {
    id: 'html-12',
    courseId: 'html',
    order: 12,
    title: { ar: '12. الأزرار وأنواعها (Buttons)', en: '12. Buttons & Button Types' },
    difficulty: 'beginner',
    duration: '10 min',
    explanation: {
      ar: 'عنصر <button> يأتي بثلاثة أنواع: submit (إرسال النموذج افتراضياً)، reset (تفريغ الحقول)، و button (زر مخصص للتفاعل البرمجي مع جافاسكريبت).',
      en: 'The <button> element has three types: submit (default in forms), reset (clears fields), and button (generic control for JavaScript handlers).'
    },
    syntax: '<button type="button">زر برمجي</button>\n<button type="submit">إرسال</button>',
    codeExample: {
      html: `<button type="button" onclick="alert('مرحباً بك')">انقر هنا</button>\n<button type="submit">حفظ التغييرات</button>`,
      language: 'html',
      description: {
        ar: 'أزرار بنوع صريح لتفادي الإرسال العشوائي للنموذج.',
        en: 'Explicit button typing to avoid unintended form triggers.'
      }
    },
    expectedResult: {
      ar: 'زران تفاعليان يغيران مؤشر الفأرة لليد عند المرور عليهما.',
      en: 'Two clickable buttons that switch cursor to pointer on hover.'
    },
    commonMistakes: {
      ar: 'نسيان تحديد type="button" داخل النماذج مما يؤدي لإرسال الصفحة بالخطأ عند الضغط.',
      en: 'Omitting type="button" inside forms, causing unintended submission on click.'
    },
    exercise: {
      task: { ar: 'أنشئ زراً يحمل نوع "reset" ومكتوب بداخله "تفريغ الحقول".', en: 'Create a button of type "reset" with text "Clear Fields".' },
      hint: { ar: 'اكتب <button type="reset">...', en: 'Write <button type="reset">...' },
      solution: `<button type="reset">تفريغ الحقول</button>`
    },
    miniQuiz: {
      question: { ar: 'ما هو النوع الافتراضي لزر <button> إذا تم وضعه داخل نموذج <form>؟', en: 'What is the default type for a <button> placed inside a form?' },
      options: {
        ar: ['submit', 'button', 'reset', 'none'],
        en: ['submit', 'button', 'reset', 'none']
      },
      correctIndex: 0,
      explanation: { ar: 'النوع الافتراضي هو submit، لذا يجب تعيين type="button" للأزرار العادية.', en: 'Default button type is submit unless explicitly overridden.' }
    }
  },
  {
    id: 'html-13',
    courseId: 'html',
    order: 13,
    title: { ar: '13. وسوم HTML5 الدلالية (Semantic HTML)', en: '13. Semantic HTML5 Elements' },
    difficulty: 'intermediate',
    duration: '18 min',
    explanation: {
      ar: 'الوسوم الدلالية تعبر بوضوح عن معنى محتواها لكل من المتصفح والمطور. بدلاً من تقسيم كل شيء بـ <div>، نستخدم <header> و <nav> و <main> و <section> و <article> و <aside> و <footer>.',
      en: 'Semantic HTML clearly describes the role of content to browsers, screen readers, and search engines. Replaces div soup with header, nav, main, section, article, aside, and footer.'
    },
    syntax: '<header>...</header>\n<nav>...</nav>\n<main>\n  <article>...</article>\n</main>\n<footer>...</footer>',
    codeExample: {
      html: `<header>
  <nav><a href="#home">الرئيسية</a></nav>
</header>
<main>
  <article>
    <h2>عنوان المقال</h2>
    <p>محتوى المقال المستقل بذاته.</p>
  </article>
</main>
<footer>
  <p>© 2026 جميع الحقوق محفوظة.</p>
</footer>`,
      language: 'html',
      description: {
        ar: 'هيكل كامل لصفحة ويب دلالية منظمة ونظيفة.',
        en: 'A pristine semantic document hierarchy avoiding non-semantic divs.'
      }
    },
    expectedResult: {
      ar: 'صفحة ذات تسلسل هيكلي مفهوم من قبل قارئات الشاشة ومحركات البحث.',
      en: 'A semantically sound layout ready for accessible styling.'
    },
    commonMistakes: {
      ar: 'تسمية الصفحات "Div Soup" بوضع <div class="header"> و <div class="footer"> بدلاً من الوسوم الدلالية الأصلية.',
      en: 'Overusing div soup (<div class="header">) instead of modern native semantic tags.'
    },
    exercise: {
      task: { ar: 'اكتب تذييل صفحة دلالي يحتوي على حقوق النشر ورابط الشروط.', en: 'Write a semantic footer with copyright and a privacy link.' },
      hint: { ar: 'استخدم <footer> وبداخله <p> و <a>.', en: 'Use <footer> containing <p> and <a>.' },
      solution: `<footer>\n  <p>© 2026 WebDev Master · <a href="/privacy">الخصوصية</a></p>\n</footer>`
    },
    miniQuiz: {
      question: { ar: 'أي وسم دلالي يمثل المحتوى الرئيسي الفريد الخاص بالصفحة الحالية؟', en: 'Which semantic tag encapsulates the unique primary content of a page?' },
      options: {
        ar: ['<main>', '<section>', '<header>', '<body>'],
        en: ['<main>', '<section>', '<header>', '<body>']
      },
      correctIndex: 0,
      explanation: { ar: '<main> مخصص حصراً للمحتوى الفريد الرئيسي الذي لا يتكرر في باقي الصفحات.', en: '<main> designates the central unique subject of the document.' }
    }
  },
  {
    id: 'html-14',
    courseId: 'html',
    order: 14,
    title: { ar: '14. الحاويات العامة: div و span', en: '14. Generic Containers: div & span' },
    difficulty: 'beginner',
    duration: '10 min',
    explanation: {
      ar: 'عنصر <div> هو حاوية كتلية (Block-level) تبدأ سطراً جديداً وتأخذ العرض الكامل. بينما <span> حاوية سطرية (Inline) لتنسيق جزء محدد من النص دون كسر السطر.',
      en: '<div> is a block-level generic container spanning full width. <span> is an inline container used to style a specific snippet of text without causing line breaks.'
    },
    syntax: '<div class="card">\n  <p>سعر المنتج <span class="price">99$</span> فقط.</p>\n</div>',
    codeExample: {
      html: `<div class="profile-box">
  <p>حالة الحساب: <span style="color: #10b981; font-weight: bold;">نشط الآن</span></p>
</div>`,
      language: 'html',
      description: {
        ar: 'استخدام div ككتلة حاوية و span لتلوين كلمة معينة سطرية.',
        en: 'Using div for block wrapping and span for inline color highlight.'
      }
    },
    expectedResult: {
      ar: 'كتلة نصية مع كلمة "نشط الآن" ملونة بالأخضر المضيء دون النزول لسطر جديد.',
      en: 'The text block displays with the status phrase highlighted in emerald green.'
    },
    commonMistakes: {
      ar: 'استخدام <div> داخل وسم فقرة <p> مما يؤدي لكسر تلقائي للفقرة لأن div كتلي.',
      en: 'Nesting block-level <div> directly inside inline <p> tags, which breaks markup.'
    },
    exercise: {
      task: { ar: 'أنشئ فقرة تحتوي كلمة مميزة باللون الأزرق باستخدام وسم span.', en: 'Create a paragraph with one word styled using span.' },
      hint: { ar: 'استخدم <span style="color: blue;">كلمة</span>.', en: 'Use <span style="color: blue;">word</span>.' },
      solution: `<p>لدينا اليوم عرض <span style="color: blue;">استثنائي</span> للمشتركين.</p>`
    },
    miniQuiz: {
      question: { ar: 'ما هو الفرق الجوهري بين div و span؟', en: 'What is the core distinction between div and span?' },
      options: {
        ar: ['div عنصر كتلي (Block) و span عنصر سطري (Inline)', 'div للصور فقط و span للأزرار', 'لا فرق بينهما على الإطلاق', 'span لا يقبل خصائص CSS'],
        en: ['div is block-level while span is inline', 'div is for images and span for buttons', 'There is no difference', 'span cannot take CSS properties']
      },
      correctIndex: 0,
      explanation: { ar: 'div يأخذ عرض السطر كاملاً بينما span يأخذ مساحة محتواه فقط.', en: 'div spans full horizontal width, whereas span occupies inline text breadth.' }
    }
  },
  {
    id: 'html-15',
    courseId: 'html',
    order: 15,
    title: { ar: '15. الصوت والفيديو (Audio & Video)', en: '15. HTML5 Audio & Video' },
    difficulty: 'intermediate',
    duration: '14 min',
    explanation: {
      ar: 'يتيح HTML5 تشغيل الوسائط المتعددة دون إضافات فلاش عبر <video> و <audio> مع خاصية controls لإظهار أزرار التشغيل والتحكم بالصوت.',
      en: 'HTML5 natively renders multimedia without plugins using <video> and <audio>. The controls attribute exposes playback, volume, and fullscreen buttons.'
    },
    syntax: '<video src="movie.mp4" controls width="640"></video>\n<audio src="sound.mp3" controls></audio>',
    codeExample: {
      html: `<video controls width="100%" poster="thumb.jpg">
  <source src="intro.mp4" type="video/mp4">
  متصفحك لا يدعم تشغيل الفيديو.
</video>`,
      language: 'html',
      description: {
        ar: 'مشغل فيديو متجاوب مع صورة غلاف poster وخيار احتياطي.',
        en: 'A responsive video player with poster thumbnail and fallback notice.'
      }
    },
    expectedResult: {
      ar: 'مشغل وسائط يحتوي على زر التشغيل وشريط التقدم ومكبر الصوت.',
      en: 'A functional media player with play/pause, scrub bar, and volume controls.'
    },
    commonMistakes: {
      ar: 'نسيان كتابة الخاصية controls مما يجعل الفيديو يظهر كصورة جامدة لا يمكن تشغيلها.',
      en: 'Omitting controls, leaving users unable to click play or toggle audio.'
    },
    exercise: {
      task: { ar: 'اكتب وسم audio يحتوي على شريط التحكم controls وملف "podcast.mp3".', en: 'Write an audio tag with controls and source "podcast.mp3".' },
      hint: { ar: 'اكتب <audio src="podcast.mp3" controls>.', en: 'Write <audio src="podcast.mp3" controls>.' },
      solution: `<audio src="podcast.mp3" controls>\n  مشغل الصوت غير مدعوم.\n</audio>`
    },
    miniQuiz: {
      question: { ar: 'أي خاصية ضرورية لإظهار شريط التشغيل والتحكم في وسم <video>؟', en: 'Which attribute displays play/pause controls on a <video> element?' },
      options: {
        ar: ['controls', 'play', 'buttons', 'interface'],
        en: ['controls', 'play', 'buttons', 'interface']
      },
      correctIndex: 0,
      explanation: { ar: 'خاصية controls تجعل المتصفح يظهر أزرار التشغيل والتمرير.', en: 'controls renders browser native UI buttons for multimedia playback.' }
    }
  },
  {
    id: 'html-16',
    courseId: 'html',
    order: 16,
    title: { ar: '16. تضمين الصفحات بالـ Iframe', en: '16. Inline Frames (<iframe>)' },
    difficulty: 'intermediate',
    duration: '12 min',
    explanation: {
      ar: 'وسم <iframe> يُستخدم لتضمين صفحة ويب أو خريطة أو فيديو خارجي (مثل YouTube) داخل صفحتك الحالية. يجب استخدام title و loading="lazy" لتعزيز الأداء وسهولة الوصول.',
      en: 'The <iframe> tag embeds nested documents, maps, or external video players into your page. Always set title and loading="lazy" for performance and a11y.'
    },
    syntax: '<iframe src="https://example.com" title="معاينة الصفحة" width="100%" height="300"></iframe>',
    codeExample: {
      html: `<iframe 
  src="https://www.wikipedia.org" 
  title="موسوعة ويكيبيديا" 
  width="100%" 
  height="250" 
  loading="lazy">
</iframe>`,
      language: 'html',
      description: {
        ar: 'تضمين آمن مع تحميل كسول وعنوان وصفي.',
        en: 'A responsive iframe with accessible title and lazy loading.'
      }
    },
    expectedResult: {
      ar: 'إطار مدمج يعرض الموقع الخارجي داخل مستطيل مخصص في الصفحة.',
      en: 'A bounded viewport displaying the external site within your document.'
    },
    commonMistakes: {
      ar: 'نسيان خاصية title التي تحتاجها قارئات الشاشة لشرح محتوى الإطار.',
      en: 'Leaving out the title attribute, causing screen readers to announce bare URLs.'
    },
    exercise: {
      task: { ar: 'أنشئ إطار iframe يعرض "https://google.com" مع عنوان وصفي.', en: 'Create an iframe embedding a URL with title="Google".' },
      hint: { ar: 'استخدم <iframe src="..." title="...">.', en: 'Use <iframe src="..." title="...">.' },
      solution: `<iframe src="https://google.com" title="محرك بحث جوجل" width="500" height="300"></iframe>`
    },
    miniQuiz: {
      question: { ar: 'ما فائدة الخاصية loading="lazy" في وسوم <img> و <iframe>؟', en: 'What is the benefit of loading="lazy" on images and iframes?' },
      options: {
        ar: ['تأجيل تحميل المحتوى حتى يقترب المستخدم من التمرير إليه لتسريع الصفحة', 'إلغاء تشغيل الجافاسكريبت', 'تغيير ألوان الإطار', 'إغلاق الإطار بعد 5 ثوانٍ'],
        en: ['Defers loading until scrolled into view to optimize initial page speed', 'Disables script execution', 'Alters frame color palettes', 'Automatically closes the frame']
      },
      correctIndex: 0,
      explanation: { ar: 'التحميل الكسول يوفر استهلاك البيانات ويسرع زمن تحميل الموقع الأولي.', en: 'Lazy loading prevents bandwidth waste and accelerates page performance.' }
    }
  },
  {
    id: 'html-17',
    courseId: 'html',
    order: 17,
    title: { ar: '17. خصائص HTML الشاملة (Global Attributes)', en: '17. Global HTML Attributes' },
    difficulty: 'intermediate',
    duration: '14 min',
    explanation: {
      ar: 'الخصائص الشاملة مثل id و class و title و data-* و hidden و tabindex و contenteditable يمكن تطبيقها على أي عنصر HTML لضبط التفاعل والتنسيق والوصول.',
      en: 'Global attributes like id, class, title, data-*, hidden, tabindex, and contenteditable apply to every HTML tag to drive styling and scripting.'
    },
    syntax: '<div id="item-1" class="box" data-category="tech" title="تلميح سريع">...</div>',
    codeExample: {
      html: `<button class="btn" data-role="admin" title="لوحة التحكم الخاصة بالمدير">
  لوحة الإدارة
</button>`,
      language: 'html',
      description: {
        ar: 'زر يحتوي على خاصية data مخصصة وتلميح توضيحي title.',
        en: 'A button decorated with data-role custom metadata and title tooltip.'
      }
    },
    expectedResult: {
      ar: 'عند الوقوف بالفأرة على الزر يظهر تلميح صغير يحتوي على نص title.',
      en: 'Hovering the button reveals a native browser tooltip.'
    },
    commonMistakes: {
      ar: 'استخدام أسماء data غير مسبوقة بـ data- مثل role_custom بدلاً من data-role.',
      en: 'Writing custom attributes without the required data- prefix.'
    },
    exercise: {
      task: { ar: 'أضف خاصية data-level بقيمة "pro" إلى عنصر div.', en: 'Attach data-level="pro" to a div.' },
      hint: { ar: 'اكتب <div data-level="pro">.', en: 'Write <div data-level="pro">.' },
      solution: `<div data-level="pro" class="badge">عضوية احترافية</div>`
    },
    miniQuiz: {
      question: { ar: 'ما هي البادئة القياسية لإنشاء خصائص بيانات مخصصة في HTML5؟', en: 'What is the official prefix for custom data attributes in HTML5?' },
      options: {
        ar: ['data-', 'custom-', 'attr-', 'meta-'],
        en: ['data-', 'custom-', 'attr-', 'meta-']
      },
      correctIndex: 0,
      explanation: { ar: 'كل خصائص البيانات المخصصة تبدأ بـ data- وتُقرأ في JS عبر dataset.', en: 'Custom data attributes must start with data- and map to dataset in JS.' }
    }
  },
  {
    id: 'html-18',
    courseId: 'html',
    order: 18,
    title: { ar: '18. الكيانات والرموز المحجوزة (HTML Entities)', en: '18. HTML Entities' },
    difficulty: 'beginner',
    duration: '10 min',
    explanation: {
      ar: 'الرموز المحجوزة مثل < و > و & لا يمكن كتابتها مباشرة لأن المتصفح يفسرها كوسوم. نستخدم كيانات مثل &lt; (أصغر من)، &gt; (أكبر من)، &amp; (علامة &)، و &copy; (حقوق النشر).',
      en: 'Reserved symbols like <, >, and & conflict with tag syntax. HTML entities like &lt;, &gt;, &amp;, and &copy; safely render these characters.'
    },
    syntax: '&lt;p&gt;نص كود&lt;/p&gt; &copy; 2026',
    codeExample: {
      html: `<p>لكتابة وسم في المتصفح نكتب: &lt;div&gt; &amp; &lt;span&gt;</p>\n<p>&copy; 2026 جميع الحقوق محفوظة.</p>`,
      language: 'html',
      description: {
        ar: 'طباعة وسوم HTML كرموز نصوص عادية في الصفحة.',
        en: 'Safely printing raw tag syntax without browser interpretation.'
      }
    },
    expectedResult: {
      ar: 'يظهر النص <div> & <span> ورمز حقوق النشر © كحروف عادية دون أخطاء.',
      en: 'The text <div> & <span> and © render plainly without parsing issues.'
    },
    commonMistakes: {
      ar: 'نسيان الفاصلة المنقوطة (;) في نهاية الكيان مثل كتابة &copy بدلاً من &copy;.',
      en: 'Forgetting the trailing semicolon, writing &copy instead of &copy;.'
    },
    exercise: {
      task: { ar: 'اطبع جملة: "السعر 5 < 10" مستخدماً كيان أصغر من.', en: 'Print "Price 5 < 10" using the less-than entity.' },
      hint: { ar: 'استخدم &lt;.', en: 'Use &lt;.' },
      solution: `<p>السعر 5 &lt; 10 دراهم</p>`
    },
    miniQuiz: {
      question: { ar: 'ما هو الكيان المستخدم لطباعة رمز حقوق النشر © في HTML؟', en: 'Which HTML entity outputs the copyright symbol ©?' },
      options: {
        ar: ['&copy;', '&copyright;', '&c;', '&rights;'],
        en: ['&copy;', '&copyright;', '&c;', '&rights;']
      },
      correctIndex: 0,
      explanation: { ar: '&copy; هو الكيان القياسي لرمز حقوق النشر.', en: '&copy; is the canonical standard entity for the copyright glyph.' }
    }
  },
  {
    id: 'html-19',
    courseId: 'html',
    order: 19,
    title: { ar: '19. وسوم البيانات الوصفية (Meta Tags)', en: '19. Document Meta Tags' },
    difficulty: 'intermediate',
    duration: '15 min',
    explanation: {
      ar: 'توضع وسوم <meta> داخل <head> لتحديد ترميز المحارف، وضبط التجاوب في الهواتف عبر viewport، ووصف الصفحة لمحركات البحث، وإعداد بطاقات التواصل الاجتماعي (Open Graph).',
      en: 'Meta elements reside in <head> to dictate character encoding, set viewport responsiveness for phones, and supply descriptions for search indexing and social cards.'
    },
    syntax: '<meta name="description" content="وصف دقيق للموقع">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    codeExample: {
      html: `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="أكاديمية تعليم تطوير الويب الحديثة">
  <meta property="og:title" content="WebDev Master">
</head>`,
      language: 'html',
      description: {
        ar: 'أهم وسوم الميتا الأساسية للتجاوب ومحركات البحث.',
        en: 'Indispensable meta tags for mobile scaling and SEO indexing.'
      }
    },
    expectedResult: {
      ar: 'صفحة متجاوبة بنسبة 100% تظهر بمعاينة جميلة عند مشاركة الرابط.',
      en: 'A fully responsive document with rich previews when shared on networks.'
    },
    commonMistakes: {
      ar: 'نسيان سطر viewport مما يجعل الموقع يظهر مصغراً جداً في شاشات الهواتف.',
      en: 'Leaving out viewport meta, causing mobile browsers to render a tiny desktop scale.'
    },
    exercise: {
      task: { ar: 'اكتب سطر ميتا يحدد الكلمات المفتاحية للموقع keywords.', en: 'Write a meta keywords tag with values "html, css, web".' },
      hint: { ar: 'استخدم name="keywords" و content="...".', en: 'Use name="keywords" and content="...".' },
      solution: `<meta name="keywords" content="html, css, git, github, webdev">`
    },
    miniQuiz: {
      question: { ar: 'أي سطر ميتا ضروري لتجاوب الصفحة وعرضها بحجم الشاشة الحقيقي في الهواتف؟', en: 'Which meta tag is required for responsive scaling on mobile screens?' },
      options: {
        ar: ['<meta name="viewport" content="width=device-width, initial-scale=1.0">', '<meta name="mobile" content="true">', '<meta name="screen" content="phone">', '<meta responsive="yes">'],
        en: ['<meta name="viewport" content="width=device-width, initial-scale=1.0">', '<meta name="mobile" content="true">', '<meta name="screen" content="phone">', '<meta responsive="yes">']
      },
      correctIndex: 0,
      explanation: { ar: 'وسم viewport يضبط أبعاد الصفحة مع عرض جهاز المستخدم الحقيقي.', en: 'The viewport meta tag matches page width to physical device display width.' }
    }
  },
  {
    id: 'html-20',
    courseId: 'html',
    order: 20,
    title: { ar: '20. أساسيات تحسين محركات البحث (SEO Basics)', en: '20. HTML SEO Fundamentals' },
    difficulty: 'intermediate',
    duration: '16 min',
    explanation: {
      ar: 'محركات البحث مثل Google تعتمد على هيكل HTML لقراءة المحتوى. المفاتيح الأساسية: عنوان <title> فريد ومعبر، وصف <meta name="description"> جذاب، استخدام h1 واحد، وتضمين نصوص alt للصور ورابط canonical.',
      en: 'Search engine bots read HTML structure to index rankings. Pillars include unique descriptive <title>, engaging meta description, singular h1, image alt text, and canonical URLs.'
    },
    syntax: '<title>تعلم Git و GitHub | الدليل الكامل 2026</title>\n<link rel="canonical" href="https://example.com/git">',
    codeExample: {
      html: `<title>دورة HTML الشاملة للمبتدئين | WebDev Master</title>
<meta name="description" content="تعلم HTML5 من الصفر مع أمثلة عملية وتمارين تفاعلية واختبارات معتمدة.">
<link rel="canonical" href="https://example.com/html-course">`,
      language: 'html',
      description: {
        ar: 'عناصر تحسين محركات البحث في رأس المستند.',
        en: 'SEO document head metadata for optimized search ranking.'
      }
    },
    expectedResult: {
      ar: 'يظهر موقعك بعنوان جذاب ووصف مفصل في نتائج بحث جوجل.',
      en: 'The site displays clean titles and snippets in Google search results.'
    },
    commonMistakes: {
      ar: 'تكرار نفس عنوان <title> في جميع صفحات الموقع أو حشو كلمات مفتاحية عشوائية.',
      en: 'Reusing duplicate <title> text across different pages or keyword stuffing.'
    },
    exercise: {
      task: { ar: 'اكتب عنوان صفحة ووصف ميتا لبورتفوليو مطور واجهات أمامية.', en: 'Craft a title and meta description for a Frontend Portfolio.' },
      hint: { ar: 'استخدم <title> و <meta name="description">.', en: 'Use <title> and <meta name="description">.' },
      solution: `<title>حمزة | مطور واجهات أمامية متخصص في React و CSS</title>\n<meta name="description" content="معرض أعمال مطور واجهات أمامية يضم مشاريع حديثة وسريعة ومتجاوبة.">`
    },
    miniQuiz: {
      question: { ar: 'ما هو الطول المثالي الموصى به لعنوان الصفحة في وسم <title>؟', en: 'What is the optimal recommended character length for <title>?' },
      options: {
        ar: ['بين 50 إلى 60 حرفاً', 'أكثر من 200 حرف', 'حرفان فقط', 'لا قيود أبداً'],
        en: ['Between 50 and 60 characters', 'More than 200 characters', 'Two characters', 'Unlimited arbitrary length']
      },
      correctIndex: 0,
      explanation: { ar: 'العناوين بين 50-60 حرفاً لا يتم اقتطاعها في صفحات نتائج البحث.', en: '50-60 characters fit comfortably without truncation on search result pages.' }
    }
  },
  {
    id: 'html-21',
    courseId: 'html',
    order: 21,
    title: { ar: '21. سهولة الوصول للمستخدمين (Accessibility / a11y)', en: '21. Accessibility Basics (a11y)' },
    difficulty: 'intermediate',
    duration: '16 min',
    explanation: {
      ar: 'إمكانية الوصول (a11y) تضمن أن كل المستخدمين، بما فيهم أصحاب الإعاقات البصرية والحركية، قادرون على تصفح موقعك. ركائزها: التباين اللوني، التنقل بلوحة المفاتيح (Tab)، خصائص ARIA، ونصوص الروابط الواضحة.',
      en: 'Web Accessibility (a11y) ensures persons with disabilities can navigate digital experiences. Focuses on color contrast, keyboard focusability, ARIA landmarks, and descriptive link text.'
    },
    syntax: '<button aria-label="إغلاق النافذة المنبثقة">✕</button>',
    codeExample: {
      html: `<!-- زر أيقونة مع تسمية مقروءة لفاقدي البصر -->
<button aria-label="البحث في الموقع" class="search-btn">
  <svg width="16" height="16"><circle cx="8" cy="8" r="6"/></svg>
</button>`,
      language: 'html',
      description: {
        ar: 'إضافة aria-label للأزرار التي تحتوي أيقونات فقط.',
        en: 'Supplying aria-label for icon-only action controls.'
      }
    },
    expectedResult: {
      ar: 'قارئ الشاشة ينطق بصوت واضح: "البحث في الموقع، زر".',
      en: 'Screen readers vocalize "Search website, button" rather than announcing "unlabeled button".'
    },
    commonMistakes: {
      ar: 'كتابة نصوص روابط مبهمة مثل "اضغط هنا" بدلاً من "تحميل دليل Git كـ PDF".',
      en: 'Writing ambiguous link copy like "click here" instead of "Download Git PDF Handbook".'
    },
    exercise: {
      task: { ar: 'أضف خاصية aria-label لزر حذف الحساب.', en: 'Attach an aria-label to an account deletion button.' },
      hint: { ar: 'اكتب <button aria-label="حذف الحساب نهائياً">.', en: 'Write <button aria-label="حذف الحساب نهائياً">.' },
      solution: `<button aria-label="حذف الحساب نهائياً" class="btn-danger">🗑️</button>`
    },
    miniQuiz: {
      question: { ar: 'متى يجب استخدام خاصية aria-label على عناصر الأزرار؟', en: 'When is aria-label strictly required on interactive buttons?' },
      options: {
        ar: ['عندما يحتوي الزر على أيقونة فقط بدون نص مرئي مفسر', 'فقط في صفحات الهواتف', 'فقط عند استخدام ألوان داكنة', 'لا يُنصح باستخدامها أبداً'],
        en: ['When a button contains only an icon without visible readable text', 'Only on mobile responsive pages', 'Only when applying dark palettes', 'Never recommended']
      },
      correctIndex: 0,
      explanation: { ar: 'aria-label تعوض النقص البصري وتخبر المكفوفين بوظيفة الزر بدقة.', en: 'aria-label provides voice announcements when visible labels are missing.' }
    }
  },
  {
    id: 'html-22',
    courseId: 'html',
    order: 22,
    title: { ar: '22. أفضل الممارسات والمعايير الاحترافية', en: '22. HTML Professional Best Practices' },
    difficulty: 'advanced',
    duration: '15 min',
    explanation: {
      ar: 'كتابة كود HTML نظيف تتطلب: إزاحات منتظمة (Indentation)، كتابة الوسوم والخصائص بحروف صغيرة (lowercase)، إحاطة القيم بعلامات اقتباس مزدوجة، التحقق من صلاحية الكود عبر W3C Validator، وتجنب الوسوم القديمة المنسوخة.',
      en: 'Writing production HTML demands consistent two-space indentation, lowercase tag and attribute names, double quotes for attribute values, valid W3C validation, and zero obsolete tags.'
    },
    syntax: '<div class="card" id="unique-card">\n  <h2>العنوان</h2>\n</div>',
    codeExample: {
      html: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>صفحة متوافقة مع أعلى المعايير</title>
  </head>
  <body>
    <header>
      <nav>
        <a href="#projects">المشاريع</a>
      </nav>
    </header>
  </body>
</html>`,
      language: 'html',
      description: {
        ar: 'مثال لكود HTML نظيف ومنظم وفق أعلى معايير الشركات العالمية.',
        en: 'A clean, validated, production-ready HTML structure.'
      }
    },
    expectedResult: {
      ar: 'كود يمر باختبارات W3C بنسبة نجاح 100% دون أي أخطاء أو تحذيرات.',
      en: 'Valid markup passing W3C lint checks with zero errors.'
    },
    commonMistakes: {
      ar: 'كتابة وسوم بأحرف كبيرة مثل <DIV> أو ترك علامات اقتباس ناقصة.',
      en: 'Writing uppercase markup like <DIV> or unquoted attribute values.'
    },
    exercise: {
      task: { ar: 'صحح هذا الكود: <DIV CLASS=box><P>مرحبا</DIV>', en: 'Fix this invalid markup: <DIV CLASS=box><P>Hello</DIV>' },
      hint: { ar: 'اغلق <p> واجعل الوسوم والخصائص صغيرة مع اقتباسات.', en: 'Close <p> and lowercase tags with double quotes.' },
      solution: `<div class="box">\n  <p>مرحبا</p>\n</div>`
    },
    miniQuiz: {
      question: { ar: 'أي أداة عالمية رسمية يُعتمد عليها للتحقق من خلو كود HTML من الأخطاء؟', en: 'Which official tool validates HTML code against international standards?' },
      options: {
        ar: ['W3C Markup Validation Service', 'Google Analytics', 'GitHub Actions فقط', 'npm install'],
        en: ['W3C Markup Validation Service', 'Google Analytics', 'GitHub Actions only', 'npm install']
      },
      correctIndex: 0,
      explanation: { ar: 'خدمة W3C Validator تفحص مطابقة الكود لمعايير الويب العالمية.', en: 'The W3C Validation Service audits code compliance with W3C specifications.' }
    }
  }
];

// ----------------------------------------------------
// 2. CSS LESSONS (Selected Key Representative Core)
// ----------------------------------------------------
export interface CssLessonSummary {
  id: string;
  order: number;
  title: { ar: string; en: string };
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  category: string;
  explanation: { ar: string; en: string };
  syntax: string;
  codeExample: {
    html: string;
    css: string;
    description: { ar: string; en: string };
  };
  expectedResult: { ar: string; en: string };
  commonMistakes: { ar: string; en: string };
  exercise: {
    task: { ar: string; en: string };
    hint: { ar: string; en: string };
    solution: string;
  };
  miniQuiz: {
    question: { ar: string; en: string };
    options: { ar: string[]; en: string[] };
    correctIndex: number;
    explanation: { ar: string; en: string };
  };
}

export const CSS_LESSONS: CssLessonSummary[] = [
  {
    id: 'css-01',
    order: 1,
    title: { ar: '01. ما هو CSS؟', en: '01. What is CSS?' },
    difficulty: 'beginner',
    duration: '10 min',
    category: 'basics',
    explanation: {
      ar: 'CSS اختصار لـ Cascading Style Sheets (صفحات الأنماط الانسيابية). هي لغة التصميم التي تحول عناصر HTML الخام إلى واجهات بصرية جذابة، متناسقة، ومتجاوبة مع الهواتف والحواسيب.',
      en: 'CSS stands for Cascading Style Sheets. It is the style sheet language responsible for presentation, layout, typography, animations, and responsive scaling.'
    },
    syntax: 'selector {\n  property: value;\n}',
    codeExample: {
      html: `<h1 class="glow-title">مرحباً بك في عالم CSS</h1>`,
      css: `.glow-title {\n  color: #00f0ff;\n  font-size: 28px;\n  text-shadow: 0 0 10px rgba(0, 240, 255, 0.5);\n}`,
      description: {
        ar: 'تلوين العنوان بلون سماوي نيون مع تأثير التوهج الضوئي.',
        en: 'Styling a heading with cyber cyan color and glow drop shadow.'
      }
    },
    expectedResult: {
      ar: 'عنوان أنيق باللون السماوي المشع مع تأثير بصري مستقبلي.',
      en: 'A glowing cyan headline against a dark backdrop.'
    },
    commonMistakes: {
      ar: 'نسيان الفاصلة المنقوطة (;) في نهاية سطر الخاصية.',
      en: 'Omitting the terminating semicolon (;) after property declarations.'
    },
    exercise: {
      task: { ar: 'غير لون الفقرة إلى الأخضر الزمردي #10b981.', en: 'Change the paragraph text color to emerald #10b981.' },
      hint: { ar: 'استخدم color: #10b981;.', en: 'Use color: #10b981;.' },
      solution: `p { color: #10b981; }`
    },
    miniQuiz: {
      question: { ar: 'ماذا تعني كلمة Cascading في اسم CSS؟', en: 'What does "Cascading" signify in Cascading Style Sheets?' },
      options: {
        ar: ['تتابع وانسياب قواعد الأنماط وفق الأولوية والأصل', 'تسريع تحميل الخادم', 'تلوين النصوص تلقائياً', 'إخفاء الأخطاء البرمجية'],
        en: ['How styles flow and override based on specificity and source order', 'Boosting server latency', 'Automatic colorization', 'Hiding runtime bugs']
      },
      correctIndex: 0,
      explanation: { ar: 'الانسياب يعني كيفية حل التعارض بين القواعد وتطبيق النمط ذي الأولوية الأعلى.', en: 'Cascading dictates priority and specificity resolution order.' }
    }
  },
  {
    id: 'css-02',
    order: 2,
    title: { ar: '02. قواعد وصيغة CSS (Syntax)', en: '02. CSS Syntax & Selectors' },
    difficulty: 'beginner',
    duration: '12 min',
    category: 'basics',
    explanation: {
      ar: 'تتكون قاعدة CSS من محدد (Selector)، وقوسين معقوصين { }، وبداخلهما قائمة من الخصائص والقيم المفصولة بنقطتين رأسيتين : ومنتهية بفاصلة منقوطة ;.',
      en: 'A CSS rule consists of a selector pointing to targeted elements, enclosing property-value declarations separated by colons and closed with semicolons.'
    },
    syntax: 'h1 { color: red; font-size: 24px; }',
    codeExample: {
      html: `<p class="lead-text">نص مميز بصنف كلاس في CSS</p>`,
      css: `.lead-text {\n  color: #f43f5e;\n  font-weight: 700;\n  line-height: 1.8;\n}`,
      description: {
        ar: 'قاعدة CSS تستهدف صنف class لتغيير الوزن والارتفاع.',
        en: 'A CSS rule targeting a class to adjust line height and weight.'
      }
    },
    expectedResult: {
      ar: 'نص ذو لون وردي عريض مع تباعد أسطر مريح للقراءة.',
      en: 'Bold rose-colored text with comfortable line spacing.'
    },
    commonMistakes: {
      ar: 'استخدام علامة = بدلاً من النقطتين : بين الخاصية والقيمة.',
      en: 'Using an equal sign = instead of a colon : between property and value.'
    },
    exercise: {
      task: { ar: 'اكتب قاعدة تستهدف كل أزرار button وتجعل خلفيتها زرقاء.', en: 'Target all button elements and set background to blue.' },
      hint: { ar: 'اكتب button { background: blue; }.', en: 'Write button { background: blue; }.' },
      solution: `button {\n  background-color: #0284c7;\n  color: #ffffff;\n}`
    },
    miniQuiz: {
      question: { ar: 'أي رمز يفصل بين اسم الخاصية وقيمتها في CSS؟', en: 'Which symbol separates a CSS property from its assigned value?' },
      options: {
        ar: ['النقطتان الرأسيتان ( : )', 'علامة يساوي ( = )', 'السلاش ( / )', 'النقطة ( . )'],
        en: ['Colon ( : )', 'Equals ( = )', 'Slash ( / )', 'Period ( . )']
      },
      correctIndex: 0,
      explanation: { ar: 'يتم دائماً استخدام النقطتين الرأسيتين مثل: color: blue;.', en: 'Colons always separate the property key from its value.' }
    }
  },
  {
    id: 'css-15',
    order: 15,
    title: { ar: '15. نموذج الصندوق (The CSS Box Model)', en: '15. The CSS Box Model' },
    difficulty: 'intermediate',
    duration: '20 min',
    category: 'layout',
    explanation: {
      ar: 'كل عنصر في صفحة الويب يُعامل كصندوق مستطيل يتكون من أربع طبقات متداخلة من الداخل للخارج: 1. المحتوى (Content)، 2. الحشوة الداخلية (Padding)، 3. الإطار (Border)، 4. الهامش الخارجي (Margin).',
      en: 'Every HTML element is rendered as a box composed of four concentric layers: Content, Padding, Border, and Margin.'
    },
    syntax: '* {\n  box-sizing: border-box;\n}',
    codeExample: {
      html: `<div class="box-card">بطاقة توضح نموذج الصندوق</div>`,
      css: `.box-card {\n  width: 300px;\n  padding: 20px;\n  border: 2px solid #00f0ff;\n  margin: 30px auto;\n  box-sizing: border-box;\n  background: #0f172a;\n  color: #fff;\n}`,
      description: {
        ar: 'تطبيق طبقات نموذج الصندوق مع تفعيل border-box لمنع تمدد الحجم.',
        en: 'Layered Box Model demonstration with border-box layout containment.'
      }
    },
    expectedResult: {
      ar: 'بطاقة في منتصف الصفحة بعرض 300 بكسل بالضبط تشمل الحشوة والإطار.',
      en: 'A centered 300px card where padding and borders remain contained within width.'
    },
    commonMistakes: {
      ar: 'نسيان box-sizing: border-box مما يجعل إضافة padding تزيد من عرض العنصر الكلي وتكسر التخطيط.',
      en: 'Omitting border-box, causing padding to inflate container width and break grids.'
    },
    exercise: {
      task: { ar: 'أنشئ صندوقاً بهامش خارجي 16px وحشوة داخلية 24px.', en: 'Create a box with margin: 16px and padding: 24px.' },
      hint: { ar: 'استخدم padding: 24px; margin: 16px;.', en: 'Use padding: 24px; margin: 16px;.' },
      solution: `.card {\n  margin: 16px;\n  padding: 24px;\n  box-sizing: border-box;\n}`
    },
    miniQuiz: {
      question: { ar: 'ما هي الطبقة الخارجية الشفافة التي تفصل العنصر عن العناصر المجاورة؟', en: 'Which outer layer creates transparent space between adjacent elements?' },
      options: {
        ar: ['Margin (الهامش الخارجي)', 'Padding (الحشوة الداخلية)', 'Border (الإطار)', 'Outline (الحد الخارجي)'],
        en: ['Margin', 'Padding', 'Border', 'Outline']
      },
      correctIndex: 0,
      explanation: { ar: 'Margin هو المسافة الخارجية الفاصلة بين الصناديق.', en: 'Margin generates external breathing space outside container borders.' }
    }
  },
  {
    id: 'css-18',
    order: 18,
    title: { ar: '18. نظام التخطيط المرن (CSS Flexbox)', en: '18. CSS Flexbox Layout' },
    difficulty: 'intermediate',
    duration: '22 min',
    category: 'layout',
    explanation: {
      ar: 'Flexbox هو نظام تخطيط أحادي البعد (1D) مصمم لتوزيع ومحاذاة العناصر على طول محور رئيسي (Main Axis) ومحور عمودي (Cross Axis). مثالي لأشرطة التنقل، البطاقات، والمحاذاة الدقيقة في المنتصف.',
      en: 'Flexbox is a one-dimensional layout model for arranging items along a main axis or cross axis. The industry standard for navbars, pill clusters, and centering.'
    },
    syntax: '.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}',
    codeExample: {
      html: `<nav class="flex-nav">
  <div class="brand">Logo</div>
  <div class="links">
    <a href="#">الرئيسية</a>
    <a href="#">المشاريع</a>
  </div>
</nav>`,
      css: `.flex-nav {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n  background: #1e293b;\n  color: #fff;\n}\n.links { display: flex; gap: 1rem; }`,
      description: {
        ar: 'شريط تنقل متجاوب يوزع الشعار في طرف والروابط في الطرف المقابل.',
        en: 'A responsive flex navbar spacing logo and links at opposing ends.'
      }
    },
    expectedResult: {
      ar: 'شريط أنيق محاذى تماماً بالوسط رأسياً وموزع أفقياً باحترافية.',
      en: 'A horizontal navbar with vertically centered elements and balanced spacing.'
    },
    commonMistakes: {
      ar: 'الخلط بين justify-content (محاذاة المحور الرئيسي) و align-items (محاذاة المحور المتقاطع).',
      en: 'Confusing justify-content (main axis) with align-items (cross axis).'
    },
    exercise: {
      task: { ar: 'اكتب كوداً يضع عنصراً في منتصف الشاشة أفقياً ورأسياً بـ Flexbox.', en: 'Perfectly center a div horizontally and vertically using Flexbox.' },
      hint: { ar: 'استخدم display: flex; justify-content: center; align-items: center;.', en: 'Use display: flex; justify-content: center; align-items: center;.' },
      solution: `.parent {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n}`
    },
    miniQuiz: {
      question: { ar: 'أي خاصية في Flexbox تضيف مسافة موحدة بين العناصر الفرعية دون الحاجة لـ margin؟', en: 'Which property adds uniform gaps between flex children without margin hacks?' },
      options: {
        ar: ['gap', 'space', 'between', 'gutter'],
        en: ['gap', 'space', 'between', 'gutter']
      },
      correctIndex: 0,
      explanation: { ar: 'خاصية gap تضبط المسافات الأفقية والعمودية بين العناصر بنظافة.', en: 'gap specifies clean gutter intervals between flex and grid items.' }
    }
  },
  {
    id: 'css-19',
    order: 19,
    title: { ar: '19. شبكة التخطيط ثنائية الأبعاد (CSS Grid)', en: '19. CSS Grid Layout' },
    difficulty: 'advanced',
    duration: '25 min',
    category: 'layout',
    explanation: {
      ar: 'CSS Grid هو أقوى نظام تخطيط ثنائي الأبعاد (2D) في CSS، يتيح تقسيم الصفحة إلى صفوف وأعمدة متقاطعة بدقة فائقة وبناء شبكات بطاقات متجاوبة تلقائياً باستخدام دالة repeat و minmax.',
      en: 'CSS Grid is a 2D grid-based layout system that orchestrates both rows and columns simultaneously. Ideal for auto-responsive card grids via repeat() and minmax().'
    },
    syntax: '.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1.5rem;\n}',
    codeExample: {
      html: `<div class="cards-grid">
  <div class="card">مشروع HTML</div>
  <div class="card">مشروع CSS</div>
  <div class="card">مشروع Git</div>
</div>`,
      css: `.cards-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 1rem;\n}\n.card {\n  background: #1e293b;\n  padding: 1.5rem;\n  border-radius: 8px;\n  color: #fff;\n}`,
      description: {
        ar: 'شبكة مشاريع تتجاوب وتتغير أعمدتها تلقائياً حسب حجم الشاشة.',
        en: 'An auto-fit responsive project grid resizing dynamically with zero media queries.'
      }
    },
    expectedResult: {
      ar: 'ثلاث بطاقات في صف واحد على الشاشات الكبيرة، تتحول تلقائياً لعمودين أو عمود واحد في الهاتف.',
      en: 'Three columns on desktop folding into one column on phones automatically.'
    },
    commonMistakes: {
      ar: 'كتابة أعمدة ثابتة مثل grid-template-columns: 300px 300px 300px مما يسبب التمرير الأفقي في الموبايل.',
      en: 'Hardcoding rigid pixel column widths causing viewport overflow on mobile devices.'
    },
    exercise: {
      task: { ar: 'أنشئ شبكة من عمودين متساويين بنظام Grid.', en: 'Create a 2-column equal grid.' },
      hint: { ar: 'استخدم grid-template-columns: 1fr 1fr;.', en: 'Use grid-template-columns: 1fr 1fr;.' },
      solution: `.two-col {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n}`
    },
    miniQuiz: {
      question: { ar: 'ماذا تعني وحدة القياس 1fr في CSS Grid؟', en: 'What does the 1fr unit represent in CSS Grid?' },
      options: {
        ar: ['جزء واحد من المساحة المتبقية الحرة في الشبكة (Fractional unit)', 'بكسل واحد ثابت', '1% من ارتفاع الشاشة', 'إطار خط سميك'],
        en: ['One fraction of available remaining free space', 'One fixed pixel', '1% of viewport height', 'Thick border frame']
      },
      correctIndex: 0,
      explanation: { ar: 'fr تعني Fractional Unit وتوزع المساحة الحرة بمرونة تامة.', en: 'fr stands for fractional unit of available container space.' }
    }
  },
  {
    id: 'css-24',
    order: 24,
    title: { ar: '24. التحريك والتأثيرات الحركية (Animations & Keyframes)', en: '24. CSS Animations & Keyframes' },
    difficulty: 'advanced',
    duration: '20 min',
    category: 'effects',
    explanation: {
      ar: 'تتيح قاعدة @keyframes تحريك العناصر عبر مراحل زمنية متعددة من 0% إلى 100%. عند دمجها مع animation، نستطيع إنشاء نبضات ضوئية وتأثيرات RGB النيون المتوهجة.',
      en: 'CSS @keyframes define state sequences over time from 0% to 100%. Paired with the animation property, they generate futuristic pulses, neon shifts, and ambient glows.'
    },
    syntax: '@keyframes pulse {\n  0% { transform: scale(1); }\n  50% { transform: scale(1.05); }\n  100% { transform: scale(1); }\n}\n.element { animation: pulse 2s infinite ease-in-out; }',
    codeExample: {
      html: `<button class="rgb-btn">زر متوهج بحركة نيون</button>`,
      css: `@keyframes rgbBorder {\n  0% { filter: hue-rotate(0deg); }\n  100% { filter: hue-rotate(360deg); }\n}\n.rgb-btn {\n  padding: 12px 24px;\n  background: #0284c7;\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  animation: rgbBorder 4s linear infinite;\n}`,
      description: {
        ar: 'تحريك ألوان الزر المستمر بدورة طيفية كاملة 360 درجة.',
        en: 'A smooth infinite hue-rotation cycling through vibrant color spectra.'
      }
    },
    expectedResult: {
      ar: 'زر يغير درجات ألوانه بنعومة مستمرة وحركة لا نهائية تجذب الانتباه.',
      en: 'A sleek button shifting fluidly across neon gradient tones.'
    },
    commonMistakes: {
      ar: 'تحريك خصائص ثقيلة على المعالج مثل width و top بدلاً من transform و opacity.',
      en: 'Animating geometry layout properties like width/top instead of GPU-accelerated transform/opacity.'
    },
    exercise: {
      task: { ar: 'أنشئ حركة تدوير 360 درجة باسم "spin".', en: 'Build a 360deg continuous spinning keyframe.' },
      hint: { ar: 'استخدم transform: rotate(360deg);.', en: 'Use transform: rotate(360deg);.' },
      solution: `@keyframes spin {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}\n.spinner { animation: spin 1s linear infinite; }`
    },
    miniQuiz: {
      question: { ar: 'أي الخصائص التالية هي الأفضل أداءً وتسريعاً بالمعالج الرسومي (GPU) للتحريك؟', en: 'Which CSS properties deliver the best 60fps GPU compositor animation performance?' },
      options: {
        ar: ['transform و opacity', 'width و height', 'top و left', 'margin و padding'],
        en: ['transform and opacity', 'width and height', 'top and left', 'margin and padding']
      },
      correctIndex: 0,
      explanation: { ar: 'تحريك transform و opacity لا يعيد حساب التخطيط (Layout reflow) مما يضمن سلاسة 60 إطاراً.', en: 'transform and opacity avoid browser layout reflow, ensuring smooth 60fps.' }
    }
  },
  {
    id: 'css-30',
    order: 30,
    title: { ar: '30. استعلامات الوسائط والتصميم المتجاوب (Media Queries)', en: '30. Responsive Design & Media Queries' },
    difficulty: 'advanced',
    duration: '22 min',
    category: 'responsive',
    explanation: {
      ar: 'استعلامات الوسائط @media تسمح بتطبيق قواعد CSS محددة بناءً على حجم شاشة الزائر (مثل الهواتف < 768px أو الشاشات الكبيرة > 1024px)، لضمان مظهر مثالي لكل جهاز.',
      en: 'Media queries (@media) apply conditional CSS rules tailored to viewport width thresholds, delivering seamless layouts across mobile, tablet, and ultra-wide screens.'
    },
    syntax: '@media (max-width: 768px) {\n  .sidebar { display: none; }\n}',
    codeExample: {
      html: `<div class="responsive-box">يتغير لوني حسب حجم شاشتك</div>`,
      css: `.responsive-box {\n  background: #0284c7;\n  padding: 2rem;\n  color: #fff;\n}\n@media (max-width: 640px) {\n  .responsive-box {\n    background: #ec4899; /* وردي على الهاتف */\n    font-size: 14px;\n  }\n}`,
      description: {
        ar: 'تغيير لون وحجم الخط تلقائياً عند تصفح الصفحة من الهاتف.',
        en: 'Conditionally toggling container color and typography on mobile screens.'
      }
    },
    expectedResult: {
      ar: 'الصندوق يكون أزرق على الحاسوب ويتحول لوردي فوري عند تصغير النافذة لحجم الهاتف.',
      en: 'The element renders sky blue on desktop and turns pink when resized to phone width.'
    },
    commonMistakes: {
      ar: 'وضع أبعاد ثابتة بالبكسل للصور والحاويات تمنعها من الانكماش في الشاشات الصغيرة.',
      en: 'Setting hardcoded pixel widths that trigger horizontal scrolling on small screens.'
    },
    exercise: {
      task: { ar: 'اكتب استعلام وسائط يخفي عنصراً اسمه .hide-on-mobile في الشاشات الأقل من 600px.', en: 'Hide .hide-on-mobile on screens narrower than 600px.' },
      hint: { ar: 'استخدم @media (max-width: 600px) { display: none; }.', en: 'Use @media (max-width: 600px) { display: none; }.' },
      solution: `@media (max-width: 600px) {\n  .hide-on-mobile {\n    display: none !important;\n  }\n}`
    },
    miniQuiz: {
      question: { ar: 'ماذا يسمى المبدأ التصميمي الذي يبدأ بالتصميم لشاشة الهاتف أولاً ثم التوسع للحاسوب؟', en: 'What methodology designs for small screens first before scaling upward?' },
      options: {
        ar: ['Mobile-First (الهاتف أولاً)', 'Desktop-Only', 'Fixed-Width', 'Server-Responsive'],
        en: ['Mobile-First', 'Desktop-Only', 'Fixed-Width', 'Server-Responsive']
      },
      correctIndex: 0,
      explanation: { ar: 'نهج Mobile-First يركز على الأولويات في الشاشات الصغيرة باستخدام min-width.', en: 'Mobile-First establishes lean core styles first and scales up with min-width.' }
    }
  }
];

// ----------------------------------------------------
// 3. GIT ALL COMMANDS (Detailed Modules)
// ----------------------------------------------------
export const GIT_COMMANDS: GitCommandDoc[] = [
  // 1. Installation & Config
  {
    id: 'git-version',
    command: 'git --version',
    category: 'config',
    categoryName: { ar: 'التثبيت والإعداد', en: 'Installation & Config' },
    explanation: {
      ar: 'يفحص ما إذا كان برنامج Git مثبتاً على حاسوبك ويعرض رقم الإصدار الحالي.',
      en: 'Checks if Git is installed on your local operating system and displays the current installed version.'
    },
    syntax: 'git --version',
    example: 'git --version',
    terminalOutput: 'git version 2.44.0',
    whenToUse: {
      ar: 'عند إعداد جهاز جديد أو التأكد من نجاح تثبيت Git.',
      en: 'When setting up a developer workstation or verifying installation.'
    },
    commonMistakes: {
      ar: 'كتابة git version بمسافة واحدة أو شرطة واحدة بدلاً من شرطتين --.',
      en: 'Typing a single hyphen -version instead of double hyphens --version.'
    }
  },
  {
    id: 'git-config-name',
    command: 'git config --global user.name "Your Name"',
    category: 'config',
    categoryName: { ar: 'التثبيت والإعداد', en: 'Installation & Config' },
    explanation: {
      ar: 'يضبط اسمك الشخصي الذي سيظهر في سجل كل الـ Commits التي ستقوم بها في جميع مشاريع حاسوبك.',
      en: 'Configures your human author name attached globally to every commit you make across repositories.'
    },
    syntax: 'git config --global user.name "<Your Name>"',
    example: 'git config --global user.name "Hamza Alami"',
    terminalOutput: '# لا يظهر مخرج عند النجاح (Silent success)',
    whenToUse: {
      ar: 'مرة واحدة فقط عند تثبيت Git لأول مرة في الحاسوب.',
      en: 'Run once when configuring Git for the first time on a machine.'
    },
    commonMistakes: {
      ar: 'نسيان وضع الاسم بين علامتي اقتباس مزدوجة عند وجود مسافات بين الاسم واللقب.',
      en: 'Leaving out quotes when your full name contains whitespace.'
    }
  },
  {
    id: 'git-config-email',
    command: 'git config --global user.email "your@email.com"',
    category: 'config',
    categoryName: { ar: 'التثبيت والإعداد', en: 'Installation & Config' },
    explanation: {
      ar: 'يحدد بريدك الإلكتروني المرتبط بتعديلاتك. يجب أن يطابق بريدك المسجل في حساب GitHub لتظهر مساهماتك الخضراء.',
      en: 'Sets your author email address. Must match your GitHub account email to link contribution graph squares.'
    },
    syntax: 'git config --global user.email "<email>"',
    example: 'git config --global user.email "hamza@example.com"',
    terminalOutput: '# يتم الحفظ بنجاح داخل ملف .gitconfig في مسار المستخدم',
    whenToUse: {
      ar: 'إلزامي بعد تثبيت Git لربط مساهماتك بهويتك الرقمية.',
      en: 'Mandatory initial setup so remote hosting platforms attribute your commits.'
    },
    commonMistakes: {
      ar: 'استخدام بريد غير مسجل على GitHub مما يجعل مساهماتك تظهر كمستخدم مجهول.',
      en: 'Using an email differing from your GitHub profile, breaking contribution streaks.'
    }
  },
  {
    id: 'git-config-list',
    command: 'git config --list',
    category: 'config',
    categoryName: { ar: 'التثبيت والإعداد', en: 'Installation & Config' },
    explanation: {
      ar: 'يعرض جميع إعدادات Git الحالية المسجلة في النظام والملفات المحلية.',
      en: 'Dumps all active Git configuration key-value pairs across system and local scopes.'
    },
    syntax: 'git config --list',
    example: 'git config --list',
    terminalOutput: 'user.name=Hamza Alami\nuser.email=hamza@example.com\ncore.editor=code --wait\ninit.defaultBranch=main',
    whenToUse: {
      ar: 'للتحقق من صحة الاسم والبريد والإعدادات الافتراضية.',
      en: 'To inspect and audit configured author identity, default branch names, and editor settings.'
    },
    commonMistakes: {
      ar: 'الارتباك عند فتح النتيجة في محرر نصوص طرفي (اضغط حرف q للخروج).',
      en: 'Getting trapped in terminal pager output; press "q" to exit back to shell prompt.'
    }
  },

  // 2. Starting a Project
  {
    id: 'git-init',
    command: 'git init',
    category: 'start',
    categoryName: { ar: 'بدء المشروع', en: 'Starting a Project' },
    explanation: {
      ar: 'يحول المجلد العادي الحالي إلى مستودع Git محلي بإنشاء مجلد مخفي اسمه .git لتسجيل التعديلات وتاريخ المشروع.',
      en: 'Initializes a local Git repository in the current folder by generating a hidden .git metadata database directory.'
    },
    syntax: 'git init',
    example: 'git init',
    terminalOutput: 'Initialized empty Git repository in /home/user/portfolio/.git/',
    whenToUse: {
      ar: 'في بداية أي مشروع برمجي جديد في حاسوبك.',
      en: 'At the inception of any new web project before writing or committing code.'
    },
    commonMistakes: {
      ar: 'تشغيل git init في المجلد الرئيسي للحاسوب (مثل Desktop أو Downloads أو C:/) مما يراقب كل ملفات جهازك بالخطأ!',
      en: 'Executing git init inside root directories like Desktop or User home, accidentally tracking personal files.'
    }
  },
  {
    id: 'git-clone',
    command: 'git clone <repository-url>',
    category: 'start',
    categoryName: { ar: 'بدء المشروع', en: 'Starting a Project' },
    explanation: {
      ar: 'ينسخ مستودعاً كاملاً موجوداً على الإنترنت (مثل GitHub) مع كل ملفاته وتاريخه وفروعه إلى مجلد في جهازك.',
      en: 'Clones an entire remote repository from GitHub down to your local machine, preserving all historical commits.'
    },
    syntax: 'git clone <url>',
    example: 'git clone https://github.com/facebook/react.git',
    terminalOutput: 'Cloning into \'react\'...\nremote: Enumerating objects: 12050, done.\nReceiving objects: 100% (12050/12050), done.',
    whenToUse: {
      ar: 'عند الرغبة في العمل على مشروع موجود مسبقاً أو الانضمام لمشروع فريق.',
      en: 'When downloading an existing codebase to contribute or start local development.'
    },
    commonMistakes: {
      ar: 'تشغيل الأمر داخل مستودع Git آخر موجود مسبقاً (مما يسبب تداخلاً غير مرغوب).',
      en: 'Cloning inside an already initialized Git repo without intending to create submodules.'
    }
  },
  {
    id: 'git-status',
    command: 'git status',
    category: 'start',
    categoryName: { ar: 'بدء المشروع', en: 'Starting a Project' },
    explanation: {
      ar: 'الأمر الأهم على الإطلاق! يفحص حالة الملفات: ما هي الملفات المعدلة، ما الذي تم تجهيزه (Staged)، وما هي الملفات غير المراقبة.',
      en: 'The single most vital command: displays the state of working tree, staged index, and untracked changes.'
    },
    syntax: 'git status',
    example: 'git status',
    terminalOutput: 'On branch main\nChanges not staged for commit:\n  modified:   style.css\n\nUntracked files:\n  index.html',
    whenToUse: {
      ar: 'باستمرار قبل وبعد كل أمر git add أو commit لمعرفة ما الذي يحدث بدقة.',
      en: 'Constantly before and after staging to verify exactly what files changed.'
    },
    commonMistakes: {
      ar: 'تجاهل قراءة تفاصيل رسالة git status التي تقدم دائماً إرشادات الحل لأي مشكلة.',
      en: 'Failing to read status hints, which explicitly tell you how to stage or restore files.'
    }
  },

  // 3. Staging and Commits
  {
    id: 'git-add-all',
    command: 'git add .',
    category: 'staging',
    categoryName: { ar: 'التجهيز والتوثيق', en: 'Staging & Commits' },
    explanation: {
      ar: 'ينقل جميع الملفات المعدلة والجديدة في المجلد الحالي إلى منطقة التجهيز (Staging Area) تمهيداً لحفظها.',
      en: 'Stages all new, modified, and deleted files in current directory to the index staging area.'
    },
    syntax: 'git add .',
    example: 'git add .',
    terminalOutput: '# لا يظهر مخرج مباشر (استخدم git status للتحقق)',
    whenToUse: {
      ar: 'عند إكمال ميزة أو تعديل وتريد تجهيز كل الملفات للـ commit التالي.',
      en: 'When you are ready to bundle all ongoing modifications into the upcoming commit.'
    },
    commonMistakes: {
      ar: 'استخدام git add . دون وجود ملف .gitignore مما يؤدي لرفع ملفات حساسة أو مجلد node_modules!',
      en: 'Staging all files without a .gitignore, unintentionally staging node_modules or secret .env keys.'
    }
  },
  {
    id: 'git-commit-m',
    command: 'git commit -m "Initial commit"',
    category: 'staging',
    categoryName: { ar: 'التجهيز والتوثيق', en: 'Staging & Commits' },
    explanation: {
      ar: 'يوثق لقطة زمنية دائمة للملفات الموجودة في الـ Staging Area مع رسالة واضحة تصف ما قمت بإنجازه.',
      en: 'Permanently records a snapshot of staged changes into project history with an explanatory message.'
    },
    syntax: 'git commit -m "<commit-message>"',
    example: 'git commit -m "feat: build responsive portfolio grid and navbar"',
    terminalOutput: '[main 3a8b41e] feat: build responsive portfolio grid and navbar\n 2 files changed, 85 insertions(+)',
    whenToUse: {
      ar: 'عند الانتهاء من جزء منطقي كامل ومترابط من الكود يشتغل بدون أخطاء.',
      en: 'Whenever you complete a cohesive, functional unit of work ready for documentation.'
    },
    commonMistakes: {
      ar: 'كتابة رسائل مبهمة وغير مفيدة مثل "fix" أو "update" أو "test123".',
      en: 'Writing useless vague messages like "update", "asdasd", or "fixed stuff".'
    }
  },
  {
    id: 'git-log-oneline',
    command: 'git log --oneline',
    category: 'staging',
    categoryName: { ar: 'التجهيز والتوثيق', en: 'Staging & Commits' },
    explanation: {
      ar: 'يعرض سجل التغييرات التاريخية بشكل مضغوط ومختصر؛ كل commit في سطر واحد مع معرف الـ Hash والرسالة.',
      en: 'Displays historical commit logs in a compact one-line summary featuring short hashes and messages.'
    },
    syntax: 'git log --oneline',
    example: 'git log --oneline -n 5',
    terminalOutput: '7b2a19c feat: add interactive quiz\n4c8e11a fix: correct mobile navbar alignment\n1f09e22 feat: setup HTML document structure',
    whenToUse: {
      ar: 'لمراجعة آخر التعديلات بسرعة ومعرفة معرفات الـ Commits السابقة للرجوع إليها.',
      en: 'Quickly scanning recent commits to locate hashes for checkout, cherry-pick, or revert.'
    },
    commonMistakes: {
      ar: 'الارتباك إذا كان السجل طويلاً؛ تذكر أن مفتاح Q يخرجك فوراً للطرفية.',
      en: 'Panicking when git log enters paging mode; simply press "q" to return.'
    }
  },
  {
    id: 'git-diff',
    command: 'git diff',
    category: 'staging',
    categoryName: { ar: 'التجهيز والتوثيق', en: 'Staging & Commits' },
    explanation: {
      ar: 'يقارن التعديلات الحالية في مساحة العمل مع آخر commit، ويوضح بدقة الأسطر المحذوفة (بالأحمر) والمضافة (بالأخضر).',
      en: 'Compares active unstaged modifications against the latest commit, revealing exact line additions and deletions.'
    },
    syntax: 'git diff',
    example: 'git diff style.css',
    terminalOutput: '@@ -14,3 +14,5 @@\n-  background: red;\n+  background: #0284c7;\n+  border-radius: 8px;',
    whenToUse: {
      ar: 'قبل تنفيذ git add للتأكد من التغييرات وتفادي إضافة أسطر تجريبية بالخطأ.',
      en: 'Before staging, to audit your work and verify no rogue debugging console logs remain.'
    },
    commonMistakes: {
      ar: 'عدم معرفة أن git diff لا يعرض الملفات التي تم تجهيزها بـ git add (استخدم git diff --staged لها).',
      en: 'Expecting git diff to show staged files; you must pass --staged for index changes.'
    }
  },

  // 4. Branches
  {
    id: 'git-branch',
    command: 'git branch',
    category: 'branch',
    categoryName: { ar: 'الفروع (Branches)', en: 'Branching' },
    explanation: {
      ar: 'يسرد جميع الفروع المحلية في مشروعك ويضع نجمة ولوناً أخضر بجانب الفرع النشط حالياً.',
      en: 'Lists all local branches, highlighting the currently checked-out active branch with an asterisk.'
    },
    syntax: 'git branch',
    example: 'git branch',
    terminalOutput: '* main\n  feature-dark-mode\n  fix-navbar',
    whenToUse: {
      ar: 'لمعرفة الفرع الذي تعمل عليه حالياً قبل البدء في كتابة كود جديد.',
      en: 'Before starting a new feature, to confirm your active workspace branch.'
    },
    commonMistakes: {
      ar: 'كتابة كود ميزة تجريبية مباشرة في الفرع الرئيسي main بدلاً من إنشاء فرع معزول.',
      en: 'Committing risky experimental code directly onto main branch instead of feature branches.'
    }
  },
  {
    id: 'git-switch-c',
    command: 'git switch -c <branch-name>',
    category: 'branch',
    categoryName: { ar: 'الفروع (Branches)', en: 'Branching' },
    explanation: {
      ar: 'الطريقة الحديثة لإنشاء فرع جديد والانتقال إليه فوراً في خطوة واحدة (بديل لأمر git checkout -b القديم).',
      en: 'The modern command to create a new branch and immediately switch into it in a single step.'
    },
    syntax: 'git switch -c <name>',
    example: 'git switch -c feature-quiz-timer',
    terminalOutput: 'Switched to a new branch \'feature-quiz-timer\'',
    whenToUse: {
      ar: 'في كل مرة تبدأ فيها بتطوير ميزة جديدة أو إصلاح عطل في مشروعك.',
      en: 'Every time you embark on a new feature, isolation experiment, or bug patch.'
    },
    commonMistakes: {
      ar: 'تضمين مسافات في اسم الفرع مثل "feature quiz"؛ استخدم الشرطة "feature-quiz".',
      en: 'Placing spaces in branch names; use dashes or slashes like feature/quiz.'
    }
  },
  {
    id: 'git-branch-delete',
    command: 'git branch -d <branch-name>',
    category: 'branch',
    categoryName: { ar: 'الفروع (Branches)', en: 'Branching' },
    explanation: {
      ar: 'يحذف فرعاً محلياً تم دمجه بالفعل بأمان للتنظيف والتخلص من الفروع المنتهية.',
      en: 'Safely deletes a local branch that has already been merged into upstream.'
    },
    syntax: 'git branch -d <name>',
    example: 'git branch -d feature-navbar',
    terminalOutput: 'Deleted branch feature-navbar (was 4c8e11a).',
    whenToUse: {
      ar: 'بعد دمج الميزة بنجاح في فرع main لتنظيم شجرة الفروع.',
      en: 'Housekeeping after a feature branch is safely merged into main.'
    },
    commonMistakes: {
      ar: 'محاولة حذف الفرع أثناء وقوفك عليه؛ يجب الانتقال إلى فرع main أولاً ثم حذفه.',
      en: 'Trying to delete the branch you are actively standing on; switch out first.'
    }
  },
  {
    id: 'git-branch-force-delete',
    command: 'git branch -D <branch-name>',
    category: 'branch',
    categoryName: { ar: 'الفروع (Branches)', en: 'Branching' },
    isDestructive: true,
    safetyWarning: {
      ar: 'تحذير أمان: هذا الأمر يحذف الفرع بالقوة حتى لو احتوى على تعديلات لم يتم دمجها، وقد تفقد كودك نهائياً!',
      en: 'Safety Warning: Forces immediate deletion of a branch even if unmerged. Any unmerged commits may be permanently lost!'
    },
    explanation: {
      ar: 'حذف إجباري وقسري لفرع ما حتى لو كان يحتوي على تعديلات غير مدموجة.',
      en: 'Forcefully purges a branch regardless of unmerged commit status.'
    },
    syntax: 'git branch -D <name>',
    example: 'git branch -D abandoned-feature',
    terminalOutput: 'Deleted branch abandoned-feature (was 90bf12a).',
    whenToUse: {
      ar: 'فقط عندما تكون واثقاً 100% أنك تريد التخلص نهائياً من تجربة فاشلة.',
      en: 'Only when you deliberately intend to discard an aborted experiment.'
    },
    commonMistakes: {
      ar: 'استخدام -D الكبيرة بدلاً من -d الصغيرة عن طريق الخطأ وضياع شغل أيام.',
      en: 'Defaulting to uppercase -D out of habit and losing unmerged work.'
    }
  },

  // 5. Merging
  {
    id: 'git-merge',
    command: 'git merge <branch-name>',
    category: 'merge',
    categoryName: { ar: 'الدمج (Merging)', en: 'Merging' },
    explanation: {
      ar: 'يدمج التعديلات والـ Commits الموجودة في فرع آخر داخل الفرع الذي تقف عليه حالياً.',
      en: 'Integrates commits and file histories from the specified target branch into your current active branch.'
    },
    syntax: 'git merge <name>',
    example: 'git checkout main && git merge feature-auth',
    terminalOutput: 'Updating 3a8b41e..7b2a19c\nFast-forward\n auth.html | 45 ++++++++++\n 1 file changed, 45 insertions(+)',
    whenToUse: {
      ar: 'عند اكتمال ميزة في فرعها وتريد دمجها داخل الفرع الرئيسي للمشروع.',
      en: 'When a feature branch passes testing and is ready to unify into main.'
    },
    commonMistakes: {
      ar: 'نسيان عمل commit لكل التعديلات العالقة قبل البدء في عملية الدمج.',
      en: 'Attempting to merge while your working tree has uncommitted dirty changes.'
    }
  },
  {
    id: 'git-merge-abort',
    command: 'git merge --abort',
    category: 'merge',
    categoryName: { ar: 'الدمج (Merging)', en: 'Merging' },
    explanation: {
      ar: 'طوق النجاة عند حدوث تعارض (Merge Conflict)! يلغي عملية الدمج الحالية ويعيد المشروع لما كان عليه قبل الدمج تماماً.',
      en: 'Emergency lifesaver during merge conflicts: aborts the merge and reverts the branch back to pre-merge state.'
    },
    syntax: 'git merge --abort',
    example: 'git merge --abort',
    terminalOutput: '# يعود المشروع لحالته النظيفة السابقة قبل محاولة الدمج',
    whenToUse: {
      ar: 'عند حدوث تعارض معقد في الدمج وتريد التراجع عنه بهدوء لمراجعته لاحقاً.',
      en: 'When a merge conflict gets chaotic and you want a clean reset to re-evaluate.'
    },
    commonMistakes: {
      ar: 'الخوف وحذف المجلد بالكامل عند حدوث تعارض، بينما git merge --abort تحل الأمر بثانية واحدة!',
      en: 'Deleting the local folder in panic instead of executing git merge --abort.'
    }
  },

  // 6. Remote Repositories
  {
    id: 'git-remote-add',
    command: 'git remote add origin <repository-url>',
    category: 'remote',
    categoryName: { ar: 'المستودعات البعيدة', en: 'Remote Repositories' },
    explanation: {
      ar: 'يربط مستودعك المحلي بمستودع سحابي بعيد على GitHub ويطلق عليه الاسم القياسي origin.',
      en: 'Links your local repository to a remote host repository (GitHub) under the alias "origin".'
    },
    syntax: 'git remote add origin <url>',
    example: 'git remote add origin https://github.com/username/portfolio.git',
    terminalOutput: '# يتم تسجيل الرابط في ملف إعدادات المستودع',
    whenToUse: {
      ar: 'مرة واحدة فقط عند ربط مشروع محلي جديد بمستودع تم إنشاؤه على GitHub.',
      en: 'Once when initially bridging a local repository to a freshly created GitHub remote.'
    },
    commonMistakes: {
      ar: 'الخطأ "fatal: remote origin already exists"؛ يعني أنك قمت بربطه سابقاً، استخدم git remote set-url لتعديله.',
      en: 'Seeing fatal: remote origin already exists; use git remote set-url if changing URLs.'
    }
  },
  {
    id: 'git-push-u-main',
    command: 'git push -u origin main',
    category: 'remote',
    categoryName: { ar: 'المستودعات البعيدة', en: 'Remote Repositories' },
    explanation: {
      ar: 'يرفع الكود والـ Commits لأول مرة إلى GitHub، مع ضبط التتبع التلقائي (-u) لترفع مستقبلاً بأمر git push فقط.',
      en: 'Pushes commits to the remote GitHub repo and establishes upstream tracking (-u) for shorthand future pushes.'
    },
    syntax: 'git push -u origin <branch>',
    example: 'git push -u origin main',
    terminalOutput: 'Enumerating objects: 15, done.\nTo https://github.com/user/portfolio.git\n * [new branch]      main -> main\nBranch \'main\' set up to track remote branch \'main\' from \'origin\'.',
    whenToUse: {
      ar: 'عند رفع المشروع لأول مرة بعد ربطه بالسحابة.',
      en: 'First time uploading a branch to GitHub to link local and remote histories.'
    },
    commonMistakes: {
      ar: 'تسمية الفرع master محلياً بينما اسمه على GitHub هو main، تأكد من git branch -M main أولاً.',
      en: 'Mismatching branch names (e.g. pushing local master to remote main).'
    }
  },
  {
    id: 'git-pull',
    command: 'git pull origin main',
    category: 'remote',
    categoryName: { ar: 'المستودعات البعيدة', en: 'Remote Repositories' },
    explanation: {
      ar: 'يجلب أحدث التعديلات والـ Commits الموجودة على GitHub ويدمجها فوراً في جهازك المحلي.',
      en: 'Fetches the newest commits from GitHub and immediately merges them into your active local workspace.'
    },
    syntax: 'git pull origin <branch>',
    example: 'git pull origin main',
    terminalOutput: 'Updating 3a8b41e..7b2a19c\nFast-forward\n index.html | 12 +++++++++++-\n 1 file changed, 11 insertions(+), 1 deletion(-)',
    whenToUse: {
      ar: 'في بداية يوم العمل، أو قبل رفع تعديلاتك إذا كان هناك أعضاء آخرون في الفريق عدلوا المشروع.',
      en: 'At the start of your workday or before pushing, to stay synchronized with teammates.'
    },
    commonMistakes: {
      ar: 'عمل git pull بينما لديك ملفات محلية معدلة غير محفوظة في commit مما قد يسبب تعارضاً.',
      en: 'Pulling with dirty uncommitted local files, risking messy merge conflicts.'
    }
  },

  // 7. Undoing Changes
  {
    id: 'git-restore-file',
    command: 'git restore <file>',
    category: 'undo',
    categoryName: { ar: 'التراجع والإنقاذ', en: 'Undoing Changes' },
    isDestructive: true,
    safetyWarning: {
      ar: 'تحذير: هذا الأمر يلغي تعديلاتك في الملف ويعيده لآخر commit، ولا يمكن استرجاع ما كتبته بعد تنفيذه!',
      en: 'Safety Warning: Discards all uncommitted changes in the specified file, reverting to latest commit state irreversibly.'
    },
    explanation: {
      ar: 'يلغي كل التعديلات غير المحفوظة في ملف محدد ويعيده فوراً لحالته في آخر commit سليم.',
      en: 'Discards uncommitted local edits in a single file, restoring it to the clean committed version.'
    },
    syntax: 'git restore <file>',
    example: 'git restore index.html',
    terminalOutput: '# يعود الملف لحالته النظيفة السابقة فوراً',
    whenToUse: {
      ar: 'عندما تخرب ملفاً وتدرك أن التعديلات غير صالحة وتريد العودة لحالته الأصلية بسرعة.',
      en: 'When experimental changes break a file and you want to cleanly revert it.'
    },
    commonMistakes: {
      ar: 'تشغيله على ملف يحتوي على كود كنت ترغب في الاحتفاظ به دون أخذ نسخة احتياطية.',
      en: 'Running it before stashing or backing up code you might still want.'
    }
  },
  {
    id: 'git-revert',
    command: 'git revert <commit-id>',
    category: 'undo',
    categoryName: { ar: 'التراجع والإنقاذ', en: 'Undoing Changes' },
    explanation: {
      ar: 'الطريقة الآمنة والأكثر احترافية لإلغاء commit قديم؛ يقوم بإنشاء commit جديد يعكس التعديلات دون تدمير التاريخ السابق.',
      en: 'The safest, professional way to cancel a commit: creates a new commit that undoes the target commit while preserving history.'
    },
    syntax: 'git revert <hash>',
    example: 'git revert 7b2a19c',
    terminalOutput: '[main 9f1234c] Revert "feat: broken animation"\n 1 file changed, 5 deletions(-)',
    whenToUse: {
      ar: 'لإلغاء ميزة تم رفعها بالفعل إلى GitHub دون التلاعب بسجل الـ Git ومشاركة الفريق.',
      en: 'When rolling back commits already pushed to shared remotes without rewriting Git history.'
    },
    commonMistakes: {
      ar: 'استخدام git reset --hard على فروع مشتركة بدلاً من git revert الآمن.',
      en: 'Using destructive git reset on shared branches instead of cooperative git revert.'
    }
  },

  // 8. Stash
  {
    id: 'git-stash',
    command: 'git stash',
    category: 'stash',
    categoryName: { ar: 'التخبئة المؤقتة (Stash)', en: 'Git Stash' },
    explanation: {
      ar: 'يخبئ كل تعديلاتك غير المكتملة في درج سري مؤقت ويعيد المجلد نظيفاً لتتمكن من تغيير الفرع أو عمل pull.',
      en: 'Temporarily shelves dirty uncommitted changes into a stack, leaving you with a clean working copy.'
    },
    syntax: 'git stash',
    example: 'git stash',
    terminalOutput: 'Saved working directory and index state WIP on main: 7b2a19c feat: portfolio',
    whenToUse: {
      ar: 'عندما يطلب منك زميلك فحص مشكلة طارئة في فرع آخر وأنت في منتصف عمل غير مكتمل.',
      en: 'When you must quickly switch branches to fix a bug without committing half-baked code.'
    },
    commonMistakes: {
      ar: 'نسيان استرجاع التعديلات المخبأة لاحقاً والظن أن الكود قد فُقد.',
      en: 'Forgetting that edits are stored in the stash stack and panicking that code vanished.'
    }
  },
  {
    id: 'git-stash-pop',
    command: 'git stash pop',
    category: 'stash',
    categoryName: { ar: 'التخبئة المؤقتة (Stash)', en: 'Git Stash' },
    explanation: {
      ar: 'يستخرج آخر تعديلات خبأتها من الدرج ويطبقها مجدداً على كودك الحالي ويحذفها من الـ Stash.',
      en: 'Reapplies the most recently stashed changes onto your working directory and removes them from stash list.'
    },
    syntax: 'git stash pop',
    example: 'git stash pop',
    terminalOutput: 'On branch feature-navbar\nChanges not staged for commit:\n  modified:   style.css\nDropped refs/stash@{0} (a123f...)',
    whenToUse: {
      ar: 'بعد العودة إلى فرعك وتريد مواصلة عملك الذي كنت قد خبأته.',
      en: 'When returning to your original branch to resume where you left off.'
    },
    commonMistakes: {
      ar: 'تطبيق التعديلات في فرع غير صحيح يختلف عن الفرع الذي خبأتها منه.',
      en: 'Popping stashed edits into the wrong branch, causing unintended merge collisions.'
    }
  },

  // 9. Other Useful Commands
  {
    id: 'git-reflog',
    command: 'git reflog',
    category: 'advanced',
    categoryName: { ar: 'أوامر متقدمة ومنقذة', en: 'Advanced Commands' },
    explanation: {
      ar: 'الصندوق الأسود المنقذ لحياتك البرمجية! يسجل كل حركة قام بها رأس المؤشر HEAD، ويمكنك من استرجاع أي commit حتى لو حذفته بالخطأ.',
      en: 'The black box flight recorder: tracks every HEAD movement, enabling recovery of orphaned and deleted commits.'
    },
    syntax: 'git reflog',
    example: 'git reflog -n 5',
    terminalOutput: '7b2a19c HEAD@{0}: commit: fix navbar\n4c8e11a HEAD@{1}: checkout: moving from main to dev\n1f09e22 HEAD@{2}: commit: initial',
    whenToUse: {
      ar: 'عندما تشعر أنك حذفت شيئاً بالخطأ وتريد معرفة الـ Hash لاستعادته.',
      en: 'When you mistakenly reset --hard or deleted a branch and need its SHA hash.'
    },
    commonMistakes: {
      ar: 'عدم معرفة وجود هذا الأمر الرائع والاستسلام لضياع الكود.',
      en: 'Not knowing reflog exists and re-writing hours of lost work from scratch.'
    }
  }
];

// ----------------------------------------------------
// 4. GITHUB LESSONS (25 Lessons)
// ----------------------------------------------------
export interface GitHubLesson {
  id: string;
  order: number;
  title: { ar: string; en: string };
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  explanation: { ar: string; en: string };
  keyConcepts: { ar: string[]; en: string[] };
  practicalWorkflow: { ar: string; en: string };
  bestPractices: { ar: string; en: string };
}

export const GITHUB_LESSONS: GitHubLesson[] = [
  {
    id: 'gh-01',
    order: 1,
    title: { ar: '01. ما هو GitHub؟', en: '01. What is GitHub?' },
    difficulty: 'beginner',
    duration: '10 min',
    explanation: {
      ar: 'GitHub هو أكبر منصة سحابية في العالم لاستضافة ومشاركة مستودعات كود Git، مملوك لشركة Microsoft، ويضم أكثر من 100 مليون مطور حول العالم.',
      en: 'GitHub is the premier cloud-based hosting platform for Git repositories, owned by Microsoft, uniting over 100M developers worldwide.'
    },
    keyConcepts: {
      ar: ['استضافة سحابية للمشاريع', 'النسخ الاحتياطي عن بعد', 'شبكة التواصل المهني للمبرمجين', 'البرمجيات مفتوحة المصدر (Open Source)'],
      en: ['Cloud repository hosting', 'Remote offsite backups', 'Professional developer social graph', 'Open Source ecosystem']
    },
    practicalWorkflow: {
      ar: 'تكتب الكود محلياً بـ Git ثم ترفعه إلى GitHub لتوثيق خبرتك ومشاركتها مع العالم.',
      en: 'Code locally with Git CLI, then push to GitHub to showcase your technical footprint.'
    },
    bestPractices: {
      ar: 'اجعل حسابك على GitHub واجهتك الاحترافية وسيرتك الذاتية الحقيقية.',
      en: 'Treat your GitHub profile as your public living engineering portfolio.'
    }
  },
  {
    id: 'gh-02',
    order: 2,
    title: { ar: '02. الفرق الجوهري بين Git و GitHub', en: '02. Git vs GitHub' },
    difficulty: 'beginner',
    duration: '12 min',
    explanation: {
      ar: 'Git هو أداة طرفية محلية في جهازك (محرك السيارة) لتسجيل التعديلات بدون إنترنت. أما GitHub فهو المنصة السحابية على الويب (الطريق السريع ومرآب السيارات) التي تستقبل كود Git لتخزينه ونشره.',
      en: 'Git is a local command-line version control engine that works offline. GitHub is the cloud platform that hosts Git repos online for collaboration and web deployment.'
    },
    keyConcepts: {
      ar: ['Git يعمل بدون إنترنت محلياً', 'GitHub يتطلب اتصالاً سحابياً', 'Git مفتوح المصدر أنشأه لينوس تورفالدس', 'GitHub خدمة سحابية تقدم ميزات Pull Requests و Pages'],
      en: ['Git operates 100% offline locally', 'GitHub requires cloud connectivity', 'Git was authored by Linus Torvalds', 'GitHub provides PRs, Issues, and Pages']
    },
    practicalWorkflow: {
      ar: 'Git يوثق اللقطات في مجلد .git، و GitHub يعرضها في واجهة رسومية جميلة لزملائك والشركات.',
      en: 'Git tracks hashes in your local .git folder; GitHub presents them visually in browser UI.'
    },
    bestPractices: {
      ar: 'لا تخلط بينهما في المقابلات التقنية؛ Git أداة تحكم بالإصدارات، و GitHub خدمة استضافة سحابية.',
      en: 'Never conflate the two: Git is the VCS tool; GitHub is the cloud hosting platform.'
    }
  },
  {
    id: 'gh-05',
    order: 5,
    title: { ar: '05. إنشاء مستودع جديد (Repository)', en: '05. Creating a Repository' },
    difficulty: 'beginner',
    duration: '10 min',
    explanation: {
      ar: 'المستودع (Repository أو Repo) هو المجلد السحابي الذي يحتوي على كل ملفات مشروعك وتاريخ تعديلاتها، مع ملف README.md تعريفي وملف ترخيص License.',
      en: 'A repository (repo) is the cloud directory housing your project files, branch trees, commit timelines, README, and licensing metadata.'
    },
    keyConcepts: {
      ar: ['اسم المستودع (Repo Name)', 'الوصف المختصر (Description)', 'عام (Public) مقابل خاص (Private)', 'تهيئة بـ README'],
      en: ['Repo naming standards', 'Concise description', 'Public vs Private visibility', 'Initialize with README']
    },
    practicalWorkflow: {
      ar: 'الضغط على زر + في GitHub ➔ New Repository ➔ كتابة اسم المشروع ➔ إنشاء ➔ ربطه بالمستودع المحلي.',
      en: 'Click + in GitHub ➔ New Repository ➔ Assign name ➔ Create ➔ Link with git remote add origin.'
    },
    bestPractices: {
      ar: 'استخدم أسماء واضحة باللغة الإنجليزية مفصولة بشرطات مثل my-portfolio أو modern-landing-page.',
      en: 'Use lowercase kebab-case naming like modern-portfolio or weather-app.'
    }
  },
  {
    id: 'gh-13',
    order: 13,
    title: { ar: '13. طلبات السحب ومراجعة الكود (Pull Requests)', en: '13. Pull Requests & Code Reviews' },
    difficulty: 'intermediate',
    duration: '18 min',
    explanation: {
      ar: 'طلب السحب (Pull Request أو PR) هو الطريقة القياسية عالمياً لمراجعة الأكواد ومناقشتها في الفرق قبل دمج ميزة جديدة في الفرع الرئيسي main.',
      en: 'A Pull Request (PR) proposes merging code changes from a feature branch into main, enabling team line-by-line code reviews and CI checks.'
    },
    keyConcepts: {
      ar: ['مراجعة الكود سطراً بسطر', 'التعليقات التوجيهية', 'اجتياز الفحوصات التلقائية (CI)', 'الموافقة (Approve) والدمج (Merge)'],
      en: ['Line-by-line review', 'Review comments and discussions', 'Passing automated CI checks', 'Approval and squash/merge']
    },
    practicalWorkflow: {
      ar: 'رفع الفرع ➔ فتح PR على GitHub ➔ فحص الفروقات ➔ طلب المراجعة من زميلك ➔ الضغط على Merge Pull Request.',
      en: 'Push branch ➔ Open PR on GitHub ➔ Review diffs ➔ Request team approval ➔ Merge.'
    },
    bestPractices: {
      ar: 'اكتب وصفاً مفصلاً للتعديلات وأرفق لقطات شاشة (Screenshots) للواجهة في وصف الـ PR.',
      en: 'Provide a clear summary of modifications with UI before/after screenshots in PR description.'
    }
  },
  {
    id: 'gh-16',
    order: 16,
    title: { ar: '16. ملف التوثيق والواجهة (README.md)', en: '16. Mastering README.md' },
    difficulty: 'beginner',
    duration: '15 min',
    explanation: {
      ar: 'ملف README.md المكتوب بصيغة Markdown هو البوابة الأولى والواجهة التعريفية لمشروعك؛ يشرح فكرة المشروع، كيفية تشغيله محلياً، والتقنيات المستخدمة.',
      en: 'The README.md file written in Markdown is the primary documentation doorway for your project, explaining purpose, installation, and tech stack.'
    },
    keyConcepts: {
      ar: ['صيغة Markdown (عناوين، روابط، كود)', 'صور وشارات المعاينة (Badges)', 'خطوات التشغيل المحلي (npm run dev)', 'رابط المعاينة الحية'],
      en: ['Markdown syntax (headers, links, code blocks)', 'Shield badges and live previews', 'Local setup instructions', 'Live Demo URL']
    },
    practicalWorkflow: {
      ar: 'إنشاء ملف اسمه README.md في المجلد الرئيسي للمشروع وملؤه بالأقسام القياسية.',
      en: 'Create README.md at repo root with sections: Description, Features, Tech Stack, Setup.'
    },
    bestPractices: {
      ar: 'كل مشروع في معرض أعمالك يجب أن يحتوي على README احترافي وصورة واضحة للواجهة ورابط للتجربة.',
      en: 'Every portfolio repository must have an immaculate README with live demo link and screenshot.'
    }
  },
  {
    id: 'gh-17',
    order: 17,
    title: { ar: '17. ملف الاستبعاد والحماية (.gitignore)', en: '17. The .gitignore File' },
    difficulty: 'intermediate',
    duration: '14 min',
    explanation: {
      ar: 'ملف .gitignore يحدد الملفات والمجلدات التي يجب على Git تجاهلها تماماً وعدم رفعها، مثل المفاتيح السرية (.env) ومجلدات المكتبات الثقيلة (node_modules).',
      en: 'The .gitignore file specifies intentional untracked files that Git should ignore, shielding secrets (.env) and massive dependency folders (node_modules).'
    },
    keyConcepts: {
      ar: ['حماية الأسرار ومفاتيح الـ API', 'منع رفع مجلدات المكتبات node_modules', 'استبعاد ملفات النظام المؤقتة (.DS_Store)', 'استخدام النجوم والأنماط (*.log)'],
      en: ['Shielding API secrets and keys', 'Preventing bloated node_modules uploads', 'Ignoring OS artifacts (.DS_Store)', 'Wildcard patterns (*.log)']
    },
    practicalWorkflow: {
      ar: 'إنشاء ملف .gitignore قبل أول commit وكتابة node_modules/ و .env بداخله.',
      en: 'Create .gitignore prior to your first commit and declare node_modules and .env.'
    },
    bestPractices: {
      ar: 'لا ترفع ملفات .env التي تحتوي على مفاتيح سرية مطلقاً إلى GitHub، حتى في المستودعات الخاصة!',
      en: 'Never commit .env files containing API keys or database credentials to GitHub.'
    }
  },
  {
    id: 'gh-19',
    order: 19,
    title: { ar: '19. نشر المواقع مجاناً عبر GitHub Pages', en: '19. Deploying with GitHub Pages' },
    difficulty: 'intermediate',
    duration: '15 min',
    explanation: {
      ar: 'GitHub Pages هي خدمة استضافة مواقع ويب ثابتة مجانية مباشرة من مستودعك، تنشر ملفات HTML و CSS و JS على نطاق عالمي فوري مثل username.github.io/repo.',
      en: 'GitHub Pages hosts static websites directly from your repository, publishing HTML, CSS, and JS onto a global secure URL like username.github.io/repo.'
    },
    keyConcepts: {
      ar: ['استضافة سحابية مجانية مدى الحياة', 'شهادة أمان HTTPS تلقائية', 'النشر من فرع main ومسار /root', 'التحديث التلقائي عند كل git push'],
      en: ['Free lifelong static hosting', 'Automatic free HTTPS SSL certificate', 'Deploy from main branch /root', 'Automatic redeployment on git push']
    },
    practicalWorkflow: {
      ar: 'رفع ملف index.html ➔ الذهاب لـ Settings ➔ Pages ➔ اختيار Branch: main ومجلد /root ➔ الضغط على Save ➔ الحصول على الرابط الحي.',
      en: 'Push index.html ➔ Settings ➔ Pages ➔ Select main branch & /root folder ➔ Save ➔ Visit live URL.'
    },
    bestPractices: {
      ar: 'تأكد أن الملف الرئيسي اسمه بالضبط index.html بحروف صغيرة ليتعرف عليه الخادم تلقائياً.',
      en: 'Ensure your root entry file is strictly named index.html in lowercase.'
    }
  }
];
