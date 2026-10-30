'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useMarketplace } from '@/lib/context/marketplace-context';
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Mail,
  Send,
  Video,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';

export default function CreatorDetailPage() {
  const params = useParams();
  const creatorId = params.id as string;
  const { creators, campaigns } = useMarketplace();
  const [invitedCampaign, setInvitedCampaign] = useState('');
  const [inviteSuccess, setInviteSuccess] = useState(false);

  const creator = creators.find((c) => c.id === creatorId);

  if (!creator) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-[#222126] mb-2">Créateur introuvable</h2>
        <Link
          href="/createurs"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#7257E8] text-white text-xs font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Retour à l’annuaire
        </Link>
      </div>
    );
  }

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (invitedCampaign) {
      setInviteSuccess(true);
      setTimeout(() => setInviteSuccess(false), 4000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
      <Link
        href="/createurs"
        className="inline-flex items-center gap-1.5 text-xs text-[#6E6D7A] hover:text-[#222126] transition-colors mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Retour à l’annuaire
      </Link>

      <div className="bg-white rounded-3xl border border-[#E5E5EB] p-6 sm:p-8 mb-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#F6F6F8]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-neutral-100 relative border-2 border-[#7257E8]/20 shrink-0">
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
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-bold text-[#222126]">
                  {creator.display_name}
                </h1>
                <CheckCircle2 className="w-4 h-4 text-[#7257E8]" />
              </div>
              <div className="text-xs text-[#6E6D7A] flex items-center gap-2">
                <span>{creator.details?.country}</span>
                <span>·</span>
                <span>{creator.details?.languages.join(', ')}</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#F6F6F8] text-center sm:text-right">
            <div className="text-[10px] text-[#8E8D9A] uppercase tracking-wider font-semibold">
              Audience Certifiée
            </div>
            <div className="text-lg font-bold text-[#222126] tabular-nums">
              {creator.details?.total_followers?.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="py-6 border-b border-[#F6F6F8]">
          <h3 className="text-xs font-semibold text-[#8E8D9A] uppercase tracking-wider mb-2">
            Biographie & Spécialités
          </h3>
          <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed">
            {creator.details?.bio}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {creator.details?.niches.map((n) => (
              <span
                key={n}
                className="px-2.5 py-1 rounded-lg bg-[#F1EEFD] text-xs font-medium text-[#7257E8]"
              >
                {n}
              </span>
            ))}
          </div>
        </div>

        {/* Social Accounts */}
        <div className="py-6 border-b border-[#F6F6F8]">
          <h3 className="text-xs font-semibold text-[#8E8D9A] uppercase tracking-wider mb-3">
            Comptes Réseaux Sociaux & Statistiques
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {creator.socials?.map((soc) => (
              <div
                key={soc.id}
                className="p-3.5 rounded-xl border border-[#E5E5EB] flex items-center justify-between bg-white hover:border-[#7257E8]/40 transition-colors"
              >
                <div>
                  <div className="font-semibold text-xs text-[#222126] capitalize">
                    {soc.platform}
                  </div>
                  <div className="text-[11px] text-[#6E6D7A]">{soc.handle}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-[#222126] tabular-nums">
                    {soc.followers_count.toLocaleString()} abonnés
                  </div>
                  <a
                    href={soc.channel_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-[#7257E8] hover:underline flex items-center justify-end gap-1 font-medium mt-0.5"
                  >
                    Voir profil <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Invite to campaign */}
        <div className="pt-6">
          <h3 className="text-sm font-bold text-[#222126] mb-2">
            Inviter ce créateur sur une de vos campagnes
          </h3>
          <p className="text-xs text-[#6E6D7A] mb-4">
            Proposez directement un brief personnalisé pour accélérer votre engagement.
          </p>

          {inviteSuccess ? (
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              Invitation envoyée avec succès à {creator.display_name} !
            </div>
          ) : (
            <form onSubmit={handleInvite} className="flex flex-col sm:flex-row gap-3">
              <select
                value={invitedCampaign}
                onChange={(e) => setInvitedCampaign(e.target.value)}
                required
                className="flex-1 py-2 px-3 text-xs rounded-xl border border-neutral-200 bg-white text-neutral-800 focus:outline-none focus:border-[#7257E8]"
              >
                <option value="">Sélectionnez une de vos campagnes...</option>
                {campaigns.map((camp) => (
                  <option key={camp.id} value={camp.id}>
                    {camp.title} ({camp.payout_model.toUpperCase()})
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="py-2 px-4 rounded-xl bg-[#7257E8] hover:bg-[#5e42db] text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                Envoyer l’invitation
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
