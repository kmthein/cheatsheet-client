import { Component } from '@angular/core';
import { CheatsheetService } from '../../services/cheatsheet/cheatsheet.service';
import { Cheatsheet } from '../../models/cheatsheet';
import { ActivatedRoute } from '@angular/router';
import { Section } from '../../models/section';
import { SectionService } from '../../services/section/section.service';

@Component({
  selector: 'app-cheatsheet',
  templateUrl: './cheatsheet.component.html',
  styleUrl: './cheatsheet.component.css',
})
export class CheatsheetComponent {
  sections: Section[] = [];

  constructor(
    private cheatsheetService: CheatsheetService,
    private sectionService: SectionService,
    private route: ActivatedRoute
  ) {}

  cheatsheets: Cheatsheet[] = [];

  ngOnInit() {
    this.getSections();
    const sectionName = this.route.snapshot.paramMap.get('name');
    if (!sectionName) {
      this.getAllCheatsheets();
    } else if (sectionName) {
      this.getCheatsheetsBySection(sectionName);
    }
    console.log(sectionName);
  }

  getSections(): void {
    this.sectionService.getAllSections().subscribe(
      (data) => {
        data.map((d: any) => {
          if (d.parent == null) {
            this.sections.push(d);
          }
        });
        console.log(this.sections);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAllCheatsheets() {
    this.cheatsheetService.getAllCheatsheets().subscribe({
      next: (response) => {
        this.cheatsheets = response;
        console.log(this.cheatsheets);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getCheatsheetsBySection(name: string) {
    this.cheatsheetService.getCheatsheetsBySection(name).subscribe({
      next: (response) => {
        this.cheatsheets = response;
        console.log(this.cheatsheets);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  darkenHexColor(hex: string, factor: number): string {
    // Remove the '#' if present
    hex = hex.replace('#', '');

    // Convert hex to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Ensure the factor is between 0 and 1 (to darken the color)
    if (factor < 0 || factor > 1) {
      throw new Error('Factor must be between 0 and 1');
    }

    // Darken the RGB values by multiplying by the factor
    const darkerR = Math.round(r * factor);
    const darkerG = Math.round(g * factor);
    const darkerB = Math.round(b * factor);

    // Return the darker color in RGB format
    return `rgb(${darkerR}, ${darkerG}, ${darkerB})`;
  }
}
