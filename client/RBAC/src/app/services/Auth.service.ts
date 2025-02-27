import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { tap } from 'rxjs';
import { JWTPayload } from '../models/JwtPayload.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user = signal<JWTPayload | null>(
    localStorage.getItem('token')
      ? jwtDecode(JSON.parse(localStorage.getItem('token')!))
      : null
  );

  private httpClient = inject(HttpClient);
  private BASE_URL = 'http://localhost:8081/auth';
  private logoutTimer: any;
  private router = inject(Router);

  userDetails = this.user.asReadonly();

  getRemainingTime() {
    if (this.user() != null) {
      // Date.now() returns current time in ms.. We are convertng to seconds
      const currTime = Math.floor(Date.now() / 1000);

      // exp is given in seconds.. we are subtracting and converting into ms again for the timer
      return (this.user()!.exp - currTime) * 1000;
    }
    return null;
  }

  startLogoutTimer() {
    const remainingTime = this.getRemainingTime(); // Gives in milli seconds
    if (!remainingTime) {
      this.logout();
      return;
    }

    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, remainingTime);
  }

  logout() {
    this.user.set(null);
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
    if (localStorage.getItem('token') !== null) {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }

  login(email: string, password: string) {
    return this.httpClient
      .post(`${this.BASE_URL}/login`, { email, password })
      .pipe(
        tap({
          next: (resp: any) => {
            // Structure : { token: string; expiresIn: number }
            this.user.set(jwtDecode(resp.token));
            localStorage.setItem('token', JSON.stringify(resp.token));
            this.startLogoutTimer();
            
            let targetRoute = '/dashboard';
            switch (this.user()?.roles) {
              case 'ROLE_ADMIN':
                targetRoute = '/dashboard/admin';
                break;
              case 'ROLE_HR':
                targetRoute = '/dashboard/hr';
                break;
              case 'ROLE_COLLEGE':
                targetRoute = '/dashboard/college';
                break;
              case 'ROLE_STUDENT':
                targetRoute = '/dashboard/student';
                break;
              default:
                targetRoute = '/dashboard';
            }
            this.router.navigate([targetRoute]);
          },
        })
      );
  }

  setUser(user: any) {
    this.user.set(user);
  }
}
