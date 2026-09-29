'use client';

import React, { useState } from 'react';
import { useApp, NavTab } from '../context/AppContext';
import { Search, Heart, Calendar, Menu, X, Phone, ShieldCheck, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const {
    activeTab,
    setActiveTab,
    savedItemIds,
    setIsSearchOpen,
    setIsSavedDrawerOpen,
    openBookingModal
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; tab: NavTab }[] = [
    { label: 'Overview', tab: 'home' },
    { label: 'Chauffeur Services', tab: 'chauffeur' },
    { label: 'Black Truck Fleet', tab: 'black-truck' },
    { label: 'Boat Rentals', tab: 'boat-rental' },
    { label: 'Excursions', tab: 'excursions' },
    { label: 'Experiences', tab: 'experiences' },
    { label: 'About', tab: 'about' },
    { label: 'Contact', tab: 'contact' },
  ];

  const handleNavClick = (tab: NavTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#08090C]/90 backdrop-blur-md transition-all duration-300">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group cursor-pointer focus:outline-none"
              aria-label="Aureus Home"
            >
              <span className="font-display text-2xl sm:text-3xl font-bold tracking-[0.2em] text-white uppercase group-hover:text-[#C5A880] transition-colors">
                AUREUS
              </span>
            </button>
          </div>

          {/* Zone 2: Clean text navigation links */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8 text-xs tracking-wider uppercase font-medium text-neutral-300">
            {navLinks.map((link) => {
              const isActive = activeTab === link.tab;
              return (
                <button
                  key={link.tab}
                  onClick={() => handleNavClick(link.tab)}
                  className={`relative py-2 whitespace-nowrap transition-colors hover:text-[#C5A880] ${
                    isActive ? 'text-[#C5A880]' : 'text-neutral-300'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#C5A880] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 sm:p-2.5 text-neutral-300 hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
              title="Search fleet & experiences"
              aria-label="Search"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Saved Wishlist */}
            <button
              onClick={() => setIsSavedDrawerOpen(true)}
              className="relative p-2 sm:p-2.5 text-neutral-300 hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
              title="Saved experiences"
              aria-label="Saved experiences"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {savedItemIds.length > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#C5A880] text-[10px] font-bold text-black">
                  {savedItemIds.length}
                </span>
              )}
            </button>

            {/* My Bookings */}
            <button
              onClick={() => setActiveTab('my-bookings')}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs tracking-wider uppercase font-medium rounded-md border transition-all ${
                activeTab === 'my-bookings'
                  ? 'border-[#C5A880] text-[#C5A880] bg-[#C5A880]/10'
                  : 'border-white/10 text-neutral-300 hover:border-white/20 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>My Bookings</span>
            </button>

            {/* Primary Book Now CTA */}
            <button
              onClick={() => openBookingModal(null)}
              className="px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-semibold tracking-widest uppercase bg-[#C5A880] text-[#0A0D14] hover:bg-[#D6BA93] active:scale-[0.98] transition-all rounded shadow-sm whitespace-nowrap cursor-pointer"
            >
              Book Now
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-neutral-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-50 bg-[#08090C]/98 backdrop-blur-xl border-t border-white/10 xl:hidden flex flex-col justify-between overflow-y-auto p-6 animate-fadeIn">
          <div className="space-y-1">
            <p className="text-[10px] tracking-widest uppercase text-[#C5A880] font-semibold mb-3">
              Navigation & Fleet Services
            </p>
            {navLinks.map((link) => (
              <button
                key={link.tab}
                onClick={() => handleNavClick(link.tab)}
                className={`flex w-full items-center justify-between py-3.5 text-base font-medium border-b border-white/5 transition-colors ${
                  activeTab === link.tab ? 'text-[#C5A880]' : 'text-neutral-200 hover:text-[#C5A880]'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-neutral-500" />
              </button>
            ))}

            <div className="pt-4 space-y-2">
              <button
                onClick={() => handleNavClick('my-bookings')}
                className="flex w-full items-center justify-between py-3 text-sm text-neutral-200"
              >
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#C5A880]" />
                  My Bookings & Receipts
                </span>
                <ChevronRight className="w-4 h-4 text-neutral-500" />
              </button>

              <button
                onClick={() => handleNavClick('custom')}
                className="flex w-full items-center justify-between py-3 text-sm text-neutral-200"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                  Request Custom Experience
                </span>
                <ChevronRight className="w-4 h-4 text-neutral-500" />
              </button>

              <button
                onClick={() => handleNavClick('payment-link')}
                className="flex w-full items-center justify-between py-3 text-sm text-neutral-200"
              >
                <span className="flex items-center gap-2">
                  <span className="text-[#C5A880] font-mono text-xs">$</span>
                  Make a Payment (Invoice / Reference)
                </span>
                <ChevronRight className="w-4 h-4 text-neutral-500" />
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingModal(null);
              }}
              className="w-full py-3 text-xs tracking-widest uppercase font-semibold bg-[#C5A880] text-black rounded text-center"
            >
              Reserve Experience Now
            </button>
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                24/7 Desk: +1 (800) 892-AUREUS
              </span>
              <span>Miami · LA · NYC · Aspen</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
