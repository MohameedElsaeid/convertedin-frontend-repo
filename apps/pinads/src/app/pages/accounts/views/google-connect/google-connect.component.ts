import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AuthApi } from '@pinads/shared/api/auth';

@Component({
  selector: 'convertedin-google-connect',
  standalone: true,
  templateUrl: './google-connect.component.html',
  styleUrls: ['./google-connect.component.scss'],
  imports: [CommonModule, ButtonModule, TranslateModule, ProgressSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-column align-items-center justify-content-center h-full',
  },
})
export class GoogleConnectComponent {
  constructor(private authApi: AuthApi) {}
  connectGoogle() {
    this.authApi.googleConnect().subscribe((res) => {
      window.location.replace(res.data.google_connect_url);
    });
  }
}
