import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrl: './section-list.component.css',
})
export class SectionListComponent {
  sections: any = [
    {
      id: 1,
      name: 'Programming',
    },
    {
      id: 2,
      name: 'Software',
    },
    {
      id: 3,
      name: 'Programming',
    },
    {
      id: 4,
      name: 'Programming',
    },
    {
      id: 5,
      name: 'Programming',
    },
    {
      id: 6,
      name: 'Programming',
    },
  ];

  public divWidth: string = "";

  // Define breakpoints
  private readonly lgBreakpoint = 1024; // lg breakpoint in pixels
  private readonly xlBreakpoint = 1536; // 2xl breakpoint in pixels

  constructor() {
    this.updateWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateWidth();
  }

  private updateWidth() {
    const width = window.innerWidth;
    if (width >= this.xlBreakpoint) {
      this.divWidth = 'calc((100% / 6) - 20px)'; // Width for 2xl
    } else if (width >= this.lgBreakpoint) {
      this.divWidth = 'calc((100% / 3) - 20px)'; // Width for lg
    } else {
      this.divWidth = 'calc((100%) - 20px)'; // Default width for smaller screens
    }
  }
}
