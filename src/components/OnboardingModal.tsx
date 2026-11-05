import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Mail,
  Phone,
  Github,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Layers,
  Rocket
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Language } from '../data/translations';

interface OnboardingModalProps {
  isOpen: boolean;
  onFinish: () => void;
  language: Language;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onFinish,
  language
}) => {
  const { completeOnboarding } = useAuth();
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const isRtl = language === 'ar';

  const levels = [
    {
      id: 'beginner' as const,
      name: { en: 'BEGINNER', fr: 'DÉBUTANT', ar: 'مبتدئ' }[language],
      icon: GraduationCap,
      color: 'from-emerald-400 to-teal-500',
      badge: { en: 'Zero to Hero', fr: 'Zéro vers Pro', ar: 'من البداية' }[language],
      bullets: [
        { en: 'I am new to programming.', fr: 'Je suis débutant en programmation.', ar: 'أنا جديد في عالم البرمجة.' }[language],
        { en: 'Explain everything from the beginning.', fr: 'Expliquez tout depuis le début.', ar: 'اشرح لي كل شيء من نقطة الصفر.' }[language],
        { en: 'Use simple language and easy examples.', fr: 'Langage simple et exemples faciles.', ar: 'استخدم لغة بسيطة وأمثلة سهلة الفهم.' }[language],
        { en: 'Teach me step by step.', fr: 'Apprenez-moi pas à pas.', ar: 'علمني خطوة بخطوة بالتدريج.' }[language],
      ]
    },
    {
      id: 'intermediate' as const,
      name: { en: 'INTERMEDIATE', fr: 'INTERMÉDIAIRE', ar: 'متوسط' }[language],
      icon: Layers,
      color: 'from-cyan-400 to-blue-500',
      badge: { en: 'Skill Booster', fr: 'Renforcement', ar: 'تطوير المهارات' }[language],
      bullets: [
        { en: 'I already understand the basics.', fr: 'Je comprends déjà les bases.', ar: 'أفهم الأساسيات بالفعل.' }[language],
        { en: 'Give me practical examples.', fr: 'Donnez-moi des exemples pratiques.', ar: 'أعطني أمثلة عملية من واقع المشاريع.' }[language],
        { en: 'Teach me more advanced commands and techniques.', fr: 'Commandes et techniques plus avancées.', ar: 'علمني أوامر وتقنيات أكثر تقدماً.' }[language],
        { en: 'Include challenging exercises.', fr: 'Exercices stimulants.', ar: 'تضمين تمارين وتحديات برمجية.' }[language],
      ]
    },
    {
      id: 'advanced' as const,
      name: { en: 'ADVANCED', fr: 'AVANCÉ', ar: 'متقدم' }[language],
      icon: Rocket,
      color: 'from-purple-400 to-pink-500',
      badge: { en: 'Pro Workflows', fr: 'Workflows Pro', ar: 'مستوى احترافي' }[language],
      bullets: [
        { en: 'I have programming experience.', fr: 'J\'ai de l\'expérience en programmation.', ar: 'لدي خبرة برمجية سابقة.' }[language],
        { en: 'Give me advanced concepts and real-world examples.', fr: 'Concepts avancés et cas réels.', ar: 'أعطني مفاهيم معقدة وأمثلة واقعية.' }[language],
        { en: 'Include complex exercises and projects.', fr: 'Projets et défis complexes.', ar: 'تضمين مشاريع وتمارين متقدمة.' }[language],
        { en: 'Teach professional development workflows.', fr: 'Méthodes de développement pro.', ar: 'تعليم مسارات عمل مهنية واحترافية.' }[language],
      ]
    }
  ];

  const handleNext = async () => {
    if (step === 1) {
      setStep(2);
    } else {
      setIsSubmitting(true);
      try {
        await completeOnboarding(selectedLevel);
        onFinish();
      } catch (err) {
        console.error("Failed to complete onboarding:", err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden my-8">
        {/* Neon Glow Header Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600" />

        <div className="p-6 sm:p-10 space-y-8">
          {/* Step 1: Personalized Welcome Message */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    {language === 'ar'
                      ? 'مرحباً بك في منصتنا التعليمية!'
                      : language === 'fr'
                      ? 'Bienvenue sur notre plateforme d\'apprentissage !'
                      : 'Welcome to our learning platform!'}
                  </h2>
                  <p className="text-xs text-slate-400 font-mono">
                    Step 1 of 2: Platform Guide
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80">
                <p>
                  {language === 'ar'
                    ? 'يسعدنا جداً تواجدك معنا. تم تصميم هذه المنصة لمساعدتك على تعلم HTML و CSS و Git و GitHub خطوة بخطوة بطريقة تفاعلية وممتعة.'
                    : language === 'fr'
                    ? 'Nous sommes ravis de vous accueillir. Cette plateforme vous guidera pour maîtriser HTML, CSS, Git et GitHub étape par étape.'
                    : "We're happy to have you here. This platform will help you learn HTML, CSS, Git, and GitHub step by step."}
                </p>

                <p className="text-cyan-400 font-semibold">
                  {language === 'ar'
                    ? 'يتم حفظ تقدمك التعليمي تلقائياً في حسابك. يمكنك المغادرة في أي وقت والعودة لاحقاً دون فقدان أي درس أو نقطة كسبتها.'
                    : language === 'fr'
                    ? 'Votre progression est enregistrée automatiquement sur votre compte. Vous pouvez quitter et revenir quand vous voulez.'
                    : 'Your learning progress is automatically saved to your account. You can leave at any time and come back later without losing your progress.'}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                    {language === 'ar' ? 'كيفية التعلم خطوة بخطوة:' : 'How to learn:'}
                  </h4>
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-400 text-xs font-medium">
                    <li>{language === 'ar' ? 'اقرأ الشرح النظري بعناية وافهم المفهوم.' : 'Read the explanation carefully.'}</li>
                    <li>{language === 'ar' ? 'ادرس أمثلة الكود واكتشف بنية كل سطر.' : 'Study the code examples.'}</li>
                    <li>{language === 'ar' ? 'جرب الأمثلة بنفسك في المحاكي والمختبر.' : 'Try the examples yourself.'}</li>
                    <li>{language === 'ar' ? 'تذكر الأوامر وافهم وظيفة كل خيار.' : 'Remember the commands and understand what each line does.'}</li>
                    <li>{language === 'ar' ? 'أجب على التمارين والاختبارات.' : 'Answer the exercises.'}</li>
                    <li>{language === 'ar' ? 'انتقل إلى الدرس التالي عندما تكون مستعداً.' : 'Move to the next lesson when you are ready.'}</li>
                  </ol>
                </div>

                <p className="text-slate-400 text-xs italic">
                  {language === 'ar'
                    ? 'سيتم حفظ تقدمك، الدروس المكتملة، نتائج الاختبارات، والنقاط تلقائياً في قاعدة البيانات. لنختر الآن مستواك التعليمي المناسب!'
                    : 'Your progress, completed lessons, quiz results, and points will be saved automatically. Let\'s choose your learning level!'}
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Choose Your Learning Level */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {language === 'ar'
                    ? 'اختر مستواك التعليمي المفضل'
                    : language === 'fr'
                    ? 'Choisissez votre niveau d\'apprentissage'
                    : 'Choose Your Learning Level'}
                </h2>
                <p className="text-xs text-slate-400">
                  {language === 'ar'
                    ? 'حدد المستوى الأنسب لخبرتك لتخصيص محتواك وتجربتك (يمكنك تغييره لاحقاً من الإعدادات).'
                    : 'Select the path that matches your current coding experience. You can adjust this anytime in your profile.'}
                </p>
              </div>

              {/* 3 Level Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {levels.map((lvl) => {
                  const Icon = lvl.icon;
                  const isSelected = selectedLevel === lvl.id;
                  return (
                    <div
                      key={lvl.id}
                      onClick={() => setSelectedLevel(lvl.id)}
                      className={`cursor-pointer rounded-2xl p-5 border transition-all flex flex-col justify-between space-y-4 relative ${
                        isSelected
                          ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.2)] ring-1 ring-cyan-400'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40 text-slate-400'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${lvl.color} text-slate-950 font-bold`}>
                            <Icon className="w-5 h-5 text-slate-950" />
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                            {lvl.badge}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-bold text-white text-base">
                            {lvl.name}
                          </h4>
                        </div>

                        <ul className="space-y-2 text-[11px] text-slate-400 leading-normal">
                          {lvl.bullets.map((b, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-cyan-400 text-xs leading-none">•</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2">
                        <div
                          className={`w-full py-1.5 text-center rounded-xl text-xs font-bold transition-all ${
                            isSelected
                              ? 'bg-cyan-500 text-slate-950 shadow-sm'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {isSelected ? (language === 'ar' ? '✓ تم الاختيار' : '✓ Selected') : (language === 'ar' ? 'اختيار' : 'Select')}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real Contact Information at Bottom */}
          <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500 block">
              {language === 'ar' ? 'معلومات التواصل المباشرة مع المطوّر:' : 'Official Developer Contact Information:'}
            </span>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
              <a
                href="mailto:dev.ma.mohamad@gmail.com"
                className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>dev.ma.mohamad@gmail.com</span>
              </a>

              <a
                href="tel:+212780237834"
                className="flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+212 780237834</span>
              </a>

              <a
                href="https://github.com/dev-ma-mohamad"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-slate-300 hover:text-purple-400 transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-purple-400" />
                <span>github.com/dev-ma-mohamad</span>
              </a>
            </div>
          </div>

          {/* Action Buttons: Back & Next */}
          <div className="flex items-center justify-between pt-2">
            {step === 2 ? (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition-colors"
              >
                {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                <span>{language === 'ar' ? 'السابق' : 'Back'}</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:opacity-95 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              <span>
                {step === 1
                  ? (language === 'ar' ? 'اختيار المستوى التالي ←' : 'Next: Choose Level →')
                  : (language === 'ar' ? 'بدء التعلم الآن 🚀' : 'Start Learning 🚀')}
              </span>
              {step === 1 && (isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
