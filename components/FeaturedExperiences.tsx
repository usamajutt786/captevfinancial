'use client';

import React from 'react';
import Image from 'next/image';
import { useApp } from '../context/AppContext';
import { EXCURSIONS, VEHICLE_FLEET, BOAT_CHARTERS } from '../data/mockData';
import { Heart, Star, Clock, Users, MapPin, ArrowRight } from 'lucide-react';
import { ExcursionItem } from '../types';

export default function FeaturedExperiences() {
  const {
    openBookingModal,
    setSelectedExperienceForDetail,
    toggleSaved,
    isSaved,
    setActiveTab
  } = useApp();

  return (
    <section className="w-full bg-[#050608] py-24 border-b border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
              Handcrafted Itineraries
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Featured Luxury Experiences
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('excursions')}
            className="text-xs font-semibold tracking-widest uppercase text-[#C5A880] hover:text-[#D6BA93] flex items-center gap-2 group transition-colors"
          >
            <span>View All Curated Itineraries</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {EXCURSIONS.map((exc) => {
            const saved = isSaved(exc.id);
            return (
              <div
                key={exc.id}
                className="group relative flex flex-col md:flex-row rounded-lg bg-[#0F121A] border border-white/10 hover:border-[#C5A880]/50 transition-all duration-300 overflow-hidden"
              >
                {/* Visual Half */}
                <div className="relative w-full md:w-5/12 aspect-[4/3] md:aspect-auto overflow-hidden bg-neutral-900 shrink-0">
                  <Image
                    src={exc.image}
                    alt={exc.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 35vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F121A] md:bg-gradient-to-r md:from-transparent md:to-[#0F121A]" />
                  
                  {/* Favorite Save Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaved(exc.id, exc.title);
                    }}
                    className="absolute top-3 left-3 p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:text-[#C5A880] border border-white/10 transition-colors z-10 cursor-pointer"
                    aria-label={saved ? 'Remove from saved' : 'Save experience'}
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        saved ? 'fill-[#C5A880] text-[#C5A880]' : 'text-white'
                      }`}
                    />
                  </button>

                  <div className="absolute bottom-3 left-3 md:hidden flex items-center gap-1.5 text-xs text-amber-300 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{exc.rating.toFixed(2)}</span>
                    <span className="text-neutral-400">({exc.reviewCount})</span>
                  </div>
                </div>

                {/* Details Half */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    {/* Unboxed Metadata Line with typographic separators */}
                    <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
                      <span className="text-[#C5A880]">{exc.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-neutral-400" />
                        {exc.destination}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-white group-hover:text-[#C5A880] transition-colors line-clamp-2">
                      {exc.title}
                    </h3>

                    <p className="mt-3 text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                      {exc.description}
                    </p>

                    {/* Operational metrics */}
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-neutral-300 border-t border-white/5 pt-3">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>{exc.durationHours} Hours Duration</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>Up to {exc.maxGuests} Guests</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Action row */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[10px] tracking-wider uppercase text-neutral-400">Starting from</p>
                      <p className="text-lg font-bold text-white tabular-nums">
                        ${exc.pricePerPerson} <span className="text-xs font-normal text-neutral-400">/ guest</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedExperienceForDetail(exc)}
                        className="px-3 py-2 text-xs text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-colors cursor-pointer"
                      >
                        Details
                      </button>

                      <button
                        onClick={() => openBookingModal(exc)}
                        className="px-4 py-2 text-xs font-semibold tracking-wider uppercase text-black bg-[#C5A880] hover:bg-[#D6BA93] rounded transition-all cursor-pointer"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
