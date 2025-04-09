import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { AdDetails, Genders, Suggestion } from '@flyerz/shared/api';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-ad-details-data',
  standalone: true,
  imports: [TranslateModule, DatePipe],
  templateUrl: './ad-details-data.component.html',
  styleUrls: ['./ad-details-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdDetailsDataComponent {
  @HostBinding('class') class = 'flex flex-column gap-4';
  @Input({ required: true }) adData!: AdDetails;

  constructor(private __translate: TranslateService) {}

  //#region Methods
  getSuggestionText(suggestions: Array<Suggestion>): string {
    return suggestions.reduce((suggestionString, item, index) => {
      return suggestionString + (index !== 0 ? ',' : '') + `${item.name} `;
    }, '');
  }

  getLocations(): string {
    return this.getSuggestionText([
      { ...this.adData.targeting.country },
      ...this.adData.targeting.cities,
      ...this.adData.targeting.areas,
    ]);
  }

  getAudiance(): string {
    return `${this.getGender(this.adData.targeting.gender)}, ${
      this.adData.targeting.minAge
    } ${this.__translate.instant('create-ad.audiance-popup.year')} - ${
      this.adData.targeting.maxAge
    } ${this.__translate.instant('create-ad.audiance-popup.year')}`;
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
