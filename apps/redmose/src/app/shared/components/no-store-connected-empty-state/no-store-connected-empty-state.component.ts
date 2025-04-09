import { Component, HostBinding } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'convertedin-no-store-connected-empty-state',
  standalone: true,
  templateUrl: './no-store-connected-empty-state.component.html',
  styleUrls: ['./no-store-connected-empty-state.component.scss'],
  imports: [ButtonModule, TranslateModule],
})
export class NoStoreConnectedEmptyStateComponent {
  @HostBinding('class') class =
    'flex flex-column flex-grow-1 align-items-center justify-content-center gap-3';
}
