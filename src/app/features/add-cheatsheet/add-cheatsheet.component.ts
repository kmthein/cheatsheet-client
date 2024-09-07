import { Component } from '@angular/core';

@Component({
  selector: 'app-add-cheatsheet',
  templateUrl: './add-cheatsheet.component.html',
  styleUrl: './add-cheatsheet.component.css',
})
export class AddCheatsheetComponent {
  modalSize: 'medium-modal' | 'large-modal' | 'extralarge-modal' = 'medium-modal';
}
