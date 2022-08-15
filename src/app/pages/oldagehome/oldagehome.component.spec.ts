import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldagehomeComponent } from './oldagehome.component';

describe('OldagehomeComponent', () => {
  let component: OldagehomeComponent;
  let fixture: ComponentFixture<OldagehomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldagehomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OldagehomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
