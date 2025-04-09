import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import {
  AccessControlItem,
  RoutesConfig,
  SideNavItem,
  SideNavItemBase,
} from './models';
import { QueryApi } from '@convertedin/api';
import { menuItems, moreMenuItems } from './routes';
import { AccessControlPipe, TestUserPipe } from './pipes';
import { Observable, finalize, of } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { MissingConfigPopupComponent } from './components/missing-config-popup/missing-config-popup.component';
import { ExceededSpendLimitPopupComponent } from './components/exceeded-spend-limit-popup/exceeded-spend-limit-popup.component';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarLoadingComponent } from './components/sidebar-loading/sidebar-loading.component';
import { MissingPushConfigPopupComponent } from './components/missing-push-config-popup/missing-push-config-popup.component';
import { MissingSmsConfigPopupComponent } from './components/missing-sms-config-popup/missing-sms-config-popup.component';

@Component({
  selector: 'convertedin-dashboard-sidebar',
  standalone: true,
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.scss'],
  imports: [
    CommonModule,
    AccordionModule,
    AccessControlPipe,
    TestUserPipe,
    SidebarLoadingComponent,
    TranslateModule,
  ],
  providers: [DialogService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class DashboardSidebarComponent implements OnInit {
  //#region Declerations
  @Input() logo?: string;
  @Input() isTestUser?: boolean = false;
  @Input() adSpendLimitExceeded?: boolean = false;
  @Input() missingEmailConfig?: boolean = false;
  @Input() missingPushConfig?: boolean = false;
  @Input() missingSmsConfig?: boolean = false;
  @Input() injectStyles?: boolean = false;
  @Input() assetsUrl?: string = '';
  @Input() routes?: RoutesConfig = {
    routes: menuItems,
    moreMenuRoutes: moreMenuItems,
  };
  @Input() fetchUserControls: boolean = true;
  @Output() routeClicked: EventEmitter<SideNavItemBase> = new EventEmitter();

  protected accessControl$!: Observable<{ data: Array<AccessControlItem> }>;
  protected isLoading: boolean = true;

  get dir() {
    return document.documentElement.dir;
  }
  //#endregion

  constructor(private __query: QueryApi, private __dialog: DialogService) {}

  ngOnInit(): void {
    this.injectStyles && this.addStylesToParent();

    this.accessControl$ = this.getUserModules().pipe(
      finalize(() => {
        this.isLoading = false;
      })
    );
  }

  //#region Methods
  getUserModules(): Observable<{ data: AccessControlItem[] }> {
    return this.fetchUserControls
      ? this.__query.get('/api/v1/modules/user-modules')
      : of([]);
  }



  accordionOpen(event: boolean, item?: any): void {
    if (event) {
      this.routeClicked.emit(item);
    }
  }


  //Email popup
  openMissingConfigPopup(): void {
    this.__dialog.open(MissingConfigPopupComponent, {
      styleClass: 'missing-config-banner',
      data: {
        url: this.assetsUrl,
      },
    });
  }


  //Pusnotification popup
  openMissingPushConfigPopup(): void {
    this.__dialog.open(MissingPushConfigPopupComponent, {
      styleClass: 'missing-config-banner',
      data: {
        url: this.assetsUrl,
      },
    });
  }

  //SMS popup
  openMissingSmsConfigPopup(): void {
    this.__dialog.open(MissingSmsConfigPopupComponent, {
      styleClass: 'missing-config-banner',
      data: {
        url: this.assetsUrl,
      },
    });
  }

   //Spent Limit popup
  openExceededLimitPopup(): void {
    this.__dialog.open(ExceededSpendLimitPopupComponent, {
      styleClass: 'missing-config-banner',
      data: {
        url: this.assetsUrl,
      },
    });
  }

  addStylesToParent(): void {
    const styles = `.p-component-overlay {background-color: rgba(0, 0, 0, 0.4);transition-duration: 0.2s;}.p-dialog {display: flex;flex-direction: column;pointer-events: auto;max-height: 90%;transform: scale(1);position: relative;}
.p-dialog { border-radius: 6px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); border: 0 none;}.p-dialog .p-dialog-header { border-bottom: 0 none; background: #ffffff; color: #343a40; padding: 1.5rem; border-top-right-radius: 6px; border-top-left-radius: 6px;}
.p-dialog-header { display: flex; align-items: center; justify-content: space-between; flex-shrink: 0;}.p-dialog .p-dialog-content:last-of-type { border-bottom-right-radius: 6px; border-bottom-left-radius: 6px;}.p-dialog .p-dialog-content { background: #ffffff; color: #495057; padding: 0 1.5rem 2rem 1.5rem;}
.p-dialog-content { overflow-y: auto; flex-grow: 1;}.p-dialog-mask { position: fixed;top: 0;left: 0;width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;pointer-events: none;}`;

    const style = document.createElement('style');
    style.innerHTML = styles;
    document.head.appendChild(style);
  }

  onRouteClick(event: any, route: SideNavItem): void {
    if (
      route.checkForAdSpendLimit ||
      route.checkForEmailConfig ||
      route.checkForPushConfig ||
      route.checkForSmsConfig
    ) {
      if (route.checkForAdSpendLimit && this.adSpendLimitExceeded) {
        event.preventDefault();
        this.openExceededLimitPopup();
      } else if (route.checkForEmailConfig && this.missingEmailConfig) {
        event.preventDefault();
        this.openMissingConfigPopup();
      } else if (route.checkForPushConfig && this.missingPushConfig) {
        event.preventDefault();
        this.openMissingPushConfigPopup();
      } else if (route.checkForSmsConfig && this.missingSmsConfig) {
        event.preventDefault();
        this.openMissingSmsConfigPopup();
      }
      
    } else {
      this.routeClicked.emit(route);
    }
  }
  //#endregion
}
