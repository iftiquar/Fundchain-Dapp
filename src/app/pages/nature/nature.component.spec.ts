import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NatureComponent } from './nature.component';


describe('NatureComponent', () => {
  let component: NatureComponent;
  let fixture: ComponentFixture<NatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
