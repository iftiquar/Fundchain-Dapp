import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionalFundDialogComponent } from './conditional-fund-dialog.component';

describe('ConditionalFundDialogComponent', () => {
  let component: ConditionalFundDialogComponent;
  let fixture: ComponentFixture<ConditionalFundDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionalFundDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionalFundDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
