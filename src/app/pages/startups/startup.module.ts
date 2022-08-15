import { StartupComponent } from './startup.component';
import { NbButtonModule, NbCardModule, NbProgressBarComponent, NbProgressBarModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    StartupComponent
  ],
  imports: [
    CommonModule,
    NbButtonModule,
    NbCardModule,
    NbProgressBarModule
  ]
})
export class StartupModule { }
