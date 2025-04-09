import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ControlErrorsModule } from '@convertedin/ui';

@Component({
  selector: 'convertedin-register',
  standalone: true,
  imports: [CommonModule,InputTextModule,PasswordModule,ReactiveFormsModule,RouterLink,ControlErrorsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl('', RxwebValidators.required({ message: 'First Name is required' })),
    email: new FormControl('', RxwebValidators.compose({
      validators: [
        RxwebValidators.required({ message: 'Email is required' }),
        RxwebValidators.email({ message: 'Enter a valid email address' })
      ]
    })),
    website: new FormControl('', RxwebValidators.required({ message: 'Website is required' })),
    password: new FormControl('', RxwebValidators.required({ message: 'Password is required' })),
    confirm_password: new FormControl('', RxwebValidators.compare({fieldName:'password', message: 'Password confirmation does not match' })),
  });

  benefits = ['Automate repetitive marketing tasks and free up your team to focus on more strategic initiatives.',
    'Create personalized campaigns that engage your leads and move them faster along the sales funnel.',
    'Track your results and gain valuable insights to optimize your marketing campaigns for better ROAS.',
    'Target the right audience with laser focus using powerful segmentation tools.'
  ];
}
