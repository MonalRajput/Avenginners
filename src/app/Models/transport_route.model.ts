import { TransportMode } from './transport-mode.model';
import { Location } from './location.model';
import { Airport } from './airport.model';

export interface TransportRoute {
  routeId: number;
  fromLocation: Location;
  toAirport: Airport;
  mode: TransportMode;
  estimatedCost: number;
  estimatedDuration: number;
}
