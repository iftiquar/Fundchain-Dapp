import { OrderChartComponent } from './charts/order-chart.component';
import { FundsChartComponent } from './charts/funds-chart.component';
import { FcChartService, OrdersChartData, FundsChartData } from './fc-chart.service';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { takeWhile } from 'rxjs/operators';


interface PanelSummary{
  title: string,
  count: number,
}

@Component({
  selector: 'ngx-fc-chart',
  templateUrl: './fc-chart.component.html',
  styleUrls: ['./fc-chart.component.scss']
})


export class FcChartComponent implements OnDestroy {


  chartPanelSummary: PanelSummary[] = [
    {
      title: 'Last Week',
      count: 60
    },
    {
      title: 'Last Month',
      count: 500
    },
    {
      title: 'Last Year',
      count: 2300
    },
  ];

  private alive = true;
  period: string = 'week';
  ordersChartData: OrdersChartData;
  fundsChartData: FundsChartData;

  @ViewChild('ordersChart', { static: true }) ordersChart: OrderChartComponent;
  @ViewChild('fundsChart', { static: true }) fundsChart: FundsChartComponent;


  constructor(private fcChartService: FcChartService) { 

    this.getOrdersChartData(this.period);
    this.getFundsChartData(this.period);

  }


  setPeriodAndGetChartData(value: string): void {
    if (this.period !== value) {
      this.period = value;
    }

    this.getOrdersChartData(value);
    this.getFundsChartData(value);
  }

  changeTab(selectedTab) {
    if (selectedTab.tabTitle === 'Funds Raised') {
      this.fundsChart.resizeChart();
    } else {
      this.ordersChart.resizeChart();
    }
  }

  getOrdersChartData(period: string) {
    this.ordersChartData = this.fcChartService.getOrdersChartData(period);

  }

  getFundsChartData(period: string) {
    this.fundsChartData = this.fcChartService.getFundsChartData(period);
    console.log(this.fundsChartData);
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

}



