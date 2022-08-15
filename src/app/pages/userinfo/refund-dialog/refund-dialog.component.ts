import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-refund-dialog',
  templateUrl: './refund-dialog.component.html',
  styleUrls: ['./refund-dialog.component.scss']
})
export class RefundDialogComponent implements OnInit {

  @Input() content : String;
  constructor(private ref: NbDialogRef<RefundDialogComponent>) { }

  ngOnInit(): void {
  }

  close()
  {
    this.ref.close();
  }

}
