import { Component, HostBinding, OnInit, Type } from '@angular/core';
import { Genders, LocationItem, MatchAdSuggestions } from '@flyerz/shared/api';
import {
  CreateAdActions,
  CreateAdState,
  selectAllCreateAd,
  selectLocations,
} from '@flyerz/store/create-ad';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  AdGoalPopupComponent,
  CitiesPopupComponent,
  GendersPopupComponent,
} from '../popups';
import { TranslateService } from '@ngx-translate/core';
import { PeriodBudgetPopupComponent } from '@flyerz/shared/components';
import { adDataImports } from './imports';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'convertedin-ad-data',
  templateUrl: './ad-data.component.html',
  styleUrls: ['./ad-data.component.scss'],
  standalone: true,
  imports: adDataImports,
})
export class AdDataComponent implements OnInit {
  //#region Declerations
  @HostBinding('class') class =
    'flex flex-grow-1 flex-column justify-content-center gap-6 align-items-center create-ad__step create-ad__ad-data';
  adData$!: Observable<CreateAdState>;
  locations$!: Observable<{ locations: LocationItem[] }>;

  protected readonly _popups = {
    goal: (title: string) => {
      import('../popups/ad-goal-popup/ad-goal-popup.component').then(
        (component) => this.openPopup(component.AdGoalPopupComponent, title)
      );
    },

    period: (title: string) => {
      import(
        '@flyerz/shared/components/period-budget-popup/period-budget-popup.component'
      ).then((component) =>
        this.openPopup(component.PeriodBudgetPopupComponent, title)
      );
    },

    genders: (title: string) => {
      import('../popups/genders-popup/genders-popup.component').then(
        (component) => this.openPopup(component.GendersPopupComponent, title)
      );
    },

    cities: (title: string) => {
      import('../popups/cities-popup/cities-popup.component').then(
        (component) => this.openPopup(component.CitiesPopupComponent, title)
      );
    },
  };
  //#endregion

  constructor(
    private __store: Store,
    private __translate: TranslateService,
    private __popup: DialogService
  ) {}

  ngOnInit(): void {
    this.adData$ = this.__store.select(selectAllCreateAd);
    this.locations$ = this.__store.select(selectLocations);
  }

  //#region Methods
  getAudiance(ad: CreateAdState): Array<string> {
    return [
      `${this.getGender(ad.adSuggestions?.gender as string)}`,

      `${ad.aiSuggestions?.minimumAge || 18} ${this.__translate.instant(
        'create-ad.audiance-popup.year'
      )} - ${ad.aiSuggestions?.maximumAge || 65} ${this.__translate.instant(
        'create-ad.audiance-popup.year'
      )}`,
    ];
  }

  openPopup(component: Type<any>, title: string): void {
    this.__popup.open(component, {
      header: title,
      dismissableMask: false,
      styleClass: 'create-ad__suggestion-popup',
    });
  }

  getDuration(ad: MatchAdSuggestions): Array<string> {
    return [
      this.__translate.instant('create-ad.ad-duration') +
        ` ${ad.days} ` +
        this.__translate.instant('common.days'),
      this.__translate.instant('create-ad.ad-budget') +
        ` ${ad.minimumBudget.amount} ${ad.minimumBudget.currency.name}`,
    ];
  }

  removeLocation(item: number, adData: CreateAdState): void {
    const location = adData.adSuggestions?.areas.find(
      (area) => area.id === item
    );

    this.__store.dispatch(
      location
        ? CreateAdActions.deleteAdArea({ areaId: item })
        : CreateAdActions.deleteAdCity({ cityId: item })
    );
  }

  getGender(gender: string): string {
    let genderTranslate = '';
    switch (gender) {
      case Genders.MALE:
        genderTranslate = this.__translate.instant(
          'create-ad.audiance-popup.male'
        );
        break;

      case Genders.FEMALE:
        genderTranslate = this.__translate.instant(
          'create-ad.audiance-popup.female'
        );
        break;

      default:
        genderTranslate = this.__translate.instant(
          'create-ad.audiance-popup.both'
        );
        break;
    }

    return genderTranslate;
  }
  //#endregion
}
