import { HealthComponent } from './health.component';
import { NbButtonModule, NbCardModule, NbProgressBarComponent, NbProgressBarModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    HealthComponent
  ],
  imports: [
    CommonModule,
    NbButtonModule,
    NbCardModule,
    NbProgressBarModule
  ]
})
export class HealthModule { }
