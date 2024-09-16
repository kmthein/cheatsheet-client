import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  updateUser(data: FormData, id: number): Observable<any> {
    console.log(id);
    return this.http.put<any>(`${this.url}/users/${id}`, data).pipe(
      tap((response) => {
        console.log(response);
        // this.toastService.setMessage(response.message, 'toast-success');
      }),
      catchError((err) => {
        const { error } = err;
        // this.toastService.setMessage(error.message, 'toast-danger');
        return throwError(error);
      })
    );;
  }
}
