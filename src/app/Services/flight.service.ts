import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Flight } from '../models/flight.model';
import { Observable } from 'rxjs';
import { Flight } from '../Models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  baseUrl = 'http://localhost:8080/api/flights';

  constructor(private http: HttpClient) {}

  searchFlights(sourceCity: string, destCity: string): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.baseUrl}?sourceCity=${encodeURIComponent(sourceCity)}&destinationCity=${encodeURIComponent(destCity)}`);
  }
}
