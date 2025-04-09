import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AiDataSectionComponent } from '../ai-data-section/ai-data-section.component';
import {
  CreateAdHeaderComponent,
  SpinnerComponent,
} from '@flyerz/shared/components';
import { AdSelectionHistoryComponent } from '../ad-selection-history/ad-selection-history.component';
import { AdTargetingSelectionComponent } from '../ad-targeting-selection/ad-targeting-selection.component';
import { AdSidebarComponent } from '../ad-sidebar/ad-sidebar.component';

export const adTargetImports = [
  CommonModule,
  CreateAdHeaderComponent,
  TranslateModule,
  AiDataSectionComponent,
  SpinnerComponent,
  AdSelectionHistoryComponent,
  AdTargetingSelectionComponent,
  AdSidebarComponent,
];
