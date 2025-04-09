import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { TooltipModule } from 'primeng/tooltip';
import { CardData } from '../../models/interfaces/card-data.interface';
import {
  RouterLink
} from '@angular/router';

import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'convertedin-card-template',
  standalone: true,
  imports: [CommonModule, ButtonModule, ChipModule, TooltipModule, CardModule, RouterLink],
  templateUrl: './card-template.component.html',
  styleUrls: ['./card-template.component.scss'],
})
export class CardTemplateComponent {
  @Input() cardData: CardData = {
    type: '',
    isNew: false,
    isBlank: false,
    cardHeader: '',
    CTR: [],
    ROAS: [],
    strategy: [],
    audience: [],
    socialMediaLinks: {}
  }
  @Output() viewTemplateAction = new EventEmitter<void>(); // Emit event on "View Template" click

  get isRtl(): boolean {
    return document.dir === 'rtl';
  }

  onViewTemplate() {
    this.viewTemplateAction.emit();
  }

}
