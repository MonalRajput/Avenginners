import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../Services/auth.service';  // Adjust path
import { NotificationsDialogComponent } from '../notification-dialog/notification-dialog.component';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.components';
// import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';
// import { NotificationsDialogComponent } from '../notifications-dialog/notifications-dialog.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    public authService: AuthService,  // FIXED: Public for template access
    private router: Router,
    private dialog: MatDialog
  ) {}
  // FIXED: Getter to match common usage (e.g., *ngIf="isLoggedIn")
  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  // FIXED: Getter for user (avoids direct authService.user in template if needed)
  get user(): { name: string; email: string; bookings: number; points: number } {
    return this.authService.user;
  }

  // Open Profile Dialog
  openProfile(): void {
    this.dialog.open(ProfileDialogComponent, {
      width: '400px',
      data: this.user  // Use getter
    });
  }

  // Open Notifications Dialog
  openNotifications(): void {
    this.dialog.open(NotificationsDialogComponent, {
      width: '500px',
      height: '400px',
      data: this.getMockNotifications()
    });
  }

  // Navigate to History
  goToHistory(): void {
    this.router.navigate(['/history']);
  }

  // Logout
  logout(): void {
    this.authService.logout();
  }

  // Mock Notifications Data
  private getMockNotifications(): { message: string; date: string; type: 'success' | 'warning' }[] {
    return [
      { message: 'Booking #123 confirmed! ✈️', date: '2024-10-01', type: 'success' },
      { message: 'Flight delay for #456', date: '2024-10-02', type: 'warning' },
      { message: 'Loyalty points updated: +500', date: '2024-10-03', type: 'success' }
    ];
  }
}