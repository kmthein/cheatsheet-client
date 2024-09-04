import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SectionService {
  private url = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getAllSections(): Observable<any> {
    return this.http.get<any>(`${this.url}/sections`);
  }
}
