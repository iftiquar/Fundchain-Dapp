import { RuraldevComponent } from './rural.component';
import { NbButtonModule, NbCardModule, NbProgressBarComponent, NbProgressBarModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    RuraldevComponent
  ],
  imports: [
    CommonModule,
    NbButtonModule,
    NbCardModule,
    NbProgressBarModule
  ]
})
export class RuraldevModule { }
