import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCheatsheetComponent } from './add-cheatsheet.component';

describe('AddCheatsheetComponent', () => {
  let component: AddCheatsheetComponent;
  let fixture: ComponentFixture<AddCheatsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCheatsheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCheatsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
