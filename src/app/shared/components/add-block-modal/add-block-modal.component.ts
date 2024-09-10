import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlockService } from '../../../services/block/block.service';

@Component({
  selector: 'app-add-block-modal',
  templateUrl: './add-block-modal.component.html',
  styleUrls: ['./add-block-modal.component.css'],
})
export class AddBlockModalComponent {
  @Input() modalSize!: string;
  @Input() addModalOpen: boolean = false;
  @Output() setAddModal = new EventEmitter();
  @Output() blockUpdated = new EventEmitter<void>();

  closeModal() {
    this.setAddModal.emit();
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
    blocks.push({ title, note, content: this.aryData });
    console.log(blocks);
    this.blockService.addNewBlock(blocks, this.cheatsheetId).subscribe({
      next: (response) => {
        console.log(response);
        this.blockUpdated.emit();
        this.aryData = [['']];
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
