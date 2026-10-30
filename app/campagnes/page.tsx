'use client';

import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  MoreHorizontal,
  Info,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  X,
} from 'lucide-react';
import { useMarketplace } from '@/lib/context/marketplace-context';
import { useAuth } from '@/lib/context/auth-context';

interface CampaignCardItem {
  id: string;
  companyName: string;
  logoBg: string;
  timeAgo: string;
  hasRedDot?: boolean;
  title: string;
  rate: string;
  tags: string[];
  description: string;
}

const DEFAULT_CARDS: CampaignCardItem[] = [
  {
    id: 'camp-1',
    companyName: 'Interruptive Studios',
    logoBg: 'bg-amber-600',
    timeAgo: '1d',
    hasRedDot: true,
    title: 'Branding Creative',
    rate: '$75 - $150/hr • 20 hrs/wk',
    tags: ['Visual System Designer', 'Brand Designer', 'Brand Strategist', 'Figma'],
    description: 'We are seeking an experienced brand creative to build visual design systems and campaign assets for emerging tech startups.',
  },
  {
    id: 'camp-2',
    companyName: 'SAWMILL',
    logoBg: 'bg-[#2E3C2B]',
    timeAgo: '2d',
    hasRedDot: true,
    title: 'Video Editor for Paid Social: Short-Form, Long-Form, Motion, Captions and AI',
    rate: '$750 - $1,500/mo • (GMT -6) CST',
    tags: ['Video Editor', 'Motion Designer', 'AI Video Producer', 'CapCut', '+4'],
    description: 'Looking for a dedicated video editor skilled in short-form virality, dynamic captioning, and AI workflows for high-growth TikTok and Reels channels.',
  },
  {
    id: 'camp-3',
    companyName: 'Price Right Producti...',
    logoBg: 'bg-neutral-800',
    timeAgo: '2d',
    hasRedDot: false,
    title: 'Video Editor — B2B & B2C Social Content + Motion Graphs',
    rate: '$35.00/hr • 5 hrs/wk • 1 month, 5 hrs/wk',
    tags: ['Video Editing', 'Short-form', 'CapCut', 'Motion Design'],
    description: 'Produce high-converting product showcase videos and motion clips for SaaS platform launches.',
  },
];

