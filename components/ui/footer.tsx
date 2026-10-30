'use client';

import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-[#E5E5EB] bg-white text-xs text-[#6E6D7A] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-1.5 mb-3 group">
              <span className="w-5 h-5 rounded-md bg-[#7257E8] text-white flex items-center justify-center font-bold text-[10px]">
                N
              </span>
              <span className="text-base font-bold tracking-tight text-[#222126]">
                nolio<span className="text-[#7257E8]">.</span>
              </span>
            </Link>
            <p className="text-xs text-[#6E6D7A] max-w-sm leading-relaxed mb-4">
              La plateforme internationale qui connecte les fondateurs de logiciels, startups et entreprises avec des créateurs de contenu vérifiés pour propulser leur croissance.
            </p>
            <div className="flex items-center gap-3 text-neutral-400">
              <span className="text-[11px]">Devise : EUR (€)</span>
              <span>·</span>
              <span className="text-[11px]">Langue : Français</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[#222126] mb-3">Marketplace</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/campagnes" className="hover:text-[#222126] transition-colors">
                  Explorer les campagnes
                </Link>
              </li>
              <li>
                <Link href="/createurs" className="hover:text-[#222126] transition-colors">
                  Annuaire des créateurs
                </Link>
              </li>
              <li>
                <Link href="/fonctionnement" className="hover:text-[#222126] transition-colors">
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link href="/tarifs" className="hover:text-[#222126] transition-colors">
                  Modèles & Tarifs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#222126] mb-3">Espaces</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard/annonceur" className="hover:text-[#222126] transition-colors">
                  Espace Annonceur
                </Link>
              </li>
              <li>
                <Link href="/dashboard/createur" className="hover:text-[#222126] transition-colors">
                  Espace Créateur
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#222126] transition-colors">
                  Espace Modération & Admin
                </Link>
              </li>
              <li>
                <Link href="/inscription" className="hover:text-[#222126] transition-colors">
                  Devenir partenaire
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#222126] mb-3">Légal & Sécurité</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/legal/conditions" className="hover:text-[#222126] transition-colors">
                  Conditions Générales
                </Link>
              </li>
              <li>
                <Link href="/legal/confidentialite" className="hover:text-[#222126] transition-colors">
                  Confidentialité & RGPD
                </Link>
              </li>
              <li>
                <span className="text-neutral-400">Paiements : Saspay.me (prévu)</span>
              </li>
              <li>
                <span className="text-neutral-400">Contrôle anti-fraude</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[#E5E5EB] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#8E8D9A]">
          <div>© {new Date().getFullYear()} Nolio Inc. Tous droits réservés.</div>
          <div className="flex items-center gap-4">
            <span>Vues certifiées & tracking serveur</span>
            <span>·</span>
            <span>RLS PostgreSQL activé</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
