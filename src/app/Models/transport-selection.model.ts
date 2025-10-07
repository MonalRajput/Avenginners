import { TransportRoute } from './transport_route.model';

export interface TransportSelection {
  transportSelectionId: number;
  bookingId: number;
  route: TransportRoute;
  type: 'Pickup' | 'Drop';
}
