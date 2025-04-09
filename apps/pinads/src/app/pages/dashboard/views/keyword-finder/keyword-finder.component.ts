import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ControlErrorsModule } from '@convertedin/ui';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { KnobModule } from 'primeng/knob';
import {
  BehaviorSubject,
  Observable,
  finalize,
  map,
  of,
  startWith,
} from 'rxjs';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import {
  KeywordPlaner,
  KeywordPlanerApi,
  KeywordPlanerPayload,
  keywordPlanerCountry,
  provideKeywordPlanerService,
} from '@pinads/shared/api/keyword-planer';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
@Component({
  selector: 'convertedin-keyword-finder',
  standalone: true,
  imports: [
    TranslateModule,
    InputTextModule,
    ControlErrorsModule,
    ReactiveFormsModule,
    DropdownModule,
    KnobModule,
    AsyncPipe,
    NgIf,
    TableModule,
    PaginatorModule,
    NgClass
  ],
  templateUrl: './keyword-finder.component.html',
  styleUrls: ['./keyword-finder.component.scss'],
  host: {
    class: 'flex flex-column p-4 h-full',
  },
  providers: [provideKeywordPlanerService()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeywordFinderComponent {
  searchForm = new FormGroup({
    keyword: new FormControl(
      '',
      RxwebValidators.required({
        message: this.translate.instant('validations.keyword.required'),
      })
    ),
    country: new FormControl(
      'geoTargetConstants/2682',
      RxwebValidators.required({
        message: this.translate.instant('validations.country.required'),
      })
    ),
    language: new FormControl(
      '',
      RxwebValidators.required({
        message: this.translate.instant('validations.language.required'),
      })
    ),
  });
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
  value = 20;
  CountryList = [
    {
      label: this.translate.instant('keywordFinder.KSA'),
      key: keywordPlanerCountry.KSA,
    },
  ];
  keywordData$: Observable<KeywordPlaner[]> = of([]);
  loading$ = new BehaviorSubject(false);

  constructor(
    private translate: TranslateService,
    private keywordPlanerApi: KeywordPlanerApi
  ) {}

  submit() {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }
    const { country, language, keyword } = this.searchForm.value;
    this.loading$.next(true);
    this.keywordData$ = this.keywordPlanerApi
      .getKeywordPlaner({
        country,
        language,
        keywords: [keyword],
      } as KeywordPlanerPayload)
      .pipe(
        finalize(() => {
          this.loading$.next(false);
        }),
        map((res) =>
          res.data.keywords.map((keyword) => ({
            ...keyword,
            three_month_change_is_positive: !keyword.three_month_change.includes('-'),
          }))
        ),
        startWith([])
      );
  }
}
