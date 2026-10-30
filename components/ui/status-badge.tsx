'use client';

import React from 'react';

interface StatusBadgeProps {
  status: string;
  type?: 'campaign' | 'application' | 'deliverable' | 'payment';
}

export function StatusBadge({ status, type = 'campaign' }: StatusBadgeProps) {
  // Respecting frontend-design zero-pill rule: subtle typographic badge with text label and unboxed appearance
  let label = status;
  let textClass = 'text-neutral-700 bg-neutral-100 border-neutral-200';

  if (type === 'campaign') {
    switch (status) {
      case 'active':
        label = 'En cours';
        textClass = 'text-emerald-700 bg-emerald-50/80 border-emerald-200/60';
        break;
      case 'paused':
        label = 'En pause';
        textClass = 'text-amber-700 bg-amber-50/80 border-amber-200/60';
        break;
      case 'completed':
        label = 'Terminée';
        textClass = 'text-neutral-600 bg-neutral-100 border-neutral-200';
        break;
      case 'draft':
        label = 'Brouillon';
        textClass = 'text-neutral-500 bg-neutral-50 border-neutral-200';
        break;
    }
  } else if (type === 'application') {
    switch (status) {
      case 'accepted':
        label = 'Acceptée';
        textClass = 'text-emerald-700 bg-emerald-50/80 border-emerald-200/60';
        break;
      case 'pending':
        label = 'En attente';
        textClass = 'text-amber-700 bg-amber-50/80 border-amber-200/60';
        break;
      case 'rejected':
        label = 'Refusée';
        textClass = 'text-rose-700 bg-rose-50/80 border-rose-200/60';
        break;
      case 'cancelled':
        label = 'Annulée';
        textClass = 'text-neutral-500 bg-neutral-100 border-neutral-200';
        break;
    }
  } else if (type === 'deliverable') {
    switch (status) {
      case 'approved':
        label = 'Validé & Rémunéré';
        textClass = 'text-emerald-700 bg-emerald-50/80 border-emerald-200/60';
        break;
      case 'submitted':
        label = 'En cours d’examen';
        textClass = 'text-indigo-700 bg-indigo-50/80 border-indigo-200/60';
        break;
      case 'revision_requested':
        label = 'Correction demandée';
        textClass = 'text-amber-700 bg-amber-50/80 border-amber-200/60';
        break;
      case 'rejected':
        label = 'Rejeté';
        textClass = 'text-rose-700 bg-rose-50/80 border-rose-200/60';
        break;
    }
  } else if (type === 'payment') {
    switch (status) {
      case 'completed':
        label = 'Exécuté';
        textClass = 'text-emerald-700 bg-emerald-50/80 border-emerald-200/60';
        break;
      case 'pending':
        label = 'En traitement';
        textClass = 'text-amber-700 bg-amber-50/80 border-amber-200/60';
        break;
      case 'failed':
        label = 'Échec';
        textClass = 'text-rose-700 bg-rose-50/80 border-rose-200/60';
        break;
    }
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium border rounded-md ${textClass}`}
    >
      {label}
    </span>
  );
}
