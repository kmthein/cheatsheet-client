import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class CheatsheetService {
  private url = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private toastService: ToastService) {}

  addCheatsheet(name: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user')!);
    const userId = user?.id;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const data = {
      name,
      userId,
    };
    return this.http
      .post<any>(`${this.url}/cheatsheets/name`, data, { headers })
      .pipe(
        tap((response) => {
          console.log(response);
          this.toastService.setMessage(response.message, 'toast-success');
        }),
        catchError((err) => {
          const { error } = err;
          this.toastService.setMessage(error.message, 'toast-danger');
          return throwError(error);
        })
      );
  }

  getCheatsheetById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/cheatsheets/${id}`);
  }
}
