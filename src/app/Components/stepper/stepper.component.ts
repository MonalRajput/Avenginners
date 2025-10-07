
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { BookingService } from '../../Services/booking.service';  // Adjust path if needed
import { 
  BookingRequest, 
  Flight, 
  Location, 
  TransportMode, 
  Ancillary, 
  Booking,
  SeatType 
} from '../../Models/booking.model';  // Adjust path
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],  // Uncommented: Include styles if available

   animations: [
      // Fade-in for content (e.g., steps, cards)
      trigger('fadeIn', [
        transition(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
        ])
      ]),
      // Slide-in for dialogs/summaries
      trigger('slideIn', [
        transition(':enter', [
          style({ transform: 'translateX(-100%)' }),
          animate('0.4s ease-out', style({ transform: 'translateX(0)' }))
        ])
      ]),
      // Pulse for buttons (e.g., confirm)
      trigger('pulse', [
        state('inactive', style({ transform: 'scale(1)' })),
        state('active', style({ transform: 'scale(1.05)' })),
        transition('inactive <=> active', animate('0.2s ease-in-out'))
      ])
    ]
})
export class StepperComponent implements OnInit, AfterViewInit {
  @ViewChild('stepper') stepper!: MatStepper;

  searchForm: FormGroup;
  selectedFlight: Flight | null = null;
  availableFlights: Flight[] = [];
  // FIXED: Changed from Location | null = null to Location | undefined = undefined (matches Booking model)
  pickupLocation: Location | undefined = undefined;
  pickupTransports: TransportMode[] = [];
  // FIXED: Same for dropLocation
  dropLocation: Location | undefined = undefined;
  dropTransports: TransportMode[] = [];
  ancillaries: Ancillary[] = [];
  selectedAncillaries: Ancillary[] = [];
  totalPrice = 0;
  isLoading = false;
  errorMessage: string | null = null;
  bookingData: Partial<BookingRequest> = {};

  // Expanded mocks with more routes/dates for better testing - FIXED: Standardized to YYYY-MM-DD format
  private mockFlights: Flight[] = [
    // Delhi → Mumbai (Oct 1, 2024)
    { 
      id: 1, 
      flightNumber: '6E-123', 
      airline: 'IndiGo', 
      fromAirport: 'DEL', 
      toAirport: 'BOM', 
      departureTime: '10:00', 
      arrivalTime: '12:00', 
      seatsAvailable: 150, 
      price: 4500, 
      duration: '2h 00m',
      date: '2025-10-06'  // FIXED: YYYY-MM-DD (matches UI input and error suggestions)
    },
    { 
      id: 2, 
      flightNumber: 'AI-101', 
      airline: 'Air India', 
      fromAirport: 'DEL', 
      toAirport: 'BOM', 
      departureTime: '11:00', 
      arrivalTime: '13:00', 
      seatsAvailable: 100, 
      price: 6000, 
      duration: '2h 00m',
      date: '2025-10-06'  // FIXED: YYYY-MM-DD
    },
    // Mumbai → Delhi (Oct 2, 2024)
    { 
      id: 3, 
      flightNumber: '6E-456', 
      airline: 'IndiGo', 
      fromAirport: 'BOM', 
      toAirport: 'DEL', 
      departureTime: '14:00', 
      arrivalTime: '16:00', 
      seatsAvailable: 120, 
      price: 4800, 
      duration: '2h 00m',
      date: '2024-10-02'  // FIXED: YYYY-MM-DD
    },
    // Delhi → Bangalore (Oct 1, 2024)
    { 
      id: 4, 
      flightNumber: 'IX-789', 
      airline: 'SpiceJet', 
      fromAirport: 'DEL', 
      toAirport: 'BLR', 
      departureTime: '09:00', 
      arrivalTime: '11:30', 
      seatsAvailable: 80, 
      price: 3500, 
      duration: '2h 30m',
      date: '2024-10-01'  // FIXED: YYYY-MM-DD
    },
    // Mumbai → Bangalore (Oct 3, 2024)
    { 
      id: 5, 
      flightNumber: '6E-999', 
      airline: 'IndiGo', 
      fromAirport: 'BOM', 
      toAirport: 'BLR', 
      departureTime: '08:00', 
      arrivalTime: '10:00', 
      seatsAvailable: 200, 
      price: 2800, 
      duration: '2h 00m',
      date: '2024-10-03'  // FIXED: YYYY-MM-DD
    }
    // Add more as needed for real app
  ];

