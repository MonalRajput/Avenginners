import { Component } from '@angular/core';
// import { Flight } from '../../models/flight.model';
// import { FlightService } from '../../services/flight.service';
// import { BookingStateService } from '../../services/booking-state.service';
import { Router } from '@angular/router';
import { Flight } from 'src/app/Models/flight.model';
// import { Flight } from 'src/app/models/flight.model';
import { BookingStateService } from 'src/app/Services/booking-state.service';
import { FlightService } from 'src/app/Services/flight.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html'
})
export class FlightSearchComponent {
  sourceCity = '';
  destCity = '';
  flights: Flight[] = [];

  constructor(
    private flightService: FlightService,
    private bookingState: BookingStateService,
    private router: Router
  ) {}

  search() {
    if (this.sourceCity && this.destCity) {
      this.flightService.searchFlights(this.sourceCity, this.destCity)
        .subscribe({
          next: flights => this.flights = flights,
          error: err => console.error('Flight search error', err)
        });
    }
  }

  selectFlight(f: Flight) {
    this.bookingState.selectedFlight = f;
    this.router.navigate(['/select-transport']);
  }
}
