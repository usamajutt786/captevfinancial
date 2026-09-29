'use client';

import React from 'react';
import Image from 'next/image';
import { useApp } from '../context/AppContext';
import { VEHICLE_FLEET, BOAT_CHARTERS, EXCURSIONS } from '../data/mockData';
import { X, Trash2, ArrowRight, Heart, Calendar } from 'lucide-react';

export default function SavedDrawer() {
  const { 
    isSavedDrawerOpen, 
    setIsSavedDrawerOpen, 
    savedItemIds, 
    toggleSaved, 
    openBookingModal, 
    setSelectedExperienceForDetail 
  } = useApp();

  if (!isSavedDrawerOpen) return null;

  const allOfferings = [...VEHICLE_FLEET, ...BOAT_CHARTERS, ...EXCURSIONS];
  const savedItems = allOfferings.filter((item) => savedItemIds.includes(item.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md h-full bg-[#0F121A] border-l border-white/10 shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#C5A880] fill-[#C5A880]" />
            <h2 className="font-display text-xl font-bold text-white">
              Curated Wishlist ({savedItems.length})
            </h2>
          </div>

          <button
            onClick={() => setIsSavedDrawerOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-white rounded-md bg-white/5 transition-colors cursor-pointer"
            aria-label="Close saved drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {savedItems.length === 0 ? (
            <div className="text-center py-20 text-neutral-400 space-y-3">
              <Heart className="w-12 h-12 text-neutral-600 mx-auto" />
              <p className="text-sm font-medium text-white">Your curated list is currently empty.</p>
              <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                Click the heart icon on any vehicle, yacht charter, or private excursion to save it for immediate reference.
              </p>
            </div>
          ) : (
            savedItems.map((item: any) => {
              const itemTitle = item.name || item.title;
              const priceLabel = item.hourlyRate
                ? `$${item.hourlyRate} / hr`
                : item.pricePerPerson
                ? `$${item.pricePerPerson} / guest`
                : `$${item.halfDayRate} half-day`;

              return (
                <div
                  key={item.id}
                  className="p-3.5 rounded-lg bg-[#181B24] border border-white/5 hover:border-[#C5A880]/30 transition-all space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-16 w-20 rounded overflow-hidden bg-neutral-900 shrink-0">
                      <Image
                        src={item.image}
                        alt={itemTitle}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{itemTitle}</h4>
                      <p className="text-[11px] text-[#C5A880] tabular-nums mt-0.5">{priceLabel}</p>
                      <p className="text-[10px] text-neutral-400 truncate">
                        {item.destination || item.classType || item.boatType}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleSaved(item.id, itemTitle)}
                      className="p-1.5 text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center gap-2">
                    <button
                      onClick={() => {
                        setIsSavedDrawerOpen(false);
                        setSelectedExperienceForDetail(item);
                      }}
                      className="flex-1 py-1.5 text-[11px] text-neutral-300 hover:text-white bg-white/5 rounded transition-colors text-center cursor-pointer"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => {
                        setIsSavedDrawerOpen(false);
                        openBookingModal(item);
                      }}
                      className="flex-1 py-1.5 text-[11px] font-semibold uppercase tracking-wider bg-[#C5A880] text-black hover:bg-[#D6BA93] rounded transition-all text-center cursor-pointer"
                    >
                      Reserve Now
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {savedItems.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-black/40">
            <button
              onClick={() => {
                setIsSavedDrawerOpen(false);
                openBookingModal(null);
              }}
              className="w-full py-3 text-xs font-semibold tracking-widest uppercase bg-[#C5A880] text-black hover:bg-[#D6BA93] rounded transition-all text-center cursor-pointer"
            >
              Reserve Custom Combination
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
