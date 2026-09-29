import { Vehicle, BoatCharter, ExcursionItem, BookingExtra, BookingRecord, Testimonial, FAQItem } from '../types';

export const VEHICLE_FLEET: Vehicle[] = [
  {
    id: 'veh-cadillac-escalade-esv',
    name: 'Cadillac Escalade ESV Sport Platinum',
    category: 'black-truck',
    make: 'Cadillac',
    model: 'Escalade ESV',
    year: 2025,
    passengerCapacity: 6,
    luggageCapacity: 7,
    hourlyRate: 185,
    dailyRate: 1450,
    minimumHours: 3,
    image: '/images/black_suv.jpg',
    features: [
      'Onyx Black exterior with extended wheelbase',
      'Whisper-quiet acoustic double-pane glass',
      'AKG Studio Reference 36-speaker sound system',
      'Heated, ventilated massaging leather captain chairs',
      'High-speed 5G Wi-Fi & Apple AirPlay screens',
      'Complimentary chilled artisan Fiji waters & sparkling cider'
    ],
    description: 'The definitive executive flagship SUV. Built for high-profile arrivals, airport runway meets, and effortless long-distance travel in uncompromising dark luxury.',
    classType: 'Executive SUV'
  },
  {
    id: 'veh-mercedes-maybach-s580',
    name: 'Mercedes-Maybach S-Class 580 4MATIC',
    category: 'chauffeur',
    make: 'Mercedes-Benz',
    model: 'Maybach S580',
    year: 2025,
    passengerCapacity: 3,
    luggageCapacity: 3,
    hourlyRate: 220,
    dailyRate: 1750,
    minimumHours: 3,
    image: '/images/chauffeur.jpg',
    features: [
      'Executive rear seating with 43.5° recline & calf support',
      'Active road noise cancellation & Burmester High-End 4D audio',
      'Rear refrigerated compartment with silver-plated champagne flutes',
      'Panoramic roof with programmable ambient starlight ceiling',
      'Rear workspace folding tables and dual MBUX touch displays'
    ],
    description: 'The pinnacle of chauffeured refinement. Designed for corporate executives, dignitaries, and celebratory evenings demanding absolute silence and elegance.',
    classType: 'First Class Sedan'
  },
  {
    id: 'veh-yukon-denali-ultimate',
    name: 'GMC Yukon Denali Ultimate Black Edition',
    category: 'black-truck',
    make: 'GMC',
    model: 'Yukon Denali Ultimate',
    year: 2025,
    passengerCapacity: 7,
    luggageCapacity: 6,
    hourlyRate: 165,
    dailyRate: 1250,
    minimumHours: 3,
    image: '/images/black_suv.jpg',
    features: [
      'Full blacked-out Vader chrome trim & 22-inch dark wheels',
      'Alpine Umber full-grain leather upholstery with laser etching',
      'Adaptive air ride suspension for glass-smooth transit',
      'Panoramic sunroof and rear privacy window shades',
      'Onboard fast wireless charging docks and 110V power outlets'
    ],
    description: 'Commanding road presence paired with first-class comfort. Ideal for executive entourages, sporting events, and family luxury excursions.',
    classType: 'Executive SUV'
  },
  {
    id: 'veh-mercedes-sprinter-vip',
    name: 'Mercedes-Benz Sprinter Jet-Class Edition',
    category: 'chauffeur',
    make: 'Mercedes-Benz',
    model: 'Sprinter Jet-Van',
    year: 2025,
    passengerCapacity: 9,
    luggageCapacity: 12,
    hourlyRate: 260,
    dailyRate: 2100,
    minimumHours: 4,
    image: '/images/hero.jpg',
    features: [
      'Private aviation style cabin with 6 full-electric swivel captain seats',
      '43-inch 4K Smart TV partition with motorized privacy glass',
      'Nespresso coffee bar, luxury minibar & concealed storage safe',
      'Full-height walk-in headroom and mood lighting suites',
      'Dedicated luggage annex accommodating 12 full-size suitcases'
    ],
    description: 'A private business jet on wheels. Perfect for executive board transfers, golf resort getaways, and VIP touring groups wanting mobile meeting spaces.',
    classType: 'Luxury Sprinter'
  },
  {
    id: 'veh-range-rover-sv',
    name: 'Range Rover SV Long Wheelbase',
    category: 'black-truck',
    make: 'Land Rover',
    model: 'Range Rover SV LWB',
    year: 2025,
    passengerCapacity: 4,
    luggageCapacity: 4,
    hourlyRate: 240,
    dailyRate: 1900,
    minimumHours: 3,
    image: '/images/black_suv.jpg',
    features: [
      'SV Signature Suite with electrically deployable club table',
      'Semi-aniline leather interior with satin ceramic controls',
      'Integrated rear cooler box with Dartington crystal glassware',
      'Executive class comfort-plus rear massage chairs',
      'All-wheel steering for smooth urban maneuvers'
    ],
    description: 'Understated British luxury and unmatched capability. The choice for discerning VIPs visiting private estates, ski retreats, or premier galas.',
    classType: 'Executive SUV'
  }
];

