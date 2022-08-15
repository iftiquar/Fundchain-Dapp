import { UserinfoService } from './../userinfo/userinfo.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { TaquitoService } from './../../taquito.service'
import {IpfsComponent} from '../ipfs/ipfs.component'

import { Base64 } from 'js-base64';
import { secret } from '../../../environments/secret';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'ngx-addorg',
  templateUrl: './addorg.component.html',
  styleUrls: ['./addorg.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush,

})
export class AddorgComponent implements OnInit {
  Wallet : boolean;
  formerr : boolean;
  imgerr : boolean;
  selectedFile : ImageSnippet;
  curr: string;
  disp: string;
  xtz: any;
  constructor(private userinfo : UserinfoService,
              private cds : ChangeDetectorRef,
              private taquito: TaquitoService,
              private ipfs: IpfsComponent,
    ) {}

   ngOnInit():void{
      //! Need to uncomment at the end!!

    // fetch(`http://api.coinlayer.com/api/live?access_key=${secret.COIN_LAYER}`).then(response=>response.json())
    // .then(data=>{
    //   this.xtz=(data["rates"].XTZ);
    //   // this.disp = this.inrTOtez(this.con);
    // });

    this.xtz=5.261685;
    this.userinfo.Wallet.subscribe((status) => {
      this.Wallet = status;
      this.cds.detectChanges();
    });
  }

  async processFile(name,description,goal,post_type,institution,imageInput:any){
    const files: File[] = imageInput.files;
    if(files.length<4){
      this.imgerr=true;
    }
    else{
      this.imgerr=false;
    }
    if((name==="" || description==="" || goal==="" || post_type==="" || imageInput.files.length===0)){
      this.formerr=true;
    }
    else{
      this.formerr=false;
    }
    const reader = new FileReader();
    await this.ipfs.updateFiles(files);
    await this.ipfs.upload();
    // for(let i=0;i<files.length;i++){
    //   reader.addEventListener('load', (event: any) => {
    //     this.selectedFile = new ImageSnippet(event.target.result, files[i]);
    //   });
    // }
  }

  checkerr(name,description,goal,post_type,institution,imageInput){
    if((name==="" || description==="" || goal==="" || post_type==="" || imageInput.files.length===0)){
      this.formerr=true;
    }
    else{
      this.formerr=false;
    }
    if(this.imgerr){
      return 0;
    }
  }
  async addOrg(name,description,goal,post_type,institution,imageInput,deadline):Promise<number>
  {

    goal =Math.floor(parseFloat(goal.substring(0,goal.length-4))*1000000) as number;
    if((name==="" || description==="" || goal==="" || post_type==="" || imageInput.files.length===0)){
      this.formerr=true;
      return 0;
    }
    else{
      this.formerr=false;
    }
    if(this.imgerr){
      return 0;
    }

    await this.taquito.set_contract();

    const dl = new Date(deadline);
    // deadline = dl.getTime()/1000;
    var images = this.ipfs.get_hashes();

    const op = await this.taquito.add_new_post(name,description,institution,post_type,Base64.encode(sessionStorage.getItem('email'),true),goal,images,dl);
    return 1;
  }
  dollorTOtez(dollors) : number{
    return (dollors/this.xtz);
  }

  inrTOtez(inr) : number{
    return (inr/(this.xtz*73));
  }
  checkinp(name,description,goal,post_type,institution,imageInput,amount:number){
    if((name==="" || description==="" || goal==="" || post_type==="" || imageInput.files.length===0)){
      this.formerr=true;
    }
    else{
      this.formerr=false;
    }
    if(amount == 0){
      this.formerr=true;
    }
    else{
      this.formerr=false;
    }
    if(this.curr === 'dollar')
      {
          this.disp = this.dollorTOtez(amount)+" tez";
          // this.disp = 1*amount;
      }
    else if(this.curr === 'rupee')
      {
          this.disp = this.inrTOtez(amount)+" tez";
          // this.disp = 2*amount;
          console.log(this.disp);
      }
      this.cds.detectChanges();
  }

  change(amount:number,event:string){
    if(amount == 0){
      this.formerr=true;
    }
    else{
      this.formerr=false;
    }
    if(event === 'dollar')
      {
          this.disp = this.dollorTOtez(amount) + " tez";
          // this.disp = 1*amount;
      }
    else if(event === 'rupee')
      {
          this.disp = this.inrTOtez(amount) + " tez";
          // this.disp = 2*amount;
          console.log(this.disp);
      }
      this.cds.detectChanges();
  }
}
