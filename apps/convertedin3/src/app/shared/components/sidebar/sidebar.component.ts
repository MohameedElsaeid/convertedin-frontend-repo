import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { LocalStorageConstants } from '@convertedin3/shared/constants';
import { MenuItem } from 'primeng/api';
import {
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { Subject } from 'rxjs';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
@Component({
  selector: '[convertedin-sidebar]',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgClass,
    NgIf,
    NgFor,
    NgClass,
    RouterLink,
    TranslateModule,
    ButtonModule,
    RouterLinkActive,
    SidebarModule,
    MenuModule,
    RippleModule
  ],
})
export class SidebarComponent implements OnDestroy {

  isSidebarOpen = false;
  dropdownOpen = false;


  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  constructor(private __translate: TranslateService, private __router: Router) {
    // const lang = localStorage.getItem('selectedLanguage') || 'en';
    // this.translate.setDefaultLang('en');
    // this.translate.use(lang);
  }

  languageMenuItems: MenuItem[] = [
    {
      label: this.__translate.instant(
        'dashboard.sidebar.overview'
      ),
      icon: 'pi pi-home',
      command: () => {
        // this.renewBudget();
      }
    },
    {
      label: this.__translate.instant(
        'dashboard.sidebar.social-media'
      ),
      icon: 'pi pi-share-alt',
      command: () => {
        // this.renewBudget();
      }
    },
    {
      label: this.__translate.instant(
        'dashboard.sidebar.settings'
      ),
      icon: 'pi pi-cog',
      command: () => {
        this.__router.navigate(['/dashboard/settings']);
      }
    }

  ];
  get activeLang() {
    return this.__translate.currentLang
    // return languages[this.__translate.currentLang].label;
  }
  //#region Declerations
  visibleSidebar: boolean = true;

  private __unsubscriber: Subject<void> = new Subject();
  //#endregion

  ngOnDestroy(): void {
    this.__unsubscriber.next();
    this.__unsubscriber.complete();
  }

  //#region Methods
  logout(): void {
    // this.__authApi.logout().subscribe(() => {
    //   // localStorage.removeItem(LocalStorageConstants.TOKEN);
    //   window.location.reload();
    // });
  }

  changeLang(newLang: string): void {
    localStorage.setItem(LocalStorageConstants.LANGUAGE, newLang);
    window.location.reload();
  }


  toggleSidebar() {
    this.visibleSidebar = !this.visibleSidebar;
  }

  // Helper to check if the screen is small
  isSmallScreen(): boolean {
    return window.innerWidth <= 768;  // Adjust breakpoint for small screen
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    // Force sidebar visibility based on screen size
    this.visibleSidebar = !this.isSmallScreen();
  }
}
