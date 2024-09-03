import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerWrapComponent } from './inner-wrap.component';

describe('InnerWrapComponent', () => {
  let component: InnerWrapComponent;
  let fixture: ComponentFixture<InnerWrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InnerWrapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InnerWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
