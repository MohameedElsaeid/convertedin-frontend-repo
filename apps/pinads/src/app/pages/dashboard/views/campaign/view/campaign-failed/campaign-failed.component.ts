import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'convertedin-campaign-failed',
  standalone: true,
  imports: [CommonModule, TranslateModule,RouterLink],
  templateUrl: './campaign-failed.component.html',
  styleUrls: ['./campaign-failed.component.scss'],
  host: {
    class: 'flex justify-content-center align-items-center h-full',
  },
})
export class CampaignFailedComponent {}
