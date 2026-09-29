'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '../context/AppContext';
import { MapPin, ArrowUpRight, X, Calendar, Users, Shield } from 'lucide-react';

interface DestinationHub {
  id: string;
  name: string;
  region: string;
  image: string;
  servicesAvailable: string[];
  description: string;
  fleetHighlight: string;
  curatedSeason: string;
}

export default function DestinationsGallery() {
  const { openBookingModal } = useApp();
  const [selectedHub, setSelectedHub] = useState<DestinationHub | null>(null);

  const hubs: DestinationHub[] = [
    {
      id: 'hub-miami',
      name: 'Miami & Biscayne Keys',
      region: 'South Florida',
      image: '/images/service_superyacht_1790717635836.jpg',
      servicesAvailable: ['74ft Sunseeker Yacht Charters', 'Escalade ESV Nightlife Fleet', 'Opa-Locka FBO Tarmac Meets'],
      description: 'The epicenter of American marine luxury. From private sandbar cruises to velvet-rope nightclub chauffeur escorts.',
      fleetHighlight: 'Sunseeker 74ft & Cadillac Escalade ESV Sport Platinum',
      curatedSeason: 'Year-round prime cruising'
    },
    {
      id: 'hub-los-angeles',
      name: 'Los Angeles & Malibu Coast',
      region: 'Southern California',
      image: '/images/experience_excursion_1790717659195.jpg',
      servicesAvailable: ['Coastal Helicopter Wine Tours', 'Executive Maybach Chauffeur', 'Van Nuys FBO Plane-Side Staging'],
      description: 'Effortless traversal from private airfields in Van Nuys to cliffside estates in Malibu and discreet Hollywood studio meetings.',
      fleetHighlight: 'Mercedes-Maybach S580 & Range Rover SV Long Wheelbase',
      curatedSeason: 'Spring to Autumn high season'
    },
    {
      id: 'hub-new-york',
      name: 'New York & The Hamptons',
      region: 'Tri-State Area',
      image: '/images/service_black_suv_1790717621976.jpg',
      servicesAvailable: ['Teterboro Airport Jet Transfers', 'Manhattan Hourly Chauffeur', 'Hamptons Weekend Sprinter Fleet'],
      description: 'High-consequence financial roadshows and seamless coastal escapes from Wall Street to Montauk without traffic fatigue.',
      fleetHighlight: 'Jet-Class Mercedes Sprinter & Escalade ESV Armored spec',
      curatedSeason: 'Summer coastal & autumn cultural season'
    },
    {
      id: 'hub-aspen',
      name: 'Aspen & Rocky Mountains',
      region: 'Colorado High Country',
      image: '/images/hero_luxury_fleet_1790717607644.jpg',
      servicesAvailable: ['Aspen Pitkin Airport Runway Meets', 'All-Wheel Drive Black SUV Fleet', 'Ski Chalet Private Chauffeur'],
      description: 'Heavy snow-rated luxury 4WD Cadillac Escalades with ski racks, heated leather seating, and winter alpine certified drivers.',
      fleetHighlight: 'GMC Yukon Denali Ultimate 4WD & Escalade ESV',
      curatedSeason: 'December – April Winter Alpine Season'
    }
  ];

  return (
    <section className="w-full bg-[#08090C] py-24 border-b border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
              Operational Footprint
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Premier Destination Hubs
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md">
            Dedicated fleets, private tarmac permits, and licensed marine captains permanently stationed across elite travel corridors.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hubs.map((hub) => (
            <div
              key={hub.id}
              onClick={() => setSelectedHub(hub)}
              className="group relative h-96 rounded-lg overflow-hidden border border-white/10 hover:border-[#C5A880]/60 transition-all duration-500 cursor-pointer"
            >
              <Image
                src={hub.image}
                alt={hub.name}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-300 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                    {hub.region}
                  </span>
                  <div className="h-8 w-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white group-hover:text-black group-hover:bg-[#C5A880] transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold text-white group-hover:text-[#C5A880] transition-colors">
                    {hub.name}
                  </h3>
                  <p className="mt-2 text-xs text-neutral-300 line-clamp-2">
                    {hub.description}
                  </p>
                  <p className="mt-3 text-[11px] text-[#C5A880] font-medium">
                    {hub.fleetHighlight}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Destination Hub Detail Modal */}
      {selectedHub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl rounded-lg bg-[#0F121A] border border-white/20 p-6 sm:p-8 overflow-hidden">
            <button
              onClick={() => setSelectedHub(null)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full bg-black/50 transition-colors cursor-pointer"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video w-full rounded-md overflow-hidden mb-6">
              <Image
                src={selectedHub.image}
                alt={selectedHub.name}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
                  {selectedHub.region} Hub
                </span>
                <h3 className="font-display text-2xl font-bold text-white">
                  {selectedHub.name}
                </h3>
              </div>
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed mb-6">
              {selectedHub.description}
            </p>

            <div className="space-y-4 border-t border-white/10 pt-4 mb-6 text-xs">
              <div>
                <p className="font-semibold text-[#C5A880] uppercase tracking-wider mb-2">
                  Stationed Services:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedHub.servicesAvailable.map((s, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-neutral-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#C5A880]" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-neutral-400 pt-2 border-t border-white/5">
                <span>Primary Fleet: <strong className="text-white">{selectedHub.fleetHighlight}</strong></span>
                <span>Season: <strong className="text-white">{selectedHub.curatedSeason}</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setSelectedHub(null);
                  openBookingModal(null);
                }}
                className="flex-1 py-3 text-xs tracking-widest uppercase font-semibold bg-[#C5A880] text-black hover:bg-[#D6BA93] rounded transition-all text-center cursor-pointer"
              >
                Inquire or Reserve in {selectedHub.name}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
