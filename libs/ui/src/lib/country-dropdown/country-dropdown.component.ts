import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import * as libphonenumber from 'google-libphonenumber';
import { countryDropdownImports } from './imports';
import { countries, countriesAr } from './data';
import { Country } from './country.interface';

@Component({
  selector: 'convertedin-country-dropdown',
  standalone: true,
  imports: countryDropdownImports,
  templateUrl: './country-dropdown.component.html',
  styleUrls: ['./country-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryDropdownComponent implements OnInit, OnChanges {
  //#region Declerations
  @Input() styleClass!: string;
  @Input() showSelectedCountryName: boolean = true;
  @Input() perferredCountry: string = 'EG';
  @Input() perferredCountryISO!: number;
  @Input() lang = 'en';
  @Input() emptyFilterMessage!: string;
  @Input() disabled: boolean = false;
  @Output() selectedCountryChange: EventEmitter<Country> = new EventEmitter();

  countries: Array<Country> = [];
  activeCountry!: Country;
  phoneUtil: libphonenumber.PhoneNumberUtil =
    libphonenumber.PhoneNumberUtil.getInstance();
  //#endregion

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['perferredCountry']) {
      this.activeCountry = this.createCountry(this.perferredCountry);
    }
    if (changes['perferredCountryISO']) {
      this.activeCountry = this.createCountryFromCode(this.perferredCountryISO);
    }
  }
  ngOnInit(): void {
    this.createCountries();

    this.activeCountry = this.createCountry(this.perferredCountry);
    if (this.perferredCountryISO) {
      this.activeCountry = this.createCountryFromCode(this.perferredCountryISO);
    }
    this.activeCountryChange();
  }

  //#region Methods
  activeCountryChange(): void {
    this.selectedCountryChange.emit(this.activeCountry);
  }

  createCountries(): void {
    this.phoneUtil.getSupportedRegions().forEach((countryISO: string) => {
      this.countries.push(this.createCountry(countryISO));
    });
  }

  createCountry(countryISO: string): Country {
    const name =
      this.lang === 'en' ? countries[countryISO] : countriesAr[countryISO];
    return {
      countryCode: `+${this.phoneUtil.getCountryCodeForRegion(countryISO)}`,
      countryISO,
      name: name,
      format: `${this.phoneUtil
        .getExampleNumberForType(
          countryISO,
          libphonenumber.PhoneNumberType.MOBILE
        )
        ?.getNationalNumber()}`,
    };
  }
  createCountryFromCode(countryCode: number): Country {
    const iso = this.phoneUtil.getRegionCodeForCountryCode(countryCode);
    const name = this.lang === 'en' ? countries[iso] : countriesAr[iso];
    return {
      countryCode: `+${countryCode}`,
      countryISO: iso,
      name: name,
      format: `${this.phoneUtil
        .getExampleNumberForType(iso, libphonenumber.PhoneNumberType.MOBILE)
        ?.getNationalNumber()}`,
    };
  }
  //#endregion
}
