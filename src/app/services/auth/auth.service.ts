import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:8080/api';

  private userSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.userSource.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(`${this.url}/login`, body).pipe(
      tap((response) => {
        const { token, userDetails } = response;
        if (token) {
          localStorage.setItem('token', token);
          this.userSource.next(response.userDetails);
        }
      })
    );
  }

  getUser() {
    return this.userSource.value;
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
