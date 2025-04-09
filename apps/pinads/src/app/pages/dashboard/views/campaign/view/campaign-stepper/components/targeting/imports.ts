import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ControlErrorsModule } from '@convertedin/ui';
import { AdvertiseLocationComponent } from './components';
import { TranslateModule } from '@ngx-translate/core';
import { SuggestionsButtonComponent } from '../suggestions-button/suggestions-button.component';
import { ChipsInputDirective } from '../../directives';
import { AngularSvgIconModule } from 'angular-svg-icon';

export const targetingImports = [
  CommonModule,
  ReactiveFormsModule,
  ButtonModule,
  InputTextModule,
  DropdownModule,
  ChipsInputDirective,
  OverlayPanelModule,
  ControlErrorsModule,
  AdvertiseLocationComponent,
  SuggestionsButtonComponent,
  TranslateModule,
  AngularSvgIconModule
];
