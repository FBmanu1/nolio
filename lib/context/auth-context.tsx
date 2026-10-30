'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Profile, AccountType } from '@/lib/supabase/types';

interface DemoAccount {
  id: string;
  email: string;
  displayName: string;
  accountType: AccountType;
  isAdmin: boolean;
  avatarUrl: string;
  roleLabel: string;
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    id: '820cf538-f540-4251-88f1-77167fbd5d16',
    email: 'demo-advertiser@nolio.app',
    displayName: 'Acme SaaS Studio',
    accountType: 'advertiser',
    isAdmin: false,
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    roleLabel: 'Annonceur (SaaS Founder)',
  },
  {
    id: '6c329ea1-0e8b-4d9d-8927-ef4616753524',
    email: 'demo-creator@nolio.app',
    displayName: 'Alexandre Riva',
    accountType: 'creator',
    isAdmin: false,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    roleLabel: 'Créateur Vérifié (87.5k abonnés)',
  },
  {
    id: '89caa6eb-3c2a-4685-b732-08d89b967f59',
    email: 'demo-admin@nolio.app',
    displayName: 'Nolio Security Admin',
    accountType: 'advertiser',
    isAdmin: true,
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    roleLabel: 'Administrateur Plateforme',
  },
];

interface AuthContextType {
  user: Profile | null;
  email: string;
  accountType: AccountType;
  isAdmin: boolean;
  isLoading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ error?: string }>;
  signUpWithEmail: (email: string, password: string, displayName: string, accountType: AccountType) => Promise<{ error?: string }>;
  signInWithGoogle: () => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  switchDemoAccount: (accountId: string) => Promise<void>;
  toggleAccountType: () => Promise<void>;
  updateProfileDisplayName: (displayName: string) => Promise<void>;
  isDemoMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Profile | null>({
    id: DEMO_ACCOUNTS[0].id,
    display_name: DEMO_ACCOUNTS[0].displayName,
    avatar_path: DEMO_ACCOUNTS[0].avatarUrl,
    account_type: DEMO_ACCOUNTS[0].accountType,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
  const [email, setEmail] = useState<string>(DEMO_ACCOUNTS[0].email);
  const [accountType, setAccountType] = useState<AccountType>(DEMO_ACCOUNTS[0].accountType);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);

  // Check Supabase session on mount
  useEffect(() => {
    async function initSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setIsDemoMode(false);
          setEmail(session.user.email || '');
          
          // Fetch real profile from Supabase
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            setUser(profile as Profile);
            setAccountType((profile.account_type as AccountType) || 'creator');
          } else {
            // Default profile from metadata
            const fallbackProfile: Profile = {
              id: session.user.id,
              display_name: session.user.user_metadata?.display_name || session.user.email?.split('@')[0] || 'Utilisateur',
              avatar_path: null,
              account_type: (session.user.user_metadata?.account_type as AccountType) || 'creator',
              created_at: session.user.created_at,
              updated_at: session.user.updated_at || session.user.created_at,
            };
            setUser(fallbackProfile);
            setAccountType(fallbackProfile.account_type);
          }
          
          // Check admin status
          const { data: adminRow } = await supabase
            .from('admin_users')
            .select('*')
            .eq('user_id', session.user.id)
            .maybeSingle();
          setIsAdmin(!!adminRow || session.user.email === 'demo-admin@nolio.app');
        }
      } catch (err) {
        console.warn('Initial session check note:', err);
      }
    }

    initSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setIsDemoMode(false);
        setEmail(session.user.email || '');
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle();

        if (profile) {
          setUser(profile as Profile);
          setAccountType((profile.account_type as AccountType) || 'creator');
        }
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const switchDemoAccount = async (accountId: string) => {
    setIsLoading(true);
    const target = DEMO_ACCOUNTS.find((a) => a.id === accountId) || DEMO_ACCOUNTS[0];
    
    // Attempt real sign-in to Supabase with demo credentials
    try {
      await supabase.auth.signInWithPassword({
        email: target.email,
        password: 'Password123!',
      });
    } catch {
      // Offline / client switch
    }

    setUser({
      id: target.id,
      display_name: target.displayName,
      avatar_path: target.avatarUrl,
      account_type: target.accountType,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    setEmail(target.email);
    setAccountType(target.accountType);
    setIsAdmin(target.isAdmin);
    setIsDemoMode(true);
    setIsLoading(false);
  };

  const signInWithEmail = async (userEmail: string, pass: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: pass,
      });

      if (error) {
        setIsLoading(false);
        return { error: error.message };
      }

      if (data?.user) {
        setIsDemoMode(false);
        setEmail(data.user.email || userEmail);
        
        // Fetch or create profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .maybeSingle();

        if (profile) {
          setUser(profile as Profile);
          setAccountType(profile.account_type as AccountType);
        } else {
          const newProfile: Profile = {
            id: data.user.id,
            display_name: data.user.user_metadata?.display_name || userEmail.split('@')[0],
            avatar_path: null,
            account_type: (data.user.user_metadata?.account_type as AccountType) || 'creator',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          setUser(newProfile);
          setAccountType(newProfile.account_type);
          await supabase.from('profiles').insert([newProfile]).maybeSingle();
        }

        setIsAdmin(userEmail === 'demo-admin@nolio.app');
      }
      setIsLoading(false);
      return {};
    } catch (err: unknown) {
      setIsLoading(false);
      return { error: err instanceof Error ? err.message : 'Erreur de connexion' };
    }
  };

  const signUpWithEmail = async (
    userEmail: string,
    pass: string,
    displayName: string,
    selectedType: AccountType
  ) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userEmail,
        password: pass,
        options: {
          data: {
            display_name: displayName,
            account_type: selectedType,
          },
        },
      });

      if (error) {
        setIsLoading(false);
        return { error: error.message };
      }

      if (data?.user) {
        setIsDemoMode(false);
        setEmail(userEmail);
        const newProfile: Profile = {
          id: data.user.id,
          display_name: displayName,
          avatar_path: null,
          account_type: selectedType,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        // Insert into public.profiles
        try {
          await supabase.from('profiles').insert([newProfile]);
        } catch (insertErr) {
          console.warn('Profile insert note:', insertErr);
        }

        setUser(newProfile);
        setAccountType(selectedType);
        setIsAdmin(false);
      }

      setIsLoading(false);
      return {};
    } catch (err: unknown) {
      setIsLoading(false);
      return { error: err instanceof Error ? err.message : 'Erreur lors de la création du compte' };
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/` : undefined,
        },
      });
      if (error) {
        setIsLoading(false);
        return { error: error.message };
      }
      return {};
    } catch (err: unknown) {
      setIsLoading(false);
      return { error: err instanceof Error ? err.message : 'Erreur de connexion Google' };
    }
  };

  const toggleAccountType = async () => {
    const nextType: AccountType = accountType === 'creator' ? 'advertiser' : 'creator';
    setAccountType(nextType);
    if (user) {
      const updatedUser: Profile = {
        ...user,
        account_type: nextType,
        updated_at: new Date().toISOString(),
      };
      setUser(updatedUser);
      try {
        await supabase
          .from('profiles')
          .update({ account_type: nextType, updated_at: new Date().toISOString() })
          .eq('id', user.id);
      } catch (err) {
        console.warn('Profile account_type update note:', err);
      }
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
    setUser(null);
    setEmail('');
    setIsAdmin(false);
    setIsLoading(false);
  };

  const updateProfileDisplayName = async (newDisplayName: string) => {
    if (!user) return;
    const updated = { ...user, display_name: newDisplayName, updated_at: new Date().toISOString() };
    setUser(updated);
    try {
      await supabase.from('profiles').update({ display_name: newDisplayName, updated_at: new Date().toISOString() }).eq('id', user.id);
    } catch {
      // ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        email,
        accountType,
        isAdmin,
        isLoading,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signOut,
        switchDemoAccount,
        toggleAccountType,
        updateProfileDisplayName,
        isDemoMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
