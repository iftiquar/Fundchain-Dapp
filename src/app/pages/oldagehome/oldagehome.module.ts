import { OldagehomeComponent } from './oldagehome.component';
import { NbButtonModule, NbCardModule, NbProgressBarComponent, NbProgressBarModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    OldagehomeComponent
  ],
  imports: [
    CommonModule,
    NbButtonModule,
    NbCardModule,
    NbProgressBarModule
  ]
})
export class OldagehomeModule { }
