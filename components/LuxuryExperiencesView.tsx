'use client';

import React from 'react';
import Image from 'next/image';
import { useApp } from '../context/AppContext';
import { EXCURSIONS } from '../data/mockData';
import { Star, Clock, Users, MapPin, Heart, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LuxuryExperiencesView() {
  const { openBookingModal, setSelectedExperienceForDetail, toggleSaved, isSaved, setActiveTab } = useApp();

  return (
    <div className="w-full bg-[#08090C] text-neutral-300">
      
      {/* Hero Header */}
      <div className="relative w-full min-h-[50vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        <Image
          src="/images/service_superyacht_1790717635836.jpg"
          alt="VIP Curated Luxury Experiences"
          fill
          priority
          className="object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/65 to-black/40" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#C5A880] mb-3">
            High-Touch Hospitality Programs
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight max-w-4xl mx-auto">
            Signature VIP Experiences
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
            Exclusive multi-sensory experiences curated for private celebrations, corporate delegations, and high-profile visits with guaranteed reservations and dedicated mobility.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {EXCURSIONS.map((exc) => {
            const saved = isSaved(exc.id);
            return (
              <div
                key={exc.id}
                className="group rounded-lg bg-[#0F121A] border border-white/10 hover:border-[#C5A880]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] w-full bg-neutral-900">
                  <Image
                    src={exc.image}
                    alt={exc.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F121A] via-transparent to-black/30" />
                  
                  <button
                    onClick={() => toggleSaved(exc.id, exc.title)}
                    className="absolute top-3 left-3 p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:text-[#C5A880] border border-white/10 transition-colors cursor-pointer"
                    aria-label="Save experience"
                  >
                    <Heart className={`w-4 h-4 ${saved ? 'fill-[#C5A880] text-[#C5A880]' : 'text-white'}`} />
                  </button>

                  <div className="absolute top-3 right-3 text-xs bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-white border border-white/10 tabular-nums">
                    ${exc.pricePerPerson} / guest
                  </div>

                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-amber-300 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{exc.rating.toFixed(2)}</span>
                    <span className="text-neutral-400">({exc.reviewCount})</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
                      <span className="text-[#C5A880]">{exc.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-neutral-400" />
                        {exc.destination}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-white group-hover:text-[#C5A880] transition-colors">
                      {exc.title}
                    </h3>
                    <p className="mt-2 text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                      {exc.description}
                    </p>

                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-neutral-300">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                        {exc.durationHours} Hours Duration
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#C5A880]" />
                        Up to {exc.maxGuests} Guests
                      </span>
                    </div>

                    <div className="mt-4 space-y-1.5 text-xs text-neutral-300 border-t border-white/5 pt-3">
                      {exc.highlights.slice(0, 3).map((h, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
                    <button
                      onClick={() => setSelectedExperienceForDetail(exc)}
                      className="flex-1 py-2.5 text-xs text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-colors text-center cursor-pointer"
                    >
                      View Itinerary
                    </button>
                    <button
                      onClick={() => openBookingModal(exc)}
                      className="flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#C5A880] text-black hover:bg-[#D6BA93] rounded transition-all text-center cursor-pointer"
                    >
                      Reserve VIP Package
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Custom Experience Banner */}
        <div className="p-8 sm:p-12 rounded-xl bg-gradient-to-r from-[#0F121A] via-[#151924] to-[#0F121A] border border-[#C5A880]/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#C5A880]">
              Looking for Something Beyond the Standard?
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Request a Custom Multi-City Program
            </h3>
            <p className="text-xs text-neutral-400 max-w-xl leading-relaxed">
              We design comprehensive solutions involving private aviation charter, maritime staging, and close executive protection across North America and Europe.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('custom')}
            className="px-6 py-3.5 text-xs font-semibold uppercase tracking-widest bg-[#C5A880] text-black hover:bg-[#D6BA93] rounded whitespace-nowrap cursor-pointer"
          >
            Design Custom Itinerary
          </button>
        </div>

      </div>
    </div>
  );
}
