import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanComponent } from './components/plan/plan.component';
import { RouterLink } from '@angular/router';




@Component({
  selector: 'convertedin-plans',
  standalone: true,
  imports: [CommonModule,PlanComponent,RouterLink],
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent {}
