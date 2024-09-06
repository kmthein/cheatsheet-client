import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  @Output() userLogged = new EventEmitter<User>();

  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    const { email, password } = form.value;
    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log(response);
        this.userLogged.emit(response.userDetails);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
