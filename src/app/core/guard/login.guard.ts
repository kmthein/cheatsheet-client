import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // If the user is logged in, redirect to dashboard (or another page)
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
      return false; // Prevent access to login page
    }
    return true; // Allow access to login page
  }
}
