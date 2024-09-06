import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

interface RegisterUser {
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
  onSubmit(form: NgForm) {
    console.log(form.value);
  }

  passwordMatch(): boolean {
    return this.user.password === this.user.cpassword;
  }
}
