import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  checked: any;
  value: any;
  user: User | undefined | null;
  isLogin = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // Retrieve the user from the AuthService when the component is rendered
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
      this.isLogin = !!this.user; // Update isLogin based on user presence
    });
    console.log(this.user);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
