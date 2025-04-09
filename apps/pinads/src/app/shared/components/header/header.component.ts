import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LangDropdownComponent } from '../lang-dropdown/lang-dropdown.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'convertedin-header',
  standalone: true,
  imports: [TranslateModule, LangDropdownComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {}
