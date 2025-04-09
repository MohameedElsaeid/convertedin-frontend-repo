import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ControlErrorsModule } from '@convertedin/ui';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';


@Component({
  selector: 'convertedin-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterLink, InputTextModule, ControlErrorsModule, ReactiveFormsModule,PasswordModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', RxwebValidators.compose({
      validators: [
        RxwebValidators.required({ message: 'Email is required' }),
        RxwebValidators.email({ message: 'Enter a valid email address' })
      ]
    })),
  });
}
