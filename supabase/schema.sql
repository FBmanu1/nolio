-- ==============================================================================
-- NOLIO PLATFORM — SCHÉMA POSTGRESQL & POLITIQUES RLS COMPLET
-- ==============================================================================

-- 1. Table profiles (DÉJÀ EXISTANTE DANS VOTRE PROJET SUPABASE — NE PAS RECRÉER)
-- Colonnes existantes confirmées : id (uuid, PK), display_name (text), avatar_path (text),
-- created_at (timestamptz), updated_at (timestamptz), account_type (text, default 'creator').

-- 2. Détails complémentaires des créateurs
CREATE TABLE IF NOT EXISTS public.creator_details (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  bio TEXT DEFAULT '',
  country TEXT DEFAULT 'France',
  languages TEXT[] DEFAULT ARRAY['Français'],
  niches TEXT[] DEFAULT ARRAY['SaaS & Tech', 'Intelligence Artificielle'],
  portfolio_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
  verified_status BOOLEAN DEFAULT FALSE,
  total_followers BIGINT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Comptes sociaux des créateurs
CREATE TABLE IF NOT EXISTS public.creator_social_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('youtube', 'tiktok', 'instagram', 'facebook', 'twitter_x')),
  handle TEXT NOT NULL,
  followers_count BIGINT DEFAULT 0,
  channel_url TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Entreprises (Annonceurs)
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT DEFAULT '',
  website TEXT DEFAULT '',
  description TEXT DEFAULT '',
  industry TEXT DEFAULT 'SaaS / B2B',
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Produits des entreprises
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  tagline TEXT DEFAULT '',
  description TEXT DEFAULT '',
  logo_url TEXT DEFAULT '',
  website_url TEXT NOT NULL,
  category TEXT DEFAULT 'Logiciel SaaS',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Campagnes de promotion
CREATE TABLE IF NOT EXISTS public.campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  brief TEXT NOT NULL,
  instructions TEXT NOT NULL,
  deliverable_format TEXT NOT NULL DEFAULT 'Vidéo courte 30-60s',
  platforms TEXT[] NOT NULL DEFAULT ARRAY['tiktok', 'youtube'],
  target_countries TEXT[] DEFAULT ARRAY['France', 'Belgique', 'Suisse'],
  target_languages TEXT[] DEFAULT ARRAY['Français'],
  target_niches TEXT[] DEFAULT ARRAY['Tech', 'SaaS'],
  min_followers INT DEFAULT 1000,
  payout_model TEXT NOT NULL CHECK (payout_model IN ('cpm', 'fixed', 'hybrid')),
  budget_total NUMERIC(12,2) NOT NULL DEFAULT 1000.00,
  budget_remaining NUMERIC(12,2) NOT NULL DEFAULT 1000.00,
  max_paid_views BIGINT DEFAULT 50000,
  cpm_rate NUMERIC(10,2) DEFAULT 15.00,
  fixed_amount NUMERIC(10,2) DEFAULT 250.00,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('draft', 'active', 'paused', 'completed')),
  desired_creators_count INT DEFAULT 5,
  engaged_creators_count INT DEFAULT 0,
  start_date DATE DEFAULT CURRENT_DATE,
  end_date DATE DEFAULT (CURRENT_DATE + INTERVAL '30 days'),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Candidatures aux campagnes
CREATE TABLE IF NOT EXISTS public.campaign_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  pitch TEXT NOT NULL,
  requested_rate NUMERIC(10,2),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'cancelled')),
  tracking_code TEXT UNIQUE DEFAULT encode(gen_random_bytes(6), 'hex'),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(campaign_id, creator_id)
);

-- 8. Livrables et preuves de publication
CREATE TABLE IF NOT EXISTS public.campaign_deliverables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES public.campaign_applications(id) ON DELETE CASCADE,
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  post_url TEXT NOT NULL,
  platform TEXT NOT NULL,
  proof_screenshot_url TEXT,
  claimed_views BIGINT DEFAULT 0,
  verified_views BIGINT DEFAULT 0,
  unique_clicks INT DEFAULT 0,
  calculated_earnings NUMERIC(10,2) DEFAULT 0.00,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'approved', 'revision_requested', 'rejected')),
  revision_notes TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ
);

