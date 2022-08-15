import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-fc-chart-summary',
  template: `
    <div class="summary-container">
      <div *ngFor="let item of summary">
        <div>{{ item.title }}</div>
        <div class="h6">{{ item.count }}</div>
      </div>
    </div>
  `,
  styleUrls: ['./fc-chart-summary.component.scss']
})

export class FcChartSummaryComponent{

  @Input() summary: {title: string, count: number}[];

  constructor() { }

}
