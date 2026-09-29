'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CreditCard, ShieldCheck, CheckCircle2, ArrowRight, Loader2, DollarSign } from 'lucide-react';

export default function PaymentLinkView() {
  const { addToast, setActiveTab } = useApp();

  const [bookingRef, setBookingRef] = useState('AUR-9402-VIP');
  const [customerName, setCustomerName] = useState('Jonathan Vance');
  const [amount, setAmount] = useState('1287');
  const [description, setDescription] = useState('Mercedes-Maybach S580 Executive Airport Transfer and Tarmac Clearance');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 9921');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const tx = 'TXN-AUR-' + Math.floor(100000 + Math.random() * 900000);
      setTransactionId(tx);
      setIsProcessing(false);
      setIsSuccess(true);
      addToast(`Payment of $${amount} successfully authorized under ${tx}`, 'gold');
    }, 1200);
  };

  return (
    <div className="w-full bg-[#08090C] text-neutral-300 py-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-2">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
            Secure Client Transaction Portal
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Make a Concierge Payment
          </h1>
          <p className="text-xs text-neutral-400">
            Settle active charter invoices, custom excursion retainers, or executive fleet extensions securely.
          </p>
        </div>

        {isSuccess ? (
          <div className="p-8 sm:p-10 rounded-xl bg-[#0F121A] border border-[#C5A880]/50 text-center space-y-6 animate-fadeIn">
            <div className="h-16 w-16 rounded-full bg-[#C5A880]/20 text-[#C5A880] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-[#C5A880] font-semibold">{transactionId}</span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Payment Authorized & Settled
              </h2>
              <p className="text-xs text-neutral-400">
                Amount: <strong className="text-white">${amount} USD</strong> · Booking Reference: <strong className="text-white">{bookingRef}</strong>
              </p>
            </div>

            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              A consolidated electronic receipt has been dispatched to your primary account representative.
            </p>

            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setActiveTab('my-bookings');
                }}
                className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#C5A880] text-black hover:bg-[#D6BA93] rounded"
              >
                View in My Bookings
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handlePay} className="p-6 sm:p-8 rounded-xl bg-[#0F121A] border border-white/10 space-y-6 shadow-2xl">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                  Booking Reference #
                </label>
                <input
                  type="text"
                  required
                  value={bookingRef}
                  onChange={(e) => setBookingRef(e.target.value)}
                  className="w-full bg-[#181B24] border border-white/10 rounded-md p-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                  Customer / Entity Name
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#181B24] border border-white/10 rounded-md p-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                  Amount (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-[#C5A880] font-bold">$</span>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-[#181B24] border border-white/10 rounded-md pl-7 pr-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                  Description / Service Line
                </label>
                <input
                  type="text"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#181B24] border border-white/10 rounded-md p-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                />
              </div>
            </div>

            <div className="p-4 rounded-lg bg-black/40 border border-white/5 space-y-4">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span className="flex items-center gap-1.5 text-white">
                  <CreditCard className="w-4 h-4 text-[#C5A880]" />
                  Simulated Corporate Payment Card
                </span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit Encrypted
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="col-span-3">
                  <label className="block text-neutral-400 text-[10px] uppercase mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-[#181B24] border border-white/10 rounded p-2 text-white font-mono text-xs focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 text-[10px] uppercase mb-1">Expiry</label>
                  <input
                    type="text"
                    defaultValue="10/28"
                    className="w-full bg-[#181B24] border border-white/10 rounded p-2 text-white font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 text-[10px] uppercase mb-1">CVC</label>
                  <input
                    type="text"
                    defaultValue="891"
                    className="w-full bg-[#181B24] border border-white/10 rounded p-2 text-white font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 text-[10px] uppercase mb-1">Postal Code</label>
                  <input
                    type="text"
                    defaultValue="10022"
                    className="w-full bg-[#181B24] border border-white/10 rounded p-2 text-white font-mono text-xs"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 text-xs font-semibold tracking-widest uppercase bg-[#C5A880] text-black hover:bg-[#D6BA93] rounded transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authorizing Payment (${amount} USD)...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authorize Settlement of ${amount} USD</span>
                </>
              )}
            </button>

          </form>
        )}

      </div>
    </div>
  );
}
