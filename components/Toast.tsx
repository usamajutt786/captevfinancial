'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Info, Sparkles, X } from 'lucide-react';

export default function Toast() {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-lg border shadow-2xl backdrop-blur-md transition-all duration-300 animate-fadeIn ${
            toast.type === 'success'
              ? 'bg-[#0F1E17]/95 border-emerald-500/40 text-emerald-200'
              : toast.type === 'gold'
              ? 'bg-[#1A1610]/95 border-[#C5A880]/50 text-[#F4E9DC]'
              : 'bg-[#12151D]/95 border-white/20 text-neutral-200'
          }`}
        >
          <div className="flex items-center gap-2.5 text-xs">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : toast.type === 'gold' ? (
              <Sparkles className="w-4 h-4 text-[#C5A880] shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-sky-400 shrink-0" />
            )}
            <span className="font-medium leading-tight">{toast.message}</span>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer shrink-0"
            aria-label="Dismiss toast"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
