import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Ancillary } from '../models/ancillary.model';
import { Observable } from 'rxjs';
import { Ancillary } from '../Models/ancillaries.model';

@Injectable({
  providedIn: 'root'
})
export class AncillaryService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost:8080/api/ancillaries';

  getAncillaries(): Observable<Ancillary[]> {
    return this.http.get<Ancillary[]>(this.url);
    // return this.http.get<Ancillary[]>(this.url);
  }
}