export const BOAT_CHARTERS: BoatCharter[] = [
  {
    id: 'yacht-sunseeker-74',
    name: '74ft Sunseeker Manhattan "Aureus Sovereign"',
    boatType: 'Motor Yacht',
    lengthFeet: 74,
    capacity: 12,
    staterooms: 4,
    location: 'Biscayne Bay & Ocean Passage',
    hourlyRate: 950,
    halfDayRate: 3600,
    fullDayRate: 6800,
    captainIncluded: true,
    crewCount: 3,
    amenities: [
      'Licensed USCG Master Captain & 2 Professional Stewards',
      'Spacious hydraulic swim platform with Williams jet tender',
      'Flybridge with wet bar, teak dining table & retractable hardtop',
      '2x SeaBob F5S underwater scooters included',
      'Chef-curated charcuterie board & premium chilled champagne',
      'Full multimedia Sonos zone audio system'
    ],
    image: '/images/yacht.jpg',
    description: 'An exceptional tri-deck motor yacht designed for grand entertaining. Revel in panoramic sea vistas, secluded sandbar anchorages, or sunset harbor cruises in utmost glamour.'
  },
  {
    id: 'yacht-sea-ray-520',
    name: '52ft Sea Ray Sundancer "Azure Breeze"',
    boatType: 'Express Cruiser',
    lengthFeet: 52,
    capacity: 10,
    staterooms: 2,
    location: 'Coastal Harbor & Sandbar Reserve',
    hourlyRate: 580,
    halfDayRate: 2200,
    fullDayRate: 4100,
    captainIncluded: true,
    crewCount: 2,
    amenities: [
      'Experienced licensed captain and onboard hospitality host',
      'Expansive bow sun lounge with convertible backrests',
      'Climate-controlled salon with full galley and wet bar',
      'Floating lily pad mat, snorkel gear & paddleboards',
      'Complimentary non-alcoholic refreshments & gourmet fruit spread'
    ],
    image: '/images/yacht.jpg',
    description: 'Sleek, sporty, and exceptionally comfortable. The perfect express day yacht for private family celebrations, coastal island exploration, and sun-drenched coastal days.'
  },
  {
    id: 'yacht-aquila-44',
    name: '44ft Aquila Luxury Power Catamaran "Ocean Vista"',
    boatType: 'Luxury Catamaran',
    lengthFeet: 44,
    capacity: 14,
    staterooms: 3,
    location: 'Marina Keys & Coastal Inlets',
    hourlyRate: 520,
    halfDayRate: 1950,
    fullDayRate: 3700,
    captainIncluded: true,
    crewCount: 2,
    amenities: [
      'Unsurpassed stability and dual-hull deck width',
      'Flybridge with 360° unobstructed coastal views & electric BBQ',
      'Direct bow access bridge from top deck',
      'Twin swim steps with freshwater showers',
      'Bluetooth party sound system with subwoofers'
    ],
    image: '/images/yacht.jpg',
    description: 'Renowned for peerless stability and expansive social living areas. Ideal for group gatherings, corporate retreats, and serene coastal cruising without roll.'
  }
];

