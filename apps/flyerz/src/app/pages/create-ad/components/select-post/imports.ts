import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TranslateModule } from '@ngx-translate/core';
import {
  CreateAdHeaderComponent,
  SpinnerComponent,
} from '@flyerz/shared/components';

export const selectPostImports = [
  CommonModule,
  InfiniteScrollModule,
  CreateAdHeaderComponent,
  TranslateModule,
  SpinnerComponent,
];