  public mockLocations: Location[] = [
    { id: 1, name: 'Indira Gandhi International Airport', city: 'Delhi' },
    { id: 2, name: 'Chhatrapati Shivaji Maharaj International Airport', city: 'Mumbai' },
    { id: 3, name: 'Bandra Kurla Complex', city: 'Mumbai' },
    { id: 4, name: 'Mumbai Central', city: 'Mumbai' },
    { id: 5, name: 'Kempegowda International Airport', city: 'Bangalore' }
  ];

  private mockTransports: TransportMode[] = [
    { 
      id: 1, 
      name: 'Taxi', 
      estimatedTime: '30 min', 
      price: 300, 
      description: 'Door-to-door cab service', 
      available: true, 
      modeType: 'pre' 
    },
    { 
      id: 2, 
      name: 'Metro', 
      estimatedTime: '45 min', 
      price: 50, 
      description: 'Public rail transport', 
      available: true, 
      modeType: 'post' 
    },
    { 
      id: 3, 
      name: 'Uber', 
      estimatedTime: '25 min', 
      price: 400, 
      description: 'Ride-sharing app', 
      available: false, 
      modeType: 'pre' 
    },
    { 
      id: 4, 
      name: 'Bus', 
      estimatedTime: '60 min', 
      price: 100, 
      description: 'Shuttle bus', 
      available: true, 
      modeType: 'post' 
    }
  ];

  private mockAncillaries: Ancillary[] = [
    { 
      id: 1, 
      name: 'Extra Baggage (20kg)', 
      description: 'Additional luggage allowance', 
      price: 800, 
      category: 'baggage',
      selected: false 
    },
    { 
      id: 2, 
      name: 'Veg Meal', 
      description: 'Vegetarian in-flight meal', 
      price: 300, 
      category: 'meal',
      selected: false 
    },
    { 
      id: 3, 
      name: 'Priority Boarding', 
      description: 'Board early', 
      price: 500, 
      category: 'other',
      selected: false 
    },
    { 
      id: 4, 
      name: 'Seat Upgrade', 
      description: 'Upgrade to premium seat', 
      price: 1500, 
      category: 'seat',
      selected: false 
    },
    { 
      id: 5, 
      name: 'Lounge Access', 
      description: 'Airport lounge entry', 
      price: 1200, 
      category: 'other',
      selected: false 
    }
  ];

