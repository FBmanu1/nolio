'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NolioLogo } from '@/components/ui/nolio-logo';
import { useAuth } from '@/lib/context/auth-context';
import {
  ArrowRight,
  Play,
  CheckCircle2,
  Users,
  Eye,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  Video,
  DollarSign,
  Globe,
  Share2,
  Lock,
  Mail,
  Zap,
  Check,
  X,
  Building2,
  Code2,
  MessageSquare,
  AlertTriangle,
} from 'lucide-react';

interface ClickUpHeroLandingProps {
  onEnterFeed?: () => void;
}

export function ClickUpHeroLanding({ onEnterFeed }: ClickUpHeroLandingProps) {
  const router = useRouter();
  const { user } = useAuth();

  // Interactive SaaS preview card tab state
  const [activeTab, setActiveTab] = useState<'details' | 'rules' | 'profiles' | 'budget'>('details');
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <div className="relative min-h-screen bg-white text-[#111215] overflow-hidden antialiased flex flex-col justify-between">
      {/* Background radiant ambient glow */}
      <div className="absolute top-12 right-0 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] bg-gradient-to-bl from-purple-400/20 via-pink-400/15 to-indigo-300/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-96 left-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-300/15 via-purple-300/15 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Top Navbar */}
      <header className="relative z-20 border-b border-[#F0F0F4] bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="group flex items-center">
              <NolioLogo size="md" />
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-[#52545D]">
              <Link href="/annonceurs" className="hover:text-[#111215] transition-colors">
                Annonceurs
              </Link>
              <Link href="/createurs" className="hover:text-[#111215] transition-colors">
                Créateurs
              </Link>
              <Link href="/developpeurs" className="hover:text-[#111215] transition-colors">
                Développeurs
              </Link>
              <Link href="/fonctionnement" className="hover:text-[#111215] transition-colors">
                Comment ça marche
              </Link>
              <Link href="/tarifs" className="hover:text-[#111215] transition-colors">
                Tarifs
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                {onEnterFeed && (
                  <button
                    onClick={onEnterFeed}
                    className="px-4 py-2 rounded-xl bg-[#F2F2F5] hover:bg-[#EAEAEF] text-xs font-bold text-[#111215] transition-colors"
                  >
                    Accéder à l&apos;App
                  </button>
                )}
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-xl bg-[#1E2024] hover:bg-[#111215] text-white text-xs font-bold transition-all shadow-xs"
                >
                  Dashboard
                </Link>
              </div>
            ) : (
              <>
                <Link
                  href="/connexion"
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#111215] hover:bg-[#F5F5F7] transition-colors"
                >
                  Se connecter
                </Link>
                <Link
                  href="/inscription"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#7257E8] to-[#5E42DB] hover:from-[#5E42DB] text-white text-xs font-bold shadow-md shadow-purple-500/20 transition-all hover:scale-[1.02]"
                >
                  S&apos;enregistrer
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines & Vision */}
          <div className="lg:col-span-6 space-y-6">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F1FE] border border-[#E4DCFD] text-[11px] font-bold text-[#7257E8]">
              <Sparkles className="w-3.5 h-3.5 text-[#7257E8]" />
              <span>Conçu pour faire vibrer toute l&apos;Afrique et le monde</span>
            </div>

            {/* Bold Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#111215] leading-[1.12] tracking-tight">
              La plateforme de promotion SaaS & Produits par les créateurs
            </h1>

            {/* Sub-headline */}
            <p className="text-sm sm:text-base text-[#52545D] leading-relaxed max-w-xl">
              Nolio met en relation directe les entreprises, fondateurs de SaaS et développeurs avec des créateurs de contenu vérifiés. Lancez des campagnes vidéo ciblées avec budget sous séquestre sécurisé et rémunération au CPM réel.
            </p>

            {/* Primary CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href="/inscription"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#7257E8] via-[#6546E3] to-[#5532DB] hover:brightness-110 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25 transition-all hover:scale-[1.02]"
              >
                <span>S&apos;enregistrer gratuitement</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>

              <Link
                href="/connexion"
                className="px-5 py-3.5 rounded-2xl border border-[#EAEAEF] hover:bg-[#F5F5F7] text-xs font-bold text-[#111215] transition-colors flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4 text-[#7257E8]" />
                <span>Se connecter</span>
              </Link>
            </div>

            {/* Authentic Value Badge (No fake counts) */}
            <div className="flex items-center gap-3 pt-3">
              <div className="w-8 h-8 rounded-full bg-[#F4F1FE] flex items-center justify-center shrink-0 border border-[#E4DCFD]">
                <ShieldCheck className="w-4 h-4 text-[#7257E8]" />
              </div>
              <span className="text-xs font-semibold text-[#52545D]">
                <strong className="text-[#111215] font-bold">Paiements sous séquestre & vues certifiées</strong> · Afrique subsaharienne, Maghreb & International
              </span>
            </div>
          </div>

          {/* Right Column: Interactive SaaS Campaign Preview Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl bg-white border border-[#E0E0EB] shadow-2xl p-5 sm:p-6 transition-all">
              {/* Window Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-[#F0F0F4] mb-4">
                <div className="flex items-center gap-2 text-[11px] text-[#71737D] font-mono">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Nolio / Campagnes / Acme SaaS Launch</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                </div>
              </div>

              {/* Title & Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#111215]">
                    Acme Home | Multi-Channel Video Launch
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                      CAMPAGNE VERIFIÉE
                    </span>
                    <span className="text-[11px] text-[#71737D]">Rémunération : $18.00 CPM</span>
                  </div>
                </div>

                <button
                  onClick={() => setVideoPlaying(!videoPlaying)}
                  className="px-3.5 py-1.5 rounded-full bg-[#1E2024] hover:bg-[#111215] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>{videoPlaying ? 'Fermer démo' : 'Aperçu vidéo'}</span>
                </button>
              </div>

              {/* Engaging Creators Row */}
              <div className="flex items-center gap-2 py-2 px-3 rounded-xl bg-[#F9F9FB] border border-[#F0F0F4] mb-4 text-xs">
                <span className="text-[#71737D] font-medium text-[11px]">Créateurs qualifiés :</span>
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 border-2 border-white flex items-center justify-center text-white text-[9px] font-bold">
                    AR
                  </div>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 border-2 border-white flex items-center justify-center text-white text-[9px] font-bold">
                    SV
                  </div>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 border-2 border-white flex items-center justify-center text-white text-[9px] font-bold">
                    MD
                  </div>
                </div>
                <span className="text-[11px] text-[#111215] font-semibold ml-1">Sélection sur candidatures</span>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 border-b border-[#F0F0F4] text-xs font-semibold mb-4">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 px-3 border-b-2 transition-colors ${
                    activeTab === 'details'
                      ? 'border-[#7257E8] text-[#7257E8]'
                      : 'border-transparent text-[#71737D] hover:text-[#111215]'
                  }`}
                >
                  Brief
                </button>
                <button
                  onClick={() => setActiveTab('rules')}
                  className={`pb-2 px-3 border-b-2 transition-colors ${
                    activeTab === 'rules'
                      ? 'border-[#7257E8] text-[#7257E8]'
                      : 'border-transparent text-[#71737D] hover:text-[#111215]'
                  }`}
                >
                  Consignes
                </button>
                <button
                  onClick={() => setActiveTab('profiles')}
                  className={`pb-2 px-3 border-b-2 transition-colors ${
                    activeTab === 'profiles'
                      ? 'border-[#7257E8] text-[#7257E8]'
                      : 'border-transparent text-[#71737D] hover:text-[#111215]'
                  }`}
                >
                  Profils
                </button>
                <button
                  onClick={() => setActiveTab('budget')}
                  className={`pb-2 px-3 border-b-2 transition-colors ${
                    activeTab === 'budget'
                      ? 'border-[#7257E8] text-[#7257E8]'
                      : 'border-transparent text-[#71737D] hover:text-[#111215]'
                  }`}
                >
                  Escrow & CPM
                </button>
              </div>

              {/* Tab Content */}
              <div className="text-xs text-[#52545D] space-y-3 min-h-[130px]">
                {activeTab === 'details' && (
                  <>
                    <p className="leading-relaxed">
                      Démontrez l&apos;impact de notre SaaS en vidéo verticale (Shorts, TikTok ou Reels). Mettez en avant le gain de temps et l&apos;automatisation pour développeurs et créateurs.
                    </p>
                    <div className="p-3 rounded-xl bg-[#F8F7FF] border border-[#E9E4FC] space-y-1">
                      <div className="font-bold text-[#111215] text-[11px] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#7257E8]" />
                        <span>Objectif Nolio :</span>
                      </div>
                      <p className="text-[11px] text-[#52545D]">
                        Attribution transparente des clics et des conversions avec lien tracké individuel pour chaque créateur.
                      </p>
                    </div>
                  </>
                )}

                {activeTab === 'rules' && (
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#F0F0F4] text-[#111215] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        1
                      </span>
                      <span>Format vidéo 9:16 vertical de 30 à 60 secondes.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#F0F0F4] text-[#111215] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        2
                      </span>
                      <span>Accroche claire dans les 3 premières secondes + cas d&apos;usage réel.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#F0F0F4] text-[#111215] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        3
                      </span>
                      <span>Lien de tracking Nolio obligatoire dans la bio et la description.</span>
                    </div>
                  </div>
                )}

                {activeTab === 'profiles' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-[#F9F9FB] border border-[#EAEAEF]">
                      <span className="font-semibold text-[#111215]">Secteurs ciblés</span>
                      <span className="text-[#7257E8] font-medium">Tech, SaaS, Code, Web Design</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-[#F9F9FB] border border-[#EAEAEF]">
                      <span className="font-semibold text-[#111215]">Zones géographiques</span>
                      <span>RDC, Sénégal, Côte d&apos;Ivoire, France & Global</span>
                    </div>
                  </div>
                )}

                {activeTab === 'budget' && (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-xl bg-[#F9F9FB] border border-[#EAEAEF]">
                      <div className="text-[10px] text-[#71737D] uppercase font-bold">Sécurité du budget</div>
                      <div className="text-sm font-bold text-[#111215] mt-0.5">Séquestre Bloqué</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#F9F9FB] border border-[#EAEAEF]">
                      <div className="text-[10px] text-[#71737D] uppercase font-bold">Base de paiement</div>
                      <div className="text-sm font-bold text-[#7257E8] mt-0.5">18.00 $ / 1k vues</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Certified Tracking Bar */}
              <div className="mt-4 pt-3 border-t border-[#F0F0F4] flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 text-[#71737D]">
                  <Globe className="w-3.5 h-3.5 text-[#7257E8]" />
                  <span>Tracking Nolio :</span>
                  <span className="font-mono text-[#111215] font-semibold">nolio.app/t/acme_launch</span>
                </div>
                <span className="text-emerald-600 font-bold">Système Certifié</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: COMMENT CA MARCHE */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-[#F0F0F4]">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F1FE] text-[11px] font-bold text-[#7257E8] mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Processus Transparent</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#111215] tracking-tight mb-4">
            Comment fonctionne la marketplace Nolio ?
          </h2>
          <p className="text-sm text-[#52545D] leading-relaxed">
            Une mise en relation directe entre propriétaires de produits et créateurs de contenu, encadrée par des contrats automatisés et un système de paiement équitable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FAFAFC] border border-[#EAEAEF] space-y-4 relative group hover:border-[#7257E8]/40 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-[#7257E8] text-white flex items-center justify-center font-bold text-base shadow-md shadow-purple-500/20">
              1
            </div>
            <h3 className="text-lg font-bold text-[#111215]">1. Publication & Séquestre</h3>
            <p className="text-xs text-[#52545D] leading-relaxed">
              L&apos;annonceur crée sa campagne, définit son brief, ses règles et dépose son budget. Les fonds sont bloqués en toute sécurité dans le portefeuille séquestre Nolio.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FAFAFC] border border-[#EAEAEF] space-y-4 relative group hover:border-[#7257E8]/40 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-[#7257E8] text-white flex items-center justify-center font-bold text-base shadow-md shadow-purple-500/20">
              2
            </div>
            <h3 className="text-lg font-bold text-[#111215]">2. Sélection & Production</h3>
            <p className="text-xs text-[#52545D] leading-relaxed">
              Les créateurs postulent ou reçoivent une invitation directe. Une fois acceptés, ils produisent et publient la vidéo sur YouTube, TikTok ou Instagram avec leur lien de suivi.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FAFAFC] border border-[#EAEAEF] space-y-4 relative group hover:border-[#7257E8]/40 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-[#7257E8] text-white flex items-center justify-center font-bold text-base shadow-md shadow-purple-500/20">
              3
            </div>
            <h3 className="text-lg font-bold text-[#111215]">3. Audit & Libération</h3>
            <p className="text-xs text-[#52545D] leading-relaxed">
              Les vues et performances sont vérifiées et auditées. Les rémunérations sont calculées et immédiatement versées sur le solde du créateur.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION: PROBLEMES RESOLUS */}
      <section className="relative z-10 bg-[#FAFAFC] border-y border-[#F0F0F4] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-[11px] font-bold text-rose-700">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Les limites du marketing traditionnel</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#111215] leading-tight">
                Pourquoi le modèle des agences traditionnelles est dépassé ?
              </h2>
              <p className="text-xs sm:text-sm text-[#52545D] leading-relaxed">
                Frais d&apos;intermédiaires élevés, absence de garantie sur les vues réelles, retards de paiement de plusieurs mois pour les créateurs, et manque de transparence sur l&apos;attribution des clics.
              </p>
              <div className="pt-2">
                <Link
                  href="/inscription"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#1E2024] hover:bg-[#111215] text-white text-xs font-bold transition-all"
                >
                  <span>Rejoindre la nouvelle ère avec Nolio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-white border border-[#EAEAEF] shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold mb-3">
                  ✕
                </div>
                <h4 className="font-bold text-sm text-[#111215] mb-1">Ancien Modèle</h4>
                <p className="text-xs text-[#71737D] leading-relaxed">
                  Paiements forfaitaires risqués sans garantie de résultat ni audit des vues.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#F4F1FE] border border-[#E4DCFD] shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-[#7257E8] text-white flex items-center justify-center font-bold mb-3">
                  ✓
                </div>
                <h4 className="font-bold text-sm text-[#111215] mb-1">Solution Nolio</h4>
                <p className="text-xs text-[#52545D] leading-relaxed">
                  Paiement uniquement pour les vues certifiées et les clics qualifiés.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-[#EAEAEF] shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold mb-3">
                  ✕
                </div>
                <h4 className="font-bold text-sm text-[#111215] mb-1">Ancien Modèle</h4>
                <p className="text-xs text-[#71737D] leading-relaxed">
                  Négociations interminables et devis manuels pour chaque vidéo.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#F4F1FE] border border-[#E4DCFD] shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-[#7257E8] text-white flex items-center justify-center font-bold mb-3">
                  ✓
                </div>
                <h4 className="font-bold text-sm text-[#111215] mb-1">Solution Nolio</h4>
                <p className="text-xs text-[#52545D] leading-relaxed">
                  Contrats automatisés, règles claires et soumission en 1 clic.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-[#F0F0F4] bg-[#FAF9FC] pt-16 pb-12 text-xs text-[#71737D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand column */}
            <div className="space-y-4 md:col-span-1">
              <NolioLogo size="md" />
              <p className="text-xs text-[#71737D] leading-relaxed">
                Plateforme internationale de promotion par les créateurs de contenu. Conçue pour propulser les SaaS, applications et produits.
              </p>
              <div className="flex items-center gap-2 pt-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-semibold text-[#111215]">
                  Infrastructure Active
                </span>
              </div>
            </div>

            {/* Links column 1 */}
            <div>
              <h4 className="font-bold text-[#111215] mb-4 text-xs uppercase tracking-wider">
                Espaces
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <Link href="/annonceurs" className="hover:text-[#111215] transition-colors">
                    Annonceurs & SaaS
                  </Link>
                </li>
                <li>
                  <Link href="/createurs" className="hover:text-[#111215] transition-colors">
                    Créateurs de Contenu
                  </Link>
                </li>
                <li>
                  <Link href="/developpeurs" className="hover:text-[#111215] transition-colors">
                    Espace Développeurs
                  </Link>
                </li>
                <li>
                  <Link href="/campagnes" className="hover:text-[#111215] transition-colors">
                    Découvrir les campagnes
                  </Link>
                </li>
              </ul>
            </div>

            {/* Links column 2 */}
            <div>
              <h4 className="font-bold text-[#111215] mb-4 text-xs uppercase tracking-wider">
                Plateforme
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <Link href="/fonctionnement" className="hover:text-[#111215] transition-colors">
                    Comment ça marche
                  </Link>
                </li>
                <li>
                  <Link href="/tarifs" className="hover:text-[#111215] transition-colors">
                    Modèle de tarifs
                  </Link>
                </li>
                <li>
                  <Link href="/connexion" className="hover:text-[#111215] transition-colors">
                    Connexion
                  </Link>
                </li>
                <li>
                  <Link href="/inscription" className="hover:text-[#111215] transition-colors">
                    S&apos;enregistrer
                  </Link>
                </li>
              </ul>
            </div>

            {/* Links column 3 */}
            <div>
              <h4 className="font-bold text-[#111215] mb-4 text-xs uppercase tracking-wider">
                Support & Légal
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <Link href="/legal/a-propos" className="hover:text-[#111215] transition-colors">
                    À propos de Nolio
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#111215] transition-colors">
                    Contact & Assistance
                  </Link>
                </li>
                <li>
                  <Link href="/contact?subject=signalement" className="hover:text-[#111215] transition-colors">
                    Signaler un problème
                  </Link>
                </li>
                <li>
                  <Link href="/legal/conditions" className="hover:text-[#111215] transition-colors">
                    Conditions d&apos;utilisation
                  </Link>
                </li>
                <li>
                  <Link href="/legal/confidentialite" className="hover:text-[#111215] transition-colors">
                    Politique de confidentialité
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[#EAEAEF] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8E9099]">
            <p>© 2026 Nolio Inc. Tous droits réservés.</p>
            <p>Conçu avec soin pour la communauté internationale & africaine.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
