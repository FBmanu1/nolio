'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMarketplace } from '@/lib/context/marketplace-context';
import { useAuth } from '@/lib/context/auth-context';
import { StatusBadge } from '@/components/ui/status-badge';
import {
  ArrowLeft,
  Building2,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  Link2,
  Send,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react';
import Image from 'next/image';

export default function CampaignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const campaignId = params.id as string;

  const { campaigns, applications, applyToCampaign } = useMarketplace();
  const { user } = useAuth();

  const campaign = campaigns.find((c) => c.id === campaignId);

  // Postulation form state
  const [pitch, setPitch] = useState('');
  const [requestedRate, setRequestedRate] = useState<number | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!campaign) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-[#222126] mb-2">Campagne introuvable</h2>
        <p className="text-xs text-[#6E6D7A] mb-4">
          Cette campagne n’existe pas ou a été retirée de la marketplace.
        </p>
        <Link
          href="/campagnes"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#7257E8] text-white text-xs font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Retour aux campagnes
        </Link>
      </div>
    );
  }

  // Check if current user has an application
  const existingApp = applications.find(
    (a) => a.campaign_id === campaignId && a.creator_id === user?.id
  );

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pitch.trim()) {
      setFeedback({ success: false, message: 'Veuillez saisir votre pitch de présentation.' });
      return;
    }

    setIsSubmitting(true);
    const res = applyToCampaign(
      campaignId,
      pitch,
      typeof requestedRate === 'number' ? requestedRate : undefined
    );
    setIsSubmitting(false);

    if (res.success) {
      setFeedback({ success: true, message: res.message || 'Candidature transmise avec succès !' });
      setPitch('');
    } else {
      setFeedback({ success: false, message: res.message || 'Erreur lors de la postulation.' });
    }
  };

  const trackingUrl = existingApp?.tracking_code
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}/t/${existingApp.tracking_code}`
    : '';

  const copyTracking = () => {
    if (trackingUrl) {
      navigator.clipboard.writeText(trackingUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
      {/* Back Button */}
      <Link
        href="/campagnes"
        className="inline-flex items-center gap-1.5 text-xs text-[#6E6D7A] hover:text-[#222126] transition-colors mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Retour à la marketplace
      </Link>

      {/* Main Campaign Header Card */}
      <div className="bg-white rounded-3xl border border-[#E5E5EB] p-6 sm:p-8 mb-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#F6F6F8]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#F6F6F8] relative overflow-hidden border border-neutral-200 shrink-0">
              {campaign.product?.logo_url && (
                <Image
                  src={campaign.product.logo_url}
                  alt={campaign.product.name}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-[#7257E8]">
                  {campaign.company?.name}
                </span>
                <span>·</span>
                <span className="text-xs text-[#6E6D7A]">{campaign.product?.category}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#222126]">{campaign.title}</h1>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1">
            <StatusBadge status={campaign.status} type="campaign" />
            <div className="text-xs text-[#6E6D7A] mt-1">
              {campaign.engaged_creators_count} / {campaign.desired_creators_count} créateurs engagés
            </div>
          </div>
        </div>

        {/* Campaign Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#F6F6F8] mb-8">
          <div>
            <div className="text-[10px] text-[#8E8D9A] uppercase tracking-wider font-semibold">
              Modèle de rémunération
            </div>
            <div className="text-sm font-bold text-[#222126] mt-0.5">
              {campaign.payout_model === 'cpm' && `${campaign.cpm_rate} € / 1000 vues`}
              {campaign.payout_model === 'fixed' && `${campaign.fixed_amount} € forfait fixe`}
              {campaign.payout_model === 'hybrid' &&
                `${campaign.fixed_amount} € + ${campaign.cpm_rate} €/CPM`}
            </div>
          </div>

          <div>
            <div className="text-[10px] text-[#8E8D9A] uppercase tracking-wider font-semibold">
              Format attendu
            </div>
            <div className="text-xs font-medium text-[#222126] mt-1">
              {campaign.deliverable_format}
            </div>
          </div>

          <div>
            <div className="text-[10px] text-[#8E8D9A] uppercase tracking-wider font-semibold">
              Réseaux éligibles
            </div>
            <div className="text-xs font-medium text-[#222126] mt-1 capitalize">
              {campaign.platforms.join(', ')}
            </div>
          </div>

          <div>
            <div className="text-[10px] text-[#8E8D9A] uppercase tracking-wider font-semibold">
              Audience minimale
            </div>
            <div className="text-sm font-bold text-[#222126] tabular-nums mt-0.5">
              {campaign.min_followers.toLocaleString()} abonnés
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold text-[#222126] mb-2">Description du Produit</h3>
            <p className="text-xs text-[#6E6D7A] leading-relaxed">
              {campaign.product?.description || campaign.description}
            </p>
            {campaign.product?.website_url && (
              <a
                href={campaign.product.website_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#7257E8] hover:underline font-medium mt-2"
              >
                Visiter le site officiel
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#222126] mb-2">Brief & Objectifs de Création</h3>
            <div className="p-4 rounded-xl bg-white border border-[#E5E5EB] text-xs text-neutral-800 leading-relaxed whitespace-pre-line">
              {campaign.brief}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#222126] mb-2">Consignes & Conditions</h3>
            <div className="p-4 rounded-xl bg-[#F6F6F8] text-xs text-neutral-700 leading-relaxed whitespace-pre-line">
              {campaign.instructions}
            </div>
          </div>

          {/* Niches and Target countries */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#F6F6F8]">
            <div>
              <div className="text-xs font-semibold text-[#222126] mb-1.5">Niches ciblées</div>
              <div className="flex flex-wrap gap-1">
                {campaign.target_niches.map((n) => (
                  <span
                    key={n}
                    className="px-2 py-0.5 rounded-md bg-[#F6F6F8] text-[11px] text-neutral-700"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-[#222126] mb-1.5">Pays ciblés</div>
              <div className="flex flex-wrap gap-1">
                {campaign.target_countries.map((c) => (
                  <span
                    key={c}
                    className="px-2 py-0.5 rounded-md bg-[#F6F6F8] text-[11px] text-neutral-700"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* APPLICATION SECTION */}
      <div className="bg-white rounded-3xl border border-[#E5E5EB] p-6 sm:p-8 shadow-xs">
        <h2 className="text-lg font-bold text-[#222126] mb-2">Postuler à cette campagne</h2>

        {existingApp ? (
          <div className="p-5 rounded-2xl bg-[#F1EEFD]/40 border border-[#7257E8]/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7257E8]" />
                <span className="font-semibold text-xs text-[#222126]">
                  Vous avez déjà postulé à cette campagne
                </span>
              </div>
              <StatusBadge status={existingApp.status} type="application" />
            </div>

            <p className="text-xs text-[#6E6D7A] leading-relaxed">
              Votre pitch : &quot;{existingApp.pitch}&quot;
            </p>

            {existingApp.status === 'accepted' && (
              <div className="pt-3 border-t border-[#7257E8]/10 space-y-2">
                <div className="text-xs font-semibold text-[#222126]">
                  Votre lien de tracking unique :
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={trackingUrl}
                    className="flex-1 py-1.5 px-3 text-xs rounded-lg border border-[#E5E5EB] bg-white text-neutral-800 font-mono"
                  />
                  <button
                    onClick={copyTracking}
                    className="px-3 py-1.5 rounded-lg bg-[#7257E8] text-white text-xs font-medium flex items-center gap-1.5 hover:bg-[#5e42db] transition-colors"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedLink ? 'Copié' : 'Copier'}
                  </button>
                </div>
                <p className="text-[11px] text-[#6E6D7A]">
                  Insérez impérativement ce lien dans la description ou bio de votre vidéo. Chaque
                  visite est enregistrée côté serveur pour auditer votre impact.
                </p>

                <div className="pt-2">
                  <Link
                    href="/dashboard/createur"
                    className="inline-flex items-center gap-1.5 text-xs text-[#7257E8] font-semibold hover:underline"
                  >
                    Aller dans l’espace créateur pour soumettre la publication →
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleApply} className="space-y-4">
            {feedback && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  feedback.success
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {feedback.success ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span>{feedback.message}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#222126] mb-1">
                Votre pitch & angle de création <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={4}
                required
                placeholder="Expliquez en 3-4 phrases comment vous comptez présenter le produit à votre audience..."
                value={pitch}
                onChange={(e) => setPitch(e.target.value)}
                className="w-full p-3 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7257E8] bg-white text-neutral-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#222126] mb-1">
                  Rémunération souhaitée (€) (Optionnel)
                </label>
                <input
                  type="number"
                  placeholder={`Par défaut : ${campaign.cpm_rate || campaign.fixed_amount} €`}
                  value={requestedRate}
                  onChange={(e) =>
                    setRequestedRate(e.target.value === '' ? '' : Number(e.target.value))
                  }
                  className="w-full p-2.5 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7257E8] bg-white text-neutral-800"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#7257E8] hover:bg-[#5e42db] text-white font-medium text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isSubmitting ? 'Envoi...' : 'Envoyer ma candidature'}
                </button>
              </div>
            </div>

            <p className="text-[11px] text-[#8E8D9A]">
              En postulant, vous vous engagez à respecter le brief et à fournir un lien public ainsi
              que vos statistiques de vues certifiées après publication.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
