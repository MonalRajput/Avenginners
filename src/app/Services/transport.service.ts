import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { TransportRoute } from '../models/transport-route.model';
import { Observable } from 'rxjs';
import { TransportRoute } from '../Models/transport_route.model';

@Injectable({
  providedIn: 'root'
})
export class TransportService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost:8080/api/transport-options';

  getRoutes(locationId: number, airportId: number): Observable<TransportRoute[]> {
    return this.http.get<TransportRoute[]>(`${this.url}?locationId=${locationId}&airportId=${airportId}`);
  }
}
