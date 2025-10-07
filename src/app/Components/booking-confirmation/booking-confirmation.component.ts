import { Component } from '@angular/core';
import { BookingRequest } from '../../Models/booking-request.model';
import { BookingStateService } from '../../Services/booking-state.service';
import { BookingService } from '../../Services/booking.service';
// import { BookingStateService } from '../../services/booking-state.service';
// import { BookingService } from '../../services/booking.service';
// import { BookingRequest } from '../../models/booking-request.model';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html'
})
export class BookingConfirmationComponent {
  bookingId?: number;
  message?: string;

  constructor(
    private state: BookingStateService,
    private bookingService: BookingService
  ) {}

  confirm() {
    if (!this.state.selectedFlight || !this.state.pickupRoute || !this.state.dropRoute) {
      this.message = 'Booking data incomplete';
      return;
    }

    const req: BookingRequest = {
      userId: 1,  // you might fetch logged-in user or input it
      flightId: this.state.selectedFlight.flightId,
      pickupRouteId: this.state.pickupRoute.routeId,
      dropRouteId: this.state.dropRoute.routeId,
      pickupAddress: '',  // fill from user input
      dropAddress: '',    // fill from user input
      ancillaries: this.state.ancillarySelections
    };

    this.bookingService.makeBooking(req).subscribe({
      next: res => {
        this.bookingId = res.bookingId;
        this.message = res.message;
      },
      error: err => {
        console.error(err);
        this.message = 'Booking failed';
      }
    });
  }
}
