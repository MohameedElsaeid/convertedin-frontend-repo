import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import { phoneNumberInputImports } from './imports';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Country } from '../country-dropdown';
import * as libphonenumber from 'google-libphonenumber';
import { PhoneNumberSperate } from './models/phone-number-seperate.interface';

@Component({
  selector: 'convertedin-phone-number-input',
  templateUrl: './phone-number-input.component.html',
  styleUrls: ['./phone-number-input.component.scss'],
  standalone: true,
  imports: phoneNumberInputImports,
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneNumberInputComponent),
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PhoneNumberInputComponent),
      multi: true,
    },
  ],
})
export class PhoneNumberInputComponent implements ControlValueAccessor {
  //#region Declerations
  @Input() valueFormat: 'concat' | 'separate' = 'concat';
  @Input() countryIso!: boolean;

  @Input() wrongFormatMessage: string = 'Wrong phone number format';
  @Input() perferredCountry: string = 'EG';
  @Input() lang = 'en';
  @Input() perferredCountryISO!: number;
  @Input() emptyFilterMessage!: string;
  @Input() disableCountryDropdown: boolean = false;
  @Input() disabled: boolean = false;
  @Output() countryChanged: EventEmitter<string> = new EventEmitter();
  @HostBinding('class') class = 'flex convertedin-phone';
  @HostListener('click') onClick() {
    this.onTouched();
  }
  @HostBinding('class.convertedin-phone__invalid') get hasError() {
    return this.showError;
  }

  onChange!: Function;
  onTouched!: Function;

  activeCountry!: Country;
  phoneUtil: libphonenumber.PhoneNumberUtil =
    libphonenumber.PhoneNumberUtil.getInstance();
  phonenumber: string = '';
  showError: boolean = false;
  firstChange = true;
  //#endregion

  //#region Methods
  countryChange(country: Country): void {
    this.activeCountry = country;
    this.countryChanged.emit(country.countryISO);
    this.inputChange();
  }

  inputChange(): void {
    if (this.firstChange) {
      this.firstChange = false;
      return;
    }
    this.onChange(this.submitValue());
  }

  submitValue(): PhoneNumberSperate | string | null {
    return this.valueFormat === 'concat'
      ? this.getConcatValue()
      : this.getSeperateValue();
  }

  getConcatValue(): string | null {
    return this.phonenumber?.length > 3
      ? this.phoneUtil.format(
          this.phoneUtil.parse(this.phonenumber, this.activeCountry.countryISO),
          libphonenumber.PhoneNumberFormat.E164
        )
      : this.phonenumber || null;
  }

  getSeperateValue(): PhoneNumberSperate | null {
    return this.phonenumber?.length > 3
      ? this.createSeperatePhoneNumber(
          this.phoneUtil
            .format(
              this.phoneUtil.parse(
                this.phonenumber,
                this.activeCountry.countryISO
              ),
              libphonenumber.PhoneNumberFormat.NATIONAL
            )
            .replace(/ /g, ''),
          this.countryIso
            ? this.activeCountry.countryISO
            : this.activeCountry.countryCode
        )
      : this.phonenumber
      ? this.createSeperatePhoneNumber(
          this.phonenumber,
          this.countryIso
            ? this.activeCountry.countryISO
            : this.activeCountry.countryCode
        )
      : null;
  }

  createSeperatePhoneNumber(
    number: string,
    countryCode: string
  ): PhoneNumberSperate {
    return {
      countryCode,
      number,
    };
  }

  /* Control value accessor methods */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {}

  writeValue(obj: any): void {
    if (this.valueFormat === 'separate' && obj && obj?.number) {
      this.phonenumber = obj?.number;
      this.perferredCountryISO = +obj?.countryCode;
    }

    if (this.valueFormat === 'concat' && typeof obj === 'string' && obj) {
      const parsedNumber = this.phoneUtil.parseAndKeepRawInput(obj);
      if (parsedNumber.hasCountryCode()) {
        const countryCode = parsedNumber.getCountryCode()!;
        this.perferredCountry =
          this.phoneUtil.getRegionCodeForCountryCode(countryCode);
      }
      this.phonenumber = parsedNumber.getNationalNumber()?.toString() ?? '';
    }
  }

  validate(control: FormControl): { invalid: { message: string } } | null {
    try {
      const isValid = this.phoneUtil.isValidNumberForRegion(
        this.phoneUtil.parse(
          this.phonenumber,
          this.activeCountry?.countryISO || this.perferredCountry
        ),
        this.activeCountry?.countryISO || this.perferredCountry
      );
      this.showError = !isValid && control.touched;

      return !isValid && control.touched && !!this.phonenumber
        ? {
            invalid: {
              message: this.wrongFormatMessage,
            },
          }
        : null;
    } catch {
      this.showError = control.touched && !!this.phonenumber;
      return control.touched && !!this.phonenumber
        ? {
            invalid: {
              message: this.wrongFormatMessage,
            },
          }
        : null;
    }
  }
  //#endregion
}
