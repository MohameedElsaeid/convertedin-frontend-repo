import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { targetingImports } from './imports';
import {
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { CampaignActions, campaignFeature } from '@pinads/store/campaign';
import {
  CampaignApi,
  ProximityLocation,
  SuggestionPayload,
} from '@pinads/shared/api/campaign';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { ChipsInputDirective } from '../../directives';

@Component({
  selector: 'convertedin-targeting',
  templateUrl: './targeting.component.html',
  styleUrls: ['./targeting.component.scss'],
  standalone: true,
  imports: targetingImports,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TargetingComponent implements OnInit, OnDestroy {
  @ViewChild(ChipsInputDirective) chipsInput!: ChipsInputDirective;
  @Output() onchangeState = new EventEmitter<boolean>();
  languages = [
    {
      key: 'en',
      label: this.translate.instant('languages.en'),
    },
    {
      key: 'ar',
      label: this.translate.instant('languages.ar'),
    },
  ];

  formGroup = new FormGroup({
    keywords: new FormControl<string[]>(
      [],
      RxwebValidators.minLength({ value: 1 })
    ),
    lang_code: new FormControl<string>(
      '',
      RxwebValidators.required({
        message: this.translate.instant('validations.language.required'),
      })
    ),
    proximity: new FormControl<ProximityLocation | null>(
      null,
      RxwebValidators.required()
    ),
    campaign_name: new FormControl<string>(
      '',
      RxwebValidators.required({
        message: this.translate.instant('validations.campaign_name.required'),
      })
    ),
  });

  isLoadingKeyword$ = new BehaviorSubject(false);

  suggestionsKeywords$ = this.store
    .select(campaignFeature.selectCampaignState)
    .pipe(
      take(1),
      filter((val) => {
        const formValue = this.formGroup.value;
        if (formValue.lang_code && formValue.proximity) return true;
        this.formGroup.controls.lang_code.markAsTouched();
        if (!formValue.proximity) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: this.translate.instant('validations.map.required'),
          });
        }
        return false;
      }),
      switchMap((campaign) => {
        const formValue = this.formGroup.value;
        const keywordPayload: SuggestionPayload = {
          proximity: formValue.proximity!,
          lang_code: formValue.lang_code!,
          locations: campaign.locations!.map((item) => item.id),
          profile_location_id: campaign.locations[0].id,
        };
        if (campaign.brandInfo.website_url)
          keywordPayload.website_url = campaign.brandInfo.website_url;
        if (campaign.brandInfo.phone_number)
          keywordPayload.phone_number = campaign.brandInfo.phone_number;
        return this.campaignApi.getSuggestionsKeywords(
          campaign.brand!.id,
          keywordPayload
        );
      }),
      map((res) => res.data.keywords)
    );

    pinadsSuggestions$=
    this.store
    .select(campaignFeature.selectCampaignState)
    .pipe(
      take(1),
      filter((val) => {
        const formValue = this.formGroup.value;
        if (formValue.lang_code && formValue.proximity) return true;
        this.formGroup.controls.lang_code.markAsTouched();
        if (!formValue.proximity) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: this.translate.instant('validations.map.required'),
          });
        }
        return false;
      }),
      switchMap((campaign) => {
        const formValue = this.formGroup.value;
        const keywordPayload: SuggestionPayload = {
          proximity: formValue.proximity!,
          lang_code: formValue.lang_code!,
          locations: campaign.locations!.map((item) => item.id),
          profile_location_id: campaign.locations[0].id,
        };
        if (campaign.brandInfo.website_url)
          keywordPayload.website_url = campaign.brandInfo.website_url;
        if (campaign.brandInfo.phone_number)
          keywordPayload.phone_number = campaign.brandInfo.phone_number;
        return this.campaignApi.getPinadsSuggestions(
          campaign.brand!.id,
          keywordPayload
        );
      }),
      map((res) => res.data.keywords)
    );

  get keywordsValue() {
    return this.formGroup.controls.keywords.value;
  }

  constructor(
    private store: Store,
    private campaignApi: CampaignApi,
    private destroyRef: DestroyRef,
    private messageService: MessageService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getInitialState();
    this.subscribeFormState();
  }
  subscribeFormState() {
    this.formGroup.statusChanges
      .pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((status) => {
        if (status === 'VALID') this.onchangeState.emit(true);
        else this.onchangeState.emit(false);
      });
  }
  getInitialState() {
    this.store
      .select(campaignFeature.selectCampaignState)
      .pipe(take(1))
      .subscribe((val) => {
        this.formGroup.patchValue({
          lang_code: val.lang_code,
          keywords: val.keywords,
          proximity: val.proximity,
          campaign_name:
            'Smart Campaign - ' +
            val.locations[0]!.title +
            ' - ' +
            new Date(Date.now()).toLocaleString(),
        });
      });
  }
  onClickAddKeyword() {
    this.chipsInput.emitValue();
  }
  onAddKeyword(e: string) {
    this.formGroup.patchValue({ keywords: [...this.keywordsValue!, e] });
  }
  removeKeyword(index: number) {
    const keywords = this.keywordsValue?.filter(
      (_, _index) => index !== _index
    );
    this.formGroup.patchValue({ keywords });
  }

  selectSuggestionsKeyword(keywords: string[]) {
    const previousKeywords = this.formGroup.value.keywords ?? [];
    this.formGroup.patchValue({ keywords: [...previousKeywords, ...keywords] });
  }

  ngOnDestroy(): void {
    const value = this.formGroup.value;
    this.store.dispatch(
      CampaignActions.setTargetForm({
        lang_code: value.lang_code!,
        keywords: value.keywords!,
        proximity: value.proximity!,
        campaign_name: value.campaign_name!,
      })
    );
  }
}
