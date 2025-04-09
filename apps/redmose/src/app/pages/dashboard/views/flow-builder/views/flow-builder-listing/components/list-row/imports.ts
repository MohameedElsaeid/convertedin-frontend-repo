import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from '@redmose/shared/components';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';

export const listRowImports = [
  CommonModule,
  InputSwitchModule,
  FormsModule,
  SpinnerComponent,
  RouterModule,
  ButtonModule,
];
