import { StartupComponent } from './startup.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('StartupComponent', () => {
  let component: StartupComponent;
  let fixture: ComponentFixture<StartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
