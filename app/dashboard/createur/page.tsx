'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/context/auth-context';
import { useMarketplace } from '@/lib/context/marketplace-context';
import { StatusBadge } from '@/components/ui/status-badge';
import {
  Video,
  CheckCircle2,
  Clock,
  Wallet,
  ArrowRight,
  Send,
  Link2,
  Copy,
  Check,
  AlertCircle,
  ExternalLink,
  Plus,
  Tv,
  Sparkles,
  Layers,
  Banknote,
  X,
} from 'lucide-react';
import Link from 'next/link';

export default function CreatorDashboardPage() {
  const { user, updateProfileDisplayName } = useAuth();
  const {
    campaigns,
    applications,
    deliverables,
    wallets,
    transactions,
    submitDeliverable,
    requestPayout,
  } = useMarketplace();

  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'deliverables' | 'wallet' | 'profile'>('overview');

  // Submit deliverable modal state
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState('');
  const [postUrl, setPostUrl] = useState('');
  const [platform, setPlatform] = useState<any>('tiktok');
  const [claimedViews, setClaimedViews] = useState<number | ''>('');
  const [proofUrl, setProofUrl] = useState('');
  const [submitFeedback, setSubmitFeedback] = useState<{ success: boolean; message: string } | null>(null);

  // Payout request modal state
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState<number>(100);
  const [payoutMethod, setPayoutMethod] = useState('Virement Bancaire (IBAN SEPA)');
  const [recipientDetails, setRecipientDetails] = useState('');
  const [payoutFeedback, setPayoutFeedback] = useState<{ success: boolean; message: string } | null>(null);

  // Profile editing state
  const [editName, setEditName] = useState(user?.display_name || 'Alexandre Riva');
  const [profileSaved, setProfileSaved] = useState(false);
  const [copiedAppId, setCopiedAppId] = useState<string | null>(null);

  // User's specific data
  const myApplications = applications.filter((a) => a.creator_id === user?.id || a.creator_id === '6c329ea1-0e8b-4d9d-8927-ef4616753524');
  const acceptedApps = myApplications.filter((a) => a.status === 'accepted');
  const myDeliverables = deliverables.filter((d) => d.creator_id === user?.id || d.creator_id === '6c329ea1-0e8b-4d9d-8927-ef4616753524');

  const myWallet = wallets[user?.id || '6c329ea1-0e8b-4d9d-8927-ef4616753524'] || {
    balance_available: 456.0,
    balance_pending: 220.0,
    currency: 'EUR',
  };

  const totalValidatedViews = myDeliverables
    .filter((d) => d.status === 'approved')
    .reduce((acc, d) => acc + d.verified_views, 0);

  const handleSubmitDeliverable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppId || !postUrl || !claimedViews) return;

    const res = submitDeliverable(selectedAppId, postUrl, platform, Number(claimedViews), proofUrl);
    if (res.success) {
      setSubmitFeedback({ success: true, message: res.message || 'Livrable soumis avec succès !' });
      setTimeout(() => {
        setSubmitFeedback(null);
        setShowSubmitModal(false);
        setPostUrl('');
        setClaimedViews('');
        setProofUrl('');
        setActiveTab('deliverables');
      }, 1500);
    } else {
      setSubmitFeedback({ success: false, message: res.message || 'Erreur lors de la soumission.' });
    }
  };

  const handleRequestPayout = (e: React.FormEvent) => {
    e.preventDefault();
    const res = requestPayout(payoutAmount, payoutMethod, recipientDetails);
    if (res.success) {
      setPayoutFeedback({ success: true, message: res.message || 'Demande enregistrée !' });
      setTimeout(() => {
        setPayoutFeedback(null);
        setShowPayoutModal(false);
      }, 2000);
    } else {
      setPayoutFeedback({ success: false, message: res.message || 'Erreur de retrait.' });
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileDisplayName(editName);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  const copyLink = (code: string, id: string) => {
    const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/t/${code}`;
    navigator.clipboard.writeText(url);
    setCopiedAppId(id);
    setTimeout(() => setCopiedAppId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold text-emerald-700">Espace Créateur Partenaire</span>
          </div>
          <h1 className="text-2xl font-bold text-[#222126]">
            {user?.display_name || 'Alexandre Riva'}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/campagnes"
            className="px-3 py-2 rounded-xl border border-[#E5E5EB] hover:bg-white text-xs font-semibold text-[#222126] transition-colors"
          >
            Explorer les campagnes
          </Link>
          <button
            onClick={() => setShowSubmitModal(true)}
            disabled={acceptedApps.length === 0}
            className="px-3.5 py-2 rounded-xl bg-[#7257E8] hover:bg-[#5e42db] disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            Soumettre une publication
          </button>
        </div>
      </div>

      {/* KPI STRIP */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
        <div className="p-3.5 rounded-2xl bg-white border border-[#E5E5EB]">
          <div className="text-[10px] text-[#8E8D9A] uppercase tracking-wider font-semibold">
            Gains Disponibles
          </div>
          <div className="text-xl font-bold text-emerald-700 mt-1 tabular-nums">
            {myWallet.balance_available.toFixed(2)} €
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-[#E5E5EB]">
          <div className="text-[10px] text-[#8E8D9A] uppercase tracking-wider font-semibold">
            Gains en Attente
          </div>
          <div className="text-xl font-bold text-[#222126] mt-1 tabular-nums">
            {myWallet.balance_pending.toFixed(2)} €
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-[#E5E5EB]">
          <div className="text-[10px] text-[#8E8D9A] uppercase tracking-wider font-semibold">
            Campagnes Acceptées
          </div>
          <div className="text-xl font-bold text-[#7257E8] mt-1 tabular-nums">
            {acceptedApps.length}
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-[#E5E5EB]">
          <div className="text-[10px] text-[#8E8D9A] uppercase tracking-wider font-semibold">
            Candidatures en Cours
          </div>
          <div className="text-xl font-bold text-[#222126] mt-1 tabular-nums">
            {myApplications.filter((a) => a.status === 'pending').length}
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-[#E5E5EB]">
          <div className="text-[10px] text-[#8E8D9A] uppercase tracking-wider font-semibold">
            Vues Certifiées
          </div>
          <div className="text-xl font-bold text-[#222126] mt-1 tabular-nums">
            {totalValidatedViews.toLocaleString()}
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-[#E5E5EB]">
          <div className="text-[10px] text-[#8E8D9A] uppercase tracking-wider font-semibold">
            Livrables Validés
          </div>
          <div className="text-xl font-bold text-emerald-600 mt-1 tabular-nums">
            {myDeliverables.filter((d) => d.status === 'approved').length}
          </div>
        </div>
      </div>

      {/* TABS */}
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
          Mes Campagnes & Liens ({myApplications.length})
        </button>

        <button
          onClick={() => setActiveTab('deliverables')}
          className={`py-2 px-3.5 rounded-xl whitespace-nowrap transition-colors ${
            activeTab === 'deliverables'
              ? 'bg-[#7257E8] text-white font-semibold shadow-xs'
              : 'text-[#6E6D7A] hover:text-[#222126] hover:bg-white'
          }`}
        >
          Livrables Soumis ({myDeliverables.length})
        </button>

        <button
          onClick={() => setActiveTab('wallet')}
          className={`py-2 px-3.5 rounded-xl whitespace-nowrap transition-colors ${
            activeTab === 'wallet'
              ? 'bg-[#7257E8] text-white font-semibold shadow-xs'
              : 'text-[#6E6D7A] hover:text-[#222126] hover:bg-white'
          }`}
        >
          Portefeuille & Retraits
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`py-2 px-3.5 rounded-xl whitespace-nowrap transition-colors ${
            activeTab === 'profile'
              ? 'bg-[#7257E8] text-white font-semibold shadow-xs'
              : 'text-[#6E6D7A] hover:text-[#222126] hover:bg-white'
          }`}
        >
          Profil & Réseaux
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Active Campaigns awaiting submission */}
          <div className="bg-white rounded-3xl border border-[#E5E5EB] p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-[#222126]">Campagnes acceptées à produire</h2>
              <button
                onClick={() => setShowSubmitModal(true)}
                className="text-xs text-[#7257E8] hover:underline font-semibold"
              >
                + Soumettre une publication
              </button>
            </div>

            {acceptedApps.length === 0 ? (
              <div className="text-center py-8 text-neutral-400 text-xs">
                Aucune campagne active. Postulez depuis la marketplace !
              </div>
            ) : (
              <div className="divide-y divide-[#F6F6F8]">
                {acceptedApps.map((app) => (
                  <div key={app.id} className="py-4 space-y-2 text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="font-bold text-[#222126] text-sm">{app.campaign?.title}</div>
                        <div className="text-[11px] text-[#6E6D7A]">
                          {app.campaign?.deliverable_format} · Rémunération :{' '}
                          <span className="font-semibold text-neutral-800">
                            {app.campaign?.payout_model === 'cpm' && `${app.campaign.cpm_rate} € / 1000 vues`}
                            {app.campaign?.payout_model === 'fixed' && `${app.campaign.fixed_amount} € fixe`}
                            {app.campaign?.payout_model === 'hybrid' && `${app.campaign.fixed_amount} € + ${app.campaign.cpm_rate} €/CPM`}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedAppId(app.id);
                          setShowSubmitModal(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#7257E8] hover:bg-[#5e42db] text-white text-xs font-semibold flex items-center gap-1.5"
                      >
                        <Send className="w-3 h-3" />
                        Envoyer ma vidéo
                      </button>
                    </div>

                    {/* Tracking link display */}
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-[#F6F6F8]">
                      <span className="text-[11px] text-[#6E6D7A] font-medium whitespace-nowrap">
                        Lien obligatoire en bio :
                      </span>
                      <code className="text-xs text-[#7257E8] flex-1 truncate font-mono">
                        /t/{app.tracking_code}
                      </code>
                      <button
                        onClick={() => copyLink(app.tracking_code || '', app.id)}
                        className="px-2 py-1 rounded-md bg-white border text-[11px] flex items-center gap-1 text-neutral-700 hover:bg-neutral-50"
                      >
                        {copiedAppId === app.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        {copiedAppId === app.id ? 'Copié' : 'Copier'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick balance & withdrawal summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl border border-[#E5E5EB] p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="text-xs text-[#6E6D7A] mb-1">Solde Retirable Immédiatement</div>
                <div className="text-3xl font-bold text-emerald-700 tabular-nums mb-3">
                  {myWallet.balance_available.toFixed(2)} €
                </div>
                <p className="text-xs text-[#6E6D7A] leading-relaxed">
                  Gains validés suite à vos livrables approuvés par les annonceurs.
                </p>
              </div>

              <button
                onClick={() => setShowPayoutModal(true)}
                disabled={myWallet.balance_available < 50}
                className="mt-6 w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <Banknote className="w-4 h-4" />
                Demander un virement (min. 50 €)
              </button>
            </div>

            <div className="md:col-span-2 bg-white rounded-3xl border border-[#E5E5EB] p-6 shadow-xs">
              <h3 className="font-bold text-sm text-[#222126] mb-3">Dernières transactions</h3>
              <div className="divide-y divide-[#F6F6F8] text-xs">
                {transactions.slice(0, 3).map((tx) => (
                  <div key={tx.id} className="py-2.5 flex items-center justify-between">
                    <div>
                      <div className="font-medium text-[#222126]">{tx.description}</div>
                      <div className="text-[10px] text-[#8E8D9A]">{new Date(tx.created_at).toLocaleDateString('fr-FR')}</div>
                    </div>
                    <div className="text-right font-bold text-emerald-700 tabular-nums">
                      +{tx.amount.toFixed(2)} €
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MY CAMPAIGNS */}
      {activeTab === 'campaigns' && (
        <div className="bg-white rounded-3xl border border-[#E5E5EB] p-6 shadow-xs">
          <h2 className="text-sm font-bold text-[#222126] mb-4">Vos candidatures & campagnes engagées</h2>
          <div className="divide-y divide-[#F6F6F8]">
            {myApplications.map((app) => (
              <div key={app.id} className="py-4 space-y-2 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-sm text-[#222126]">{app.campaign?.title}</h3>
                    <div className="text-[11px] text-[#6E6D7A]">
                      Annonceur : {app.campaign?.company?.name} · Format : {app.campaign?.deliverable_format}
                    </div>
                  </div>
                  <StatusBadge status={app.status} type="application" />
                </div>

                <div className="p-3 rounded-xl bg-[#F6F6F8] text-neutral-700 leading-relaxed">
                  Votre pitch : &quot;{app.pitch}&quot;
                </div>

                {app.status === 'accepted' && (
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[11px] font-semibold text-emerald-800">Lien de tracking attribué :</span>
                    <code className="text-xs bg-white px-2 py-1 rounded border font-mono text-[#7257E8]">
                      /t/{app.tracking_code}
                    </code>
                    <button
                      onClick={() => copyLink(app.tracking_code || '', app.id)}
                      className="px-2 py-1 rounded-md bg-[#7257E8] text-white text-[11px] font-medium"
                    >
                      {copiedAppId === app.id ? 'Copié' : 'Copier'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DELIVERABLES */}
      {activeTab === 'deliverables' && (
        <div className="bg-white rounded-3xl border border-[#E5E5EB] p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-[#222126]">Publications soumises & preuves</h2>
            <button
              onClick={() => setShowSubmitModal(true)}
              disabled={acceptedApps.length === 0}
              className="px-3 py-1.5 rounded-xl bg-[#7257E8] text-white text-xs font-semibold hover:bg-[#5e42db] disabled:opacity-50"
            >
              + Soumettre une publication
            </button>
          </div>

          <div className="divide-y divide-[#F6F6F8] text-xs">
            {myDeliverables.map((deliv) => (
              <div key={deliv.id} className="py-4 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-[#222126]">{deliv.campaign?.title}</h3>
                    <a
                      href={deliv.post_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-[#7257E8] hover:underline flex items-center gap-1 mt-0.5"
                    >
                      Voir le post sur {deliv.platform} <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                  <StatusBadge status={deliv.status} type="deliverable" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 rounded-xl bg-[#F6F6F8]">
                  <div>
                    <div className="text-[10px] text-[#8E8D9A]">Vues déclarées</div>
                    <div className="font-bold tabular-nums">{deliv.claimed_views.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#8E8D9A]">Vues validées</div>
                    <div className="font-bold text-emerald-700 tabular-nums">
                      {deliv.verified_views > 0 ? deliv.verified_views.toLocaleString() : 'En attente'}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#8E8D9A]">Clics uniques</div>
                    <div className="font-bold text-[#7257E8] tabular-nums">{deliv.unique_clicks}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#8E8D9A]">Gains générés</div>
                    <div className="font-bold text-[#222126] tabular-nums">{deliv.calculated_earnings.toFixed(2)} €</div>
                  </div>
                </div>

                {deliv.revision_notes && (
                  <div className="p-2.5 rounded-lg bg-amber-50 text-amber-800 text-[11px] border border-amber-200">
                    Remarque de l’annonceur : {deliv.revision_notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: WALLET */}
      {activeTab === 'wallet' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl border border-[#E5E5EB] p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="text-xs text-[#6E6D7A] mb-1">Solde Disponible au Retrait</div>
              <div className="text-3xl font-bold text-emerald-700 tabular-nums mb-3">
                {myWallet.balance_available.toFixed(2)} €
              </div>
              <div className="text-xs text-[#8E8D9A] mb-6">
                En attente de validation : {myWallet.balance_pending.toFixed(2)} €
              </div>

              <div className="p-3 rounded-xl bg-[#F6F6F8] text-[11px] text-[#6E6D7A] leading-relaxed mb-6">
                Les retraits s’effectuent sans frais vers votre compte bancaire (IBAN) sous 24 à 48 heures.
              </div>
            </div>

            <button
              onClick={() => setShowPayoutModal(true)}
              disabled={myWallet.balance_available < 50}
              className="w-full py-2.5 px-4 rounded-xl bg-[#7257E8] hover:bg-[#5e42db] disabled:opacity-50 text-white font-semibold text-xs transition-colors shadow-xs"
            >
              Demander un retrait
            </button>
          </div>

          <div className="md:col-span-2 bg-white rounded-3xl border border-[#E5E5EB] p-6 shadow-xs">
            <h3 className="font-bold text-sm text-[#222126] mb-4">Relevé des rémunérations</h3>
            <div className="divide-y divide-[#F6F6F8] text-xs">
              {transactions.map((tx) => (
                <div key={tx.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[#222126]">{tx.description}</div>
                    <div className="text-[10px] text-[#8E8D9A]">{tx.reference} · {new Date(tx.created_at).toLocaleDateString('fr-FR')}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-emerald-700 tabular-nums">+{tx.amount.toFixed(2)} €</div>
                    <StatusBadge status={tx.status} type="payment" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: PROFILE */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl border border-[#E5E5EB] p-6 sm:p-8 shadow-xs max-w-2xl">
          <h2 className="text-base font-bold text-[#222126] mb-4">Modifier votre profil créateur</h2>

          {profileSaved && (
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              Profil mis à jour avec succès dans Supabase !
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold mb-1">Nom d’affichage public</label>
              <input
                type="text"
                required
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-neutral-200"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Bio & description pour les annonceurs</label>
              <textarea
                rows={3}
                defaultValue="Créateur tech & SaaS. Je teste les meilleurs outils IA et web pour 85 000 développeurs et solopreneurs."
                className="w-full p-2.5 rounded-xl border border-neutral-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1">Pays</label>
                <input
                  type="text"
                  defaultValue="France"
                  className="w-full p-2.5 rounded-xl border border-neutral-200"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Langues maîtrisées</label>
                <input
                  type="text"
                  defaultValue="Français, Anglais"
                  className="w-full p-2.5 rounded-xl border border-neutral-200"
                />
              </div>
            </div>

            <button
              type="submit"
              className="py-2.5 px-5 rounded-xl bg-[#7257E8] text-white font-semibold hover:bg-[#5e42db] transition-colors shadow-xs"
            >
              Enregistrer les modifications
            </button>
          </form>
        </div>
      )}

      {/* MODAL : SOUMETTRE UN LIVRABLE */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl text-xs">
            <div className="flex items-center justify-between pb-3 border-b mb-4">
              <h3 className="font-bold text-sm text-[#222126]">Soumettre votre lien de publication</h3>
              <button onClick={() => setShowSubmitModal(false)} className="text-neutral-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            {submitFeedback && (
              <div className={`p-3 rounded-xl mb-4 text-xs ${submitFeedback.success ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
                {submitFeedback.message}
              </div>
            )}

            <form onSubmit={handleSubmitDeliverable} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Campagne concernée</label>
                <select
                  required
                  value={selectedAppId}
                  onChange={(e) => setSelectedAppId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-white"
                >
                  <option value="">Sélectionnez une campagne acceptée...</option>
                  {acceptedApps.map((a) => (
                    <option key={a.id} value={a.id}>{a.campaign?.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Réseau social</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-white capitalize"
                >
                  <option value="tiktok">TikTok</option>
                  <option value="youtube">YouTube</option>
                  <option value="instagram">Instagram</option>
                  <option value="twitter_x">X (Twitter)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">URL publique de la vidéo / post</label>
                <input
                  type="url"
                  required
                  placeholder="https://www.tiktok.com/@votre_compte/video/..."
                  value={postUrl}
                  onChange={(e) => setPostUrl(e.target.value)}
                  className="w-full p-2.5 rounded-xl border"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Nombre de vues constatées</label>
                <input
                  type="number"
                  required
                  min={0}
                  placeholder="Ex. 18500"
                  value={claimedViews}
                  onChange={(e) => setClaimedViews(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Lien vers capture d’écran d’analytiques</label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/... ou capture d’écran"
                  value={proofUrl}
                  onChange={(e) => setProofUrl(e.target.value)}
                  className="w-full p-2.5 rounded-xl border"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-3 py-2 rounded-xl border text-neutral-600"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#7257E8] text-white font-semibold hover:bg-[#5e42db]"
                >
                  Transmettre pour contrôle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL : DEMANDE DE RETRAIT */}
      {showPayoutModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl text-xs">
            <div className="flex items-center justify-between pb-3 border-b mb-4">
              <h3 className="font-bold text-sm text-[#222126]">Demande de virement</h3>
              <button onClick={() => setShowPayoutModal(false)} className="text-neutral-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            {payoutFeedback && (
              <div className={`p-3 rounded-xl mb-3 text-xs ${payoutFeedback.success ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
                {payoutFeedback.message}
              </div>
            )}

            <form onSubmit={handleRequestPayout} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Montant à retirer (€)</label>
                <input
                  type="number"
                  min={50}
                  max={myWallet.balance_available}
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border text-base font-bold text-[#222126]"
                />
                <div className="text-[10px] text-[#8E8D9A] mt-1">
                  Maximum disponible : {myWallet.balance_available.toFixed(2)} €
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Mode de règlement</label>
                <select
                  value={payoutMethod}
                  onChange={(e) => setPayoutMethod(e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-white"
                >
                  <option value="Virement Bancaire (IBAN SEPA)">Virement Bancaire (IBAN SEPA)</option>
                  <option value="PayPal">PayPal</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Coordonnées du bénéficiaire</label>
                <input
                  type="text"
                  required
                  placeholder="IBAN FR76... ou email PayPal"
                  value={recipientDetails}
                  onChange={(e) => setRecipientDetails(e.target.value)}
                  className="w-full p-2.5 rounded-xl border"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
              >
                Confirmer la demande
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
