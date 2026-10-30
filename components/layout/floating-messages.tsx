'use client';

import React, { useState } from 'react';
import {
  MessageSquare,
  ChevronUp,
  ChevronDown,
  X,
  Send,
  Search,
  ArrowLeft,
  CheckCheck,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/context/auth-context';

interface MiniConversation {
  id: string;
  name: string;
  role: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  avatarColor: string;
}

const SAMPLE_CHATS: MiniConversation[] = [
  {
    id: 'conv-1',
    name: 'SyntaxFlow AI (Alexandre)',
    role: 'Annonceur SaaS',
    lastMessage: 'Le brief pour la campagne Short-Form est validé !',
    time: '14:20',
    unread: true,
    avatarColor: 'bg-gradient-to-tr from-purple-500 to-indigo-600',
  },
  {
    id: 'conv-2',
    name: 'HyperMetric Cloud',
    role: 'SaaS DevTools',
    lastMessage: 'Disponible pour tester notre nouvelle version ?',
    time: 'Hier',
    unread: false,
    avatarColor: 'bg-gradient-to-tr from-emerald-500 to-teal-600',
  },
];

export function FloatingMessages() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [inputText, setInputText] = useState('');

  const [messages, setMessages] = useState<Record<string, { sender: 'me' | 'them'; text: string; time: string }[]>>({
    'conv-1': [
      { sender: 'them', text: 'Bonjour ! Nous avons découvert votre profil sur Nolio.', time: '14:10' },
      { sender: 'them', text: 'Le brief pour la campagne Short-Form est validé ! Pouvez-vous nous confirmer le planning de tournage ?', time: '14:20' },
    ],
    'conv-2': [
      { sender: 'them', text: 'Bonjour, seriez-vous intéressé par un partenariat exclusif sur YouTube ?', time: '11:00' },
    ],
  });

  const activeChat = SAMPLE_CHATS.find((c) => c.id === selectedChatId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedChatId) return;

    const timeNow = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => ({
      ...prev,
      [selectedChatId]: [
        ...(prev[selectedChatId] || []),
        { sender: 'me', text: inputText.trim(), time: timeNow },
      ],
    }));

    setInputText('');
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 text-xs">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white border border-[#EAEAEF] shadow-xl text-[#111215] font-bold hover:bg-[#F5F5F7] transition-all hover:scale-[1.02] group"
        >
          <div className="relative">
            <MessageSquare className="w-4 h-4 text-[#111215]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#7257E8]" />
          </div>
          <span>Messages</span>
          <ChevronUp className="w-3.5 h-3.5 text-[#8E9099] group-hover:text-[#111215]" />
        </button>
      ) : (
        <div className="w-80 sm:w-[380px] bg-white rounded-2xl border border-[#EAEAEF] shadow-2xl flex flex-col h-[440px] overflow-hidden animate-in slide-in-from-bottom-3 duration-200">
          {/* Header */}
          <div className="px-4 py-3 border-b border-[#EAEAEF] flex items-center justify-between bg-white shrink-0">
            {selectedChatId ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedChatId(null)}
                  className="p-1 rounded-md text-[#8E9099] hover:text-[#111215] hover:bg-[#F5F5F7]"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="min-w-0">
                  <div className="font-bold text-[#111215] truncate text-xs">{activeChat?.name}</div>
                  <div className="text-[10px] text-emerald-600 font-medium">En ligne</div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#111215]" />
                <span className="font-bold text-[#111215]">Messages Nolio</span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <Link
                href="/messages"
                className="text-[11px] text-[#7257E8] font-bold hover:underline mr-1"
              >
                Plein écran
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-[#8E9099] hover:text-[#111215] hover:bg-[#F5F5F7]"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body: List or Active Thread */}
          {!selectedChatId ? (
            <div className="flex-1 flex flex-col overflow-hidden bg-[#FAFAFC]">
              {/* Search */}
              <div className="p-3 bg-white border-b border-[#EAEAEF]">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[#8E9099] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Rechercher une conversation..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-[#EAEAEF] bg-[#F9F9FB] focus:outline-none focus:border-[#7257E8]"
                  />
                </div>
              </div>

              {/* Chat list */}
              <div className="flex-1 overflow-y-auto divide-y divide-[#F0F0F4]">
                {SAMPLE_CHATS.filter((c) =>
                  c.name.toLowerCase().includes(search.toLowerCase())
                ).map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChatId(chat.id)}
                    className="p-3 hover:bg-white cursor-pointer transition-colors flex items-start gap-3"
                  >
                    <div
                      className={`w-9 h-9 rounded-full ${chat.avatarColor} text-white flex items-center justify-center font-bold text-xs shrink-0`}
                    >
                      {chat.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-bold text-xs text-[#111215] truncate">
                          {chat.name}
                        </span>
                        <span className="text-[10px] text-[#8E9099] shrink-0">{chat.time}</span>
                      </div>
                      <p className="text-[11px] text-[#65676E] truncate">{chat.lastMessage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col overflow-hidden bg-[#F9F9FB]">
              {/* Messages Thread */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {(messages[selectedChatId] || []).map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[82%] p-2.5 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'me'
                          ? 'bg-[#1E2024] text-white rounded-br-xs'
                          : 'bg-white border border-[#EAEAEF] text-[#111215] rounded-bl-xs shadow-2xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-[#8E9099] mt-0.5 px-1">
                      <span>{msg.time}</span>
                      {msg.sender === 'me' && <CheckCheck className="w-3 h-3 text-emerald-500" />}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <form onSubmit={handleSend} className="p-2.5 border-t border-[#EAEAEF] bg-white flex gap-2">
                <input
                  type="text"
                  placeholder="Écrire votre message..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-[#EAEAEF] text-xs focus:outline-none focus:border-[#7257E8]"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="px-3.5 py-2 rounded-xl bg-[#1E2024] hover:bg-[#111215] disabled:opacity-40 text-white font-bold transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
