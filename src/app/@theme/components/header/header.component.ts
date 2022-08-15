import { UserinfoService } from './../../../pages/userinfo/userinfo.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { TaquitoService } from '../../../taquito.service'
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  wallet : boolean =  false;

  user: any;

  themes = [
    {
      value: 'dark',
      name: 'Dark',
    },
  ];

  currentTheme = 'dark';
  primary = 'primary';
  userMenu = [ { title: 'Profile' }, { title: 'Add Wallet' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private taquito: TaquitoService,
              private userinfo : UserinfoService,
              private router: Router
              ) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    this.user={name:sessionStorage.getItem('name'),picture:`assets/images/${sessionStorage.getItem('profilepicid')}.png`};
    // const { xl } = this.breakpointService.getBreakpointsMap();
    // this.themeService.onMediaQueryChange()
    //   .pipe(
    //     map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
    //     takeUntil(this.destroy$),
    //   )
    //   .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    // this.themeService.onThemeChange()
    //   .pipe(
    //     map(({ name }) => name),
    //     takeUntil(this.destroy$),
    //   )
    //   .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  async ConnectWallet()
  {
    // console.log("Connect wallet here!");
    await this.taquito.connect_wallet();
    if(await this.taquito.is_connected()){
      this.wallet = true;
    }
    this.userinfo.Wallet.next(this.wallet);

  }

  async DisconnectWallet(){
    await this.taquito.disconnect_wallet();
    if(!await this.taquito.is_connected()){
      this.wallet = false;
    }
    this.userinfo.Wallet.next(this.wallet);
  }

  logout(){
    this.router.navigate(['']);
  }
}
