import React, { useEffect, useState } from 'react';
import {
  Trophy,
  X,
  Medal,
  Award,
  Zap,
  BookOpen,
  User,
  Sparkles
} from 'lucide-react';
import { profileFromRow, supabase, UserProfileData } from '../lib/supabase';
import { Language } from '../data/translations';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const [users, setUsers] = useState<UserProfileData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('public_leaderboard')
          .select('id, display_name, photo_url, role, selected_level, points, completed_lessons')
          .order('points', { ascending: false })
          .limit(50);
        if (error) throw error;

        const loaded: UserProfileData[] = data.map((row) =>
          profileFromRow({
            id: row.id,
            email: '',
            display_name: row.display_name,
            photo_url: row.photo_url,
            role: row.role,
            selected_level: row.selected_level,
            onboarding_completed: false,
            points: row.points,
            current_course: 'html',
            current_lesson_id: 'html-01',
            completed_lessons: row.completed_lessons || [],
            completed_exercises: [],
            created_at: '',
            updated_at: '',
            last_activity_date: ''
          })
        );
        setUsers(loaded);
      } catch (err) {
        console.error("Failed to load leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [isOpen]);

  if (!isOpen) return null;

  const isRtl = language === 'ar';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden my-8">
        {/* Glow Header Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Trophy className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base sm:text-lg">
                {language === 'ar' ? 'لوحة الشرف والمتصدرين الحقيقيين' : 'Official Verified Leaderboard'}
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                {language === 'ar' ? 'ترتيب حقيقي بناءً على النقاط المكتسبة من المحاولة الأولى' : 'Live rankings from first-attempt quiz points'}
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
        <div className="p-6 sm:p-8 space-y-4">
          {loading ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-slate-400 font-mono">
                {language === 'ar' ? 'جاري تحميل قائمة المتصدرين من قاعدة البيانات...' : 'Querying real leaderboard from database...'}
              </p>
            </div>
          ) : users.length === 0 ? (
            <div className="py-16 text-center space-y-3 bg-slate-950/50 rounded-2xl border border-slate-800">
              <Trophy className="w-10 h-10 text-slate-600 mx-auto" />
              <h4 className="text-sm font-bold text-slate-300">
                {language === 'ar' ? 'لا يوجد متعلمون مسجلون بعد' : 'No registered learners yet'}
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {language === 'ar'
                  ? 'كن أول من يسجل حسابه ويجيب على الاختبارات لتتصدر لوحة الشرف!'
                  : 'Be the first to sign in and answer quiz questions to claim the #1 spot!'}
              </p>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
              {users.map((u, index) => {
                const rank = index + 1;
                const isTop3 = rank <= 3;
                return (
                  <div
                    key={u.uid}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      rank === 1
                        ? 'bg-gradient-to-r from-amber-950/40 via-yellow-950/20 to-slate-900 border-amber-500/50 shadow-md ring-1 ring-amber-500/30'
                        : rank === 2
                        ? 'bg-slate-950/90 border-slate-700/80'
                        : rank === 3
                        ? 'bg-slate-950/70 border-amber-900/40'
                        : 'bg-slate-950/40 border-slate-800/80 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Rank Badge */}
                      <div className="w-8 flex justify-center text-center">
                        {rank === 1 ? (
                          <span className="text-xl">🥇</span>
                        ) : rank === 2 ? (
                          <span className="text-xl">🥈</span>
                        ) : rank === 3 ? (
                          <span className="text-xl">🥉</span>
                        ) : (
                          <span className="font-mono text-xs font-bold text-slate-500">
                            #{rank}
                          </span>
                        )}
                      </div>

                      {/* Avatar */}
                      {u.photoURL ? (
                        <img
                          src={u.photoURL}
                          alt={u.displayName}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white text-sm">
                          {(u.displayName || u.email || 'U')[0].toUpperCase()}
                        </div>
                      )}

                      {/* Details */}
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-xs sm:text-sm">
                            {u.displayName || u.email?.split('@')[0]}
                          </h4>
                          {u.role === 'admin' && (
                            <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/40">
                              Admin
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono mt-0.5">
                          <span className="capitalize">{u.selectedLevel || 'beginner'}</span>
                          <span>•</span>
                          <span>{u.completedLessons?.length || 0} {language === 'ar' ? 'درس' : 'lessons'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Points Pill */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs font-bold text-amber-400">
                      <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{u.points || 0} pts</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="pt-3 border-t border-slate-800 text-center">
            <p className="text-[11px] text-slate-500 font-mono">
              {language === 'ar'
                ? '⚡ قاعدة الأمان: تمنح النقاط حصرياً عند الإجابة الصحيحة من المحاولة الأولى لكل سؤال.'
                : '⚡ Zero-trust rule: +1 point is awarded strictly on the first correct attempt per question.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
