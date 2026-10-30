'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/context/auth-context';
import { useMarketplace } from '@/lib/context/marketplace-context';
import { StatusBadge } from '@/components/ui/status-badge';
import {
  Layers,
  Plus,
  Video,
  CheckCircle2,
  Clock,
  Eye,
  MousePointerClick,
  Wallet,
  Building2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileCheck,
  Check,
  X,
  CreditCard,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';

export default function AdvertiserDashboardPage() {
  const { user } = useAuth();
  const {
    campaigns,
    products,
    companies,
    applications,
    deliverables,
    wallets,
    transactions,
    createProduct,
    createCampaign,
    updateCampaignStatus,
    updateApplicationStatus,
    reviewDeliverable,
    depositBudget,
  } = useMarketplace();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'campaigns' | 'products' | 'applications' | 'deliverables' | 'wallet'
  >('overview');

  // Modals state
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false);
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);

  // New product form
  const [newProdName, setNewProdName] = useState('');
  const [newProdTagline, setNewProdTagline] = useState('');
  const [newProdUrl, setNewProdUrl] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('Logiciel SaaS');
  const [newProdDesc, setNewProdDesc] = useState('');

  // New campaign form (multi-step simple wizard)
  const [newCampTitle, setNewCampTitle] = useState('');
  const [newCampProduct, setNewCampProduct] = useState(products[0]?.id || '');
  const [newCampBrief, setNewCampBrief] = useState('');
  const [newCampInstructions, setNewCampInstructions] = useState('');
  const [newCampFormat, setNewCampFormat] = useState('Vidéo courte TikTok / Shorts (30-60s)');
  const [newCampModel, setNewCampModel] = useState<'cpm' | 'fixed' | 'hybrid'>('cpm');
  const [newCampBudget, setNewCampBudget] = useState(1500);
  const [newCampCpm, setNewCampCpm] = useState(18);
  const [newCampFixed, setNewCampFixed] = useState(250);
  const [newCampPlatforms, setNewCampPlatforms] = useState<string[]>(['tiktok', 'youtube']);
  const [newCampMinFollowers, setNewCampMinFollowers] = useState(2000);

  // Deposit form
  const [depositAmount, setDepositAmount] = useState(1000);
  const [depositSuccessMsg, setDepositSuccessMsg] = useState('');

  // Deliverable review form
  const [reviewModalDeliverable, setReviewModalDeliverable] = useState<any>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [verifiedViewsInput, setVerifiedViewsInput] = useState<number>(0);

  // Calculations for KPI strip
  const userWallet = wallets[user?.id || '820cf538-f540-4251-88f1-77167fbd5d16'] || {
    balance_available: 4850,
    balance_pending: 1250,
  };

  const activeCampaigns = campaigns.filter((c) => c.status === 'active');
  const totalEngagedCreators = campaigns.reduce((acc, c) => acc + c.engaged_creators_count, 0);
  const totalVerifiedViews = deliverables
    .filter((d) => d.status === 'approved')
    .reduce((acc, d) => acc + d.verified_views, 0);
  const totalClicks = deliverables.reduce((acc, d) => acc + d.unique_clicks, 0);

  const handleCreateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdUrl) return;

    createProduct({
      company_id: companies[0]?.id || 'comp-1',
      name: newProdName,
      tagline: newProdTagline,
      description: newProdDesc,
      logo_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
      website_url: newProdUrl,
      category: newProdCategory,
    });

    setNewProdName('');
    setNewProdTagline('');
    setNewProdUrl('');
    setNewProdDesc('');
    setShowNewProductModal(false);
  };

  const handleCreateCampaignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampTitle || !newCampBrief) return;

    createCampaign({
      product_id: newCampProduct || products[0]?.id,
      company_id: companies[0]?.id || 'comp-1',
      title: newCampTitle,
      description: newCampBrief.slice(0, 150) + '...',
      brief: newCampBrief,
      instructions: newCampInstructions || 'Présentation claire, démonstration split screen, lien de tracking en bio.',
      deliverable_format: newCampFormat,
      platforms: newCampPlatforms as any,
      target_countries: ['France', 'Belgique', 'Suisse'],
      target_languages: ['Français'],
      target_niches: ['Tech & Dev', 'SaaS', 'Productivité'],
      min_followers: newCampMinFollowers,
      payout_model: newCampModel,
      budget_total: newCampBudget,
      max_paid_views: Math.round((newCampBudget / (newCampCpm || 20)) * 1000),
      cpm_rate: newCampCpm,
      fixed_amount: newCampFixed,
      status: 'active',
      desired_creators_count: 5,
      start_date: new Date().toISOString().split('T')[0],
      end_date: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
    });

    setNewCampTitle('');
    setNewCampBrief('');
    setShowNewCampaignModal(false);
    setActiveTab('campaigns');
  };

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = depositBudget(depositAmount);
    if (res.success) {
      setDepositSuccessMsg(res.message || 'Dépôt effectué !');
      setTimeout(() => {
        setDepositSuccessMsg('');
        setShowDepositModal(false);
      }, 1500);
    }
  };

  const executeReview = (status: 'approved' | 'revision_requested' | 'rejected') => {
    if (!reviewModalDeliverable) return;
    reviewDeliverable(
      reviewModalDeliverable.id,
      status,
      reviewNotes,
      verifiedViewsInput || reviewModalDeliverable.claimed_views
    );
    setReviewModalDeliverable(null);
    setReviewNotes('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold text-[#7257E8]">Espace Professionnel Annonceur</span>
          </div>
          <h1 className="text-2xl font-bold text-[#222126]">
            {user?.display_name || 'Acme SaaS Studio'}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNewProductModal(true)}
            className="px-3 py-2 rounded-xl border border-[#E5E5EB] hover:bg-white text-xs font-semibold text-[#222126] transition-colors"
          >
            + Nouveau produit
          </button>
          <button
            onClick={() => setShowNewCampaignModal(true)}
            className="px-3.5 py-2 rounded-xl bg-[#7257E8] hover:bg-[#5e42db] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            Nouvelle campagne
          </button>
        </div>
      </div>

      {/* KPI STRIP (High-density dashboard cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
        <div className="p-3.5 rounded-2xl bg-white border border-[#E5E5EB]">
          <div className="text-[10px] text-[#8E8D9A] uppercase tracking-wider font-semibold">
            Campagnes Actives
          </div>
          <div className="text-xl font-bold text-[#222126] mt-1 tabular-nums">
            {activeCampaigns.length}
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-[#E5E5EB]">
          <div className="text-[10px] text-[#8E8D9A] uppercase tracking-wider font-semibold">
            Créateurs Engagés
          </div>
          <div className="text-xl font-bold text-[#222126] mt-1 tabular-nums">
            {totalEngagedCreators}
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-[#E5E5EB]">
          <div className="text-[10px] text-[#8E8D9A] uppercase tracking-wider font-semibold">
            Vues Certifiées
          </div>
          <div className="text-xl font-bold text-[#222126] mt-1 tabular-nums">
            {totalVerifiedViews.toLocaleString()}
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-[#E5E5EB]">
          <div className="text-[10px] text-[#8E8D9A] uppercase tracking-wider font-semibold">
            Clics Uniques Trackés
          </div>
          <div className="text-xl font-bold text-[#222126] mt-1 tabular-nums">
            {totalClicks.toLocaleString()}
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-[#E5E5EB]">
          <div className="text-[10px] text-[#8E8D9A] uppercase tracking-wider font-semibold">
            Candidatures
          </div>
          <div className="text-xl font-bold text-[#7257E8] mt-1 tabular-nums">
            {applications.filter((a) => a.status === 'pending').length} en attente
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-[#E5E5EB]">
          <div className="text-[10px] text-[#8E8D9A] uppercase tracking-wider font-semibold">
            Budget Disponible
          </div>
          <div className="text-xl font-bold text-emerald-700 mt-1 tabular-nums">
            {userWallet.balance_available.toFixed(2)} €
          </div>
        </div>
      </div>

      {/* DASHBOARD NAVIGATION TABS */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-[#E5E5EB] mb-8 text-xs font-medium">
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-2 px-3.5 rounded-xl whitespace-nowrap transition-colors ${
            activeTab === 'overview'
              ? 'bg-[#7257E8] text-white font-semibold shadow-xs'
              : 'text-[#6E6D7A] hover:text-[#222126] hover:bg-white'
          }`}
        >
          Vue d’ensemble
        </button>

        <button
          onClick={() => setActiveTab('campaigns')}
          className={`py-2 px-3.5 rounded-xl whitespace-nowrap transition-colors ${
            activeTab === 'campaigns'
              ? 'bg-[#7257E8] text-white font-semibold shadow-xs'
              : 'text-[#6E6D7A] hover:text-[#222126] hover:bg-white'
          }`}
        >
          Campagnes ({campaigns.length})
        </button>

        <button
          onClick={() => setActiveTab('applications')}
          className={`py-2 px-3.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'applications'
              ? 'bg-[#7257E8] text-white font-semibold shadow-xs'
              : 'text-[#6E6D7A] hover:text-[#222126] hover:bg-white'
          }`}
        >
          Candidatures
          {applications.filter((a) => a.status === 'pending').length > 0 && (
            <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
              {applications.filter((a) => a.status === 'pending').length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('deliverables')}
          className={`py-2 px-3.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'deliverables'
              ? 'bg-[#7257E8] text-white font-semibold shadow-xs'
              : 'text-[#6E6D7A] hover:text-[#222126] hover:bg-white'
          }`}
        >
          Livrables & Vues ({deliverables.length})
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`py-2 px-3.5 rounded-xl whitespace-nowrap transition-colors ${
            activeTab === 'products'
              ? 'bg-[#7257E8] text-white font-semibold shadow-xs'
              : 'text-[#6E6D7A] hover:text-[#222126] hover:bg-white'
          }`}
        >
          Produits ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('wallet')}
          className={`py-2 px-3.5 rounded-xl whitespace-nowrap transition-colors ${
            activeTab === 'wallet'
              ? 'bg-[#7257E8] text-white font-semibold shadow-xs'
              : 'text-[#6E6D7A] hover:text-[#222126] hover:bg-white'
          }`}
        >
          Portefeuille & Dépôts
        </button>
      </div>

      {/* TAB CONTENT */}

      {/* 1. OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Active Campaigns list snippet */}
          <div className="bg-white rounded-3xl border border-[#E5E5EB] p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-[#222126]">Campagnes en cours de diffusion</h2>
              <button
                onClick={() => setActiveTab('campaigns')}
                className="text-xs text-[#7257E8] hover:underline font-semibold"
              >
                Gérer toutes les campagnes →
              </button>
            </div>

            <div className="divide-y divide-[#F6F6F8]">
              {campaigns.map((camp) => (
                <div key={camp.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 overflow-hidden relative border shrink-0">
                      {camp.product?.logo_url && (
                        <Image src={camp.product.logo_url} alt="" fill className="object-cover" referrerPolicy="no-referrer" />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-[#222126]">{camp.title}</div>
                      <div className="text-[11px] text-[#6E6D7A]">
                        {camp.product?.name} · {camp.deliverable_format} · {camp.engaged_creators_count} engagés
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-bold text-[#222126] tabular-nums">
                        {camp.budget_remaining} € restant / {camp.budget_total} €
                      </div>
                      <div className="text-[10px] text-[#8E8D9A]">
                        {camp.payout_model === 'cpm' ? `${camp.cpm_rate} €/CPM` : `${camp.fixed_amount} € fixe`}
                      </div>
                    </div>
                    <StatusBadge status={camp.status} type="campaign" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Deliverables requiring action */}
          <div className="bg-white rounded-3xl border border-[#E5E5EB] p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-[#222126]">Livrables récents à contrôler</h2>
              <button
                onClick={() => setActiveTab('deliverables')}
                className="text-xs text-[#7257E8] hover:underline font-semibold"
              >
                Voir tous les livrables →
              </button>
            </div>

            <div className="divide-y divide-[#F6F6F8]">
              {deliverables.map((deliv) => (
                <div key={deliv.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-semibold text-[#222126]">
                      {deliv.creator?.display_name} — {deliv.campaign?.title}
                    </div>
                    <div className="text-[11px] text-[#6E6D7A] flex items-center gap-2 mt-0.5">
                      <span className="capitalize">{deliv.platform}</span>
                      <span>·</span>
                      <a href={deliv.post_url} target="_blank" rel="noreferrer" className="text-[#7257E8] hover:underline flex items-center gap-0.5">
                        Lien vidéo <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                      <span>·</span>
                      <span className="font-medium text-neutral-800">{deliv.claimed_views.toLocaleString()} vues déclarées</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <StatusBadge status={deliv.status} type="deliverable" />
                    {deliv.status === 'submitted' && (
                      <button
                        onClick={() => {
                          setReviewModalDeliverable(deliv);
                          setVerifiedViewsInput(deliv.claimed_views);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#7257E8] text-white font-medium text-xs hover:bg-[#5e42db]"
                      >
                        Examiner & Payer
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. CAMPAIGNS TAB */}
      {activeTab === 'campaigns' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#222126]">Gestion de vos campagnes</h2>
            <button
              onClick={() => setShowNewCampaignModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-[#7257E8] hover:bg-[#5e42db] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              Créer une campagne
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {campaigns.map((camp) => (
              <div key={camp.id} className="bg-white rounded-2xl border border-[#E5E5EB] p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-[#7257E8]">{camp.product?.name}</span>
                    <StatusBadge status={camp.status} type="campaign" />
                  </div>
                  <h3 className="font-bold text-sm text-[#222126] mb-2">{camp.title}</h3>
                  <p className="text-xs text-[#6E6D7A] line-clamp-2 leading-relaxed mb-4">{camp.brief}</p>

                  <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-xl bg-[#F6F6F8] mb-4">
                    <div>
                      <div className="text-[10px] text-[#8E8D9A] uppercase font-semibold">Budget Total</div>
                      <div className="font-bold text-[#222126] tabular-nums">{camp.budget_total} €</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#8E8D9A] uppercase font-semibold">Restant</div>
                      <div className="font-bold text-emerald-700 tabular-nums">{camp.budget_remaining} €</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#F6F6F8]">
                  <div className="flex items-center gap-1.5">
                    {camp.status === 'active' ? (
                      <button
                        onClick={() => updateCampaignStatus(camp.id, 'paused')}
                        className="px-2.5 py-1 rounded-lg border border-neutral-200 text-xs text-neutral-600 hover:bg-neutral-50"
                      >
                        Mettre en pause
                      </button>
                    ) : (
                      <button
                        onClick={() => updateCampaignStatus(camp.id, 'active')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium"
                      >
                        Réactiver
                      </button>
                    )}
                  </div>

                  <Link
                    href={`/campagnes/${camp.id}`}
                    className="text-xs text-[#7257E8] hover:underline font-semibold flex items-center gap-1"
                  >
                    Voir fiche publique →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. APPLICATIONS TAB */}
      {activeTab === 'applications' && (
        <div className="bg-white rounded-3xl border border-[#E5E5EB] p-6 shadow-xs">
          <h2 className="text-sm font-bold text-[#222126] mb-4">Candidatures reçues des créateurs</h2>

          {applications.length === 0 ? (
            <div className="text-center py-12 text-xs text-neutral-400">Aucune candidature reçue.</div>
          ) : (
            <div className="divide-y divide-[#F6F6F8]">
              {applications.map((app) => (
                <div key={app.id} className="py-4 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-100 relative border shrink-0">
                        {app.creator?.avatar_path && (
                          <Image src={app.creator.avatar_path} alt="" fill className="object-cover" referrerPolicy="no-referrer" />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#222126]">{app.creator?.display_name}</div>
                        <div className="text-[11px] text-[#6E6D7A]">
                          Candidature pour : <span className="font-semibold text-neutral-800">{app.campaign?.title}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <StatusBadge status={app.status} type="application" />
                      {app.status === 'pending' && (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateApplicationStatus(app.id, 'accepted')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs flex items-center gap-1 transition-colors"
                          >
                            <Check className="w-3 h-3" />
                            Accepter
                          </button>
                          <button
                            onClick={() => updateApplicationStatus(app.id, 'rejected')}
                            className="px-2.5 py-1 rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50 text-xs"
                          >
                            Refuser
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F6F6F8] text-xs text-neutral-800 leading-relaxed">
                    &quot;{app.pitch}&quot;
                  </div>

                  {app.status === 'accepted' && (
                    <div className="text-[11px] text-emerald-700 bg-emerald-50/60 p-2 rounded-lg border border-emerald-200/50 flex items-center justify-between">
                      <span>Lien de tracking attribué : <code>/t/{app.tracking_code}</code></span>
                      <span className="font-medium">Créateur engagé</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. DELIVERABLES TAB */}
      {activeTab === 'deliverables' && (
        <div className="bg-white rounded-3xl border border-[#E5E5EB] p-6 shadow-xs">
          <h2 className="text-sm font-bold text-[#222126] mb-4">Contrôle des livrables & Paiements</h2>

          <div className="divide-y divide-[#F6F6F8]">
            {deliverables.map((deliv) => (
              <div key={deliv.id} className="py-4 space-y-3 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-[#222126] text-sm">
                      {deliv.creator?.display_name} — {deliv.campaign?.title}
                    </div>
                    <div className="text-[11px] text-[#6E6D7A] flex items-center gap-2 mt-1">
                      <span className="capitalize font-medium">{deliv.platform}</span>
                      <span>·</span>
                      <a href={deliv.post_url} target="_blank" rel="noreferrer" className="text-[#7257E8] hover:underline flex items-center gap-1">
                        Voir la publication en ligne <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <StatusBadge status={deliv.status} type="deliverable" />
                    {deliv.status === 'submitted' && (
                      <button
                        onClick={() => {
                          setReviewModalDeliverable(deliv);
                          setVerifiedViewsInput(deliv.claimed_views);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#7257E8] text-white font-semibold text-xs hover:bg-[#5e42db] transition-colors"
                      >
                        Examiner & Valider
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-xl bg-[#F6F6F8]">
                  <div>
                    <div className="text-[10px] text-[#8E8D9A] uppercase font-semibold">Vues Déclarées</div>
                    <div className="font-bold text-neutral-800 tabular-nums">{deliv.claimed_views.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#8E8D9A] uppercase font-semibold">Vues Certifiées</div>
                    <div className="font-bold text-emerald-700 tabular-nums">
                      {deliv.verified_views > 0 ? deliv.verified_views.toLocaleString() : 'En attente'}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#8E8D9A] uppercase font-semibold">Clics Trackés</div>
                    <div className="font-bold text-[#7257E8] tabular-nums">{deliv.unique_clicks}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#8E8D9A] uppercase font-semibold">Rémunération</div>
                    <div className="font-bold text-[#222126] tabular-nums">{deliv.calculated_earnings.toFixed(2)} €</div>
                  </div>
                </div>

                {deliv.proof_screenshot_url && (
                  <div className="text-[11px] text-[#6E6D7A]">
                    Preuve analytique fournie :{' '}
                    <a href={deliv.proof_screenshot_url} target="_blank" rel="noreferrer" className="text-[#7257E8] hover:underline">
                      Consulter la capture d’écran d’analytiques
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#222126]">Vos produits enregistrés</h2>
            <button
              onClick={() => setShowNewProductModal(true)}
              className="px-3 py-1.5 rounded-xl bg-[#7257E8] hover:bg-[#5e42db] text-white text-xs font-semibold flex items-center gap-1 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              Ajouter un produit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map((prod) => (
              <div key={prod.id} className="bg-white rounded-2xl border border-[#E5E5EB] p-5 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 relative overflow-hidden mb-3 border">
                    {prod.logo_url && <Image src={prod.logo_url} alt="" fill className="object-cover" referrerPolicy="no-referrer" />}
                  </div>
                  <h3 className="font-bold text-sm text-[#222126] mb-1">{prod.name}</h3>
                  <div className="text-xs text-[#7257E8] font-medium mb-2">{prod.category}</div>
                  <p className="text-xs text-[#6E6D7A] leading-relaxed mb-4">{prod.tagline || prod.description}</p>
                </div>

                <div className="pt-3 border-t border-[#F6F6F8] flex items-center justify-between">
                  <a
                    href={prod.website_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#7257E8] hover:underline font-medium flex items-center gap-1"
                  >
                    Visiter <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-[10px] text-[#8E8D9A]">
                    {campaigns.filter((c) => c.product_id === prod.id).length} campagne(s)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. WALLET TAB */}
      {activeTab === 'wallet' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl border border-[#E5E5EB] p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#F1EEFD] text-[#7257E8] flex items-center justify-center mb-4">
                <Wallet className="w-5 h-5" />
              </div>
              <div className="text-xs text-[#6E6D7A] mb-1">Solde Publicitaire Actuel</div>
              <div className="text-3xl font-bold text-[#222126] tabular-nums mb-3">
                {userWallet.balance_available.toFixed(2)} €
              </div>
              <p className="text-xs text-[#6E6D7A] leading-relaxed mb-6">
                Ce budget est réservé pour le paiement des campagnes et des vues certifiées livrées par vos créateurs.
              </p>
            </div>

            <button
              onClick={() => setShowDepositModal(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-[#7257E8] hover:bg-[#5e42db] text-white font-medium text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <CreditCard className="w-3.5 h-3.5" />
              Recharger mon budget publicitaire
            </button>
          </div>

          <div className="md:col-span-2 bg-white rounded-3xl border border-[#E5E5EB] p-6 shadow-xs">
            <h3 className="font-bold text-sm text-[#222126] mb-4">Historique des transactions comptables</h3>
            <div className="divide-y divide-[#F6F6F8] text-xs">
              {transactions.map((tx) => (
                <div key={tx.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[#222126]">{tx.description}</div>
                    <div className="text-[11px] text-[#8E8D9A]">{tx.reference} · {new Date(tx.created_at).toLocaleDateString('fr-FR')}</div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold tabular-nums ${tx.amount > 0 ? 'text-emerald-700' : 'text-neutral-800'}`}>
                      {tx.amount > 0 ? `+${tx.amount.toFixed(2)} €` : `${tx.amount.toFixed(2)} €`}
                    </div>
                    <StatusBadge status={tx.status} type="payment" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL : NOUVELLE CAMPAGNE */}
      {showNewCampaignModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E5EB] mb-4">
              <h3 className="font-bold text-base text-[#222126]">Créer une nouvelle campagne</h3>
              <button onClick={() => setShowNewCampaignModal(false)} className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCampaignSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#222126] mb-1">Titre percutant de la campagne</label>
                <input
                  type="text"
                  required
                  placeholder="Ex. Découverte de notre outil d’IA pour développeurs"
                  value={newCampTitle}
                  onChange={(e) => setNewCampTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7257E8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#222126] mb-1">Produit concerné</label>
                  <select
                    value={newCampProduct}
                    onChange={(e) => setNewCampProduct(e.target.value)}
                    className="w-full p-2 rounded-xl border border-neutral-200 bg-white"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#222126] mb-1">Modèle de rémunération</label>
                  <select
                    value={newCampModel}
                    onChange={(e) => setNewCampModel(e.target.value as any)}
                    className="w-full p-2 rounded-xl border border-neutral-200 bg-white"
                  >
                    <option value="cpm">CPM (au millier de vues)</option>
                    <option value="fixed">Forfait fixe par vidéo</option>
                    <option value="hybrid">Hybride (Fixe + CPM)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#222126] mb-1">Budget total alloué (€)</label>
                  <input
                    type="number"
                    required
                    min={100}
                    value={newCampBudget}
                    onChange={(e) => setNewCampBudget(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-neutral-200"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#222126] mb-1">
                    {newCampModel === 'cpm' ? 'Tarif CPM (€ / 1 000 vues)' : 'Forfait fixe (€)'}
                  </label>
                  <input
                    type="number"
                    required
                    value={newCampModel === 'cpm' ? newCampCpm : newCampFixed}
                    onChange={(e) => {
                      if (newCampModel === 'cpm') setNewCampCpm(Number(e.target.value));
                      else setNewCampFixed(Number(e.target.value));
                    }}
                    className="w-full p-2.5 rounded-xl border border-neutral-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#222126] mb-1">Brief créatif & attentes</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Décrivez les points clés à aborder dans la vidéo..."
                  value={newCampBrief}
                  onChange={(e) => setNewCampBrief(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-neutral-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#222126] mb-1">Format attendu</label>
                <input
                  type="text"
                  value={newCampFormat}
                  onChange={(e) => setNewCampFormat(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-neutral-200"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewCampaignModal(false)}
                  className="px-3 py-2 rounded-xl border text-neutral-600 hover:bg-neutral-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#7257E8] text-white font-semibold hover:bg-[#5e42db]"
                >
                  Publier la campagne
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL : NOUVEAU PRODUIT */}
      {showNewProductModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E5EB] mb-4">
              <h3 className="font-bold text-base text-[#222126]">Ajouter un produit</h3>
              <button onClick={() => setShowNewProductModal(false)} className="p-1 text-neutral-400 hover:text-neutral-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProductSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Nom du produit</label>
                <input
                  type="text"
                  required
                  placeholder="Ex. TaskPulse AI"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">URL officielle du produit</label>
                <input
                  type="url"
                  required
                  placeholder="https://mon-saas.com"
                  value={newProdUrl}
                  onChange={(e) => setNewProdUrl(e.target.value)}
                  className="w-full p-2.5 rounded-xl border"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Slogan / Tagline</label>
                <input
                  type="text"
                  placeholder="Ex. Automatisez vos revues de code en 30 secondes"
                  value={newProdTagline}
                  onChange={(e) => setNewProdTagline(e.target.value)}
                  className="w-full p-2.5 rounded-xl border"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Description détaillée</label>
                <textarea
                  rows={2}
                  placeholder="Présentation des fonctionnalités..."
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl border"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewProductModal(false)}
                  className="px-3 py-2 rounded-xl border text-neutral-600"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#7257E8] text-white font-semibold"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL : RECHARGEMENT BUDGET */}
      {showDepositModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl text-xs">
            <div className="flex items-center justify-between pb-3 border-b mb-4">
              <h3 className="font-bold text-sm text-[#222126]">Approvisionner le budget</h3>
              <button onClick={() => setShowDepositModal(false)} className="text-neutral-400 hover:text-neutral-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            {depositSuccessMsg ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-center font-medium">
                {depositSuccessMsg}
              </div>
            ) : (
              <form onSubmit={handleDepositSubmit} className="space-y-4">
                <div>
                  <label className="block font-semibold mb-1">Montant à créditer (€)</label>
                  <input
                    type="number"
                    min={50}
                    step={50}
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border text-base font-bold text-[#222126]"
                  />
                </div>

                <div className="p-3 rounded-xl bg-[#F6F6F8] text-[11px] text-[#6E6D7A] leading-relaxed">
                  Paiement sécurisé par carte bancaire. Les fonds sont immédiatement disponibles sur votre solde Nolio.
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#7257E8] text-white font-semibold hover:bg-[#5e42db]"
                >
                  Valider le rechargement de {depositAmount} €
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL : REVUE DE LIVRABLE */}
      {reviewModalDeliverable && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl text-xs">
            <div className="flex items-center justify-between pb-3 border-b mb-4">
              <h3 className="font-bold text-sm text-[#222126]">Contrôle du livrable</h3>
              <button onClick={() => setReviewModalDeliverable(null)} className="text-neutral-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <div>
                <span className="text-[#8E8D9A] block text-[10px] uppercase font-semibold">Créateur</span>
                <span className="font-bold text-[#222126]">{reviewModalDeliverable.creator?.display_name}</span>
              </div>

              <div>
                <span className="text-[#8E8D9A] block text-[10px] uppercase font-semibold">Publication soumise</span>
                <a
                  href={reviewModalDeliverable.post_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#7257E8] hover:underline font-medium flex items-center gap-1 mt-0.5"
                >
                  {reviewModalDeliverable.post_url} <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-[#222126]">Vues certifiées retenues pour le calcul</label>
                <input
                  type="number"
                  value={verifiedViewsInput}
                  onChange={(e) => setVerifiedViewsInput(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border text-sm font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-[#222126]">Remarques pour le créateur (optionnel)</label>
                <textarea
                  rows={2}
                  placeholder="Commentaire ou consignes complémentaires..."
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border"
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={() => executeReview('revision_requested')}
                className="py-2 px-3 rounded-xl border border-amber-300 text-amber-800 hover:bg-amber-50"
              >
                Demander correction
              </button>

              <button
                type="button"
                onClick={() => executeReview('approved')}
                className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs"
              >
                Approuver & Débloquer paiement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
