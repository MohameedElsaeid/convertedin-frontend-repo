import { Component, HostBinding } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'convertedin-reassign-popup',
  standalone: true,
  imports: [ButtonModule, TranslateModule],
  templateUrl: './reassign-popup.component.html',
  styleUrls: ['./reassign-popup.component.scss'],
})
export class ReassignPopupComponent {
  @HostBinding('class') class = 'flex flex-column gap-4';
}
