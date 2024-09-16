import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../../../models/user';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user = {} as User;
  isLogin = false;
  isEdit: boolean = false;
  selectedFile: File | null = null;
  baseUrl: string = 'http://localhost:8080/';
  @Output() userLogged = new EventEmitter<User>();

  constructor(private router: Router, private authService: AuthService, private userService: UserService) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(localStorage.getItem("user")!);
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0]; // Get the selected file
  }

  setProfileEdit(bool: boolean) {
    this.isEdit = bool;
  }


  onSubmit(form: NgForm) {
    console.log(form.value);
    console.log(this.selectedFile);
    const formData = new FormData();
    for(let key in form.value) {
      if(form.value.hasOwnProperty(key)) {
        if(form.value[key]) {
          formData.append(key, form.value[key]);
        }
      }
    }
    if(this.selectedFile) {
      formData.append("image", this.selectedFile);
    }
    const userId = this.user?.id;
    this.userService.updateUser(formData, userId).subscribe({
      next: response => {
        console.log(response);
        if (response.userDetails) {
          localStorage.setItem("user", JSON.stringify(response.userDetails));
          this.userLogged.emit(response.userDetails);
          this.router.navigate(['/']);
        }
      },
      error: error => {
        console.error(error);
      }
    });
  }
}
