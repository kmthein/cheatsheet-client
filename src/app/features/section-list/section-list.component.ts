import { Component, HostListener } from '@angular/core';
import { SectionService } from '../../services/section/section.service';
import { Section } from '../../models/section';

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrl: './section-list.component.css',
})
export class SectionListComponent {
  sections: Section[] = [];

  constructor(private sectionService: SectionService) {
    this.updateWidth();
  }

  ngOnInit(): void {
    this.getSections();
  }

  getSections(): void {
    this.sectionService.getAllSections().subscribe(
      (data) => {
        this.sections = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public divWidth: string = '';

  // Define breakpoints
  private readonly lgBreakpoint = 1024; // lg breakpoint in pixels
  private readonly xlBreakpoint = 1536; // 2xl breakpoint in pixels

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateWidth();
  }

  private updateWidth() {
    const width = window.innerWidth;
    if (width >= this.xlBreakpoint) {
      this.divWidth = 'calc((100% / 6) - (20px - (20px / 6)))'; // Width for 2xl
    } else if (width >= this.lgBreakpoint) {
      this.divWidth = 'calc((100% / 3) - (20px - (20px / 3)))'; // Width for lg
    } else {
      this.divWidth = 'calc((100%) - 20px)'; // Default width for smaller screens
    }
  }
}
