import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgpicsComponent } from './orgpics.component';

describe('OrgpicsComponent', () => {
  let component: OrgpicsComponent;
  let fixture: ComponentFixture<OrgpicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgpicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgpicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
