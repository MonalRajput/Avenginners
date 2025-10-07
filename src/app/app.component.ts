import { Component, OnInit } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Intermodal Booking Frontend';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    // Optional: Check auth on app load and redirect if needed
    if (!this.auth.isLoggedIn()) {
      // Don't redirect; allow guest access to home/search
    }
  }
}