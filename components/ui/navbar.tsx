'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/context/auth-context';
import { useMarketplace } from '@/lib/context/marketplace-context';
import {
  Bell,
  LogOut,
  LayoutDashboard,
  ShieldAlert,
  ChevronDown,
  Layers,
  Sparkles,
  Menu,
  X,
} from 'lucide-react';
import Image from 'next/image';

interface NavbarProps {
  onOpenNotifications?: () => void;
}

export function Navbar({ onOpenNotifications }: NavbarProps) {
  const pathname = usePathname();
  const { user, isAdmin, signOut } = useAuth();
  const { activeNotificationsCount } = useMarketplace();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdvertiser = user?.account_type === 'advertiser';
  const isCreator = user?.account_type === 'creator';

  const navLinks = [
    { href: '/campagnes', label: 'Campagnes' },
    { href: '/createurs', label: 'Créateurs' },
    { href: '/fonctionnement', label: 'Fonctionnement' },
    { href: '/tarifs', label: 'Tarifs' },
  ];

  const dashboardHref = isAdmin
    ? '/admin'
    : isAdvertiser
    ? '/dashboard/annonceur'
    : '/dashboard/createur';

  const dashboardLabel = isAdmin
    ? 'Espace Administrateur'
    : isAdvertiser
    ? 'Espace Annonceur'
    : 'Espace Créateur';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E5EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Zone 1: Brand wordmark */}
        <div className="flex items-center gap-6 shrink-0">
          <Link href="/" className="flex items-center gap-1.5 group">
            <span className="w-6 h-6 rounded-lg bg-[#7257E8] text-white flex items-center justify-center font-bold text-xs tracking-tighter shadow-sm group-hover:scale-105 transition-transform">
              N
            </span>
            <span className="text-lg font-bold tracking-tight text-[#222126] flex items-center">
              nolio<span className="text-[#7257E8]">.</span>
            </span>
          </Link>
        </div>

        {/* Zone 2: Navigation Links (single-line, clean unboxed typography) */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-[#6E6D7A]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors whitespace-nowrap hover:text-[#222126] ${
                  isActive ? 'text-[#7257E8] font-semibold' : ''
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {user && (
            <Link
              href={dashboardHref}
              className={`flex items-center gap-1.5 transition-colors whitespace-nowrap font-medium ${
                pathname.startsWith('/dashboard') || pathname.startsWith('/admin')
                  ? 'text-[#7257E8] font-semibold'
                  : 'text-[#222126] hover:text-[#7257E8]'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              {dashboardLabel}
            </Link>
          )}
        </nav>

        {/* Zone 3: Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {user ? (
            <>
              {/* Notifications Button */}
              <button
                onClick={onOpenNotifications}
                className="relative p-2 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                title="Notifications"
                aria-label="Centre de notifications"
              >
                <Bell className="w-4 h-4" />
                {activeNotificationsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#7257E8] ring-2 ring-white" />
                )}
              </button>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1 pl-2 rounded-lg border border-[#E5E5EB] hover:border-neutral-300 transition-colors bg-white text-left text-xs"
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-[#F6F6F8] shrink-0 border border-neutral-200 relative">
                    {user.avatar_path ? (
                      <Image
                        src={user.avatar_path}
                        alt={user.display_name}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-[10px] text-[#7257E8]">
                        {user.display_name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    )}
                  </div>
                  <span className="hidden sm:inline font-medium text-[#222126] max-w-[120px] truncate">
                    {user.display_name}
                  </span>
                  <ChevronDown className="w-3 h-3 text-neutral-400" />
                </button>

                {userMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white border border-[#E5E5EB] rounded-xl shadow-lg py-1.5 z-50 text-xs"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <div className="px-3 py-2 border-b border-[#F6F6F8]">
                      <div className="font-semibold text-[#222126] truncate">{user.display_name}</div>
                      <div className="text-[11px] text-[#6E6D7A] capitalize">
                        {isAdmin ? 'Administrateur' : user.account_type === 'creator' ? 'Créateur' : 'Annonceur'}
                      </div>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/dashboard/annonceur"
                        className="flex items-center gap-2 px-3 py-2 text-neutral-700 hover:bg-[#F6F6F8] transition-colors"
                      >
                        <Layers className="w-3.5 h-3.5 text-[#7257E8]" />
                        Espace Annonceur
                      </Link>
                      <Link
                        href="/dashboard/createur"
                        className="flex items-center gap-2 px-3 py-2 text-neutral-700 hover:bg-[#F6F6F8] transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        Espace Créateur
                      </Link>
                      {isAdmin && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-2 px-3 py-2 text-amber-700 hover:bg-amber-50/50 transition-colors"
                        >
                          <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                          Console Administrateur
                        </Link>
                      )}
                    </div>

                    <div className="border-t border-[#F6F6F8] pt-1">
                      <button
                        onClick={signOut}
                        className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50/60 transition-colors text-left"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Se déconnecter
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/connexion"
                className="px-3 py-1.5 text-xs font-medium text-[#222126] hover:text-[#7257E8] transition-colors"
              >
                Connexion
              </Link>
              <Link
                href="/inscription"
                className="px-3.5 py-1.5 text-xs font-medium text-white bg-[#7257E8] hover:bg-[#5e42db] rounded-lg transition-colors shadow-sm"
              >
                Créer un compte
              </Link>
            </div>
          )}

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg text-neutral-600 hover:bg-neutral-100"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E5E5EB] bg-white px-4 py-3 space-y-2 text-xs">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-medium text-[#222126] hover:text-[#7257E8]"
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <Link
              href={dashboardHref}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-semibold text-[#7257E8]"
            >
              {dashboardLabel}
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
