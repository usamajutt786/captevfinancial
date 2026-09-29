'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { TESTIMONIALS } from '../data/mockData';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const prev = () => {
    setImageError(false);
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const next = () => {
    setImageError(false);
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  const getInitials = (name: string) => {
    return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
  };

  return (
    <section className="w-full bg-[#050608] py-24 border-b border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
              Verified Client Accounts
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Testimonials from Global Leaders
            </h2>
          </div>
          
          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="p-3 rounded-full border border-white/10 bg-[#0F121A] text-neutral-300 hover:text-white hover:border-[#C5A880] transition-colors cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="p-3 rounded-full border border-white/10 bg-[#0F121A] text-neutral-300 hover:text-white hover:border-[#C5A880] transition-colors cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Body */}
        <div className="relative p-8 md:p-12 rounded-lg bg-[#0F121A] border border-white/10 overflow-hidden">
          <Quote className="absolute top-6 right-6 w-20 h-20 text-white/[0.03] pointer-events-none" />

          <div className="max-w-4xl space-y-6">
            {/* Rating Stars */}
            <div className="flex items-center gap-1">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#C5A880] text-[#C5A880]" />
              ))}
              <span className="ml-3 text-xs text-neutral-400 font-mono">
                {current.experienceName}
              </span>
            </div>

            {/* Testimonial Quote */}
            <p className="text-lg md:text-2xl text-neutral-200 font-light leading-relaxed font-serif-luxury italic">
              &ldquo;{current.comment}&rdquo;
            </p>

            {/* Author Attribution */}
            <div className="pt-6 border-t border-white/10 flex items-center gap-4">
              {imageError ? (
                <div className="h-12 w-12 rounded-full bg-[#181B24] border border-[#C5A880]/50 flex items-center justify-center font-display font-bold text-sm text-[#C5A880] shrink-0">
                  {getInitials(current.name)}
                </div>
              ) : (
                <div className="relative h-12 w-12 rounded-full overflow-hidden border border-[#C5A880]/40 shrink-0 bg-[#181B24]">
                  <Image
                    src={current.avatar}
                    alt={current.name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                  />
                </div>
              )}

              <div>
                <p className="text-sm font-bold text-white tracking-wide">
                  {current.name}
                </p>
                <p className="text-xs text-neutral-400">
                  {current.role} · <span className="text-[#C5A880]">{current.companyOrCity}</span>
                </p>
              </div>

              <div className="ml-auto text-xs text-neutral-500 hidden sm:block">
                {current.date}
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="mt-8 flex items-center gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx ? 'w-8 bg-[#C5A880]' : 'w-2 bg-white/20'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
