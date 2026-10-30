'use client';

import React, { useState } from 'react';
import {
  Search,
  MoreHorizontal,
  SquarePen,
  Sparkles,
  MessageSquare,
  Send,
  User,
  CheckCheck,
} from 'lucide-react';
import { useAuth } from '@/lib/context/auth-context';

interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  category: 'general' | 'requests' | 'marketing';
}

const SAMPLE_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    name: 'SyntaxFlow AI (Alexandre)',
    lastMessage: 'Bonjour Manu, le brief pour la campagne Short-Form est validé !',
    time: '2h',
    unread: false,
    category: 'general',
  },
  {
    id: 'conv-2',
    name: 'HyperMetric Cloud',
    lastMessage: 'Est-ce que tu serais disponible pour tester notre SDK cette semaine ?',
    time: '1d',
    unread: false,
    category: 'requests',
  },
];

export default function MessagesPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'general' | 'requests' | 'marketing'>('general');
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEmptyCaughtUp, setShowEmptyCaughtUp] = useState(true);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

  const [conversations, setConversations] = useState<Conversation[]>(SAMPLE_CONVERSATIONS);
  const [threadMessages, setThreadMessages] = useState<Record<string, { sender: string; text: string; time: string }[]>>({
    'conv-1': [
      { sender: 'them', text: 'Bonjour Manu ! Nous avons vu ton profil sur Nolio.', time: '10:14' },
      { sender: 'them', text: 'Le brief pour la campagne Short-Form est validé ! Peux-tu nous confirmer ta disponibilité ?', time: '10:15' },
    ],
  });
  const [inputText, setInputText] = useState('');

  const filteredConversations = conversations.filter((c) => {
    if (unreadOnly && !c.unread) return false;
    if (c.category !== activeTab) return false;
    if (searchTerm && !c.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const selectedConv = conversations.find((c) => c.id === selectedConversationId);

  const handleSendMessage = () => {
    if (!inputText.trim() || !selectedConversationId) return;
    const now = new Date();
    const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

    setThreadMessages((prev) => ({
      ...prev,
      [selectedConversationId]: [
        ...(prev[selectedConversationId] || []),
        { sender: 'me', text: inputText.trim(), time: timeStr },
      ],
    }));

    setInputText('');
  };

  return (
    <div className="w-full h-[calc(100vh-3.5rem)] lg:h-screen flex flex-col md:flex-row bg-white border-t lg:border-t-0 border-[#EAEAEF]">
      {/* Left Pane: Inbox matching Screenshot 4 */}
      <div className="w-full md:w-80 lg:w-96 border-r border-[#EAEAEF] flex flex-col shrink-0 h-full">
        {/* Top search & icons */}
        <div className="p-3.5 pb-2">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-[#8E9099] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search for name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-full border border-[#EAEAEF] bg-[#FAFAFC] focus:bg-white focus:outline-none focus:border-[#1E2024] text-[#111215] placeholder:text-[#8E9099]"
              />
            </div>

            <button
              title="Options"
              className="w-8 h-8 rounded-full border border-[#EAEAEF] flex items-center justify-center text-[#65676E] hover:text-[#111215] hover:bg-[#F5F5F7] transition-colors shrink-0"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setShowEmptyCaughtUp(false);
                setSelectedConversationId('conv-1');
              }}
              title="New message"
              className="w-8 h-8 rounded-full border border-[#EAEAEF] flex items-center justify-center text-[#65676E] hover:text-[#111215] hover:bg-[#F5F5F7] transition-colors shrink-0"
            >
              <SquarePen className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tab filters and unread switch */}
        <div className="flex items-center justify-between px-4 border-b border-[#EAEAEF] pt-1 pb-2.5 text-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('general')}
              className={`pb-0.5 font-medium transition-colors relative ${
                activeTab === 'general'
                  ? 'text-[#111215] font-semibold after:absolute after:left-0 after:right-0 after:-bottom-[11px] after:h-[2px] after:bg-[#111215]'
                  : 'text-[#8E9099] hover:text-[#111215]'
              }`}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`pb-0.5 font-medium transition-colors relative ${
                activeTab === 'requests'
                  ? 'text-[#111215] font-semibold after:absolute after:left-0 after:right-0 after:-bottom-[11px] after:h-[2px] after:bg-[#111215]'
                  : 'text-[#8E9099] hover:text-[#111215]'
              }`}
            >
              Requests
            </button>
            <button
              onClick={() => setActiveTab('marketing')}
              className={`pb-0.5 font-medium transition-colors relative ${
                activeTab === 'marketing'
                  ? 'text-[#111215] font-semibold after:absolute after:left-0 after:right-0 after:-bottom-[11px] after:h-[2px] after:bg-[#111215]'
                  : 'text-[#8E9099] hover:text-[#111215]'
              }`}
            >
              Marketing
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[#8E9099] text-[11px]">Unread</span>
            <button
              onClick={() => setUnreadOnly(!unreadOnly)}
              className={`w-7 h-4 rounded-full transition-colors relative flex items-center px-0.5 ${
                unreadOnly ? 'bg-[#1E2024]' : 'bg-[#D1D3D9]'
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full bg-white transition-transform ${
                  unreadOnly ? 'translate-x-3' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Inbox body: Empty state matching Screenshot 4 */}
        <div className="flex-1 overflow-y-auto">
          {showEmptyCaughtUp && filteredConversations.length > 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-6 text-center">
              {/* Distinctive hollow speech bubble with sparkle icon from Screenshot 4 */}
              <div className="w-12 h-12 rounded-full border border-[#D5D7DD] flex items-center justify-center text-[#999BA3] mb-3">
                <Sparkles className="w-5 h-5 text-[#999BA3]" />
              </div>
              <h2 className="text-xs sm:text-sm font-semibold text-[#111215] mb-4">
                You&apos;re all caught up
              </h2>
              <button
                onClick={() => {
                  setShowEmptyCaughtUp(false);
                  if (filteredConversations.length > 0) {
                    setSelectedConversationId(filteredConversations[0].id);
                  }
                }}
                className="py-1.5 px-4 rounded-full border border-[#D5D7DD] hover:border-[#111215] text-[#111215] text-xs font-semibold transition-colors"
              >
                View all messages
              </button>
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-6 text-center">
              <MessageSquare className="w-8 h-8 text-[#D5D7DD] mb-2 stroke-[1.5]" />
              <p className="text-xs font-medium text-[#111215]">No messages</p>
              <p className="text-[11px] text-[#8E9099] mt-0.5">
                New inquiries and conversations will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#F0F0F4]">
              {filteredConversations.map((conv) => {
                const isSelected = conv.id === selectedConversationId;
                return (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversationId(conv.id)}
                    className={`w-full p-3.5 text-left flex items-start gap-3 transition-colors ${
                      isSelected ? 'bg-[#F5F5F7]' : 'hover:bg-[#FAFAFC]'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-full bg-[#1E2024] text-white flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                      {conv.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#111215] truncate">
                          {conv.name}
                        </span>
                        <span className="text-[10px] text-[#8E9099] tabular-nums">{conv.time}</span>
                      </div>
                      <p className="text-[11px] text-[#65676E] truncate mt-0.5">
                        {conv.lastMessage}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Right Pane: Conversation view matching Contra style */}
      <div className="flex-1 flex flex-col h-full bg-[#FFFFFF]">
        {selectedConv ? (
          <>
            {/* Header */}
            <div className="h-14 border-b border-[#EAEAEF] px-6 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1E2024] text-white flex items-center justify-center font-bold text-xs font-mono">
                  {selectedConv.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xs font-bold text-[#111215]">{selectedConv.name}</h2>
                  <span className="text-[10px] text-[#10B981] flex items-center gap-1 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                    Online on Nolio
                  </span>
                </div>
              </div>
            </div>

            {/* Messages Thread */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {(threadMessages[selectedConv.id] || []).map((msg, idx) => {
                const isMe = msg.sender === 'me';
                return (
                  <div
                    key={idx}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-md px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                        isMe
                          ? 'bg-[#1E2024] text-white rounded-br-xs'
                          : 'bg-[#F2F2F5] text-[#111215] rounded-bl-xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-[#8E9099] mt-1 px-1 tabular-nums">
                      {msg.time}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Composer */}
            <div className="p-4 border-t border-[#EAEAEF]">
              <div className="flex items-center gap-2 bg-[#FAFAFC] border border-[#EAEAEF] rounded-2xl p-1.5 pl-4 focus-within:border-[#1E2024] focus-within:bg-white transition-colors">
                <input
                  type="text"
                  placeholder={`Write a message to ${selectedConv.name}...`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 bg-transparent text-xs text-[#111215] placeholder:text-[#8E9099] focus:outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="w-8 h-8 rounded-xl bg-[#1E2024] disabled:opacity-40 text-white flex items-center justify-center shrink-0 hover:bg-[#111215] transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-[#8E9099]">
            <div className="w-12 h-12 rounded-full bg-[#F5F5F7] flex items-center justify-center text-[#8E9099] mb-3">
              <MessageSquare className="w-6 h-6 stroke-[1.5]" />
            </div>
            <p className="text-xs font-semibold text-[#111215]">Select a conversation</p>
            <p className="text-[11px] text-[#8E9099] mt-1 max-w-xs">
              Chat directly with advertisers, review video requirements, and negotiate campaign deals.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
