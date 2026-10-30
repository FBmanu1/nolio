'use client';

import React, { useState } from 'react';
import {
  Plus,
  ArrowLeftRight,
  Landmark,
  Search,
  ChevronDown,
  Download,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
} from 'lucide-react';
import { useAuth } from '@/lib/context/auth-context';
import { useMarketplace } from '@/lib/context/marketplace-context';

export default function AccountPage() {
  const { user } = useAuth();
  const { wallets, transactions, depositBudget, requestPayout } = useMarketplace();

  const [activeTab, setActiveTab] = useState<'transactions' | 'subscriptions'>('transactions');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [amountInput, setAmountInput] = useState('100');
  const [notice, setNotice] = useState<string | null>(null);

  const userId = user?.id || 'd65af2ef-8e61-462a-82de-8f029b3e2ee1';
  const myWallet = wallets[userId] || {
    balance_available: 0,
    balance_pending: 0,
  };

  const myTransactions = transactions.filter((t) => t.user_id === userId);

  const handleDeposit = () => {
    const amt = parseFloat(amountInput);
    if (!amt || amt <= 0) return;
    const res = depositBudget(amt);
    if (res.success) {
      setNotice(`Dépôt de ${amt.toFixed(2)} $US enregistré avec succès.`);
      setIsDepositModalOpen(false);
      setTimeout(() => setNotice(null), 4000);
    }
  };

  const handlePayout = () => {
    const amt = parseFloat(amountInput);
    if (!amt || amt <= 0) return;
    const res = requestPayout(amt, 'Virement Bancaire', 'IBAN / Saspay');
    if (res.success) {
      setNotice(`Demande de retrait de ${amt.toFixed(2)} $US initiée.`);
      setIsPayoutModalOpen(false);
      setTimeout(() => setNotice(null), 4000);
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
        {/* Notice toast */}
        {notice && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{notice}</span>
          </div>
        )}

        {/* Top Header Tabs matching Screenshot 6 */}
        <div className="flex items-center gap-8 border-b border-[#EAEAEF] pb-3 text-xs mb-6">
          <button
            onClick={() => setActiveTab('transactions')}
            className={`font-semibold transition-colors relative pb-1 ${
              activeTab === 'transactions'
                ? 'text-[#111215] after:absolute after:left-0 after:right-0 after:-bottom-[13px] after:h-[2px] after:bg-[#111215]'
                : 'text-[#8E9099] hover:text-[#111215]'
            }`}
          >
            Transactions
          </button>
          <button
            onClick={() => setActiveTab('subscriptions')}
            className={`font-semibold transition-colors relative pb-1 ${
              activeTab === 'subscriptions'
                ? 'text-[#111215] after:absolute after:left-0 after:right-0 after:-bottom-[13px] after:h-[2px] after:bg-[#111215]'
                : 'text-[#8E9099] hover:text-[#111215]'
            }`}
          >
            My subscriptions
          </button>
        </div>

        {/* Total Balance Card matching Screenshot 6 */}
        <div className="border border-[#EAEAEF] rounded-2xl p-6 bg-white mb-8 shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-[#65676E]">Total balance</span>
              <div className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111215] mt-1 mb-6 font-mono tabular-nums">
                ${myWallet.balance_available.toFixed(2)}
              </div>
            </div>

            {/* Action circular icons matching Screenshot 6 */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDepositModalOpen(true)}
                title="Deposit / Add funds"
                className="w-9 h-9 rounded-full border border-[#EAEAEF] flex items-center justify-center text-[#111215] hover:bg-[#F5F5F7] transition-colors"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </button>
              <button
                onClick={() => setIsPayoutModalOpen(true)}
                title="Transfer / Payout"
                className="w-9 h-9 rounded-full border border-[#EAEAEF] flex items-center justify-center text-[#111215] hover:bg-[#F5F5F7] transition-colors"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
              <button
                title="Banking settings"
                className="w-9 h-9 rounded-full border border-[#EAEAEF] flex items-center justify-center text-[#111215] hover:bg-[#F5F5F7] transition-colors"
              >
                <Landmark className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sub-balances rows */}
          <div className="space-y-3 pt-4 border-t border-[#F0F0F4] text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#65676E]">Pending</span>
              <span className="font-semibold text-[#111215] tabular-nums font-mono">
                ${(myWallet.balance_pending || 0).toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#65676E]">In escrow</span>
              <span className="font-semibold text-[#111215] tabular-nums font-mono">$0.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#65676E]">Payouts in transit</span>
              <span className="font-semibold text-[#111215] tabular-nums font-mono">$0.00</span>
            </div>
          </div>
        </div>

        {/* Filter bar matching Screenshot 6 */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-[#8E9099] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-full border border-[#EAEAEF] bg-white focus:outline-none focus:border-[#1E2024] text-[#111215] placeholder:text-[#8E9099]"
              />
            </div>

            <button className="px-3 py-1.5 rounded-full border border-[#EAEAEF] text-xs text-[#65676E] hover:text-[#111215] hover:bg-[#F5F5F7] flex items-center gap-1.5 transition-colors">
              <span>Date</span>
              <ChevronDown className="w-3 h-3 text-[#8E9099]" />
            </button>
            <button className="px-3 py-1.5 rounded-full border border-[#EAEAEF] text-xs text-[#65676E] hover:text-[#111215] hover:bg-[#F5F5F7] flex items-center gap-1.5 transition-colors">
              <span>Direction</span>
              <ChevronDown className="w-3 h-3 text-[#8E9099]" />
            </button>
            <button className="px-3 py-1.5 rounded-full border border-[#EAEAEF] text-xs text-[#65676E] hover:text-[#111215] hover:bg-[#F5F5F7] flex items-center gap-1.5 transition-colors">
              <span>Type</span>
              <ChevronDown className="w-3 h-3 text-[#8E9099]" />
            </button>
            <button className="px-3 py-1.5 rounded-full border border-[#EAEAEF] text-xs text-[#65676E] hover:text-[#111215] hover:bg-[#F5F5F7] flex items-center gap-1.5 transition-colors">
              <span>Status</span>
              <ChevronDown className="w-3 h-3 text-[#8E9099]" />
            </button>
          </div>

          <button className="px-3 py-1.5 rounded-full border border-[#EAEAEF] text-xs text-[#65676E] hover:text-[#111215] hover:bg-[#F5F5F7] flex items-center justify-center gap-1.5 transition-colors shrink-0">
            <Download className="w-3.5 h-3.5 text-[#8E9099]" />
            <span>Export</span>
            <ChevronDown className="w-3 h-3 text-[#8E9099]" />
          </button>
        </div>

        {/* Transactions Table matching Screenshot 6 */}
        <div className="border border-[#EAEAEF] rounded-2xl bg-white overflow-hidden shadow-xs">
          <div className="p-4 border-b border-[#F0F0F4] text-xs text-[#8E9099]">
            <span className="font-semibold tabular-nums">{myTransactions.length} results</span>
          </div>

          {myTransactions.length === 0 ? (
            /* Screenshot 6 empty state */
            <div className="py-20 text-center text-xs text-[#8E9099]">
              No transactions found.
            </div>
          ) : (
            <div className="divide-y divide-[#F0F0F4]">
              {myTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="p-4 flex items-center justify-between text-xs hover:bg-[#FAFAFC] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        tx.amount > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {tx.amount > 0 ? (
                        <ArrowDownLeft className="w-4 h-4" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-[#111215]">{tx.description}</p>
                      <p className="text-[11px] text-[#8E9099]">{tx.reference}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`font-bold tabular-nums font-mono ${
                        tx.amount > 0 ? 'text-emerald-600' : 'text-[#111215]'
                      }`}
                    >
                      {tx.amount > 0 ? `+${tx.amount.toFixed(2)}` : tx.amount.toFixed(2)} $US
                    </span>
                    <p className="text-[10px] text-[#8E9099] uppercase font-semibold">
                      {tx.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Deposit Modal */}
      {isDepositModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-[#EAEAEF] shadow-xl text-xs space-y-4">
            <h3 className="text-sm font-bold text-[#111215]">Déposer des fonds</h3>
            <p className="text-[#65676E]">
              Ajoutez du budget pour rémunérer des créateurs de contenu sur vos campagnes.
            </p>
            <div>
              <label className="block text-[11px] font-semibold text-[#65676E] mb-1">
                Montant ($US)
              </label>
              <input
                type="number"
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#EAEAEF] text-xs font-mono"
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsDepositModalOpen(false)}
                className="px-4 py-2 rounded-full border border-[#EAEAEF] font-semibold text-[#65676E]"
              >
                Annuler
              </button>
              <button
                onClick={handleDeposit}
                className="px-4 py-2 rounded-full bg-[#1E2024] text-white font-semibold"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payout Modal */}
      {isPayoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-[#EAEAEF] shadow-xl text-xs space-y-4">
            <h3 className="text-sm font-bold text-[#111215]">Demander un retrait</h3>
            <p className="text-[#65676E]">
              Retirez vos gains vérifiés vers votre compte bancaire ou Saspay.
            </p>
            <div>
              <label className="block text-[11px] font-semibold text-[#65676E] mb-1">
                Montant ($US) - Dispo: ${myWallet.balance_available.toFixed(2)}
              </label>
              <input
                type="number"
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#EAEAEF] text-xs font-mono"
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsPayoutModalOpen(false)}
                className="px-4 py-2 rounded-full border border-[#EAEAEF] font-semibold text-[#65676E]"
              >
                Annuler
              </button>
              <button
                onClick={handlePayout}
                className="px-4 py-2 rounded-full bg-[#1E2024] text-white font-semibold"
              >
                Transférer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
