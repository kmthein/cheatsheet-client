import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from '../toast/toast.service';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlockService {
  private url = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private toastService: ToastService) {}

  addNewBlock(blocks: any, id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http
      .put<any>(`${this.url}/cheatsheets/${id}`, blocks, { headers })
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
}
