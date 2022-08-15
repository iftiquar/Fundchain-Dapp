import { Component, OnDestroy, OnInit , Input} from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbComponentSize, NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';
import { Camera, SecurityCamerasData } from '../../../@core/data/security-cameras';
import { TaquitoService } from '../../../taquito.service';
import{
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'ngx-orgpics',
  templateUrl: './orgpics.component.html',
  styleUrls: ['./orgpics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrgpicsComponent implements OnInit, OnDestroy {
  
  @Input() puid:string;
  private destroy$ = new Subject<void>();

  cameras: Camera[]=[];
  selectedCamera: Camera;
  isSingleView = false;
  actionSize: NbComponentSize = 'medium';

  constructor(
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private securityCamerasService: SecurityCamerasData,
    private taquito : TaquitoService,
    private cdr: ChangeDetectorRef,
  ) {}

  async ngOnInit() {
    await this.taquito.set_contract();
    const pics = await this.taquito.get_pics(this.puid);
    for(let i=1; i<=pics.length; i++)
    {
      var temp = "picture #";
      var temp2 = temp+i;
      this.cameras.push({
        title: temp2,
        source: pics[i-1],
      })
    }
    this.selectedCamera = this.cameras[0];
    // this.securityCamerasService.getCamerasData()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((cameras: Camera[]) => {
    //     this.cameras = cameras;
    //     this.selectedCamera = this.cameras[0];
    //   });

    const breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(map(([, breakpoint]) => breakpoint.width))
      .subscribe((width: number) => {
        this.actionSize = width > breakpoints.md ? 'medium' : 'small';
      });
      this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectCamera(camera: any) {
    this.selectedCamera = camera;
    this.isSingleView = true;
  }

}
