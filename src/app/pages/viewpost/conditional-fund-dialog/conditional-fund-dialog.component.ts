import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Base64 } from 'js-base64';
import { TaquitoService } from '../../../taquito.service';

@Component({
  selector: 'ngx-conditional-fund-dialog',
  templateUrl: './conditional-fund-dialog.component.html',
  styleUrls: ['./conditional-fund-dialog.component.scss']
})
export class ConditionalFundDialogComponent implements OnInit {

  @Input() puid: string;
  @Input() amount: number;
  @Input() comment: string;


  constructor(private ref: NbDialogRef<ConditionalFundDialogComponent>,private taquito : TaquitoService) { }

  ngOnInit(): void {
  }


  close()
  {
    this.ref.close();
  }

  async Okay(downvotes)
  {
    this.ref.close();
    await this.taquito.set_contract();
    await this.taquito.send_fund_to_contract(Base64.encode(sessionStorage.getItem('email'),true),this.puid,this.amount,this.comment,downvotes);
  }

}
