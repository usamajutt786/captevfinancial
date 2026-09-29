'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { Compass, CalendarCheck, CreditCard, Award, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const { openBookingModal } = useApp();

  const steps = [
    {
      step: '01',
      title: 'Curate Your Journey',
      icon: Compass,
      desc: 'Browse our executive sedan fleet, black Cadillac Escalade ESVs, private motor yachts, or bespoke coastal excursions.'
    },
    {
      step: '02',
      title: 'Specify Details & Extras',
      icon: CalendarCheck,
      desc: 'Select preferred dates, flight tail numbers, guest counts, and premier add-ons such as vintage Dom Pérignon or FBO tarmac permits.'
    },
    {
      step: '03',
      title: 'Instant Confirmation',
      icon: CreditCard,
      desc: 'Submit seamlessly through our simulated secure portal or generate a concierge payment link for your corporate accounts team.'
    },
    {
      step: '04',
      title: 'Executive Execution',
      icon: Award,
      desc: 'Receive immediate voucher confirmation. Your dedicated chauffeur or yacht captain stages 15 minutes ahead of schedule.'
    }
  ];

  return (
    <section className="w-full bg-[#050608] py-24 border-b border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
            Frictionless Protocol
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            How The Journey Unfolds
          </h2>
          <p className="mt-4 text-sm text-neutral-400">
            A streamlined 4-step reservation experience crafted for effortless luxury travel coordination.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative p-6 rounded-lg bg-[#0F121A] border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-sm font-bold text-[#C5A880]">
                      {item.step}
                    </span>
                    <Icon className="w-5 h-5 text-neutral-400" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-xs text-neutral-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-14 text-center">
          <button
            onClick={() => openBookingModal(null)}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-xs font-semibold tracking-widest uppercase bg-[#C5A880] text-black hover:bg-[#D6BA93] rounded transition-all cursor-pointer"
          >
            <span>Begin Reservation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
