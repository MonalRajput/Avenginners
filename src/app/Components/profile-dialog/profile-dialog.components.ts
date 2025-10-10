import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';  // FIXED: Import

@Component({
  selector: 'app-profile-dialog',
  template: `
    <h2 mat-dialog-title>Profile Details</h2>
    <mat-dialog-content class="profile-content">  <!-- Now recognized -->
      <mat-card>  <!-- Now recognized via MatCardModule -->
        <mat-card-content>  <!-- Now recognized -->
          <p><strong>Name:</strong> {{ data.name }}</p>
          <p><strong>Email:</strong> {{ data.email }}</p>
          <p><strong>Total Bookings:</strong> {{ data.bookings }}</p>
          <p><strong>Loyalty Points:</strong> {{ data.points }}</p>
        </mat-card-content>
      </mat-card>
    </mat-dialog-content>
    <mat-dialog-actions align="end">  <!-- Now recognized -->
      <button mat-button mat-dialog-close>Close</button>  <!-- Now recognized -->
      <button mat-raised-button color="primary">Edit Profile</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .profile-content { padding: 20px; }
    mat-card { box-shadow: none; background: #f9fafb; }
  `]
})
export class ProfileDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; email: string; bookings: number; points: number }
  ) {}
}