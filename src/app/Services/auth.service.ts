import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn: boolean = false;
  private _user: any = null;

  constructor() {
    // FIXED: Load persisted state on init (prevents reset on reload)
    this.loadAuthState();
  }

  // FIXED: Load from localStorage (runs on app start)
  private loadAuthState(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      this._isLoggedIn = true;
      // FIXED: Decode mock user from token (in real app, decode JWT)
      this._user = JSON.parse(localStorage.getItem('user') || '{}');
    } else {
      this._isLoggedIn = false;
      this._user = null;
    }
  }

  // FIXED: Public method - Checks internal state + storage
  public isAuthenticated(): boolean {
    // FIXED: Always check storage for persistence
    const token = localStorage.getItem('authToken');
    return !!token && this._isLoggedIn;
  }

  getUserName(): string {  // For navbar (note: space in name for prior compatibility)
    return this._user ? this._user.name : 'Guest';
  }

  get user() {
    return this._user;
  }

  // FIXED: Flexible mock login (accepts any email/password for testing)
  // Change to strict: if (email === 'user@example.com' && password === 'password')
  login(email: string, password: string): boolean {
    if (email && password) {  // FIXED: Any non-empty for easy testing
      // FIXED: Mock success (in real: call ApiService.login(email, password))
      this._isLoggedIn = true;
      this._user = { 
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1) || 'User ',  // e.g., "John" from "john@example.com"
        email: email, 
        bookings: 5, 
        points: 1500 
      };
      
      // FIXED: Persist to localStorage (survives reloads)
      localStorage.setItem('authToken', 'mock-jwt-' + Date.now());  // Mock token
      localStorage.setItem('user', JSON.stringify(this._user));
      
      console.log('Login successful! User:', this._user);  // Debug
      return true;
    }
    console.log('Login failed: Invalid credentials');  // Debug
    return false;
  }

  // FIXED: Logout clears everything
  logout(): void {
    this._isLoggedIn = false;
    this._user = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    console.log('Logged out');
  }
}