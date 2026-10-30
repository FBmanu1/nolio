'use client';

import React, { useState } from 'react';
import { useMarketplace } from '@/lib/context/marketplace-context';
import { useAuth } from '@/lib/context/auth-context';
import {
  X,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Image as ImageIcon,
  DollarSign,
  AlertCircle,
  UploadCloud,
  Check,
  Video,
} from 'lucide-react';
import Image from 'next/image';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateModal({ isOpen, onClose }: CreateModalProps) {
  const { createCampaign, wallets, products } = useMarketplace();
  const { user, accountType } = useAuth();

  // Wizard Step (1, 2, 3, 4)
  const [step, setStep] = useState(1);

  // Form states
  const [title, setTitle] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(products[0]?.id || 'prod-1');
  const [brief, setBrief] = useState('');
  const [rules, setRules] = useState(
    'Format vertical (TikTok / Shorts), montrer le produit en action dans les 3 premières secondes, inclure le lien en bio.'
  );

  // Up to 4 showcase images
  const sampleImages = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&auto=format&fit=crop&q=80',
  ];
  const [selectedImages, setSelectedImages] = useState<string[]>([sampleImages[0]]);

  // Target profiles & platforms
  const [platforms, setPlatforms] = useState<('tiktok' | 'youtube' | 'instagram' | 'twitter_x')[]>([
    'tiktok',
    'youtube',
  ]);
  const [niches, setNiches] = useState<string[]>(['Tech & Dev', 'SaaS', 'Productivité']);
  const [minFollowers, setMinFollowers] = useState(1500);

  // Budget
  const [budget, setBudget] = useState(600);
  const [cpmRate, setCpmRate] = useState(15);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const currentWallet = wallets[user?.id || 'd65af2ef-8e61-462a-82de-8f029b3e2ee1'] || {
    balance_available: 2450.0,
  };

  const toggleImage = (url: string) => {
    if (selectedImages.includes(url)) {
      if (selectedImages.length === 1) return; // Keep at least 1
      setSelectedImages(selectedImages.filter((img) => img !== url));
    } else {
      if (selectedImages.length >= 4) return; // Max 4 images
      setSelectedImages([...selectedImages, url]);
    }
  };

  const togglePlatform = (p: 'tiktok' | 'youtube' | 'instagram' | 'twitter_x') => {
    if (platforms.includes(p)) {
      if (platforms.length === 1) return;
      setPlatforms(platforms.filter((item) => item !== p));
    } else {
      setPlatforms([...platforms, p]);
    }
  };

  const handleNext = () => {
    setErrorMsg('');
    if (step === 1) {
      if (!title.trim()) {
        setErrorMsg('Veuillez entrer un titre pour la campagne.');
        return;
      }
    }
    if (step === 2) {
      if (!brief.trim()) {
        setErrorMsg('Veuillez renseigner le brief et la description.');
        return;
      }
    }
    if (step === 3) {
      if (platforms.length === 0) {
        setErrorMsg('Sélectionnez au moins un réseau social ciblé.');
        return;
      }
    }
    setStep(step + 1);
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (budget <= 0) {
      setErrorMsg('Veuillez allouer un budget supérieur à 0.');
      return;
    }

    createCampaign({
      product_id: selectedProduct,
      company_id: 'comp-1',
      title: title,
      description: brief.slice(0, 160),
      brief: brief,
      instructions: rules,
      deliverable_format: 'Vidéo verticale (TikTok, Shorts ou Reels 30-60s)',
      platforms: platforms,
      target_countries: ['France', 'Belgique', 'Suisse'],
      target_languages: ['Français'],
      target_niches: niches,
      min_followers: minFollowers,
      payout_model: 'cpm',
      budget_total: budget,
      max_paid_views: Math.round((budget / cpmRate) * 1000),
      cpm_rate: cpmRate,
      fixed_amount: 0,
      status: 'active',
      desired_creators_count: 5,
      start_date: new Date().toISOString().split('T')[0],
      end_date: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setStep(1);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl text-xs max-h-[92vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-full text-[#8E9099] hover:text-[#111215] hover:bg-[#F5F5F7]"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Wizard Header */}
        <div className="pb-4 border-b border-[#EAEAEF] mb-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#7257E8]" />
            <h3 className="font-bold text-sm sm:text-base text-[#111215]">
              {accountType === 'advertiser' ? 'Lancer une nouvelle Campagne' : 'Publier une Création'}
            </h3>
          </div>
          <p className="text-[11px] text-[#71737D]">
            Assistant étape par étape pour configurer vos règles et vos médias
          </p>

          {/* Stepper Dots */}
          <div className="flex items-center gap-2 mt-3">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full flex-1 transition-all ${
                  s === step
                    ? 'bg-[#7257E8]'
                    : s < step
                    ? 'bg-[#1E2024]'
                    : 'bg-[#EAEAEF]'
                }`}
              />
            ))}
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 mb-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {isSuccess ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-base text-[#111215]">Campagne publiée avec succès !</h4>
            <p className="text-xs text-[#71737D]">
              Elle est désormais active et visible par les créateurs sur la marketplace.
            </p>
          </div>
        ) : (
          <div>
            {/* STEP 1: Titre & Produit */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="font-bold text-xs uppercase text-[#8E9099] tracking-wider">
                  Étape 1 sur 4 : Titre & Produit
                </div>

                <div>
                  <label className="block font-semibold text-[#111215] mb-1">
                    Titre de la campagne
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex. Promotion vidéo Acme SaaS Launch"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#EAEAEF] text-xs focus:outline-none focus:border-[#7257E8]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#111215] mb-1">
                    Produit ou Logiciel à promouvoir
                  </label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#EAEAEF] bg-white text-xs focus:outline-none focus:border-[#7257E8]"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — {p.category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* STEP 2: Jusqu'à 4 images & Brief / Description */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="font-bold text-xs uppercase text-[#8E9099] tracking-wider">
                  Étape 2 sur 4 : Médias (max 4 images) & Brief
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-semibold text-[#111215]">
                      Images de présentation ({selectedImages.length}/4)
                    </label>
                    <span className="text-[10px] text-[#8E9099]">Cliquez pour sélectionner</span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {sampleImages.map((imgUrl, idx) => {
                      const isSelected = selectedImages.includes(imgUrl);
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleImage(imgUrl)}
                          className={`relative h-20 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                            isSelected ? 'border-[#7257E8] ring-2 ring-purple-100' : 'border-transparent opacity-60'
                          }`}
                        >
                          <Image
                            src={imgUrl}
                            alt={`Preview ${idx}`}
                            fill
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />
                          {isSelected && (
                            <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#7257E8] text-white flex items-center justify-center">
                              <Check className="w-2.5 h-2.5" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#111215] mb-1">
                    Brief détaillé pour les créateurs
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Expliquez ce que le créateur doit montrer dans sa vidéo, la valeur clé du SaaS, et l'accroche recommandée..."
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#EAEAEF] text-xs focus:outline-none focus:border-[#7257E8]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#111215] mb-1">
                    Règles obligatoires
                  </label>
                  <input
                    type="text"
                    value={rules}
                    onChange={(e) => setRules(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#EAEAEF] text-xs focus:outline-none focus:border-[#7257E8]"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: Réseaux ciblés & Profils recherchés */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="font-bold text-xs uppercase text-[#8E9099] tracking-wider">
                  Étape 3 sur 4 : Profils recherchés & Réseaux
                </div>

                <div>
                  <label className="block font-semibold text-[#111215] mb-2">
                    Réseaux sociaux acceptés
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['tiktok', 'youtube', 'instagram', 'twitter_x'] as const).map((plat) => {
                      const isChecked = platforms.includes(plat);
                      const labels: Record<string, string> = {
                        tiktok: 'TikTok (Vidéos courtes)',
                        youtube: 'YouTube (Shorts & Vidéos)',
                        instagram: 'Instagram (Reels)',
                        twitter_x: 'X (Démos & Posts)',
                      };
                      return (
                        <button
                          key={plat}
                          type="button"
                          onClick={() => togglePlatform(plat)}
                          className={`p-2.5 rounded-xl border text-left font-medium flex items-center justify-between transition-all ${
                            isChecked
                              ? 'border-[#7257E8] bg-[#F4F1FE] text-[#7257E8]'
                              : 'border-[#EAEAEF] text-[#65676E]'
                          }`}
                        >
                          <span>{labels[plat]}</span>
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#111215] mb-1">
                    Audience minimum du créateur
                  </label>
                  <input
                    type="number"
                    min={500}
                    step={500}
                    value={minFollowers}
                    onChange={(e) => setMinFollowers(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-[#EAEAEF] text-xs"
                  />
                </div>
              </div>
            )}

            {/* STEP 4: Budget & Rémunération connectée au Wallet */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="font-bold text-xs uppercase text-[#8E9099] tracking-wider">
                  Étape 4 sur 4 : Budget & Solde Portefeuille
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F6F6F8] border border-[#EAEAEF] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#8E9099] uppercase font-bold block">
                      Solde portefeuille disponible
                    </span>
                    <span className="text-base font-black text-[#111215] tabular-nums font-mono">
                      ${currentWallet.balance_available.toFixed(2)}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full font-bold">
                    Solde vérifié Supabase
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#111215] mb-1">
                      Budget total alloué ($)
                    </label>
                    <input
                      type="number"
                      min={50}
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-[#EAEAEF] text-xs font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#111215] mb-1">
                      Tarif CPM ($ / 1k vues)
                    </label>
                    <input
                      type="number"
                      min={5}
                      value={cpmRate}
                      onChange={(e) => setCpmRate(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-[#EAEAEF] text-xs font-mono font-bold"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#F8F7FF] border border-[#E9E4FC] text-[11px] text-[#52545D]">
                  Estimation de vues rémunérées :{' '}
                  <strong className="text-[#111215]">
                    {Math.round((budget / cpmRate) * 1000).toLocaleString()} vues vérifiées
                  </strong>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#EAEAEF] mt-5 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-3.5 py-2 rounded-full border border-[#EAEAEF] text-[#65676E] font-medium flex items-center gap-1.5 hover:bg-[#F5F5F7]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Retour</span>
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2 rounded-full bg-[#1E2024] hover:bg-[#111215] text-white font-bold flex items-center gap-1.5 transition-colors"
                >
                  <span>Continuer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinish}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#7257E8] to-[#5E42DB] hover:brightness-110 text-white font-bold shadow-md shadow-purple-500/20 transition-all flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirmer & Publier</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
