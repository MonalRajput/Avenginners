import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private userName = '';

  login(email: string, password: string): boolean {
    // Simple mock: accept any non-empty email/password
    if (email && password) {
      this.loggedIn = true;
      this.userName = email.split('@')[0];  // Extract username from email
      localStorage.setItem('user', JSON.stringify({ email, name: this.userName }));
      return true;
    }
    return false;
  }

  logout() {
    this.loggedIn = false;
    this.userName = '';
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    if (this.loggedIn) return true;
    const user = localStorage.getItem('user');
    if (user) {
      this.loggedIn = true;
      this.userName = JSON.parse(user).name;
      return true;
    }
    return false;
  }

  getUserName(): string {  // Fixed: No space, returns string
    return this.userName;
  }
}