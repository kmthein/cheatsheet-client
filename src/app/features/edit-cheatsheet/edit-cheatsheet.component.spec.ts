import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCheatsheetComponent } from './edit-cheatsheet.component';

describe('EditCheatsheetComponent', () => {
  let component: EditCheatsheetComponent;
  let fixture: ComponentFixture<EditCheatsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCheatsheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCheatsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
