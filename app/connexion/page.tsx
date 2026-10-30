'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, DEMO_ACCOUNTS } from '@/lib/context/auth-context';
import { Mail, Lock, ArrowRight, AlertCircle, Sparkles, Building2, UserCheck, ShieldAlert } from 'lucide-react';

export default function ConnexionPage() {
  const router = useRouter();
  const { signInWithEmail, switchDemoAccount, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    const res = await signInWithEmail(email, password);
    setSubmitting(false);

    if (res.error) {
      setErrorMsg(res.error);
    } else {
      router.push('/');
    }
  };

  const handleQuickDemo = async (accountId: string, redirectPath: string) => {
    await switchDemoAccount(accountId);
    router.push(redirectPath);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-20 w-full">
      <div className="bg-white rounded-3xl border border-[#E5E5EB] p-6 sm:p-8 shadow-xs">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 mb-3 group">
            <span className="w-6 h-6 rounded-md bg-[#7257E8] text-white flex items-center justify-center font-bold text-xs">
              N
            </span>
            <span className="text-lg font-bold text-[#222126]">
              nolio<span className="text-[#7257E8]">.</span>
            </span>
          </Link>
          <h1 className="text-xl font-bold text-[#222126]">Connexion à votre espace</h1>
          <p className="text-xs text-[#6E6D7A] mt-1">
            Accédez à vos campagnes, vos livrables et votre portefeuille
          </p>
        </div>

        {/* Quick Demo Switcher Section */}
        <div className="p-3.5 rounded-2xl bg-[#F6F6F8] mb-6 border border-[#E5E5EB]">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#222126] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#7257E8]" />
            Connexion rapide de test (1 clic) :
          </div>
          <div className="space-y-1.5">
            <button
              type="button"
              onClick={() => handleQuickDemo(DEMO_ACCOUNTS[0].id, '/dashboard/annonceur')}
              className="w-full text-left px-3 py-2 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-200 text-xs flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-[#7257E8]" />
                <span className="font-medium text-[#222126]">Acme SaaS Studio</span>
              </div>
              <span className="text-[10px] text-[#6E6D7A]">Annonceur</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo(DEMO_ACCOUNTS[1].id, '/dashboard/createur')}
              className="w-full text-left px-3 py-2 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-200 text-xs flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-medium text-[#222126]">Alexandre Riva</span>
              </div>
              <span className="text-[10px] text-[#6E6D7A]">Créateur</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo(DEMO_ACCOUNTS[2].id, '/admin')}
              className="w-full text-left px-3 py-2 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-200 text-xs flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                <span className="font-medium text-[#222126]">Nolio Security Admin</span>
              </div>
              <span className="text-[10px] text-[#6E6D7A]">Admin</span>
            </button>
          </div>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-200" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-wider text-[#8E8D9A]">
            <span className="bg-white px-2">Ou avec votre compte</span>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 text-xs flex items-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Regular Supabase Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#222126] mb-1">
              Adresse e-mail
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7257E8] bg-white text-neutral-800"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-[#222126]">Mot de passe</label>
              <Link
                href="/mot-de-passe-oublie"
                className="text-[11px] text-[#7257E8] hover:underline"
              >
                Mot de passe oublié ?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7257E8] bg-white text-neutral-800"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting || isLoading}
            className="w-full py-2.5 px-4 rounded-xl bg-[#7257E8] hover:bg-[#5e42db] text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            {submitting ? 'Connexion en cours...' : 'Se connecter'}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-[#6E6D7A]">
          Pas encore de compte ?{' '}
          <Link href="/inscription" className="text-[#7257E8] font-semibold hover:underline">
            Créer un compte
          </Link>
        </div>
      </div>
    </div>
  );
}
