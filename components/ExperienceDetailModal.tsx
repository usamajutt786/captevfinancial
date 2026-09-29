'use client';

import React from 'react';
import Image from 'next/image';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Clock, 
  Users, 
  MapPin, 
  Star, 
  Check, 
  X as XIcon, 
  ShieldCheck, 
  Heart, 
  Calendar, 
  ArrowRight,
  Info
} from 'lucide-react';
import { ExcursionItem, Vehicle, BoatCharter } from '../types';

export default function ExperienceDetailModal() {
  const { 
    selectedExperienceForDetail, 
    setSelectedExperienceForDetail, 
    openBookingModal, 
    toggleSaved, 
    isSaved 
  } = useApp();

  if (!selectedExperienceForDetail) return null;

  const item = selectedExperienceForDetail;
  const isExcursion = 'pricePerPerson' in item;
  const isVehicle = 'passengerCapacity' in item && 'hourlyRate' in item;
  const isBoat = 'boatType' in item;
  const saved = isSaved(item.id);

  const title = (item as any).name || (item as any).title;
  const priceDisplay = isExcursion
    ? `$${(item as ExcursionItem).pricePerPerson} / guest`
    : isVehicle
    ? `$${(item as Vehicle).hourlyRate} / hour`
    : `$${(item as BoatCharter).hourlyRate} / hour`;

  const handleBook = () => {
    const target = item;
    setSelectedExperienceForDetail(null);
    openBookingModal(target);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl rounded-xl bg-[#0F121A] border border-white/20 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Top Floating Close & Save Bar */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={() => toggleSaved(item.id, title)}
            className="p-2.5 rounded-full bg-black/70 backdrop-blur-md text-white hover:text-[#C5A880] border border-white/10 transition-colors cursor-pointer"
            aria-label="Save to favorites"
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-[#C5A880] text-[#C5A880]' : 'text-white'}`} />
          </button>
          <button
            onClick={() => setSelectedExperienceForDetail(null)}
            className="p-2.5 rounded-full bg-black/70 backdrop-blur-md text-white hover:text-neutral-300 border border-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1 pb-20 md:pb-6">
          
          {/* Main Visual Banner */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-neutral-900">
            <Image
              src={item.image}
              alt={title}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F121A] via-transparent to-black/40" />

            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C5A880]">
                {isExcursion ? (item as ExcursionItem).category : isVehicle ? (item as Vehicle).classType : (item as BoatCharter).boatType}
              </span>
              <h1 className="font-display text-2xl sm:text-4xl font-bold text-white mt-1">
                {title}
              </h1>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-6 sm:p-8 space-y-8">
            
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-black/40 border border-white/5 text-xs text-neutral-300">
              <div>
                <span className="text-neutral-500 uppercase tracking-wider block text-[10px]">Pricing</span>
                <span className="text-white font-bold text-sm tabular-nums">{priceDisplay}</span>
              </div>
              <div>
                <span className="text-neutral-500 uppercase tracking-wider block text-[10px]">Capacity</span>
                <span className="text-white font-medium">
                  {isExcursion ? `Up to ${(item as ExcursionItem).maxGuests} Guests` : isVehicle ? `${(item as Vehicle).passengerCapacity} Passengers` : `${(item as BoatCharter).capacity} Guests`}
                </span>
              </div>
              <div>
                <span className="text-neutral-500 uppercase tracking-wider block text-[10px]">Service Standard</span>
                <span className="text-white font-medium">Vetted Concierge</span>
              </div>
              <div>
                <span className="text-neutral-500 uppercase tracking-wider block text-[10px]">Location</span>
                <span className="text-white font-medium truncate block">
                  {isExcursion ? (item as ExcursionItem).destination : isBoat ? (item as BoatCharter).location : 'Miami / NYC / LA / Aspen'}
                </span>
              </div>
            </div>

            {/* Narrative Description */}
            <div>
              <h2 className="text-xs uppercase font-semibold tracking-wider text-[#C5A880] mb-2">
                Overview & Experience
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* If Excursion: Itinerary timeline */}
            {isExcursion && (item as ExcursionItem).itinerary && (
              <div className="space-y-4 border-t border-white/10 pt-6">
                <h3 className="font-display text-xl font-bold text-white">
                  Curated Day Itinerary
                </h3>
                <div className="space-y-3">
                  {(item as ExcursionItem).itinerary.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-4 text-xs">
                      <span className="font-mono text-[#C5A880] font-semibold w-20 shrink-0">
                        {step.time}
                      </span>
                      <span className="text-neutral-300">{step.activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inclusions & Exclusions */}
            {isExcursion && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-white/10 pt-6 text-xs">
                <div>
                  <h4 className="font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#C5A880]" />
                    <span>Included Services</span>
                  </h4>
                  <ul className="space-y-2 text-neutral-300">
                    {(item as ExcursionItem).included.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="h-1 w-1 rounded-full bg-[#C5A880] mt-1.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5 text-neutral-400">
                    <Info className="w-4 h-4 text-neutral-400" />
                    <span>Optional Arrangements</span>
                  </h4>
                  <ul className="space-y-2 text-neutral-400">
                    {(item as ExcursionItem).notIncluded.map((notInc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="h-1 w-1 rounded-full bg-neutral-600 mt-1.5" />
                        <span>{notInc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Vehicle Features */}
            {isVehicle && (
              <div className="border-t border-white/10 pt-6 space-y-3 text-xs">
                <h3 className="font-display text-xl font-bold text-white">
                  Cabin Specifications & Luxury Appointments
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-300">
                  {(item as Vehicle).features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Boat Amenities */}
            {isBoat && (
              <div className="border-t border-white/10 pt-6 space-y-3 text-xs">
                <h3 className="font-display text-xl font-bold text-white">
                  Vessel Amenities & Water Toys
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-300">
                  {(item as BoatCharter).amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cancellation & Protection */}
            <div className="p-4 rounded-lg bg-black/40 border border-white/5 text-xs text-neutral-400 space-y-1">
              <div className="flex items-center gap-1.5 text-white font-medium">
                <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                <span>Aureus Concierge Protection Guarantee</span>
              </div>
              <p>
                Complimentary reschedule or 100% credit up to 24 hours prior to scheduled departure. Flight arrival delay protection included at no additional charge.
              </p>
            </div>

          </div>
        </div>

        {/* Sticky Desktop & Mobile Bottom Bar */}
        <div className="p-4 sm:p-6 border-t border-white/10 bg-black/70 backdrop-blur-md flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase text-neutral-400 block">Immediate Reservation</span>
            <span className="text-xl font-bold text-white tabular-nums">{priceDisplay}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedExperienceForDetail(null)}
              className="hidden sm:block px-4 py-2.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              Back to Browse
            </button>
            <button
              onClick={handleBook}
              className="px-6 sm:px-8 py-3 text-xs font-semibold tracking-widest uppercase bg-[#C5A880] text-black hover:bg-[#D6BA93] rounded transition-all cursor-pointer shadow-lg flex items-center gap-2"
            >
              <span>Reserve Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
