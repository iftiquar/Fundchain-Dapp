import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddorgComponent } from './addorg.component';

describe('AddorgComponent', () => {
  let component: AddorgComponent;
  let fixture: ComponentFixture<AddorgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddorgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddorgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
