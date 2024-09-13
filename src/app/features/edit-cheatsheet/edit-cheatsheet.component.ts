import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheatsheetService } from '../../services/cheatsheet/cheatsheet.service';
import { Cheatsheet } from '../../models/cheatsheet';
import { NgForm } from '@angular/forms';
import { Section } from '../../models/section';
import { SectionService } from '../../services/section/section.service';
import { forkJoin } from 'rxjs';
import { BlockService } from '../../services/block/block.service';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-cheatsheet',
  templateUrl: './edit-cheatsheet.component.html',
  styleUrl: './edit-cheatsheet.component.css',
})
export class EditCheatsheetComponent {
  [x: string]: any;
  modalSize: 'medium-modal' | 'large-modal' | 'extralarge-modal' =
    'medium-modal';

  cheatsheetId!: string;
  isModalOpen: boolean = false;
  cheatsheet = {} as Cheatsheet;
  sections: Section[] = [];
  rgbaColor: string = '';

  isEdit: boolean = false;
  selectedBlockId: number | null = null;
  selectedBlock: any = null;

  blocks: any;
  aryData: any;
  user: User | undefined;

  addModalOpen: boolean = false;

  selectBlock(id: number) {
    console.log(id);
    this.isModalOpen = true;

    this.isEdit = true;
    this.selectedBlockId = id;
    this.getBlockById(id);
  }

  setAddModal(isOpen: boolean) {
    this.addModalOpen = isOpen;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  getBlockById(id: number): void {
    this.blockService.getBlockById(id).subscribe({
      next: (response) => {
        this.blocks = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  constructor(
    private route: ActivatedRoute,
    private cheatsheetService: CheatsheetService,
    private sectionService: SectionService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private blockService: BlockService,
    private authService: AuthService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.cheatsheetId = this.route.snapshot.paramMap.get('id')!;
    this.loadData();
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  onBlockUpdated() {
    this.loadData();
    this.isModalOpen = false;
  }

  onSubmit(form: NgForm) {
    let tags;
    console.log(form.value.tag);

    if (form.value.tag) {
      if (form.value.tag.includes(' ')) {
        tags = form.value.tag.replaceAll(' ', '').split(',');
      } else if (form.value.tag.includes(',')) {
        tags = form.value.tag.substring.split(',');
      } else if (
        !form.value.tag.includes(' ') &&
        !form.value.tag.includes(',')
      ) {
        tags = [];
        tags.push(form.value.tag);
      } else {
        tags = form.value.tag;
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
          this.loadData();
          this.router.navigate([`/cheatsheets/${this.cheatsheetId}`]);
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

  goBack() {
    this.location.back();
  }

  loadData() {
    const cheatsheetId = +this.cheatsheetId;

    this.cheatsheetService.getCheatsheetById(cheatsheetId).subscribe({
      next: (response) => {
        console.log(response);
        if (response.color) {
          this.rgbaColor = this.hexToRgba(response.color, 0.2);
        }
        this.cheatsheet = response;

        if (this.user?.id != this.cheatsheet?.user?.id) {
          this.router.navigate([`/cheatsheets/${this.cheatsheetId}`]);
        }
        const tagAry: any = [];

        if (response.tagList) {
          response.tagList.map((t: any) => {
            tagAry.push(t.name);
          });
        }

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
