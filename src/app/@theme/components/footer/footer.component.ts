import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `<div style="margin:0 auto;">
  <span style="vertical-align:middle">Powered by </span>
  <img style="vertical-align:middle" src="../../../../assets/images/tezos-bg.png" width="30px" height="px" alt="">
</div>`,
})
export class FooterComponent {
}
