'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Video,
  BarChart3,
  Layers,
  ArrowRight,
  Sparkles,
  Link2,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export default function FonctionnementPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="text-xs font-semibold text-[#7257E8] tracking-wider uppercase mb-2">
          Transparence & Intégrité
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#222126] mb-4">
          Comment fonctionne la plateforme Nolio ?
        </h1>
        <p className="text-xs sm:text-sm text-[#6E6D7A] leading-relaxed">
          Nolio élimine l’opacité du marketing d’influence en liant directement la rémunération des
          créateurs aux résultats observés et certifiés.
        </p>
      </div>

      {/* Two Tracks: Annonceurs vs Créateurs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Track 1: Annonceurs */}
        <div className="bg-white rounded-3xl border border-[#E5E5EB] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#F1EEFD] text-[#7257E8] flex items-center justify-center font-bold text-sm mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-[#222126] mb-2">Pour les Annonceurs</h2>
            <p className="text-xs text-[#6E6D7A] leading-relaxed mb-6">
              Vous êtes fondateur d’un SaaS, développeur d’une application ou directeur marketing :
            </p>

            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="font-bold text-xs text-[#7257E8] shrink-0">1.</span>
                <div>
                  <div className="font-semibold text-xs text-[#222126]">
                    Déposez votre produit & campagne
                  </div>
                  <div className="text-[11px] text-[#6E6D7A]">
                    Définissez vos objectifs, vos consignes de création et fixez un plafond budgétaire
                    strict.
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="font-bold text-xs text-[#7257E8] shrink-0">2.</span>
                <div>
                  <div className="font-semibold text-xs text-[#222126]">
                    Validez les meilleurs créateurs
                  </div>
                  <div className="text-[11px] text-[#6E6D7A]">
                    Consultez les candidatures, les portfolios et engagez uniquement les profils en
                    affinité avec votre cible.
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="font-bold text-xs text-[#7257E8] shrink-0">3.</span>
                <div>
                  <div className="font-semibold text-xs text-[#222126]">
                    Contrôlez les livrables & les clics
                  </div>
                  <div className="text-[11px] text-[#6E6D7A]">
                    Chaque publication est soumise avec capture des analytiques et lien de tracking
                    dédupliqué côté serveur.
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="font-bold text-xs text-[#7257E8] shrink-0">4.</span>
                <div>
                  <div className="font-semibold text-xs text-[#222126]">
                    Débloquez la rémunération
                  </div>
                  <div className="text-[11px] text-[#6E6D7A]">
                    Le budget est prélevé uniquement selon les vues éligibles ou le forfait convenu.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#F6F6F8]">
            <Link
              href="/dashboard/annonceur"
              className="w-full py-2.5 px-4 rounded-xl bg-[#7257E8] hover:bg-[#5e42db] text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              Lancer ma première campagne
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Track 2: Créateurs */}
        <div className="bg-white rounded-3xl border border-[#E5E5EB] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#EAFBF3] text-emerald-700 flex items-center justify-center font-bold text-sm mb-4">
              <Video className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-[#222126] mb-2">Pour les Créateurs</h2>
            <p className="text-xs text-[#6E6D7A] leading-relaxed mb-6">
              Vous animez une chaîne YouTube, un compte TikTok, Instagram ou X :
            </p>

            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="font-bold text-xs text-emerald-600 shrink-0">1.</span>
                <div>
                  <div className="font-semibold text-xs text-[#222126]">
                    Créez votre profil & connectez vos réseaux
                  </div>
                  <div className="text-[11px] text-[#6E6D7A]">
                    Renseignez vos niches, vos statistiques d’audience et votre chaîne pour être
                    certifié.
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="font-bold text-xs text-emerald-600 shrink-0">2.</span>
                <div>
                  <div className="font-semibold text-xs text-[#222126]">
                    Postulez aux campagnes adaptées
                  </div>
                  <div className="text-[11px] text-[#6E6D7A]">
                    Envoyez votre pitch en 1 clic pour expliquer votre concept de vidéo ou
                    démonstration.
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="font-bold text-xs text-emerald-600 shrink-0">3.</span>
                <div>
                  <div className="font-semibold text-xs text-[#222126]">
                    Publiez avec votre lien de tracking
                  </div>
                  <div className="text-[11px] text-[#6E6D7A]">
                    Intégrez votre lien dédié dans votre description ou bio pour tracer vos clics
                    générés.
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="font-bold text-xs text-emerald-600 shrink-0">4.</span>
                <div>
                  <div className="font-semibold text-xs text-[#222126]">
                    Encaissez vos gains garantis
                  </div>
                  <div className="text-[11px] text-[#6E6D7A]">
                    Dès approbation du livrable, votre solde est immédiatement disponible et
                    retirable par virement.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#F6F6F8]">
            <Link
              href="/campagnes"
              className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#E5E5EB] hover:border-[#7257E8] text-[#222126] font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              Explorer les campagnes ouvertes
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Triple Pillar Security & Verification */}
      <div className="bg-[#1E1B2E] text-white rounded-3xl p-8 sm:p-10">
        <div className="max-w-2xl mb-8">
          <div className="text-xs font-semibold text-[#A99AEF] uppercase tracking-wider mb-2">
            Technologie & Mesure
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2">
            La triple garantie de performance Nolio
          </h2>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Pourquoi les marques et les créateurs font confiance au protocole Nolio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <BarChart3 className="w-5 h-5 text-[#A99AEF] mb-3" />
            <h3 className="font-bold text-sm text-white mb-1.5">Tracking Serveur Anti-Fraude</h3>
            <p className="text-neutral-300 leading-relaxed">
              Les clics sont validés côté serveur avec déduplication par empreinte IP/UA pour
              neutraliser le spam et les faux rebonds.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 mb-3" />
            <h3 className="font-bold text-sm text-white mb-1.5">Audit Manuel des Preuves</h3>
            <p className="text-neutral-300 leading-relaxed">
              Pour éviter les manipulations, les créateurs soumettent la capture vidéo de leurs
              métriques YouTube Studio / TikTok Analytics.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <Lock className="w-5 h-5 text-amber-400 mb-3" />
            <h3 className="font-bold text-sm text-white mb-1.5">Budgets Réservés</h3>
            <p className="text-neutral-300 leading-relaxed">
              Le montant de la campagne est provisionné au lancement. Le créateur est certain d’être
              payé dès que son travail est validé.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
