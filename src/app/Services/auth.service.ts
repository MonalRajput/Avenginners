import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn: boolean = false;
  private _user: any = null;
  private readonly gatewayBase = 'http://localhost:8080';

  constructor(private http: HttpClient) {
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

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private setAuth(token: string, user: any) {
    this._isLoggedIn = true;
    this._user = user;
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserName(): string {  // For navbar (note: space in name for prior compatibility)
    return this._user ? this._user.name : 'Guest';
  }

  get user() {
    return this._user;
  }

  // FIXED: Flexible mock login (accepts any email/password for testing)
  // Change to strict: if (email === 'user@example.com' && password === 'password')
  // Synchronous mock login (kept for fallback/manual testing)
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

  // Real API login via gateway -> /auth/login
  apiLogin(email: string, password: string): Observable<boolean> {
    const body = { username: email, password };
    return this.http.post<{ token: string }>(`${this.gatewayBase}/auth/login`, body).pipe(
      map(res => {
        const token = res?.token;
        if (!token) return false;
        const user = { name: email.split('@')[0] || 'User', email };
        this.setAuth(token, user);
        return true;
      }),
      catchError(() => of(false))
    );
  }

  register(email: string, password: string): Observable<boolean> {
    const body = { username: email, password };
    return this.http.post<any>(`${this.gatewayBase}/auth/register`, body).pipe(
      map(() => true),
      catchError(() => of(false))
    );
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