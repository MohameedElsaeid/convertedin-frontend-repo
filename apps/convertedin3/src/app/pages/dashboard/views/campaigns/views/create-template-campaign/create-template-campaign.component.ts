import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';

import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'convertedin-create-template-campaign',
  standalone: true,
  imports: [CommonModule, InputTextModule, ButtonModule, CardModule, InputNumberModule, CheckboxModule, FormsModule, StepsModule, DividerModule],
  templateUrl: './create-template-campaign.component.html',
  styleUrls: ['./create-template-campaign.component.scss'],
})
export class CreateTemplateCampaignComponent {
  steps: MenuItem[] = [];
  activeStep: number = 1;
  items: MenuItem[] = [];

  campaign = {
    name: 'Campaign-new-male-style-2024',
    objective: 'Conversion',
    conversionEvent: 'Increase Page Likes',
    productCategory: 'New Collection - 2024',
    lifetime: 'Forever',
    budget: 'Daily - $100',
    currentBudget: 0
  };


  ngOnInit() {
    this.steps = [
      { label: 'Campaign Details' },
      { label: 'Targeting' }
    ];

    this.items = [
      { label: 'Create Campaign', routerLink: '/' },
      { label: ' Campaign Templates', routerLink: '/' },
      { label: ' Men’s Fashions and Styles', routerLink: '/' },
    ];
  }


  campaignName = 'Campaign-new-male-style-2024';
  objective = 'Conversion';
  conversionEvent = 'Increase Page Likes';
  productCategory = 'New Collection - 2024';
  dailyBudget = 100;
  lifetime = 'Forever';
  budget = 0;
  editMode: boolean = false;

  setActiveStep(step: number) {
    this.activeStep = step;
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  adCreative = {
    imageUrl: 'assets/ad-creative.jpg',  // Update this to the correct image path
    description: 'Get a new styles for men’s trendy 2025. A 2025 new fashion wears for men’s.'
  };

}