export const EXCURSIONS: ExcursionItem[] = [
  {
    id: 'exc-coastal-vineyard-helo',
    title: 'Private Helicopter & Coastal Vineyard Estate Tour',
    category: 'Wine & Culinary',
    destination: 'Santa Ynez Valley & Pacific Coastline',
    durationHours: 6,
    pricePerPerson: 780,
    privateGroupPrice: 3800,
    maxGuests: 6,
    rating: 4.98,
    reviewCount: 42,
    image: '/images/excursion.jpg',
    description: 'An exclusive day of aerial drama and rare vintage tastings. Ascend via private helicopter along dramatic ocean bluffs directly onto the lawn of an exclusive private wine estate for a cellar master tasting and four-course paired lunch.',
    highlights: [
      'Door-to-door Escalade ESV chauffeur transfer to private heliport',
      '40-minute scenic coastal and canyon flight in Airbus H130',
      'Private barrel room tasting with estate owner & chief sommelier',
      'Al fresco 4-course gourmet lunch among century-old olive groves',
      'Chilled vintage bottle gifted to each guest'
    ],
    included: [
      'All luxury ground and air transportation',
      'Private sommelier host and reserved estate access',
      'All food, wine pairings, and vineyard fees',
      'Complimentary digital photography package'
    ],
    notIncluded: [
      'Additional retail wine shipping cases (arranged upon request)',
      'Custom personal gratuities'
    ],
    itinerary: [
      { time: '10:00 AM', activity: 'Black Truck pickup from your residence or hotel' },
      { time: '10:45 AM', activity: 'Board private helicopter for scenic Pacific coastline transit' },
      { time: '11:45 AM', activity: 'Helicopter touchdown at estate; welcome glass of Blanc de Blancs' },
      { time: '12:15 PM', activity: 'Private cellar tour & reserve barrel tasting' },
      { time: '01:30 PM', activity: 'Chef-curated 4-course vineyard lunch' },
      { time: '03:15 PM', activity: 'Return scenic flight and luxury chauffeur transfer home' }
    ]
  },
  {
    id: 'exc-sunset-superyacht-dinner',
    title: 'Sunset Superyacht Cruise & Private Chef Dining',
    category: 'Coastal & Marine',
    destination: 'Private Coastal Bay & Outer Isles',
    durationHours: 4,
    pricePerPerson: 650,
    privateGroupPrice: 3200,
    maxGuests: 10,
    rating: 5.0,
    reviewCount: 58,
    image: '/images/service_superyacht_1790717635836.jpg',
    description: 'Step aboard our pristine 74ft motor yacht as the twilight paints the horizon. Enjoy personalized open-bar champagne service, gourmet hors d’oeuvres prepared on board, and a peaceful evening under harbor lights.',
    highlights: [
      'Chauffeured arrival directly to the yacht boarding gangway',
      'Top-shelf open bar featuring Dom Pérignon and bespoke cocktails',
      'Private executive chef serving a multi-course seasonal seafood feast',
      'Sunset cruise past iconic waterfront estates and lighthouse cliffs',
      'Acoustic chillout playlist & evening starlight lounge deck'
    ],
    included: [
      'Full yacht charter with captain, mate & stewardess',
      'All culinary menus, wine pairings & bar provisions',
      'Port fees, fuel & marine permits',
      'Warm cashmere blankets for twilight deck lounging'
    ],
    notIncluded: [
      'Overnight stateroom booking (available by inquiry)'
    ],
    itinerary: [
      { time: '05:00 PM', activity: 'VIP arrival and welcome champagne reception on aft deck' },
      { time: '05:30 PM', activity: 'Departure into outer bay; scenic sightseeing along gold coast' },
      { time: '06:45 PM', activity: 'Anchor in sheltered cove for sunset viewing & cocktail service' },
      { time: '07:30 PM', activity: 'Three-course candlelit dinner served on the flybridge' },
      { time: '09:00 PM', activity: 'Smooth cruise back under city lights; chauffeur waiting at dock' }
    ]
  },
  {
    id: 'exc-executive-night-vip',
    title: 'The Sovereign VIP Nightlife & Private Lounge Access',
    category: 'VIP Nightlife',
    destination: 'Metropolitan Arts & Entertainment District',
    durationHours: 5,
    pricePerPerson: 550,
    privateGroupPrice: 2600,
    maxGuests: 7,
    rating: 4.95,
    reviewCount: 36,
    image: '/images/service_chauffeur_vip_1790717648191.jpg',
    description: 'An effortless, high-glamour evening with zero waiting. Your dedicated chauffeur and personal concierge shepherd you through private back-doors into the city’s most coveted speakeasies and premier clubs with reserved tables.',
    highlights: [
      'Dedicated Escalade ESV on continuous standby throughout the night',
      'Pre-cleared VIP entry bypassing all general queues',
      'Reserved banquette table at a Michelin-recommended supper lounge',
      'Complimentary premier bottle service and table hospitality',
      'Round-trip discreet security escort'
    ],
    included: [
      'Dedicated luxury vehicle and chauffeur for 5 hours',
      'All venue admissions and pre-arranged VIP table reservations',
      'First round of signature cocktails and reserved lounge seating'
    ],
    notIncluded: [
      'Additional venue bottle orders beyond initial package'
    ],
    itinerary: [
      { time: '08:30 PM', activity: 'Chauffeur pickup with chilled beverages in cabin' },
      { time: '09:00 PM', activity: 'Direct escort to private rooftop lounge for sunset drinks' },
      { time: '10:30 PM', activity: 'Transfer to subterranean speakeasy with private table' },
      { time: '12:00 AM', activity: 'Midnight VIP entry to premier lounge with bottle service' },
      { time: '01:30 AM', activity: 'Safe, seamless chauffeur return to your hotel or residence' }
    ]
  },
  {
    id: 'exc-private-airport-tarmac',
    title: 'Executive FBO Runway Tarmac Meet & Chauffeur Transfer',
    category: 'City & Culture',
    destination: 'Private FBO Airfields & Major Metropolitan Airports',
    durationHours: 2,
    pricePerPerson: 295,
    privateGroupPrice: 590,
    maxGuests: 6,
    rating: 4.99,
    reviewCount: 114,
    image: '/images/hero.jpg',
    description: 'The ultimate airport transit experience. Avoid terminals entirely. Your black luxury truck receives security tarmac access directly to your private jet steps, loading your baggage while you step straight into a climate-controlled sanctuary.',
    highlights: [
      'Plane-side tarmac meet and greet with security clearance',
      'Zero terminal walking or baggage carousel waiting',
      'Real-time FAA tail-number flight monitoring with guaranteed early arrival',
      '60 minutes complimentary standby for schedule adjustments',
      'Ice-cold sparkling refreshments and customized newspaper/magazines'
    ],
    included: [
      'Airport authority tarmac permits and security clearance',
      'Luggage porterage and care',
      'Complimentary flight delay protection'
    ],
    notIncluded: [
      'Custom catering order for vehicle cabin (available upon request)'
    ],
    itinerary: [
      { time: 'Prior to arrival', activity: 'Flight tracking and positioning on airport apron' },
      { time: 'Touchdown', activity: 'Chauffeur vehicle parks alongside private aircraft stairs' },
      { time: 'Direct Transfer', activity: 'Luggage stowed seamlessly; passenger boards instantly' },
      { time: 'Non-stop Transit', activity: 'Direct private transit to hotel, villa, or corporate office' }
    ]
  }
];

