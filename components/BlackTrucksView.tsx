'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useApp } from '../context/AppContext';
import { VEHICLE_FLEET } from '../data/mockData';
import { Users, Briefcase, Shield, SlidersHorizontal, ArrowRight, Heart, Check } from 'lucide-react';
import { Vehicle } from '../types';

export default function BlackTrucksView() {
  const { openBookingModal, setSelectedExperienceForDetail, toggleSaved, isSaved } = useApp();

  // Filter States
  const [capacityFilter, setCapacityFilter] = useState<'all' | '4' | '6' | '7+'>('all');
  const [classFilter, setClassFilter] = useState<string>('all');
  const [maxHourlyPrice, setMaxHourlyPrice] = useState<number>(300);

  // All trucks / SUVs
  const allTrucks = VEHICLE_FLEET.filter((v) => v.category === 'black-truck' || v.classType === 'Executive SUV' || v.classType === 'Luxury Sprinter');

  const filteredTrucks = useMemo(() => {
    return allTrucks.filter((truck) => {
      // Capacity
      if (capacityFilter === '4' && truck.passengerCapacity !== 4) return false;
      if (capacityFilter === '6' && truck.passengerCapacity !== 6) return false;
      if (capacityFilter === '7+' && truck.passengerCapacity < 7) return false;

      // Class
      if (classFilter !== 'all' && truck.classType !== classFilter) return false;

      // Price
      if (truck.hourlyRate > maxHourlyPrice) return false;

      return true;
    });
  }, [allTrucks, capacityFilter, classFilter, maxHourlyPrice]);

  return (
    <div className="w-full bg-[#08090C] text-neutral-300">
      
      {/* Hero Header */}
      <div className="relative w-full min-h-[50vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        <Image
          src="/images/black_suv.jpg"
          alt="Luxury Black Truck and SUV Fleet"
          fill
          priority
          className="object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/70 to-black/50" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#C5A880] mb-3">
            Onyx Presence & Heavy Capability
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight max-w-4xl mx-auto">
            Black Truck & Executive SUV Fleet
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
            Command the boulevard with 2025 Cadillac Escalade ESVs, Yukon Denali Ultimates, and Range Rover SVs. Tinted acoustic privacy glass, captain seating, and uncompromising road authority.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Interactive Filter Bar */}
        <div className="p-6 rounded-lg bg-[#0F121A] border border-white/10 mb-12 space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C5A880]">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Fleet Search & Filter</span>
            </div>
            <span className="text-xs text-neutral-400 tabular-nums">
              Showing {filteredTrucks.length} of {allTrucks.length} executive vehicles
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Passenger Capacity */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                Passenger Capacity
              </label>
              <div className="flex items-center gap-1.5 p-1 bg-black/50 border border-white/10 rounded-md">
                {(['all', '4', '6', '7+'] as const).map((cap) => (
                  <button
                    key={cap}
                    onClick={() => setCapacityFilter(cap)}
                    className={`flex-1 py-1.5 text-xs font-medium rounded transition-colors ${
                      capacityFilter === cap
                        ? 'bg-[#C5A880] text-black font-semibold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {cap === 'all' ? 'All' : `${cap} Seats`}
                  </button>
                ))}
              </div>
            </div>

            {/* Vehicle Class */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                Vehicle Class
              </label>
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
              >
                <option value="all">All Vehicle Classes</option>
                <option value="Executive SUV">Executive SUV (Escalade / Yukon)</option>
                <option value="Luxury Sprinter">Luxury Sprinter Jet-Class</option>
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
                min="160"
                max="300"
                step="10"
                value={maxHourlyPrice}
                onChange={(e) => setMaxHourlyPrice(Number(e.target.value))}
                className="w-full accent-[#C5A880] cursor-pointer"
              />
            </div>

          </div>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTrucks.map((truck) => {
            const saved = isSaved(truck.id);
            return (
              <div
                key={truck.id}
                className="group rounded-lg bg-[#0F121A] border border-white/10 hover:border-[#C5A880]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] w-full bg-neutral-900">
                  <Image
                    src={truck.image}
                    alt={truck.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F121A] via-transparent to-black/30" />

                  {/* Save toggle */}
                  <button
                    onClick={() => toggleSaved(truck.id, truck.name)}
                    className="absolute top-3 left-3 p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:text-[#C5A880] border border-white/10 transition-colors"
                    aria-label="Save vehicle"
                  >
                    <Heart className={`w-4 h-4 ${saved ? 'fill-[#C5A880] text-[#C5A880]' : 'text-white'}`} />
                  </button>

                  <div className="absolute top-3 right-3 text-xs bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-white border border-white/10 tabular-nums">
                    ${truck.hourlyRate}/hr · ${truck.dailyRate}/day
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C5A880]">
                      {truck.classType}
                    </span>
                    <h3 className="font-display text-xl font-bold text-white mt-1 group-hover:text-[#C5A880] transition-colors">
                      {truck.name}
                    </h3>
                    <p className="mt-2 text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                      {truck.description}
                    </p>

                    {/* Features breakdown */}
                    <div className="mt-4 pt-4 border-t border-white/5 space-y-2 text-xs text-neutral-300">
                      <div className="flex items-center justify-between text-neutral-400">
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-[#C5A880]" />
                          Capacity
                        </span>
                        <strong className="text-white">{truck.passengerCapacity} Passengers</strong>
                      </div>
                      <div className="flex items-center justify-between text-neutral-400">
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-[#C5A880]" />
                          Luggage
                        </span>
                        <strong className="text-white">{truck.luggageCapacity} Full-Size Bags</strong>
                      </div>
                      <div className="flex items-center justify-between text-neutral-400">
                        <span className="flex items-center gap-1.5">
                          <Shield className="w-3.5 h-3.5 text-[#C5A880]" />
                          Min Booking
                        </span>
                        <strong className="text-white">{truck.minimumHours} Hours</strong>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
                    <button
                      onClick={() => setSelectedExperienceForDetail(truck)}
                      className="flex-1 py-2 text-xs text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-colors text-center cursor-pointer"
                    >
                      Specifications
                    </button>
                    <button
                      onClick={() => openBookingModal(truck)}
                      className="flex-1 py-2 text-xs font-semibold uppercase tracking-wider bg-[#C5A880] text-black hover:bg-[#D6BA93] rounded transition-all text-center cursor-pointer"
                    >
                      Reserve Fleet
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {filteredTrucks.length === 0 && (
          <div className="text-center py-16 bg-[#0F121A] rounded-lg border border-white/10">
            <p className="text-neutral-400 text-sm">No vehicles match your active filter criteria.</p>
            <button
              onClick={() => {
                setCapacityFilter('all');
                setClassFilter('all');
                setMaxHourlyPrice(300);
              }}
              className="mt-4 px-4 py-2 text-xs uppercase tracking-wider font-semibold text-[#C5A880] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
