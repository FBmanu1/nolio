'use client';

import React, { useState, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/lib/context/auth-context';
import { MarketplaceProvider } from '@/lib/context/marketplace-context';
import { Sidebar } from '@/components/layout/sidebar';
import { FloatingMessages } from '@/components/layout/floating-messages';
import { CreateModal } from '@/components/layout/create-modal';
import { Menu } from 'lucide-react';
import Link from 'next/link';

import { useAuth } from '@/lib/context/auth-context';
import { NolioLogo } from '@/components/ui/nolio-logo';

function LayoutInner({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { user, isLoading } = useAuth();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Stealth secret admin zone: no public sidebar or branding
  const isAdminSecretZone = pathname.startsWith('/admin/nolio');

  // Standalone public pages without app sidebar: Landing page (when not logged in), Auth pages
  const isAuthPage = pathname === '/connexion' || pathname === '/inscription' || pathname === '/mot-de-passe-oublie';
  const isPublicLandingPage = pathname === '/' && !user && !isLoading;

  if (isAdminSecretZone) {
    return (
      <div className="min-h-screen bg-[#0F1012] text-white flex flex-col antialiased">
        {children}
      </div>
    );
  }

  if (isAuthPage || isPublicLandingPage) {
    return (
      <div className="min-h-screen bg-white text-[#111215] flex flex-col antialiased">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#111215] flex flex-col lg:flex-row antialiased">
      {/* Mobile top bar */}
      <header className="lg:hidden sticky top-0 z-30 h-14 bg-white border-b border-[#EAEAEF] px-4 flex items-center justify-between">
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="p-1.5 rounded-lg text-[#111215] hover:bg-neutral-100"
          aria-label="Ouvrir le menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <Link href="/" className="flex items-center">
          <NolioLogo size="sm" />
        </Link>
        <div className="w-8" />
      </header>

      {/* Left Sidebar */}
      <Sidebar
        onCreateClick={() => setIsCreateModalOpen(true)}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <main className="flex-1 lg:pl-60 min-h-screen flex flex-col bg-[#FFFFFF]">
        <div className="flex-1 w-full max-w-7xl mx-auto">{children}</div>
      </main>

      {/* Floating Messages Widget (matches Contra screenshots) */}
      <FloatingMessages />

      {/* Create Modal */}
      <CreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}

export function AppLayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <MarketplaceProvider>
        <LayoutInner>{children}</LayoutInner>
      </MarketplaceProvider>
    </AuthProvider>
  );
}
