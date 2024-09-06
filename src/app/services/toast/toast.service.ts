import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ToastMessage {
  message: string;
  type: 'toast-success' | 'toast-danger' | 'toast-warning';
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private messageSource = new BehaviorSubject<ToastMessage | null>(null);
  currentMessage$ = this.messageSource.asObservable();

  setMessage(
    message: string,
    type: 'toast-success' | 'toast-danger' | 'toast-warning'
  ) {
    this.messageSource.next({ message, type });
  }

  clearMessage() {
    this.messageSource.next(null);
  }

  constructor() {}
}
