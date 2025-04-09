import { NgIf } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackButtonComponent } from '@flyerz/shared/components';

@Component({
  selector: 'convertedin-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  standalone: true,
  imports: [BackButtonComponent, NgIf, RouterOutlet],
})
export class AccountsComponent {
  @HostBinding('class') class = 'flex flex-column flex-grow-1';
  showBack(): boolean {
    return window.location.pathname !== '/my-dashboard/settings/accounts';
  }
}
