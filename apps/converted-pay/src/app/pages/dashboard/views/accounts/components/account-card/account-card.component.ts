import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GoogleBusiness,
  MetaBusiness,
} from '@converted-pay/shared/api';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-account-card',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss'],
  host: {
    class: 'flex justify-content-between align-items-center p-3 md:p-4 border-bottom-1 border-gray-300',
  },
})
export class AccountCardComponent {
  @Input() user!: MetaBusiness | GoogleBusiness;
  @Input() selectedUser: MetaBusiness | GoogleBusiness | null = null;
  @Input() nameKey!: any;
  @Output() onselectBusiness = new EventEmitter();
  @Output() disSelect = new EventEmitter();
}
