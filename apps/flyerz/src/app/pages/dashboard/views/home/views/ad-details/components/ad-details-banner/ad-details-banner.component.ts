import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { AdDetailsBannerMode } from '../../models/types';

@Component({
  selector: 'convertedin-ad-details-banner',
  standalone: true,
  imports: [CommonModule, TranslateModule, ButtonModule],
  templateUrl: './ad-details-banner.component.html',
  styleUrls: ['./ad-details-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdDetailsBannerComponent {
  @Input({ required: true }) bannerMode!: AdDetailsBannerMode;
  @Input() rejection!: {
    title?: string;
    reason?: string;
    solutionSteps?: string;
    rejected_by?: {
      id: number;
      name: string;
    };
  };
  @Output() showRejection: EventEmitter<void> = new EventEmitter();
}
