import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

// Functional Interceptor
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Inject the AuthService dynamically
  const authService = inject(AuthService);

  // Get the token from AuthService
  const token = authService.getToken();

  // If token exists, clone the request and add the Authorization header
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    return next(clonedRequest);
  }

  // If no token, pass the request as is
  return next(req);
};
