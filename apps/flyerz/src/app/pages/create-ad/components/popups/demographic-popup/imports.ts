import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '@flyerz/shared/components';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CheckboxModule } from 'primeng/checkbox';
import { SuggestionPopupContainerComponent } from '../suggestion-popup-container/suggestion-popup-container.component';
import { AccordionModule } from 'primeng/accordion';

export const demographicPopupImports = [
  CommonModule,
  SuggestionPopupContainerComponent,
  CheckboxModule,
  FormsModule,
  SpinnerComponent,
  InfiniteScrollModule,
  AccordionModule,
];
