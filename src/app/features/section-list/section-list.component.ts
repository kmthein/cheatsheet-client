import { Component } from '@angular/core';

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
}
