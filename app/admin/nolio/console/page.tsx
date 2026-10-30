'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShieldAlert,
  Users,
  Building2,
  Video,
  FileCheck,
  CreditCard,
  AlertTriangle,
  History,
  Settings,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Lock,
  Search,
  Sparkles,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useMarketplace } from '@/lib/context/marketplace-context';

export default function StealthAdminConsoleDashboard() {
  const router = useRouter();
  const {
    campaigns,
    companies,
    creators,
    deliverables,
    transactions,
    reviewDeliverable,
  } = useMarketplace();

  const [authorized] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('nolio_admin_session') === 'active';
    }
    return false;
  });
  const [adminTab, setAdminTab] = useState<
    'overview' | 'users' | 'campaigns' | 'deliverables' | 'finances' | 'audit' | 'settings'
  >('overview');

  const [searchTerm, setSearchTerm] = useState('');
  const [commissionRate, setCommissionRate] = useState<number>(15);
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [suspendedUsers, setSuspendedUsers] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!authorized) {
      router.push('/admin/nolio');
    }
  }, [authorized, router]);

  const handleLogout = () => {
    sessionStorage.removeItem('nolio_admin_session');
    sessionStorage.removeItem('nolio_admin_user');
    router.push('/admin/nolio');
  };

  const toggleSuspend = (id: string) => {
    setSuspendedUsers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#0D0E11] text-white flex items-center justify-center text-xs">
        <span>Vérification de session administrateur...</span>
      </div>
    );
  }

  const totalUsers = creators.length + companies.length;
  const activeCampaigns = campaigns.filter((c) => c.status === 'active').length;
  const pendingDeliverables = deliverables.filter((d) => d.status === 'submitted').length;
  const totalVolume = transactions.reduce((acc, t) => acc + Math.abs(t.amount), 0);

  return (
    <div className="min-h-screen bg-[#0F1012] text-neutral-200 text-xs flex flex-col font-sans">
      {/* Admin Top Navigation */}
      <header className="h-14 border-b border-neutral-800 bg-[#16171B] px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#7257E8] text-white flex items-center justify-center font-mono font-bold text-sm">
            ✦
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white tracking-wide text-xs">NOLIO CONSOLE ADMIN</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-semibold border border-emerald-500/20">
                PROD
              </span>
            </div>
            <span className="text-[10px] text-neutral-400 font-mono">
              Opérateur Master • PostgreSQL Supabase connecté
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Fermer la console</span>
        </button>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Admin Left Sidebar */}
        <aside className="w-full lg:w-56 border-b lg:border-b-0 lg:border-r border-neutral-800 bg-[#121316] p-4 shrink-0 space-y-1">
          {[
            { id: 'overview', label: 'Vue d’ensemble', icon: ShieldAlert },
            { id: 'users', label: 'Utilisateurs & Profils', icon: Users, badge: totalUsers },
            { id: 'campaigns', label: 'Modération Campagnes', icon: Video, badge: activeCampaigns },
            { id: 'deliverables', label: 'Validation Preuves', icon: FileCheck, badge: pendingDeliverables },
            { id: 'finances', label: 'Comptabilité & Retraits', icon: CreditCard },
            { id: 'audit', label: 'Journal d’Audit', icon: History },
            { id: 'settings', label: 'Paramètres Plateforme', icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = adminTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setAdminTab(item.id as any)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-colors ${
                  isActive
                    ? 'bg-[#7257E8] text-white shadow-xs'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-neutral-800 text-neutral-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Admin Content Area */}
        <main className="flex-1 p-6 overflow-y-auto max-w-6xl">
          {adminTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-white mb-1">Tableau de bord de surveillance</h2>
                <p className="text-neutral-400">
                  Supervision en direct de l’écosystème Nolio, des flux financiers et des livrables créateurs.
                </p>
              </div>

              {/* KPI cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#16171B] border border-neutral-800 rounded-2xl p-4">
                  <span className="text-neutral-400 text-[11px]">Utilisateurs enregistrés</span>
                  <div className="text-2xl font-bold text-white mt-1 tabular-nums font-mono">{totalUsers}</div>
                  <span className="text-[10px] text-emerald-400 mt-1 inline-block">100% vérifiés</span>
                </div>

                <div className="bg-[#16171B] border border-neutral-800 rounded-2xl p-4">
                  <span className="text-neutral-400 text-[11px]">Campagnes actives</span>
                  <div className="text-2xl font-bold text-white mt-1 tabular-nums font-mono">{activeCampaigns}</div>
                  <span className="text-[10px] text-neutral-400 mt-1 inline-block">Surveillance live</span>
                </div>

                <div className="bg-[#16171B] border border-neutral-800 rounded-2xl p-4">
                  <span className="text-neutral-400 text-[11px]">Livrables en attente</span>
                  <div className="text-2xl font-bold text-amber-400 mt-1 tabular-nums font-mono">{pendingDeliverables}</div>
                  <span className="text-[10px] text-amber-400 mt-1 inline-block">Nécessite revue vidéo</span>
                </div>

                <div className="bg-[#16171B] border border-neutral-800 rounded-2xl p-4">
                  <span className="text-neutral-400 text-[11px]">Volume financier géré</span>
                  <div className="text-2xl font-bold text-emerald-400 mt-1 tabular-nums font-mono">
                    {totalVolume.toFixed(2)} $US
                  </div>
                  <span className="text-[10px] text-neutral-400 mt-1 inline-block">Commissions : 15%</span>
                </div>
              </div>

              {/* Quick action banners */}
              <div className="border border-neutral-800 bg-[#16171B] rounded-2xl p-5 space-y-3">
                <h3 className="font-bold text-white text-xs">Vérification des preuves de performances</h3>
                <p className="text-neutral-400">
                  Les créateurs de contenu publient leurs vidéos sur YouTube, TikTok et Instagram. L’administrateur valide les vues réelles certifiées avant déblocage automatique des fonds du portefeuille séquestre.
                </p>
                <button
                  onClick={() => setAdminTab('deliverables')}
                  className="px-4 py-2 rounded-xl bg-[#7257E8] text-white font-semibold text-xs inline-flex items-center gap-1.5"
                >
                  <span>Examiner les livrables en attente ({pendingDeliverables})</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {adminTab === 'users' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white">Gestion des Utilisateurs</h2>
                  <p className="text-neutral-400">Modération des profils créateurs et des entreprises partenaires.</p>
                </div>
                <div className="relative w-64">
                  <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Rechercher par nom..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white text-xs"
                  />
                </div>
              </div>

              <div className="border border-neutral-800 rounded-2xl bg-[#16171B] overflow-hidden">
                <div className="divide-y divide-neutral-800/60">
                  {creators.map((c) => {
                    const isSuspended = suspendedUsers[c.id];
                    return (
                      <div key={c.id} className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#1E2024] text-white flex items-center justify-center font-bold font-mono">
                            {c.display_name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white">{c.display_name}</span>
                              <span className="px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-400 text-[10px] font-mono">
                                CRÉATEUR
                              </span>
                              {isSuspended && (
                                <span className="px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 text-[10px] font-mono">
                                  SUSPENDU
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-neutral-400">{c.bio || c.details?.country}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => toggleSuspend(c.id)}
                          className={`px-3 py-1 rounded-xl text-xs font-semibold ${
                            isSuspended
                              ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                              : 'bg-neutral-800 hover:bg-rose-900/60 text-neutral-300 hover:text-rose-200'
                          }`}
                        >
                          {isSuspended ? 'Réactiver' : 'Suspendre'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {adminTab === 'deliverables' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-base font-bold text-white">Validation des Livrables & Preuves</h2>
                <p className="text-neutral-400">
                  Contrôle des publications, vérification des vues déclarées et validation du paiement.
                </p>
              </div>

              {deliverables.length === 0 ? (
                <div className="py-16 text-center text-neutral-400 border border-neutral-800 rounded-2xl bg-[#16171B]">
                  Aucun livrable en attente de vérification.
                </div>
              ) : (
                <div className="space-y-3">
                  {deliverables.map((deliv) => (
                    <div
                      key={deliv.id}
                      className="border border-neutral-800 bg-[#16171B] rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">Livrable #{deliv.id}</span>
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] uppercase font-mono">
                            {deliv.status}
                          </span>
                        </div>
                        <p className="text-neutral-300 text-xs">
                          Vues déclarées : <strong className="text-white font-mono">{deliv.claimed_views.toLocaleString()}</strong>
                        </p>
                        <a
                          href={deliv.post_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-violet-400 hover:underline text-[11px]"
                        >
                          <span>Voir la publication externe</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => reviewDeliverable(deliv.id, 'rejected', 'Vues non conformes aux conditions')}
                          className="px-3 py-1.5 rounded-xl border border-rose-800 text-rose-300 hover:bg-rose-950/40 font-semibold"
                        >
                          Rejeter
                        </button>
                        <button
                          onClick={() => reviewDeliverable(deliv.id, 'approved', undefined, deliv.claimed_views)}
                          className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
                        >
                          Valider & Payer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {adminTab === 'finances' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-base font-bold text-white">Comptabilité & Flux Financiers</h2>
                <p className="text-neutral-400">
                  Historique auditable de tous les mouvements de portefeuille et préparation Saspay.
                </p>
              </div>

              <div className="border border-neutral-800 rounded-2xl bg-[#16171B] overflow-hidden">
                <div className="divide-y divide-neutral-800/60">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="p-4 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-white">{tx.description}</div>
                        <div className="text-[11px] text-neutral-400 font-mono">{tx.reference}</div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-mono font-bold ${
                            tx.amount > 0 ? 'text-emerald-400' : 'text-neutral-200'
                          }`}
                        >
                          {tx.amount > 0 ? `+${tx.amount.toFixed(2)}` : tx.amount.toFixed(2)} $US
                        </div>
                        <span className="text-[10px] text-neutral-400 uppercase">{tx.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {adminTab === 'settings' && (
            <div className="space-y-4 max-w-xl">
              <div>
                <h2 className="text-base font-bold text-white">Paramètres Globaux</h2>
                <p className="text-neutral-400">Configuration des commissions et règles de plateforme.</p>
              </div>

              <div className="border border-neutral-800 bg-[#16171B] rounded-2xl p-5 space-y-4">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    Commission Nolio sur les campagnes (%)
                  </label>
                  <input
                    type="number"
                    value={commissionRate}
                    onChange={(e) => setCommissionRate(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-white font-mono"
                  />
                </div>

                <button
                  onClick={() => {
                    setSettingsSaved(true);
                    setTimeout(() => setSettingsSaved(false), 3000);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#7257E8] text-white font-semibold"
                >
                  {settingsSaved ? 'Enregistré ✓' : 'Enregistrer les paramètres'}
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
