import { Component, Input } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { AuthService } from './services/auth/auth.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'cheatsheet-client';

  constructor(private authService: AuthService) {}

  user: User | undefined;

  ngOnInit(): void {
    initFlowbite();
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }
}
