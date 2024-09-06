import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  @Output() userLogged = new EventEmitter<User>();

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    const { email, password } = form.value;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        if (response.token) {
          this.userLogged.emit(response.userDetails);
          this.router.navigate(['/']);
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
