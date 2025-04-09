import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'convertedin-campaign-published',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule,AngularSvgIconModule],
  templateUrl: './campaign-published.component.html',
  styleUrls: ['./campaign-published.component.scss'],
  host: {
    class: 'flex justify-content-center align-items-center h-full',
  },
})
export class CampaignPublishedComponent {}
