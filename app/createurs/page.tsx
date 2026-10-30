'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useMarketplace } from '@/lib/context/marketplace-context';
import { Search, CheckCircle2, Video, ArrowRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';

export default function CreateursPage() {
  const { creators } = useMarketplace();
  const [searchTerm, setSearchTerm] = useState('');
  const [nicheFilter, setNicheFilter] = useState('all');

  const allNiches = Array.from(
    new Set(creators.flatMap((c) => c.details?.niches || []))
  );

  const filteredCreators = creators.filter((creator) => {
    const matchesSearch =
      creator.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creator.details?.bio.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesNiche =
      nicheFilter === 'all' || (creator.details?.niches || []).includes(nicheFilter);

    return matchesSearch && matchesNiche;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#222126] mb-2">
          Annuaire des Créateurs Partenaires
        </h1>
        <p className="text-xs sm:text-sm text-[#6E6D7A]">
          Explorez des vidéastes, podcasteurs et experts tech qualifiés avec des audiences vérifiées
          sur YouTube, TikTok, Instagram et X.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E5E5EB] mb-8 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-4 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher un créateur par nom ou spécialité..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7257E8] bg-[#F6F6F8]/50 text-neutral-800"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#6E6D7A] whitespace-nowrap">Niche :</span>
          <select
            value={nicheFilter}
            onChange={(e) => setNicheFilter(e.target.value)}
            className="text-xs py-2 px-3 rounded-xl border border-neutral-200 bg-white text-neutral-800 focus:outline-none focus:border-[#7257E8]"
          >
            <option value="all">Toutes les niches</option>
            {allNiches.map((niche) => (
              <option key={niche} value={niche}>
                {niche}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid: 4 cards per row on large screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredCreators.map((creator) => (
          <div
            key={creator.id}
            className="bg-white rounded-2xl border border-[#E5E5EB] p-5 flex flex-col justify-between hover:border-[#7257E8]/40 hover:shadow-md transition-all group"
          >
            <div>
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-neutral-100 relative border border-neutral-200 shrink-0">
                  {creator.avatar_path && (
                    <Image
                      src={creator.avatar_path}
                      alt={creator.display_name}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-[#222126] group-hover:text-[#7257E8] transition-colors">
                      {creator.display_name}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7257E8]" />
                  </div>
                  <div className="text-xs text-[#6E6D7A]">{creator.details?.country}</div>
                </div>
              </div>

              <p className="text-xs text-[#6E6D7A] leading-relaxed mb-4 line-clamp-3">
                {creator.details?.bio}
              </p>

              {/* Social Accounts preview */}
              <div className="space-y-1.5 mb-4">
                {creator.socials?.map((soc) => (
                  <div
                    key={soc.id}
                    className="flex items-center justify-between text-xs py-1 px-2.5 rounded-lg bg-[#F6F6F8]"
                  >
                    <span className="capitalize font-medium text-neutral-700">{soc.platform}</span>
                    <span className="tabular-nums font-semibold text-[#222126]">
                      {soc.followers_count.toLocaleString()} abonnés
                    </span>
                  </div>
                ))}
              </div>

              {/* Niches */}
              <div className="flex flex-wrap gap-1 mb-4">
                {creator.details?.niches.map((niche) => (
                  <span
                    key={niche}
                    className="px-2 py-0.5 rounded-md bg-[#F1EEFD] text-[10px] text-[#7257E8] font-medium"
                  >
                    {niche}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#F6F6F8] flex items-center justify-between">
              <div>
                <div className="text-[10px] text-[#8E8D9A] uppercase tracking-wider font-medium">
                  Audience globale
                </div>
                <div className="text-sm font-bold text-[#222126] tabular-nums">
                  {creator.details?.total_followers?.toLocaleString()} abonnés
                </div>
              </div>

              <Link
                href={`/createurs/${creator.id}`}
                className="px-3.5 py-1.5 rounded-lg bg-[#7257E8] hover:bg-[#5e42db] text-white font-medium text-xs transition-colors flex items-center gap-1 shadow-xs"
              >
                Voir profil
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
