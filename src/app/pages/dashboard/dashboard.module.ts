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
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { FormsModule } from '@angular/forms';
import { FcChartComponent } from './fc-chart/fc-chart.component';
import { FcChartSummaryComponent } from './fc-chart/fc-chart-summary/fc-chart-summary.component';
import { OrderChartComponent } from './fc-chart/charts/order-chart.component';
import { FundsChartComponent } from './fc-chart/charts/funds-chart.component';

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
    NbListModule,
    NbIconModule,
    NbButtonModule,
    NgxEchartsModule,
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,
    FcChartComponent,
    FcChartSummaryComponent,
    OrderChartComponent,
    FundsChartComponent,
  ],
})
export class DashboardModule { }
