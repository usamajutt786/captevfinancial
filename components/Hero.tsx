'use client';

import React from 'react';
import Image from 'next/image';
import { useApp } from '../context/AppContext';
import { ArrowRight, ShieldCheck, Compass, Anchor, Clock } from 'lucide-react';

export default function Hero() {
  const { setActiveTab, openBookingModal } = useApp();

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#08090C] border-b border-white/[0.08]">
      {/* Background Image with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="Aureus luxury transportation fleet, private jet and executive Cadillac Escalade"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Multilayered Luxury Scrim: deep obsidian vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/65 to-[#08090C]/40" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#08090C]/50 to-[#08090C]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 flex flex-col items-center text-center">
        
        {/* Subtle Brand Kicker */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-[#C5A880]">
          <span>Executive Fleet</span>
          <span aria-hidden="true" className="text-neutral-500">·</span>
          <span>Superyachts</span>
          <span aria-hidden="true" className="text-neutral-500">·</span>
          <span>Curated Excursions</span>
        </div>

        {/* Marquee Headline */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-5xl leading-[1.08] text-balance">
          The Art of Seamless Transit. Private Fleet, Yachts & Bespoke Excursions.
        </h1>

        {/* Narrative Deck */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl font-light leading-relaxed">
          From private jet airstair tarmac meets in black Cadillac Escalade ESVs to 74-foot motor yacht charters and helicopter vineyard tastings. One unified concierge standard for the world’s most demanding itineraries.
        </p>

        {/* Dual Primary CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => openBookingModal(null)}
            className="w-full sm:w-auto px-8 py-4 text-xs font-semibold tracking-widest uppercase bg-[#C5A880] text-[#0A0D14] hover:bg-[#D6BA93] active:scale-[0.98] transition-all rounded shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Book an Experience</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveTab('chauffeur')}
            className="w-full sm:w-auto px-8 py-4 text-xs font-semibold tracking-widest uppercase text-white bg-white/5 hover:bg-white/10 border border-white/20 hover:border-[#C5A880]/50 transition-all rounded flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Explore Services & Fleet</span>
          </button>
        </div>

        {/* Four Trust Metrics in Hairline Container */}
        <div className="mt-16 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-left">
          <div className="flex items-start gap-3 p-2">
            <ShieldCheck className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-white">Vetted Security</p>
              <p className="text-[11px] text-neutral-400">Chauffeurs with NDA & background clearance</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2">
            <Anchor className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-white">USCG Masters</p>
              <p className="text-[11px] text-neutral-400">Licensed captains & white-glove stewardess crew</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2">
            <Clock className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-white">FBO Tarmac Access</p>
              <p className="text-[11px] text-neutral-400">Ramp pass direct to private aircraft airstairs</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2">
            <Compass className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-white">24/7 VIP Desk</p>
              <p className="text-[11px] text-neutral-400">Dedicated private concierge on every journey</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
