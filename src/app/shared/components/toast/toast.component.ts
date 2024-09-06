import { Component } from '@angular/core';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  message: string | null = null;
  type: 'toast-success' | 'toast-danger' | 'toast-warning' | null = null;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.currentMessage$.subscribe((toast) => {
      if (toast) {
        this.message = toast.message;
        this.type = toast.type;
        setTimeout(() => this.clearMessage(), 3000); // Hide message after 3 seconds
      }
    });
  }

  clearMessage() {
    this.message = null;
    this.type = null;
  }
}