export const BOOKING_EXTRAS: BookingExtra[] = [
  {
    id: 'ext-champagne-dom',
    name: 'Dom Pérignon Vintage Champagne & Flutes',
    price: 360,
    description: 'Chilled bottle of vintage Dom Pérignon served with crystal flutes and artisan chocolate truffles in-cabin.',
    category: 'beverage'
  },
  {
    id: 'ext-extra-hour',
    name: 'Extra Standby Fleet Hour (Flexible Schedule)',
    price: 175,
    description: 'Add an additional hour of dedicated vehicle and chauffeur standby to adapt to changing agendas.',
    category: 'service'
  },
  {
    id: 'ext-security-escort',
    name: 'Discreet Executive Protection Officer',
    price: 450,
    description: 'Licensed, plainclothes private security specialist for close protection and venue pre-clearing.',
    category: 'service'
  },
  {
    id: 'ext-photographer',
    name: 'Private Lifestyle Content Creator / Photographer',
    price: 320,
    description: 'Professional photographer capturing candid 4K moments of your yacht charter or scenic excursion.',
    category: 'concierge'
  },
  {
    id: 'ext-runway-tarmac',
    name: 'Airfield FBO Plane-Side Tarmac Access Permit',
    price: 150,
    description: 'Pre-cleared ramp pass allowing our vehicle to meet you directly at your private aircraft airstairs.',
    category: 'vehicle'
  },
  {
    id: 'ext-custom-gourmet',
    name: 'Curated Artisan Charcuterie & Caviar Box',
    price: 180,
    description: 'Fresh Caspian caviar, blinis, imported cheeses, Spanish Iberico ham, and organic stone-ground crackers.',
    category: 'beverage'
  }
];

