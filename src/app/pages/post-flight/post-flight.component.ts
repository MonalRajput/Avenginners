import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../Services/api.service';
import { BookingService } from '../../Services/booking.service';
import { TransportMode } from '../../Models/booking.model';

@Component({
  selector: 'app-post-flight',
  templateUrl: './post-flight.component.html',
  // styleUrls: ['./post-flight.component.scss']
})
export class PostFlightComponent implements OnInit {
  form: FormGroup;
  modes: TransportMode[] = [];
  isLoading = false;
  address = '';

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private bookingService: BookingService,
    private router: Router
  ) {
    this.form = this.fb.group({
      dropAddress: ['', Validators.required],
      dropMode: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Listen to address changes
    this.form.get('dropAddress')?.valueChanges.subscribe(address => {
      this.address = address || '';
      if (this.address) {
        this.loadModes();
      }
    });

    // Pre-populate from booking if available
    const booking = this.bookingService.getBooking();
    if (booking.to) {
      this.form.patchValue({ dropAddress: `${booking.to} Area` });  // e.g., "Mumbai Area"
    }
  }

  loadModes(): void {
    if (!this.address) return;
    this.isLoading = true;
    this.modes = [];

    // Destination airport code (e.g., 'BOM' for Mumbai)
    const airportCode = 'BOM';  // Dynamic: from booking.toAirport
    this.api.getTransportModes('post', this.address, airportCode).subscribe(
      (modes: TransportMode[]) => {
        this.modes = modes;
        this.isLoading = false;
        console.log('Post-flight modes loaded:', modes);
      },
      (error) => {
        console.error('Error loading modes:', error);
        this.isLoading = false;
        this.modes = [];
      }
    );
  }

  onAddressChange(): void {
    this.loadModes();
  }

  onContinue(): void {
    if (this.form.valid) {
      const { dropAddress, dropMode } = this.form.value;
      this.bookingService.updateBooking({ dropAddress, dropMode });
      console.log('Post-flight updated:', { dropAddress, dropMode });
      this.router.navigate(['/ancillaries']);  // Next: Add-ons
    }
  }
}