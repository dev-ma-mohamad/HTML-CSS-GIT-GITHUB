import React, { useState } from 'react';
import {
  X,
  User,
  Mail,
  Award,
  BookOpen,
  Calendar,
  LogOut,
  Edit2,
  Check,
  Sparkles,
  Zap,
  TrendingUp,
  Shield,
  Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Language } from '../data/translations';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const { user, profile, logout, updateLevel, updateUserProfile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(profile?.displayName || user?.displayName || '');
  const [newPhotoURL, setNewPhotoURL] = useState(profile?.photoURL || user?.photoURL || '');
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'advanced'>(
    profile?.selectedLevel || 'beginner'
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen || !user) return null;

  const isRtl = language === 'ar';

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateUserProfile(newDisplayName, newPhotoURL);
      if (selectedLevel !== profile?.selectedLevel) {
        await updateLevel(selectedLevel);
      }
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setIsEditing(false);
      }, 1500);
    } catch (err) {
      console.error("Failed to update profile:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  const totalCompleted = profile?.completedLessons?.length || 0;
  const currentPoints = profile?.points || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden my-8">
        {/* Glow Header */}
        <div className="h-2 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600" />

        {/* Top Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <User className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base sm:text-lg">
                {language === 'ar' ? 'الملف الشخصي وإعدادات الحساب' : 'User Profile & Settings'}
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                {profile?.role === 'admin' ? '🛡️ Administrator Account' : 'Verified Learner Account'}
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

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Top User Card */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
            <div className="relative group shrink-0">
              {profile?.photoURL || user.photoURL ? (
                <img
                  src={profile?.photoURL || user.photoURL || ''}
                  alt={profile?.displayName || 'User'}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-cyan-500/40 shadow-lg"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-600 to-purple-600 flex items-center justify-center text-white text-2xl font-black shadow-lg">
                  {(profile?.displayName || user.displayName || user.email || 'U')[0].toUpperCase()}
                </div>
              )}
              <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px] font-mono shadow-sm">
                ONLINE
              </span>
            </div>

            <div className="space-y-1.5 text-center sm:text-start flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h4 className="text-lg font-bold text-white">
                  {profile?.displayName || user.displayName || 'Web Developer'}
                </h4>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                  {profile?.selectedLevel || 'beginner'}
                </span>
                {profile?.role === 'admin' && (
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-500/40 font-bold">
                    ADMIN
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-400 font-mono flex items-center justify-center sm:justify-start gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>{user.email}</span>
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Zap className="w-4 h-4 fill-amber-400" />
                  <span>{currentPoints} {language === 'ar' ? 'نقطة حقيقية' : 'Points'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-cyan-400">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{totalCompleted} {language === 'ar' ? 'درس مكتمل' : 'Completed'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 border border-slate-700 transition-colors flex items-center gap-1.5 self-center sm:self-start"
            >
              <Edit2 className="w-3 h-3 text-cyan-400" />
              <span>{isEditing ? (language === 'ar' ? 'إلغاء' : 'Cancel') : (language === 'ar' ? 'تعديل الحساب' : 'Edit')}</span>
            </button>
          </div>

          {/* Edit Form */}
          {isEditing && (
            <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-4 animate-fadeIn">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Edit2 className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'تحديث البيانات' : 'Update Profile & Learning Level'}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-400 font-mono">{language === 'ar' ? 'الاسم الظاهر' : 'Display Name'}</label>
                  <input
                    type="text"
                    value={newDisplayName}
                    onChange={(e) => setNewDisplayName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-mono">{language === 'ar' ? 'رابط الصورة الرمزية (اختياري)' : 'Photo URL (optional)'}</label>
                  <input
                    type="url"
                    value={newPhotoURL}
                    onChange={(e) => setNewPhotoURL(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500 font-mono"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-400 font-mono">{language === 'ar' ? 'المستوى التعليمي' : 'Learning Level'}</label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500 font-mono"
                  >
                    <option value="beginner">Beginner (مبتدئ)</option>
                    <option value="intermediate">Intermediate (متوسط)</option>
                    <option value="advanced">Advanced (متقدم)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                {saveSuccess ? (
                  <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    {language === 'ar' ? 'تم الحفظ بنجاح!' : 'Saved successfully!'}
                  </span>
                ) : (
                  <div />
                )}

                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-colors disabled:opacity-50"
                >
                  {isSaving ? (language === 'ar' ? 'جاري الحفظ...' : 'Saving...') : (language === 'ar' ? 'حفظ التغييرات' : 'Save Changes')}
                </button>
              </div>
            </div>
          )}

          {/* Stats Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase">{language === 'ar' ? 'النقاط' : 'Points'}</span>
              <p className="text-lg font-black text-amber-400 font-mono">{currentPoints}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase">{language === 'ar' ? 'الدروس المنجزة' : 'Lessons'}</span>
              <p className="text-lg font-black text-cyan-400 font-mono">{totalCompleted}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase">{language === 'ar' ? 'المسار النشط' : 'Current Course'}</span>
              <p className="text-xs font-bold text-purple-400 font-mono uppercase mt-1">
                {profile?.currentCourse || 'HTML'}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase">{language === 'ar' ? 'المستوى' : 'Level'}</span>
              <p className="text-xs font-bold text-emerald-400 font-mono uppercase mt-1">
                {profile?.selectedLevel || 'beginner'}
              </p>
            </div>
          </div>

          {/* Achievements Checklist */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              <span>{language === 'ar' ? 'الإنجازات المكتسبة' : 'Earned Achievements'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className={`p-3 rounded-xl border flex items-center gap-3 ${
                user ? 'bg-cyan-950/20 border-cyan-500/40 text-cyan-300' : 'bg-slate-950/40 border-slate-800 text-slate-600'
              }`}>
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center font-bold text-sm">
                  🚀
                </div>
                <div>
                  <h5 className="font-bold">{language === 'ar' ? 'حساب مطوّر موثق' : 'Verified Developer'}</h5>
                  <p className="text-[11px] text-slate-400">{language === 'ar' ? 'إنشاء حساب وتسجيل الدخول' : 'Registered official account'}</p>
                </div>
              </div>

              <div className={`p-3 rounded-xl border flex items-center gap-3 ${
                currentPoints >= 1 ? 'bg-amber-950/20 border-amber-500/40 text-amber-300' : 'bg-slate-950/40 border-slate-800 text-slate-600'
              }`}>
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center font-bold text-sm">
                  ⚡
                </div>
                <div>
                  <h5 className="font-bold">{language === 'ar' ? 'أول نقطة اختبار' : 'First Point Earned'}</h5>
                  <p className="text-[11px] text-slate-400">{language === 'ar' ? 'إجابة صحيحة من المحاولة الأولى' : 'Correct answer on first attempt'}</p>
                </div>
              </div>

              <div className={`p-3 rounded-xl border flex items-center gap-3 ${
                totalCompleted >= 5 ? 'bg-purple-950/20 border-purple-500/40 text-purple-300' : 'bg-slate-950/40 border-slate-800 text-slate-600'
              }`}>
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center font-bold text-sm">
                  📚
                </div>
                <div>
                  <h5 className="font-bold">{language === 'ar' ? 'عالم الويب (5 دروس)' : 'Web Explorer'}</h5>
                  <p className="text-[11px] text-slate-400">{language === 'ar' ? 'إتمام 5 دروس على الأقل' : 'Completed at least 5 lessons'}</p>
                </div>
              </div>

              <div className={`p-3 rounded-xl border flex items-center gap-3 ${
                currentPoints >= 10 ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300' : 'bg-slate-950/40 border-slate-800 text-slate-600'
              }`}>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center font-bold text-sm">
                  🏆
                </div>
                <div>
                  <h5 className="font-bold">{language === 'ar' ? 'نخبة الاختبارات (10+ نقاط)' : 'Quiz Master'}</h5>
                  <p className="text-[11px] text-slate-400">{language === 'ar' ? 'جمع 10 نقاط في الاختبارات' : 'Earned 10+ first-attempt points'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bar: Logout */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
            <span className="text-[11px] text-slate-500 font-mono">
              UID: {user.uid.slice(0, 12)}...
            </span>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-950/40 border border-rose-800/60 hover:bg-rose-900/60 text-rose-300 font-bold text-xs transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-rose-400" />
              <span>{language === 'ar' ? 'تسجيل الخروج' : 'Log Out'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