export const INITIAL_BOOKINGS: BookingRecord[] = [
  {
    id: 'book-aur-9402',
    referenceNumber: 'AUR-9402-VIP',
    serviceType: 'chauffeur',
    title: 'Mercedes-Maybach S580 Executive Airport Transfer',
    image: '/images/chauffeur.jpg',
    date: '2026-10-04',
    time: '02:30 PM',
    guests: 2,
    pickupLocation: 'Signature Flight Support FBO (Runway 12)',
    destinationLocation: 'The Ritz-Carlton Penthouse Suite',
    duration: '3 Hours Dedicated Standby',
    extras: [
      { name: 'Dom Pérignon Vintage Champagne & Flutes', price: 360 },
      { name: 'Airfield FBO Plane-Side Tarmac Access Permit', price: 150 }
    ],
    basePrice: 660,
    serviceFee: 117,
    totalAmount: 1287,
    status: 'Chauffeur Assigned',
    customerName: 'Jonathan Vance',
    customerEmail: 'j.vance@vanceholdings.com',
    customerPhone: '+1 (555) 392-1084',
    specialRequests: 'Chauffeur Marcus assigned. Preferred interior temperature 68°F. Flight Tail: N842VJ.',
    createdAt: '2026-09-28T09:15:00Z',
    paymentMethod: 'Credit Card (Simulated)'
  },
  {
    id: 'book-aur-8819',
    referenceNumber: 'AUR-8819-YACHT',
    serviceType: 'boat-rental',
    title: '74ft Sunseeker Manhattan Sunset Charter',
    image: '/images/yacht.jpg',
    date: '2026-10-12',
    time: '04:30 PM',
    guests: 8,
    pickupLocation: 'Biscayne Marina Slip B-14',
    destinationLocation: 'Coastal Isle & Outer Harbor Anchorage',
    duration: 'Half Day (4 Hours)',
    extras: [
      { name: 'Curated Artisan Charcuterie & Caviar Box', price: 180 },
      { name: 'Private Lifestyle Content Creator / Photographer', price: 320 }
    ],
    basePrice: 3600,
    serviceFee: 410,
    totalAmount: 4510,
    status: 'Confirmed',
    customerName: 'Elena Rostova',
    customerEmail: 'elena.rostova@luxdesign.co',
    customerPhone: '+1 (555) 741-9923',
    specialRequests: 'Birthday celebration for spouse. Crew instructed on cake presentation at sunset.',
    createdAt: '2026-09-25T14:40:00Z',
    paymentMethod: 'Concierge Payment Link'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Harrison Sterling',
    role: 'Managing Partner',
    companyOrCity: 'Sterling & Croft Capital, New York',
    experienceName: 'Cadillac Escalade ESV Executive Chauffeur',
    rating: 5,
    comment: 'Aureus is in a category of its own. When flying our board into the city for annual investor meetings, their black trucks were staged plane-side before our wheels even touched tarmac. Immaculate vehicles, discreet drivers, and flawless execution.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    date: 'September 2026'
  },
  {
    id: 'test-2',
    name: 'Dr. Vivienne Leclair',
    role: 'Venture Partner & Collector',
    companyOrCity: 'Geneva & San Francisco',
    experienceName: '74ft Sunseeker Yacht Charter & Vineyard Tour',
    rating: 5,
    comment: 'We booked the private coastal helicopter vineyard excursion followed by a weekend yacht charter. The level of personalized curation was akin to a three-star Michelin restaurant concierge. Every single minute felt tailored exclusively to us.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    date: 'August 2026'
  },
  {
    id: 'test-3',
    name: 'Marcus Thorne',
    role: 'Chief Technology Officer',
    companyOrCity: 'Aether Robotics, Austin',
    experienceName: 'Jet-Class Mercedes Sprinter Board Retreat',
    rating: 5,
    comment: 'Our leadership team held an entire working strategy session while cruising between our facilities in the Jet-Class Sprinter. High-speed 5G Wi-Fi, Apple screen mirroring, and chilled refreshments made travel time more productive than our own boardroom.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    date: 'September 2026'
  }
];

