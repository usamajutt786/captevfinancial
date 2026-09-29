'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, MessageSquare, PhoneCall } from 'lucide-react';

export default function CallToAction() {
  const { openBookingModal, setActiveTab, setIsChatbotOpen } = useApp();

  return (
    <section className="relative w-full bg-[#08090C] py-24 border-b border-white/[0.08] overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C5A880]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#C5A880]">
          Private Concierge Protocol
        </p>

        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight text-balance">
          Elevate Your Next Journey to Pure Distinction.
        </h2>

        <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed font-light">
          Whether chartering an executive Cadillac Escalade ESV fleet for a corporate delegation or commissioning a private yacht sunset dinner, our team coordinates every nuance.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => openBookingModal(null)}
            className="w-full sm:w-auto px-8 py-4 text-xs font-semibold tracking-widest uppercase bg-[#C5A880] text-black hover:bg-[#D6BA93] rounded transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Book Experience Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveTab('custom')}
            className="w-full sm:w-auto px-8 py-4 text-xs font-semibold tracking-widest uppercase text-white bg-white/5 hover:bg-white/10 border border-white/20 rounded transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Request Custom Itinerary</span>
          </button>

          <button
            onClick={() => setIsChatbotOpen(true)}
            className="w-full sm:w-auto px-6 py-4 text-xs font-semibold tracking-widest uppercase text-neutral-300 hover:text-white flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#C5A880]" />
            <span>Chat with Concierge</span>
          </button>
        </div>

        <div className="pt-6 flex items-center justify-center gap-6 text-xs text-neutral-400">
          <span className="flex items-center gap-1.5">
            <PhoneCall className="w-3.5 h-3.5 text-[#C5A880]" />
            Direct VIP Dispatch: +1 (800) 892-AUREUS
          </span>
          <span aria-hidden="true" className="text-neutral-700">·</span>
          <span>Response time &lt; 5 minutes</span>
        </div>
      </div>
    </section>
  );
}
