'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import ServiceCategories from '../components/ServiceCategories';
import FeaturedExperiences from '../components/FeaturedExperiences';
import WhyChooseUs from '../components/WhyChooseUs';
import HowItWorks from '../components/HowItWorks';
import DestinationsGallery from '../components/DestinationsGallery';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';

// Dedicated Views
import ChauffeurServicesView from '../components/ChauffeurServicesView';
import BlackTrucksView from '../components/BlackTrucksView';
import BoatsView from '../components/BoatsView';
import ExcursionsView from '../components/ExcursionsView';
import LuxuryExperiencesView from '../components/LuxuryExperiencesView';
import AboutView from '../components/AboutView';
import ContactView from '../components/ContactView';
import CustomExperienceView from '../components/CustomExperienceView';
import MyBookingsView from '../components/MyBookingsView';
import PaymentLinkView from '../components/PaymentLinkView';

// Interactive Overlays & Modals
import BookingModal from '../components/BookingModal';
import ExperienceDetailModal from '../components/ExperienceDetailModal';
import Chatbot from '../components/Chatbot';
import SearchModal from '../components/SearchModal';
import SavedDrawer from '../components/SavedDrawer';
import PolicyModal from '../components/PolicyModal';
import Toast from '../components/Toast';

export default function HomePage() {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#08090C] text-neutral-100 selection:bg-[#C5A880]/30 selection:text-white">
      {/* Global Luxury Top Navigation Bar */}
      <Navbar />

      {/* Main Dynamic View Area */}
      <main className="flex-1 w-full">
        {activeTab === 'home' && (
          <>
            <Hero />
            <ServiceCategories />
            <FeaturedExperiences />
            <WhyChooseUs />
            <HowItWorks />
            <DestinationsGallery />
            <Testimonials />
            <CallToAction />
          </>
        )}

        {activeTab === 'chauffeur' && <ChauffeurServicesView />}
        {activeTab === 'black-truck' && <BlackTrucksView />}
        {activeTab === 'boat-rental' && <BoatsView />}
        {activeTab === 'excursions' && <ExcursionsView />}
        {activeTab === 'experiences' && <LuxuryExperiencesView />}
        {activeTab === 'about' && <AboutView />}
        {activeTab === 'contact' && <ContactView />}
        {activeTab === 'custom' && <CustomExperienceView />}
        {activeTab === 'my-bookings' && <MyBookingsView />}
        {activeTab === 'payment-link' && <PaymentLinkView />}
      </main>

      {/* Global Comprehensive Footer */}
      <Footer />

      {/* Global Interactive Overlays & Components */}
      <BookingModal />
      <ExperienceDetailModal />
      <Chatbot />
      <SearchModal />
      <SavedDrawer />
      <PolicyModal />
      <Toast />
    </div>
  );
}
