import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import {
  ControlErrorsModule,
  PhoneNumberInputComponent,
} from '@convertedin/ui';
import { RechargeActions } from '@converted-pay/store/recharge';
import { Store } from '@ngrx/store';
import { debounceTime } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-fawry-payment-step',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PhoneNumberInputComponent,
    ControlErrorsModule,
    TranslateModule,
  ],
  templateUrl: './fawry-payment-step.component.html',
  styleUrls: ['./fawry-payment-step.component.scss'],
})
export class FawryPaymentStepComponent {
  fawryForm = new FormGroup({
    phone_number: new FormControl(null, [
      RxwebValidators.required({
        message: this.translate.instant('validations.mobileNumber.required'),
      }),
    ]),
  });
  constructor(private __store: Store, private translate: TranslateService) {}

  ngOnInit(): void {
    this.fawryForm.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      console.log(value, this.fawryForm.valid);
      if (this.fawryForm.valid) {
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
}
