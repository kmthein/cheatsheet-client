import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularCheatsheetComponent } from './popular-cheatsheet.component';

describe('PopularCheatsheetComponent', () => {
  let component: PopularCheatsheetComponent;
  let fixture: ComponentFixture<PopularCheatsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopularCheatsheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularCheatsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
