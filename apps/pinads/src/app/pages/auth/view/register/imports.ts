import { PhoneNumberInputComponent, ControlErrorsModule } from '@convertedin/ui';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from 'primeng/password'
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';

export const registerImports = [
  CommonModule,
  ReactiveFormsModule,
  InputTextModule,
  PhoneNumberInputComponent,
  RxReactiveFormsModule,
  ControlErrorsModule,
  PasswordModule,
  RouterLink,
  TranslateModule,
  DropdownModule
]
