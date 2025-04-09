import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AiTemplate,
  AiTemplateDetails,
  CreateAiMediaApi,
} from '@flyerz/shared/api';
import { Observable, finalize, tap } from 'rxjs';
import {
  CreateAdHeaderComponent,
  SpinnerComponent,
  WalletValueBannerComponent,
} from '@flyerz/shared/components';
import { TranslateModule } from '@ngx-translate/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'convertedin-studio-payment',
  standalone: true,
  imports: [
    CommonModule,
    SpinnerComponent,
    CreateAdHeaderComponent,
    WalletValueBannerComponent,
    TranslateModule,
    LottieComponent,
  ],
  templateUrl: './studio-payment.component.html',
  styleUrls: ['./studio-payment.component.scss'],
})
export class StudioPaymentComponent implements OnInit {
  //#region Declerations
  @Input({ required: true }) mode: 'image' | 'video' = 'image';
  @Input({ required: true }) template!: AiTemplate;
  @Input({ required: true }) previewImage!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) subtitle!: string;
  @Output() isPaymentValid: EventEmitter<void> = new EventEmitter();
  @HostBinding('class') class =
    'flex flex-grow-1 flex-column justify-content-center gap-4 py-6 align-items-center create-ad__step max-h-full';

  get dir() {
    return document.documentElement.dir;
  }

  templateDetails$!: Observable<{ data: AiTemplateDetails }>;
  isLoading: boolean = true;
  options: AnimationOptions = {
    path: '/assets/lottie/gift.json',
  };
  walletValue: number = 0;
  //#endregion

  constructor(private __createAiMedia: CreateAiMediaApi) {}

  ngOnInit(): void {
    this.getTemplateDetails();
  }

  //#region Methods
  checkCanCreate(details: AiTemplateDetails): void {
    const canCreate =
      this.walletValue >= details.cost.amount ||
      details.availableFreeTrails !== 0;

    canCreate && this.isPaymentValid.emit();
  }

  getTemplateDetails(): void {
    this.templateDetails$ = this.__createAiMedia
      .getImageTemplate(this.template.id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        tap(({ data }) => {
          this.checkCanCreate(data);
        })
      );
  }
  //#endregion
}
