import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import {
  ControlErrorsModule,
  PhoneNumberInputComponent,
} from '@convertedin/ui';
import { debounceTime } from 'rxjs';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Store } from '@ngrx/store';
import { RechargeActions } from '@converted-pay/store/recharge';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-vodafon-payment-step',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PhoneNumberInputComponent,
    ControlErrorsModule,
    TranslateModule,
  ],
  templateUrl: './vodafon-payment-step.component.html',
  styleUrls: ['./vodafon-payment-step.component.scss'],
})
export class VodafonPaymentStepComponent implements OnInit {
  vodafonForm = new FormGroup({
    phone_number: new FormControl(null, [
      RxwebValidators.required({
        message: this.translate.instant('validations.mobileNumber.required'),
      }),
      this.vodafonValidator(),
    ]),
  });

  constructor(private __store: Store, private translate: TranslateService) {}

  ngOnInit(): void {
    this.vodafonForm.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      console.log(value, this.vodafonForm.valid);
      if (this.vodafonForm.valid) {
        this.__store.dispatch(
          RechargeActions.setRechargeMobileNumber({
            phone: (value.phone_number as any).number,
          })
        );
      } else {
        this.__store.dispatch(
          RechargeActions.setRechargeMobileNumber({
            phone: undefined,
          })
        );
      }
    });
  }

  countryChange(countryIso: string): void {
    this.__store.dispatch(
      RechargeActions.setRechargeMobileCountryCode({ countryCode: countryIso })
    );
  }
  vodafonValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const regex = /^01[0-2,5]\d{8}$/;

      const valid = regex.test(value?.number);
      return valid
        ? null
        : {
            vodafonRequired: {
              message: this.translate.instant(
                'validations.mobileNumber.vodafon'
              ),
            },
          };
    };
  }
}
