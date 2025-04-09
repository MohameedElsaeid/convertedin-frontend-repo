import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '@flyerz/shared/components';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { SuggestionPopupContainerComponent } from '../suggestion-popup-container/suggestion-popup-container.component';

export const behaviourPopupImports = [
  CommonModule,
  SuggestionPopupContainerComponent,
  CheckboxModule,
  FormsModule,
  SpinnerComponent,
  InfiniteScrollModule,
  AccordionModule,
];
