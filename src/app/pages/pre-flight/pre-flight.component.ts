import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../Services/api.service';  // Adjust path
import { BookingService } from 'src/app/Services/booking.service';
import { TransportMode } from 'src/app/Models/booking.model';  // Import interface

@Component({
  selector: 'app-pre-flight',
  templateUrl: './pre-flight.component.html',
  styleUrls: ['./pre-flight.component.scss']
})
export class PreFlightComponent implements OnInit {
  form: FormGroup;
  modes: TransportMode[] = [];
  isLoading = false;
  address = '';  // From form

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private bookingService: BookingService,
    private router: Router
  ) {
    this.form = this.fb.group({
      pickupAddress: ['', Validators.required],
      pickupMode: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Listen to address changes
    this.form.get('pickupAddress')?.valueChanges.subscribe(address => {
      this.address = address || '';
      if (this.address) {
        this.loadModes();
      }
    });
  }

  loadModes(): void {
    if (!this.address) return;
    this.isLoading = true;
    this.modes = [];  // Clear previous

    // Assuming source airport is 'DEL' (hardcode or from booking service)
    const airportCode = 'DEL';  // Dynamic: this.bookingService.getBooking().fromAirport || 'DEL'
    this.api.getTransportModes('pre', this.address, airportCode).subscribe(  // Fixed: Now Observable
      (modes: TransportMode[]) => {
        this.modes = modes;
        this.isLoading = false;
        console.log('Transport modes loaded:', modes);
      },
      (error) => {
        console.error('Error loading modes:', error);
        this.isLoading = false;
        this.modes = [];  // Fallback empty
      }
    );
  }

  onAddressChange(): void {
    this.loadModes();  // Trigger on input
  }

  onContinue(): void {
    if (this.form.valid) {
      const { pickupAddress, pickupMode } = this.form.value;
      this.bookingService.updateBooking({ pickupAddress, pickupMode });
      this.router.navigate(['/post-flight']);  // Or next step
    }
  }
}