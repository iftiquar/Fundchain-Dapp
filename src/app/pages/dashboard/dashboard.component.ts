import { Router } from '@angular/router';
import {Component, OnDestroy} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';

import { TaquitoService } from './../../taquito.service'

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
  count: string;
}

class Organization{
  name : string;
  id: string;
  type : string;
  description : string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {

  private alive = true;

  solarValue: number;
  FundsReceivedCard: CardSettings = {
    title: 'Total Funds Raised',
    iconClass: 'nb-lightbulb',
    type: 'primary',
    count: "",
  };
  ContributorsCard: CardSettings = {
    title: 'Total Funders',
    iconClass: 'nb-plus-circled',
    type: 'info',
    count: "",
  };
  GoalsReachedCard: CardSettings = {
    title: 'Total Goals Reached',
    iconClass: 'nb-checkmark-circle',
    type: 'success',
    count: "",
  };
  RecipientsCard: CardSettings = {
    title: 'Total Beneficiaries',
    iconClass: 'nb-person',
    type: 'warning',
    count: "",
  };

  orgs : Organization[] = [
  ];
  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.FundsReceivedCard,
    this.ContributorsCard,
    this.GoalsReachedCard,
    this.RecipientsCard,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.FundsReceivedCard,
        type: 'warning',
      },
      {
        ...this.ContributorsCard,
        type: 'primary',
      },
      {
        ...this.GoalsReachedCard,
        type: 'danger',
      },
      {
        ...this.RecipientsCard,
        type: 'info',
      },
    ],
    dark: this.commonStatusCardsSet,
  };

  constructor(private themeService: NbThemeService,
              private solarService: SolarData,
              private taquito: TaquitoService,
              private router : Router) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
    });




    this.solarService.getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.solarValue = data;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  async ngOnInit(){
    await this.taquito.set_contract();
    this.RecipientsCard.count = await (await this.taquito.get_number_posts()).toString();
    this.GoalsReachedCard.count = await (await this.taquito.get_goals_reached()).toString();
    this.ContributorsCard.count = await (await this.taquito.get_total_donors()).toString();
    var count = await (await this.taquito.get_total_fund()).toString();
    this.FundsReceivedCard.count = count + " tez"
    var post_list = await this.taquito.get_all_posts();
    let i =0;
    while(i<post_list.length)
    {
      this.orgs.push(post_list[i] as Organization)
      i++;
    }
  }

  openorg(org : any){
    console.log(org);
    this.router.navigate(['/main/viewpost/'+org.puid]);
  }
}
