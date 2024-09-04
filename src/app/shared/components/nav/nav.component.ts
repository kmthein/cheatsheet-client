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

  menu: any[] = [
    { name: 'My Profile', value: 'profile' },
    { name: 'Settings', value: 'settings' },
    { name: 'Logout', value: 'logout' },
  ];

  selectedMenu: any;

  constructor(private router: Router) {}

  onMenuChange(event: any) {
    if (this.selectedMenu) {
      switch (this.selectedMenu.value) {
        case 'profile':
          this.router.navigate(['/profile']);
          break;
        case 'settings':
          this.router.navigate(['/settings']);
          break;
        case 'logout':
          this.logout();
          break;
        default:
          console.error('Unknown menu item');
      }
    }
  }

  logout() {
    // Implement logout logic here
    console.log('Logout functionality needs to be implemented');
    this.router.navigate(['/login']);
  }
}
