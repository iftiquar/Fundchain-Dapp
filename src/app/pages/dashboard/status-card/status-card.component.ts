import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card  [ngClass]="{'off': !on}">
      <div class="icon-container">
        <div class="icon status-{{ type }}">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="details">
        <div class="title h5">{{ title }}</div>
        <div class="status paragraph-2">{{ count | lowercase}}</div>
      </div>
    </nb-card>
  `,
})
export class StatusCardComponent implements OnInit{

  @Input() title: string;
  @Input() type: string;
  @Input() on = true;
  @Input() count:string;

  ngOnInit()
  {
    this.count.toLowerCase();

  }
}
