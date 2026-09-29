'use client';

import React, { useState } from 'react';
import { useApp, NavTab } from '../context/AppContext';
import { Shield, Phone, Mail, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const { setActiveTab, openPolicy, addToast } = useApp();
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      addToast('Please enter a valid private client email address', 'info');
      return;
    }
    setIsSubscribed(true);
    addToast('You have been added to the Aureus Private Dispatch list', 'gold');
    setEmailInput('');
  };

  return (
    <footer className="w-full bg-[#050608] text-neutral-400 border-t border-white/[0.08] pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/[0.08]">
          
          {/* Brand & Editorial Column */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-display text-2xl font-bold tracking-[0.25em] text-white uppercase">
              AUREUS
            </span>
            <p className="text-sm leading-relaxed text-neutral-400 max-w-sm">
              The premier luxury mobility and concierge network. We orchestrate flawless chauffeured ground transport, black SUV security fleets, private motor yacht charters, and rare curated excursions for discerning global clientele.
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs text-neutral-300">
              <span className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                Direct Concierge: +1 (800) 892-AUREUS (2873)
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
                concierge@aureusexperiences.com
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                Primary Hubs: Miami · New York · Los Angeles · Aspen
              </span>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-semibold tracking-widest text-[#C5A880]">
              Fleet & Mobility
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li>
                <button
                  onClick={() => setActiveTab('chauffeur')}
                  className="hover:text-white transition-colors"
                >
                  Executive Chauffeur
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('black-truck')}
                  className="hover:text-white transition-colors"
                >
                  Black Truck & SUV Fleet
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('boat-rental')}
                  className="hover:text-white transition-colors"
                >
                  Private Yacht Charters
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('chauffeur')}
                  className="hover:text-white transition-colors"
                >
                  FBO Tarmac Airport Meet
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('chauffeur')}
                  className="hover:text-white transition-colors"
                >
                  Jet-Class Sprinter
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Curated Experiences */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-semibold tracking-widest text-[#C5A880]">
              Experiences
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li>
                <button
                  onClick={() => setActiveTab('excursions')}
                  className="hover:text-white transition-colors"
                >
                  Helicopter Vineyard Tours
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('boat-rental')}
                  className="hover:text-white transition-colors"
                >
                  Sunset Superyacht Dinners
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('experiences')}
                  className="hover:text-white transition-colors"
                >
                  VIP Nightlife Escort
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('custom')}
                  className="hover:text-white transition-colors"
                >
                  Custom Bespoke Itineraries
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('my-bookings')}
                  className="hover:text-white transition-colors"
                >
                  Client Portal & Bookings
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Private Dispatch Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-semibold tracking-widest text-[#C5A880]">
              Private Dispatch
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Receive discreet notifications of seasonal yacht repositioning, private aviation deadhead legs, and exclusive cultural excursions.
            </p>
            {isSubscribed ? (
              <div className="flex items-center gap-2 p-2 bg-emerald-950/40 border border-emerald-500/30 rounded text-xs text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Client registry confirmed</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter private email..."
                    className="w-full bg-[#12151D] border border-white/10 rounded px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A880]"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-2.5 bg-[#C5A880] text-black hover:bg-[#D6BA93] rounded flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar & Policy Contract */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} AUREUS Luxury Concierge Group Ltd. All rights reserved.</p>
          
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={() => openPolicy('privacy')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <button
              onClick={() => openPolicy('terms')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <button
              onClick={() => openPolicy('booking-policy')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Booking Policy
            </button>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <button
              onClick={() => openPolicy('cancellation')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Cancellation & Credits
            </button>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <button
              onClick={() => setActiveTab('payment-link')}
              className="text-[#C5A880] hover:underline cursor-pointer"
            >
              Invoice Payment Link
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
