import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileinfoDialogComponent } from './profileinfo-dialog.component';

describe('ProfileinfoDialogComponent', () => {
  let component: ProfileinfoDialogComponent;
  let fixture: ComponentFixture<ProfileinfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileinfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileinfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
