'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Campaign,
  Product,
  Company,
  CampaignApplication,
  CampaignDeliverable,
  Profile,
  CreatorDetails,
  CreatorSocialAccount,
  Wallet,
  Transaction,
  NotificationItem,
} from '@/lib/supabase/types';
import {
  INITIAL_CAMPAIGNS,
  INITIAL_PRODUCTS,
  INITIAL_COMPANIES,
  INITIAL_CREATOR_PROFILES,
  INITIAL_APPLICATIONS,
  INITIAL_DELIVERABLES,
  INITIAL_WALLETS,
  INITIAL_TRANSACTIONS,
  INITIAL_NOTIFICATIONS,
} from '@/lib/store/marketplace-store';
import { useAuth } from './auth-context';

interface MarketplaceContextType {
  campaigns: Campaign[];
  products: Product[];
  companies: Company[];
  creators: (Profile & { details: CreatorDetails; socials: CreatorSocialAccount[] })[];
  applications: CampaignApplication[];
  deliverables: CampaignDeliverable[];
  wallets: Record<string, Wallet>;
  transactions: Transaction[];
  notifications: NotificationItem[];
  // Actions
  createProduct: (data: Omit<Product, 'id' | 'created_at'>) => Product;
  createCampaign: (data: Omit<Campaign, 'id' | 'created_at' | 'engaged_creators_count' | 'budget_remaining'>) => Campaign;
  updateCampaignStatus: (campaignId: string, status: Campaign['status']) => void;
  applyToCampaign: (campaignId: string, pitch: string, requestedRate?: number) => { success: boolean; message?: string };
  updateApplicationStatus: (applicationId: string, status: 'accepted' | 'rejected') => void;
  submitDeliverable: (
    applicationId: string,
    postUrl: string,
    platform: CampaignDeliverable['platform'],
    claimedViews: number,
    proofUrl?: string
  ) => { success: boolean; message?: string };
  reviewDeliverable: (
    deliverableId: string,
    status: 'approved' | 'revision_requested' | 'rejected',
    revisionNotes?: string,
    verifiedViews?: number
  ) => void;
  requestPayout: (amount: number, method: string, details: string) => { success: boolean; message?: string };
  depositBudget: (amount: number) => { success: boolean; message?: string };
  markNotificationAsRead: (id: string) => void;
  activeNotificationsCount: number;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export function MarketplaceProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nolio_campaigns');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_CAMPAIGNS;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nolio_products');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_PRODUCTS;
  });

  const [companies] = useState<Company[]>(INITIAL_COMPANIES);
  const [creators] = useState(INITIAL_CREATOR_PROFILES);

  const [applications, setApplications] = useState<CampaignApplication[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nolio_applications');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_APPLICATIONS;
  });

  const [deliverables, setDeliverables] = useState<CampaignDeliverable[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nolio_deliverables');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_DELIVERABLES;
  });

  const [wallets, setWallets] = useState<Record<string, Wallet>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nolio_wallets');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_WALLETS;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const saveToStorage = (key: string, data: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      // ignore
    }
  };

  const createProduct = (data: Omit<Product, 'id' | 'created_at'>): Product => {
    const newProd: Product = {
      ...data,
      id: `prod-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    const updated = [newProd, ...products];
    setProducts(updated);
    saveToStorage('nolio_products', updated);
    return newProd;
  };

  const createCampaign = (
    data: Omit<Campaign, 'id' | 'created_at' | 'engaged_creators_count' | 'budget_remaining'>
  ): Campaign => {
    const matchedProduct = products.find((p) => p.id === data.product_id) || products[0];
    const matchedCompany = companies.find((c) => c.id === data.company_id) || companies[0];

    const newCamp: Campaign = {
      ...data,
      id: `camp-${Date.now()}`,
      budget_remaining: data.budget_total,
      engaged_creators_count: 0,
      created_at: new Date().toISOString(),
      product: matchedProduct,
      company: matchedCompany,
    };

    const updated = [newCamp, ...campaigns];
    setCampaigns(updated);
    saveToStorage('nolio_campaigns', updated);

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      user_id: user?.id || 'admin',
      title: 'Nouvelle campagne publiée',
      message: `Votre campagne "${newCamp.title}" est maintenant active sur la marketplace.`,
      is_read: false,
      created_at: new Date().toISOString(),
      type: 'system',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return newCamp;
  };

  const updateCampaignStatus = (campaignId: string, status: Campaign['status']) => {
    const updated = campaigns.map((c) => (c.id === campaignId ? { ...c, status } : c));
    setCampaigns(updated);
    saveToStorage('nolio_campaigns', updated);
  };

  const applyToCampaign = (
    campaignId: string,
    pitch: string,
    requestedRate?: number
  ): { success: boolean; message?: string } => {
    if (!user) return { success: false, message: 'Veuillez vous connecter pour postuler.' };

    const existing = applications.find(
      (a) => a.campaign_id === campaignId && a.creator_id === user.id
    );
    if (existing) {
      return { success: false, message: 'Vous avez déjà postulé à cette campagne.' };
    }

    const campaign = campaigns.find((c) => c.id === campaignId);
    if (!campaign) return { success: false, message: 'Campagne introuvable.' };

    const newApp: CampaignApplication = {
      id: `app-${Date.now()}`,
      campaign_id: campaignId,
      creator_id: user.id,
      pitch,
      requested_rate: requestedRate || campaign.cpm_rate || campaign.fixed_amount,
      status: 'pending',
      tracking_code: `nl_${campaign.title.slice(0, 3).toLowerCase()}_${user.display_name.slice(0, 3).toLowerCase()}_${Math.floor(10 + Math.random() * 89)}`,
      created_at: new Date().toISOString(),
      campaign,
      creator: {
        ...user,
        details: {
          id: user.id,
          bio: 'Créateur actif sur Nolio',
          country: 'France',
          languages: ['Français'],
          niches: ['Tech & Dev'],
          portfolio_urls: [],
          verified_status: true,
          total_followers: 12500,
        },
        socials: [
          {
            id: `soc-${Date.now()}`,
            creator_id: user.id,
            platform: 'youtube',
            handle: `@${user.display_name.toLowerCase().replace(/\s+/g, '')}`,
            followers_count: 12500,
            channel_url: 'https://youtube.com',
            is_verified: true,
          },
        ],
      },
    };

    const updated = [newApp, ...applications];
    setApplications(updated);
    saveToStorage('nolio_applications', updated);

    // Notify advertiser
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      user_id: campaign.company?.owner_id || 'advertiser',
      title: 'Nouvelle candidature',
      message: `${user.display_name} a soumis sa candidature pour "${campaign.title}".`,
      is_read: false,
      created_at: new Date().toISOString(),
      type: 'application',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return { success: true, message: 'Candidature transmise avec succès à l’annonceur !' };
  };

  const updateApplicationStatus = (applicationId: string, status: 'accepted' | 'rejected') => {
    const updated = applications.map((a) => {
      if (a.id === applicationId) {
        return { ...a, status };
      }
      return a;
    });
    setApplications(updated);
    saveToStorage('nolio_applications', updated);

    const app = applications.find((a) => a.id === applicationId);
    if (app && status === 'accepted') {
      // Increase campaign engaged count
      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === app.campaign_id ? { ...c, engaged_creators_count: c.engaged_creators_count + 1 } : c
        )
      );

      // Notify creator
      const notif: NotificationItem = {
        id: `notif-${Date.now()}`,
        user_id: app.creator_id,
        title: 'Candidature Acceptée !',
        message: `Félicitations ! Votre candidature pour "${app.campaign?.title}" a été validée. Accédez au brief pour commencer.`,
        is_read: false,
        created_at: new Date().toISOString(),
        type: 'application',
      };
      setNotifications((prev) => [notif, ...prev]);
    }
  };

  const submitDeliverable = (
    applicationId: string,
    postUrl: string,
    platform: CampaignDeliverable['platform'],
    claimedViews: number,
    proofUrl?: string
  ): { success: boolean; message?: string } => {
    if (!user) return { success: false, message: 'Session invalide.' };

    const app = applications.find((a) => a.id === applicationId);
    if (!app) return { success: false, message: 'Candidature introuvable.' };

    const campaign = campaigns.find((c) => c.id === app.campaign_id);
    if (!campaign) return { success: false, message: 'Campagne introuvable.' };

    // Calculate preliminary earnings
    let estEarnings = 0;
    if (campaign.payout_model === 'cpm') {
      estEarnings = (claimedViews / 1000) * campaign.cpm_rate;
    } else if (campaign.payout_model === 'fixed') {
      estEarnings = campaign.fixed_amount;
    } else {
      estEarnings = campaign.fixed_amount + (claimedViews / 1000) * campaign.cpm_rate;
    }

    const newDeliv: CampaignDeliverable = {
      id: `deliv-${Date.now()}`,
      application_id: applicationId,
      campaign_id: app.campaign_id,
      creator_id: user.id,
      post_url: postUrl,
      platform,
      proof_screenshot_url: proofUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80',
      claimed_views: claimedViews,
      verified_views: 0,
      unique_clicks: Math.floor(claimedViews * 0.02),
      calculated_earnings: Math.round(estEarnings * 100) / 100,
      status: 'submitted',
      submitted_at: new Date().toISOString(),
      campaign,
      creator: user,
    };

    const updated = [newDeliv, ...deliverables];
    setDeliverables(updated);
    saveToStorage('nolio_deliverables', updated);

    // Notify advertiser
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      user_id: campaign.company?.owner_id || 'advertiser',
      title: 'Nouveau livrable soumis',
      message: `${user.display_name} a soumis son lien de publication pour "${campaign.title}".`,
      is_read: false,
      created_at: new Date().toISOString(),
      type: 'deliverable',
    };
    setNotifications((prev) => [notif, ...prev]);

    return { success: true, message: 'Livrable et preuves soumis pour vérification !' };
  };

  const reviewDeliverable = (
    deliverableId: string,
    status: 'approved' | 'revision_requested' | 'rejected',
    revisionNotes?: string,
    verifiedViews?: number
  ) => {
    const target = deliverables.find((d) => d.id === deliverableId);
    if (!target) return;

    const campaign = campaigns.find((c) => c.id === target.campaign_id);
    const views = verifiedViews || target.claimed_views;

    let finalEarnings = target.calculated_earnings;
    if (campaign && status === 'approved') {
      if (campaign.payout_model === 'cpm') {
        finalEarnings = (views / 1000) * campaign.cpm_rate;
      } else if (campaign.payout_model === 'hybrid') {
        finalEarnings = campaign.fixed_amount + (views / 1000) * campaign.cpm_rate;
      }
      finalEarnings = Math.round(finalEarnings * 100) / 100;
    }

    const updated = deliverables.map((d) => {
      if (d.id === deliverableId) {
        return {
          ...d,
          status,
          revision_notes: revisionNotes,
          verified_views: status === 'approved' ? views : d.verified_views,
          calculated_earnings: finalEarnings,
          reviewed_at: new Date().toISOString(),
        };
      }
      return d;
    });

    setDeliverables(updated);
    saveToStorage('nolio_deliverables', updated);

    if (status === 'approved' && target) {
      // Credit creator wallet
      const creatorWallet = wallets[target.creator_id] || {
        id: `wal-${target.creator_id}`,
        user_id: target.creator_id,
        balance_available: 0,
        balance_pending: 0,
        currency: 'EUR',
      };

      const updatedWallets = {
        ...wallets,
        [target.creator_id]: {
          ...creatorWallet,
          balance_available: creatorWallet.balance_available + finalEarnings,
        },
      };
      setWallets(updatedWallets);
      saveToStorage('nolio_wallets', updatedWallets);

      // Create ledger transaction
      const newTx: Transaction = {
        id: `tx-${Date.now()}`,
        wallet_id: creatorWallet.id,
        user_id: target.creator_id,
        amount: finalEarnings,
        fee_amount: 0,
        type: 'earning',
        status: 'completed',
        reference: `PAY-LIVRABLE-${target.id.slice(-6)}`,
        description: `Règlement validé pour "${target.campaign?.title || 'Campagne'}" (${views.toLocaleString()} vues)`,
        created_at: new Date().toISOString(),
      };
      setTransactions((prev) => [newTx, ...prev]);

      // Deduct from campaign budget
      if (campaign) {
        setCampaigns((prev) =>
          prev.map((c) =>
            c.id === campaign.id
              ? { ...c, budget_remaining: Math.max(0, c.budget_remaining - finalEarnings) }
              : c
          )
        );
      }

      // Notify creator
      const notif: NotificationItem = {
        id: `notif-${Date.now()}`,
        user_id: target.creator_id,
        title: 'Livrable Approuvé & Gains crédités !',
        message: `Votre publication a été validée. ${finalEarnings.toFixed(2)} € ont été ajoutés à votre solde disponible.`,
        is_read: false,
        created_at: new Date().toISOString(),
        type: 'payment',
      };
      setNotifications((prev) => [notif, ...prev]);
    }
  };

  const requestPayout = (
    amount: number,
    method: string,
    details: string
  ): { success: boolean; message?: string } => {
    if (!user) return { success: false, message: 'Non authentifié.' };
    const userWallet = wallets[user.id];
    if (!userWallet || userWallet.balance_available < amount) {
      return { success: false, message: 'Solde disponible insuffisant pour ce montant.' };
    }

    // Deduct available, add to pending
    const updatedWallets = {
      ...wallets,
      [user.id]: {
        ...userWallet,
        balance_available: userWallet.balance_available - amount,
        balance_pending: userWallet.balance_pending + amount,
      },
    };
    setWallets(updatedWallets);
    saveToStorage('nolio_wallets', updatedWallets);

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      wallet_id: userWallet.id,
      user_id: user.id,
      amount: -amount,
      fee_amount: 0,
      type: 'payout',
      status: 'pending',
      reference: `RETRAIT-${Date.now().toString().slice(-6)}`,
      description: `Demande de virement (${method}: ${details})`,
      created_at: new Date().toISOString(),
    };
    setTransactions((prev) => [newTx, ...prev]);

    return {
      success: true,
      message: `Demande de virement de ${amount.toFixed(2)} € enregistrée. Traitement sous 24h à 48h.`,
    };
  };

  const depositBudget = (amount: number): { success: boolean; message?: string } => {
    if (!user) return { success: false, message: 'Non authentifié.' };
    const userWallet = wallets[user.id] || {
      id: `wal-${user.id}`,
      user_id: user.id,
      balance_available: 0,
      balance_pending: 0,
      currency: 'EUR',
    };

    const updatedWallets = {
      ...wallets,
      [user.id]: {
        ...userWallet,
        balance_available: userWallet.balance_available + amount,
      },
    };
    setWallets(updatedWallets);
    saveToStorage('nolio_wallets', updatedWallets);

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      wallet_id: userWallet.id,
      user_id: user.id,
      amount: amount,
      fee_amount: 0,
      type: 'deposit',
      status: 'completed',
      reference: `DEP-${Date.now().toString().slice(-6)}`,
      description: 'Dépôt de budget publicitaire par carte bancaire',
      created_at: new Date().toISOString(),
    };
    setTransactions((prev) => [newTx, ...prev]);

    return {
      success: true,
      message: `${amount.toFixed(2)} € crédités avec succès sur votre portefeuille annonceur.`,
    };
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
  };

  const activeNotificationsCount = notifications.filter(
    (n) => !n.is_read && (!user || n.user_id === user.id || n.user_id === 'admin')
  ).length;

  return (
    <MarketplaceContext.Provider
      value={{
        campaigns,
        products,
        companies,
        creators,
        applications,
        deliverables,
        wallets,
        transactions,
        notifications,
        createProduct,
        createCampaign,
        updateCampaignStatus,
        applyToCampaign,
        updateApplicationStatus,
        submitDeliverable,
        reviewDeliverable,
        requestPayout,
        depositBudget,
        markNotificationAsRead,
        activeNotificationsCount,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
}
