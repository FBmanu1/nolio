export type AccountType = 'creator' | 'advertiser';

export type UserRole = 'superadmin' | 'moderator' | null;

export interface Profile {
  id: string;
  display_name: string;
  avatar_path: string | null;
  account_type: AccountType;
  created_at: string;
  updated_at: string;
  // Extended fields
  bio?: string;
  country?: string;
  website?: string;
}

export interface CreatorDetails {
  id: string;
  bio: string;
  country: string;
  languages: string[];
  niches: string[];
  portfolio_urls: string[];
  verified_status: boolean;
  total_followers?: number;
}

export interface CreatorSocialAccount {
  id: string;
  creator_id: string;
  platform: 'youtube' | 'tiktok' | 'instagram' | 'facebook' | 'twitter_x';
  handle: string;
  followers_count: number;
  channel_url: string;
  is_verified: boolean;
}

export interface Company {
  id: string;
  name: string;
  logo_url: string;
  website: string;
  description: string;
  owner_id: string;
  industry: string;
  created_at: string;
}

export interface Product {
  id: string;
  company_id: string;
  name: string;
  tagline: string;
  description: string;
  logo_url: string;
  website_url: string;
  category: string;
  created_at: string;
}

export type PayoutModel = 'cpm' | 'fixed' | 'hybrid';
export type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed';

export interface Campaign {
  id: string;
  product_id: string;
  company_id: string;
  title: string;
  description: string;
  brief: string;
  instructions: string;
  deliverable_format: string; // e.g. "Vidéo TikTok / Shorts 30-60s"
  platforms: ('youtube' | 'tiktok' | 'instagram' | 'facebook' | 'twitter_x')[];
  target_countries: string[];
  target_languages: string[];
  target_niches: string[];
  min_followers: number;
  payout_model: PayoutModel;
  budget_total: number;
  budget_remaining: number;
  max_paid_views: number;
  cpm_rate: number; // e.g. 15€ per 1000 views
  fixed_amount: number; // e.g. 250€
  status: CampaignStatus;
  start_date: string;
  end_date: string;
  desired_creators_count: number;
  engaged_creators_count: number;
  created_at: string;
  // Hydrated helper fields
  product?: Product;
  company?: Company;
}

export type ApplicationStatus = 'pending' | 'accepted' | 'rejected' | 'cancelled';

export interface CampaignApplication {
  id: string;
  campaign_id: string;
  creator_id: string;
  pitch: string;
  requested_rate?: number;
  status: ApplicationStatus;
  created_at: string;
  tracking_code?: string;
  // Hydrated
  campaign?: Campaign;
  creator?: Profile & { details?: CreatorDetails; socials?: CreatorSocialAccount[] };
}

export type DeliverableStatus = 'submitted' | 'approved' | 'revision_requested' | 'rejected';

export interface CampaignDeliverable {
  id: string;
  application_id: string;
  campaign_id: string;
  creator_id: string;
  post_url: string;
  platform: 'youtube' | 'tiktok' | 'instagram' | 'facebook' | 'twitter_x';
  proof_screenshot_url?: string;
  claimed_views: number;
  verified_views: number;
  unique_clicks: number;
  status: DeliverableStatus;
  revision_notes?: string;
  submitted_at: string;
  reviewed_at?: string;
  calculated_earnings: number;
  // Hydrated
  campaign?: Campaign;
  creator?: Profile;
}

export interface TrackingLink {
  id: string;
  code: string;
  campaign_id: string;
  creator_id: string;
  destination_url: string;
  total_clicks: number;
  unique_clicks: number;
  created_at: string;
}

export interface Wallet {
  id: string;
  user_id: string;
  balance_available: number;
  balance_pending: number;
  currency: string;
}

export interface Transaction {
  id: string;
  wallet_id: string;
  user_id: string;
  amount: number;
  fee_amount: number;
  type: 'deposit' | 'earning' | 'payout' | 'commission_fee';
  status: 'completed' | 'pending' | 'failed';
  reference: string;
  description: string;
  created_at: string;
}

export interface PayoutRequest {
  id: string;
  creator_id: string;
  amount: number;
  currency: string;
  payout_method: string;
  recipient_details: string;
  status: 'pending' | 'approved' | 'rejected' | 'processing';
  created_at: string;
  reviewed_at?: string;
}

export interface AdminUser {
  id: string;
  user_id: string;
  role: 'superadmin' | 'moderator';
  created_at: string;
}

export interface NotificationItem {
  id: string;
  user_id: string;
  title: string;
  message: string;
  link?: string;
  is_read: boolean;
  created_at: string;
  type: 'application' | 'deliverable' | 'payment' | 'system';
}

export interface Conversation {
  id: string;
  campaign_id: string;
  advertiser_id: string;
  creator_id: string;
  last_message_at: string;
  campaign_title?: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}