export default function CampagnesPage() {
  const { user } = useAuth();
  const { applications, applyToCampaign } = useMarketplace();

  const [activeTab, setActiveTab] = useState<'for_you' | 'all' | 'my_jobs'>('for_you');
  const [cards, setCards] = useState<CampaignCardItem[]>(DEFAULT_CARDS);
  const [selectedCardForApply, setSelectedCardForApply] = useState<CampaignCardItem | null>(null);
  const [pitch, setPitch] = useState('');
  const [applySuccess, setApplySuccess] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDismiss = (id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const handleApply = () => {
    if (!selectedCardForApply) return;
    const res = applyToCampaign(selectedCardForApply.id, pitch || 'Postulant qualifié via Nolio');
    if (res.success) {
      setApplySuccess(`Candidature envoyée avec succès pour "${selectedCardForApply.title}".`);
      setSelectedCardForApply(null);
      setPitch('');
      setTimeout(() => setApplySuccess(null), 4000);
    }
  };

  const filteredCards = cards.filter((c) => {
    if (!searchTerm) return true;
    return (
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6">
        {/* Top Tab Bar matching Screenshot 7 */}
        <div className="flex items-center justify-between border-b border-[#EAEAEF] pb-3 mb-6 text-xs">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('for_you')}
              className={`font-semibold transition-colors relative pb-1 flex items-center gap-1.5 ${
                activeTab === 'for_you'
                  ? 'text-[#111215] after:absolute after:left-0 after:right-0 after:-bottom-[13px] after:h-[2px] after:bg-[#111215]'
                  : 'text-[#8E9099] hover:text-[#111215]'
              }`}
            >
              <span>For you</span>
              <span className="text-[#8E9099] tabular-nums font-normal">{filteredCards.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('all')}
              className={`font-semibold transition-colors relative pb-1 flex items-center gap-1.5 ${
                activeTab === 'all'
                  ? 'text-[#111215] after:absolute after:left-0 after:right-0 after:-bottom-[13px] after:h-[2px] after:bg-[#111215]'
                  : 'text-[#8E9099] hover:text-[#111215]'
              }`}
            >
              <span>All</span>
              <span className="text-[#8E9099] tabular-nums font-normal">129</span>
            </button>

            <button
              onClick={() => setActiveTab('my_jobs')}
              className={`font-semibold transition-colors relative pb-1 flex items-center gap-1.5 ${
                activeTab === 'my_jobs'
                  ? 'text-[#111215] after:absolute after:left-0 after:right-0 after:-bottom-[13px] after:h-[2px] after:bg-[#111215]'
                  : 'text-[#8E9099] hover:text-[#111215]'
              }`}
            >
              <span>My jobs</span>
              <span className="text-[#8E9099] tabular-nums font-normal">{applications.length}</span>
            </button>

            <button
              title="More"
              className="text-[#8E9099] hover:text-[#111215] transition-colors"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Right controls: Search, Filter, Sort dropdown */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              title="Search jobs"
              className="w-8 h-8 rounded-full border border-[#EAEAEF] flex items-center justify-center text-[#65676E] hover:text-[#111215] hover:bg-[#F5F5F7] transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            <button
              title="Filter"
              className="w-8 h-8 rounded-full border border-[#EAEAEF] flex items-center justify-center text-[#65676E] hover:text-[#111215] hover:bg-[#F5F5F7] transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>

            <button className="px-3 py-1.5 rounded-full border border-[#EAEAEF] text-xs text-[#65676E] hover:text-[#111215] hover:bg-[#F5F5F7] flex items-center gap-1.5 transition-colors">
              <span>Sort by newest</span>
              <ChevronDown className="w-3 h-3 text-[#8E9099]" />
            </button>
          </div>
        </div>

        {/* Collapsible search bar */}
        {searchOpen && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search opportunities by title, studio, or skill tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-[#EAEAEF] text-xs focus:outline-none focus:border-[#1E2024]"
            />
          </div>
        )}

        {/* Notification toast */}
        {applySuccess && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{applySuccess}</span>
          </div>
        )}

        {/* Priority Banner matching Screenshot 7 */}
        <div className="border border-[#EAEAEF] rounded-2xl p-3 sm:p-4 bg-[#FAFAFC] mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-2 py-0.5 rounded-md bg-[#E8E8ED] text-[#4B4E56] font-bold text-[10px] tracking-wider uppercase">
              || LIMITED
            </span>
            <span className="text-[#111215] font-medium">
              Get priority access to all jobs before everyone else.
            </span>
            <Info className="w-3.5 h-3.5 text-[#8E9099] cursor-pointer" />
          </div>

          <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111215] hover:text-[#7257E8] transition-colors">
            <span>Upgrade to Pro</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Opportunities List matching Screenshot 7 */}
        {activeTab === 'my_jobs' ? (
          <div className="space-y-4">
            {applications.length === 0 ? (
              <div className="py-20 text-center text-xs text-[#8E9099]">
                <p className="font-semibold text-[#111215]">No job applications yet</p>
                <p className="mt-1">When you apply to creator campaigns, they appear here.</p>
              </div>
            ) : (
              applications.map((app) => (
                <div key={app.id} className="border border-[#EAEAEF] rounded-2xl p-5 bg-white shadow-xs">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-[#111215]">Candidature #{app.id}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 uppercase">
                      {app.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#65676E] mb-2">{app.pitch}</p>
                  <span className="text-[10px] text-[#8E9099] tabular-nums">
                    Postulé le {new Date(app.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCards.length === 0 ? (
              <div className="py-20 text-center text-xs text-[#8E9099]">
                No jobs match your criteria.
              </div>
            ) : (
              filteredCards.map((card) => (
                <div
                  key={card.id}
                  className="border border-[#EAEAEF] rounded-2xl p-5 bg-white hover:border-[#D5D7DD] transition-all shadow-xs space-y-3"
                >
                  {/* Top Company & Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full ${card.logoBg} text-white flex items-center justify-center font-bold text-xs shrink-0 font-mono`}
                      >
                        {card.companyName.charAt(0)}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[#65676E]">
                        <span className="font-semibold text-[#111215]">{card.companyName}</span>
                        <span>•</span>
                        <span className="tabular-nums">{card.timeAgo}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {card.hasRedDot && (
                        <div className="w-2 h-2 rounded-full bg-[#EF4444]" />
                      )}
                      <Sparkles className="w-3.5 h-3.5 text-[#8E9099]" />
                      <button className="text-[#8E9099] hover:text-[#111215]">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Compensation */}
                  <div>
                    <h3 className="text-sm font-bold text-[#111215] mb-1 leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#111215] tabular-nums">
                      {card.rate}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#65676E] leading-relaxed">
                    {card.description}
                  </p>

                  {/* Tags */}
                  <div className="flex items-center gap-2 flex-wrap pt-1">
                    {card.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-[#F5F5F7] text-[#65676E] text-xs font-medium hover:text-[#111215] transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Actions matching Screenshot 7 */}
                  <div className="flex items-center justify-end gap-2.5 pt-2">
                    <button
                      onClick={() => handleDismiss(card.id)}
                      className="py-1.5 px-5 rounded-full border border-[#D5D7DD] hover:border-[#111215] text-[#111215] text-xs font-semibold transition-colors"
                    >
                      Dismiss
                    </button>
                    <button
                      onClick={() => setSelectedCardForApply(card)}
                      className="py-1.5 px-6 rounded-full bg-[#1E2024] hover:bg-[#111215] text-white text-xs font-bold transition-all shadow-xs hover:scale-[1.01]"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Apply Modal */}
      {selectedCardForApply && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#EAEAEF] shadow-xl text-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-[#8E9099] uppercase">
                  {selectedCardForApply.companyName}
                </span>
                <h3 className="text-sm font-bold text-[#111215]">
                  Postuler à &ldquo;{selectedCardForApply.title}&rdquo;
                </h3>
              </div>
              <button
                onClick={() => setSelectedCardForApply(null)}
                className="text-[#8E9099] hover:text-[#111215]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[#65676E] leading-relaxed">
              Expliquez pourquoi votre profil, votre audience ou vos compétences conviennent parfaitement à cette opportunité.
            </p>

            <div>
              <label className="block text-[11px] font-semibold text-[#65676E] mb-1">
                Votre proposition / Pitch
              </label>
              <textarea
                rows={4}
                value={pitch}
                onChange={(e) => setPitch(e.target.value)}
                placeholder="Ex : Je produis des vidéos de haute qualité sur TikTok et YouTube Shorts pour des outils de développement..."
                className="w-full p-3 rounded-xl border border-[#EAEAEF] text-xs focus:outline-none focus:border-[#1E2024]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedCardForApply(null)}
                className="px-4 py-2 rounded-full border border-[#EAEAEF] font-semibold text-[#65676E]"
              >
                Annuler
              </button>
              <button
                onClick={handleApply}
                className="px-5 py-2 rounded-full bg-[#1E2024] text-white font-bold"
              >
                Envoyer ma candidature
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