-- 9. Liens et événements de tracking de clics
CREATE TABLE IF NOT EXISTS public.tracking_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  destination_url TEXT NOT NULL,
  total_clicks INT DEFAULT 0,
  unique_clicks INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.tracking_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  link_id UUID REFERENCES public.tracking_links(id) ON DELETE CASCADE,
  ip_hash TEXT NOT NULL,
  user_agent TEXT,
  referer TEXT,
  is_unique BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Table stricte administrateurs (Séparée de profiles et non modifiable par le client)
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'superadmin' CHECK (role IN ('superadmin', 'moderator')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Portefeuilles internes et transactions auditables
CREATE TABLE IF NOT EXISTS public.wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  balance_available NUMERIC(12,2) DEFAULT 0.00,
  balance_pending NUMERIC(12,2) DEFAULT 0.00,
  currency TEXT DEFAULT 'EUR'
);

CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id UUID NOT NULL REFERENCES public.wallets(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount NUMERIC(12,2) NOT NULL,
  fee_amount NUMERIC(12,2) DEFAULT 0.00,
  type TEXT NOT NULL CHECK (type IN ('deposit', 'earning', 'payout', 'commission_fee')),
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('completed', 'pending', 'failed')),
  reference TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.payout_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount NUMERIC(10,2) NOT NULL,
  currency TEXT DEFAULT 'EUR',
  payout_method TEXT NOT NULL,
  recipient_details TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'processing')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ
);

-- 12. Notifications
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  type TEXT DEFAULT 'system',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Audit logs
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  target_resource TEXT NOT NULL,
  details JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.creator_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creator_social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payout_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Lecture publique des profils, produits et campagnes actives
CREATE POLICY "Lecture publique des détails créateurs" ON public.creator_details FOR SELECT USING (true);
CREATE POLICY "Mise à jour de ses détails créateur" ON public.creator_details FOR ALL USING (auth.uid() = id);

CREATE POLICY "Lecture publique des réseaux créateurs" ON public.creator_social_accounts FOR SELECT USING (true);
CREATE POLICY "Gestion de ses comptes sociaux" ON public.creator_social_accounts FOR ALL USING (auth.uid() = creator_id);

CREATE POLICY "Lecture publique des entreprises" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Gestion de sa propre entreprise" ON public.companies FOR ALL USING (auth.uid() = owner_id);

CREATE POLICY "Lecture publique des produits" ON public.products FOR SELECT USING (true);
CREATE POLICY "Gestion des produits par l'entreprise" ON public.products FOR ALL USING (
  EXISTS (SELECT 1 FROM public.companies WHERE id = products.company_id AND owner_id = auth.uid())
);

CREATE POLICY "Lecture des campagnes actives" ON public.campaigns FOR SELECT USING (status != 'draft' OR EXISTS (
  SELECT 1 FROM public.companies WHERE id = campaigns.company_id AND owner_id = auth.uid()
));
CREATE POLICY "Gestion des campagnes par l'annonceur" ON public.campaigns FOR ALL USING (
  EXISTS (SELECT 1 FROM public.companies WHERE id = campaigns.company_id AND owner_id = auth.uid())
);

-- Candidatures : Créateur voit les siennes, Annonceur voit celles de sa campagne
CREATE POLICY "Créateur gère ses candidatures" ON public.campaign_applications FOR ALL USING (auth.uid() = creator_id);
CREATE POLICY "Annonceur consulte et traite les candidatures" ON public.campaign_applications FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.campaigns c JOIN public.companies comp ON c.company_id = comp.id WHERE c.id = campaign_applications.campaign_id AND comp.owner_id = auth.uid())
);

-- Portefeuilles et transactions strictement personnels
CREATE POLICY "Accès à son propre portefeuille" ON public.wallets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Accès à ses propres transactions" ON public.transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Gestion de ses demandes de retrait" ON public.payout_requests FOR ALL USING (auth.uid() = creator_id);
CREATE POLICY "Accès à ses propres notifications" ON public.notifications FOR ALL USING (auth.uid() = user_id);
