import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlockService } from '../../../services/block/block.service';

@Component({
  selector: 'app-edit-block-modal',
  templateUrl: './edit-block-modal.component.html',
  styleUrl: './edit-block-modal.component.css',
})
export class EditBlockModalComponent implements OnInit, OnChanges {
  @Input() modalSize!: string;
  @Input() blockId: number | null = null;
  @Input() blocks: any;
  @Input() isModalOpen: boolean = false;

  @Output() blockUpdated = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  closeEditModal() {
    this.closeModal.emit();
  }

  title: string = '';
  note: string = '';
  cheatsheetId!: number;

  columnNum: number = 1;
  columns: number[] = [0];

  rowNum: number = 1;
  rows: number[] = [0];

  constructor(
    private route: ActivatedRoute,
    private blockService: BlockService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.cheatsheetId = +id!;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['blocks'] && this.blocks) {
      // When blocks is updated, initialize the form
      this.initializeFormWithBlockContent();
    }
  }

  initializeFormWithBlockContent() {
    // Set title if available
    this.title = this.blocks.title || '';
    this.note = this.blocks.note || '';

    // Pre-populate aryData with existing block content
    if (this.blocks.content && Array.isArray(this.blocks.content)) {
      this.aryData = this.blocks.content;

      // Set columnNum and rowNum based on the content size
      this.rowNum = this.aryData.length;
      this.columnNum = this.aryData[0]?.length || 1;

      // Update rows and columns
      this.rows = Array.from({ length: this.rowNum }, (_, index) => index);
      this.columns = Array.from(
        { length: this.columnNum },
        (_, index) => index
      );
    }
  }

  aryData: string[][] = [['']]; // Initialize with one empty row and column

  // Dynamically update the columns array based on the selected column number
  updateColumns() {
    this.columns = Array.from({ length: this.columnNum }, (_, index) => index);

    // Resize existing rows in aryData to match the new column count
    this.aryData.forEach((row) => {
      while (row.length < this.columnNum) {
        row.push(''); // Add empty string for new columns
      }
      while (row.length > this.columnNum) {
        row.pop(); // Remove extra columns
      }
    });
  }

  // Add a new row to aryData
  addNewRow() {
    this.rowNum += 1;
    this.rows = Array.from({ length: this.rowNum }, (_, index) => index);
    const newRow = Array.from({ length: this.columnNum }, () => ''); // Add a new row with empty columns
    this.aryData.push(newRow);
  }

  submitBlock() {
    const blocks = [];
    const title = this.title;
    const note = this.note;
    blocks.push({ id: this.blockId, title, note, content: this.aryData });
    this.blockService.addNewBlock(blocks, this.cheatsheetId).subscribe({
      next: (response) => {
        console.log(response);
        this.blockUpdated.emit();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
