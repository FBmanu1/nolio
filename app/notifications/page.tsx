'use client';

import React, { useState } from 'react';
import { useMarketplace } from '@/lib/context/marketplace-context';
import { Sparkles, Check, Bell } from 'lucide-react';

interface NotificationCardItem {
  id: string;
  category: 'work' | 'social';
  title: string;
  description: string;
  timeAgo: string;
  isRead: boolean;
}

const DEFAULT_NOTIFICATIONS: NotificationCardItem[] = [
  {
    id: 'n-1',
    category: 'work',
    title: 'An opportunity you applied to was closed',
    description: 'Charles Lawrie MD is no longer hiring for "Brand + Website Designer for Charles Lawrie MD"',
    timeAgo: '13d',
    isRead: false,
  },
  {
    id: 'n-2',
    category: 'work',
    title: 'An opportunity you applied to was closed',
    description: 'Charles Lawrie MD is no longer hiring for "Brand + Website Designer for Charles Lawrie MD"',
    timeAgo: '13d',
    isRead: false,
  },
  {
    id: 'n-3',
    category: 'work',
    title: 'An opportunity you applied to was closed',
    description: 'Physician Coaching with Christina Adams, MD, LLC is no longer hiring for "Kajabi Landing Page Optimization Specialist"',
    timeAgo: '16d',
    isRead: true,
  },
  {
    id: 'n-4',
    category: 'work',
    title: 'An opportunity you applied to was closed',
    description: 'Physician Coaching with Christina Adams, MD, LLC is no longer hiring for "Kajabi Landing Page Optimization Specialist"',
    timeAgo: '16d',
    isRead: true,
  },
  {
    id: 'n-5',
    category: 'work',
    title: 'Finish your application',
    description: "We're reviewing applications and matching talent now. Complete your application to be considered.",
    timeAgo: '20d',
    isRead: true,
  },
];

export default function NotificationsPage() {
  const { notifications, markNotificationAsRead } = useMarketplace();
  const [activeTab, setActiveTab] = useState<'all' | 'social' | 'work'>('all');
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [localNotifications, setLocalNotifications] = useState<NotificationCardItem[]>(DEFAULT_NOTIFICATIONS);

  const markAllRead = () => {
    setLocalNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    notifications.forEach((n) => markNotificationAsRead(n.id));
  };

  const filtered = localNotifications.filter((item) => {
    if (unreadOnly && item.isRead) return false;
    if (activeTab === 'work' && item.category !== 'work') return false;
    if (activeTab === 'social' && item.category !== 'social') return false;
    return true;
  });

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Top Header matching Contra Screenshot 3 */}
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-6">
        <div className="flex items-center justify-between pb-4">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111215]">
            Notifications
          </h1>
          <button
            onClick={markAllRead}
            title="Mark all as read"
            className="p-1.5 rounded-lg text-[#8E9099] hover:text-[#111215] hover:bg-[#F5F5F7] transition-colors"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Filters and unread toggle */}
        <div className="flex items-center justify-between border-b border-[#EAEAEF] pb-3 text-xs">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('all')}
              className={`pb-1 font-medium transition-colors relative ${
                activeTab === 'all'
                  ? 'text-[#111215] font-semibold after:absolute after:left-0 after:right-0 after:-bottom-[13px] after:h-[2px] after:bg-[#111215]'
                  : 'text-[#8E9099] hover:text-[#111215]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('social')}
              className={`pb-1 font-medium transition-colors relative ${
                activeTab === 'social'
                  ? 'text-[#111215] font-semibold after:absolute after:left-0 after:right-0 after:-bottom-[13px] after:h-[2px] after:bg-[#111215]'
                  : 'text-[#8E9099] hover:text-[#111215]'
              }`}
            >
              Social
            </button>
            <button
              onClick={() => setActiveTab('work')}
              className={`pb-1 font-medium transition-colors relative ${
                activeTab === 'work'
                  ? 'text-[#111215] font-semibold after:absolute after:left-0 after:right-0 after:-bottom-[13px] after:h-[2px] after:bg-[#111215]'
                  : 'text-[#8E9099] hover:text-[#111215]'
              }`}
            >
              Work
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#65676E] text-xs">Unread only</span>
            <button
              onClick={() => setUnreadOnly(!unreadOnly)}
              className={`w-9 h-5 rounded-full transition-colors relative flex items-center px-0.5 ${
                unreadOnly ? 'bg-[#1E2024]' : 'bg-[#D1D3D9]'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  unreadOnly ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Section title */}
        <div className="pt-4 pb-2">
          <span className="text-xs font-semibold text-[#8E9099]">Earlier</span>
        </div>

        {/* Notifications list matching Screenshot 3 */}
        <div className="divide-y divide-[#F0F0F4]">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-xs text-[#8E9099]">
              <Bell className="w-8 h-8 text-[#C4C6CC] mx-auto mb-2 stroke-[1.5]" />
              <p className="font-medium text-[#111215]">No notifications found</p>
              <p className="mt-1">You are all caught up with your updates.</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setLocalNotifications((prev) =>
                    prev.map((n) => (n.id === item.id ? { ...n, isRead: true } : n))
                  );
                }}
                className={`py-3.5 px-2 flex items-start justify-between gap-4 transition-colors rounded-xl cursor-pointer hover:bg-[#FAFAFC] ${
                  !item.isRead ? 'bg-[#FCFCFE]' : ''
                }`}
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  {/* Distinctive Contra 4-point star badge */}
                  <div className="w-9 h-9 rounded-full bg-[#1E2024] flex items-center justify-center shrink-0 text-white shadow-xs">
                    <Sparkles className="w-4 h-4 fill-white text-white" />
                  </div>

                  <div className="min-w-0 space-y-0.5">
                    <h3 className="text-xs sm:text-sm font-semibold text-[#111215] leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#65676E] leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="text-[11px] font-medium text-[#8E9099] whitespace-nowrap pt-0.5 tabular-nums">
                  {item.timeAgo}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
