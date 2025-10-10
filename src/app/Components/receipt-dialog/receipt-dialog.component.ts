import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Booking } from '../../Models/booking.model';  // Adjust path

@Component({
  selector: 'app-receipt-dialog',
  templateUrl: './receipt-dialog.component.html',
  styleUrls: ['./receipt-dialog.component.scss']
})
export class ReceiptDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ReceiptDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { booking: Booking }
  ) {}

  // Close dialog
  onClose(): void {
    this.dialogRef.close();
  }

  // Print receipt (uses browser print)
  onPrint(): void {
    this.dialogRef.close('print');
  }

  // Start new booking
  onNewBooking(): void {
    this.dialogRef.close('newBooking');
  }

  // Format date for display
  get formattedBookingDate(): string {
    return this.data.booking.bookingDate ? new Date(this.data.booking.bookingDate).toLocaleDateString() : 'N/A';
  }
}