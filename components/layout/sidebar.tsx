'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/context/auth-context';
import { useMarketplace } from '@/lib/context/marketplace-context';
import { NolioLogo } from '@/components/ui/nolio-logo';
import {
  Sparkles,
  Home,
  LayoutDashboard,
  Bell,
  MessageSquare,
  User,
  CreditCard,
  Briefcase,
  Users,
  Building2,
  LogOut,
  ChevronDown,
  PanelLeftClose,
  Plus,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';

interface SidebarProps {
  onCreateClick: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({ onCreateClick, isOpenMobile, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const { user, accountType, toggleAccountType, signOut } = useAuth();
  const { activeNotificationsCount, wallets } = useMarketplace();

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [workExpanded, setWorkExpanded] = useState(true);

  const displayName = user?.display_name || 'Manu Christian';
  const myWallet = wallets[user?.id || 'd65af2ef-8e61-462a-82de-8f029b3e2ee1'] || {
    balance_available: 0,
  };

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    {
      href: '/notifications',
      label: 'Notifications',
      icon: Bell,
      badge: activeNotificationsCount > 0 ? activeNotificationsCount : null,
    },
    { href: '/messages', label: 'Messages', icon: MessageSquare },
    { href: '/profile', label: 'My Profile', icon: User },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-60 bg-white border-r border-[#EAEAEF] flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {/* Header with Nolio Logo */}
          <div className="flex items-center justify-between px-1">
            <Link href="/" className="group">
              <NolioLogo size="md" />
            </Link>
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1 text-[#8E9099] hover:text-[#111215]"
              aria-label="Fermer le menu"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>

          {/* User selector & Account Switcher */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="w-full flex items-center justify-between p-1.5 rounded-xl hover:bg-[#F5F5F7] transition-colors text-left"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded-md bg-[#1E2024] text-white flex items-center justify-center font-bold text-[11px] shrink-0 font-mono">
                  {displayName.charAt(0)}
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-[#111215] truncate block">
                    {displayName}
                  </span>
                  <span className="text-[10px] text-[#7257E8] font-medium capitalize">
                    {accountType === 'advertiser' ? 'Annonceur' : 'Créateur'}
                  </span>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#8E9099] shrink-0" />
            </button>

            {userDropdownOpen && (
              <div
                onClick={() => setUserDropdownOpen(false)}
                className="absolute left-0 right-0 top-full mt-1 bg-white border border-[#EAEAEF] rounded-xl shadow-xl p-1.5 z-50 text-xs space-y-1"
              >
                {/* Account Type Switcher */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleAccountType();
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-lg bg-[#F5F5F7] hover:bg-[#EAEAEF] text-[#111215] font-medium transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 text-[#7257E8]" />
                    <span>Basculer en {accountType === 'creator' ? 'Annonceur' : 'Créateur'}</span>
                  </div>
                  <span className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-[#EAEAEF] text-[#7257E8] font-bold">
                    Switch
                  </span>
                </button>

                <div className="border-t border-[#EAEAEF] my-1" />

                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-[#F5F5F7] text-[#111215]"
                >
                  <User className="w-3.5 h-3.5" />
                  Voir mon profil
                </Link>
                <Link
                  href="/account"
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-[#F5F5F7] text-[#111215]"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  Portefeuille & Solde
                </Link>
                <div className="border-t border-[#EAEAEF] my-1" />
                <button
                  onClick={signOut}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-rose-50 text-rose-600 text-left"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Se déconnecter
                </button>
              </div>
            )}
          </div>

          {/* + Create Button */}
          <button
            onClick={() => {
              onCreateClick();
              onCloseMobile();
            }}
            className="w-full py-2.5 px-4 rounded-full bg-[#1E2024] hover:bg-[#111215] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all hover:scale-[1.01]"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            {accountType === 'advertiser' ? 'Créer une campagne' : 'Publier un projet'}
          </button>

          {/* Primary Nav Links */}
          <nav className="space-y-0.5 text-xs">

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-colors ${
                    isActive
                      ? 'bg-[#F5F5F7] text-[#111215] font-semibold'
                      : 'text-[#65676E] hover:text-[#111215] hover:bg-[#F5F5F7]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="w-4 h-4 rounded-full bg-[#7257E8] text-white text-[10px] font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Payments Section */}
          <div className="pt-2">
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#999BA3] mb-1">
              Finances
            </div>
            <nav className="space-y-0.5 text-xs">
              <Link
                href="/account"
                onClick={onCloseMobile}
                className={`flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-colors ${
                  pathname === '/account'
                    ? 'bg-[#F5F5F7] text-[#111215] font-semibold'
                    : 'text-[#65676E] hover:text-[#111215] hover:bg-[#F5F5F7]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-4 h-4" />
                  <span>Solde disponible</span>
                </div>
                <span className="font-semibold text-[#111215] tabular-nums">
                  ${myWallet.balance_available.toFixed(2)}
                </span>
              </Link>
            </nav>
          </div>

          {/* Work / Network Section */}
          <div className="pt-2">
            <button
              onClick={() => setWorkExpanded(!workExpanded)}
              className="w-full flex items-center justify-between px-3 text-[10px] font-bold uppercase tracking-wider text-[#999BA3] mb-1"
            >
              <span>Marketplace</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform ${workExpanded ? '' : '-rotate-90'}`}
              />
            </button>
            {workExpanded && (
              <nav className="space-y-0.5 text-xs">
                <Link
                  href="/campagnes"
                  onClick={onCloseMobile}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition-colors ${
                    pathname === '/campagnes'
                      ? 'bg-[#F5F5F7] text-[#111215] font-semibold'
                      : 'text-[#65676E] hover:text-[#111215] hover:bg-[#F5F5F7]'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Campagnes & Projets</span>
                </Link>
                <Link
                  href="/createurs"
                  onClick={onCloseMobile}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition-colors ${
                    pathname === '/createurs'
                      ? 'bg-[#F5F5F7] text-[#111215] font-semibold'
                      : 'text-[#65676E] hover:text-[#111215] hover:bg-[#F5F5F7]'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Créateurs</span>
                </Link>
                <Link
                  href="/annonceurs"
                  onClick={onCloseMobile}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition-colors ${
                    pathname === '/annonceurs'
                      ? 'bg-[#F5F5F7] text-[#111215] font-semibold'
                      : 'text-[#65676E] hover:text-[#111215] hover:bg-[#F5F5F7]'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Annonceurs & SaaS</span>
                </Link>
              </nav>
            )}
          </div>
        </div>

        {/* Bottom Pro Card: "Passer en Pro pour une meilleure visibilité" */}
        <div className="p-3 border-t border-[#EAEAEF]">
          <div className="p-3 rounded-2xl bg-[#FAFAFC] border border-[#EAEAEF] flex items-center gap-3 hover:border-neutral-300 transition-colors cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-400 via-pink-400 to-amber-300 flex items-center justify-center p-0.5 shrink-0 shadow-xs">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#7257E8]" />
              </div>
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-[#111215] leading-snug group-hover:text-[#7257E8] transition-colors">
                Passer en Pro pour une meilleure visibilité
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