export const FAQS: FAQItem[] = [
  {
    category: 'Booking & Reservations',
    question: 'How far in advance should I reserve a vehicle, yacht, or excursion?',
    answer: 'While we accommodate on-demand bookings with as little as 2 hours notice for executive airport transfers, we recommend booking yacht charters and multi-vehicle black truck fleets 48 to 72 hours in advance to guarantee specific model availability and bespoke catering provisioning.'
  },
  {
    category: 'Booking & Reservations',
    question: 'Can I request an external booking link or pay via corporate invoice?',
    answer: 'Yes. Our platform fully supports both instant simulated online payment and direct concierge invoice links. Corporate accounts can request consolidated monthly billing and wire transfer arrangements through our dedicated concierge desk.'
  },
  {
    category: 'Chauffeur & Fleet',
    question: 'What qualifications and security standards do your chauffeurs hold?',
    answer: 'Every Aureus chauffeur undergoes rigorous federal background checks, defensive driving certification, executive discretion protocol training, and NDAs. Chauffeurs arrive in sharp dark tailored attire with thorough route preparation.'
  },
  {
    category: 'Chauffeur & Fleet',
    question: 'Do you offer plane-side private tarmac meet-and-greets at FBOs?',
    answer: 'Yes. We maintain active airside ramp security credentials across major private aviation FBOs (Signature, Atlantic, Jet Aviation, Million Air). Your vehicle can meet you directly at the airstairs of your private jet upon touchdown.'
  },
  {
    category: 'Yachts & Maritime',
    question: 'What is included in the yacht charter pricing?',
    answer: 'All yacht charters include a licensed USCG Captain, dedicated stewardess, fuel for customary cruising speeds, watersports equipment (SeaBobs, tender, paddleboards), ice, gourmet snacks, and non-alcoholic refreshments. Premium champagne and custom culinary chef menus can be added during booking.'
  },
  {
    category: 'Billing & Cancellation',
    question: 'What is your cancellation and modification policy?',
    answer: 'Chauffeur and black truck reservations can be rescheduled or cancelled with full credit up to 12 hours prior to scheduled pickup. Yacht charters and private helicopter excursions require 48 hours notice for a full refund or credit voucher.'
  }
];

export const CHATBOT_RESPONSES: Record<string, string> = {
  services: 'Aureus provides an integrated luxury mobility ecosystem: 1) Executive Chauffeur Services (hourly & airport transfers), 2) Black Truck & Luxury SUV Fleet rentals, 3) Private Motor Yacht & Catamaran charters, 4) Bespoke VIP Excursions (helicopter wine tours, nightlife escorts), and 5) Tailored 24/7 Concierge travel planning.',
  booking: 'You can reserve any experience in three clicks using our "Book Now" buttons, or use the interactive Chauffeur Calculator on our Chauffeur Services page to calculate real-time estimates. We also offer a "Custom Experience Request" if you desire a bespoke multi-day itinerary.',
  airport: 'Yes! We specialize in both commercial airline VIP arrivals and private jet FBO tarmac pickups. We provide 60 minutes of complimentary flight tracking standby, plane-side airstair meets, and seamless luggage assistance.',
  trucks: 'Our black truck fleet features 2025 Cadillac Escalade ESV Sport Platinums, GMC Yukon Denali Ultimates, and Range Rover SVs starting at $165–$240/hour or $1,250–$1,900/day. All vehicles feature privacy-tinted glass, 5G Wi-Fi, and acoustic noise cancellation.',
  boats: 'Our yacht fleet spans 44ft to 74ft motor yachts and power catamarans. Every charter includes a licensed USCG Master Captain, dedicated stewardess, fuel, SeaBobs, and champagne lounge amenities starting at $520/hour.',
  custom: 'Our concierge team loves designing one-of-a-kind itineraries! Click "Custom Experience" in the navigation bar to submit your dates, group size, and preferred blend of air, land, and sea transportation. We will formulate a comprehensive proposal.',
  contact: 'You can reach our 24/7 VIP Concierge directly at concierge@aureusexperiences.com or by phone at +1 (800) 892-AUREUS. We also provide direct WhatsApp concierge support.'
};
