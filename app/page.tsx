'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/context/auth-context';
import { useMarketplace } from '@/lib/context/marketplace-context';
import { ClickUpHeroLanding } from '@/components/landing/clickup-hero-landing';
import { CreateModal } from '@/components/layout/create-modal';
import {
  Image as ImageIcon,
  ArrowRight,
  TrendingUp,
  ChevronDown,
  MoreHorizontal,
  Sparkles,
  Users,
  Building2,
  DollarSign,
  Globe,
  CheckCircle2,
  Bookmark,
  Share2,
  Briefcase,
  Layers,
  Award,
} from 'lucide-react';
import Image from 'next/image';

export default function NolioHomePage() {
  const { user, accountType, isLoading } = useAuth();
  const { campaigns, creators, companies, applyToCampaign } = useMarketplace();

  // Mode: 'feed' or 'landing'
  const [viewMode, setViewMode] = useState<'feed' | 'landing'>('feed');

  // Filter tabs: "Pour vous", "Annonceurs", "Créateurs", "Publications"
  const [activeTab, setActiveTab] = useState<'Pour vous' | 'Annonceurs' | 'Créateurs' | 'Publications'>('Pour vous');

  // Post composer state
  const [composerText, setComposerText] = useState('');
  const [composerRules, setComposerRules] = useState('');
  const [selectedPreviewImages, setSelectedPreviewImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80',
  ]);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Community feed posts (backed by real state)
  const [feedPosts, setFeedPosts] = useState([
    {
      id: 'post-1',
      author: 'Lucas Meyer (Fondateur SyntaxFlow)',
      date: 'Il y a 3h',
      role: 'Annonceur',
      avatarColor: 'bg-gradient-to-tr from-purple-500 to-indigo-600',
      text: 'Nouvelle campagne ouverte pour SyntaxFlow ! Nous recherchons 5 créateurs spécialisés Tech & Dev pour démontrer notre outil en vidéo verticale. Rémunération au CPM vérifié ($18.00 / 1k vues).',
      images: [
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
      ],
      isFollowing: true,
      rules: 'Format vertical 30-60s · Lien bio obligatoire · Accroche dans les 3s',
      replies: [
        {
          author: 'Alexandre Riva',
          date: 'Il y a 1h',
          avatarColor: 'bg-gradient-to-tr from-amber-400 to-rose-500',
          text: 'Super opportunité ! Je viens de postuler avec un angle axé sur le gain de productivité pour développeurs.',
        },
      ],
    },
    {
      id: 'post-2',
      author: 'Shaahid V.',
      date: 'Hier',
      role: 'Créateur',
      avatarColor: 'bg-gradient-to-tr from-emerald-400 to-cyan-500',
      text: 'Les campagnes au CPM sur Nolio apportent enfin une rémunération juste. Pas besoin de négocier des contrats complexes, tout est audité et le paiement tombe automatiquement dès validation des vues.',
      images: [],
      isFollowing: false,
      rules: '',
      replies: [],
    },
  ]);

  const displayName = user?.display_name || 'Manu Christian';
  const firstName = displayName.split(' ')[0] || 'Manu';

  // Toggle follow state on feed post
  const toggleFollow = (postId: string) => {
    setFeedPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, isFollowing: !p.isFollowing } : p))
    );
  };

  // Create post handler
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composerText.trim()) return;

    const newPost = {
      id: `post-${Date.now()}`,
      author: displayName,
      date: "À l'instant",
      role: accountType === 'advertiser' ? 'Annonceur' : 'Créateur',
      avatarColor: 'bg-[#1E2024]',
      text: composerText,
      images: selectedPreviewImages,
      rules: composerRules,
      isFollowing: false,
      replies: [],
    };

    setFeedPosts([newPost, ...feedPosts]);
    setComposerText('');
    setComposerRules('');
    setShowImagePicker(false);
  };

  const sampleAvailableImages = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&auto=format&fit=crop&q=80',
  ];

  const toggleImageSelection = (img: string) => {
    if (selectedPreviewImages.includes(img)) {
      if (selectedPreviewImages.length === 1) return;
      setSelectedPreviewImages(selectedPreviewImages.filter((i) => i !== img));
    } else {
      if (selectedPreviewImages.length >= 4) return;
      setSelectedPreviewImages([...selectedPreviewImages, img]);
    }
  };

  // If user is not logged in or explicitly toggled landing view, show Landing Page
  if ((!user && !isLoading) || viewMode === 'landing') {
    return <ClickUpHeroLanding onEnterFeed={() => setViewMode('feed')} />;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Category Filter Pills ("Pour vous", "Annonceurs", "Créateurs", "Publications") */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          {(['Pour vous', 'Annonceurs', 'Créateurs', 'Publications'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#1E2024] text-white shadow-xs'
                    : 'bg-[#F2F2F5] text-[#52545D] hover:bg-[#E8E8ED]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/profile"
            className="px-4 py-2 rounded-full border border-[#EAEAEF] text-xs font-bold text-[#111215] hover:bg-[#F5F5F7] transition-colors"
          >
            Vos publications
          </Link>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 rounded-full bg-[#7257E8] hover:bg-[#5E42DB] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
          >
            <span>+ Lancer</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Feed (65-70%) + Right Fixed/Sticky Rail (30-35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Post Composer + Horizontal Recommended Cards + Feed */}
        <div className="lg:col-span-8 space-y-6">
          {/* POST COMPOSER CARD (Advertiser campaign post or Creator showcase post) */}
          <div className="bg-white rounded-2xl border border-[#EAEAEF] p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#1E2024] text-white flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                {firstName.charAt(0)}
              </div>
              <input
                type="text"
                placeholder={
                  accountType === 'advertiser'
                    ? `Quelle campagne souhaitez-vous lancer, ${firstName} ?`
                    : `Quelle création ou vidéo souhaitez-vous partager, ${firstName} ?`
                }
                value={composerText}
                onChange={(e) => setComposerText(e.target.value)}
                className="w-full text-xs sm:text-sm text-[#111215] placeholder:text-[#8E9099] focus:outline-none bg-transparent font-medium"
              />
            </div>

            {/* Optional rules input for campaigns */}
            {accountType === 'advertiser' && (
              <input
                type="text"
                placeholder="Règles obligatoires (ex. Format vertical 30s, lien en bio, montrer l'onboarding)..."
                value={composerRules}
                onChange={(e) => setComposerRules(e.target.value)}
                className="w-full text-xs p-2 rounded-xl bg-[#F9F9FB] border border-[#EAEAEF] text-[#111215] placeholder:text-[#8E9099] focus:outline-none focus:border-[#7257E8]"
              />
            )}

            {/* Up to 4 Images Preview Selector */}
            {showImagePicker && (
              <div className="p-3 rounded-xl bg-[#F9F9FB] border border-[#EAEAEF] space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-[#111215]">
                  <span>Sélectionnez jusqu&apos;à 4 visuels ({selectedPreviewImages.length}/4) :</span>
                  <span className="text-[#8E9099]">Cliquez pour ajouter/retirer</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {sampleAvailableImages.map((img, i) => {
                    const isSelected = selectedPreviewImages.includes(img);
                    return (
                      <div
                        key={i}
                        onClick={() => toggleImageSelection(img)}
                        className={`relative h-16 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                          isSelected ? 'border-[#7257E8] ring-1 ring-purple-200' : 'border-transparent opacity-60'
                        }`}
                      >
                        <Image
                          src={img}
                          alt="Thumbnail"
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-[#F5F5F7]">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setShowImagePicker(!showImagePicker)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    showImagePicker
                      ? 'bg-[#F4F1FE] text-[#7257E8]'
                      : 'text-[#65676E] hover:bg-[#F5F5F7] hover:text-[#111215]'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Images ({selectedPreviewImages.length}/4)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#7257E8] hover:bg-[#F4F1FE] transition-colors flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Assistant complet</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleCreatePost}
                disabled={!composerText.trim()}
                className="px-5 py-2 rounded-full bg-[#1E2024] hover:bg-[#111215] disabled:opacity-40 text-white font-bold text-xs transition-colors shadow-xs"
              >
                Publier
              </button>
            </div>
          </div>

          {/* SUGGESTED CAMPAIGNS CAROUSEL (Horizontal recommended cards from real campaigns) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E9099]">
                {accountType === 'creator'
                  ? 'Campagnes recommandées pour vous'
                  : 'Opportunités en vedette sur Nolio'}
              </span>
              <Link href="/campagnes" className="text-xs font-semibold text-[#7257E8] hover:underline">
                Tout explorer
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {campaigns.slice(0, 2).map((camp, idx) => (
                <div
                  key={camp.id}
                  className="relative h-48 rounded-2xl overflow-hidden p-4 flex flex-col justify-between text-white bg-gradient-to-tr from-[#111215] via-[#1E2024] to-[#2D3039] shadow-xs group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-black/35 z-0" />
                  <div className="relative z-10 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-xs text-white">
                        <span>#</span>
                        <span className="truncate max-w-[180px]">{camp.title}</span>
                      </div>
                      <div className="text-[11px] text-neutral-300 mt-1 line-clamp-1">
                        {camp.deliverable_format}
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="relative z-10 flex items-end justify-between">
                    <div>
                      <div className="text-sm font-black font-mono">
                        ${camp.budget_remaining.toLocaleString()} restants
                      </div>
                      <div className="text-[10px] text-emerald-400 font-bold">
                        CPM ${camp.cpm_rate.toFixed(2)} / 1k vues
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        applyToCampaign(camp.id, 'Candidature rapide via recommandations feed');
                      }}
                      className="px-3 py-1 rounded-full bg-white text-[#111215] font-bold text-xs hover:bg-neutral-100 transition-colors shadow-xs"
                    >
                      Postuler
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COMMUNITY FEED POSTS (Every announcement & post displayed as rich feed posts) */}
          <div className="space-y-4">
            {feedPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl border border-[#EAEAEF] p-5 shadow-xs space-y-3"
              >
                {/* Author row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full ${post.avatarColor} flex items-center justify-center font-bold text-white text-xs shrink-0`}
                    >
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#111215] flex items-center gap-1.5">
                        <span>{post.author}</span>
                        <span className="text-[#8E9099] font-normal">· {post.date}</span>
                      </div>
                      <span className="text-[10px] text-[#7257E8] font-semibold">{post.role}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleFollow(post.id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                        post.isFollowing
                          ? 'bg-[#F2F2F5] text-[#111215]'
                          : 'text-[#111215] hover:bg-[#F5F5F7]'
                      }`}
                    >
                      {post.isFollowing ? 'Suivi' : 'Suivre'}
                    </button>
                    <button className="p-1 text-[#8E9099] hover:text-[#111215]">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <p className="text-xs sm:text-sm text-[#111215] leading-relaxed">
                  {post.text}
                </p>

                {/* Campaign Rules Badge if present */}
                {post.rules && (
                  <div className="p-2.5 rounded-xl bg-[#F8F7FF] border border-[#E9E4FC] text-xs text-[#52545D]">
                    <span className="font-bold text-[#7257E8] block mb-0.5">Consignes annonceur :</span>
                    <span>{post.rules}</span>
                  </div>
                )}

                {/* Attached Images (Up to 4) */}
                {post.images && post.images.length > 0 && (
                  <div
                    className={`grid gap-2 rounded-xl overflow-hidden ${
                      post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
                    }`}
                  >
                    {post.images.map((img, iIdx) => (
                      <div key={iIdx} className="relative h-44 rounded-xl overflow-hidden border border-[#EAEAEF]">
                        <Image
                          src={img}
                          alt="Post asset"
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Replies */}
                {post.replies.length > 0 && (
                  <div className="pt-3 border-t border-[#F5F5F7] space-y-2 pl-3">
                    {post.replies.map((reply, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-2.5 text-xs">
                        <div
                          className={`w-6 h-6 rounded-full ${reply.avatarColor} flex items-center justify-center font-bold text-white text-[10px] shrink-0`}
                        >
                          {reply.author.charAt(0)}
                        </div>
                        <div className="flex-1 bg-[#F9F9FB] p-2.5 rounded-xl">
                          <div className="font-semibold text-[#111215] mb-0.5">
                            {reply.author}{' '}
                            <span className="text-[10px] text-[#8E9099] font-normal">
                              · {reply.date}
                            </span>
                          </div>
                          <p className="text-xs text-[#65676E]">{reply.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right 4 Columns: Fixed/Sticky Non-Scrolling Rail (Matches User Requirement) */}
        <div className="lg:col-span-4 space-y-5 sticky top-6 self-start">
          {/* Card 1: Dynamic based on Account Type */}
          {accountType === 'advertiser' ? (
            /* For Advertiser: Display Top Créateurs Recommandés */
            <div className="bg-white rounded-2xl border border-[#EAEAEF] p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#F5F5F7]">
                <div className="flex items-center gap-1.5 font-bold text-xs text-[#111215]">
                  <Users className="w-3.5 h-3.5 text-[#7257E8]" />
                  <span>Top Créateurs Recommandés</span>
                </div>
                <Link
                  href="/createurs"
                  className="text-xs font-semibold text-[#7257E8] hover:underline"
                >
                  Voir plus
                </Link>
              </div>

              <div className="space-y-3 text-xs">
                {creators.slice(0, 3).map((cr) => (
                  <div key={cr.id} className="flex items-center justify-between gap-2 p-2 rounded-xl hover:bg-[#F9F9FB] transition-colors">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-neutral-200 overflow-hidden relative shrink-0">
                        {cr.avatar_path && (
                          <Image
                            src={cr.avatar_path}
                            alt={cr.display_name}
                            fill
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-[#111215] truncate">
                          {cr.display_name}
                        </div>
                        <div className="text-[10px] text-[#8E9099] truncate">
                          {cr.details?.total_followers?.toLocaleString()} abonnés · {cr.details?.niches[0] || 'Tech'}
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/createurs/${cr.id}`}
                      className="px-2.5 py-1 rounded-full bg-[#1E2024] hover:bg-[#111215] text-white text-[11px] font-bold shrink-0 transition-colors"
                    >
                      Inviter
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* For Creator: Display Top Annonceurs seeking multiple profiles */
            <div className="bg-white rounded-2xl border border-[#EAEAEF] p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#F5F5F7]">
                <div className="flex items-center gap-1.5 font-bold text-xs text-[#111215]">
                  <Building2 className="w-3.5 h-3.5 text-[#7257E8]" />
                  <span>Annonceurs qui recrutent</span>
                </div>
                <Link
                  href="/annonceurs"
                  className="text-xs font-semibold text-[#7257E8] hover:underline"
                >
                  Voir plus
                </Link>
              </div>

              <div className="space-y-3 text-xs">
                {companies.slice(0, 3).map((comp) => (
                  <div key={comp.id} className="p-2.5 rounded-xl bg-[#FAFAFC] border border-[#EAEAEF] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#111215]">{comp.name}</span>
                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                        Multi-profils
                      </span>
                    </div>
                    <p className="text-[11px] text-[#65676E] line-clamp-2">{comp.description}</p>
                    <div className="pt-1 flex items-center justify-between text-[10px]">
                      <span className="text-[#8E9099]">{comp.industry}</span>
                      <Link href="/campagnes" className="text-[#7257E8] font-bold hover:underline">
                        Consulter offres →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Card 2: Projets récents terminés avec succès */}
          <div className="bg-white rounded-2xl border border-[#EAEAEF] p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#F5F5F7]">
              <div className="flex items-center gap-1.5 font-bold text-xs text-[#111215]">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>Projets récemment clôturés</span>
              </div>
              <Link href="/campagnes" className="text-xs font-semibold text-[#7257E8] hover:underline">
                Voir tout
              </Link>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-2.5 rounded-xl bg-[#F9F9FB] border border-[#EAEAEF] space-y-1">
                <div className="font-bold text-[#111215]">SyntaxFlow · Campagne Beta Launch</div>
                <div className="text-[11px] text-[#65676E]">
                  128 500 vues vérifiées · $1,927.50 versés à 4 créateurs
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold">100% des fonds réglés</div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#F9F9FB] border border-[#EAEAEF] space-y-1">
                <div className="font-bold text-[#111215]">CloudMetrics SDK · Démo YouTube</div>
                <div className="text-[11px] text-[#65676E]">
                  42 000 vues vérifiées · $630.00 versés
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold">100% des fonds réglés</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Step Wizard Modal */}
      <CreateModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  );
}
