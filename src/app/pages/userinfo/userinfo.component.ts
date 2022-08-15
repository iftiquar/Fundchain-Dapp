import { ProfileinfoDialogComponent } from './profileinfo-dialog/profileinfo-dialog.component';
import { RefundDialogComponent } from './refund-dialog/refund-dialog.component';
import { UserinfoService } from "./userinfo.service";
import { Base64 } from 'js-base64';
import { Router } from '@angular/router';

import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ChangeDetectionStrategy,
  ApplicationRef,
  ChangeDetectorRef,
} from "@angular/core";
import {
  NbDialogService,
  NbIconLibraries,
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from "@nebular/theme";
import {
  NbSortDirection,
  NbSortRequest,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
} from "@nebular/theme";

import { UserData } from "../../@core/data/users";
import { LayoutService } from "../../@core/utils";
import { map, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

import {TaquitoService} from "../../taquito.service"
import { EncodeIntoResult } from "util";

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  Type: string;
  Amount: string;
  items?: number;
  kind: string;
  parent: string;

}

@Component({
  selector: "ngx-userinfo",
  templateUrl: "./userinfo.component.html",
  styleUrls: ["./userinfo.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserinfoComponent implements OnInit, OnDestroy {
  customColumn = "Type";
  defaultColumns = ["Amount"];
  allColumns = [this.customColumn, ...this.defaultColumns];
  verifierXP:number = 0;
  orgXP:number = 0;
  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  userPictureOnly: boolean = false;
  user: any;
  private destroy$: Subject<void> = new Subject<void>();
  Name: String = sessionStorage.getItem('name');
  Email: String = sessionStorage.getItem('email');
  UUID: String = Base64.encode(sessionStorage.getItem('email'),true);
  Wallet: Boolean = false;
  themes = [
    {
      value: "cosmic",
      name: "Cosmic",
    },
  ];

  currentTheme = "cosmic";
  tick : String = "checkmark-square-2";
  cross : String = "close-square";
  xpicon : String ="arrowhead-up-outline";
  xpicon2 : String ="arrow-circle-up-outline";


  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
    private userinfo: UserinfoService,
    private cds: ChangeDetectorRef,
    private ad: ApplicationRef,
    private taquito: TaquitoService,
    private iconsLibrary: NbIconLibraries,
    private dialogService: NbDialogService,
    private router : Router,

  )
  {
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

   async ngOnInit(): Promise<void> {
    this.user={name:sessionStorage.getItem('name'),picture:`assets/images/${sessionStorage.getItem('profilepicid')}.png`};

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
      );

    this.userinfo.Wallet.subscribe((status) => {
      this.Wallet = status;
      this.cds.detectChanges();
    });

    this.currentTheme = this.themeService.currentTheme;

    await this.taquito.set_contract();

    this.update_out_transactions();
    this.update_in_transactions();
    this.verifierXP = await this.taquito.get_uxp(Base64.encode(sessionStorage.getItem('email'),true));
    this.orgXP = await this.taquito.get_oxp(Base64.encode(sessionStorage.getItem('email'),true));
    this.cds.detectChanges();
  }

  async update_out_transactions()
  {
    const uuid = Base64.encode(sessionStorage.getItem('email'),true);
    var transaction_list = await this.taquito.get_specific_from_transactions(uuid);
    var a = transaction_list as TreeNode<FSEntry>[];
    this.data[0].children = a;
    var amount = 0,i = 0;
    while(i<a.length)
    {
      amount += parseFloat(a[i].data.Amount)
      a[i].data.parent = "Out";
      i+=1
    }
    this.data[0].data.Amount = amount.toString();
    this.cds.detectChanges();
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  async update_in_transactions()
  {
    const uuid = Base64.encode(sessionStorage.getItem('email'),true);
    var transaction_list = await this.taquito.get_specific_to_transactions(uuid);
    var a = transaction_list as TreeNode<FSEntry>[];
    this.data[1].children = a;
    var amount = 0,i = 0;
    while(i<a.length)
    {
      amount += parseFloat(a[i].data.Amount);
      a[i].data.parent = "In";
      i+=1;
    }
    this.data[1].data.Amount = amount.toString();
    this.cds.detectChanges();
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  private data: TreeNode<FSEntry>[] = [
    {
      data: { Type: "Funding History", Amount: "0", kind:'dir', parent:'null'},
      children: [],
    },
    {
      data: { Type: "Fund Raising History", Amount: "0", kind:'dir', parent:'null' },
      children: [],
    },
  ];

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + nextColumnStep * index;
  }

  isDir(kind,parent): boolean {
    return !(kind === "dir");
  }

  isOut(parent) : boolean{
    return parent === "Out";
  }

  async Claim(puid,trans_id){
    await this.taquito.set_contract();
    var x = await this.taquito.check_claim(puid,trans_id);
    console.log(x);
    var content : string;
    if(x == 0){
      await this.taquito.claim_fund(puid,Base64.encode(sessionStorage.getItem('email'),true),trans_id);
    } 
    else if(x==1){
      content = "This fund is not mature. Please wait until the deadline of the cause!";
    }
    else if(x==2){
      content = "This fund was already sent to the organization.";
    }
    else if(x==3){
      content = "Transaction not found.";
    }
    else if(x==4){
      content = "Already claimed."
    }
    this.dialogService.open(RefundDialogComponent, {
      context:{
        content : content
      },
    })
  }

  Open()
  {
    this.dialogService.open(ProfileinfoDialogComponent);

  }

  async Reclaim(puid,trans_id){
    await this.taquito.set_contract();
    var x = await this.taquito.check_reclaim(Base64.encode(sessionStorage.getItem('email'),true),trans_id);
    console.log(x);
    var content : string;
    if(x == 0) {
      await this.taquito.reclaim_fund(puid,Base64.encode(sessionStorage.getItem('email'),true),trans_id);
    }
    else if(x==1){
      content = "This fund is not mature. Please wait until the deadline of the cause!";
    }
    else if(x==2){
      content = "This fund was already sent to the organization.";
    }
    else if(x==3){
      content = "Transaction not found.";
    }
    else if(x==4){
      content = "Already claimed."
    }
    this.dialogService.open(RefundDialogComponent, {
      context:{
        content : content
      },
    })
  }
  link_to_post(post_id){
    this.router.navigate(['/main/viewpost/'+post_id]);
  }
}

@Component({
  selector: "ngx-fs-icon-ui",
  template: `
  <nb-tree-grid-row-toggle [expanded]="expanded" *ngIf="isDir(); else fileIcon">
  </nb-tree-grid-row-toggle>
  <ng-template #fileIcon>
    <nb-icon icon="file-text-outline"></nb-icon>
  </ng-template>
`,
})
export class FsIconUIComponent {
  @Input() kind: string;
  @Input() expanded: boolean;

  isDir(): boolean {
    return this.kind === "dir";
  }
}
