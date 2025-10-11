import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookingRequest } from '../Models/booking.model';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
// import { BookingRequest } from '../Models/booking-request.model';
// import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class BookingService {
  snackBar: any;
  makeBooking(req: BookingRequest) {
    throw new Error('Method not implemented.');
  }
  getAncillaries() {
      throw new Error('Method not implemented.');
  }
  getFlights(arg0: { source: any; destination: any; }): import("../Models/booking.model").Flight[] {
      throw new Error('Method not implemented.');
  }
  getTransportModesForRoute(id: number, source: any) {
      throw new Error('Method not implemented.');
  }
  getOptimalTransport(id: number, source: any) {
      throw new Error('Method not implemented.');
  }
  createBooking(bookingData: any) {
      throw new Error('Method not implemented.');
  }
  private bookingData = new BehaviorSubject<BookingRequest>({} as BookingRequest);
  currentBooking$ = this.bookingData.asObservable();

  constructor(private api: ApiService, private auth: AuthService) {}

  updateBooking(data: Partial<BookingRequest>) {
    const current = this.bookingData.value;
    this.bookingData.next({ ...current, ...data });
  }

  getCurrentBooking(): BookingRequest {
    return this.bookingData.value;
  }

  calculateTotal(): number {
    const data = this.getCurrentBooking();
    let total = data.flightId ? 5000 : 0;  // Mock base flight price; fetch real from API
    // Transport
    total += data.pickupMode === 'Cab' ? 500 : (data.pickupMode === 'Bus' ? 200 : 150);
    total += data.dropMode === 'Cab' ? 500 : (data.dropMode === 'Bus' ? 200 : 150);
    // Ancillaries
    total += data.ancillaries ? data.ancillaries.length * 300 : 0;
    // Seat
    total += data.seatType === 'Window' || data.seatType === 'Aisle' ? 200 : 0;
    return total;
  }

  confirmBooking(userId?: number): Observable<any> {  // Use logged-in user ID if available
    const uid = userId ?? this.auth.user?.userId ?? 1;
    const data = { ...this.getCurrentBooking(), userId: uid } as any;
    return this.api.createBooking(data);
  }

  resetBooking() {
    this.bookingData.next({} as BookingRequest);
  }

  getBooking(): Partial<BookingRequest> {
    return this.bookingData.value;
  }

  //  constructor(private snackBar: MatSnackBar) {}
    // Show success toast
    showSuccess(message: string, action = 'OK', duration = 3000): void {
      this.snackBar.open(message, action, { duration, horizontalPosition: 'end', verticalPosition: 'top' });
    }
    // Show error toast
    showError(message: string, action = 'Dismiss', duration = 5000): void {
      this.snackBar.open(message, action, { 
        duration, 
        horizontalPosition: 'end', 
        verticalPosition: 'top',
        panelClass: ['error-snackbar']  // Custom red style
      });
    }
}