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

  getBlockById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/blocks/${id}`);
  }

  addNewBlock(blocks: any, id: number): Observable<any> {
    const data = {
      id,
      blocks,
    };
    return this.http.post<any>(`${this.url}/blocks`, data).pipe(
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

  addImgBlock(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.url}/blocks/image`, formData).pipe(
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
