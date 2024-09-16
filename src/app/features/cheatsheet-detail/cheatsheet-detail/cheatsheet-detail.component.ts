import { Component } from '@angular/core';
import { CheatsheetService } from '../../../services/cheatsheet/cheatsheet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cheatsheet } from '../../../models/cheatsheet';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cheatsheet-detail',
  templateUrl: './cheatsheet-detail.component.html',
  styleUrl: './cheatsheet-detail.component.css',
})
export class CheatsheetDetailComponent {
  constructor(
    private cheatsheetService: CheatsheetService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  cheatsheetId!: number;
  cheatsheet = {} as Cheatsheet;
  baseUrl: string = 'http://localhost:8080/';

  user: User | undefined;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.cheatsheetId = +id!;
    this.getCheatsheetById(this.cheatsheetId);
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  goBack() {
    this.location.back();
  }

  getCheatsheetById(id: number) {
    this.cheatsheetService.getCheatsheetById(id).subscribe({
      next: (response) => {
        console.log(response);
        this.cheatsheet = response;
      },
      error: (error) => {
        console.error(error);
        this.router.navigate(['/cheatsheets']);
      },
    });
  }

  hexToRgba(hex: string, alpha: number): string {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}
