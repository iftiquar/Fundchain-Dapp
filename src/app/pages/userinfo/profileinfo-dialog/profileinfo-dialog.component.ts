import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-profileinfo-dialog',
  templateUrl: './profileinfo-dialog.component.html',
  styleUrls: ['./profileinfo-dialog.component.scss']
})
export class ProfileinfoDialogComponent implements OnInit {

  constructor(private ref: NbDialogRef<ProfileinfoDialogComponent>) { }

  ngOnInit(): void {
  }

  close()
  {
    this.ref.close();
  }

}
