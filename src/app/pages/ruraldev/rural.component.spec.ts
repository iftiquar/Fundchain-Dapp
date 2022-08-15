import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RuraldevComponent } from './rural.component';


describe('RuraldevComponent', () => {
  let component: RuraldevComponent;
  let fixture: ComponentFixture<RuraldevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuraldevComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuraldevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
