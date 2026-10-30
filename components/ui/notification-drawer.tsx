'use client';

import React from 'react';
import { useMarketplace } from '@/lib/context/marketplace-context';
import { useAuth } from '@/lib/context/auth-context';
import { X, Check, Bell, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationDrawer({ isOpen, onClose }: NotificationDrawerProps) {
  const { user } = useAuth();
  const { notifications, markNotificationAsRead } = useMarketplace();

  if (!isOpen) return null;

  const userNotifs = notifications.filter(
    (n) => !user || n.user_id === user.id || n.user_id === 'admin'
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/30 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col border-l border-[#E5E5EB] animate-in slide-in-from-right duration-200">
        <div className="p-4 border-b border-[#E5E5EB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#7257E8]" />
            <h3 className="font-semibold text-sm text-[#222126]">Centre de Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {userNotifs.length === 0 ? (
            <div className="text-center py-12 text-neutral-400 text-xs">
              Aucune notification pour le moment.
            </div>
          ) : (
            userNotifs.map((notif) => (
              <div
                key={notif.id}
                className={`p-3 rounded-xl border text-xs transition-colors ${
                  notif.is_read
                    ? 'bg-[#F6F6F8]/60 border-neutral-200 text-neutral-500'
                    : 'bg-white border-[#7257E8]/30 shadow-xs text-neutral-800'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="font-semibold text-[#222126]">{notif.title}</div>
                  {!notif.is_read && (
                    <button
                      onClick={() => markNotificationAsRead(notif.id)}
                      className="text-[11px] text-[#7257E8] hover:underline flex items-center gap-0.5"
                      title="Marquer comme lu"
                    >
                      <Check className="w-3 h-3" />
                      Lu
                    </button>
                  )}
                </div>
                <p className="text-[11px] leading-relaxed mb-2 text-[#6E6D7A]">{notif.message}</p>
                <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-1 border-t border-neutral-100">
                  <span>{new Date(notif.created_at).toLocaleDateString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                  {notif.link && (
                    <Link
                      href={notif.link}
                      onClick={onClose}
                      className="text-[#7257E8] hover:underline flex items-center gap-1 font-medium"
                    >
                      Détails
                      <ExternalLink className="w-2.5 h-2.5" />
                    </Link>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
