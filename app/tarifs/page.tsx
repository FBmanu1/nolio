'use client';

import React from 'react';
import Link from 'next/link';
import { Check, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

export default function TarifsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="text-xs font-semibold text-[#7257E8] tracking-wider uppercase mb-2">
          Modèle Économique Transparent
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#222126] mb-4">
          Tarifs clairs, sans abonnement caché
        </h1>
        <p className="text-xs sm:text-sm text-[#6E6D7A] leading-relaxed">
          Nolio ne facture aucun frais d’inscription ni abonnement mensuel obligatoire. Nous prenons
          une commission uniquement sur les livrables validés.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {/* Model 1: CPM */}
        <div className="bg-white rounded-3xl border border-[#E5E5EB] p-6 flex flex-col justify-between hover:border-[#7257E8]/40 transition-colors">
          <div>
            <div className="text-xs font-semibold text-[#7257E8] uppercase tracking-wider mb-2">
              Modèle à la Performance
            </div>
            <h3 className="text-lg font-bold text-[#222126] mb-1">Rémunération au CPM</h3>
            <div className="text-2xl font-bold text-[#222126] my-4 tabular-nums">
              10 € à 35 €
              <span className="text-xs font-normal text-[#6E6D7A] block">par 1 000 vues certifiées</span>
            </div>
            <p className="text-xs text-[#6E6D7A] leading-relaxed mb-6">
              Idéal pour les SaaS grand public et les applications mobiles cherchant un reach maximal
              avec un coût par vue maîtrisé.
            </p>

            <ul className="space-y-2.5 text-xs text-[#222126] mb-6">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                Plafond maximal de vues défini
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                Seules les vues éligibles sont payées
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                Tracking des clics inclus
              </li>
            </ul>
          </div>

          <Link
            href="/dashboard/annonceur"
            className="w-full py-2.5 px-4 rounded-xl bg-[#F6F6F8] hover:bg-[#7257E8] hover:text-white text-[#222126] font-medium text-xs text-center transition-colors"
          >
            Choisir ce modèle
          </Link>
        </div>

        {/* Model 2: Forfait Fixe */}
        <div className="bg-white rounded-3xl border-2 border-[#7257E8] p-6 flex flex-col justify-between relative shadow-sm">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#7257E8] text-white font-semibold text-[10px] uppercase tracking-wider">
            Recommandé B2B
          </div>
          <div>
            <div className="text-xs font-semibold text-[#7257E8] uppercase tracking-wider mb-2">
              Forfait Garanti
            </div>
            <h3 className="text-lg font-bold text-[#222126] mb-1">Forfait par Publication</h3>
            <div className="text-2xl font-bold text-[#222126] my-4 tabular-nums">
              150 € à 1 500 €
              <span className="text-xs font-normal text-[#6E6D7A] block">par vidéo livrée et validée</span>
            </div>
            <p className="text-xs text-[#6E6D7A] leading-relaxed mb-6">
              Idéal pour les logiciels spécialisés et les devtools complexes nécessitant un travail de
              démonstration approfondi.
            </p>

            <ul className="space-y-2.5 text-xs text-[#222126] mb-6">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                Brief complet sur-mesure
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                Revue du livrable avant mise en ligne
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                Garantie de maintien en ligne 6 mois
              </li>
            </ul>
          </div>

          <Link
            href="/dashboard/annonceur"
            className="w-full py-2.5 px-4 rounded-xl bg-[#7257E8] hover:bg-[#5e42db] text-white font-medium text-xs text-center transition-colors shadow-xs"
          >
            Créer une campagne fixe
          </Link>
        </div>

        {/* Model 3: Hybride */}
        <div className="bg-white rounded-3xl border border-[#E5E5EB] p-6 flex flex-col justify-between hover:border-[#7257E8]/40 transition-colors">
          <div>
            <div className="text-xs font-semibold text-[#7257E8] uppercase tracking-wider mb-2">
              Motivation Maximale
            </div>
            <h3 className="text-lg font-bold text-[#222126] mb-1">Modèle Hybride</h3>
            <div className="text-2xl font-bold text-[#222126] my-4 tabular-nums">
              Fixe + Bonus CPM
              <span className="text-xs font-normal text-[#6E6D7A] block">ex. 200 € + 15 € / 1 000 vues</span>
            </div>
            <p className="text-xs text-[#6E6D7A] leading-relaxed mb-6">
              Offre un socle minimum pour le travail de création tout en incitant le créateur à
              maximiser l’engagement.
            </p>

            <ul className="space-y-2.5 text-xs text-[#222126] mb-6">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                Double incitation au succès
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                Attire les créateurs haut de gamme
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                Budget global toujours plafonné
              </li>
            </ul>
          </div>

          <Link
            href="/dashboard/annonceur"
            className="w-full py-2.5 px-4 rounded-xl bg-[#F6F6F8] hover:bg-[#7257E8] hover:text-white text-[#222126] font-medium text-xs text-center transition-colors"
          >
            Configurer une offre hybride
          </Link>
        </div>
      </div>

      {/* Platform Commission explanation */}
      <div className="bg-[#F6F6F8] rounded-3xl border border-[#E5E5EB] p-8 mb-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-lg font-bold text-[#222126]">
              Commission de la plateforme Nolio : 15%
            </h3>
            <p className="text-xs text-[#6E6D7A] leading-relaxed">
              La commission Nolio couvre l’infrastructure de tracking, la vérification des métriques,
              la protection contre la fraude et le support en cas de litige. Aucun abonnement
              mensuel, aucune commission sur les campagnes non livrées.
            </p>
          </div>
          <div className="text-center p-4 rounded-2xl bg-white border border-[#E5E5EB] shrink-0">
            <div className="text-3xl font-bold text-[#7257E8] tabular-nums">15%</div>
            <div className="text-[11px] text-[#6E6D7A]">Au succès uniquement</div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-[#222126] mb-6 text-center">Questions fréquentes</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#E5E5EB]">
            <h4 className="font-semibold text-xs text-[#222126] mb-1.5 flex items-center gap-2">
              <HelpCircle className="w-3.5 h-3.5 text-[#7257E8]" />
              Comment le budget est-il sécurisé ?
            </h4>
            <p className="text-xs text-[#6E6D7A] leading-relaxed">
              Le budget alloué à une campagne est réservé sur votre compte lors du lancement. Les
              fonds ne sont transférés au créateur qu’après validation du livrable par l’annonceur ou
              arbitrage Nolio.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E5E5EB]">
            <h4 className="font-semibold text-xs text-[#222126] mb-1.5 flex items-center gap-2">
              <HelpCircle className="w-3.5 h-3.5 text-[#7257E8]" />
              Quand un créateur peut-il retirer ses gains ?
            </h4>
            <p className="text-xs text-[#6E6D7A] leading-relaxed">
              Dès que la vidéo et les captures analytiques sont approuvées, le solde disponible peut
              faire l’objet d’une demande de virement (seuil minimum : 50 €).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E5E5EB]">
            <h4 className="font-semibold text-xs text-[#222126] mb-1.5 flex items-center gap-2">
              <HelpCircle className="w-3.5 h-3.5 text-[#7257E8]" />
              Que se passe-t-il si une vidéo ne respecte pas le brief ?
            </h4>
            <p className="text-xs text-[#6E6D7A] leading-relaxed">
              L’annonceur peut demander une correction motivée ou refuser le livrable. En cas de
              désaccord persistant, l’équipe de modération intervient pour arbitrer.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E5E5EB]">
            <h4 className="font-semibold text-xs text-[#222126] mb-1.5 flex items-center gap-2">
              <HelpCircle className="w-3.5 h-3.5 text-[#7257E8]" />
              Les passerelles de paiement (ex. Saspay.me) sont-elles intégrées ?
            </h4>
            <p className="text-xs text-[#6E6D7A] leading-relaxed">
              Notre architecture de portefeuilles internes et transactions est prête. Les
              connecteurs bancaires directs seront activés dès validation finale des certifications de
              paiement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
