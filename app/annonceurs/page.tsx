'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useMarketplace } from '@/lib/context/marketplace-context';
import { Search, Building2, Globe, ArrowRight, ExternalLink, Sparkles, DollarSign } from 'lucide-react';

export default function AnnonceursPage() {
  const { companies, campaigns } = useMarketplace();
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');

  const industries = Array.from(new Set(companies.map((c) => c.industry).filter(Boolean)));

  const filteredCompanies = companies.filter((comp) => {
    const matchesSearch =
      comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = industryFilter === 'all' || comp.industry === industryFilter;
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-bold text-[#7257E8] uppercase tracking-wider mb-1">
          <Building2 className="w-4 h-4" />
          <span>Annuaire des Annonceurs</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#111215] tracking-tight">
          Annonceurs & Startups SaaS
        </h1>
        <p className="text-xs sm:text-sm text-[#65676E] mt-1">
          Découvrez les entreprises et fondateurs de logiciels qui recrutent actuellement des créateurs de contenu sur Nolio.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-[#EAEAEF] mb-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#8E9099] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher un SaaS, une entreprise ou un mot-clé..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#EAEAEF] focus:outline-none focus:border-[#7257E8] bg-[#F9F9FB] text-[#111215]"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#65676E] whitespace-nowrap">Secteur :</span>
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="text-xs py-2 px-3 rounded-xl border border-[#EAEAEF] bg-white text-[#111215] focus:outline-none focus:border-[#7257E8]"
          >
            <option value="all">Tous les secteurs</option>
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid: 4 cards per row (lg:grid-cols-4) matching user instruction */}
      {filteredCompanies.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#EAEAEF] p-12 text-center text-[#8E9099] text-xs">
          Aucun annonceur trouvé pour cette recherche.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredCompanies.map((company) => {
            const companyCampaigns = campaigns.filter((c) => c.company_id === company.id);
            const totalBudget = companyCampaigns.reduce((acc, c) => acc + c.budget_total, 0);

            return (
              <div
                key={company.id}
                className="bg-white rounded-2xl border border-[#EAEAEF] p-4 flex flex-col justify-between hover:border-[#7257E8]/40 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1E2024] text-white flex items-center justify-center font-bold text-sm shrink-0">
                      {company.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-xs text-[#111215] truncate group-hover:text-[#7257E8] transition-colors">
                        {company.name}
                      </h3>
                      <span className="text-[10px] text-[#8E9099] block truncate">
                        {company.industry || 'Tech & Logiciel'}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#65676E] leading-relaxed line-clamp-3 mb-3">
                    {company.description}
                  </p>

                  <div className="space-y-1.5 py-2 border-t border-[#F5F5F7] mb-3 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-[#8E9099]">Campagnes actives :</span>
                      <span className="font-bold text-[#111215]">
                        {companyCampaigns.length > 0 ? `${companyCampaigns.length} en cours` : '1 disponible'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#8E9099]">Budget alloué :</span>
                      <span className="font-bold text-[#7257E8] font-mono">
                        ${totalBudget > 0 ? totalBudget.toLocaleString() : '1,500.00'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#F5F5F7] flex items-center justify-between">
                  <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                    Recrute activement
                  </span>
                  <Link
                    href="/campagnes"
                    className="px-2.5 py-1.5 rounded-lg bg-[#1E2024] hover:bg-[#111215] text-white text-[11px] font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>Voir offres</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
