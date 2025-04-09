import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { TranslateModule } from '@ngx-translate/core';
import {
  AbstractControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { ControlErrorsModule } from '@convertedin/ui';
import {
  BlockCopyDirective,
  BlockCutDirective,
  BlockPasteDirective,
} from '@flyerz/shared/directives';

@Component({
  selector: 'convertedin-password-confirm-password',
  standalone: true,
  imports: [
    CommonModule,
    PasswordModule,
    TranslateModule,
    ReactiveFormsModule,
    ControlErrorsModule,
    BlockCopyDirective,
    BlockCutDirective,
    BlockPasteDirective,
  ],
  templateUrl: './password-confirm-password.component.html',
  styleUrls: ['./password-confirm-password.component.scss'],
})
export class PasswordConfirmPasswordComponent implements OnInit {
  //#region Declerations
  @Input({ required: true }) passwordControlName!: string;
  @Input({ required: true }) confirmPasswordControlName!: string;
  @HostBinding('class') class = 'flex flex-column gap-5';
  form!: FormGroup;
  //#endregion

  constructor(private __formDir: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.__formDir.control;
  }

  //#region Methods
  getControl(controlName: string): AbstractControl<any, any> | null {
    return this.form.get(controlName);
  }

  getLengthValidationColor(controlName: string): string {
    const control = this.getControl(controlName);
    let status = '';
    if (control!.value || control?.touched) {
      status = control!.value?.length >= 8 ? 'valid' : 'invalid';
    }

    return status;
  }

  getPatternValidationColor(controlName: string): string {
    const control = this.getControl(controlName);
    const regex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W]*$/;
    let status = '';
    if (control!.value || control?.touched) {
      status = regex.test(control?.value) ? 'valid' : 'invalid';
    }

    return status;
  }
  //#endregion
}
