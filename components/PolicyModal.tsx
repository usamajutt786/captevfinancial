'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Shield, FileText, CheckCircle } from 'lucide-react';

export default function PolicyModal() {
  const { policyModal, closePolicy } = useApp();

  if (!policyModal) return null;

  const contentMap = {
    privacy: {
      title: 'Aureus Global Privacy & Discretion Policy',
      subtitle: 'Client Confidentiality Standard · Revision 2026',
      sections: [
        {
          heading: '1. Absolute Client Non-Disclosure',
          body: 'All client passenger identities, destinations, private aviation tail numbers, security details, and itinerary schedules are protected under strict executive non-disclosure standards. We do not sell, rent, or trade private passenger data with third-party advertising brokers.'
        },
        {
          heading: '2. Telemetry and Flight Tracking',
          body: 'GPS positioning telemetry is utilized exclusively during active charter services to coordinate plane-side meet and greets, traffic avoidance, and client safety. Data logs are retained solely for invoice auditing and securely archived.'
        },
        {
          heading: '3. Encrypted Transactions',
          body: 'All payment interactions and simulated card authorizations are processed under PCI-DSS compliant 256-bit SSL tokenization protocols.'
        }
      ]
    },
    terms: {
      title: 'Terms of Charter & Master Service Agreement',
      subtitle: 'Operational Terms & Conditions · Revision 2026',
      sections: [
        {
          heading: '1. Fleet Dispatch & Readiness',
          body: 'Aureus guarantees the dispatch of certified vehicles and maritime vessels as specified in your booking confirmation. All drivers and captains hold current commercial licenses and passenger endorsements.'
        },
        {
          heading: '2. Client Conduct & Safety',
          body: 'Clients and guests agree to adhere to all maritime safety instructions issued by the USCG Master Captain during yacht charters, as well as FAA security regulations within active FBO airfield ramp perimeters.'
        },
        {
          heading: '3. Substituted Vehicle Prohibition',
          body: 'In accordance with our Zero-Downgrade guarantee, if an unforeseen mechanical maintenance issue arises with a reserved vehicle, Aureus will substitute an upgraded or identical class vessel at zero additional charge.'
        }
      ]
    },
    'booking-policy': {
      title: 'Reservation & Dispatch Booking Policy',
      subtitle: 'Advance Notice & Allocation Standards',
      sections: [
        {
          heading: '1. Confirmation & Retainer',
          body: 'Reservations are officially confirmed upon successful authorization of the booking summary or via corporate payment invoice. Real-time driver telemetry is provided 60 minutes prior to scheduled departure.'
        },
        {
          heading: '2. Tarmac & FBO Protocols',
          body: 'Private airport airstair pickups require tail number and FBO details at least 4 hours in advance to pre-clear airside vehicle ramp security credentials.'
        },
        {
          heading: '3. Standby & Grace Periods',
          body: 'All airport transfers include 60 minutes of complimentary standby from actual wheels-down arrival time. Additional hourly standby is billed at the standard hourly fleet rate.'
        }
      ]
    },
    cancellation: {
      title: 'Cancellation, Credit & Weather Policy',
      subtitle: 'Flexible VIP Rescheduling Standards',
      sections: [
        {
          heading: '1. Chauffeur & Black Truck Cancellations',
          body: 'Reservations cancelled at least 12 hours prior to scheduled pickup receive a 100% refund or full flight credit voucher valid for 24 months.'
        },
        {
          heading: '2. Yacht Charters & Helicopter Excursions',
          body: 'Maritime and aviation experiences require 48 hours notice for full refund. In the event of adverse maritime weather or Small Craft Advisories issued by the National Weather Service, charters are rescheduled without penalty or refunded in full.'
        },
        {
          heading: '3. Modifications & Rerouting',
          body: 'In-transit itinerary route modifications and destination alterations are accommodated dynamically via your dedicated concierge.'
        }
      ]
    }
  };

  const current = contentMap[policyModal];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-xl bg-[#0F121A] border border-white/20 p-6 sm:p-8 space-y-6 max-h-[85vh] flex flex-col shadow-2xl">
        
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold">
              {current.subtitle}
            </span>
            <h3 className="font-display text-2xl font-bold text-white mt-1">
              {current.title}
            </h3>
          </div>

          <button
            onClick={closePolicy}
            className="p-1.5 text-neutral-400 hover:text-white rounded-md bg-white/5 cursor-pointer"
            aria-label="Close policy"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 space-y-6 text-xs text-neutral-300 pr-2">
          {current.sections.map((sec, idx) => (
            <div key={idx} className="space-y-2">
              <h4 className="font-bold text-white text-sm">{sec.heading}</h4>
              <p className="leading-relaxed text-neutral-400">{sec.body}</p>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={closePolicy}
            className="px-6 py-2 text-xs font-semibold uppercase tracking-wider bg-[#C5A880] text-black hover:bg-[#D6BA93] rounded cursor-pointer"
          >
            I Understand & Accept
          </button>
        </div>

      </div>
    </div>
  );
}
