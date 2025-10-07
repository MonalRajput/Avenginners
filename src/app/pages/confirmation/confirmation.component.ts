import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Booking } from '../../Models/booking.model';  // Adjust path
import { ReceiptDialogComponent } from 'src/app/Components/receipt-dialog/receipt-dialog.component';
// import { ReceiptDialogComponent } from './receipt-dialog.component';  // Local import

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  booking: Booking | null = null;  // Explicitly typed as nullable
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Get booking from router state (passed from stepper)
    this.booking = history.state.booking as Booking | null;  // Type assertion for safety
    if (!this.booking) {
      this.errorMessage = 'No booking data found. Please start a new booking.';
      console.warn('No booking in state - redirecting to stepper?');
      // Optional: this.router.navigate(['/stepper']);
    } else {
      console.log('Confirmation booking:', this.booking);  // Safe: Already checked !null
    }
  }

  // Safe accessor method: Returns booking or null (use with ? in template/methods)
  get safeBooking(): Booking | null {
    return this.booking;
  }

  // Open Receipt Dialog (mock payment complete) - FIXED: Enhanced null guards
  // Open Receipt Dialog (mock payment complete) - FIXED: Capture non-null before async
openReceiptDialog(): void {
  if (!this.booking) {  // Null guard: Narrows type here
    this.errorMessage = 'No booking data available.';
    return;
  }

  // FIXED: Capture non-null booking in local var (TS infers as Booking, not | null)
  const currentBooking: Booking = this.booking!;  // Safe: Post-guard assertion

  this.isLoading = true;
  // Simulate payment processing delay
  setTimeout(() => {
    // Now fully safe: Use currentBooking (non-null type)
    const updatedBooking: Booking = { 
      ...currentBooking,  // No ! needed
      receipt: `Receipt-${currentBooking.id}.pdf`  // FIXED: No error on .id
    };
    
    const dialogRef = this.dialog.open(ReceiptDialogComponent, {
      width: '600px',
      data: { booking: updatedBooking }  // Pass data to dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'print') {
        // Mock print receipt
        window.print();
      } else if (result === 'newBooking') {
        this.router.navigate(['/stepper']);
      }
      this.isLoading = false;
    });
  }, 1000);
}

  // Navigate back to stepper for new booking
  startNewBooking(): void {
    this.router.navigate(['/stepper']);
  }

  // Calculate total (null-safe) - FIXED: Explicit null handling
  get totalPrice(): number {
    return this.booking?.totalPrice ?? 0;  // ?? for null/undefined fallback (better than || for 0)
  }

  // Optional: Safe getter for other properties (e.g., if used in more methods)
  get flightDetails(): string {
    if (!this.booking?.flight) return 'N/A';
    const f = this.booking.flight;
    return `${f.airline} ${f.flightNumber} (${f.fromAirport} → ${f.toAirport})`;
  }
}