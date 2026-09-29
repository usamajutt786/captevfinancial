'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useApp } from '../context/AppContext';
import { VEHICLE_FLEET, BOAT_CHARTERS, EXCURSIONS } from '../data/mockData';
import { Search, X, ArrowRight, Star, Clock } from 'lucide-react';

export default function SearchModal() {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    openBookingModal, 
    setSelectedExperienceForDetail 
  } = useApp();

  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return { vehicles: [], boats: [], excursions: [] };
    }
    const q = query.toLowerCase();

    const vehicles = VEHICLE_FLEET.filter((v) =>
      v.name.toLowerCase().includes(q) ||
      v.description.toLowerCase().includes(q) ||
      v.classType.toLowerCase().includes(q) ||
      v.category.toLowerCase().includes(q) ||
      (q === 'suv' && v.classType === 'Executive SUV') ||
      (q === 'truck' && v.category === 'black-truck') ||
      (q === 'chauffeur' && v.category === 'chauffeur') ||
      (q === 'airport' && (v.description.toLowerCase().includes('airport') || v.features.some(f => f.toLowerCase().includes('water'))))
    );

    const boats = BOAT_CHARTERS.filter((b) =>
      b.name.toLowerCase().includes(q) ||
      b.boatType.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q) ||
      b.location.toLowerCase().includes(q) ||
      (q === 'yacht' || q === 'boat' || q === 'charter')
    );

    const excursions = EXCURSIONS.filter((e) =>
      e.title.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q) ||
      e.destination.toLowerCase().includes(q) ||
      (q === 'excursion' || q === 'tour' || q === 'wine' || q === 'helo')
    );

    return { vehicles, boats, excursions };
  }, [query]);

  if (!isSearchOpen) return null;

  const totalMatches = searchResults.vehicles.length + searchResults.boats.length + searchResults.excursions.length;

  const quickPillTerms = ['Airport', 'Escalade SUV', 'Yacht', 'Chauffeur', 'Helicopter Wine', 'Maybach'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 pt-16 sm:pt-24 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-xl bg-[#0F121A] border border-white/20 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center gap-3 bg-black/50">
          <Search className="w-5 h-5 text-[#C5A880] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search private fleet, yachts, airport transfers, excursions..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-neutral-400 hover:text-white rounded text-xs cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-white rounded-md bg-white/5 transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 sm:px-6 py-2.5 bg-black/20 border-b border-white/5 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-neutral-500 text-[10px] uppercase tracking-wider shrink-0">Popular:</span>
          {quickPillTerms.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/5 text-[11px] whitespace-nowrap cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {!query.trim() ? (
            <div className="text-center py-12 text-neutral-400 text-xs">
              <p>Type keywords to search across our luxury ground fleet, private yacht charters, and curated excursions.</p>
            </div>
          ) : totalMatches === 0 ? (
            <div className="text-center py-12 text-neutral-400 text-xs">
              <p>No experiences matching &ldquo;{query}&rdquo;. Try &quot;SUV&quot;, &quot;Boat&quot;, or &quot;Airport&quot;.</p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Vehicles */}
              {searchResults.vehicles.length > 0 && (
                <div className="space-y-3">
                  <p className="text-[10px] uppercase font-semibold tracking-widest text-[#C5A880]">
                    Fleet Vehicles ({searchResults.vehicles.length})
                  </p>
                  <div className="space-y-2">
                    {searchResults.vehicles.map((v) => (
                      <div
                        key={v.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSelectedExperienceForDetail(v);
                        }}
                        className="p-3 rounded-lg bg-[#181B24] border border-white/5 hover:border-[#C5A880]/50 transition-colors flex items-center justify-between gap-4 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-16 rounded overflow-hidden bg-neutral-900 shrink-0">
                            <Image src={v.image} alt={v.name} fill className="object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white">{v.name}</p>
                            <p className="text-[11px] text-neutral-400">{v.classType} · Up to {v.passengerCapacity} Guests</p>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-semibold text-[#C5A880] tabular-nums shrink-0">
                          ${v.hourlyRate}/hr
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Boats */}
              {searchResults.boats.length > 0 && (
                <div className="space-y-3">
                  <p className="text-[10px] uppercase font-semibold tracking-widest text-[#C5A880]">
                    Yachts & Vessels ({searchResults.boats.length})
                  </p>
                  <div className="space-y-2">
                    {searchResults.boats.map((b) => (
                      <div
                        key={b.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSelectedExperienceForDetail(b);
                        }}
                        className="p-3 rounded-lg bg-[#181B24] border border-white/5 hover:border-[#C5A880]/50 transition-colors flex items-center justify-between gap-4 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-16 rounded overflow-hidden bg-neutral-900 shrink-0">
                            <Image src={b.image} alt={b.name} fill className="object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white">{b.name}</p>
                            <p className="text-[11px] text-neutral-400">{b.boatType} · {b.capacity} Guests · {b.location}</p>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-semibold text-[#C5A880] tabular-nums shrink-0">
                          ${b.hourlyRate}/hr
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Excursions */}
              {searchResults.excursions.length > 0 && (
                <div className="space-y-3">
                  <p className="text-[10px] uppercase font-semibold tracking-widest text-[#C5A880]">
                    Curated Excursions ({searchResults.excursions.length})
                  </p>
                  <div className="space-y-2">
                    {searchResults.excursions.map((e) => (
                      <div
                        key={e.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSelectedExperienceForDetail(e);
                        }}
                        className="p-3 rounded-lg bg-[#181B24] border border-white/5 hover:border-[#C5A880]/50 transition-colors flex items-center justify-between gap-4 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-16 rounded overflow-hidden bg-neutral-900 shrink-0">
                            <Image src={e.image} alt={e.title} fill className="object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white">{e.title}</p>
                            <p className="text-[11px] text-neutral-400">{e.category} · {e.durationHours} Hours</p>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-semibold text-[#C5A880] tabular-nums shrink-0">
                          ${e.pricePerPerson}/guest
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
