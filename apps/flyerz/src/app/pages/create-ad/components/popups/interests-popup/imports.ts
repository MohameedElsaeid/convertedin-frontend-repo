import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '@flyerz/shared/components';
import { CheckboxModule } from 'primeng/checkbox';
import { SuggestionPopupContainerComponent } from '../suggestion-popup-container/suggestion-popup-container.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

export const interestsPopupImports = [
  CommonModule,
  SuggestionPopupContainerComponent,
  CheckboxModule,
  FormsModule,
  SpinnerComponent,
  InfiniteScrollModule,
];
