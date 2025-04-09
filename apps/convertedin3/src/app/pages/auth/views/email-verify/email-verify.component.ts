import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgxOtpInputModule, NgxOtpInputConfig } from 'ngx-otp-input';

@Component({
  selector: 'convertedin-email-verify',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink,NgxOtpInputModule],
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.scss'],
})
export class EmailVerifyComponent {
  email = 'name@email.com';

  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,
  };

  otp = '';
  isOtpComplete = false;

  inputChange(event: any): void {
    this.otp = event.join('');
    this.isOtpComplete = this.otp.length === this.otpInputConfig.otpLength;
  }
}
