import React from 'react';
import { GUIDE_METADATA, CHAPTERS } from '../data/guideContent';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { Printer, Check, ArrowRight, Download, BookOpen, Layers, Terminal } from 'lucide-react';

interface PdfDocumentViewProps {
  onPrint: () => void;
}

export const PdfDocumentView: React.FC<PdfDocumentViewProps> = ({ onPrint }) => {
  return (
    <div className="pdf-document-root max-w-4xl mx-auto my-6 bg-white text-slate-900 shadow-xl rounded-2xl overflow-hidden border border-slate-200 print:border-0 print:shadow-none print:m-0 print:max-w-none print:rounded-none">
      
      {/* Non-print action banner */}
      <div className="no-print bg-slate-900 text-white p-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-sky-400" />
          <span className="text-sm font-semibold">
            معاينة كتاب الـ PDF المنظم (جاهز للطباعة والتحميل الفوري كملف PDF)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onPrint}
            className="flex items-center gap-1.5 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة / حفظ كـ PDF (Save as PDF)</span>
          </button>
        </div>
      </div>

      <div className="p-8 sm:p-12 print:p-0 space-y-12 print:space-y-0">
        
        {/* ================= PAGE 1: COVER PAGE ================= */}
        <div className="min-h-[920px] print:min-h-[1050px] flex flex-col justify-between p-8 border border-slate-200 print:border-none rounded-xl print:rounded-none bg-radial from-slate-50 to-white page-break">
          {/* Header Tag */}
          <div className="flex justify-between items-center text-xs font-mono text-slate-500 border-b border-slate-200 pb-3">
            <span>WEBDEV-MASTER-HANDBOOK · 2026</span>
            <span>وثيقة تدريبية أكاديمية</span>
          </div>

          {/* Title Area */}
          <div className="my-auto py-8">
            <span className="inline-block text-xs font-bold text-sky-700 bg-sky-100 px-3 py-1 rounded mb-4">
              دليل المهندس الشامل لأساسيات الويب
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight mb-3">
              {GUIDE_METADATA.title}
            </h1>
            <p className="text-base sm:text-lg font-medium text-slate-600 font-sans mb-6" dir="ltr">
              {GUIDE_METADATA.englishTitle}
            </p>
            <p className="text-sm text-slate-700 leading-relaxed max-w-2xl mb-8">
              {GUIDE_METADATA.subtitle}
            </p>

            {/* Generated Cover Image */}
            <div className="rounded-xl overflow-hidden border border-slate-300 shadow-sm max-w-xl mx-auto my-6 bg-slate-950">
              <img
                src={GUIDE_METADATA.coverImage}
                alt="Web Development Architecture Ecosystem"
                className="w-full h-auto object-cover max-h-[300px]"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Core Modules Covered */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center my-6">
              <div className="p-3 bg-slate-100 rounded-lg border border-slate-200">
                <p className="text-xs text-slate-500">الوحدة 01</p>
                <p className="text-sm font-bold text-slate-800">HTML5 & CSS3</p>
              </div>
              <div className="p-3 bg-slate-100 rounded-lg border border-slate-200">
                <p className="text-xs text-slate-500">الوحدة 02</p>
                <p className="text-sm font-bold text-slate-800">Git & GitHub</p>
              </div>
              <div className="p-3 bg-slate-100 rounded-lg border border-slate-200">
                <p className="text-xs text-slate-500">الوحدة 03</p>
                <p className="text-sm font-bold text-slate-800">Portfolio</p>
              </div>
              <div className="p-3 bg-slate-100 rounded-lg border border-slate-200">
                <p className="text-xs text-slate-500">الوحدة 04</p>
                <p className="text-sm font-bold text-slate-800">16 Quiz + التصحيح</p>
              </div>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-200 pt-4">
            <span>{GUIDE_METADATA.author}</span>
            <span>{GUIDE_METADATA.version}</span>
            <span>الصفحة 1 من 9</span>
          </div>
        </div>

        {/* ================= PAGE 2: TABLE OF CONTENTS ================= */}
        <div className="min-h-[920px] print:min-h-[1050px] p-8 border border-slate-200 print:border-none rounded-xl print:rounded-none bg-white page-break flex flex-col justify-between">
          <div>
            <div className="border-b-2 border-slate-900 pb-3 mb-6">
              <h2 className="text-2xl font-bold text-slate-900">فهرس المحتويات وخريطة الدليل</h2>
              <p className="text-xs text-slate-500">منظومة متكاملة لربط المفاهيم النظرية بالتطبيق العملي</p>
            </div>

            <div className="space-y-4">
              {CHAPTERS.map((ch, idx) => (
                <div key={ch.id} className="flex items-start justify-between p-3.5 bg-slate-50 rounded-lg border border-slate-200/80">
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-sm font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded">
                      {ch.number}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{ch.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{ch.summary}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-400 font-semibold">
                    صفحة {idx + 3}
                  </span>
                </div>
              ))}

              <div className="flex items-start justify-between p-3.5 bg-sky-50 rounded-lg border border-sky-200">
                <div className="flex items-start gap-3">
                  <span className="font-mono text-sm font-bold text-sky-700 bg-sky-200/80 px-2 py-0.5 rounded">
                    06
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-sky-950">بنك أسئلة الـ Quiz مع التصحيح والتعليلات الكاملة</h3>
                    <p className="text-xs text-sky-800 mt-0.5">16 سؤالاً تطبيقياً مع الإجابات النموذجية وشرح بالدارجة والفصحى</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-sky-700 font-semibold">
                  صفحة 8 و 9
                </span>
              </div>
            </div>

            {/* Quick Summary Box */}
            <div className="mt-8 p-4 bg-slate-100 rounded-lg border border-slate-300">
              <h4 className="text-xs font-bold text-slate-800 mb-1">الهدف التعليمي الأساسي لهذا الدليل:</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                الانتقال من مرحلة التشتت بين الأدوات إلى مرحلة الوضوح التام: معرفة لماذا نحتاج كلاً من HTML و CSS، وكيف يسجل Git تاريخ التعديلات في حاسوبك، وكيف يتيح GitHub تخزينها ونشر موقع البورتفوليو الخاص بك مجاناً للعالم دون الحاجة لأي خوادم مدفوعة.
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-200 pt-4">
            <span>فهرس المحتويات</span>
            <span>الصفحة 2 من 9</span>
          </div>
        </div>

        {/* ================= PAGE 3: CHAPTER 1 (HTML & CSS) ================= */}
        <div className="min-h-[920px] print:min-h-[1050px] p-8 border border-slate-200 print:border-none rounded-xl print:rounded-none bg-white page-break flex flex-col justify-between">
          <div>
            <div className="border-b-2 border-sky-600 pb-3 mb-6">
              <span className="text-xs font-mono font-bold text-sky-600">الفصل الأول · 01</span>
              <h2 className="text-2xl font-bold text-slate-900">HTML و CSS: البنية والمظهر</h2>
              <p className="text-xs text-slate-500">عظام الصفحة وهيكلها الدلالي مع تنسيقات CSS العصرية</p>
            </div>

            {/* Content Sections */}
            <div className="space-y-6">
              <div className="avoid-break">
                <h3 className="text-base font-bold text-slate-900 mb-2">1. ما هو HTML؟ (الهيكل والأساس)</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
                  HTML (HyperText Markup Language) هي لغة التوصيف المسؤولة عن محتوى وعناصر الصفحة.
                  بالدارجة المغربية: هي <strong>الساس والعظام ديال السيت</strong>؛ كتحط فيها العناوين، الفقرات، التصاور، والفورموليرات.
                </p>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  <strong>الوسوم الدلالية (Semantic HTML5): </strong>
                  تفضيل الوسوم الدلالية مثل <code className="bg-slate-200 px-1 py-0.5 rounded">&lt;header&gt;</code> و <code className="bg-slate-200 px-1 py-0.5 rounded">&lt;nav&gt;</code> و <code className="bg-slate-200 px-1 py-0.5 rounded">&lt;main&gt;</code> و <code className="bg-slate-200 px-1 py-0.5 rounded">&lt;section&gt;</code> على الوسم العام <code className="bg-slate-200 px-1 py-0.5 rounded">&lt;div&gt;</code> يجعل الموقع مفهوماً لمحركات البحث وقارئات الشاشة.
                </div>
              </div>

              <div className="avoid-break">
                <h3 className="text-base font-bold text-slate-900 mb-2">2. ما هو CSS؟ (التنسيق والتجاوب والجمالية)</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
                  CSS (Cascading Style Sheets) هي لغة التصميم التي تحول الهيكل الخام إلى موقع جذاب.
                  بالدارجة المغربية: هي <strong>الفينيسيون والصباغة والديكور</strong>؛ كتعطي الألوان، كتقاد المسافات، وكتخلي السيت يجي متناسق فالحاسوب والهاتف (Responsive).
                </p>
                
                <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <strong className="block text-slate-900 mb-1">Flexbox (بعد واحد)</strong>
                    <p className="text-slate-600">مثالي للأشرطة العلوية، محاذاة الأزرار، وتوزيع العناصر في صف واحد أو عمود.</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <strong className="block text-slate-900 mb-1">CSS Grid (بعدين)</strong>
                    <p className="text-slate-600">مثالي لشبكات بطاقات المشاريع وتخطيطات الصفحات الكاملة المعقدة.</p>
                  </div>
                </div>

                {/* Code snippet */}
                <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-xs overflow-x-auto text-left" dir="ltr">
                  <div className="text-slate-400 text-[10px] mb-2 border-b border-slate-800 pb-1">/* أهم قاعدة لضبط التخطيط وتفادي انكسار العناصر */</div>
                  <pre>{`* {
  box-sizing: border-box; /* الحشوة والإطار ضمن العرض */
  margin: 0;
  padding: 0;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}`}</pre>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-200 pt-4">
            <span>الفصل 01: HTML & CSS</span>
            <span>الصفحة 3 من 9</span>
          </div>
        </div>

        {/* ================= PAGE 4: CHAPTER 2 (GIT & GITHUB) ================= */}
        <div className="min-h-[920px] print:min-h-[1050px] p-8 border border-slate-200 print:border-none rounded-xl print:rounded-none bg-white page-break flex flex-col justify-between">
          <div>
            <div className="border-b-2 border-emerald-600 pb-3 mb-6">
              <span className="text-xs font-mono font-bold text-emerald-600">الفصل الثاني · 02</span>
              <h2 className="text-2xl font-bold text-slate-900">Git و GitHub: التحكم في الإصدارات والسحابة</h2>
              <p className="text-xs text-slate-500">حفظ تاريخ الكود والتعاون البرمجي ونشر المواقع مجاناً</p>
            </div>

            <div className="space-y-6">
              <div className="avoid-break">
                <h3 className="text-base font-bold text-slate-900 mb-2">1. ما هو Git؟ (آلة الزمن للكود في جهازك)</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
                  Git هو نظام تحكم في الإصدارات موزع (VCS) يعمل محلياً في حاسوبك دون الحاجة للإنترنت. يقوم بتسجيل كل تعديل في شكل لقطات زمنية تسمى <strong>Commits</strong>.
                </p>
                
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-950 mb-3">
                  <strong>المناطق الثلاث في Git: </strong>
                  1. مساحة العمل (Working Directory) ← 2. منطقة التجهيز (Staging Area عبر git add) ← 3. المستودع المحلي (Repository عبر git commit).
                </div>
              </div>

              <div className="avoid-break">
                <h3 className="text-base font-bold text-slate-900 mb-2">2. ما هو GitHub؟ (السحابة والنشر والمجتمع)</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
                  GitHub هو منصة سحابية مملوكة لمايكروسوفت تستضيف مستودعات Git عبر الإنترنت. يتيح النسخ الاحتياطي السحابي، العمل الجماعي في فرق برمجية، وتوفير استضافة مجانية عبر <strong>GitHub Pages</strong>.
                </p>

                {/* Git Commands Block */}
                <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-xs overflow-x-auto text-left" dir="ltr">
                  <div className="text-emerald-400 text-[10px] mb-2 border-b border-slate-800 pb-1"># سير الأوامر المباشر لرفع مشروعك لـ GitHub</div>
                  <pre>{`git init                          # بدء مستودع محلي
git add .                         # تجهيز كل التعديلات
git commit -m "feat: portfolio"   # حفظ لقطة مع رسالة وصفية
git branch -M main                # ضبط اسم الفرع الرئيسي
git remote add origin <URL>       # ربطه بمستودع GitHub
git push -u origin main           # رفع الكود للسحابة`}</pre>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700">
                <strong>نشر الموقع عبر GitHub Pages: </strong>
                بعد رفع ملفات HTML و CSS، اذهب إلى:
                <code className="bg-slate-200 px-1 py-0.5 rounded mx-1">Settings &gt; Pages</code>
                واختر فرع <code className="bg-slate-200 px-1 py-0.5 rounded">main</code>، وخلال دقيقة واحدة ستحصل على رابط حي ومجاني لموقعك!
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-200 pt-4">
            <span>الفصل 02: Git & GitHub</span>
            <span>الصفحة 4 من 9</span>
          </div>
        </div>

        {/* ================= PAGE 5: CHAPTER 3 (PORTFOLIO) ================= */}
        <div className="min-h-[920px] print:min-h-[1050px] p-8 border border-slate-200 print:border-none rounded-xl print:rounded-none bg-white page-break flex flex-col justify-between">
          <div>
            <div className="border-b-2 border-indigo-600 pb-3 mb-6">
              <span className="text-xs font-mono font-bold text-indigo-600">الفصل الثالث · 03</span>
              <h2 className="text-2xl font-bold text-slate-900">Portfolio: بناء معرض أعمال احترافي يقنع الشركات</h2>
              <p className="text-xs text-slate-500">الهيكل الذهبي ونماذج إبراز المشاريع لإقناع مسؤولي التوظيف</p>
            </div>

            <div className="space-y-6">
              <div className="avoid-break">
                <h3 className="text-base font-bold text-slate-900 mb-2">1. ما هو البورتفوليو ولماذا هو أهم من سيرتك الذاتية؟</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
                  البورتفوليو هو موقع الويب الشخصي الذي يعرض عينات حقيقية من كودك ومشاريعك. في المقابلات التقنية، فحص مشروع حي يشتغل ورؤية كود نظيف على GitHub يعطي دليلاً قاطعاً على كفاءتك يفوق عشرات الشهادات الورقية.
                </p>
              </div>

              <div className="avoid-break">
                <h3 className="text-base font-bold text-slate-900 mb-2">2. الأقسام الخمسة الأساسية لأي بورتفوليو ناجح</h3>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <strong className="text-indigo-900">1. قسم الترحيب (Hero Section): </strong>
                    عنوان واضح يحدد تخصصك (Frontend Web Developer) مع زر CTA مباشر: "شاهد مشاريعي".
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <strong className="text-indigo-900">2. قسم من أنا (About Me): </strong>
                    فقرة مركزة توضح خلفيتك وشغفك بحل المشكلات البرمجية، بدون نصوص فلسفية طويلة.
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <strong className="text-indigo-900">3. قسم المهارات (Technical Skills): </strong>
                    تصنيف المهارات (HTML5, CSS3, Responsive Design, Git) دون نسب مئوية غير علمية.
                  </div>
                  <div className="p-2.5 bg-indigo-50 border border-indigo-200 rounded-lg">
                    <strong className="text-indigo-900">4. قسم المشاريع البارزة (Featured Projects): </strong>
                    3 إلى 5 مشاريع قوية. كل مشروع يجب أن يحتوي على صورة للشاشة، وصف مختصر، رابط المعاينة الحية (Live Demo)، ورابط الكود على GitHub.
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <strong className="text-indigo-900">5. قسم التواصل (Contact): </strong>
                    بريدك الإلكتروني، حسابك على LinkedIn وحسابك على GitHub.
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
                <strong>نصيحة ذهبية للتوظيف: </strong>
                المطور الجيد هو من يتأكد أن موقعه متجاوب بنسبة 100% مع الهواتف الذكية وسريع التحميل (أقل من ثانيتين). مسؤولو التوظيف يفتحون الروابط غالباً من هواتفهم!
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-200 pt-4">
            <span>الفصل 03: Portfolio</span>
            <span>الصفحة 5 من 9</span>
          </div>
        </div>

        {/* ================= PAGE 6: CHAPTER 4 (COMPARISON & INTEGRATION) ================= */}
        <div className="min-h-[920px] print:min-h-[1050px] p-8 border border-slate-200 print:border-none rounded-xl print:rounded-none bg-white page-break flex flex-col justify-between">
          <div>
            <div className="border-b-2 border-slate-900 pb-3 mb-6">
              <span className="text-xs font-mono font-bold text-slate-600">الفصل الرابع · 04</span>
              <h2 className="text-2xl font-bold text-slate-900">الفروقات الجوهرية ودورة العمل المتكاملة</h2>
              <p className="text-xs text-slate-500">المقارنة الشاملة وكيف تعمل الأدوات معاً من الصفر حتى النشر</p>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-xs text-right border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 font-bold">
                    <th className="p-2 border border-slate-200">الأداة</th>
                    <th className="p-2 border border-slate-200">المجال</th>
                    <th className="p-2 border border-slate-200">مكان العمل</th>
                    <th className="p-2 border border-slate-200">المهمة الجوهرية</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-2 font-bold text-sky-700 border border-slate-200">HTML</td>
                    <td className="p-2 border border-slate-200">بنية المحتوى</td>
                    <td className="p-2 border border-slate-200">المتصفح</td>
                    <td className="p-2 border border-slate-200">بناء هيكل الصفحة الدلالي والعناصر الأساسية</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-blue-700 border border-slate-200">CSS</td>
                    <td className="p-2 border border-slate-200">التصميم والعرض</td>
                    <td className="p-2 border border-slate-200">المتصفح</td>
                    <td className="p-2 border border-slate-200">تجميل الصفحة وتحديد التخطيط والتجاوب مع الشاشات</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-emerald-700 border border-slate-200">Git</td>
                    <td className="p-2 border border-slate-200">نظام إدارة النسخ</td>
                    <td className="p-2 border border-slate-200">محلياً بالحاسوب</td>
                    <td className="p-2 border border-slate-200">تسجيل التعديلات واللقطات (Commits) والتفريع</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-purple-700 border border-slate-200">GitHub</td>
                    <td className="p-2 border border-slate-200">منصة سحابية</td>
                    <td className="p-2 border border-slate-200">السحابة (Web)</td>
                    <td className="p-2 border border-slate-200">حفظ الكود عن بعد والمشاركة والاستضافة المجانية</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-amber-700 border border-slate-200">Portfolio</td>
                    <td className="p-2 border border-slate-200">المعرض النهائي</td>
                    <td className="p-2 border border-slate-200">GitHub Pages</td>
                    <td className="p-2 border border-slate-200">إثبات الخبرة البرمجية وجلب فرص التوظيف والعمل الحر</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Workflow Pipeline */}
            <div className="avoid-break bg-slate-50 border border-slate-300 rounded-xl p-4">
              <h3 className="text-sm font-bold text-slate-900 mb-3">دورة العمل الحقيقية خطوة بخطوة:</h3>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-[10px]">1</span>
                  <span><strong>الكتابة (Code): </strong>تبني هيكل الصفحة بـ HTML وتنسق المظهر بـ CSS داخل VS Code.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">2</span>
                  <span><strong>التوثيق (Git): </strong>تحفظ نسخة آمنة في جهازك عبر <code className="bg-slate-200 px-1 py-0.5 rounded">git add .</code> ثم <code className="bg-slate-200 px-1 py-0.5 rounded">git commit -m "..."</code>.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-[10px]">3</span>
                  <span><strong>الرفع (GitHub): </strong>ترفع الكود للسحابة بأمر <code className="bg-slate-200 px-1 py-0.5 rounded">git push origin main</code> لحمايته وإتاحته للجميع.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-[10px]">4</span>
                  <span><strong>النشر (GitHub Pages): </strong>تفعّل النشر بضغطة زر ليصبح معرض أعمالك متاحاً برابط رسمي عام.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-200 pt-4">
            <span>الفصل 04: المقارنة ودورة العمل</span>
            <span>الصفحة 6 من 9</span>
          </div>
        </div>

        {/* ================= PAGE 7: CHAPTER 5 (CODE EXAMPLES) ================= */}
        <div className="min-h-[920px] print:min-h-[1050px] p-8 border border-slate-200 print:border-none rounded-xl print:rounded-none bg-white page-break flex flex-col justify-between">
          <div>
            <div className="border-b-2 border-slate-900 pb-3 mb-6">
              <span className="text-xs font-mono font-bold text-slate-600">الفصل الخامس · 05</span>
              <h2 className="text-2xl font-bold text-slate-900">أمثلة الكود العملية وورقة أوامر Git</h2>
              <p className="text-xs text-slate-500">أكواد نظيفة وقابلة للنسخ المباشر في مشاريعك الشخصية</p>
            </div>

            <div className="space-y-4">
              <div className="avoid-break">
                <h3 className="text-xs font-bold text-slate-900 mb-1">هيكل البورتفوليو المصغر (index.html):</h3>
                <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-[11px] overflow-x-auto text-left" dir="ltr">
                  <pre>{`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>بورتفوليو المطور</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <header><nav><a href="#projects">مشاريعي</a></nav></header>
  <main>
    <section class="hero">
      <h1>مطور واجهات أمامية</h1>
      <p>أبني مواقع وتطبيقات ويب سريعة بـ HTML و CSS الحديثة.</p>
      <a href="#projects" class="btn">شاهد الأعمال</a>
    </section>
  </main>
</body>
</html>`}</pre>
                </div>
              </div>

              <div className="avoid-break">
                <h3 className="text-xs font-bold text-slate-900 mb-1">ورقة غش سريعة لأهم أوامر Git:</h3>
                <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-[11px] overflow-x-auto text-left" dir="ltr">
                  <pre>{`git init                      # بدء مراقبة المجلد محلياً
git status                    # فحص حالة وتغيرات الملفات
git add .                     # تجهيز الملفات للـ Commit
git commit -m "feat: navbar"  # حفظ اللقطة مع رسالة
git branch -M main            # تحديد الفرع الافتراضي
git remote add origin <URL>   # ربط مستودع GitHub
git push -u origin main       # رفع الكود لأول مرة
git pull origin main          # جلب أحدث التعديلات`}</pre>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-200 pt-4">
            <span>الفصل 05: أمثلة الكود</span>
            <span>الصفحة 7 من 9</span>
          </div>
        </div>

        {/* ================= PAGE 8 & 9: CHAPTER 6 (QUIZ & CORRECTIONS) ================= */}
        <div className="min-h-[920px] print:min-h-[1050px] p-8 border border-slate-200 print:border-none rounded-xl print:rounded-none bg-white page-break flex flex-col justify-between">
          <div>
            <div className="border-b-2 border-amber-600 pb-3 mb-6">
              <span className="text-xs font-mono font-bold text-amber-600">الفصل السادس · 06 (الجزء الأول)</span>
              <h2 className="text-2xl font-bold text-slate-900">بنك أسئلة الـ Quiz مع التصحيح والتعليل</h2>
              <p className="text-xs text-slate-500">الأسئلة من 1 إلى 8 مع الإجابات النموذجية والشرح المفصل</p>
            </div>

            <div className="space-y-4">
              {QUIZ_QUESTIONS.slice(0, 8).map((q) => (
                <div key={q.id} className="avoid-break p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900">سؤال {q.id}: {q.question}</span>
                    <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-600">{q.categoryName}</span>
                  </div>
                  <div className="text-emerald-700 font-semibold mb-1">
                    ✓ الإجابة الصحيحة: {q.options[q.correctIndex]}
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    <strong>التعليل والتصحيح: </strong>{q.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-200 pt-4">
            <span>الفصل 06: Quiz (1 - 8)</span>
            <span>الصفحة 8 من 9</span>
          </div>
        </div>

        {/* Page 9: Quiz Part 2 */}
        <div className="min-h-[920px] print:min-h-[1050px] p-8 border border-slate-200 print:border-none rounded-xl print:rounded-none bg-white page-break flex flex-col justify-between">
          <div>
            <div className="border-b-2 border-amber-600 pb-3 mb-6">
              <span className="text-xs font-mono font-bold text-amber-600">الفصل السادس · 06 (الجزء الثاني)</span>
              <h2 className="text-2xl font-bold text-slate-900">بنك أسئلة الـ Quiz مع التصحيح والتعليل</h2>
              <p className="text-xs text-slate-500">الأسئلة من 9 إلى 16 مع الإجابات النموذجية والنصائح المهنية</p>
            </div>

            <div className="space-y-4">
              {QUIZ_QUESTIONS.slice(8, 16).map((q) => (
                <div key={q.id} className="avoid-break p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900">سؤال {q.id}: {q.question}</span>
                    <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-600">{q.categoryName}</span>
                  </div>
                  <div className="text-emerald-700 font-semibold mb-1">
                    ✓ الإجابة الصحيحة: {q.options[q.correctIndex]}
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed mb-1">
                    <strong>التعليل والتصحيح: </strong>{q.explanation}
                  </p>
                  <p className="text-amber-800 text-[10px]">
                    <strong>نصيحة المطور: </strong>{q.tip}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-200 pt-4">
            <span>الفصل 06: Quiz (9 - 16) · نهاية الدليل</span>
            <span>الصفحة 9 من 9</span>
          </div>
        </div>

      </div>
    </div>
  );
};
