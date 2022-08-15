import { FarmingComponent } from './farming.component';
import { NbButtonModule, NbCardModule, NbProgressBarComponent, NbProgressBarModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    FarmingComponent
  ],
  imports: [
    CommonModule,
    NbButtonModule,
    NbCardModule,
    NbProgressBarModule
  ]
})
export class FarmingModule { }
