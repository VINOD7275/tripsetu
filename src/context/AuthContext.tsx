import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured, DEMO_USER } from '../lib/supabase';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isDemo: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error?: string }>;
  signInAsDemo: () => void;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDemo, setIsDemo] = useState<boolean>(false);

  useEffect(() => {
    const initAuth = async () => {
      // 1. If Supabase is configured, check session
      if (supabase && isSupabaseConfigured) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            // Fetch profile
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            setUser({
              id: session.user.id,
              email: session.user.email || '',
              fullName: profile?.full_name || session.user.user_metadata?.full_name || 'Traveler',
              avatarUrl: profile?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
              homeCity: profile?.home_city || 'New Delhi',
              preferredCurrency: profile?.preferred_currency || 'INR',
              travelStyle: profile?.travel_style || 'Adventure Explorer',
              bio: profile?.bio || 'Chasing peaks and wild rivers.',
              adventuresCompleted: profile?.adventures_completed || 5,
            });
            setIsDemo(false);
          }
        } catch (e) {
          console.warn('Auth session check error', e);
        }
      } else {
        // 2. Check local saved user
        const savedUser = localStorage.getItem('triptrail_user');
        if (savedUser) {
          try {
            const parsed = JSON.parse(savedUser);
            setUser(parsed);
            setIsDemo(parsed.id.startsWith('demo-'));
          } catch {
            setUser(null);
          }
        }
      }
      setIsLoading(false);
    };

    initAuth();

    // Listen to Supabase auth events if connected
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            fullName: session.user.user_metadata?.full_name || 'Traveler',
            avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            homeCity: 'New Delhi',
            preferredCurrency: 'INR',
            travelStyle: 'Adventure Explorer',
            bio: 'Chasing peaks and wild rivers.',
            adventuresCompleted: 5,
          });
          setIsDemo(false);
        } else if (!isDemo) {
          setUser(null);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  const signIn = async (email: string, password: string): Promise<{ error?: string }> => {
    setIsLoading(true);
    if (supabase && isSupabaseConfigured) {
      try {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          setIsLoading(false);
          return { error: error.message };
        }
      } catch (e: any) {
        setIsLoading(false);
        return { error: e.message || 'Failed to sign in' };
      }
    } else {
      // Local demo sign in
      const localUser: UserProfile = {
        id: 'user-' + btoa(email).substring(0, 8),
        email,
        fullName: email.split('@')[0],
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        homeCity: 'New Delhi',
        preferredCurrency: 'INR',
        travelStyle: 'Budget Backpacker',
        bio: 'Explorer logged in via local mode.',
        adventuresCompleted: 3,
      };
      setUser(localUser);
      setIsDemo(false);
      localStorage.setItem('triptrail_user', JSON.stringify(localUser));
    }
    setIsLoading(false);
    return {};
  };

  const signUp = async (email: string, password: string, fullName: string): Promise<{ error?: string }> => {
    setIsLoading(true);
    if (supabase && isSupabaseConfigured) {
      try {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName }
          }
        });
        if (error) {
          setIsLoading(false);
          return { error: error.message };
        }
      } catch (e: any) {
        setIsLoading(false);
        return { error: e.message || 'Failed to sign up' };
      }
    } else {
      // Local sign up
      const newUser: UserProfile = {
        id: 'user-' + Math.random().toString(36).substring(2, 9),
        email,
        fullName,
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        homeCity: 'New Delhi',
        preferredCurrency: 'INR',
        travelStyle: 'Adventure Backpacker',
        bio: 'New adventure enthusiast ready to explore.',
        adventuresCompleted: 0,
      };
      setUser(newUser);
      setIsDemo(false);
      localStorage.setItem('triptrail_user', JSON.stringify(newUser));
    }
    setIsLoading(false);
    return {};
  };

  const signInAsDemo = () => {
    setUser(DEMO_USER);
    setIsDemo(true);
    localStorage.setItem('triptrail_user', JSON.stringify(DEMO_USER));
  };

  const signOut = async () => {
    if (supabase && isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setIsDemo(false);
    localStorage.removeItem('triptrail_user');
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('triptrail_user', JSON.stringify(updated));

    if (supabase && isSupabaseConfigured) {
      try {
        await supabase
          .from('profiles')
          .update({
            full_name: updated.fullName,
            home_city: updated.homeCity,
            travel_style: updated.travelStyle,
            bio: updated.bio
          })
          .eq('id', user.id);
      } catch (err) {
        console.warn('Supabase profile update warning:', err);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isDemo,
        signIn,
        signUp,
        signInAsDemo,
        signOut,
        updateProfile
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
