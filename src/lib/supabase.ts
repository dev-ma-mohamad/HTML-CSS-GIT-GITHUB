import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY environment variable.');
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey);

export const ADMIN_EMAIL = 'dev.ma.mohamad@gmail.com';

export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
}

export interface UserProfileData {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: 'user' | 'admin';
  selectedLevel?: 'beginner' | 'intermediate' | 'advanced';
  onboardingCompleted?: boolean;
  points: number;
  currentCourse: string;
  currentLessonId: string;
  completedLessons: string[];
  completedExercises: string[];
  createdAt?: string;
  updatedAt?: string;
  lastActivityDate?: string;
}

export interface CommentData {
  id: string;
  userId: string;
  userDisplayName: string;
  userPhotoURL: string;
  content: string;
  rating?: number;
  reported?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface UserProfileRow {
  id: string;
  email: string;
  display_name: string;
  photo_url: string;
  role: 'user' | 'admin';
  selected_level: 'beginner' | 'intermediate' | 'advanced' | null;
  onboarding_completed: boolean;
  points: number;
  current_course: string;
  current_lesson_id: string;
  completed_lessons: string[];
  completed_exercises: string[];
  created_at: string;
  updated_at: string;
  last_activity_date: string;
}

export interface CommentRow {
  id: string;
  user_id: string;
  user_display_name: string;
  user_photo_url: string;
  content: string;
  rating: number | null;
  reported: boolean;
  created_at: string;
  updated_at: string;
}

export const toAppUser = (user: {
  id: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
}): AppUser => ({
  uid: user.id,
  email: user.email || '',
  displayName:
    (user.user_metadata?.display_name as string | undefined) ||
    (user.user_metadata?.full_name as string | undefined) ||
    (user.user_metadata?.name as string | undefined) ||
    user.email?.split('@')[0] ||
    'Web Developer',
  photoURL:
    (user.user_metadata?.avatar_url as string | undefined) ||
    (user.user_metadata?.picture as string | undefined) ||
    ''
});

export const profileFromRow = (row: UserProfileRow): UserProfileData => ({
  uid: row.id,
  email: row.email,
  displayName: row.display_name,
  photoURL: row.photo_url,
  role: row.role,
  selectedLevel: row.selected_level || undefined,
  onboardingCompleted: row.onboarding_completed,
  points: row.points,
  currentCourse: row.current_course,
  currentLessonId: row.current_lesson_id,
  completedLessons: row.completed_lessons || [],
  completedExercises: row.completed_exercises || [],
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  lastActivityDate: row.last_activity_date
});

export const commentFromRow = (row: CommentRow): CommentData => ({
  id: row.id,
  userId: row.user_id,
  userDisplayName: row.user_display_name || 'Learner',
  userPhotoURL: row.user_photo_url || '',
  content: row.content,
  rating: row.rating ?? undefined,
  reported: row.reported,
  createdAt: row.created_at,
  updatedAt: row.updated_at
});

export const profileToRow = (
  profile: Omit<UserProfileData, 'uid' | 'createdAt' | 'updatedAt' | 'lastActivityDate'> & { uid: string }
) => ({
  id: profile.uid,
  email: profile.email,
  display_name: profile.displayName,
  photo_url: profile.photoURL,
  role: profile.role,
  selected_level: profile.selectedLevel || null,
  onboarding_completed: profile.onboardingCompleted ?? false,
  points: profile.points,
  current_course: profile.currentCourse,
  current_lesson_id: profile.currentLessonId,
  completed_lessons: profile.completedLessons,
  completed_exercises: profile.completedExercises
});