  // City-to-Airport mapping for flexible search (handles "Delhi" → "DEL", "del" → "DEL", etc.)
  private cityToAirportMap: { [key: string]: string } = {
    'delhi': 'DEL',
    'del': 'DEL',
    'delhi airport': 'DEL',
    'mumbai': 'BOM',
    'mum': 'BOM',
    'mumbai airport': 'BOM',
    'bangalore': 'BLR',
    'blr': 'BLR',
    'bangalore airport': 'BLR'
    // Add more cities/codes as needed (e.g., 'chennai': 'MAA')
  };

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private router: Router
  ) {
    // Default travelDate to today (YYYY-MM-DD) for easier testing
    const today = new Date().toISOString().split('T')[0];  // e.g., '2024-10-04'
    this.searchForm = this.fb.group({
      source: ['', Validators.required],
      destination: ['', Validators.required],
      travelDate: [today, [Validators.required, Validators.pattern(/\d{4}-\d{2}-\d{2}/)]]
    });
  }

  ngOnInit(): void {
    this.ancillaries = [...this.mockAncillaries];
    console.log('Stepper initialized with updated mocks');
  }

  ngAfterViewInit(): void {
    if (this.stepper) {
      console.log('Stepper ready');
    }
  }

  // Improved onSearchFlights() - Flexible city mapping + destination filter + date handling
  onSearchFlights(): void {
    if (this.searchForm.valid) {
      this.isLoading = true;
      this.errorMessage = null;
      const { source, destination, travelDate } = this.searchForm.value;

      // Normalize inputs (lowercase, trim)
      const normSource = source.toLowerCase().trim();
      const normDest = destination.toLowerCase().trim();

      setTimeout(() => {
        // Map cities to airport codes (fuzzy: check if input matches any key)
        const sourceAirport = this.getAirportCode(normSource);
        const destAirport = this.getAirportCode(normDest);

        if (!sourceAirport || !destAirport) {
          this.errorMessage = `Invalid route. Try cities like Delhi, Mumbai, or Bangalore. (Mapped: ${sourceAirport || 'None'} → ${destAirport || 'None'})`;
          this.isLoading = false;
          return;
        }

        // Filter by BOTH fromAirport AND toAirport (case-insensitive)
        // Date: Match if provided in mock, or ignore (flexible for future)
        this.availableFlights = this.mockFlights.filter(f => 
          f.fromAirport.toUpperCase() === sourceAirport.toUpperCase() &&
          f.toAirport.toUpperCase() === destAirport.toUpperCase() &&
          (!travelDate || !f.date || f.date === travelDate)  // Flexible date: Skip if no date in mock or input
        );

        if (this.availableFlights.length === 0) {
          // More helpful message with suggestions - FIXED: Matches mock dates
          this.errorMessage = `No flights available for ${source} → ${destination} on ${travelDate}. Try: Delhi → Mumbai on 2024-10-01, or Mumbai → Delhi on 2024-10-02.`;
        } else {
          this.bookingData = { ...this.bookingData, from: source, to: destination, travelDate };
          this.bookingService.updateBooking(this.bookingData);
          console.log(`Found ${this.availableFlights.length} flights for ${sourceAirport} → ${destAirport} on ${travelDate || 'Any date'}`);
          if (this.stepper) this.stepper.next();
        }
        this.isLoading = false;
      }, 1000);  // Simulate API delay
    } else {
      this.errorMessage = 'Please fill source, destination, and travel date correctly (YYYY-MM-DD).';
    }
  }

  // Helper to map city input to airport code (fuzzy matching)
  private getAirportCode(input: string): string | null {
    // Direct match or contains any key in map
    for (const [city, code] of Object.entries(this.cityToAirportMap)) {
      if (input === city || input.includes(city)) {
        return code;
      }
    }
    return null;  // No match
  }

  // Select Flight (Stores full flight object now allowed in model)
  selectFlight(flight: Flight): void {
    this.selectedFlight = flight;
    this.bookingData = { 
      ...this.bookingData, 
      flightId: flight.id, 
      flight: flight  // Full Flight for UI/display
    };
    // Default seat
    this.bookingData.seatType = 'Economy';
    this.bookingData.seatPrice = 0;
    this.bookingService.updateBooking(this.bookingData);
    console.log('Selected flight:', flight, 'Airports:', flight.fromAirport, '→', flight.toAirport);
    
    if (this.stepper) this.stepper.next();
    // Future: Open seat selection dialog/step
  }

  // Pickup Address & Transport (modeType: 'pre')
  // FIXED: Assignment now to Location | undefined (direct set from Location)
  onPickupLocationSelected(location: Location): void {
    this.pickupLocation = location;  // Location is valid (non-undefined)
    this.bookingData = { ...this.bookingData, pickupAddress: location.name };
    this.isLoading = true;

    setTimeout(() => {
      this.pickupTransports = this.mockTransports
        .filter(t => t.modeType === 'pre' && t.available)
        .sort((a, b) => a.price - b.price);  // Sort by price
      console.log('Pickup transports (pre-flight):', this.pickupTransports);
      this.isLoading = false;
    }, 800);
  }

  get selectedPickupTransport(): TransportMode | undefined {
    return this.pickupTransports?.find(
      m => m.name === this.bookingData?.pickupMode
    );
  }

  selectPickupTransport(mode: TransportMode): void {
    if (!mode.available) return;  // Guard
    this.bookingData = { 
      ...this.bookingData, 
      pickupMode: mode.name, 
      pickupPrice: mode.price  // For total calc
    };
    this.bookingService.updateBooking(this.bookingData);
    if (this.stepper) this.stepper.next();
  }

  // Drop Address & Transport (modeType: 'post')
  // FIXED: Same for dropLocation
  onDropLocationSelected(location: Location): void {
    this.dropLocation = location;  // Location is valid
    this.bookingData = { ...this.bookingData, dropAddress: location.name };
    this.isLoading = true;

    setTimeout(() => {
      this.dropTransports = this.mockTransports
        .filter(t => t.modeType === 'post' && t.available)
        .sort((a, b) => a.estimatedTime.localeCompare(b.estimatedTime));  // Sort by time
      console.log('Drop transports (post-flight):', this.dropTransports);
      this.isLoading = false;
    }, 800);
  }

  selectDropTransport(mode: TransportMode): void {
    if (!mode.available) return;
    this.bookingData = { 
      ...this.bookingData, 
      dropMode: mode.name, 
      dropPrice: mode.price 
    };
    this.bookingService.updateBooking(this.bookingData);
    if (this.stepper) this.stepper.next();
  }

  // Ancillaries (Filter by category if needed; toggle selected)
  toggleAncillary(anc: Ancillary, event: any): void {
    anc.selected = event.checked;  // Update UI state
    if (event.checked) {
      this.selectedAncillaries.push(anc);
    } else {
      this.selectedAncillaries = this.selectedAncillaries.filter(a => a.id !== anc.id);
    }
    this.bookingData = { 
      ...this.bookingData, 
      ancillaries: this.selectedAncillaries.map(a => a.name),  // string[] as per model
      ancillaryPrice: this.selectedAncillaries.reduce((sum, a) => sum + a.price, 0)
    };
    this.bookingService.updateBooking(this.bookingData);
    this.updateTotalPrice();
    console.log('Selected ancillaries:', this.selectedAncillaries);
  }

  // Updated Total: Includes seatPrice (default 0), transport prices
  private updateTotalPrice(): void {
    const flightPrice = this.selectedFlight?.price || 0;
    const seatPrice = this.bookingData.seatPrice || 0;
    const transportPrice = (this.bookingData.pickupPrice || 0) + (this.bookingData.dropPrice || 0);
    const ancillaryPrice = this.bookingData.ancillaryPrice || 0;
    this.totalPrice = flightPrice + seatPrice + transportPrice + ancillaryPrice;
    console.log('Total updated:', { flight: flightPrice, seat: seatPrice, transport: transportPrice, ancillary: ancillaryPrice, total: this.totalPrice });
  }

  // Confirm Booking (Set required paymentId; mock Booking response)
  confirmBooking(): void {
    // Validation: Ensure key fields
    if (!this.selectedFlight ) {
      this.errorMessage = 'Please complete all steps (flight, transports required).';
      return;
    }

    this.isLoading = true;
    this.bookingData = { 
      ...this.bookingData, 
      totalPrice: this.totalPrice, 
      status: 'pending' as const,
      userId: 1,  // Mock logged-in user
      paymentId: 'PAY_PENDING_' + Date.now().toString().slice(-6)  // Required: Set mock (update post-payment)
    };

    setTimeout(() => {
      this.bookingService.updateBooking(this.bookingData);  // Persist Partial<BookingRequest>
      // FIXED: Mock full Booking response (extends BookingRequest) - Explicit required fields to satisfy typing
      const mockBooking: Booking = {
        ...this.bookingData,
        id: Date.now(),  // Backend-generated (required in Booking)
        bookingDate: new Date(),  // Required in Booking
        totalPrice: this.totalPrice,  // Required in Booking (override Partial)
        flight: this.selectedFlight!,  // Full Flight (required in Booking)
        pickupLocation: this.pickupLocation,  // Optional: Location | undefined
        dropLocation: this.dropLocation,  // Optional: Location | undefined
        ancillaries: this.bookingData.ancillaries || [],  // Required in Booking (string[])
        status: 'pending' as const,  // Required in Booking (override Partial)
        paymentId: this.bookingData.paymentId!  // FIXED: Explicit required string (non-null assertion - safe post-set)
        // receipt: undefined (post-payment, optional)
      };
      console.log('Booking confirmed (mock):', mockBooking);
      this.isLoading = false;
      this.router.navigate(['/confirmation'], { state: { booking: mockBooking } });
    }, 1500);
  }
// Optional: Stepper event handling
  onStepChange(event: any): void {
    console.log('Stepper changed to step:', event.selectedIndex);
    this.errorMessage = null;
  }

  // Optional: Go back to previous step
  goToPreviousStep(): void {
    if (this.stepper) this.stepper.previous();
  }
}