import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-block-modal',
  templateUrl: './add-block-modal.component.html',
  styleUrls: ['./add-block-modal.component.css'],
})
export class AddBlockModalComponent {
  @Input() modalSize!: string;
  title: string = '';

  columnNum: number = 1;
  columns: number[] = [0];

  rowNum: number = 1;
  rows: number[] = [0];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
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
    console.log(this.columnNum);
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
    console.log(title);
    console.log(this.aryData); // Output the 2D array with row-by-row data
    blocks.push({ title: title, content: this.aryData });
    console.log(blocks);
  }
}
