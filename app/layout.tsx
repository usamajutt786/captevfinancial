import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '../context/AppContext';

export const metadata: Metadata = {
  title: 'AUREUS | Luxury Chauffeur, Yacht Charters & Bespoke Private Experiences',
  description: 'Premier private mobility and concierge platform offering executive chauffeur services, bespoke black SUV fleet rentals, private yacht charters, and curated VIP excursions.',
  keywords: [
    'luxury chauffeur',
    'black truck rental',
    'private yacht charter',
    'executive airport transfer',
    'VIP concierge',
    'luxury travel experiences',
    'private jet tarmac meet',
    'Cadillac Escalade ESV rental'
  ],
  authors: [{ name: 'Aureus Luxury Concierge' }],
  openGraph: {
    title: 'AUREUS | Luxury Chauffeur, Yacht Charters & Bespoke Private Experiences',
    description: 'Premier private mobility and concierge platform offering executive chauffeur services, bespoke black SUV fleet rentals, private yacht charters, and curated VIP excursions.',
    type: 'website',
    locale: 'en_US',
    siteName: 'AUREUS Experiences',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AUREUS | Luxury Chauffeur, Yacht Charters & Bespoke Private Experiences',
    description: 'Premier private mobility and concierge platform offering executive chauffeur services, bespoke black SUV fleet rentals, private yacht charters, and curated VIP excursions.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Aureus Luxury Concierge & Fleet',
    description: 'Premier luxury transportation, private chauffeur, luxury yacht charters, and bespoke VIP travel experiences.',
    image: '/images/hero.jpg',
    priceRange: '$$$$',
    telephone: '+1-800-892-2873',
    email: 'concierge@aureusexperiences.com',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Credit Card, Wire Transfer, Concierge Invoice',
    openingHours: 'Mo,Tu,We,Th,Fr,Sa,Su 00:00-24:00',
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#08090C] text-[#EAEBF0] antialiased selection:bg-[#C5A880]/30 selection:text-[#FBF9F5] min-h-screen flex flex-col font-sans">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
