import { UserinfoComponent, FsIconUIComponent } from './userinfo.component';
import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,

} from '@nebular/theme';
import { NbInputModule, NbTreeGridModule, NbTagModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';

import { FormsModule } from '@angular/forms';
import { RefundDialogComponent } from './refund-dialog/refund-dialog.component';
import { ProfileinfoDialogComponent } from './profileinfo-dialog/profileinfo-dialog.component';

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbTagModule,
    NbListModule,
    NbIconModule,
    NgxEchartsModule,
    NbTreeGridModule,
    NbInputModule,
    Ng2SmartTableModule,
  ],
  declarations: [
   UserinfoComponent,
   FsIconUIComponent,
   RefundDialogComponent,
   ProfileinfoDialogComponent
  ],
})
export class UserinfoModule { }

