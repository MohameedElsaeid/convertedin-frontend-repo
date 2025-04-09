import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { provideBillingApi } from '@redmose/shared/api';

@Component({
  selector: 'convertedin-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet,TranslateModule],
  providers: [provideBillingApi()],
})
export class BillingComponent {}
