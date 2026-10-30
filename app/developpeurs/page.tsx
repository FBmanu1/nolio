'use client';

import React from 'react';
import Link from 'next/link';
import { NolioLogo } from '@/components/ui/nolio-logo';
import { Code2, Cpu, Terminal, ArrowRight, ShieldCheck, Zap, Globe2, Sparkles, CheckCircle2 } from 'lucide-react';

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-white text-[#111215] antialiased">
      {/* Navbar */}
      <header className="border-b border-[#F0F0F4] bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <Link href="/">
            <NolioLogo size="md" />
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-[#52545D]">
            <Link href="/annonceurs" className="hover:text-[#111215] transition-colors">
              Annonceurs
            </Link>
            <Link href="/createurs" className="hover:text-[#111215] transition-colors">
              Créateurs
            </Link>
            <Link href="/developpeurs" className="text-[#7257E8] font-bold">
              Développeurs
            </Link>
            <Link href="/fonctionnement" className="hover:text-[#111215] transition-colors">
              Fonctionnement
            </Link>
            <Link href="/tarifs" className="hover:text-[#111215] transition-colors">
              Tarifs
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/connexion"
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#111215] hover:bg-[#F5F5F7] transition-colors"
            >
              Se connecter
            </Link>
            <Link
              href="/inscription"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#7257E8] to-[#5E42DB] text-white text-xs font-bold shadow-md shadow-purple-500/20 transition-all hover:scale-[1.02]"
            >
              S&apos;enregistrer
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 py-16 sm:py-24 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F1FE] border border-[#E4DCFD] text-[11px] font-bold text-[#7257E8] mb-6">
          <Terminal className="w-3.5 h-3.5" />
          <span>Espace Développeurs & Integrations Web</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#111215] leading-tight tracking-tight mb-6">
          Intégrez le tracking Nolio dans vos applications web & SaaS
        </h1>
        <p className="text-sm sm:text-base text-[#52545D] max-w-2xl mx-auto mb-8 leading-relaxed">
          Que vous développiez un SaaS, une application mobile ou un site e-commerce, Nolio vous fournit des SDKs légers et des Webhooks sécurisés pour attribuer en temps réel les clics et conversions générés par vos créateurs.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/inscription"
            className="px-6 py-3.5 rounded-2xl bg-[#7257E8] hover:bg-[#5E42DB] text-white font-bold text-xs shadow-lg flex items-center gap-2 transition-all"
          >
            <span>Obtenir vos clés API</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Code Snippet Box */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="rounded-3xl bg-[#111215] text-white p-6 sm:p-8 shadow-2xl font-mono text-xs overflow-x-auto border border-neutral-800">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-4 text-neutral-400">
            <span className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#7257E8]" />
              <span>nolio-tracking.js</span>
            </span>
            <span className="text-[10px] bg-neutral-800 px-2 py-0.5 rounded text-emerald-400 font-bold">
              v1.2.0 Active
            </span>
          </div>
          <pre className="text-emerald-300 leading-relaxed">
{`// Initialisation du Pixel Nolio sur votre SaaS ou Landing Page
import { NolioTracker } from '@nolio/sdk';

const nolio = new NolioTracker({
  campaignId: 'cmp_acme_launch_2026',
  apiKey: process.env.NOLIO_PUBLIC_KEY
});

// Attribution automatique du clic créateur
nolio.trackVisit();

// Callback lors de la conversion de l'utilisateur
nolio.trackConversion({
  userEmail: 'client@exemple.com',
  plan: 'pro_monthly',
  valueUSD: 49.00
});`}
          </pre>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16 border-t border-[#F0F0F4]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-3xl bg-[#F9F9FB] border border-[#EAEAEF]">
            <Zap className="w-6 h-6 text-[#7257E8] mb-3" />
            <h3 className="font-bold text-base text-[#111215] mb-2">Webhooks Tempe Réel</h3>
            <p className="text-xs text-[#52545D] leading-relaxed">
              Recevez des notifications instantanées lorsque les vues d&apos;un créateur dépassent des seuils de palier ou lorsqu&apos;un deliverable est validé.
            </p>
          </div>
          <div className="p-6 rounded-3xl bg-[#F9F9FB] border border-[#EAEAEF]">
            <ShieldCheck className="w-6 h-6 text-[#7257E8] mb-3" />
            <h3 className="font-bold text-base text-[#111215] mb-2">Anti-Fraude et Verification</h3>
            <p className="text-xs text-[#52545D] leading-relaxed">
              Nos algorithmes filtrent automatiquement les bots, les spams et les faux comptes pour garantir un taux de conversion authentique.
            </p>
          </div>
          <div className="p-6 rounded-3xl bg-[#F9F9FB] border border-[#EAEAEF]">
            <Globe2 className="w-6 h-6 text-[#7257E8] mb-3" />
            <h3 className="font-bold text-base text-[#111215] mb-2">Déploiement Afrique & Global</h3>
            <p className="text-xs text-[#52545D] leading-relaxed">
              Infrastructure à très faible latence adaptée aux réseaux mobiles d&apos;Afrique subsaharienne, d&apos;Afrique du Nord et d&apos;Europe.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#F0F0F4] bg-[#FAF9FC] py-12 text-xs text-[#71737D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <NolioLogo size="sm" />
          <p>© 2026 Nolio. Plateforme internationale de promotion par les créateurs.</p>
          <div className="flex gap-4">
            <Link href="/legal/conditions" className="hover:underline">Conditions</Link>
            <Link href="/legal/confidentialite" className="hover:underline">Confidentialité</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
