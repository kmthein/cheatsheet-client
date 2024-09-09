import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private cheatsheetService: CheatsheetService,
    private sectionService: SectionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cheatsheetId = this.route.snapshot.paramMap.get('id')!;
    this.loadData();
    
  }

  onSubmit(form: NgForm) {
    let tags;
    if(form.value.tag) {
      tags = form.value.tag.replaceAll(" ","").split(",");
    }
    console.log(tags);
    const { user } = this.cheatsheet;
    const data = {
      ...form.value,
      tagList: tags,
      sectionId: this.cheatsheet.sectionId,
      userId: user?.id
    }
    console.log(this.cheatsheetId);
    
    this.cheatsheetService.updateCheatsheet(data, +this.cheatsheetId).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.error(error);
      }
    })
    console.log(data);
        
    
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

  trackBySectionId(index: number, section: Section): number {
    return section.id;
  }
  
  loadData() {
    const cheatsheetId = +this.cheatsheetId;
    
    this.cheatsheetService.getCheatsheetById(+this.cheatsheetId).subscribe({
      next: (response) => {
        this.cheatsheet = response;

        // Load sections after cheatsheet is set
        this.sectionService.getAllSections().subscribe({
          next: (sections) => {
            this.sections = sections;

            // Ensure correct sectionId is selected
            setTimeout(() => {
              this.cheatsheet.sectionId = this.cheatsheet.sectionId || this.sections[0]?.id;
            }, 0);
          },
          error: (err) => {
            console.error(err);
          }
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
