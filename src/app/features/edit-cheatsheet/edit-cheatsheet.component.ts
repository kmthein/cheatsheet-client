import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheatsheetService } from '../../services/cheatsheet/cheatsheet.service';
import { Cheatsheet } from '../../models/cheatsheet';
import { NgForm } from '@angular/forms';
import { Section } from '../../models/section';
import { SectionService } from '../../services/section/section.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-cheatsheet',
  templateUrl: './edit-cheatsheet.component.html',
  styleUrl: './edit-cheatsheet.component.css',
})
export class EditCheatsheetComponent {
  modalSize: 'medium-modal' | 'large-modal' | 'extralarge-modal' =
    'medium-modal';

  cheatsheetId!: string;

  cheatsheet = {} as Cheatsheet;
  sections: Section[] = [];
  rgbaColor: string = '';

  constructor(
    private route: ActivatedRoute,
    private cheatsheetService: CheatsheetService,
    private sectionService: SectionService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cheatsheetId = this.route.snapshot.paramMap.get('id')!;
    this.loadData();
  }

  onSubmit(form: NgForm) {
    let tags;
    if (form.value.tag) {
      if (form.value.tag.includes(' ')) {
        tags = form.value.tag.replaceAll(' ', '').split(',');
      } else {
        if (form.value.tag.includes(',')) {
          tags = form.value.tag.split(',');
        }
      }
    }
    const { user } = this.cheatsheet;
    const data = {
      ...form.value,
      tagList: tags,
      sectionId: this.cheatsheet.sectionId,
      userId: user?.id,
    };
    this.cheatsheetService
      .updateCheatsheet(data, +this.cheatsheetId)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.loadData();
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  onSectionChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    console.log('Selected section ID:', selectedValue);
    this.cheatsheet.sectionId = +selectedValue;

    // You can perform additional actions here based on the selected value
    // For example, update the cheatsheet object or trigger other methods
  }

  trackBySectionId(index: number, section: Section): number {
    return section.id;
  }

  hexToRgba(hex: string, alpha: number): string {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  loadData() {
    const cheatsheetId = +this.cheatsheetId;

    this.cheatsheetService.getCheatsheetById(cheatsheetId).subscribe({
      next: (response) => {
        console.log(response);
        this.rgbaColor = this.hexToRgba(response.color, 0.2);
        this.cheatsheet = response;
        const tagAry: any = [];

        response.tagList.map((t: any) => {
          tagAry.push(t.name);
        });

        this.cheatsheet.tag = tagAry;
        this.cheatsheet.layout = response.layout;

        // Load sections after cheatsheet is set
        this.sectionService.getAllSections().subscribe({
          next: (sections) => {
            this.sections = sections;

            // Ensure correct sectionId is selected
            setTimeout(() => {
              this.cheatsheet.sectionId =
                response?.section?.id || this.sections[0]?.id;
            }, 0);
          },
          error: (err) => {
            console.error(err);
          },
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
