'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Phone, Mail, MapPin, Clock, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ContactView() {
  const { addToast } = useApp();

  const [name, setName] = useState('Alexander Sterling');
  const [email, setEmail] = useState('alexander@sterlingfamily.com');
  const [phone, setPhone] = useState('+1 (555) 728-1092');
  const [service, setService] = useState('Chauffeur Services');
  const [message, setMessage] = useState('Inquiring about multi-day Escalade ESV chauffeur standby for Art Basel Miami week.');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    addToast('Your inquiry has been dispatched to the senior concierge desk', 'gold');
  };

  return (
    <div className="w-full bg-[#08090C] text-neutral-300 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
            Concierge Direct Line
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mt-1">
            Connect with Aureus Concierge
          </h1>
          <p className="mt-3 text-sm text-neutral-400">
            Our private client desk is operational 24 hours a day, 365 days a year across key financial and resort capitals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Contact Information & Channels */}
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-[#0F121A] border border-white/10 space-y-4">
              <h3 className="text-xs uppercase font-semibold tracking-wider text-[#C5A880]">
                Direct Contacts
              </h3>

              <div className="space-y-3 text-xs text-neutral-300">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Toll-Free VIP Line</strong>
                    <span>+1 (800) 892-AUREUS (2873)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Private Dispatch Email</strong>
                    <span>concierge@aureusexperiences.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Private Jet Terminal Staging</strong>
                    <span>Signature Flight Support, FBO Apron 12</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Operational Hours</strong>
                    <span>24 Hours / 7 Days / 365 Days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Direct CTA */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-950/40 via-[#0F121A] to-black border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                <MessageSquare className="w-4 h-4" />
                <span>Instant WhatsApp VIP Desk</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Connect directly with our on-duty fleet coordinator for rapid confirmation in under 3 minutes.
              </p>
              <button
                onClick={() => addToast('Opening simulated WhatsApp VIP channel...', 'gold')}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold tracking-wider uppercase transition-colors text-center cursor-pointer"
              >
                Launch WhatsApp Chat
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            {isSent ? (
              <div className="p-8 sm:p-12 rounded-xl bg-[#0F121A] border border-[#C5A880]/50 text-center space-y-6 animate-fadeIn">
                <div className="h-14 w-14 rounded-full bg-[#C5A880]/20 text-[#C5A880] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display text-2xl font-bold text-white">
                    Direct Inquiry Dispatched
                  </h3>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto">
                    Thank you, {name}. A dedicated concierge supervisor has received your note regarding {service} and will reply within 15 minutes.
                  </p>
                </div>
                <button
                  onClick={() => setIsSent(false)}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#C5A880] text-black rounded hover:bg-[#D6BA93]"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-xl bg-[#0F121A] border border-white/10 space-y-6 shadow-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#181B24] border border-white/10 rounded-md p-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                      Private Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#181B24] border border-white/10 rounded-md p-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#181B24] border border-white/10 rounded-md p-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                      Service Line of Interest
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full bg-[#181B24] border border-white/10 rounded-md p-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                    >
                      <option value="Chauffeur Services">Executive Chauffeur Services</option>
                      <option value="Black Truck Rentals">Black Truck & SUV Fleet</option>
                      <option value="Boat Rentals">Private Yacht & Boat Charters</option>
                      <option value="Planned Excursions">Private Curated Excursions</option>
                      <option value="Luxury Experiences">VIP Signature Experiences</option>
                      <option value="Custom Itinerary">Bespoke Custom Program</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                    Your Brief / Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#181B24] border border-white/10 rounded-md p-3 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-neutral-500">
                    Average response latency: &lt; 5 minutes.
                  </span>
                  <button
                    type="submit"
                    className="px-8 py-3 text-xs font-semibold tracking-widest uppercase bg-[#C5A880] text-black hover:bg-[#D6BA93] rounded transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Transmit Message</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
