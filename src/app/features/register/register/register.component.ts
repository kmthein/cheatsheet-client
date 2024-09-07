import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';

export interface RegisterUser {
  name: string;
  password: string;
  cpassword: string;
  email: string;
  description: string | null;
  website: string | null;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  user = {} as RegisterUser;

  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    this.authService.register(form.value);
  }

  passwordMatch(): boolean {
    return this.user.password === this.user.cpassword;
  }
}
