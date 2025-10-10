import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // Added Router for navigation
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Added for seatForm
import { ApiService } from '../../Services/api.service';
import { BookingService } from 'src/app/Services/booking.service';
import { Seat } from '../../Models/booking.model';
import { Flight } from '../../Models/booking.model';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  // styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent implements OnInit {
  flightId: number | null = null;
  flight: Flight | null = null;  // Full flight details (fetch or from service)
  seats: Seat[] = [];  // Available seat types

  // NEW: Form for seat selection
  seatForm: FormGroup;  // Fixed: Now declared
  isLoading = false;  // Fixed: Now declared (for spinner during load)

  constructor(
    private route: ActivatedRoute,
    private router: Router,  // Added for onContinue navigation
    private fb: FormBuilder,  // Added for form creation
    private api: ApiService,
    private bookingService: BookingService
  ) {
    // Initialize form
    this.seatForm = this.fb.group({
      seatType: ['', Validators.required]  // Required: Must select a seat type
    });
  }

  ngOnInit(): void {
    this.flightId = +this.route.snapshot.paramMap.get('id')!;
    if (this.flightId) {
      // Set loading state
      this.isLoading = true;

      // Optional: Fetch full flight details (mock or API)
      // this.api.getFlight(this.flightId).subscribe(flight => this.flight = flight);

      // Load seats for this flight
      this.api.getSeats(this.flightId).subscribe(
        (seats: Seat[]) => {
          this.seats = seats;
          this.isLoading = false;  // Hide spinner
          console.log('Seats loaded:', seats);

          // Optional: Auto-select first seat (e.g., Economy) and patch form
          if (seats.length > 0) {
            const defaultSeat = seats.find(s => s.type === 'Economy') || seats[0];
            this.selectSeat(defaultSeat);  // Triggers form update
          }
        },
        (error) => {
          console.error('Error loading seats:', error);
          this.isLoading = false;
        }
      );

      // Update booking with flight ID
      this.bookingService.updateBooking({ flightId: this.flightId });
    }
  }

  // Updated: Now patches the form
  selectSeat(seat: Seat): void {
    console.log('Selected seat:', seat);
    this.seatForm.patchValue({ seatType: seat.type });  // Update form control
    this.bookingService.updateBooking({ 
      seatType: seat.type, 
      seatPrice: seat.price  // Optional: Track additional price
    });
  }

  // NEW: Form submission handler
  onContinue(): void {  // Fixed: Now declared
    if (this.seatForm.invalid) {
      console.log('Form invalid:', this.seatForm.value);
      this.seatForm.markAllAsTouched();  // Show validation errors
      return;
    }

    const { seatType } = this.seatForm.value;
    console.log('Continuing with seat type:', seatType);

    // Update booking with final seat selection
    const selectedSeat = this.seats.find(s => s.type === seatType);
    if (selectedSeat) {
      this.bookingService.updateBooking({ 
        seatType: selectedSeat.type, 
        seatPrice: selectedSeat.price 
      });
    }

    // Navigate to next step (pre-flight transport)
    this.router.navigate(['/pre-flight']);
  }
}