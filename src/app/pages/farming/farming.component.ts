import { Component, OnInit } from '@angular/core';
import {TaquitoService} from '../../taquito.service'
import { Router } from '@angular/router';

class Organization{
  name : string;
  id: string;
  description : string;
  progress : Number;
  pic: string;
  goal : number;
}

@Component({
  selector: 'ngx-education',
  templateUrl: './farming.component.html',
  styleUrls: ['./farming.component.scss'],
})
export class FarmingComponent implements OnInit {
  orgs : Organization[] = [];
  constructor(private taquito : TaquitoService,private router : Router) { }

  async ngOnInit(): Promise<void> {
    await this.taquito.set_contract();
    const post_list = await this.taquito.get_specific_post_type("Farming");
    this.orgs = post_list as Organization[];
  }
  vieworg(puid)
  {
    this.router.navigate(['/main/viewpost/'+puid]);
  }
}
