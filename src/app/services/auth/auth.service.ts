import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { User } from '../../models/user';
import { ToastService } from '../toast/toast.service';
import { RegisterUser } from '../../features/register/register/register.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:8080/api';

  private userSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.userSource.asObservable();

  constructor(private http: HttpClient, private toastService: ToastService) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userSource.next(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(`${this.url}/login`, body).pipe(
      tap((response) => {
        const { token, userDetails } = response;
        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(userDetails));
          this.userSource.next(response.userDetails);
          this.toastService.setMessage('Login successful', 'toast-success');
        } else {
          console.log(response);
          this.toastService.setMessage(
            response?.message || 'Login failed.',
            'toast-danger'
          );
        }
      }),
      catchError((error) => {
        this.toastService.setMessage('Login failed.', 'toast-danger');
        return throwError(error);
      })
    );
  }

  register(user: RegisterUser): Observable<any> {
    console.log(user);
    return this.http.post<any>(`${this.url}/register`, user).pipe(
      tap((response) => {
        console.log(response);
        this.toastService.setMessage(
          'User register successful',
          'toast-success'
        );
      }),
      catchError((err) => {
        const { error } = err;
        console.log(error);
        this.toastService.setMessage(error.message, 'toast-danger');
        return throwError(error);
      })
    );
  }

  getUser() {
    return this.userSource.value;
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime; // Check if token is expired
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSource.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
