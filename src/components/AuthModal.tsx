import React, { useState } from 'react';
import {
  X,
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Github,
  KeyRound,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Language } from '../data/translations';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  language,
  onSuccess
}) => {
  const {
    loginWithGoogle,
    loginWithGitHub,
    loginWithEmail,
    registerWithEmail,
    sendPasswordReset
  } = useAuth();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);

  if (!isOpen) return null;

  const isRtl = language === 'ar';

  const t = {
    login: { en: 'Sign In', fr: 'Connexion', ar: 'تسجيل الدخول' }[language],
    register: { en: 'Create Account', fr: 'Créer un Compte', ar: 'إنشاء حساب جديد' }[language],
    forgot: { en: 'Reset Password', fr: 'Réinitialiser le Mot de Passe', ar: 'استعادة كلمة المرور' }[language],
    welcomeTitle: {
      en: 'Developer Academy Access',
      fr: 'Accès Académie Développeur',
      ar: 'بوابة دخول أكاديمية الويب'
    }[language],
    welcomeSubtitle: {
      en: 'Save your learning progress, earn genuine points, and access your personal dashboard.',
      fr: 'Sauvegardez votre progression, gagnez des points et accédez à votre profil.',
      ar: 'احفظ تقدمك تلقائياً في السحابة، اجمع النقاط، وتابع مسارك التعليمي من أي جهاز.'
    }[language],
    googleBtn: { en: 'Continue with Google', fr: 'Continuer avec Google', ar: 'المتابعة باستخدام Google' }[language],
    githubBtn: { en: 'Continue with GitHub', fr: 'Continuer avec GitHub', ar: 'المتابعة باستخدام GitHub' }[language],
    orEmail: { en: 'or continue with email', fr: 'ou avec votre email', ar: 'أو عبر البريد الإلكتروني' }[language],
    emailPlaceholder: { en: 'your.email@example.com', fr: 'votre.email@exemple.com', ar: 'بريدك الإلكتروني...' }[language],
    passwordPlaceholder: { en: 'Password (min. 6 characters)', fr: 'Mot de passe (min. 6 car.)', ar: 'كلمة المرور (6 أحرف على الأقل)' }[language],
    namePlaceholder: { en: 'Your Name or Developer Handle', fr: 'Votre Nom ou Pseudo', ar: 'اسمك أو اللقب البرمجي' }[language],
    forgotLink: { en: 'Forgot password?', fr: 'Mot de passe oublié ?', ar: 'نسيت كلمة المرور؟' }[language],
    noAccount: { en: "Don't have an account?", fr: "Pas encore de compte ?", ar: 'ليس لديك حساب بعد؟' }[language],
    haveAccount: { en: 'Already have an account?', fr: 'Déjà un compte ?', ar: 'لديك حساب بالفعل؟' }[language],
    backToLogin: { en: 'Back to Sign In', fr: 'Retour à la connexion', ar: 'العودة لتسجيل الدخول' }[language],
    sendResetBtn: { en: 'Send Password Reset Link', fr: 'Envoyer le lien de réinitialisation', ar: 'إرسال رابط استعادة المرور' }[language],
    resetSentMsg: {
      en: 'Password reset link sent! Check your inbox.',
      fr: 'Lien de réinitialisation envoyé ! Vérifiez votre boîte mail.',
      ar: 'تم إرسال رابط استعادة كلمة المرور! تفقد بريدك الإلكتروني.'
    }[language],
    guestNotice: {
      en: 'Continue as Guest',
      fr: 'Continuer en tant qu\'invité',
      ar: 'المتابعة كزائر بدون تسجيل'
    }[language]
  };

  const mapFirebaseError = (err: any): string => {
    const code = err?.code || '';
    if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
      return language === 'ar'
        ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة.'
        : 'Invalid email or password.';
    }
    if (code === 'auth/email-already-in-use') {
      return language === 'ar'
        ? 'هذا البريد الإلكتروني مسجل بالفعل. يرجى تسجيل الدخول.'
        : 'This email is already in use. Please sign in.';
    }
    if (code === 'auth/weak-password') {
      return language === 'ar'
        ? 'كلمة المرور ضعيفة جداً. استخدم 6 خانات على الأقل.'
        : 'Password is too weak. Use at least 6 characters.';
    }
    if (code === 'auth/popup-closed-by-user') {
      return language === 'ar'
        ? 'تم إلغاء نافذة تسجيل الدخول من قبل المستخدم.'
        : 'Sign-in window was closed.';
    }
    return err?.message || 'Authentication error. Please try again.';
  };

  const handleGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      await loginWithGoogle();
      onSuccess?.();
      onClose();
    } catch (err: any) {
      setError(mapFirebaseError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGitHub = async () => {
    setError(null);
    setLoading(true);
    try {
      await loginWithGitHub();
      onSuccess?.();
      onClose();
    } catch (err: any) {
      setError(mapFirebaseError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        await loginWithEmail(email, password);
        onSuccess?.();
        onClose();
      } else if (mode === 'register') {
        if (!displayName.trim()) {
          setError(language === 'ar' ? 'يرجى إدخال اسمك أو لقبك البرمجي' : 'Please provide your name');
          setLoading(false);
          return;
        }
        await registerWithEmail(email, password, displayName);
        onSuccess?.();
        onClose();
      } else if (mode === 'forgot') {
        await sendPasswordReset(email);
        setResetSent(true);
      }
    } catch (err: any) {
      setError(mapFirebaseError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Glow corner background */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

        {/* Header Bar */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-purple-600 flex items-center justify-center text-slate-950 font-bold shadow-sm">
              <ShieldCheck className="w-4 h-4 text-slate-950" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base leading-tight">
                {t.welcomeTitle}
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                WebDev Master Security
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-xs text-slate-400 leading-relaxed text-center">
            {t.welcomeSubtitle}
          </p>

          {/* Error Callout */}
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/80 text-rose-300 text-xs flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{error}</p>
            </div>
          )}

          {/* Password Reset Confirmation */}
          {resetSent && (
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/80 text-emerald-300 text-xs flex items-start gap-2.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{t.resetSentMsg}</p>
            </div>
          )}

          {/* Social OAuth Buttons */}
          {mode !== 'forgot' && (
            <div className="space-y-3">
              {/* Google Button */}
              <button
                type="button"
                onClick={handleGoogle}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700/80 text-white font-medium text-xs sm:text-sm transition-all shadow-sm cursor-pointer disabled:opacity-50"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>{t.googleBtn}</span>
              </button>

              {/* GitHub Button */}
              <button
                type="button"
                onClick={handleGitHub}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700/80 text-white font-medium text-xs sm:text-sm transition-all shadow-sm cursor-pointer disabled:opacity-50"
              >
                <Github className="w-4 h-4 shrink-0 text-white" />
                <span>{t.githubBtn}</span>
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-4">
                <div className="w-full border-t border-slate-800" />
                <span className="absolute px-3 bg-slate-900 text-[11px] font-mono text-slate-500 uppercase">
                  {t.orEmail}
                </span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-400">
                  {language === 'ar' ? 'الاسم' : 'Full Name'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-400">
                {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-mono text-slate-400">
                    {language === 'ar' ? 'كلمة المرور' : 'Password'}
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[11px] text-cyan-400 hover:underline"
                    >
                      {t.forgotLink}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.passwordPlaceholder}
                    minLength={6}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            )}

            {/* Action Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:opacity-95 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>
                    {mode === 'login'
                      ? t.login
                      : mode === 'register'
                      ? t.register
                      : t.sendResetBtn}
                  </span>
                  <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                </>
              )}
            </button>
          </form>

          {/* Mode Switchers */}
          <div className="text-center text-xs text-slate-400 space-y-2 pt-2">
            {mode === 'login' && (
              <p>
                {t.noAccount}{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setError(null);
                  }}
                  className="text-cyan-400 font-bold hover:underline"
                >
                  {t.register}
                </button>
              </p>
            )}

            {mode === 'register' && (
              <p>
                {t.haveAccount}{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError(null);
                  }}
                  className="text-cyan-400 font-bold hover:underline"
                >
                  {t.login}
                </button>
              </p>
            )}

            {mode === 'forgot' && (
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setError(null);
                }}
                className="text-cyan-400 font-bold hover:underline"
              >
                ← {t.backToLogin}
              </button>
            )}
          </div>

          {/* Continue as Guest option */}
          <div className="pt-2 border-t border-slate-800/80 text-center">
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              {t.guestNotice} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
