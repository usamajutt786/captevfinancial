'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useApp } from '../context/AppContext';
import { EXCURSIONS } from '../data/mockData';
import { 
  Compass, 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  Heart, 
  SlidersHorizontal, 
  ArrowUpDown,
  Check
} from 'lucide-react';
import { ExcursionItem } from '../types';

export default function ExcursionsView() {
  const { openBookingModal, setSelectedExperienceForDetail, toggleSaved, isSaved } = useApp();

  // Filters
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [destinationFilter, setDestinationFilter] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [minGuests, setMinGuests] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'rating'>('recommended');

  const categories = ['all', 'Wine & Culinary', 'Coastal & Marine', 'VIP Nightlife', 'City & Culture'];
  const destinations = ['all', 'Santa Ynez Valley & Pacific Coastline', 'Private Coastal Bay & Outer Isles', 'Metropolitan Arts & Entertainment District', 'Private FBO Airfields & Major Metropolitan Airports'];

  const filteredAndSortedExcursions = useMemo(() => {
    const list = EXCURSIONS.filter((exc) => {
      if (categoryFilter !== 'all' && exc.category !== categoryFilter) return false;
      if (destinationFilter !== 'all' && exc.destination !== destinationFilter) return false;
      if (exc.pricePerPerson > maxPrice) return false;
      if (exc.maxGuests < minGuests) return false;
      return true;
    });

    return list.sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePerPerson - b.pricePerPerson;
      if (sortBy === 'price-desc') return b.pricePerPerson - a.pricePerPerson;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // recommended
    });
  }, [categoryFilter, destinationFilter, maxPrice, minGuests, sortBy]);

  return (
    <div className="w-full bg-[#08090C] text-neutral-300">
      
      {/* Hero Header */}
      <div className="relative w-full min-h-[50vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        <Image
          src="/images/excursion.jpg"
          alt="Curated Private Excursions"
          fill
          priority
          className="object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/65 to-black/40" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#C5A880] mb-3">
            Rare Travel Programs
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight max-w-4xl mx-auto">
            Curated Private Excursions
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
            Immersive, door-to-door VIP itineraries seamlessly combining helicopter aviation, private estate wine tastings, sunset superyacht cruising, and velvet-rope nightlife access.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Marketplace Filter & Sorting Bar */}
        <div className="p-6 rounded-lg bg-[#0F121A] border border-white/10 mb-12 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C5A880]">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Excursion Discovery Filters</span>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
              <span className="text-neutral-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-black/60 border border-white/10 rounded px-2.5 py-1 text-white focus:outline-none focus:border-[#C5A880]"
              >
                <option value="recommended">Featured / Curated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Guest Rating</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Category */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                Experience Theme
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
              >
                <option value="all">All Experience Themes</option>
                <option value="Wine & Culinary">Wine & Culinary</option>
                <option value="Coastal & Marine">Coastal & Marine</option>
                <option value="VIP Nightlife">VIP Nightlife</option>
                <option value="City & Culture">City & Culture</option>
              </select>
            </div>

            {/* Destination */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                Destination Corridor
              </label>
              <select
                value={destinationFilter}
                onChange={(e) => setDestinationFilter(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
              >
                <option value="all">All Destinations</option>
                <option value="Santa Ynez Valley & Pacific Coastline">Santa Ynez & Pacific Coast</option>
                <option value="Private Coastal Bay & Outer Isles">Coastal Bay & Outer Isles</option>
                <option value="Metropolitan Arts & Entertainment District">Metropolitan Arts & Nightlife</option>
                <option value="Private FBO Airfields & Major Metropolitan Airports">Private FBO Airfields</option>
              </select>
            </div>

            {/* Max Price */}
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                <span className="uppercase tracking-wider">Max Price / Guest</span>
                <span className="text-white font-mono font-semibold">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="250"
                max="1000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#C5A880] cursor-pointer"
              />
            </div>

            {/* Minimum Guests */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                Group Size Capacity
              </label>
              <select
                value={minGuests}
                onChange={(e) => setMinGuests(Number(e.target.value))}
                className="w-full bg-black/50 border border-white/10 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
              >
                <option value="0">Any Party Size</option>
                <option value="4">At least 4 Guests</option>
                <option value="6">At least 6 Guests</option>
                <option value="8">At least 8 Guests</option>
              </select>
            </div>

          </div>
        </div>

        {/* Excursions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredAndSortedExcursions.map((exc) => {
            const saved = isSaved(exc.id);
            return (
              <div
                key={exc.id}
                className="group rounded-lg bg-[#0F121A] border border-white/10 hover:border-[#C5A880]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Visual Header */}
                <div className="relative aspect-[16/10] w-full bg-neutral-900">
                  <Image
                    src={exc.image}
                    alt={exc.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F121A] via-transparent to-black/30" />

                  {/* Save toggle */}
                  <button
                    onClick={() => toggleSaved(exc.id, exc.title)}
                    className="absolute top-3 left-3 p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:text-[#C5A880] border border-white/10 transition-colors"
                    aria-label="Save excursion"
                  >
                    <Heart className={`w-4 h-4 ${saved ? 'fill-[#C5A880] text-[#C5A880]' : 'text-white'}`} />
                  </button>

                  <div className="absolute top-3 right-3 text-xs bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-white border border-white/10 tabular-nums">
                    ${exc.pricePerPerson} / guest
                  </div>

                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-amber-300 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{exc.rating.toFixed(2)}</span>
                    <span className="text-neutral-400">({exc.reviewCount} client reviews)</span>
                  </div>
                </div>

                {/* Details */}
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

                    {/* Operational metrics */}
                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-neutral-300">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>{exc.durationHours} Hours Duration</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>Up to {exc.maxGuests} Guests</span>
                      </div>
                      <div>
                        <span className="text-neutral-400">Private Group: </span>
                        <strong className="text-white">${exc.privateGroupPrice}</strong>
                      </div>
                    </div>

                    {/* Highlights bullet points */}
                    <div className="mt-4 space-y-1.5 text-xs text-neutral-300 border-t border-white/5 pt-3">
                      {exc.highlights.slice(0, 3).map((h, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
                    <button
                      onClick={() => setSelectedExperienceForDetail(exc)}
                      className="flex-1 py-2.5 text-xs text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-colors text-center cursor-pointer"
                    >
                      Full Itinerary
                    </button>
                    <button
                      onClick={() => openBookingModal(exc)}
                      className="flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#C5A880] text-black hover:bg-[#D6BA93] rounded transition-all text-center cursor-pointer"
                    >
                      Book Excursion
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {filteredAndSortedExcursions.length === 0 && (
          <div className="text-center py-16 bg-[#0F121A] rounded-lg border border-white/10">
            <p className="text-neutral-400 text-sm">No excursions match your current filter settings.</p>
            <button
              onClick={() => {
                setCategoryFilter('all');
                setDestinationFilter('all');
                setMaxPrice(1000);
                setMinGuests(0);
              }}
              className="mt-4 px-4 py-2 text-xs uppercase tracking-wider font-semibold text-[#C5A880] hover:underline"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
