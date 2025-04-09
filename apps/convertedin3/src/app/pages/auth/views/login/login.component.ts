import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ControlErrorsModule } from '@convertedin/ui';



@Component({
  selector: 'convertedin-login',
  standalone: true,
  imports: [CommonModule,InputTextModule,PasswordModule,ReactiveFormsModule,RouterLink,ControlErrorsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', RxwebValidators.compose({
      validators: [
        RxwebValidators.required({ message: 'Email is required' }),
        RxwebValidators.email({ message: 'Enter a valid email address' })
      ]
    })),  
    password: new FormControl('', RxwebValidators.required({ message: 'Password is required' })),
  });
}
