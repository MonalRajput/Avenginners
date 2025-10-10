import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';  // FIXED: Import from MatDialogModule

interface Notification {
  message: string;
  date: string;
  type: 'success' | 'warning';
}

@Component({
  selector: 'app-notifications-dialog',
  template: `
    <h2 mat-dialog-title>Notifications</h2>
    <mat-dialog-content class="notifications-content">  
      <mat-list> 
        <mat-list-item *ngFor="let notif of data">  
          <mat-icon [class]="notif.type === 'success' ? 'success' : 'error'"> 
            {{ notif.type === 'success' ? 'check_circle' : 'warning' }}
          </mat-icon>
          <div matLine>{{ notif.message }}</div>
          <div matLine class="notif-date">{{ notif.date }}</div>
        </mat-list-item>
      </mat-list>
      <p *ngIf="data.length === 0" class="no-notifs">No notifications yet.</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">  
      <button mat-button mat-dialog-close>Close</button> 
      <button mat-raised-button color="accent">Mark All Read</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .notifications-content { max-height: 300px; overflow-y: auto; padding: 10px; }
    mat-list-item { margin-bottom: 8px; }
    .notif-date { font-size: 0.8em; color: #666; }
    .no-notifs { text-align: center; color: #999; }
    .success { color: #2E7D32 !important; }
    .error { color: #C62828 !important; }
  `]
})
export class NotificationsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<NotificationsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Notification[]
  ) {}
}