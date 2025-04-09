import { NgIf, AsyncPipe, NgClass, NgFor } from '@angular/common';
import { SpinnerComponent } from '@flyerz/shared/components';
import { StudioServiceHeaderComponent } from '../../shared/components';
import { StudioImageCardComponent } from './components/studio-image-card/studio-image-card.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LottieComponent } from 'ngx-lottie';

export const studioImageServiceImports = [
  NgIf,
  AsyncPipe,
  SpinnerComponent,
  NgClass,
  NgFor,
  StudioServiceHeaderComponent,
  StudioImageCardComponent,
  InfiniteScrollModule,
  LottieComponent,
];
