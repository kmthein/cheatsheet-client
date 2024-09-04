import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestCheatsheetComponent } from './latest-cheatsheet.component';

describe('LatestCheatsheetComponent', () => {
  let component: LatestCheatsheetComponent;
  let fixture: ComponentFixture<LatestCheatsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LatestCheatsheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestCheatsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
