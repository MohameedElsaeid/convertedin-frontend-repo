import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent, SelectAppLangComponent } from '@converted-pay/shared/components';
import {
  UpdateProfileComponent,
  SettingsDocumentsComponent,
} from './components';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-settings',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    TranslateModule,
    UpdateProfileComponent,
    SettingsDocumentsComponent,
    SelectAppLangComponent
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  @HostBinding('class') class = 'flex flex-grow-1 flex-column';
  readonly TABS = { profile: 0, documents: 1 };
  activeIndex = this.TABS.profile;
  onChangeTab(index: number) {
    this.activeIndex = index;
  }
}
