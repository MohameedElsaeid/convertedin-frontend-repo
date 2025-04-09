import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AdSelectionHistoryComponent } from '../ad-selection-history/ad-selection-history.component';
import { AiDataSectionComponent } from '../ai-data-section/ai-data-section.component';
import { CreateAdHeaderComponent } from '@flyerz/shared/components';
import { AdSidebarComponent } from '../ad-sidebar/ad-sidebar.component';

export const adDataImports = [
  CommonModule,
  TranslateModule,
  AdSelectionHistoryComponent,
  AiDataSectionComponent,
  CreateAdHeaderComponent,
  AdSidebarComponent,
];
