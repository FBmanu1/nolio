'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/context/auth-context';
import { useMarketplace } from '@/lib/context/marketplace-context';
import {
  Send,
  Download,
  Building,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  TrendingUp,
  CreditCard,
  Plus,
} from 'lucide-react';

export default function ContraDashboardPage() {
  const { user } = useAuth();
  const { wallets } = useMarketplace();

  const [timeRange, setTimeRange] = useState('Last 30 days');
  const [needsYouOpen, setNeedsYouOpen] = useState(false);
  const [activePeriod, setActivePeriod] = useState<'this' | 'prev'>('this');

  const displayName = user?.display_name || 'Manu Christian';
  const firstName = displayName.split(' ')[0] || 'Manu';

  const myWallet = wallets[user?.id || 'd65af2ef-8e61-462a-82de-8f029b3e2ee1'] || {
    balance_available: 0,
    balance_pending: 0,
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
      {/* Top Header: Breadcrumb + Welcome + Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-[#8E9099] font-medium mb-1">Individual dashboard</div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111215] flex items-center gap-2 font-display">
            <span>Welcome, {firstName}</span>
            <span className="text-2xl">👋</span>
          </h1>
        </div>

        {/* Action Buttons (matches Screenshot 2) */}
        <div className="flex items-center gap-2 text-xs">
          <Link
            href="/account"
            className="px-4 py-2 rounded-full border border-[#EAEAEF] font-semibold text-[#111215] hover:bg-[#F5F5F7] transition-colors flex items-center gap-1.5"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Send</span>
          </Link>

          <button className="px-4 py-2 rounded-full bg-[#1E2024] hover:bg-[#111215] text-white font-semibold transition-colors flex items-center gap-1.5 shadow-xs">
            <span>$ Receive</span>
            <ChevronDown className="w-3 h-3 text-neutral-400" />
          </button>

          <Link
            href="/account"
            className="px-4 py-2 rounded-full border border-[#EAEAEF] font-semibold text-[#111215] hover:bg-[#F5F5F7] transition-colors flex items-center gap-1.5"
          >
            <Building className="w-3.5 h-3.5" />
            <span>Deposit</span>
          </Link>
        </div>
      </div>

      {/* Needs you collapsible card (matches Screenshot 2) */}
      <div className="bg-white rounded-2xl border border-[#EAEAEF] p-4 shadow-xs">
        <button
          onClick={() => setNeedsYouOpen(!needsYouOpen)}
          className="w-full flex items-center justify-between text-left"
        >
          <span className="text-sm font-semibold text-[#111215]">Needs you</span>
          <div className="p-1 rounded-lg hover:bg-[#F5F5F7]">
            {needsYouOpen ? (
              <ChevronUp className="w-4 h-4 text-[#8E9099]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#8E9099]" />
            )}
          </div>
        </button>

        {needsYouOpen && (
          <div className="pt-3 mt-3 border-t border-[#F5F5F7] text-xs text-[#65676E] space-y-2">
            <p>You have 0 pending invitations or campaign deliverables requiring your attention.</p>
            <Link href="/campagnes" className="text-[#7257E8] font-semibold hover:underline inline-block">
              Browse available campaigns →
            </Link>
          </div>
        )}
      </div>

      {/* Overview Section Card (matches Screenshot 2) */}
      <div className="bg-white rounded-3xl border border-[#EAEAEF] p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#111215]">Overview</h2>
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="appearance-none bg-transparent pr-7 pl-3 py-1.5 rounded-xl border border-[#EAEAEF] text-xs font-semibold text-[#111215] focus:outline-none cursor-pointer"
            >
              <option value="Last 30 days">Last 30 days</option>
              <option value="Last 7 days">Last 7 days</option>
              <option value="This year">This year</option>
            </select>
            <ChevronDown className="w-3 h-3 text-[#8E9099] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 4 Metric Boxes in a single row with hairline dividers */}
        <div className="grid grid-cols-2 md:grid-cols-4 border border-[#EAEAEF] rounded-2xl divide-x divide-y md:divide-y-0 divide-[#EAEAEF] overflow-hidden">
          <div className="p-4 sm:p-5">
            <div className="text-[11px] font-semibold text-[#8E9099] mb-1">Earned</div>
            <div className="text-xl sm:text-2xl font-bold text-[#111215] tabular-nums font-mono">
              0,00 $US
            </div>
          </div>

          <div className="p-4 sm:p-5">
            <div className="text-[11px] font-semibold text-[#8E9099] mb-1">Spent</div>
            <div className="text-xl sm:text-2xl font-bold text-[#111215] tabular-nums font-mono">
              0,00 $US
            </div>
          </div>

          <div className="p-4 sm:p-5">
            <div className="text-[11px] font-semibold text-[#8E9099] mb-1">Balance</div>
            <div className="text-xl sm:text-2xl font-bold text-[#111215] tabular-nums font-mono">
              0,00 $US
            </div>
          </div>

          <div className="p-4 sm:p-5">
            <div className="text-[11px] font-semibold text-[#8E9099] mb-1">Profile views</div>
            <div className="text-xl sm:text-2xl font-bold text-[#111215] tabular-nums font-mono">
              33
            </div>
          </div>
        </div>

        {/* Area Chart: Profile views over the last 30 days (matches Screenshot 2) */}
        <div className="pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div className="text-xs font-semibold text-[#8E9099]">
              Profile views over the last 30 days
            </div>

            <div className="flex items-center gap-4 text-xs">
              <button
                onClick={() => setActivePeriod('this')}
                className={`flex items-center gap-1.5 font-medium transition-colors ${
                  activePeriod === 'this' ? 'text-[#1E2024] font-bold' : 'text-[#8E9099]'
                }`}
              >
                <span className="w-3 h-0.5 bg-[#2563EB] rounded-full" />
                <span>This period</span>
              </button>

              <button
                onClick={() => setActivePeriod('prev')}
                className={`flex items-center gap-1.5 font-medium transition-colors ${
                  activePeriod === 'prev' ? 'text-[#1E2024] font-bold' : 'text-[#8E9099]'
                }`}
              >
                <span className="w-3 h-0.5 bg-[#D1D5DB] rounded-full" />
                <span>Previous period</span>
              </button>
            </div>
          </div>

          {/* Clean Smooth SVG Chart */}
          <div className="relative h-56 w-full pt-4">
            <svg viewBox="0 0 1000 240" className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Baseline */}
              <line x1="0" y1="210" x2="1000" y2="210" stroke="#EAEAEF" strokeWidth="1" />

              {/* Area fill */}
              <path
                d="M 0 210 L 250 210 Q 270 210 280 80 L 320 80 Q 340 80 350 210 L 400 210 Q 420 210 430 160 Q 450 160 460 210 Q 480 210 490 170 Q 510 170 520 210 L 570 210 Q 580 210 590 120 Q 610 120 620 180 Q 640 120 655 120 Q 675 120 690 210 L 800 210 Q 820 210 830 175 Q 845 175 855 210 L 1000 210 Z"
                fill="url(#blueGradient)"
              />

              {/* Curve stroke */}
              <path
                d="M 0 210 L 250 210 Q 270 210 280 80 L 320 80 Q 340 80 350 210 L 400 210 Q 420 210 430 160 Q 450 160 460 210 Q 480 210 490 170 Q 510 170 520 210 L 570 210 Q 580 210 590 120 Q 610 120 620 180 Q 640 120 655 120 Q 675 120 690 210 L 800 210 Q 820 210 830 175 Q 845 175 855 210 L 1000 210"
                fill="none"
                stroke="#2563EB"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>

            <div className="absolute left-0 bottom-0 text-[10px] text-[#8E9099] font-medium font-mono">
              Oct 1
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
