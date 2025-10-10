import { Component, OnInit } from '@angular/core';
// import { BookingStateService } from '../../services/booking-state.service';
// import { TransportService } from '../../services/transport.service';
// import { TransportRoute } from '../../models/transport-route.model';
import { Router } from '@angular/router';
import { TransportRoute } from 'src/app/Models/transport_route.model';
import { BookingStateService } from 'src/app/Services/booking-state.service';
import { TransportService } from 'src/app/Services/transport.service';

@Component({
  selector: 'app-transport-select',
  templateUrl: './transport-select.component.html'
})
export class TransportSelectComponent implements OnInit {
  pickupRoutes: TransportRoute[] = [];
  dropRoutes: TransportRoute[] = [];

  constructor(
    private state: BookingStateService,
    private transportService: TransportService,
    private router: Router
  ) {}

  ngOnInit() {
    const flight = this.state.selectedFlight;
    if (!flight) {
      this.router.navigate(['/search-flights']);
      return;
    }
    // For pickup: user’s home to origin airport
    // Suppose we know user’s pickup locationId (could be input)
    const userPickupLocationId = 1; // example
    this.transportService.getRoutes(userPickupLocationId, flight.originAirport.airportId)
      .subscribe(routes => this.pickupRoutes = routes);

    // For drop: destination airport to user’s drop location
    const userDropLocationId = 2; // example
    this.transportService.getRoutes(userDropLocationId, flight.destAirport.airportId)
      .subscribe(routes => this.dropRoutes = routes);
  }

  selectPickup(r: TransportRoute) {
    this.state.pickupRoute = r;
  }

  selectDrop(r: TransportRoute) {
    this.state.dropRoute = r;
  }

  next() {
    if (this.state.pickupRoute && this.state.dropRoute) {
      this.router.navigate(['/select-ancillaries']);
    } else {
      alert('Select both pickup and drop transport routes');
    }
  }
}
