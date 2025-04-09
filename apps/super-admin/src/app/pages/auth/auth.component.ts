import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProvideAuthApi } from '@super-admin/shared/api/auth';

@Component({
  selector: 'convertedin-auth',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [ProvideAuthApi()],
})
export class AuthComponent {}
