import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import {
  ADMIN_EMAIL,
  AppUser,
  profileFromRow,
  profileToRow,
  supabase,
  UserProfileData,
  UserProfileRow,
  toAppUser
} from '../lib/supabase';

interface AuthContextType {
  user: AppUser | null;
  profile: UserProfileData | null;
  isLoading: boolean;
  isAdmin: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithGitHub: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  updateLevel: (level: 'beginner' | 'intermediate' | 'advanced') => Promise<void>;
  completeOnboarding: (level: 'beginner' | 'intermediate' | 'advanced') => Promise<void>;
  saveProgress: (courseId: string, lessonId: string, completedLessons: string[]) => Promise<void>;
  recordQuizAttempt: (questionId: string | number, answerIndex: number) => Promise<{ earnedPoint: boolean }>;
  updateUserProfile: (displayName: string, photoURL?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    let profileChannel: ReturnType<typeof supabase.channel> | null = null;

    const loadProfile = async (authUser: NonNullable<Session['user']>) => {
      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', authUser.id)
          .maybeSingle();
        if (error) throw error;

        let row = data as UserProfileRow | null;
        if (!row) {
          const mappedUser = toAppUser(authUser);
          const initialProfile: UserProfileData = {
            uid: mappedUser.uid,
            email: mappedUser.email,
            displayName: mappedUser.displayName,
            photoURL: mappedUser.photoURL,
            role: 'user',
            onboardingCompleted: false,
            points: 0,
            currentCourse: 'html',
            currentLessonId: 'html-01',
            completedLessons: [],
            completedExercises: []
          };
          const { data: created, error: createError } = await supabase
            .from('user_profiles')
            .upsert(profileToRow(initialProfile))
            .select('*')
            .single();
          if (createError) throw createError;
          row = created as UserProfileRow;
        }

        if (active) setProfile(profileFromRow(row));
      } catch (error) {
        console.error('Failed to load Supabase user profile:', error);
        if (active) setProfile(null);
      } finally {
        if (active) setIsLoading(false);
      }
    };

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser ? toAppUser(currentUser) : null);
      setProfile(null);

      if (profileChannel) {
        void supabase.removeChannel(profileChannel);
        profileChannel = null;
      }

      if (!currentUser) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      queueMicrotask(() => {
        if (active) void loadProfile(currentUser);
      });

      profileChannel = supabase
        .channel(`profile-${currentUser.id}`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'user_profiles', filter: `id=eq.${currentUser.id}` },
          (payload) => {
            if (active && payload.new && Object.keys(payload.new).length > 0) {
              setProfile(profileFromRow(payload.new as UserProfileRow));
            }
          }
        )
        .subscribe();
    });

    return () => {
      active = false;
      authListener.subscription.unsubscribe();
      if (profileChannel) void supabase.removeChannel(profileChannel);
    };
  }, []);

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    });
    if (error) throw error;
  };

  const loginWithGitHub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: window.location.origin }
    });
    if (error) throw error;
  };

  const loginWithEmail = async (email: string, pass: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) throw error;
  };

  const registerWithEmail = async (email: string, pass: string, name: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: { data: { display_name: name } }
    });
    if (error) throw error;
  };

  const sendPasswordReset = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin
    });
    if (error) throw error;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const updateLevel = async (level: 'beginner' | 'intermediate' | 'advanced') => {
    if (!user) return;
    const { error } = await supabase
      .from('user_profiles')
      .update({ selected_level: level, last_activity_date: new Date().toISOString() })
      .eq('id', user.uid);
    if (error) throw error;
  };

  const completeOnboarding = async (level: 'beginner' | 'intermediate' | 'advanced') => {
    if (!user) return;
    const { error } = await supabase
      .from('user_profiles')
      .update({
        selected_level: level,
        onboarding_completed: true,
        last_activity_date: new Date().toISOString()
      })
      .eq('id', user.uid);
    if (error) throw error;
  };

  const saveProgress = async (courseId: string, lessonId: string, completedLessons: string[]) => {
    if (!user) return;
    const { error } = await supabase
      .from('user_profiles')
      .update({
        current_course: courseId,
        current_lesson_id: lessonId,
        completed_lessons: completedLessons,
        last_activity_date: new Date().toISOString()
      })
      .eq('id', user.uid);
    if (error) {
      console.error('Error saving progress to Supabase:', error);
      throw error;
    }
  };

  const recordQuizAttempt = async (
    questionId: string | number,
    answerIndex: number
  ): Promise<{ earnedPoint: boolean }> => {
    if (!user) return { earnedPoint: false };
    const { data, error } = await supabase.rpc('record_quiz_attempt', {
      p_user_id: user.uid,
      p_question_id: String(questionId),
      p_answer_index: answerIndex
    });
    if (error) {
      console.error('Error recording quiz attempt in Supabase:', error);
      throw error;
    }
    return data as { earnedPoint: boolean };
  };

  const updateUserProfile = async (displayName: string, photoURL?: string) => {
    if (!user) return;
    const { error: authError } = await supabase.auth.updateUser({
      data: {
        display_name: displayName,
        ...(photoURL ? { avatar_url: photoURL } : {})
      }
    });
    if (authError) throw authError;

    const { error } = await supabase
      .from('user_profiles')
      .update({
        display_name: displayName,
        ...(photoURL ? { photo_url: photoURL } : {})
      })
      .eq('id', user.uid);
    if (error) throw error;
  };

  const isAdmin = Boolean(user && (user.email === ADMIN_EMAIL || profile?.role === 'admin'));

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        isAdmin,
        loginWithGoogle,
        loginWithGitHub,
        loginWithEmail,
        registerWithEmail,
        sendPasswordReset,
        logout,
        updateLevel,
        completeOnboarding,
        saveProgress,
        recordQuizAttempt,
        updateUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
