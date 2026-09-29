'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useApp } from '../context/AppContext';
import { BOOKING_EXTRAS, VEHICLE_FLEET, BOAT_CHARTERS, EXCURSIONS } from '../data/mockData';
import { 
  X, 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  ExternalLink, 
  Copy, 
  Loader2, 
  ArrowRight, 
  ArrowLeft,
  CalendarPlus,
  Car,
  Anchor,
  Compass
} from 'lucide-react';
import { BookingRecord, Vehicle, BoatCharter, ExcursionItem } from '../types';

export default function BookingModal() {
  const { 
    isBookingModalOpen, 
    closeBookingModal, 
    bookingTarget, 
    addBooking, 
    addToast,
    setActiveTab
  } = useApp();

  // Multi-step index: 1 through 6, then 7 is Confirmation Screen
  const [step, setStep] = useState(1);

  // Selected Service Override if user changes it within modal
  const [selectedOverride, setSelectedOverride] = useState<Vehicle | BoatCharter | ExcursionItem | null>(null);
  const selectedItem = selectedOverride || bookingTarget || VEHICLE_FLEET[0];

  // Step 2: Schedule & Party
  const [date, setDate] = useState('2026-10-15');
  const [time, setTime] = useState('14:00');
  const [guests, setGuests] = useState(2);
  const [pickupAddress, setPickupAddress] = useState('Signature Flight Support FBO, Runway 12');
  const [dropoffAddress, setDropoffAddress] = useState('The Setai Miami Beach Penthouse');

  // Step 3: Selected Extras
  const [selectedExtraIds, setSelectedExtraIds] = useState<string[]>(['ext-champagne-dom']);

  // Step 4: Passenger Info
  const [customerName, setCustomerName] = useState('Harrison Croft');
  const [customerEmail, setCustomerEmail] = useState('harrison.croft@croftcapital.com');
  const [customerPhone, setCustomerPhone] = useState('+1 (555) 892-4411');
  const [specialRequests, setSpecialRequests] = useState('Flight Tail: N942HC arriving at 13:45. Please chill the Dom Pérignon to 45°F.');

  // Step 6: Payment mode & simulation
  const [paymentMode, setPaymentMode] = useState<'internal' | 'external-link'>('internal');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 8842');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvc, setCardCvc] = useState('942');
  const [cardZip, setCardZip] = useState('33139');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  // External Link Modal state
  const [copiedLink, setCopiedLink] = useState(false);

  const handleClose = () => {
    setSelectedOverride(null);
    setStep(1);
    setConfirmedBooking(null);
    closeBookingModal();
  };

  if (!isBookingModalOpen) return null;

  // Calculate pricing
  const getBasePrice = () => {
    if (!selectedItem) return 555;
    if ('hourlyRate' in selectedItem) {
      return (selectedItem as Vehicle).hourlyRate * (selectedItem as Vehicle).minimumHours;
    }
    if ('pricePerPerson' in selectedItem) {
      return (selectedItem as ExcursionItem).pricePerPerson * guests;
    }
    return 650;
  };

  const selectedExtrasList = BOOKING_EXTRAS.filter((e) => selectedExtraIds.includes(e.id));
  const extrasTotal = selectedExtrasList.reduce((acc, curr) => acc + curr.price, 0);
  const basePrice = getBasePrice();
  const serviceFee = Math.round((basePrice + extrasTotal) * 0.1);
  const grandTotal = basePrice + extrasTotal + serviceFee;

  const toggleExtra = (id: string) => {
    setSelectedExtraIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNextStep = () => {
    if (step < 6) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleProcessPayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const serviceType = selectedItem && 'boatType' in selectedItem
        ? 'boat-rental'
        : selectedItem && 'pricePerPerson' in selectedItem
        ? 'excursion'
        : 'chauffeur';

      const itemTitle = selectedItem
        ? 'name' in selectedItem
          ? selectedItem.name
          : selectedItem.title
        : 'Executive Reservation';

      const newRecord = addBooking({
        serviceType,
        title: itemTitle,
        image: selectedItem ? selectedItem.image : '/images/hero.jpg',
        date,
        time,
        guests,
        pickupLocation: pickupAddress,
        destinationLocation: dropoffAddress,
        duration: 'Hourly / Dedicated Standby',
        extras: selectedExtrasList.map((e) => ({ name: e.name, price: e.price })),
        basePrice,
        serviceFee,
        totalAmount: grandTotal,
        customerName,
        customerEmail,
        customerPhone,
        specialRequests,
        paymentMethod: paymentMode === 'internal' ? 'Credit Card (Simulated)' : 'Concierge Payment Link'
      });

      setIsProcessing(false);
      setConfirmedBooking(newRecord);
      setStep(7); // Show confirmation view
    }, 1200);
  };

  const handleDownloadConfirmation = () => {
    if (!confirmedBooking) return;
    const confirmationText = `
======================================================
           AUREUS PRIVATE CONCIERGE & FLEET
               RESERVATION CONFIRMATION
======================================================
Reference Number: ${confirmedBooking.referenceNumber}
Booking Status:   ${confirmedBooking.status}
Issued Date:      ${new Date().toLocaleDateString()}

CLIENT INFORMATION:
  Name:  ${confirmedBooking.customerName}
  Email: ${confirmedBooking.customerEmail}
  Phone: ${confirmedBooking.customerPhone}

JOURNEY DETAILS:
  Service:      ${confirmedBooking.title}
  Date & Time:  ${confirmedBooking.date} at ${confirmedBooking.time}
  Guest Count:  ${confirmedBooking.guests} Passengers
  Pickup:       ${confirmedBooking.pickupLocation}
  Destination:  ${confirmedBooking.destinationLocation}

ADD-ONS & PROVISIONS:
${confirmedBooking.extras.map(e => `  - ${e.name} ($${e.price})`).join('\n')}

FINANCIAL SUMMARY:
  Base Rate:       $${confirmedBooking.basePrice}
  Extras Total:    $${extrasTotal}
  Concierge Fee:   $${confirmedBooking.serviceFee}
  ---------------------------------------------
  TOTAL CHARGED:   $${confirmedBooking.totalAmount} (USD)
  Payment Method:  ${confirmedBooking.paymentMethod}

24/7 VIP Concierge Dispatch: +1 (800) 892-AUREUS
Email: concierge@aureusexperiences.com
======================================================
`;
    const element = document.createElement('a');
    const file = new Blob([confirmationText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Aureus_Confirmation_${confirmedBooking.referenceNumber}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    addToast('Downloaded official confirmation voucher file', 'success');
  };

  const handleAddToCalendar = () => {
    addToast('Calendar event added for ' + date + ' at ' + time, 'gold');
  };

  const handleCopyPaymentLink = () => {
    const dummyUrl = `https://aureusexperiences.com/pay?ref=AUR-${Math.floor(1000 + Math.random() * 9000)}`;
    navigator.clipboard?.writeText(dummyUrl);
    setCopiedLink(true);
    addToast('Copied secure concierge invoice link to clipboard', 'gold');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-xl bg-[#0F121A] border border-white/20 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div>
            <span className="text-[10px] uppercase font-semibold tracking-widest text-[#C5A880]">
              Aureus VIP Reservation Protocol
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
              {step === 7 ? 'Reservation Confirmed' : `Step ${step} of 6: ${
                step === 1 ? 'Select Fleet or Experience' :
                step === 2 ? 'Schedule & Logistics' :
                step === 3 ? 'Enhancements & Add-ons' :
                step === 4 ? 'Client & Passenger Details' :
                step === 5 ? 'Itemized Summary' :
                'Payment Simulation'
              }`}
            </h2>
          </div>

          <button
            onClick={handleClose}
            className="p-2 text-neutral-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">

          {/* STEP 1: SELECT EXPERIENCE */}
          {step === 1 && (
            <div className="space-y-6">
              <p className="text-xs text-neutral-400">
                Choose the vehicle, yacht, or excursion you wish to reserve for your party.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                {[...VEHICLE_FLEET, ...BOAT_CHARTERS, ...EXCURSIONS].map((item: any) => {
                  const isSelected = selectedItem?.id === item.id;
                  const itemTitle = item.name || item.title;
                  const priceLabel = item.hourlyRate
                    ? `$${item.hourlyRate}/hr`
                    : item.pricePerPerson
                    ? `$${item.pricePerPerson}/guest`
                    : `$${item.halfDayRate} half-day`;

                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedOverride(item)}
                      className={`p-3 rounded-lg border text-left flex items-center gap-3 transition-colors cursor-pointer ${
                        isSelected
                          ? 'border-[#C5A880] bg-[#C5A880]/10 text-white'
                          : 'border-white/10 bg-[#181B24] text-neutral-300 hover:border-white/30'
                      }`}
                    >
                      <div className="relative h-14 w-20 rounded overflow-hidden shrink-0 bg-neutral-900">
                        <Image
                          src={item.image}
                          alt={itemTitle}
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate">{itemTitle}</p>
                        <p className="text-[11px] text-[#C5A880] tabular-nums">{priceLabel}</p>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: SCHEDULE & PARTY */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                    Reservation Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-[#C5A880]" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#181B24] border border-white/10 rounded-md pl-10 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                    Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-2.5 w-4 h-4 text-[#C5A880]" />
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-[#181B24] border border-white/10 rounded-md pl-10 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                    Number of Guests
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-2.5 w-4 h-4 text-[#C5A880]" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-[#181B24] border border-white/10 rounded-md pl-10 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10, 12, 14].map((n) => (
                        <option key={n} value={n}>{n} Guests</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                  Pickup Location / Airport FBO / Marina
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-[#C5A880]" />
                  <input
                    type="text"
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    className="w-full bg-[#181B24] border border-white/10 rounded-md pl-10 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                  Destination / Drop-off
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-[#C5A880]" />
                  <input
                    type="text"
                    value={dropoffAddress}
                    onChange={(e) => setDropoffAddress(e.target.value)}
                    className="w-full bg-[#181B24] border border-white/10 rounded-md pl-10 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: EXTRAS */}
          {step === 3 && (
            <div className="space-y-4">
              <p className="text-xs text-neutral-400">
                Enhance your itinerary with bespoke beverages, security, or airside ramp permits.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                {BOOKING_EXTRAS.map((extra) => {
                  const isChecked = selectedExtraIds.includes(extra.id);
                  return (
                    <div
                      key={extra.id}
                      onClick={() => toggleExtra(extra.id)}
                      className={`p-3.5 rounded-lg border text-left flex flex-col justify-between transition-colors cursor-pointer ${
                        isChecked
                          ? 'border-[#C5A880] bg-[#C5A880]/10 text-white'
                          : 'border-white/10 bg-[#181B24] text-neutral-300 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-semibold text-white">{extra.name}</p>
                        <span className="text-xs font-mono font-bold text-[#C5A880] shrink-0">
                          +${extra.price}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-neutral-400 leading-relaxed">
                        {extra.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: CUSTOMER DETAILS */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                    Lead Passenger Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-[#181B24] border border-white/10 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-[#181B24] border border-white/10 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-[#181B24] border border-white/10 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                  Special Instructions, Flight Tail #, or Dietary Requests
                </label>
                <textarea
                  rows={3}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Flight tail N842VJ landing at 2pm, luggage count 5 large rimowa cases, prefer interior AC set to 69F..."
                  className="w-full bg-[#181B24] border border-white/10 rounded-md p-3 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                />
              </div>
            </div>
          )}

          {/* STEP 5: BOOKING SUMMARY */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[#181B24] border border-white/10 space-y-3 text-xs">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-400">Experience / Fleet:</span>
                  <strong className="text-white">
                    {selectedItem ? ('name' in selectedItem ? selectedItem.name : selectedItem.title) : 'Executive Reservation'}
                  </strong>
                </div>

                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-400">Date & Departure Time:</span>
                  <span className="text-white">{date} at {time}</span>
                </div>

                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-400">Guests & Transit:</span>
                  <span className="text-white">{guests} Passengers · {pickupAddress}</span>
                </div>

                {selectedExtrasList.length > 0 && (
                  <div className="border-b border-white/5 pb-2">
                    <p className="text-neutral-400 mb-1">Selected Enhancements:</p>
                    {selectedExtrasList.map((e) => (
                      <div key={e.id} className="flex justify-between text-neutral-300 pl-2">
                        <span>+ {e.name}</span>
                        <span className="font-mono">${e.price}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-2 space-y-1 text-neutral-400">
                  <div className="flex justify-between">
                    <span>Base Charter / Transit Rate:</span>
                    <span className="font-mono text-white">${basePrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Add-ons Total:</span>
                    <span className="font-mono text-white">${extrasTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VIP Concierge & Operations Surcharge (10%):</span>
                    <span className="font-mono text-white">${serviceFee}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                    <span className="text-[#C5A880]">Total Investment:</span>
                    <span className="font-mono text-[#C5A880]">${grandTotal} USD</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: PAYMENT SIMULATION */}
          {step === 6 && (
            <div className="space-y-6">
              {/* Payment Mode Selector: Internal vs External Link */}
              <div className="flex items-center gap-3 p-1 bg-black/50 border border-white/10 rounded-lg">
                <button
                  type="button"
                  onClick={() => setPaymentMode('internal')}
                  className={`flex-1 py-2 text-xs font-medium rounded transition-colors ${
                    paymentMode === 'internal'
                      ? 'bg-[#C5A880] text-black font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Instant Secure Checkout (Simulated)
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMode('external-link')}
                  className={`flex-1 py-2 text-xs font-medium rounded transition-colors ${
                    paymentMode === 'external-link'
                      ? 'bg-[#C5A880] text-black font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Generate Concierge Payment Link
                </button>
              </div>

              {paymentMode === 'internal' ? (
                <div className="p-4 rounded-lg bg-[#181B24] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span className="flex items-center gap-1.5 text-white">
                      <CreditCard className="w-4 h-4 text-[#C5A880]" />
                      Encrypted Card Authorization (Prototype)
                    </span>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit SSL Ready
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="col-span-2">
                      <label className="block text-neutral-400 text-[10px] uppercase mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded p-2 text-white font-mono text-xs focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 text-[10px] uppercase mb-1">Expiry</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded p-2 text-white font-mono text-xs focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 text-[10px] uppercase mb-1">CVC / CVV</label>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded p-2 text-white font-mono text-xs focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                  </div>

                  <p className="text-[10px] text-neutral-500">
                    Notice: This is a simulated prototype screen. No real funds will be charged. Clicking submit generates an active booking reference.
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-[#181B24] border border-white/10 space-y-4 text-xs">
                  <div className="flex items-center gap-2 text-[#C5A880] font-semibold">
                    <ExternalLink className="w-4 h-4" />
                    <span>External Corporate Invoice & Payment Link Option</span>
                  </div>
                  <p className="text-neutral-400 leading-relaxed">
                    Designed for corporate travel planners and executive assistants. Generates a secure shareable link that can be forwarded to family offices or accounting departments for wire or corporate card checkout.
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value="https://aureusexperiences.com/pay?ref=AUR-8921-INVOICE"
                      className="flex-1 bg-black/60 border border-white/10 rounded p-2 font-mono text-[11px] text-neutral-300"
                    />
                    <button
                      type="button"
                      onClick={handleCopyPaymentLink}
                      className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded flex items-center gap-1.5 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 7: CONFIRMATION SCREEN */}
          {step === 7 && confirmedBooking && (
            <div className="space-y-6 text-center animate-fadeIn">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#C5A880]/20 text-[#C5A880] mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
                  Reference: {confirmedBooking.referenceNumber}
                </span>
                <h3 className="font-display text-3xl font-bold text-white mt-1">
                  Your Journey Is Confirmed
                </h3>
                <p className="text-xs text-neutral-400 mt-2 max-w-md mx-auto">
                  A dedicated concierge has been assigned. Confirmation voucher and driver contact telemetry dispatched to <strong className="text-white">{confirmedBooking.customerEmail}</strong>.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#181B24] border border-white/10 text-left text-xs space-y-2 max-w-lg mx-auto">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Experience:</span>
                  <strong className="text-white">{confirmedBooking.title}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Date & Time:</span>
                  <span className="text-white">{confirmedBooking.date} at {confirmedBooking.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Guests & Pickup:</span>
                  <span className="text-white">{confirmedBooking.guests} Guests · {confirmedBooking.pickupLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Total Settled:</span>
                  <strong className="text-[#C5A880] font-mono">${confirmedBooking.totalAmount} USD</strong>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleDownloadConfirmation}
                  className="px-4 py-2 text-xs font-medium text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Voucher (.txt)</span>
                </button>

                <button
                  onClick={handleAddToCalendar}
                  className="px-4 py-2 text-xs font-medium text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded flex items-center gap-1.5 cursor-pointer"
                >
                  <CalendarPlus className="w-3.5 h-3.5" />
                  <span>Add to Calendar</span>
                </button>

                <button
                  onClick={() => {
                    handleClose();
                    setActiveTab('my-bookings');
                  }}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#C5A880] text-black hover:bg-[#D6BA93] rounded cursor-pointer"
                >
                  View in My Bookings
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation Bar */}
        {step < 7 && (
          <div className="p-4 sm:p-6 border-t border-white/10 bg-black/40 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-3">
              {step < 6 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2.5 text-xs font-semibold tracking-wider uppercase bg-[#C5A880] text-black hover:bg-[#D6BA93] rounded flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleProcessPayment}
                  disabled={isProcessing}
                  className="px-8 py-3 text-xs font-semibold tracking-widest uppercase bg-[#C5A880] text-black hover:bg-[#D6BA93] rounded flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Authorizing Reservation...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Authorize & Finalize Booking (${grandTotal})</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
