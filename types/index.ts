export type ServiceType = 
  | 'chauffeur'
  | 'black-truck'
  | 'boat-rental'
  | 'excursion'
  | 'luxury-experience'
  | 'custom-concierge';

export interface Vehicle {
  id: string;
  name: string;
  category: 'chauffeur' | 'black-truck';
  make: string;
  model: string;
  year: number;
  passengerCapacity: number;
  luggageCapacity: number;
  hourlyRate: number;
  dailyRate: number;
  minimumHours: number;
  image: string;
  features: string[];
  description: string;
  classType: 'First Class Sedan' | 'Executive SUV' | 'Armored / VIP' | 'Luxury Sprinter';
}

export interface BoatCharter {
  id: string;
  name: string;
  boatType: 'Motor Yacht' | 'Superyacht' | 'Express Cruiser' | 'Luxury Catamaran';
  lengthFeet: number;
  capacity: number;
  staterooms: number;
  location: string;
  hourlyRate: number;
  halfDayRate: number;
  fullDayRate: number;
  captainIncluded: boolean;
  crewCount: number;
  amenities: string[];
  image: string;
  description: string;
}

export interface ExcursionItem {
  id: string;
  title: string;
  category: 'Coastal & Marine' | 'Private Aviation' | 'Wine & Culinary' | 'City & Culture' | 'VIP Nightlife';
  destination: string;
  durationHours: number;
  pricePerPerson: number;
  privateGroupPrice: number;
  maxGuests: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  highlights: string[];
  included: string[];
  notIncluded: string[];
  itinerary: { time: string; activity: string }[];
}

export interface BookingExtra {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'beverage' | 'concierge' | 'vehicle' | 'service';
}

export interface BookingRecord {
  id: string;
  referenceNumber: string;
  serviceType: ServiceType;
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
  status: 'Confirmed' | 'Chauffeur Assigned' | 'In Progress' | 'Completed' | 'Pending Review';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  specialRequests?: string;
  createdAt: string;
  paymentMethod: 'Credit Card (Simulated)' | 'Concierge Payment Link' | 'Wire Transfer';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  companyOrCity: string;
  experienceName: string;
  rating: number;
  comment: string;
  avatar: string;
  date: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Booking & Reservations' | 'Chauffeur & Fleet' | 'Yachts & Maritime' | 'Billing & Cancellation';
}
