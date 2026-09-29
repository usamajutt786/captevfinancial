'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Calendar, 
  Users, 
  MapPin, 
  DollarSign, 
  Phone, 
  Mail, 
  User, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Plane,
  Anchor,
  Car
} from 'lucide-react';

export default function CustomExperienceView() {
  const { addToast, setActiveTab } = useApp();

  // Form State
  const [formData, setFormData] = useState({
    name: 'Eleanor Vance',
    email: 'eleanor@vanceholdings.com',
    phone: '+1 (555) 489-2910',
    preferredDate: '2026-10-18',
    guests: 6,
    location: 'Miami & The Florida Keys',
    budgetRange: '$5,000 - $10,000',
    transportPreferences: ['Chauffeur', 'Boat'],
    experienceThemes: ['Dining', 'Celebration'],
    additionalNotes: 'Arranging a private milestone anniversary celebration. Would love a 70ft yacht sunset charter with private chef followed by Escalade ESV escort to a rooftop lounge.'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inquiryReference, setInquiryReference] = useState('');

  const transportOptions = [
    { label: 'Executive Chauffeur', icon: Car },
    { label: 'Private Yacht Charter', icon: Anchor },
    { label: 'Helicopter / Private Aviation', icon: Plane },
    { label: 'Armored Black Fleet', icon: ShieldCheck }
  ];

  const themeOptions = [
    'Fine Dining & Private Chefs',
    'VIP Nightlife & Clubs',
    'Wine Country & Vineyard Estates',
    'Corporate Executive Retreat',
    'Milestone Celebration',
    'Island & Beach Day'
  ];

  const handleToggleTransport = (label: string) => {
    setFormData((prev) => {
      const exists = prev.transportPreferences.includes(label);
      return {
        ...prev,
        transportPreferences: exists
          ? prev.transportPreferences.filter((i) => i !== label)
          : [...prev.transportPreferences, label]
      };
    });
  };

  const handleToggleTheme = (theme: string) => {
    setFormData((prev) => {
      const exists = prev.experienceThemes.includes(theme);
      return {
        ...prev,
        experienceThemes: exists
          ? prev.experienceThemes.filter((i) => i !== theme)
          : [...prev.experienceThemes, theme]
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const ref = 'AUR-INQ-' + Math.floor(1000 + Math.random() * 9000);
      setInquiryReference(ref);
      setIsSubmitting(false);
      setIsSubmitted(true);
      addToast(`Custom request ${ref} transmitted to senior concierge director`, 'gold');
    }, 1000);
  };

  return (
    <div className="w-full bg-[#08090C] text-neutral-300">
      
      {/* Hero Header */}
      <div className="relative w-full min-h-[45vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        <Image
          src="/images/hero.jpg"
          alt="Bespoke Luxury Travel Concierge"
          fill
          priority
          className="object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/75 to-black/50" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#C5A880] mb-3">
            Haute Tailoring for Modern Travel
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight max-w-4xl mx-auto">
            Bespoke Custom Experience Request
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
            Commission a personalized multi-modal journey. Our private concierge directors formulate exclusive proposals combining aircraft, black truck security, yachts, and private estate access.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        
        {isSubmitted ? (
          <div className="rounded-xl bg-[#0F121A] border border-[#C5A880]/50 p-8 sm:p-12 text-center space-y-6 animate-fadeIn">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#C5A880]/20 text-[#C5A880] mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#C5A880]">
                Proposal Dispatched · Reference {inquiryReference}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                Your Custom Experience Request Has Been Received
              </h2>
              <p className="text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
                A senior private concierge director has been assigned to your brief. A complete bespoke itinerary and itemized cost breakdown will be delivered to <strong className="text-white">{formData.email}</strong> within 2 hours.
              </p>
            </div>

            {/* Itinerary Preview Box */}
            <div className="max-w-md mx-auto p-4 rounded bg-black/40 border border-white/10 text-left text-xs space-y-2 text-neutral-400">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Client:</span>
                <strong className="text-white">{formData.name}</strong>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Date & Corridor:</span>
                <strong className="text-white">{formData.preferredDate} · {formData.location}</strong>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Party Size:</span>
                <strong className="text-white">{formData.guests} Guests</strong>
              </div>
              <div className="flex justify-between">
                <span>Target Investment:</span>
                <strong className="text-[#C5A880]">{formData.budgetRange}</strong>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-center gap-4">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setActiveTab('home');
                }}
                className="px-6 py-3 text-xs uppercase tracking-wider font-semibold bg-[#C5A880] text-black hover:bg-[#D6BA93] rounded"
              >
                Return to Overview
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-xl bg-[#0F121A] border border-white/10 p-6 sm:p-10 space-y-8 shadow-2xl">
            
            <div className="border-b border-white/10 pb-6">
              <h3 className="font-display text-2xl font-bold text-white">
                Primary Client Information
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Your direct contact details for our VIP concierge desk.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-[#C5A880]" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#181B24] border border-white/10 rounded-md pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-[#C5A880]" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#181B24] border border-white/10 rounded-md pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                  Phone (WhatsApp Capable)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-[#C5A880]" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#181B24] border border-white/10 rounded-md pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>
            </div>

            {/* Travel Scope */}
            <div className="border-b border-white/10 pb-6 pt-4">
              <h3 className="font-display text-2xl font-bold text-white">
                Itinerary Scope & Parameters
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                  Preferred Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-[#C5A880]" />
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-[#181B24] border border-white/10 rounded-md pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                  Number of Guests
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 w-4 h-4 text-[#C5A880]" />
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                    className="w-full bg-[#181B24] border border-white/10 rounded-md pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                  Destination / City
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-[#C5A880]" />
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-[#181B24] border border-white/10 rounded-md pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                  Estimated Budget
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 w-4 h-4 text-[#C5A880]" />
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full bg-[#181B24] border border-white/10 rounded-md pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  >
                    <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                    <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                    <option value="$25,000+ Unlimited VIP">$25,000+ Unlimited VIP</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Desired Modes of Transport */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-3">
                Select Desired Transportation Modes
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {transportOptions.map((opt) => {
                  const Icon = opt.icon;
                  const active = formData.transportPreferences.includes(opt.label);
                  return (
                    <button
                      type="button"
                      key={opt.label}
                      onClick={() => handleToggleTransport(opt.label)}
                      className={`p-3 rounded-lg border text-left flex flex-col justify-between h-24 transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#C5A880]/10 border-[#C5A880] text-white'
                          : 'bg-[#181B24] border-white/10 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${active ? 'text-[#C5A880]' : 'text-neutral-500'}`} />
                      <span className="text-xs font-medium leading-tight">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Themes / Highlights */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-3">
                Experience Priorities & Themes
              </label>
              <div className="flex flex-wrap gap-2">
                {themeOptions.map((theme) => {
                  const active = formData.experienceThemes.includes(theme);
                  return (
                    <button
                      type="button"
                      key={theme}
                      onClick={() => handleToggleTheme(theme)}
                      className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#C5A880] text-black border-[#C5A880]'
                          : 'bg-[#181B24] text-neutral-300 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {theme}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Detailed Notes */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                Special Directives & Concierge Requests
              </label>
              <textarea
                rows={4}
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                placeholder="Include flight arrival tail numbers, security preferences, dietary requirements, or specific landmark aspirations..."
                className="w-full bg-[#181B24] border border-white/10 rounded-md p-3 text-xs text-white focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-neutral-500">
                Guaranteed response by Senior Concierge within 2 hours.
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3.5 text-xs font-semibold tracking-widest uppercase bg-[#C5A880] text-black hover:bg-[#D6BA93] rounded transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Transmitting Brief...' : 'Submit Bespoke Brief'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
