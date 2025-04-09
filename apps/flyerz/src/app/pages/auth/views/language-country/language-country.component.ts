import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { TranslateService } from '@ngx-translate/core';
import { languageCountryImports } from './imports';
import { Router } from '@angular/router';
import { Observable, finalize, tap } from 'rxjs';
import {
  ApplicationCountries,
  ApplicationCountry,
  AuthApi,
} from '@flyerz/shared/api';
import { LocalStorageConstants } from '@flyerz/shared/constants';
import { Store } from '@ngrx/store';
import { AppActions } from '@flyerz/store/app';

@Component({
  selector: 'convertedin-language-country',
  standalone: true,
  imports: languageCountryImports,
  templateUrl: './language-country.component.html',
  styleUrls: ['./language-country.component.scss'],
})
export class LanguageCountryComponent implements OnInit {
  //#region Declerations
  languages: Array<{ name: string; value: string }> = [
    {
      name: 'العربية',
      value: 'ar',
    },
    {
      name: 'English',
      value: 'en',
    },
    {
      name: 'Portuguese',
      value: 'pt',
    },
  ];

  form: FormGroup = this.__formBuilder.group({
    country: [
      null,
      [
        RxwebValidators.required({
          message: this.__translate.instant('common-form-validations.required'),
        }),
      ],
    ],
    language: [
      this.__translate.currentLang,
      [
        RxwebValidators.required({
          message: this.__translate.instant('common-form-validations.required'),
        }),
      ],
    ],
  });

  countries$!: Observable<ApplicationCountries>;
  selectedCountry!: ApplicationCountry;
  isLoading: boolean = true;
  //#endregion

  constructor(
    private __formBuilder: FormBuilder,
    private __translate: TranslateService,
    private __router: Router,
    private __authService: AuthApi,
    private __store: Store
  ) {}

  ngOnInit(): void {
    this.guard();
    this.getCountries();
  }

  //#region Methods
  submitForm(): void {
    if (this.form.valid) {
      this.saveFormData();
      this.__router.navigate(['/auth/login']);
      window.location.reload();
    } else {
      this.form.markAllAsTouched();
    }
  }

  getCountries(): void {
    this.countries$ = this.__authService.getCountries().pipe(
      finalize(() => {
        this.isLoading = false;
      }),
      tap((data) => {
        this.getSelectedCountry(
          data.data.defaultCountry.key || 'SA',
          data.data.countries,
          'key'
        );

        this.form.controls['country'].setValue(this.selectedCountry.id);
      })
    );
  }

  guard(): void {
    if (localStorage.getItem(LocalStorageConstants.COUNTRY_ID)) {
      this.__router.navigate(['/auth']);
    }
  }

  saveFormData(): void {
    this.updateLanguage(this.form.value.language);
    this.setLocalStorage();
    this.__store.dispatch(
      AppActions.setCountryID({ countryId: this.form.value.country })
    );
  }

  changeSelectedCountry(event: any, items: Array<ApplicationCountry>): void {
    this.getSelectedCountry(event.value, items, 'id');
  }

  getSelectedCountry(
    key: string | number,
    items: Array<ApplicationCountry>,
    identifier: 'key' | 'id'
  ): void {
    this.selectedCountry = items.find(
      (country) => country[identifier] === key
    )!;
  }

  updateLanguage(newLang: string): void {
    this.__translate.setDefaultLang(newLang);
    this.__translate.currentLang = newLang;
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  }

  setLocalStorage(): void {
    localStorage.setItem(
      LocalStorageConstants.LANGUAGE,
      this.form.value.language
    );
    localStorage.setItem(
      LocalStorageConstants.COUNTRY_ID,
      this.form.value.country
    );
    localStorage.setItem(
      LocalStorageConstants.COUNTRY_ISO,
      this.selectedCountry.key
    );
  }
  //#endregion
}
