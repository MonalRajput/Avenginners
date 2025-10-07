import { Injectable } from '@angular/core';
import { Flight } from '../Models/flight.model';
import { TransportRoute } from '../Models/transport_route.model';
// import { Flight } from '../models/flight.model';
// import { TransportRoute } from '../models/transport-route.model';

@Injectable({
  providedIn: 'root'
})
export class BookingStateService {
  selectedFlight?: Flight;
  pickupRoute?: TransportRoute;
  dropRoute?: TransportRoute;
  ancillarySelections: { ancillaryId: number; quantity: number }[] = [];

  reset() {
    this.selectedFlight = undefined;
    this.pickupRoute = undefined;
    this.dropRoute = undefined;
    this.ancillarySelections = [];
  }
}
