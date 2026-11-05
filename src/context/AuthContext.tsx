import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
  collection,
  onSnapshot
} from 'firebase/firestore';
import {
  auth,
  db,
  googleProvider,
  githubProvider,
  ADMIN_EMAIL,
  UserProfileData
} from '../lib/firebase';

interface AuthContextType {
  user: User | null;
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
  recordQuizAttempt: (questionId: string | number, isCorrect: boolean) => Promise<{ earnedPoint: boolean }>;
  updateUserProfile: (displayName: string, photoURL?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Sync Auth State & Profile
  useEffect(() => {
    let unsubscribeProfile: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);

        // Listen to live updates of the profile
        unsubscribeProfile = onSnapshot(userDocRef, async (snapshot) => {
          if (snapshot.exists()) {
            setProfile(snapshot.data() as UserProfileData);
          } else {
            // First time login - initialize profile document in Firestore
            const isInitialAdmin = currentUser.email === ADMIN_EMAIL;
            const newProfile: UserProfileData = {
              uid: currentUser.uid,
              email: currentUser.email || '',
              displayName: currentUser.displayName || currentUser.email?.split('@')[0] || 'Web Developer',
              photoURL: currentUser.photoURL || '',
              role: isInitialAdmin ? 'admin' : 'user',
              selectedLevel: undefined,
              onboardingCompleted: false,
              points: 0,
              currentCourse: 'html',
              currentLessonId: 'html-01',
              completedLessons: [],
              completedExercises: [],
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
              lastActivityDate: serverTimestamp()
            };

            await setDoc(userDocRef, newProfile);
            setProfile(newProfile);
          }
          setIsLoading(false);
        }, (err) => {
          console.error("Profile snapshot error:", err);
          setIsLoading(false);
        });
      } else {
        if (unsubscribeProfile) {
          unsubscribeProfile();
          unsubscribeProfile = null;
        }
        setProfile(null);
        setIsLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
    };
  }, []);

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const loginWithGitHub = async () => {
    await signInWithPopup(auth, githubProvider);
  };

  const loginWithEmail = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const registerWithEmail = async (email: string, pass: string, name: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    if (name) {
      await updateProfile(cred.user, { displayName: name });
    }
  };

  const sendPasswordReset = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const updateLevel = async (level: 'beginner' | 'intermediate' | 'advanced') => {
    if (!user) return;
    const userDocRef = doc(db, 'users', user.uid);
    await updateDoc(userDocRef, {
      selectedLevel: level,
      updatedAt: serverTimestamp(),
      lastActivityDate: serverTimestamp()
    });
  };

  const completeOnboarding = async (level: 'beginner' | 'intermediate' | 'advanced') => {
    if (!user) return;
    const userDocRef = doc(db, 'users', user.uid);
    await updateDoc(userDocRef, {
      selectedLevel: level,
      onboardingCompleted: true,
      updatedAt: serverTimestamp(),
      lastActivityDate: serverTimestamp()
    });
  };

  const saveProgress = async (courseId: string, lessonId: string, completedLessons: string[]) => {
    if (!user) return;
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        currentCourse: courseId,
        currentLessonId: lessonId,
        completedLessons: completedLessons,
        lastActivityDate: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      console.error("Error saving progress to backend:", err);
    }
  };

  // Rule 6: Exactly +1 point for answering correctly on the FIRST attempt!
  const recordQuizAttempt = async (
    questionId: string | number,
    isCorrect: boolean
  ): Promise<{ earnedPoint: boolean }> => {
    if (!user) return { earnedPoint: false };

    try {
      const qIdStr = String(questionId);
      const attemptDocRef = doc(db, 'users', user.uid, 'quizAttempts', qIdStr);
      const attemptSnap = await getDoc(attemptDocRef);

      const userDocRef = doc(db, 'users', user.uid);

      if (!attemptSnap.exists()) {
        // First attempt ever for this question!
        if (isCorrect) {
          // Rule: Reward +1 point!
          await setDoc(attemptDocRef, {
            questionId: qIdStr,
            firstAttemptCorrect: true,
            attemptsCount: 1,
            earnedPoint: true,
            answeredAt: serverTimestamp()
          });

          await updateDoc(userDocRef, {
            points: increment(1),
            lastActivityDate: serverTimestamp()
          });

          return { earnedPoint: true };
        } else {
          // First attempt was incorrect: 0 points now and forever for this question
          await setDoc(attemptDocRef, {
            questionId: qIdStr,
            firstAttemptCorrect: false,
            attemptsCount: 1,
            earnedPoint: false,
            answeredAt: serverTimestamp()
          });

          await updateDoc(userDocRef, {
            lastActivityDate: serverTimestamp()
          });

          return { earnedPoint: false };
        }
      } else {
        // Repeated attempt on the same question: strictly 0 points
        const existingData = attemptSnap.data();
        await updateDoc(attemptDocRef, {
          attemptsCount: (existingData?.attemptsCount || 1) + 1,
          lastAttemptedAt: serverTimestamp()
        });

        return { earnedPoint: false };
      }
    } catch (err) {
      console.error("Error recording quiz attempt:", err);
      return { earnedPoint: false };
    }
  };

  const updateUserProfile = async (displayName: string, photoURL?: string) => {
    if (!user) return;
    await updateProfile(user, { displayName, photoURL });
    const userDocRef = doc(db, 'users', user.uid);
    await updateDoc(userDocRef, {
      displayName,
      ...(photoURL ? { photoURL } : {}),
      updatedAt: serverTimestamp()
    });
  };

  const isAdmin = Boolean(
    user && (user.email === ADMIN_EMAIL || profile?.role === 'admin')
  );

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
