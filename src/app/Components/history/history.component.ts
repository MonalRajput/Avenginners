import { Component } from '@angular/core';
import { Booking } from '../../Models/booking.model';  // From earlier
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-history',
  template: `
    <div class="history-container">
      <h1>Booking History</h1>
      <mat-list *ngIf="pastBookings.length > 0">
        <mat-list-item *ngFor="let booking of pastBookings">
          <mat-icon matListIcon>flight</mat-icon>
          <div matLine>{{ booking.flight?.airline }} - {{ booking.flight?.flightNumber }}</div>
          <div matLine>{{ booking.flight?.fromAirport }} → {{ booking.flight?.toAirport }} | ₹{{ booking.totalPrice }}</div>
          <div matLine><em>Status: {{ booking.status }}</em></div>
        </mat-list-item>
      </mat-list>
      <p *ngIf="pastBookings.length === 0">No past bookings.</p>
    </div>
  `,
  styles: [`
    .history-container { padding: 20px; }
    mat-list-item { margin-bottom: 10px; }
  `]
})
export class HistoryComponent implements OnInit {
  pastBookings: Booking[] = [];
  constructor(private api: ApiService, private auth: AuthService) {}
  ngOnInit(): void {
    const uid = this.auth.user?.userId;
    if (!uid) return;
    this.api.getBookings(uid).subscribe((list) => this.pastBookings = list || []);
  }
}