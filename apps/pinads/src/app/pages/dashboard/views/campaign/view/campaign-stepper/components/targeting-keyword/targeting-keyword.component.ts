import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { CampaignActions, campaignFeature } from '@pinads/store/campaign';
import {
  BehaviorSubject,
  Observable,
  finalize,
  map,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import {
  KeywordPlaner,
  KeywordPlanerApi,
  keywordPlanerCountry,
  provideKeywordPlanerService,
} from '@pinads/shared/api/keyword-planer';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-targeting-keyword',
  standalone: true,
  imports: [NgFor, AsyncPipe, ProgressSpinnerModule, NgIf, TranslateModule],
  templateUrl: './targeting-keyword.component.html',
  styleUrls: ['./targeting-keyword.component.scss'],
  providers: [provideKeywordPlanerService()],
})
export class TargetingKeywordComponent implements OnInit {
  keywords$!: Observable<KeywordPlaner[]>;
  isLoading$ = new BehaviorSubject(false);

  constructor(
    private store: Store,
    private keywordPlanerApi: KeywordPlanerApi,
    private cdr:ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getInitialState();
  }
  getInitialState() {
    this.isLoading$.next(true);
    this.keywords$ = this.store
      .select(campaignFeature.selectCampaignState)
      .pipe(
        take(1),
        switchMap((val) => {
          if (val.isKeywordChanged)
            return this.keywordPlanerApi
              .getKeywordPlaner({
                country: keywordPlanerCountry.KSA,
                keywords: val.keywords.slice(0, 20),
                language: val.lang_code!,
                next_page_token: null,
                is_provided: true,
                page_size: 20,
              })
              .pipe(
                map((res) =>
                  res.data.keywords
                    .filter((keyword) => keyword.is_provided)
                    .map((keyword) => this.mapKeywordsToAddVolume(keyword))
                ),
                tap((keywordPlanner) => {
                  this.store.dispatch(
                    CampaignActions.setKeywordPlanner({
                      keywordPlaner: keywordPlanner,
                    })
                  );
                })
              );
          return of(val.keywordPlaner).pipe(take(1));
        }),

        finalize(() => {
          this.isLoading$.next(false);
          this.cdr.detectChanges();
        })
      );
  }
  mapKeywordsToAddVolume(keyword: KeywordPlaner) {
    const avg_monthly_searches = keyword.avg_monthly_searches;
    if ((avg_monthly_searches as any) === '-') {
      return { ...keyword, volume: 'assets/images/keyword/low-volume.png' };
    }

    if (avg_monthly_searches >= 0 && avg_monthly_searches < 1000) {
      return { ...keyword, volume: 'assets/images/keyword/low-volume.png' };
    }
    if (avg_monthly_searches >= 1000 && avg_monthly_searches < 5000) {
      return { ...keyword, volume: 'assets/images/keyword/mid-volume.png' };
    }
    return { ...keyword, volume: 'assets/images/keyword/strong-volume.png' };
  }
}
