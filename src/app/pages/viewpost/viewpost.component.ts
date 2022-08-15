import { UserinfoService } from './../userinfo/userinfo.service';
import { ConditionalFundDialogComponent } from './conditional-fund-dialog/conditional-fund-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { FluidMeterComponent } from './fluid-meter/fluid-meter.component';
import { Component, OnInit, Output, Input, SimpleChanges } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import FluidMeter from '../../../js/js-fluid-meter.js';
import {NbDialogService} from '@nebular/theme';
import {TaquitoService} from '../../taquito.service';
import {QrcodeComponent} from '../qrcode/qrcode.component'
import { Base64 } from 'js-base64';
import {secret} from '../../../environments/secret';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

interface OrganizationInfo{
  title: string,
  data: string,
};

@Component({
  selector: 'ngx-viewpost',
  templateUrl: './viewpost.component.html',
  styleUrls: ['./viewpost.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewpostComponent implements OnInit{
  formerr: boolean = false;
  lockedfunds: number;
  constructor(
    private cds: ChangeDetectorRef,
    private clipboardApi: ClipboardService,
    private dialogService: NbDialogService,
    private route: ActivatedRoute,
    private taqutio : TaquitoService,
    private qr:QrcodeComponent,
    private userinfo:UserinfoService
  ) { }

  // content: string = "abcdefghijklmnopqrstuvwxyz";
  elementType = 'canvas';
  data = 'pleasewait_pleasewait';

  Name: String;
  Goal: number = 0;
  reached: number = 0;
  Wallet:boolean;
  OrgInfo: OrganizationInfo[] = [];
  @Output() puid:String;

  xtz: any;
  curr: string = "rupee";
  con: any = 0;
  disp: any = 0;
  isVoted: boolean = false;
  VoteConfirmation: boolean = false;

  async ngOnInit(): Promise<void> {
    //! Need to uncomment at the end!!

    // fetch(`http://api.coinlayer.com/api/live?access_key=${secret.COIN_LAYER}`,{
    //   mode: 'cors',
    //   headers:{
    //     'Access-Control-Allow-Origin':'*'
    //   }
    // })
    // .then(response=>response.json())
    // .then(data=>{
    //   this.xtz=(data["rates"].XTZ);
    //   this.disp = this.inrTOtez(this.con);
    // });

    this.xtz=5.261685;

    this.userinfo.Wallet.subscribe((status) => {
      this.Wallet = status;
      this.cds.detectChanges();
    });
    const routeparams = this.route.snapshot.paramMap;
    this.puid = <String>routeparams.get('id');
    this.lockedfunds = 0;
    await this.getOrganizationDetails(this.puid);
    this.fluidMeter();
    this.cds.detectChanges();
  }

  dollorTOtez(dollors) : number{
    return (dollors/this.xtz);
  }

  inrTOtez(inr) : number{
    return (inr/(this.xtz*73));
  }


  CopyText(content: string)
  {
    this.clipboardApi.copyFromContent(this.data);
  }

  fluidMeter()
  {
    var fill = (this.reached/this.Goal)*100;
    var fm = new FluidMeter();
    fm.init({
      targetContainer: document.getElementById("fluid-meter"),
      fillPercentage: fill, // 15%
      options:{
        size: 210,
        borderWidth: 18,
        fontSize: "45px",
        backgroundColor: "#e2e2e2",
        foregroundColor: "#fafafa",
        backgroundFluidLayer: {
          fillStyle: "",
          angularSpeed: 100,
          maxAmplitude: 9,
          frequency: 30,
          horizontalSpeed: 150
        },
        foregroundFluidLayer: {
          fillStyle: "green",
          angularSpeed: 100,
          maxAmplitude: 12,
          frequency: 30,
          horizontalSpeed: -150
        },
      }
    });
  }

  async getOrganizationDetails(puid)
  {
    await this.taqutio.set_contract();
    var titles = ['Name', 'Organization Type', 'Name of the Institution','Target Amount','Description', 'Deadline'];
    var Data = ['-', '-', '-', '-', '-','-'];

    const post:any = await this.taqutio.get_post(puid);
    this.puid = puid;
    this.data = post.address;
    this.Goal = Math.floor(post.goal/1000000);
    this.reached = Math.floor(post.received_mutez/1000000);
    this.lockedfunds = Math.floor(post.locked_fund/1000000);//change locked funds here
    Data[0] = post.name;
    Data[1] = post.post_type;
    Data[2] = post.institution;
    Data[3] = this.Goal+" tez";
    Data[4] = post.description;
    Data[5] = post.deadline;//add deadline here
    this.Name = Data[0];

    for(let i=0; i<titles.length; i++)
    {
      this.OrgInfo.push({
        title: titles[i],
        data: Data[i],
      })
    }
  }

  async donate()
  {
    await this.taqutio.set_contract();
    // this.taqutio.send_fund(Base64.encode(sessionStorage.getItem('email'),true),this.puid,);
  }

  async upvote()
  {
    await this.taqutio.set_contract();
    this.isVoted = await this.taqutio.check_support(Base64.encode(sessionStorage.getItem('email'),true),this.puid);
    this.cds.detectChanges();
    if(this.isVoted == false)
    {
      await this.taqutio.support(Base64.encode(sessionStorage.getItem('email'),true),this.puid);
      this.VoteConfirmation = true;
      this.cds.detectChanges();
    }
  }
  async downvote()
  {
    await this.taqutio.set_contract();
    this.isVoted = await this.taqutio.check_support(Base64.encode(sessionStorage.getItem('email'),true),this.puid);
    this.cds.detectChanges();
    if(this.isVoted == false)
    {
      await this.taqutio.report(Base64.encode(sessionStorage.getItem('email'),true),this.puid);
      this.VoteConfirmation = true;
      this.cds.detectChanges();
    }
  }

  fund(amount: string, comment: string)
  {
    if(amount=="0 tez"){
      this.formerr=true;
      return 0;
    }
    if(!this.Wallet){
      return 0;
    }
    this.dialogService.open(ConfirmationDialogComponent, {
        context:{
          puid: this.puid as string,
          amount: Math.floor(parseFloat(amount.substring(0,amount.length-4))*1000000) as number,
          comment: comment,
        },
        closeOnBackdropClick: false,
      })
  }

  conditional(amount: string, comment: string)
  {
    if(amount=="0 tez"){
      this.formerr=true;
      return 0;
    }
    if(!this.Wallet){
      return 0;
    }
      this.dialogService.open(ConditionalFundDialogComponent, {
        context:{
          puid: this.puid as string,
          amount: Math.floor(parseFloat(amount.substring(0,amount.length-4))*1000000) as number,
          comment: comment,
        },
        closeOnBackdropClick: false,
      })
  }

  checkinp(amount:number){
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
