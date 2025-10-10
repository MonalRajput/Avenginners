import { Location } from './location.model';

export interface Airport {
  airportId: number;
  iataCode: string;
  name: string;
  location: Location;
}
