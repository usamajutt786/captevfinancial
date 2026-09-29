'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '../context/AppContext';
import { VEHICLE_FLEET, FAQS } from '../data/mockData';
import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Calendar, 
  Users, 
  Car, 
  Check, 
  X as XIcon, 
  ArrowRight, 
  Loader2, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { Vehicle } from '../types';

export default function ChauffeurServicesView() {
  const { openBookingModal, setSelectedExperienceForDetail } = useApp();

  // Calculator Form State
  const [tripType, setTripType] = useState<'hourly' | 'point-to-point'>('point-to-point');
  const [pickup, setPickup] = useState('Signature Flight Support FBO, Runway 12');
  const [destination, setDestination] = useState('Faena Hotel Miami Beach Penthouse');
  const [date, setDate] = useState('2026-10-05');
  const [time, setTime] = useState('14:30');
  const [passengers, setPassengers] = useState(2);
  const [selectedVehicleId, setSelectedVehicleId] = useState(VEHICLE_FLEET[1].id); // Maybach
  const [hours, setHours] = useState(4);

  // Calculation Results & Loading State
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationResult, setCalculationResult] = useState<{
    estimatedMiles: number;
    estimatedDuration: string;
    baseFare: number;
    conciergeSurcharge: number;
    total: number;
    vehicle: Vehicle;
    availableDrivers: number;
  } | null>({
    estimatedMiles: 24,
    estimatedDuration: '45 mins transit + 60 min standby',
    baseFare: 660,
    conciergeSurcharge: 66,
    total: 726,
    vehicle: VEHICLE_FLEET[1],
    availableDrivers: 3
  });

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const chauffeurVehicles = VEHICLE_FLEET.filter((v) => v.category === 'chauffeur' || v.id === 'veh-cadillac-escalade-esv');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);

    setTimeout(() => {
      const vehicle = VEHICLE_FLEET.find((v) => v.id === selectedVehicleId) || VEHICLE_FLEET[1];
      const durationMultiplier = tripType === 'hourly' ? hours : vehicle.minimumHours;
      const base = vehicle.hourlyRate * durationMultiplier;
      const surcharge = Math.round(base * 0.1);

      setCalculationResult({
        estimatedMiles: tripType === 'hourly' ? hours * 18 : 28,
        estimatedDuration: tripType === 'hourly' ? `${hours} Hours Dedicated Service` : '50 Mins Transit + Wait Time',
        baseFare: base,
        conciergeSurcharge: surcharge,
        total: base + surcharge,
        vehicle,
        availableDrivers: 4
      });
      setIsCalculating(false);
    }, 900);
  };

  const handleProceedToBooking = () => {
    if (!calculationResult) return;
    openBookingModal(calculationResult.vehicle);
  };

  const chauffeurFaqs = FAQS.filter(f => f.category === 'Chauffeur & Fleet' || f.category === 'Booking & Reservations');

  return (
    <div className="w-full bg-[#08090C] text-neutral-300">
      
      {/* Hero Banner */}
      <div className="relative w-full min-h-[50vh] sm:min-h-[60vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        <Image
          src="/images/chauffeur.jpg"
          alt="Executive Chauffeur Service"
          fill
          priority
          className="object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/70 to-black/40" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#C5A880] mb-3">
            First-Class Ground Mobility
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight max-w-4xl mx-auto">
            Executive Chauffeur Services
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
            Punctual, discreet, and certified executive protection drivers. From private jet tarmac FBO intercepts to continuous hourly executive standby in bespoke Maybachs and Escalades.
          </p>
        </div>
      </div>

      {/* Main Content & Interactive Calculator */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-20">

        {/* Section: Calculator & Availability Engine */}
        <div className="rounded-xl bg-[#0F121A] border border-white/10 p-6 sm:p-10 shadow-2xl">
          <div className="mb-8">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#C5A880]">
              Instant Fare & Availability Estimator
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
              Configure Your Chauffeured Journey
            </h2>
          </div>

          <form onSubmit={handleCalculate} className="space-y-6">
            
            {/* Trip Type Selector */}
            <div className="flex items-center gap-2 p-1 bg-black/50 border border-white/10 rounded-lg max-w-xs">
              <button
                type="button"
                onClick={() => setTripType('point-to-point')}
                className={`flex-1 py-2 text-xs font-medium rounded transition-colors ${
                  tripType === 'point-to-point'
                    ? 'bg-[#C5A880] text-black font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Point-to-Point / Airport
              </button>
              <button
                type="button"
                onClick={() => setTripType('hourly')}
                className={`flex-1 py-2 text-xs font-medium rounded transition-colors ${
                  tripType === 'hourly'
                    ? 'bg-[#C5A880] text-black font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Hourly As-Directed
              </button>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Pickup */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                  Pickup Location / Airport FBO
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-[#C5A880]" />
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    required
                    className="w-full bg-[#181B24] border border-white/10 rounded-md pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              {/* Destination */}
              {tripType === 'point-to-point' ? (
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                    Drop-off Destination
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-[#C5A880]" />
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      required
                      className="w-full bg-[#181B24] border border-white/10 rounded-md pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                    Standby Duration (Hours)
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 w-4 h-4 text-[#C5A880]" />
                    <select
                      value={hours}
                      onChange={(e) => setHours(Number(e.target.value))}
                      className="w-full bg-[#181B24] border border-white/10 rounded-md pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                    >
                      {[3, 4, 5, 6, 8, 10, 12].map((h) => (
                        <option key={h} value={h}>{h} Hours Standby</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Date */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-[#C5A880]" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full bg-[#181B24] border border-white/10 rounded-md pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              {/* Time */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                  Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 w-4 h-4 text-[#C5A880]" />
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                    className="w-full bg-[#181B24] border border-white/10 rounded-md pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              {/* Passengers */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                  Passenger Count
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 w-4 h-4 text-[#C5A880]" />
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full bg-[#181B24] border border-white/10 rounded-md pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((p) => (
                      <option key={p} value={p}>{p} {p === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Vehicle Class */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                  Vehicle Model
                </label>
                <div className="relative">
                  <Car className="absolute left-3 top-3 w-4 h-4 text-[#C5A880]" />
                  <select
                    value={selectedVehicleId}
                    onChange={(e) => setSelectedVehicleId(e.target.value)}
                    className="w-full bg-[#181B24] border border-white/10 rounded-md pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  >
                    {chauffeurVehicles.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name} (${v.hourlyRate}/hr)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

            </div>

            <div className="flex items-center justify-end">
              <button
                type="submit"
                disabled={isCalculating}
                className="px-6 py-3 text-xs font-semibold tracking-widest uppercase bg-[#C5A880] text-black hover:bg-[#D6BA93] rounded transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isCalculating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Fleet Availability...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Calculate Live Quote</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Results Card */}
          {calculationResult && (
            <div className="mt-8 pt-8 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6 p-6 rounded-lg bg-black/40 border border-[#C5A880]/30 animate-fadeIn">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Guaranteed Fleet Availability · {calculationResult.availableDrivers} Vetted Chauffeurs Available</span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  {calculationResult.vehicle.name}
                </h3>
                <p className="text-xs text-neutral-400">
                  {calculationResult.estimatedDuration} · {calculationResult.estimatedMiles} Est. Miles · Luggage Capacity: {calculationResult.vehicle.luggageCapacity} bags
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-[10px] tracking-wider uppercase text-neutral-400">Estimated Total</p>
                  <p className="text-2xl font-bold text-white tabular-nums">
                    ${calculationResult.total}
                  </p>
                  <p className="text-[10px] text-neutral-400">Includes taxes & 60m FBO standby</p>
                </div>

                <button
                  onClick={handleProceedToBooking}
                  className="px-6 py-3.5 text-xs font-semibold tracking-widest uppercase bg-[#C5A880] text-black hover:bg-[#D6BA93] rounded shadow-md flex items-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <span>Proceed to Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Chauffeur Fleet Lineup */}
        <div>
          <div className="mb-8">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#C5A880]">
              Proprietary Fleet
            </p>
            <h2 className="font-display text-3xl font-bold text-white">
              Executive Chauffeur Fleet Specifications
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {chauffeurVehicles.map((veh) => (
              <div
                key={veh.id}
                className="rounded-lg bg-[#0F121A] border border-white/10 hover:border-[#C5A880]/40 transition-all overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] w-full bg-neutral-900">
                  <Image
                    src={veh.image}
                    alt={veh.name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F121A] via-transparent to-black/30" />
                  <div className="absolute top-3 right-3 text-xs bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-white border border-white/10">
                    ${veh.hourlyRate} / hour
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[11px] text-[#C5A880] uppercase tracking-wider font-semibold">
                      {veh.classType}
                    </span>
                    <h3 className="font-display text-xl font-bold text-white mt-1">
                      {veh.name}
                    </h3>
                    <p className="mt-2 text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                      {veh.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5 text-xs text-neutral-300">
                      <div className="flex items-center justify-between text-neutral-400">
                        <span>Passenger Capacity:</span>
                        <strong className="text-white">{veh.passengerCapacity} Guests</strong>
                      </div>
                      <div className="flex items-center justify-between text-neutral-400">
                        <span>Luggage Capacity:</span>
                        <strong className="text-white">{veh.luggageCapacity} Large Cases</strong>
                      </div>
                      <div className="flex items-center justify-between text-neutral-400">
                        <span>Minimum Booking:</span>
                        <strong className="text-white">{veh.minimumHours} Hours</strong>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
                    <button
                      onClick={() => setSelectedExperienceForDetail(veh)}
                      className="flex-1 py-2 text-xs text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-colors"
                    >
                      Specifications
                    </button>
                    <button
                      onClick={() => openBookingModal(veh)}
                      className="flex-1 py-2 text-xs font-semibold uppercase tracking-wider bg-[#C5A880] text-black hover:bg-[#D6BA93] rounded transition-all"
                    >
                      Reserve Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What's Included vs Not Included */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 rounded-lg bg-[#0F121A] border border-white/10">
          <div>
            <h3 className="font-display text-xl font-bold text-white flex items-center gap-2 mb-4">
              <Check className="w-5 h-5 text-[#C5A880]" />
              <span>Standard Executive Inclusions</span>
            </h3>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>60 minutes complimentary standby for commercial and private aviation arrivals.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>Real-time flight radar tracking with automated schedule adjustment.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>Complimentary chilled artisan Fiji waters, San Pellegrino & in-cabin Wi-Fi.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>Professional suited chauffeur bound by non-disclosure agreements.</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-xl font-bold text-white flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[#C5A880]" />
              <span>Bespoke Concierge Add-ons</span>
            </h3>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="text-[#C5A880] font-bold">·</span>
                <span>FBO Plane-Side Tarmac Airstair Ramp Permit ($150).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C5A880] font-bold">·</span>
                <span>Chilled Dom Pérignon Champagne with crystal flutes ($360).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C5A880] font-bold">·</span>
                <span>Plainclothes executive protection specialist ($450).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C5A880] font-bold">·</span>
                <span>Multi-city convoy coordination and armored ballistic options.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-bold text-white">
              Chauffeur Services Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {chauffeurFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-lg bg-[#0F121A] border border-white/10 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-sm font-medium text-white hover:text-[#C5A880] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 transition-transform ${
                        isOpen ? 'rotate-180 text-[#C5A880]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-xs text-neutral-300 leading-relaxed border-t border-white/5 animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
