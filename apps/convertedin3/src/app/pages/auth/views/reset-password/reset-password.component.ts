import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ControlErrorsModule } from '@convertedin/ui';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'convertedin-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ControlErrorsModule, PasswordModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {

  resetPasswordForm = new FormGroup({
    newPassword: new FormControl('', RxwebValidators.compose({
      validators: [
        RxwebValidators.required({ message: 'New password is required' })
      ]
    })),
    confirmPassword: new FormControl('', RxwebValidators.compose({
      validators: [
        RxwebValidators.required({ message: 'Confirm password is required' }),
        RxwebValidators.compare({ fieldName: 'newPassword', message: 'Passwords do not match' })
      ]
    })),
  });
}
