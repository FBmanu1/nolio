'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/context/auth-context';
import { AccountType } from '@/lib/supabase/types';
import {
  Mail,
  Lock,
  User,
  Building2,
  Video,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

function InscriptionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role') === 'advertiser' ? 'advertiser' : 'creator';

  const { signUpWithEmail, isLoading } = useAuth();

  const [accountType, setAccountType] = useState<AccountType>(initialRole);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (password.length < 6) {
      setErrorMsg('Le mot de passe doit comporter au moins 6 caractères.');
      return;
    }

    setSubmitting(true);
    const res = await signUpWithEmail(email, password, displayName, accountType);
    setSubmitting(false);

    if (res.error) {
      setErrorMsg(res.error);
    } else {
      setSuccessMsg(
        'Compte créé avec succès ! Vous pouvez maintenant accéder à votre tableau de bord.'
      );
      setTimeout(() => {
        if (accountType === 'advertiser') {
          router.push('/dashboard/annonceur');
        } else {
          router.push('/dashboard/createur');
        }
      }, 1500);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-20 w-full">
      <div className="bg-white rounded-3xl border border-[#E5E5EB] p-6 sm:p-8 shadow-xs">
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-1.5 mb-3 group">
            <span className="w-6 h-6 rounded-md bg-[#7257E8] text-white flex items-center justify-center font-bold text-xs">
              N
            </span>
            <span className="text-lg font-bold text-[#222126]">
              nolio<span className="text-[#7257E8]">.</span>
            </span>
          </Link>
          <h1 className="text-xl font-bold text-[#222126]">Rejoindre Nolio</h1>
          <p className="text-xs text-[#6E6D7A] mt-1">
            Choisissez le type d’espace qui correspond à vos objectifs
          </p>
        </div>

        {/* Role Selector Tabs (Segmented control) */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-[#F6F6F8] rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => setAccountType('advertiser')}
            className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              accountType === 'advertiser'
                ? 'bg-white text-[#222126] shadow-xs'
                : 'text-[#6E6D7A] hover:text-[#222126]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-[#7257E8]" />
            Annonceur
          </button>

          <button
            type="button"
            onClick={() => setAccountType('creator')}
            className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              accountType === 'creator'
                ? 'bg-white text-[#222126] shadow-xs'
                : 'text-[#6E6D7A] hover:text-[#222126]'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-emerald-600" />
            Créateur
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 text-xs flex items-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#222126] mb-1">
              {accountType === 'advertiser' ? 'Nom de votre entreprise ou produit' : 'Votre nom ou pseudo de créateur'}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder={accountType === 'advertiser' ? 'Ex. Acme SaaS' : 'Ex. Alex Tech'}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7257E8] bg-white text-neutral-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#222126] mb-1">
              Adresse e-mail professionnelle
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="vous@domaine.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7257E8] bg-white text-neutral-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#222126] mb-1">
              Mot de passe sécurisé
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="Au moins 6 caractères"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7257E8] bg-white text-neutral-800"
              />
            </div>
          </div>

          <p className="text-[11px] text-[#8E8D9A] leading-relaxed">
            En créant un compte, vous acceptez nos{' '}
            <Link href="/legal/conditions" className="text-[#7257E8] hover:underline">
              Conditions Générales
            </Link>{' '}
            et notre{' '}
            <Link href="/legal/confidentialite" className="text-[#7257E8] hover:underline">
              Politique de Confidentialité
            </Link>
            .
          </p>

          <button
            type="submit"
            disabled={submitting || isLoading}
            className="w-full py-2.5 px-4 rounded-xl bg-[#7257E8] hover:bg-[#5e42db] text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            {submitting ? 'Création du compte...' : 'Créer mon compte'}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-[#6E6D7A]">
          Vous avez déjà un compte ?{' '}
          <Link href="/connexion" className="text-[#7257E8] font-semibold hover:underline">
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function InscriptionPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-md mx-auto px-4 py-20 text-center text-xs text-neutral-400">
          Chargement du formulaire...
        </div>
      }
    >
      <InscriptionForm />
    </Suspense>
  );
}
