'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  BarChart2,
  Share2,
  MapPin,
  ChevronRight,
  SlidersHorizontal,
  ArrowUpRight,
  Check,
  Star,
  ExternalLink,
  Plus,
} from 'lucide-react';
import { useAuth } from '@/lib/context/auth-context';
import { useMarketplace } from '@/lib/context/marketplace-context';

export default function ProfilePage() {
  const { user } = useAuth();
  const { campaigns } = useMarketplace();

  const [messageToggleActive, setMessageToggleActive] = useState(true);
  const [activeTab, setActiveTab] = useState<
    'work' | 'posts' | 'products' | 'jobs' | 'reviews' | 'services' | 'about'
  >('work');
  const [subFilter, setSubFilter] = useState<'created' | 'verified'>('created');

  const displayName = user?.display_name || 'Manu Christian';

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
        {/* Top Hero Section matching Screenshot 5 */}
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-between pb-8">
          {/* Left Column: Avatar & Details */}
          <div className="flex-1 max-w-xl">
            {/* Avatar & Status Row */}
            <div className="flex items-start gap-4 mb-4">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-[#111215] bg-white flex items-center justify-center font-bold text-2xl sm:text-3xl text-[#111215] font-mono shadow-xs">
                  {displayName.charAt(0)}
                </div>
                {/* Green availability indicator dot */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#10B981] border-2 border-white" />
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* PRO badge */}
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#F5F5F7] text-[11px] font-medium text-[#65676E] hover:text-[#111215] cursor-pointer">
                    <span className="font-bold text-[#7257E8]">PRO</span>
                    <span>Earn more with Pro</span>
                    <ChevronRight className="w-3 h-3 text-[#8E9099]" />
                  </div>

                  {/* Available badge */}
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] text-[11px] font-semibold">
                    <span>Available</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Name & Title matching Screenshot 5 */}
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111215] mb-2 font-display">
              {displayName}
            </h1>
            <p className="text-xs sm:text-sm text-[#65676E] leading-relaxed mb-5 font-normal">
              AI/Data Science researcher Developper web and mobile
            </p>

            {/* Action Buttons Row */}
            <div className="flex items-center gap-3 mb-6">
              {/* Message button with integrated toggle */}
              <button
                onClick={() => setMessageToggleActive(!messageToggleActive)}
                className="py-2 px-4 rounded-full bg-[#1E2024] hover:bg-[#111215] text-white text-xs font-semibold flex items-center gap-2.5 transition-colors shadow-xs"
              >
                <span>Message</span>
                <div
                  className={`w-7 h-4 rounded-full transition-colors relative flex items-center px-0.5 ${
                    messageToggleActive ? 'bg-[#10B981]' : 'bg-[#4B4E56]'
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full bg-white transition-transform ${
                      messageToggleActive ? 'translate-x-3' : 'translate-x-0'
                    }`}
                  />
                </div>
              </button>

              {/* Analytics button */}
              <button
                title="Profile Analytics"
                className="w-9 h-9 rounded-full border border-[#EAEAEF] flex items-center justify-center text-[#65676E] hover:text-[#111215] hover:bg-[#F5F5F7] transition-colors"
              >
                <BarChart2 className="w-4 h-4" />
              </button>

              {/* Share button */}
              <button
                title="Share Profile"
                className="w-9 h-9 rounded-full border border-[#EAEAEF] flex items-center justify-center text-[#65676E] hover:text-[#111215] hover:bg-[#F5F5F7] transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Stats Card Row matching Screenshot 5 */}
            <div className="bg-white border border-[#EAEAEF] rounded-2xl p-4 grid grid-cols-4 divide-x divide-[#F0F0F4] text-center shadow-xs mb-3">
              <div className="px-2">
                <div className="text-sm sm:text-base font-bold text-[#111215] tabular-nums">$0</div>
                <div className="text-[11px] text-[#8E9099] font-medium">Earned</div>
              </div>
              <div className="px-2">
                <div className="text-sm sm:text-base font-bold text-[#111215] tabular-nums">0x</div>
                <div className="text-[11px] text-[#8E9099] font-medium">Hired</div>
              </div>
              <div className="px-2">
                <div className="text-sm sm:text-base font-bold text-[#111215] flex items-center justify-center gap-0.5">
                  <Star className="w-3.5 h-3.5 fill-[#111215] text-[#111215]" />
                  <span>-</span>
                </div>
                <div className="text-[11px] text-[#8E9099] font-medium">Rating</div>
              </div>
              <div className="px-2">
                <div className="text-sm sm:text-base font-bold text-[#111215] tabular-nums">1</div>
                <div className="text-[11px] text-[#8E9099] font-medium">Followers</div>
              </div>
            </div>

            {/* Followed By Indicator */}
            <div className="flex items-center gap-2 text-xs text-[#65676E] px-1">
              <div className="w-5 h-5 rounded-full bg-[#7257E8] text-white flex items-center justify-center font-bold text-[10px]">
                G
              </div>
              <span>Followed by <strong className="text-[#111215] font-semibold">GALLERY L</strong></span>
            </div>
          </div>

          {/* Right Column: Sleek 3D/AI Artwork Showcase Banner */}
          <div className="w-full lg:w-[460px] h-64 sm:h-72 rounded-3xl overflow-hidden relative border border-[#EAEAEF] bg-radial from-[#1E2024] to-[#0D0E11] shadow-md flex items-center justify-center group">
            <Image
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80"
              alt="Neural AI Creative Showcase"
              fill
              className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
              <span className="font-semibold tracking-wide">Featured AI & Video Showcase</span>
              <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-[10px] font-mono">
                HD 4K
              </span>
            </div>
          </div>
        </div>

        {/* Location Indicator matching Screenshot 5 */}
        <div className="flex items-center justify-end text-xs text-[#65676E] gap-1.5 pb-4 border-b border-[#EAEAEF]">
          <MapPin className="w-3.5 h-3.5 text-[#8E9099]" />
          <span>Kinshasa, Republic of the Congo</span>
        </div>

        {/* Tab Navigation matching Screenshot 5 */}
        <div className="flex items-center justify-between border-b border-[#EAEAEF] pt-2 pb-0">
          <div className="flex items-center gap-6 overflow-x-auto text-xs font-medium">
            {(
              [
                { id: 'work', label: 'Work' },
                { id: 'posts', label: 'Posts' },
                { id: 'products', label: 'Products' },
                { id: 'jobs', label: 'Jobs' },
                { id: 'reviews', label: 'Reviews' },
                { id: 'services', label: 'Services' },
                { id: 'about', label: 'About' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 transition-colors relative whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-[#111215] font-bold after:absolute after:left-0 after:right-0 after:-bottom-[1px] after:h-[2px] after:bg-[#111215]'
                    : 'text-[#65676E] hover:text-[#111215]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 pb-2">
            <button
              title="Filter"
              className="p-1.5 rounded-full border border-[#EAEAEF] text-[#65676E] hover:text-[#111215] hover:bg-[#F5F5F7] transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>
            <button
              title="Open external portfolio"
              className="p-1.5 rounded-full border border-[#EAEAEF] text-[#65676E] hover:text-[#111215] hover:bg-[#F5F5F7] transition-colors"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Sub-filters row: Created / Verified */}
        <div className="flex items-center gap-2 pt-4 pb-6">
          <button
            onClick={() => setSubFilter('created')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              subFilter === 'created'
                ? 'bg-[#1E2024] text-white'
                : 'bg-[#F2F2F5] text-[#65676E] hover:text-[#111215]'
            }`}
          >
            Created
          </button>
          <button
            onClick={() => setSubFilter('verified')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-colors ${
              subFilter === 'verified'
                ? 'bg-[#1E2024] text-white'
                : 'bg-[#F2F2F5] text-[#65676E] hover:text-[#111215]'
            }`}
          >
            <span>Verified</span>
            <Check className="w-3 h-3 stroke-[3]" />
          </button>
        </div>

        {/* Body content based on active tab */}
        {activeTab === 'work' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-[#EAEAEF] rounded-2xl p-4 bg-white hover:border-[#1E2024] transition-colors group cursor-pointer shadow-xs">
              <div className="h-40 rounded-xl bg-[#F5F5F7] mb-3 relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=80"
                  alt="AI Cloud Performance Video"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-xs font-bold text-[#111215] mb-1">
                SyntaxFlow AI vs Classic Developer Workflow
              </h3>
              <p className="text-[11px] text-[#65676E] line-clamp-2">
                Démonstration concrète sur YouTube Shorts avec 22 800 vues et taux d&apos;engagement élevé.
              </p>
              <div className="mt-3 pt-3 border-t border-[#F0F0F4] flex items-center justify-between text-[11px] text-[#8E9099]">
                <span>Video TikTok / Shorts</span>
                <span className="font-semibold text-[#10B981]">Verified deliverable</span>
              </div>
            </div>

            <div className="border border-[#EAEAEF] rounded-2xl p-4 bg-white hover:border-[#1E2024] transition-colors group cursor-pointer shadow-xs">
              <div className="h-40 rounded-xl bg-[#F5F5F7] mb-3 relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=80"
                  alt="Mobile SaaS App Showcase"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-xs font-bold text-[#111215] mb-1">
                Full-Stack Mobile App Architecture Showcase
              </h3>
              <p className="text-[11px] text-[#65676E] line-clamp-2">
                Présentation technique et ergonomie utilisateur pour application SaaS B2B.
              </p>
              <div className="mt-3 pt-3 border-t border-[#F0F0F4] flex items-center justify-between text-[11px] text-[#8E9099]">
                <span>Case Study</span>
                <span className="font-semibold text-[#111215]">Featured</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'posts' && (
          <div className="max-w-xl mx-auto py-8 text-center text-xs text-[#8E9099]">
            <p className="font-medium text-[#111215]">No published posts yet</p>
            <p className="mt-1">Share project updates and thoughts directly to the community feed.</p>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {campaigns.slice(0, 2).map((camp) => (
              <div key={camp.id} className="p-4 rounded-2xl border border-[#EAEAEF] bg-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1E2024] text-white flex items-center justify-center font-bold font-mono shrink-0">
                  {camp.title.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-[#111215] truncate">{camp.title}</h4>
                  <p className="text-[11px] text-[#65676E] truncate">{camp.deliverable_format}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="max-w-xl mx-auto py-8 text-center text-xs text-[#8E9099]">
            <p className="font-medium text-[#111215]">All jobs caught up</p>
            <p className="mt-1">Active client opportunities and contracts will be listed here.</p>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="max-w-2xl bg-[#FAFAFC] border border-[#EAEAEF] rounded-2xl p-6 text-xs text-[#65676E] leading-relaxed space-y-3">
            <h3 className="text-sm font-bold text-[#111215]">About Manu Christian</h3>
            <p>
              Chercheur en intelligence artificielle et science des données, développeur web et mobile full-stack spécialisé dans la conception d&apos;applications performantes et la création de contenu technique pour promouvoir des technologies innovantes.
            </p>
            <div className="pt-2 grid grid-cols-2 gap-2 text-[11px]">
              <div><strong className="text-[#111215]">Location:</strong> Kinshasa, Republic of the Congo</div>
              <div><strong className="text-[#111215]">Specialties:</strong> AI, Web & Mobile, Tech Promotion</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
