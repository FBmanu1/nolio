import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { AppLayoutWrapper } from '@/components/layout/app-layout-wrapper';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nolio — Plateforme de Promotion par les Créateurs',
  description:
    'Marketplace internationale connectant entreprises, fondateurs de SaaS et créateurs de contenu pour des campagnes de promotion basées sur la performance.',
  openGraph: {
    title: 'Nolio — Plateforme de Promotion par les Créateurs',
    description:
      'Marketplace internationale connectant entreprises, fondateurs de SaaS et créateurs de contenu pour des campagnes de promotion basées sur la performance.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nolio — Plateforme de Promotion par les Créateurs',
    description:
      'Marketplace internationale connectant entreprises, fondateurs de SaaS et créateurs de contenu pour des campagnes de promotion basées sur la performance.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${jakarta.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning className="font-sans">
        <AppLayoutWrapper>{children}</AppLayoutWrapper>
      </body>
    </html>
  );
}
