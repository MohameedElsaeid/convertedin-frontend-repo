import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'convertedin-auth-success',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './auth-success.component.html',
  styleUrls: ['./auth-success.component.scss'],
})
export class AuthSuccessComponent implements OnInit {
  title = '';
  message = '';
  buttonText = '';
  buttonLink = '';
  typeVerify = '';
  typeVerifyMessage = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data['type'] === 'password-reset') {
        this.title = 'Password has been Changed!';
        this.message = 'We’ll automatically redirect you to the Login Page.';
        this.buttonText = 'Login';
        this.buttonLink = '../login';
        this.typeVerify = 'Reset Password';
        this.typeVerifyMessage = 'New Password Updated';
      } else {
        // Default to signup success
        this.title = 'Email has been verified!';
        this.message = "We’ll automatically redirect you to the convertedin dashboard.";
        this.buttonText = 'Open Dashboard';
        this.buttonLink = '../register';
        this.typeVerify = 'Email Verified';
        this.typeVerifyMessage = 'OTP Code Accepted';
      }
    });
  }
}
