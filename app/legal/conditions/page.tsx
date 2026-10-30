'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ConditionsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 w-full text-xs text-[#222126] space-y-6">
      <Link href="/" className="inline-flex items-center gap-1.5 text-[#6E6D7A] hover:text-[#222126]">
        <ArrowLeft className="w-3.5 h-3.5" />
        Retour à l’accueil
      </Link>

      <h1 className="text-2xl font-bold">Conditions Générales d’Utilisation de Nolio</h1>
      <p className="text-[#6E6D7A]">Dernière mise à jour : 30 octobre 2026</p>

      <section className="space-y-2">
        <h2 className="text-sm font-bold">1. Présentation de la Plateforme</h2>
        <p className="leading-relaxed text-[#6E6D7A]">
          Nolio est une plateforme SaaS technique mettant en relation des annonceurs (fondateurs de logiciels, entreprises, startups) avec des créateurs de contenu indépendants. Nolio fournit des outils de suivi technique (redirection serveur, audit de captures, modération des livrables) et ne constitue pas une agence de publicité ni un employeur.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-bold">2. Engagements des Annonceurs</h2>
        <p className="leading-relaxed text-[#6E6D7A]">
          L’annonceur garantit détenir tous les droits sur les produits et marques dont il confie la promotion. Il s’engage à provisionner le budget convenu et à examiner de bonne foi les livrables dans un délai maximal de 7 jours ouvrés.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-bold">3. Engagements des Créateurs</h2>
        <p className="leading-relaxed text-[#6E6D7A]">
          Le créateur s’engage à respecter scrupuleusement le brief, à insérer son lien de tracking officiel sans altération et à ne recourir à aucun procédé artificiel (bots, fermes de clics, vues achetées). Toute fraude constatée entraîne la clôture immédiate du compte et l’annulation des gains.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-bold">4. Commissions & Règlements</h2>
        <p className="leading-relaxed text-[#6E6D7A]">
          Nolio prélève une commission de 15% sur le montant des livrables validés. Les virements vers les créateurs sont exécutés après vérification comptable.
        </p>
      </section>
    </div>
  );
}
