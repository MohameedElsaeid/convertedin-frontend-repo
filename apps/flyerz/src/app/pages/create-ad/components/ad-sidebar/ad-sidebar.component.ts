import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnInit } from '@angular/core';
import { CreateAdState, selectAllCreateAd } from '@flyerz/store/create-ad';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'convertedin-ad-sidebar',
  templateUrl: './ad-sidebar.component.html',
  styleUrls: ['./ad-sidebar.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule],
})
export class AdSidebarComponent implements OnInit {
  @HostBinding('class') class = 'flex flex-column create-ad__sidebar gap-4';
  adData$!: Observable<CreateAdState>;

  constructor(private __store: Store) {}

  ngOnInit(): void {
    this.adData$ = this.__store.select(selectAllCreateAd);
  }
}
