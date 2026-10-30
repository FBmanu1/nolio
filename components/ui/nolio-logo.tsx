'use client';

import React from 'react';

interface NolioLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function NolioLogo({ className = '', size = 'md', showText = true }: NolioLogoProps) {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-7 h-7',
    lg: 'w-9 h-9',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Distinctive Nolio Mark: Geometric glowing N emblem */}
      <div
        className={`${iconSizes[size]} rounded-xl bg-gradient-to-br from-[#7257E8] via-[#5E42DB] to-[#1E2024] p-0.5 flex items-center justify-center shadow-xs transition-transform hover:scale-105`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-white p-1"
        >
          <path
            d="M6 19V5L18 19V5"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="18" cy="5" r="1.8" fill="#A99AEF" />
        </svg>
      </div>

      {showText && (
        <span
          className={`font-extrabold tracking-tight text-[#111215] font-display ${textSizes[size]}`}
        >
          Nolio
        </span>
      )}
    </div>
  );
}
