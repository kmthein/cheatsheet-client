import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CheatsheetService } from '../../services/cheatsheet/cheatsheet.service';
import { Cheatsheet } from '../../models/cheatsheet';
import { NgForm } from '@angular/forms';
import { Section } from '../../models/section';
import { SectionService } from '../../services/section/section.service';

@Component({
  selector: 'app-edit-cheatsheet',
  templateUrl: './edit-cheatsheet.component.html',
  styleUrl: './edit-cheatsheet.component.css',
})
export class EditCheatsheetComponent {
  modalSize: 'medium-modal' | 'large-modal' | 'extralarge-modal' =
    'medium-modal';

  userId!: string;

  cheatsheet = {} as Cheatsheet;
  sections: Section[] = [];

  constructor(
    private route: ActivatedRoute,
    private cheatsheetService: CheatsheetService,
    private sectionService: SectionService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.getCheatsheetById(+this.userId);
    this.getAllSections();
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

  onSectionChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    console.log('Selected section ID:', selectedValue);
    this.cheatsheet.sectionId = +selectedValue;
    console.log(this.cheatsheet);

    // You can perform additional actions here based on the selected value
    // For example, update the cheatsheet object or trigger other methods
  }

  getCheatsheetById(id: number) {
    this.cheatsheetService.getCheatsheetById(id).subscribe({
      next: (response) => {
        console.log(response);
        if (response.id) {
          this.cheatsheet = response;
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getAllSections() {
    this.sectionService.getAllSections().subscribe({
      next: (value) => {
        this.sections = value;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
