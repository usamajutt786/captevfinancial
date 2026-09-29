'use client';

import React from 'react';
import { ShieldCheck, Sparkles, Clock, KeyRound, Compass, CreditCard } from 'lucide-react';

export default function WhyChooseUs() {
  const pillars = [
    {
      number: '01',
      title: 'Discreet Certified Chauffeurs',
      icon: ShieldCheck,
      description: 'Career professionals certified in high-consequence defensive driving, airport security protocol, and strict client privacy agreements.'
    },
    {
      number: '02',
      title: 'Flawless 2025 Fleet & Vessels',
      icon: KeyRound,
      description: 'Never a substituted vehicle. All Cadillac Escalade ESVs, Maybach sedans, and Sunseeker yachts are owned, meticulously detailed, and maintained to museum standard.'
    },
    {
      number: '03',
      title: 'Door-to-Tarmac Integration',
      icon: Clock,
      description: 'Active ramp and FBO security credentials allowing direct aircraft-side tarmac greetings across Signature Flight Support, Atlantic Aviation, and Jet Aviation.'
    },
    {
      number: '04',
      title: 'Curated Multi-Modal Itineraries',
      icon: Compass,
      description: 'From coordinated helicopter-to-vineyard transfers to private yacht sunset charters with onboard Michelin-trained private chefs.'
    },
    {
      number: '05',
      title: 'Bespoke Concierge 24/7/365',
      icon: Sparkles,
      description: 'A single human concierge assigned to oversee your trip from initial booking through your final safe arrival, with real-time schedule adaptations.'
    },
    {
      number: '06',
      title: 'Transparent Private Billing',
      icon: CreditCard,
      description: 'Itemized transparent invoicing with simulated instant reservation checkout or dedicated corporate payment links and wire transfer reconciliation.'
    }
  ];

  return (
    <section className="w-full bg-[#08090C] py-24 border-b border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
            The Aureus Standard
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Why Discerning Clients Entrust Us
          </h2>
          <p className="mt-4 text-sm text-neutral-400 leading-relaxed">
            In an industry of third-party brokered rides and unverified gig contractors, Aureus operates an uncompromising hospitality standard anchored in rigorous vetting, proprietary fleet ownership, and flawless operational execution.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.number}
                className="p-8 rounded-lg bg-[#0F121A] border border-white/10 hover:border-[#C5A880]/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-semibold tracking-wider text-[#C5A880]">
                      {p.number}
                    </span>
                    <Icon className="w-5 h-5 text-neutral-400" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-xs text-neutral-400 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
