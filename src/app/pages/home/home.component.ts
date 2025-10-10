import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { ApiService } from '../../services/api.service';
// import { BookingService } from '../../services/booking.service';
import { Flight } from '../../Models/booking.model';
import { ApiService } from 'src/app/Services/api.service';
import { BookingService } from 'src/app/Services/booking.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  searchForm: FormGroup;
  flights: Flight[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private bookingService: BookingService,
    public router: Router  // Public for template if needed
  ) {
    this.searchForm = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  onSearch(): void {
    if (this.searchForm.invalid) {
      this.error = 'Please fill all fields correctly.';
      console.log('Form invalid:', this.searchForm.value);  // Debug
      return;
    }

    this.isLoading = true;
    this.error = null;
    this.flights = [];  // Clear previous results

    const { from, to, date } = this.searchForm.value;
    console.log('Searching flights:', { from, to, date: date.toISOString().split('T')[0] });  // Debug

    this.api.searchFlights(from, to, date.toISOString().split('T')[0]).subscribe({
      next: (flights: Flight[]) => {
        this.flights = flights;
        this.isLoading = false;
        console.log('Flights loaded:', flights.length);  // Debug

        if (flights.length > 0) {
          // Update booking service with search params
          this.bookingService.updateBooking({ 
            travelDate: date.toISOString().split('T')[0], 
            from, 
            to 
          });
          
          // Auto-navigate to first flight details (MVP flow)
          // Comment out below to see flights list on home (for testing)
          // this.router.navigate(['/flight-details', flights[0].id]);
          
          // Uncomment below to show list on home instead of navigating
          this.error = null;  // Clear any error
        } else {
          this.error = 'No flights available for this route and date. Try different options.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.error = 'Search failed. Please check your connection or try again.';
        console.error('Search error:', err);  // Debug
        this.flights = [];  // Ensure empty
      }
    });
  }

  // Method for manual flight selection (if showing list)
  selectFlight(flightId: number): void {
    const { from, to, date } = this.searchForm.value;
    this.bookingService.updateBooking({ 
      travelDate: date.toISOString().split('T')[0], 
      from, 
      to 
    });
    this.router.navigate(['/flight-details', flightId]);
  }
}