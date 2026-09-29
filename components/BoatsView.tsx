'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useApp } from '../context/AppContext';
import { BOAT_CHARTERS } from '../data/mockData';
import { Anchor, Users, MapPin, Compass, ShieldCheck, Heart, SlidersHorizontal } from 'lucide-react';
import { BoatCharter } from '../types';

export default function BoatsView() {
  const { openBookingModal, setSelectedExperienceForDetail, toggleSaved, isSaved } = useApp();

  // Filters
  const [boatTypeFilter, setBoatTypeFilter] = useState<string>('all');
  const [minCapacity, setMinCapacity] = useState<number>(0);
  const [maxHourlyPrice, setMaxHourlyPrice] = useState<number>(1000);
  const [captainOnly, setCaptainOnly] = useState<boolean>(false);

  const filteredBoats = useMemo(() => {
    return BOAT_CHARTERS.filter((boat) => {
      if (boatTypeFilter !== 'all' && boat.boatType !== boatTypeFilter) return false;
      if (boat.capacity < minCapacity) return false;
      if (boat.hourlyRate > maxHourlyPrice) return false;
      if (captainOnly && !boat.captainIncluded) return false;
      return true;
    });
  }, [boatTypeFilter, minCapacity, maxHourlyPrice, captainOnly]);

  return (
    <div className="w-full bg-[#08090C] text-neutral-300">
      
      {/* Hero Header */}
      <div className="relative w-full min-h-[50vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        <Image
          src="/images/yacht.jpg"
          alt="Luxury Motor Yacht and Catamaran Charters"
          fill
          priority
          className="object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/65 to-black/40" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#C5A880] mb-3">
            Private Maritime Charters
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight max-w-4xl mx-auto">
            Private Motor Yachts & Catamarans
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
            From 74-foot Sunseeker tri-deck motor yachts to stable luxury power catamarans. Fully crewed with USCG Master Captains, personal stewardesses, SeaBobs, and gourmet hospitality.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Filter Controls */}
        <div className="p-6 rounded-lg bg-[#0F121A] border border-white/10 mb-12 space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C5A880]">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Yacht Fleet Search & Filters</span>
            </div>
            <span className="text-xs text-neutral-400 tabular-nums">
              Showing {filteredBoats.length} of {BOAT_CHARTERS.length} chartered vessels
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Vessel Type */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                Vessel Category
              </label>
              <select
                value={boatTypeFilter}
                onChange={(e) => setBoatTypeFilter(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
              >
                <option value="all">All Vessel Types</option>
                <option value="Motor Yacht">Motor Yacht</option>
                <option value="Express Cruiser">Express Cruiser</option>
                <option value="Luxury Catamaran">Luxury Power Catamaran</option>
              </select>
            </div>

            {/* Minimum Guests */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                Min. Guest Capacity
              </label>
              <select
                value={minCapacity}
                onChange={(e) => setMinCapacity(Number(e.target.value))}
                className="w-full bg-black/50 border border-white/10 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
              >
                <option value="0">Any Guest Count</option>
                <option value="8">8+ Guests</option>
                <option value="10">10+ Guests</option>
                <option value="12">12+ Guests</option>
              </select>
            </div>

            {/* Max Hourly Rate */}
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                <span className="uppercase tracking-wider">Max Hourly Rate</span>
                <span className="text-white font-mono font-semibold">${maxHourlyPrice} / hr</span>
              </div>
              <input
                type="range"
                min="500"
                max="1000"
                step="50"
                value={maxHourlyPrice}
                onChange={(e) => setMaxHourlyPrice(Number(e.target.value))}
                className="w-full accent-[#C5A880] cursor-pointer"
              />
            </div>

            {/* Captain Included Toggle */}
            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 p-2 bg-black/50 border border-white/10 rounded-md cursor-pointer text-xs text-white">
                <input
                  type="checkbox"
                  checked={captainOnly}
                  onChange={(e) => setCaptainOnly(e.target.checked)}
                  className="accent-[#C5A880] h-4 w-4"
                />
                <span>USCG Captain & Crew Included</span>
              </label>
            </div>

          </div>
        </div>

        {/* Yacht Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBoats.map((boat) => {
            const saved = isSaved(boat.id);
            return (
              <div
                key={boat.id}
                className="group rounded-lg bg-[#0F121A] border border-white/10 hover:border-[#C5A880]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] w-full bg-neutral-900">
                  <Image
                    src={boat.image}
                    alt={boat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F121A] via-transparent to-black/30" />

                  {/* Save toggle */}
                  <button
                    onClick={() => toggleSaved(boat.id, boat.name)}
                    className="absolute top-3 left-3 p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:text-[#C5A880] border border-white/10 transition-colors"
                    aria-label="Save yacht"
                  >
                    <Heart className={`w-4 h-4 ${saved ? 'fill-[#C5A880] text-[#C5A880]' : 'text-white'}`} />
                  </button>

                  <div className="absolute top-3 right-3 text-xs bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-white border border-white/10 tabular-nums">
                    ${boat.hourlyRate}/hr · Half Day: ${boat.halfDayRate}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
                      <span className="text-[#C5A880]">{boat.boatType}</span>
                      <span aria-hidden="true">·</span>
                      <span>{boat.lengthFeet} Feet Length</span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-white group-hover:text-[#C5A880] transition-colors">
                      {boat.name}
                    </h3>
                    <p className="mt-2 text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                      {boat.description}
                    </p>

                    {/* Operational metrics */}
                    <div className="mt-4 pt-4 border-t border-white/5 space-y-2 text-xs text-neutral-300">
                      <div className="flex items-center justify-between text-neutral-400">
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-[#C5A880]" />
                          Capacity
                        </span>
                        <strong className="text-white">{boat.capacity} Guests Max</strong>
                      </div>
                      <div className="flex items-center justify-between text-neutral-400">
                        <span className="flex items-center gap-1.5">
                          <Anchor className="w-3.5 h-3.5 text-[#C5A880]" />
                          Crew
                        </span>
                        <strong className="text-white">USCG Master + {boat.crewCount - 1} Crew</strong>
                      </div>
                      <div className="flex items-center justify-between text-neutral-400">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                          Location
                        </span>
                        <strong className="text-white">{boat.location}</strong>
                      </div>
                    </div>

                    {/* Amenities pills */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {boat.amenities.slice(0, 3).map((amenity, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] text-neutral-300 bg-white/5 px-2 py-0.5 rounded border border-white/5"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
                    <button
                      onClick={() => setSelectedExperienceForDetail(boat)}
                      className="flex-1 py-2 text-xs text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-colors text-center cursor-pointer"
                    >
                      Vessel Specs
                    </button>
                    <button
                      onClick={() => openBookingModal(boat)}
                      className="flex-1 py-2 text-xs font-semibold uppercase tracking-wider bg-[#C5A880] text-black hover:bg-[#D6BA93] rounded transition-all text-center cursor-pointer"
                    >
                      Charter Yacht
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
