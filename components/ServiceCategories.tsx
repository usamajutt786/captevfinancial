'use client';

import React from 'react';
import Image from 'next/image';
import { useApp, NavTab } from '../context/AppContext';
import { ArrowUpRight, Calendar } from 'lucide-react';

interface ServiceCategoryData {
  id: string;
  title: string;
  tab: NavTab;
  priceTag: string;
  image: string;
  description: string;
  highlights: string[];
}

export default function ServiceCategories() {
  const { setActiveTab, openBookingModal } = useApp();

  const categories: ServiceCategoryData[] = [
    {
      id: 'cat-chauffeur',
      title: 'Executive Chauffeur Services',
      tab: 'chauffeur',
      priceTag: 'From $185 / hour',
      image: '/images/chauffeur.jpg',
      description: 'First-class point-to-point and hourly private transportation in Mercedes-Maybach sedans and Jet-Class Sprinters.',
      highlights: ['Airstair FBO tarmac meets', 'Discreet executive drivers', 'Flight delay protection']
    },
    {
      id: 'cat-black-truck',
      title: 'Black Truck & SUV Rentals',
      tab: 'black-truck',
      priceTag: 'From $165 / hr · $1,250 / day',
      image: '/images/black_suv.jpg',
      description: 'Commanding black Cadillac Escalade ESVs and Yukon Denalis with captain chairs, 5G Wi-Fi, and acoustic privacy glass.',
      highlights: ['Chauffeured or private fleet', 'Tinted privacy glass', '7-passenger capacity']
    },
    {
      id: 'cat-boats',
      title: 'Private Yacht & Boat Charters',
      tab: 'boat-rental',
      priceTag: 'From $520 / hour',
      image: '/images/yacht.jpg',
      description: 'Tri-deck 74ft Sunseekers and luxury catamarans fully crewed with licensed captains, stewardesses, SeaBobs, and champagne bars.',
      highlights: ['USCG Master Captain included', 'Hydraulic swim platform', 'Sunset & sandbar anchorages']
    },
    {
      id: 'cat-excursions',
      title: 'Private Curated Excursions',
      tab: 'excursions',
      priceTag: 'From $295 / guest',
      image: '/images/excursion.jpg',
      description: 'Door-to-door helicopter wine estate tours, coastal cliff cruises, and private island day escapes with all logistics handled.',
      highlights: ['Helicopter & ground coordination', 'Private estate access', 'Sommelier-led tastings']
    },
    {
      id: 'cat-experiences',
      title: 'VIP Bespoke Experiences',
      tab: 'experiences',
      priceTag: 'From $550 / guest',
      image: '/images/service_chauffeur_vip_1790717648191.jpg',
      description: 'All-inclusive evening itineraries: Dedicated Escalade standby, priority backstage access, and Michelin chef supper banquettes.',
      highlights: ['Guaranteed table reservations', 'Dedicated security escort', 'Continuous vehicle standby']
    },
    {
      id: 'cat-custom',
      title: 'Custom Multi-Modal Packages',
      tab: 'custom',
      priceTag: 'Bespoke Concierge Quotes',
      image: '/images/hero.jpg',
      description: 'Tailored multi-day travel programs blending private aviation, maritime cruising, and armored ground transit for VIP delegations.',
      highlights: ['Tailored travel director', 'Cross-city logistics', 'Consolidated billing']
    }
  ];

  return (
    <section className="w-full bg-[#08090C] py-24 border-b border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
              Complete Mobility Ecosystem
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Curated Services & Private Fleet
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md">
            Whether requiring an executive airport runway greeting or an expansive weekend yacht charter, our fleet stands ready across primary coastal and metropolitan hubs.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group relative flex flex-col justify-between rounded-lg bg-[#0F121A] border border-white/10 hover:border-[#C5A880]/50 transition-all duration-300 overflow-hidden"
            >
              {/* Image Container with measured aspect ratio */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F121A] via-transparent to-black/30" />
                
                {/* Unboxed Price text (No pill enclosures) */}
                <div className="absolute top-4 right-4 text-xs font-medium text-white/90 bg-black/60 backdrop-blur-md px-3 py-1 rounded border border-white/10 tabular-nums">
                  {cat.priceTag}
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white group-hover:text-[#C5A880] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="mt-3 text-xs text-neutral-400 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Highlights list with clean typographic markers */}
                  <div className="mt-5 space-y-1.5 text-xs text-neutral-300 border-t border-white/5 pt-4">
                    {cat.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-[#C5A880]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Action Buttons */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
                  <button
                    onClick={() => setActiveTab(cat.tab)}
                    className="flex-1 py-2.5 px-4 text-xs font-medium text-neutral-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
                  </button>

                  <button
                    onClick={() => openBookingModal(null)}
                    className="flex-1 py-2.5 px-4 text-xs font-semibold tracking-wider uppercase text-black bg-[#C5A880] hover:bg-[#D6BA93] rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Now</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
