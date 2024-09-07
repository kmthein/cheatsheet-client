import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    this.authService.register(form.value).subscribe({
      next: response => {
        this.router.navigate(['login']);
      },
      error: error => {
        console.error(error);
      }
    });
  }

  passwordMatch(): boolean {
    return this.user.password === this.user.cpassword;
  }
}
