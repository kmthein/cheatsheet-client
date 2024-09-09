import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CheatsheetService } from '../../services/cheatsheet/cheatsheet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-cheatsheet',
  templateUrl: './add-cheatsheet.component.html',
  styleUrl: './add-cheatsheet.component.css',
})
export class AddCheatsheetComponent {
  name: string = '';

  constructor(
    private cheatsheetService: CheatsheetService,
    private router: Router
  ) {}

  onSubmit(form: NgForm) {
    this.cheatsheetService.addCheatsheet(this.name).subscribe({
      next: (response) => {
        console.log(response);
        if (response.id) {
          this.router.navigate([`/cheatsheets/edit/${response.id}`]);
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
