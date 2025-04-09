import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperModule } from '@convertedin/ui';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'convertedin-top-up-account',
  standalone: true,
  imports: [CommonModule,RouterOutlet],
  templateUrl: './top-up-account.component.html',
  styleUrls: ['./top-up-account.component.scss'],
  host:{
    class:'h-full'
  }
})
export class TopUpAccountComponent {}
