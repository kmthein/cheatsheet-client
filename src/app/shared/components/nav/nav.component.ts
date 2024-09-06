import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  value: any;
  user: User | undefined | null;
  isLogin = false;
  isDropdownVisible = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // Retrieve the user from the AuthService when the component is rendered
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
      this.isLogin = !!user; // Update isLogin based on user presence
    });
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const dropdown = document.getElementById('dropdownDefaultButton');
    if (dropdown && !dropdown.contains(event.target as Node)) {
      this.isDropdownVisible = false;
    }
  }
}
