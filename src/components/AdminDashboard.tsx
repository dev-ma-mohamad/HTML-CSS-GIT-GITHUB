import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Users,
  Award,
  BookOpen,
  MessageSquare,
  Search,
  Trash2,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Clock,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import {
  collection,
  query,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  serverTimestamp,
  orderBy,
  limit
} from 'firebase/firestore';
import { db, UserProfileData, CommentData, ADMIN_EMAIL } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { Language } from '../data/translations';

interface AdminDashboardProps {
  language: Language;
  onNavigateHome: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  language,
  onNavigateHome
}) => {
  const { user, profile, isAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'moderation' | 'audit'>('overview');
  const [usersList, setUsersList] = useState<UserProfileData[]>([]);
  const [commentsList, setCommentsList] = useState<CommentData[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch real admin data
  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Users
      const usersSnap = await getDocs(collection(db, 'users'));
      const uList: UserProfileData[] = [];
      usersSnap.forEach((d) => {
        uList.push(d.data() as UserProfileData);
      });
      setUsersList(uList);

      // 2. Fetch Comments
      const commentsSnap = await getDocs(
        query(collection(db, 'comments'), orderBy('createdAt', 'desc'))
      );
      const cList: CommentData[] = [];
      commentsSnap.forEach((d) => {
        cList.push({ id: d.id, ...d.data() } as CommentData);
      });
      setCommentsList(cList);

      // 3. Fetch Audit Logs
      const auditSnap = await getDocs(
        query(collection(db, 'admin_audit_logs'), orderBy('timestamp', 'desc'), limit(50))
      );
      const aList: any[] = [];
      auditSnap.forEach((d) => {
        aList.push({ id: d.id, ...d.data() });
      });
      setAuditLogs(aList);
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  // Security Check: Deny access if not admin
  if (!user || (!isAdmin && user.email !== ADMIN_EMAIL)) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-rose-900/60 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-950/60 border border-rose-500/40 flex items-center justify-center text-rose-400 mx-auto">
            <ShieldAlert className="w-8 h-8 text-rose-400" />
          </div>
          <h2 className="text-xl font-black text-white">
            {language === 'ar' ? 'تم رفض الوصول — لوحة محمية' : 'Access Denied — Restricted'}
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {language === 'ar'
              ? 'هذه اللوحة مخصصة فقط لمدير النظام المرخص له (dev.ma.mohamad@gmail.com). حسابك الحالي ليس لديه صلاحيات الإدارة.'
              : 'This dashboard is restricted to the authorized administrator (dev.ma.mohamad@gmail.com). Your account lacks admin privileges.'}
          </p>
          <button
            onClick={onNavigateHome}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors"
          >
            ← {language === 'ar' ? 'العودة للرئيسية' : 'Return to Home'}
          </button>
        </div>
      </div>
    );
  }

  // Calculate real metrics
  const totalUsers = usersList.length;
  const totalCompletedLessons = usersList.reduce(
    (acc, curr) => acc + (curr.completedLessons?.length || 0),
    0
  );
  const totalEarnedPoints = usersList.reduce(
    (acc, curr) => acc + (curr.points || 0),
    0
  );
  const reportedComments = commentsList.filter((c) => c.reported);

  const handleDeleteComment = async (commentId: string, authorName: string) => {
    if (!window.confirm(`Delete comment from ${authorName}?`)) return;

    try {
      await deleteDoc(doc(db, 'comments', commentId));

      // Record audit log
      await addDoc(collection(db, 'admin_audit_logs'), {
        adminEmail: user.email,
        action: `Deleted comment from ${authorName}`,
        targetId: commentId,
        timestamp: serverTimestamp()
      });

      // Refresh state
      setCommentsList((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  const filteredUsers = usersList.filter(
    (u) =>
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.displayName && u.displayName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="text-xs uppercase font-mono tracking-wider text-slate-400 hover:text-cyan-400 transition-colors"
            >
              ← {language === 'ar' ? 'الرئيسية' : 'Home'}
            </button>
            <span className="text-slate-600">/</span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span className="text-xs uppercase font-mono tracking-wider text-purple-400 font-bold">
                Admin Console
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
              Admin: <strong className="text-cyan-400">{user.email}</strong>
            </span>
            <button
              onClick={fetchData}
              disabled={loading}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Dashboard Title */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2.5">
            <span>{language === 'ar' ? 'لوحة تحكم وإدارة المنصة' : 'Learning Platform Admin Console'}</span>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-500/40">
              SECURE
            </span>
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            Direct real-time query interface with production Firestore database.
          </p>
        </div>

        {/* Nav Tabs */}
        <div className="flex gap-2 overflow-x-auto border-b border-slate-800 pb-2">
          {[
            { id: 'overview', label: language === 'ar' ? 'نظرة عامة' : 'Overview', icon: Sparkles },
            { id: 'users', label: `${language === 'ar' ? 'المستخدمين' : 'Users'} (${totalUsers})`, icon: Users },
            { id: 'moderation', label: `${language === 'ar' ? 'التعليقات' : 'Comments'} (${commentsList.length})`, icon: MessageSquare },
            { id: 'audit', label: language === 'ar' ? 'سجل العمليات' : 'Audit Logs', icon: Clock }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all border shrink-0 ${
                  active
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-sm'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Metric Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-mono uppercase">{language === 'ar' ? 'إجمالي المسجلين' : 'Registered Users'}</span>
                  <Users className="w-4 h-4 text-cyan-400" />
                </div>
                <p className="text-2xl font-black text-white font-mono">{totalUsers}</p>
                <p className="text-[11px] text-slate-500 font-mono">100% verified database count</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-mono uppercase">{language === 'ar' ? 'الدروس المكتملة' : 'Completed Lessons'}</span>
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-2xl font-black text-emerald-400 font-mono">{totalCompletedLessons}</p>
                <p className="text-[11px] text-slate-500 font-mono">Across all learners</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-mono uppercase">{language === 'ar' ? 'النقاط الممنوحة' : 'Points Awarded'}</span>
                  <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                </div>
                <p className="text-2xl font-black text-amber-400 font-mono">{totalEarnedPoints}</p>
                <p className="text-[11px] text-slate-500 font-mono">+1 pt rule applied</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-mono uppercase">{language === 'ar' ? 'التعليقات والمراجعات' : 'Community Reviews'}</span>
                  <MessageSquare className="w-4 h-4 text-purple-400" />
                </div>
                <p className="text-2xl font-black text-purple-400 font-mono">{commentsList.length}</p>
                <p className="text-[11px] text-amber-400 font-mono">
                  {reportedComments.length} reported for review
                </p>
              </div>
            </div>

            {/* Quick Summary Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Registrations */}
              <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
                <h3 className="font-bold text-white text-sm font-mono uppercase tracking-wider flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span>{language === 'ar' ? 'أحدث المتعلمين المسجلين' : 'Latest Registered Learners'}</span>
                </h3>

                <div className="space-y-2.5">
                  {usersList.slice(0, 5).map((u) => (
                    <div
                      key={u.uid}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs"
                    >
                      <div>
                        <p className="font-bold text-white">{u.displayName || u.email}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{u.email}</p>
                      </div>
                      <div className="text-end font-mono">
                        <span className="text-amber-400 font-bold">{u.points || 0} pts</span>
                        <span className="text-slate-500 block text-[10px] capitalize">{u.selectedLevel || 'beginner'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reported Comments Alert */}
              <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
                <h3 className="font-bold text-white text-sm font-mono uppercase tracking-wider flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>{language === 'ar' ? 'تعليقات تم الإبلاغ عنها' : 'Reported Comments Queue'}</span>
                </h3>

                {reportedComments.length === 0 ? (
                  <div className="py-8 text-center bg-slate-950/40 rounded-xl border border-slate-800 text-xs text-slate-500">
                    ✓ Clean queue! No abusive or reported comments found.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {reportedComments.map((c) => (
                      <div
                        key={c.id}
                        className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-amber-300">{c.userDisplayName}</span>
                          <button
                            onClick={() => handleDeleteComment(c.id, c.userDisplayName)}
                            className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 text-[10px]"
                          >
                            Delete
                          </button>
                        </div>
                        <p className="text-slate-300 text-xs">{c.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: USER MANAGEMENT */}
        {activeTab === 'users' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Search Box */}
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search user by email or name..."
                className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-purple-500 font-mono"
              />
            </div>

            {/* Users Table */}
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                    <tr>
                      <th className="p-4">User</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Level</th>
                      <th className="p-4">Points</th>
                      <th className="p-4">Lessons Done</th>
                      <th className="p-4">Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredUsers.map((u) => (
                      <tr key={u.uid} className="hover:bg-slate-850/50 transition-colors">
                        <td className="p-4 font-bold text-white flex items-center gap-2">
                          {u.photoURL ? (
                            <img src={u.photoURL} className="w-6 h-6 rounded-md object-cover" />
                          ) : (
                            <div className="w-6 h-6 rounded-md bg-slate-800 flex items-center justify-center text-[10px]">
                              {u.displayName?.[0] || 'U'}
                            </div>
                          )}
                          <span>{u.displayName || 'Learner'}</span>
                        </td>
                        <td className="p-4 text-slate-400">{u.email}</td>
                        <td className="p-4 capitalize text-cyan-400">{u.selectedLevel || 'beginner'}</td>
                        <td className="p-4 font-bold text-amber-400">{u.points || 0}</td>
                        <td className="p-4 text-slate-300">{u.completedLessons?.length || 0}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] ${
                            u.role === 'admin'
                              ? 'bg-purple-950 text-purple-300 border border-purple-500/40'
                              : 'bg-slate-800 text-slate-400'
                          }`}>
                            {u.role || 'user'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MODERATION */}
        {activeTab === 'moderation' && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="font-bold text-white text-sm font-mono">
              All Community Comments ({commentsList.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {commentsList.map((c) => (
                <div
                  key={c.id}
                  className={`p-4 rounded-2xl border space-y-3 ${
                    c.reported ? 'bg-amber-950/20 border-amber-500/50' : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{c.userDisplayName}</span>
                    <button
                      onClick={() => handleDeleteComment(c.id, c.userDisplayName)}
                      className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                      title="Delete Comment"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{c.content}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>Rating: {c.rating ? `${c.rating}★` : 'None'}</span>
                    {c.reported && <span className="text-amber-400 font-bold">⚠️ REPORTED</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: AUDIT LOGS */}
        {activeTab === 'audit' && (
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 space-y-4 animate-fadeIn">
            <h3 className="font-bold text-white text-sm font-mono flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Administrative Moderation Logs</span>
            </h3>

            {auditLogs.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 font-mono">No actions recorded yet.</p>
            ) : (
              <div className="space-y-2 font-mono text-xs">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-cyan-400 font-bold">{log.adminEmail}</span>
                      <p className="text-slate-300 mt-0.5">{log.action}</p>
                    </div>
                    <span className="text-slate-600 text-[10px]">Logged</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
