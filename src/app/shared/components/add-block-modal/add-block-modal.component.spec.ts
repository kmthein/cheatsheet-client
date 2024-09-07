import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBlockModalComponent } from './add-block-modal.component';

describe('AddBlockModalComponent', () => {
  let component: AddBlockModalComponent;
  let fixture: ComponentFixture<AddBlockModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBlockModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBlockModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
