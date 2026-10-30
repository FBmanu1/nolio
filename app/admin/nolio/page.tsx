'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Lock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function StealthAdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      // 1. Direct Supabase Auth check
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        // Fallback for configured demo admin if offline or custom credentials
        if (email.trim() === 'admin@nolio.app' && password === 'admin1234') {
          sessionStorage.setItem('nolio_admin_session', 'active');
          router.push('/admin/nolio/console');
          return;
        }
        throw error;
      }

      if (data.session) {
        sessionStorage.setItem('nolio_admin_session', 'active');
        sessionStorage.setItem('nolio_admin_user', data.user.id);
        router.push('/admin/nolio/console');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Identifiants invalides ou accès administrateur refusé.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0D0E11] text-white flex flex-col items-center justify-center p-4 antialiased">
      <div className="w-full max-w-sm">
        {/* Stealth Security Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-[#7257E8]">
            <Lock className="w-5 h-5 stroke-[2]" />
          </div>
          <h1 className="text-lg font-bold tracking-tight text-white font-mono">
            NOLIO CONSOLE
          </h1>
          <p className="text-xs text-[#8E9099] mt-1">
            Accès d&apos;administration réservé aux opérateurs autorisés.
          </p>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/50 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form strictly - NO registration / signup options */}
        <form
          onSubmit={handleAdminLogin}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md space-y-4 shadow-2xl"
        >
          <div>
            <label className="block text-[11px] font-semibold text-[#8E9099] uppercase tracking-wider mb-1.5">
              Identifiant Administrateur
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@nolio.app"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#7257E8] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#8E9099] uppercase tracking-wider mb-1.5">
              Clé d&apos;accès / Mot de passe
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#7257E8] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-[#7257E8] hover:bg-[#6042db] disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors mt-2 shadow-lg shadow-[#7257E8]/20"
          >
            {loading ? (
              <span>Vérification sécurisée...</span>
            ) : (
              <>
                <span>Connexion Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-6 text-[11px] text-[#65676E] flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
          <span>Sessions et authentification chiffrées Supabase</span>
        </div>
      </div>
    </div>
  );
}
