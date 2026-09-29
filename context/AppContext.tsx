'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Vehicle, BoatCharter, ExcursionItem, BookingRecord } from '../types';
import { INITIAL_BOOKINGS, VEHICLE_FLEET, BOAT_CHARTERS, EXCURSIONS } from '../data/mockData';

export type NavTab = 
  | 'home'
  | 'chauffeur'
  | 'black-truck'
  | 'boat-rental'
  | 'excursions'
  | 'experiences'
  | 'about'
  | 'contact'
  | 'custom'
  | 'my-bookings'
  | 'payment-link';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'gold';
}

interface AppContextType {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  savedItemIds: string[];
  toggleSaved: (id: string, title?: string) => void;
  isSaved: (id: string) => boolean;
  bookings: BookingRecord[];
  addBooking: (bookingData: {
    serviceType: BookingRecord['serviceType'];
    title: string;
    image: string;
    date: string;
    time: string;
    guests: number;
    pickupLocation?: string;
    destinationLocation?: string;
    duration?: string;
    extras: { name: string; price: number }[];
    basePrice: number;
    serviceFee: number;
    totalAmount: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    specialRequests?: string;
    paymentMethod: BookingRecord['paymentMethod'];
  }) => BookingRecord;
  cancelBooking: (id: string) => void;
  isBookingModalOpen: boolean;
  bookingTarget: Vehicle | BoatCharter | ExcursionItem | null;
  openBookingModal: (item?: Vehicle | BoatCharter | ExcursionItem | null) => void;
  closeBookingModal: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isChatbotOpen: boolean;
  setIsChatbotOpen: (open: boolean) => void;
  isSavedDrawerOpen: boolean;
  setIsSavedDrawerOpen: (open: boolean) => void;
  policyModal: 'privacy' | 'terms' | 'booking-policy' | 'cancellation' | null;
  openPolicy: (type: 'privacy' | 'terms' | 'booking-policy' | 'cancellation') => void;
  closePolicy: () => void;
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'info' | 'gold') => void;
  removeToast: (id: string) => void;
  selectedExperienceForDetail: ExcursionItem | Vehicle | BoatCharter | null;
  setSelectedExperienceForDetail: (item: ExcursionItem | Vehicle | BoatCharter | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTabState] = useState<NavTab>('home');
  const toastCounterRef = useRef(0);
  const bookingCounterRef = useRef(0);
  const [savedItemIds, setSavedItemIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('aureus_saved_items');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return [];
  });
  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('aureus_user_bookings');
        if (stored) return JSON.parse(stored);
      } catch {}
    }
    return INITIAL_BOOKINGS;
  });
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingTarget, setBookingTarget] = useState<Vehicle | BoatCharter | ExcursionItem | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [policyModal, setPolicyModal] = useState<'privacy' | 'terms' | 'booking-policy' | 'cancellation' | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [selectedExperienceForDetail, setSelectedExperienceForDetail] = useState<ExcursionItem | Vehicle | BoatCharter | null>(null);

  const addToast = (message: string, type: 'success' | 'info' | 'gold' = 'gold') => {
    toastCounterRef.current += 1;
    const id = 'toast-' + toastCounterRef.current;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleSaved = (id: string, title?: string) => {
    setSavedItemIds((prev) => {
      let updated: string[];
      if (prev.includes(id)) {
        updated = prev.filter((item) => item !== id);
        addToast(title ? `Removed "${title}" from favorites` : 'Removed from saved experiences', 'info');
      } else {
        updated = [...prev, id];
        addToast(title ? `Saved "${title}" to your curated list` : 'Saved to favorites', 'gold');
      }
      try {
        localStorage.setItem('aureus_saved_items', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const isSaved = (id: string) => savedItemIds.includes(id);

  const addBooking = (bookingData: {
    serviceType: BookingRecord['serviceType'];
    title: string;
    image: string;
    date: string;
    time: string;
    guests: number;
    pickupLocation?: string;
    destinationLocation?: string;
    duration?: string;
    extras: { name: string; price: number }[];
    basePrice: number;
    serviceFee: number;
    totalAmount: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    specialRequests?: string;
    paymentMethod: BookingRecord['paymentMethod'];
  }) => {
    bookingCounterRef.current += 1;
    const refNum = 'AUR-' + (8400 + (bookingCounterRef.current % 1000)) + '-VIP';
    const newRecord: BookingRecord = {
      ...bookingData,
      id: 'book-' + bookingCounterRef.current,
      referenceNumber: refNum,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    setBookings((prev) => {
      const updated = [newRecord, ...prev];
      try {
        localStorage.setItem('aureus_user_bookings', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    addToast(`Reservation ${refNum} confirmed! Available in My Bookings.`, 'gold');
    return newRecord;
  };

  const cancelBooking = (id: string) => {
    setBookings((prev) => {
      const updated = prev.map((b) =>
        b.id === id ? { ...b, status: 'Pending Review' as const } : b
      );
      try {
        localStorage.setItem('aureus_user_bookings', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    addToast('Cancellation request submitted to concierge desk for review', 'info');
  };

  const openBookingModal = (item?: Vehicle | BoatCharter | ExcursionItem | null) => {
    setBookingTarget(item || null);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  const openPolicy = (type: 'privacy' | 'terms' | 'booking-policy' | 'cancellation') => {
    setPolicyModal(type);
  };

  const closePolicy = () => {
    setPolicyModal(null);
  };

  const setActiveTab = (tab: NavTab) => {
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        savedItemIds,
        toggleSaved,
        isSaved,
        bookings,
        addBooking,
        cancelBooking,
        isBookingModalOpen,
        bookingTarget,
        openBookingModal,
        closeBookingModal,
        isSearchOpen,
        setIsSearchOpen,
        isChatbotOpen,
        setIsChatbotOpen,
        isSavedDrawerOpen,
        setIsSavedDrawerOpen,
        policyModal,
        openPolicy,
        closePolicy,
        toasts,
        addToast,
        removeToast,
        selectedExperienceForDetail,
        setSelectedExperienceForDetail
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
