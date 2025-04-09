import { Component } from '@angular/core';
import { campaignsImports } from './imports';

@Component({
  selector: 'convertedin-campaigns',
  standalone: true,
  imports: [campaignsImports],
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss'],
})
export class CampaignsComponent {}

