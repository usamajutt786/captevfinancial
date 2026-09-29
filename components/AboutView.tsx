'use client';

import React from 'react';
import Image from 'next/image';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Award, Compass, KeyRound, ArrowRight } from 'lucide-react';

export default function AboutView() {
  const { openBookingModal, setActiveTab } = useApp();

  return (
    <div className="w-full bg-[#08090C] text-neutral-300">
      
      {/* Hero Header */}
      <div className="relative w-full min-h-[50vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        <Image
          src="/images/hero.jpg"
          alt="Aureus Heritage and Philosophy"
          fill
          priority
          className="object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/75 to-black/50" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#C5A880] mb-3">
            Institutional Pedigree & Discretion
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight max-w-4xl mx-auto">
            The Aureus Standard
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
            Founded on the conviction that private mobility is the foundation of high-consequence business, rare leisure, and uncompromised peace of mind.
          </p>
        </div>
      </div>

      {/* Main Narrative */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        
        {/* Brand Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
              The Genesis
            </span>
            <h2 className="font-display text-3xl font-bold text-white">
              Born to Eliminate Compromise in Motion
            </h2>
            <p className="text-xs text-neutral-300 leading-relaxed">
              In an era dominated by algorithmic ride apps and fragmented luxury brokers, high-net-worth travelers faced inconsistent vehicles, undertrained drivers, and zero accountability between airports, villas, and yachts.
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Aureus was architected as an integrated ecosystem: proprietary ownership of the newest 2025 Cadillac Escalade ESVs, direct partnerships with licensed USCG Master yacht captains, and airside airport security credentials across the United States.
            </p>
          </div>

          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-neutral-900">
            <Image
              src="/images/service_black_suv_1790717621976.jpg"
              alt="Aureus Executive Cadillac Escalade Fleet"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Pillars of Hospitality */}
        <div className="border-t border-white/10 pt-16 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#C5A880]">
              Operational Pillars
            </p>
            <h2 className="font-display text-3xl font-bold text-white mt-1">
              Our Service Philosophy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg bg-[#0F121A] border border-white/10 space-y-3">
              <div className="h-10 w-10 rounded-md bg-[#C5A880]/10 flex items-center justify-center text-[#C5A880]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-white">Absolute Discretion</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                All chauffeurs, captains, and concierge coordinators sign legally binding confidentiality agreements. Privacy is our foremost currency.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-[#0F121A] border border-white/10 space-y-3">
              <div className="h-10 w-10 rounded-md bg-[#C5A880]/10 flex items-center justify-center text-[#C5A880]">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-white">Zero Substitution Rule</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                The exact vehicle, captain, or yacht specified in your reservation is what stages at your door. No downgrades or last-minute substitutes.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-[#0F121A] border border-white/10 space-y-3">
              <div className="h-10 w-10 rounded-md bg-[#C5A880]/10 flex items-center justify-center text-[#C5A880]">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-white">Proactive Logistics</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                We monitor air-traffic patterns, runway holding queues, marina dock tides, and urban congestion in real-time so you never wait.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-xl bg-black/40 border border-white/10 text-center space-y-4">
          <h3 className="font-display text-2xl font-bold text-white">
            Experience the Distinction Firsthand
          </h3>
          <p className="text-xs text-neutral-400 max-w-lg mx-auto">
            Contact our private concierge desk or begin your reservation directly online.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={() => openBookingModal(null)}
              className="px-6 py-3 text-xs font-semibold uppercase tracking-wider bg-[#C5A880] text-black hover:bg-[#D6BA93] rounded"
            >
              Reserve Private Journey
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
