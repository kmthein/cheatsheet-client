import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { jwtDecode } from 'jwt-decode';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Inject the AuthService dynamically
  const authService = inject(AuthService);

  // Get the token from AuthService
  const token = authService.getToken();

  // Function to check if the token is expired
  const checkTokenExpiration = (token: string): boolean => {
    if (!token) {
      return true;  // Token is missing, consider it expired
    }

    const decodedToken: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);  // Current time in seconds

    return decodedToken.exp < currentTime;  // Return true if expired
  };

  // If token exists, check if it's expired
  if (token) {
    if (checkTokenExpiration(token)) {
      // Handle token expiration (e.g., redirect to login, show alert)
      authService.logout();  // Optionally clear the token and log out the user
      alert('Your session has expired. Please log in again.');
      // Add any logic to redirect the user to the login page
      // Example: inject(Router).navigate(['/login']);
      return next(req);  // Continue without token or stop here based on your logic
    } else {
      // Token is valid, clone the request and add the Authorization header
      const clonedRequest = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
      return next(clonedRequest);
    }
  }

  // If no token, pass the request as is
  return next(req);
};
