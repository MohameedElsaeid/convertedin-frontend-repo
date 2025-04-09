import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { routeList } from '../../data';
declare const FreshworksWidget: any;
@Component({
  selector: 'convertedin-dashboard-sidenav',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive,AngularSvgIconModule,TranslateModule],
  templateUrl: './dashboard-sidenav.component.html',
  styleUrls: ['./dashboard-sidenav.component.scss'],
  host:{
    class:'hidden lg:w-2 w-3 md:block'
  }
})
export class DashboardSidenavComponent {
  readonly routeList = routeList;
  
  contactUs() {
    FreshworksWidget('setLabels', {
      ar: {
        banner: 'تجربيه',
        launcher: 'Soutien',
        contact_form: {
          title: 'Contactez nous',
          submit: 'Envoyer',
          confirmation: 'Nous reviendrons vers vous bientôt',
        },
      },
    });
    FreshworksWidget('open');
  }
}
