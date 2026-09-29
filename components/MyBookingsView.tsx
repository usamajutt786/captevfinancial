'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '../context/AppContext';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Download, 
  Phone, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  Shield,
  FileText,
  X
} from 'lucide-react';
import { BookingRecord } from '../types';

export default function MyBookingsView() {
  const { bookings, cancelBooking, addToast, setIsChatbotOpen, setActiveTab } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedReceipt, setSelectedReceipt] = useState<BookingRecord | null>(null);

  const upcomingBookings = bookings.filter((b) => b.status !== 'Completed');
  const pastBookings = bookings.filter((b) => b.status === 'Completed');

  const displayedBookings = activeSubTab === 'upcoming' ? upcomingBookings : pastBookings;

  const handleDownload = (b: BookingRecord) => {
    const text = `
======================================================
           AUREUS PRIVATE CONCIERGE & FLEET
               RESERVATION VOUCHER
======================================================
Reference Number: ${b.referenceNumber}
Booking Status:   ${b.status}
Issued Date:      ${b.createdAt}

CLIENT INFORMATION:
  Name:  ${b.customerName}
  Email: ${b.customerEmail}
  Phone: ${b.customerPhone}

JOURNEY DETAILS:
  Service:      ${b.title}
  Date & Time:  ${b.date} at ${b.time}
  Guest Count:  ${b.guests} Guests
  Pickup:       ${b.pickupLocation || 'Private Terminal'}
  Destination:  ${b.destinationLocation || 'As Directed'}

EXTRAS:
${b.extras.map(e => `  - ${e.name} ($${e.price})`).join('\n')}

FINANCIAL BREAKDOWN:
  Total Settled: $${b.totalAmount} USD
  Method:        ${b.paymentMethod}
======================================================
`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Aureus_Voucher_${b.referenceNumber}.txt`;
    a.click();
    addToast(`Downloaded voucher for ${b.referenceNumber}`, 'success');
  };

  return (
    <div className="w-full bg-[#08090C] text-neutral-300 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
              Client Concierge Portal
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mt-1">
              My Reservations & Travel History
            </h1>
          </div>

          {/* Sub-tab toggle */}
          <div className="flex items-center gap-1 p-1 bg-[#12151D] border border-white/10 rounded-lg">
            <button
              onClick={() => setActiveSubTab('upcoming')}
              className={`px-4 py-1.5 text-xs font-medium rounded transition-colors ${
                activeSubTab === 'upcoming'
                  ? 'bg-[#C5A880] text-black font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Upcoming Active ({upcomingBookings.length})
            </button>
            <button
              onClick={() => setActiveSubTab('past')}
              className={`px-4 py-1.5 text-xs font-medium rounded transition-colors ${
                activeSubTab === 'past'
                  ? 'bg-[#C5A880] text-black font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Past Journeys ({pastBookings.length})
            </button>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {displayedBookings.length === 0 ? (
            <div className="p-12 text-center rounded-xl bg-[#0F121A] border border-white/10 space-y-4">
              <Calendar className="w-10 h-10 text-neutral-500 mx-auto" />
              <p className="text-sm font-medium text-white">No bookings recorded in this category.</p>
              <button
                onClick={() => setActiveTab('chauffeur')}
                className="px-6 py-2.5 text-xs font-semibold tracking-wider uppercase bg-[#C5A880] text-black hover:bg-[#D6BA93] rounded"
              >
                Explore Services & Reserve
              </button>
            </div>
          ) : (
            displayedBookings.map((b) => (
              <div
                key={b.id}
                className="p-6 rounded-xl bg-[#0F121A] border border-white/10 hover:border-[#C5A880]/40 transition-colors flex flex-col lg:flex-row gap-6 justify-between"
              >
                {/* Visual and Core Details */}
                <div className="flex flex-col sm:flex-row gap-5 flex-1">
                  <div className="relative h-28 sm:h-36 w-full sm:w-48 rounded-lg overflow-hidden bg-neutral-900 shrink-0">
                    <Image
                      src={b.image}
                      alt={b.title}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#C5A880]">
                        {b.referenceNumber}
                      </span>
                      <span aria-hidden="true" className="text-neutral-600">·</span>
                      <span className="text-xs text-neutral-400 font-medium">
                        {b.paymentMethod}
                      </span>
                      <span
                        className={`ml-auto sm:ml-2 text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded ${
                          b.status === 'Confirmed'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : b.status === 'Chauffeur Assigned'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-neutral-800 text-neutral-300'
                        }`}
                      >
                        {b.status}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-white">
                      {b.title}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300 pt-1">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                        {b.date} at {b.time}
                      </span>
                      <span className="flex items-center gap-1.5 truncate">
                        <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                        {b.pickupLocation || 'FBO Tarmac'}
                      </span>
                    </div>

                    {b.specialRequests && (
                      <p className="text-[11px] text-neutral-400 italic bg-black/30 p-2 rounded border border-white/5 line-clamp-1">
                        &quot;{b.specialRequests}&quot;
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Side: Price & Actions */}
                <div className="flex flex-col justify-between items-start lg:items-end border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-6 shrink-0 space-y-4">
                  <div className="lg:text-right">
                    <p className="text-[10px] uppercase text-neutral-500">Total Settled</p>
                    <p className="text-2xl font-bold text-white tabular-nums">${b.totalAmount} USD</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                    <button
                      onClick={() => setSelectedReceipt(b)}
                      className="px-3 py-1.5 text-xs text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded flex items-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>View Receipt</span>
                    </button>

                    <button
                      onClick={() => handleDownload(b)}
                      className="px-3 py-1.5 text-xs text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Voucher</span>
                    </button>

                    <button
                      onClick={() => setIsChatbotOpen(true)}
                      className="px-3 py-1.5 text-xs text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded flex items-center gap-1.5 cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>Contact Desk</span>
                    </button>

                    {b.status !== 'Pending Review' && b.status !== 'Completed' && (
                      <button
                        onClick={() => cancelBooking(b.id)}
                        className="px-3 py-1.5 text-xs text-neutral-400 hover:text-rose-300 hover:bg-rose-950/30 rounded transition-colors cursor-pointer"
                      >
                        Cancel Request
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

      </div>

      {/* Detailed Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-xl bg-[#0F121A] border border-white/20 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold">
                  Official Client Receipt
                </span>
                <h3 className="font-display text-xl font-bold text-white">
                  Reference: {selectedReceipt.referenceNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-md bg-white/5 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-neutral-300">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-neutral-500">Service:</span>
                <strong className="text-white">{selectedReceipt.title}</strong>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-neutral-500">Date & Time:</span>
                <span className="text-white">{selectedReceipt.date} at {selectedReceipt.time}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-neutral-500">Guest Count:</span>
                <span className="text-white">{selectedReceipt.guests} Passengers</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-neutral-500">Pickup:</span>
                <span className="text-white">{selectedReceipt.pickupLocation}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-neutral-500">Drop-off:</span>
                <span className="text-white">{selectedReceipt.destinationLocation}</span>
              </div>

              {selectedReceipt.extras.length > 0 && (
                <div className="border-b border-white/5 pb-2 space-y-1">
                  <span className="text-neutral-500 block">Extras:</span>
                  {selectedReceipt.extras.map((e, idx) => (
                    <div key={idx} className="flex justify-between text-neutral-400 pl-2">
                      <span>{e.name}</span>
                      <span className="font-mono">${e.price}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-2 space-y-1 text-sm">
                <div className="flex justify-between font-bold text-white">
                  <span className="text-[#C5A880]">Total Settled:</span>
                  <span className="text-[#C5A880] font-mono">${selectedReceipt.totalAmount} USD</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => handleDownload(selectedReceipt)}
                className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#C5A880] text-black hover:bg-[#D6BA93] rounded text-center cursor-pointer"
              >
                Download Receipt Copy
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
