export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface Location {
  id: number;
  name: string;
  city: string;
}

export interface Airport {
  code: string;
  name: string;
  locationId: number;
}

export interface Flight {
  id: number;
   flightNumber: string; 
  airline: string;
  fromAirport: string;
  toAirport: string;
  departureTime: string;
  arrivalTime: string;
  seatsAvailable: number;
  price: number;
  duration: string;
  date?: string;
}

export interface TransportMode {
  id: number;
  name: string;  // 'Train', 'Bus', 'Cab'
  estimatedTime: string;
  price: number;
  description?: string;
  available: boolean;
  modeType: 'pre' | 'post';
}

export interface Ancillary {
  id?: number;
  name: string;  // e.g., "Extra Baggage (20kg)", "Veg Meal"
  description?: string;
  price: number;  // In INR
  category: 'baggage' | 'meal' | 'seat' | 'other';
  selected?: boolean;  // For UI toggling
}


// export interface Seat {
//   id: number;
//   type: string;  // 'Window', 'Aisle', 'Middle'
//   price: number;
// }

export interface SeatType {
    id: number; 
  type: 'Economy' | 'Business' | 'First';
  price: number;  // Additional over base fare
  seatsAvailable: number;
  selected?: boolean;
}
// NEW: Seat interface - Extends SeatType with required ID (for individual seats)
export interface Seat extends SeatType {
  id: number;  // Required: Unique seat ID (for selection/booking)
}

  export interface SeatType {  // Or rename to Seat if preferred
    type: 'Economy' | 'Business' | 'First';
    price: number;
    seatsAvailable: number;
    selected?: boolean;
  }
 
  export interface BookingRequest {
  userId?: number;  // From AuthService (logged-in user)
  flightId?: number;  // Selected flight ID (for backend)
  flight?: Flight;  // FIXED: NEW - Full flight details (for UI/display; optional in request phase)
  seatType?: string;  // e.g., "Economy"
  seatPrice?: number;  // NEW: Additional price for seat type (e.g., 2000 for Business)
  pickupAddress?: string;  // Pre-flight pickup
  pickupMode?: string;  // e.g., "Taxi"
  dropAddress?: string;  // Post-flight drop
  dropMode?: string;  // e.g., "Metro"
  ancillaries?: string[];  // Array of selected ancillary IDs/names
  ancillaryPrice?: number;
  status?: 'confirmed' | 'pending' | 'cancelled';
  paymentId: string;
  travelDate?: string;  // YYYY-MM-DD
  from?: string;  // Origin city (for search persistence)
  to?: string;  // Destination city (for search persistence)
  totalPrice?: number;  // Calculated total (flight + transport + ancillaries + seatPrice)
  pickupPrice?: number;  // NEW: Pre-flight transport price (for total calc)
  dropPrice?: number;  // NEW: Post-flight transport price (for total calc)
}
// Updated: Booking entity - flight is required here (post-confirmation)
export interface Booking extends BookingRequest {
  id: number;  // Backend-generated booking ID
  status: 'confirmed' | 'pending' | 'cancelled';  // Booking status (required)
  bookingDate: Date;  // When booked
  totalPrice: number;  // Final amount (includes seatPrice) - required
  flight: Flight;  // Full flight details - required (override optional from BookingRequest)
  pickupLocation?: Location;  // Resolved pre-flight location
  dropLocation?: Location;  // Resolved post-flight location
  ancillaries: string[];  // Selected add-ons (full objects) - required
  receipt?: any;  // Optional: PDF/email receipt data
}
// Updated: Booking entity - Also add seatPrice for full booking
