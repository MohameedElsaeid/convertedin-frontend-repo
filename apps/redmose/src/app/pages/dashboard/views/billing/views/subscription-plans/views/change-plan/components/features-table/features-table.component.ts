import { Component } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-features-table',
  standalone: true,
  imports :[TooltipModule, OverlayPanelModule, TranslateModule],
  templateUrl: './features-table.component.html',
  styleUrls: ['./features-table.component.scss'],
})
export class FeaturesTableComponent {}
