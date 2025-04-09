import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideWalletApi } from '@flyerz/shared/api';

@Component({
  selector: 'convertedin-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  standalone: true,
  imports: [RouterOutlet],
  providers: [provideWalletApi()],
})
export class WalletComponent {
  @HostBinding('class') class = 'flex-grow-1 flex flex-column max-h-full';
}
