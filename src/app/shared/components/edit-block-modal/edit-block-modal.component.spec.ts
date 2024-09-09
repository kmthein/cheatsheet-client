import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBlockModalComponent } from './edit-block-modal.component';

describe('EditBlockModalComponent', () => {
  let component: EditBlockModalComponent;
  let fixture: ComponentFixture<EditBlockModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBlockModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBlockModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
