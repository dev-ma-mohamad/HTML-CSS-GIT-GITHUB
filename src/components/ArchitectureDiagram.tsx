import React, { useState } from 'react';
import { Code, GitBranch, Cloud, Globe, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface Step {
  id: string;
  number: string;
  title: string;
  tech: string;
  role: string;
  darija: string;
  command?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export const ArchitectureDiagram: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps: Step[] = [
    {
      id: "code",
      number: "01",
      title: "كتابة الواجهة والكود",
      tech: "HTML5 + CSS3",
      role: "بناء الهيكل الدلالي وتنسيق المظهر والتجاوب في محرر الكود (VS Code)",
      darija: "كتكتب الساس والعظام بالـ HTML وكتصبغ وتفرش بالـ CSS باش السيت يجي ناضي فالحاسوب والتيليفون.",
      command: "code index.html style.css",
      icon: Code,
      color: "from-sky-500 to-blue-600"
    },
    {
      id: "git",
      number: "02",
      title: "التوثيق والتحكم بالنسخ",
      tech: "Git (محلياً)",
      role: "تسجيل كل تعديل في سجل تاريخي وحفظ لقطات آمنة للمشروع بدون إنترنت",
      darija: "آلة الزمن ديالك فالبيسي: كدير git add و commit باش تحفظ كل مرحلة وما تضيعش خدمتك إلا وقع شي غلط.",
      command: "git add . && git commit -m 'feat: complete portfolio'",
      icon: GitBranch,
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: "github",
      number: "03",
      title: "الرفع السحابي والمشاركة",
      tech: "GitHub (السحابة)",
      role: "حفظ الكود عن بعد ومشاركته مع الفرق التقنية وأصحاب العمل",
      darija: "كتلوح الكود للسحابة باش تضمن نسخة احتياطية ويبان للناس والشركات ويثبت مستواك التقني.",
      command: "git push -u origin main",
      icon: Cloud,
      color: "from-indigo-500 to-purple-600"
    },
    {
      id: "deploy",
      number: "04",
      title: "النشر المجاني الحي",
      tech: "GitHub Pages",
      role: "تحويل ملفات الكود الثابتة إلى موقع ويب حقيقي شغال على رابط عام",
      darija: "بضغطة زر فـ Settings كيعطيك رابط مجاني https://username.github.io/portfolio تعيط بيه لأي كليان.",
      command: "Settings > Pages > Branch: main > Save",
      icon: Globe,
      color: "from-amber-500 to-orange-600"
    }
  ];

  const current = steps[activeStep];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-100 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            مخطط دورة العمل المتكاملة (End-to-End Workflow)
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            اضغط على أي مرحلة لاكتشاف كيف تتكامل الأدوات خطوة بخطوة من الكود حتى النشر
          </p>
        </div>
        <div className="text-xs text-sky-400 font-mono">
          المرحلة {activeStep + 1} من {steps.length}
        </div>
      </div>

      {/* Visual Pipeline Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 my-6">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isSelected = activeStep === idx;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className={`relative text-right p-4 rounded-lg border transition-all text-xs flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-800/90 border-sky-500 ring-1 ring-sky-500'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-3">
                <span className={`font-mono text-xs ${isSelected ? 'text-sky-400 font-bold' : 'text-slate-500'}`}>
                  {step.number}
                </span>
                <div className={`p-1.5 rounded-md ${isSelected ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-800 text-slate-400'}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className={`font-semibold text-sm ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {step.tech}
                </p>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{step.title}</p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -left-3 top-1/2 -translate-y-1/2 z-10 text-slate-600 pointer-events-none">
                  <ArrowLeft className="w-3.5 h-3.5" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Step Deep Dive Card */}
      <div className="bg-slate-950/70 border border-slate-800/90 rounded-lg p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-sky-400 bg-sky-950/60 border border-sky-800/60 px-2 py-0.5 rounded">
              المرحلة {current.number}: {current.tech}
            </span>
            <h4 className="text-sm sm:text-base font-bold text-white">{current.title}</h4>
          </div>
          <span className="text-xs text-slate-400">الدور الفعلي في المنظومة</span>
        </div>

        <p className="text-sm text-slate-200 leading-relaxed mb-3">
          {current.role}
        </p>

        <div className="bg-slate-900/90 border border-slate-800 rounded-md p-3 mb-3">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-emerald-400">بالدارجة المغربية: </span>
              {current.darija}
            </p>
          </div>
        </div>

        {current.command && (
          <div className="flex items-center justify-between bg-black/60 border border-slate-800 px-3 py-2 rounded text-xs font-mono text-slate-300">
            <span className="text-slate-500 select-none">$</span>
            <span className="text-sky-300 mx-2 flex-1 text-left ltr" dir="ltr">{current.command}</span>
          </div>
        )}
      </div>
    </div>
  );
};
