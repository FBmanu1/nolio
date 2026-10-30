'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { Mail, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export default function MotDePasseOubliePage() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/connexion`,
      });

      setSubmitting(false);
      if (error) {
        setErrorMsg(error.message);
      } else {
        setSuccess(true);
      }
    } catch (err: unknown) {
      setSubmitting(false);
      setErrorMsg(err instanceof Error ? err.message : 'Une erreur est survenue.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-20 w-full">
      <div className="bg-white rounded-3xl border border-[#E5E5EB] p-6 sm:p-8 shadow-xs">
        <Link
          href="/connexion"
          className="inline-flex items-center gap-1.5 text-xs text-[#6E6D7A] hover:text-[#222126] transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Retour à la connexion
        </Link>

        <h1 className="text-xl font-bold text-[#222126] mb-2">Réinitialisation de mot de passe</h1>
        <p className="text-xs text-[#6E6D7A] mb-6 leading-relaxed">
          Saisissez l’adresse e-mail associée à votre compte Nolio. Nous vous enverrons un lien de
          récupération sécurisé.
        </p>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 text-xs flex items-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {success ? (
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs space-y-2">
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Lien de réinitialisation envoyé !
            </div>
            <p className="text-[11px] leading-relaxed text-emerald-700">
              Consultez votre boîte de réception pour réinitialiser votre mot de passe.
            </p>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
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

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 px-4 rounded-xl bg-[#7257E8] hover:bg-[#5e42db] text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              {submitting ? 'Envoi...' : 'Envoyer le lien de récupération'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
