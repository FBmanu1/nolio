'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ConfidentialitePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 w-full text-xs text-[#222126] space-y-6">
      <Link href="/" className="inline-flex items-center gap-1.5 text-[#6E6D7A] hover:text-[#222126]">
        <ArrowLeft className="w-3.5 h-3.5" />
        Retour à l’accueil
      </Link>

      <h1 className="text-2xl font-bold">Politique de Confidentialité & RGPD</h1>
      <p className="text-[#6E6D7A]">Dernière mise à jour : 30 octobre 2026</p>

      <section className="space-y-2">
        <h2 className="text-sm font-bold">1. Données collectées</h2>
        <p className="leading-relaxed text-[#6E6D7A]">
          Nous traitons les données d’identification fournies lors de l’inscription (nom, adresse e-mail, type de profil) ainsi que les adresses IP pseudonymisées utilisées exclusivement pour la déduplication et le calcul statistique des clics uniques dans le respect du RGPD.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-bold">2. Sécurité des Données & RLS</h2>
        <p className="leading-relaxed text-[#6E6D7A]">
          Toutes les tables PostgreSQL sont protégées par le mécanisme de sécurité Row Level Security (RLS). Aucune clé secrète n’est exposée dans le navigateur client.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-bold">3. Vos Droits</h2>
        <p className="leading-relaxed text-[#6E6D7A]">
          Conformément à la réglementation européenne, vous disposez d’un droit d’accès, de rectification et d’effacement de vos données personnelles via votre tableau de bord ou par demande auprès du support.
        </p>
      </section>
    </div>
  );
}
