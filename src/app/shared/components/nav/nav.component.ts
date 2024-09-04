import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  checked: any;
  value: any;

  constructor(private router: Router) {}

  logout() {
    // Implement logout logic here
    console.log('Logout functionality needs to be implemented');
    this.router.navigate(['/login']);
  }
}
