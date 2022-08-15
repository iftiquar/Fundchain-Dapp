import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluidMeterComponent } from './fluid-meter.component';

describe('FluidMeterComponent', () => {
  let component: FluidMeterComponent;
  let fixture: ComponentFixture<FluidMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FluidMeterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FluidMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
