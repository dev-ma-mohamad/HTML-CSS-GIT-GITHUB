import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Star,
  Send,
  Trash2,
  Edit2,
  Flag,
  Check,
  AlertCircle,
  Sparkles,
  ShieldAlert,
  User
} from 'lucide-react';
import { commentFromRow, CommentData, supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Language } from '../data/translations';

interface CommunitySectionProps {
  language: Language;
  onOpenAuth: () => void;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({
  language,
  onOpenAuth
}) => {
  const { user, profile, isAdmin } = useAuth();
  const [comments, setComments] = useState<CommentData[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Edit state
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [editRating, setEditRating] = useState<number>(5);

  const isRtl = language === 'ar';

  useEffect(() => {
    let active = true;
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      if (error) {
        console.error('Error fetching Supabase comments:', error);
        if (active) setLoading(false);
        return;
      }
      if (active) {
        setComments(data.map(commentFromRow));
        setLoading(false);
      }
    };

    void fetchComments();
    const channel = supabase
      .channel('community-comments')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'comments' }, () => {
        void fetchComments();
      })
      .subscribe();

    return () => {
      active = false;
      void supabase.removeChannel(channel);
    };
  }, []);

  // Calculate actual statistics from submitted comments
  const ratedComments = comments.filter((c) => typeof c.rating === 'number' && c.rating > 0);
  const averageRating =
    ratedComments.length > 0
      ? (ratedComments.reduce((acc, curr) => acc + (curr.rating || 0), 0) / ratedComments.length).toFixed(1)
      : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onOpenAuth();
      return;
    }

    if (!commentText.trim()) return;

    if (commentText.trim().length < 5) {
      setError(language === 'ar' ? 'يجب أن يحتوي التعليق على 5 أحرف على الأقل.' : 'Comment must be at least 5 characters.');
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      const { error } = await supabase.from('comments').insert({
        user_id: user.uid,
        user_display_name: profile?.displayName || user.displayName || 'Web Developer',
        user_photo_url: profile?.photoURL || user.photoURL || '',
        content: commentText.trim(),
        rating
      });
      if (error) throw error;

      setCommentText('');
      setRating(5);
    } catch (err: any) {
      console.error("Failed to post comment:", err);
      setError(err?.message || 'Failed to submit comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string, authorId: string) => {
    if (!user) return;
    if (user.uid !== authorId && !isAdmin) return;

    const confirmMsg = language === 'ar' ? 'هل أنت متأكد من حذف هذا التعليق؟' : 'Delete this comment?';
    if (!window.confirm(confirmMsg)) return;

    try {
      const { error } = await supabase.from('comments').delete().eq('id', commentId);
      if (error) throw error;
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  const handleStartEdit = (c: CommentData) => {
    setEditingCommentId(c.id);
    setEditText(c.content);
    setEditRating(c.rating || 5);
  };

  const handleSaveEdit = async (commentId: string) => {
    if (!editText.trim()) return;
    try {
      const { error } = await supabase.from('comments').update({
        content: editText.trim(),
        rating: editRating
      }).eq('id', commentId);
      if (error) throw error;
      setEditingCommentId(null);
    } catch (err) {
      console.error("Failed to update comment:", err);
    }
  };

  const handleReport = async (commentId: string) => {
    if (!user) {
      onOpenAuth();
      return;
    }
    const confirmMsg = language === 'ar' ? 'إبلاغ الإدارة عن هذا التعليق كغير لائق؟' : 'Report this comment for admin review?';
    if (!window.confirm(confirmMsg)) return;

    try {
      const { error } = await supabase.from('comments').update({
        reported: true
      }).eq('id', commentId);
      if (error) throw error;
      alert(language === 'ar' ? 'تم إرسال البلاغ للإدارة للمراجعة.' : 'Report submitted to moderators.');
    } catch (err) {
      console.error("Failed to report comment:", err);
    }
  };

  return (
    <section className="border-t border-slate-800 bg-slate-950/80 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header with Real Platform Rating Summary */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 text-xs font-mono">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'مجتمع المتعلمين الحقيقي' : 'Community Reviews & Discussions'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {language === 'ar' ? 'آراء وتقييمات مجتمع المنصة' : 'Learner Reviews & Feedback'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {language === 'ar'
                ? 'تقييمات حقيقية مائة بالمائة مقدمة من المطورين والمتعلمين المسجلين في المنصة.'
                : '100% genuine reviews and discussions from registered developers and students.'}
            </p>
          </div>

          {/* Genuine Average Rating Box */}
          <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl shrink-0">
            {averageRating ? (
              <div className="flex items-center gap-3">
                <div className="text-3xl font-black text-amber-400 font-mono">
                  {averageRating}
                </div>
                <div>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${
                          s <= Math.round(Number(averageRating))
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                    {ratedComments.length} {language === 'ar' ? 'تقييم حقيقي' : 'verified reviews'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-1">
                <p className="text-xs font-bold text-slate-300">
                  {language === 'ar' ? 'كن أول من يقيّم المنصة!' : 'Be the first to rate!'}
                </p>
                <p className="text-[10px] text-slate-500">
                  {language === 'ar' ? 'لا توجد أرقام وهمية' : 'Zero fabricated reviews'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* New Comment Submission Card */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>{language === 'ar' ? 'أضف رأيك أو سؤالك البرمجي' : 'Share Your Review or Question'}</span>
            </h3>

            {/* Star Rating Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-mono text-slate-400 hidden sm:inline mr-1">
                {language === 'ar' ? 'تقييمك للمنصة:' : 'Your Rating:'}
              </span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 text-slate-600 hover:text-amber-400 transition-colors"
                >
                  <Star
                    className={`w-5 h-5 ${
                      star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder={
                user
                  ? (language === 'ar' ? 'اكتب رأيك، تجربتك التعليمية، أو استفسارك هنا...' : 'Write your learning feedback, question, or experience...')
                  : (language === 'ar' ? 'سجل دخولك أولاً للمشاركة والتعليق...' : 'Sign in to write a review or comment...')
              }
              rows={3}
              disabled={!user || submitting}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-500 resize-none transition-all disabled:opacity-60"
            />

            {error && (
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/80 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <p className="text-[11px] text-slate-500 font-mono">
                {user ? (
                  <>Posting as <strong className="text-cyan-400">{profile?.displayName || user.displayName || user.email}</strong></>
                ) : (
                  <span>Authentication required to post verified comments.</span>
                )}
              </p>

              {user ? (
                <button
                  type="submit"
                  disabled={submitting || !commentText.trim()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-95 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? (language === 'ar' ? 'جاري النشر...' : 'Publishing...') : (language === 'ar' ? 'نشر التعليق' : 'Publish Comment')}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onOpenAuth}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 font-bold text-xs transition-colors cursor-pointer"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'تسجيل الدخول للمشاركة' : 'Sign In to Comment'}</span>
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Comments Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono pb-2">
            <span>{comments.length} {language === 'ar' ? 'تعليقات ومشاركات' : 'Verified Comments'}</span>
            <span>Live Supabase Community</span>
          </div>

          {loading ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-7 h-7 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-slate-500 font-mono">Loading community feed...</p>
            </div>
          ) : comments.length === 0 ? (
            <div className="py-12 text-center bg-slate-900/40 rounded-2xl border border-slate-800 space-y-2">
              <MessageSquare className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-400 font-medium">
                {language === 'ar' ? 'لا توجد تعليقات بعد. كن أول من يكتب في المجتمع!' : 'No comments yet. Be the first to share your thoughts!'}
              </p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {comments.map((c) => {
                const isAuthor = user?.uid === c.userId;
                const canModerate = isAuthor || isAdmin;

                return (
                  <div
                    key={c.id}
                    className={`p-5 rounded-2xl bg-slate-900/80 border transition-all ${
                      c.reported && isAdmin
                        ? 'border-amber-500/60 bg-amber-950/20'
                        : 'border-slate-800 hover:border-slate-700/80'
                    }`}
                  >
                    {editingCommentId === c.id ? (
                      <div className="space-y-3">
                        <textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          rows={2}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-cyan-500"
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <button
                                key={s}
                                type="button"
                                onClick={() => setEditRating(s)}
                                className="text-slate-600 hover:text-amber-400"
                              >
                                <Star
                                  className={`w-4 h-4 ${
                                    s <= editRating ? 'fill-amber-400 text-amber-400' : ''
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingCommentId(null)}
                              className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSaveEdit(c.id)}
                              className="px-3 py-1 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {/* Header: User + Rating + Actions */}
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            {c.userPhotoURL ? (
                              <img
                                src={c.userPhotoURL}
                                alt={c.userDisplayName}
                                className="w-8 h-8 rounded-xl object-cover border border-slate-700"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white text-xs">
                                {c.userDisplayName[0]?.toUpperCase() || 'U'}
                              </div>
                            )}

                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-white">
                                  {c.userDisplayName}
                                </span>
                                {c.reported && isAdmin && (
                                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-500/40">
                                    REPORTED
                                  </span>
                                )}
                              </div>
                              {c.rating && (
                                <div className="flex items-center gap-0.5 text-amber-400 mt-0.5">
                                  {[1, 2, 3, 4, 5].map((s) => (
                                    <Star
                                      key={s}
                                      className={`w-3 h-3 ${
                                        s <= (c.rating || 0)
                                          ? 'fill-amber-400 text-amber-400'
                                          : 'text-slate-700'
                                      }`}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 text-slate-500 text-xs">
                            {isAuthor && (
                              <button
                                onClick={() => handleStartEdit(c)}
                                className="p-1 hover:text-cyan-400 transition-colors"
                                title="Edit"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {canModerate && (
                              <button
                                onClick={() => handleDelete(c.id, c.userId)}
                                className="p-1 hover:text-rose-400 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {!isAuthor && (
                              <button
                                onClick={() => handleReport(c.id)}
                                className="p-1 hover:text-amber-400 transition-colors"
                                title="Report Spam"
                              >
                                <Flag className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Comment Content */}
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed break-words">
                          {c.content}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
