import { Component, OnInit } from '@angular/core';
import FluidMeter from '../../../../js/js-fluid-meter';

@Component({
  selector: 'ngx-fluid-meter',
  templateUrl: './fluid-meter.component.html',
  styleUrls: ['./fluid-meter.component.scss']
})
export class FluidMeterComponent implements OnInit {

  constructor() { }

  Goal: number = 4000;
  reached: number = 1000;
  remaining: number = 0;


  ngOnInit(): void {
    this.remaining = this.Goal - this.reached;
    this.fluidMeter();
  }

  fluidMeter()
  {
    var fill = (this.reached/this.Goal)*100;
    var fm = new FluidMeter();
    fm.init({
      targetContainer: document.getElementById("fluid-meter"),
      fillPercentage: fill, // 15%
      options:{
        size: 210,
        borderWidth: 18,
        fontSize: "45px",
        backgroundColor: "#e2e2e2",
        foregroundColor: "#fafafa",
        backgroundFluidLayer: {
          fillStyle: "",
          angularSpeed: 100,
          maxAmplitude: 9,
          frequency: 30,
          horizontalSpeed: 150
        },
        foregroundFluidLayer: {
          fillStyle: "green",
          angularSpeed: 100,
          maxAmplitude: 12,
          frequency: 30,
          horizontalSpeed: -150
        },
      }
    });

  }

}
