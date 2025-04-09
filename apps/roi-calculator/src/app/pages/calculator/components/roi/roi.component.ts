import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  Validators,
  FormControl,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { environment } from 'apps/roi-calculator/src/environment/environment';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { CalculatorStepValidationPipe } from 'apps/roi-calculator/src/app/pipes/calculator-step-validation.pipe';
import { RouterLink } from '@angular/router';

// Imports above are regular Angular imports and exports while the imports below are for inputs for the component to be able to use them in the html

declare const hbspt: any;
@Component({
  selector: 'convertedin-roi',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    FormsModule,
    InputNumberModule,
    InputTextModule,
    TooltipModule,
    ProgressBarModule,
    ToastModule,
    CalculatorStepValidationPipe,
    RouterLink
  ],
  templateUrl: './roi.component.html',
  styleUrls: ['./roi.component.scss'],
})
export class RoiComponent {
  roiCalculator: FormGroup = new FormGroup({
    industry: new FormControl('', Validators.required),
    channel: new FormControl('', Validators.required),
    adSpend: new FormControl('', Validators.required),
    CPM: new FormControl('', Validators.required),
    CTR: new FormControl('', Validators.required),
    CR: new FormControl('', Validators.required),
    adDuration: new FormControl('', Validators.required),
    email: new FormControl(''),
  });
  
  isMetricsReady = true;
  currentStep = 0;
  roasBar = 5;
  enhancedRoasBar = 5;
  roas = 0;
  enhancedRoas = 0;
  revenue = 0;
  revenueConverted = 0;
  benchMark = '';

  steps = [['industry', 'channel'], ['adSpend', 'CPM', 'CTR', 'CR'] , ['adDuration'] ,['email'],['reset']];

  metricsDropdown = [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ];
  AdDurationList = [
    { label: '< 6', value: 1.3 },
    { label: '6-12', value: 1.8 },
    { label: '12-18', value: 2.3 },
    { label: '18-24', value: 2.8 },
    { label: '> 24', value: 3.2 },
  ];
  industriesDropdown = [
    { label: 'Electronics/Appliances', value: 'electronics_appliances', benchMark: '20' },
    {
      label: 'Fashion/Textile (Apparel, Carpets, Curtains, etc.)',
      value: 'fashion_textile', benchMark: '4'
    },
    { label: 'Cosmetics', value: 'cosmetics', benchMark: '5' },
    { label: 'Furniture/Home Improvement', value: 'furniture_home', benchMark: '10' },
    { label: 'Jewelry', value: 'jewelry', benchMark: '12' },
    { label: 'F&B', value: 'f_b', benchMark: '6' },
    { label: 'Accessories', value: 'accessories', benchMark: '6' },
    { label: 'Car spare parts', value: 'car_parts', benchMark: '20' },
  ];

  channelsDropdown = [
    { label: 'Facebook / Instagram', value: 'facebook_instagram' },
    { label: 'Google', value: 'google' },
    { label: 'Other', value: 'other' },
  ];


  // Add an exlamation if you don't want to intialize a value

  calculator() {
    const value = this.roiCalculator.value;
    const impressions = 1000 * (value.adSpend / value.CPM);
    const clicks = impressions * value.CTR;
    const orders = clicks * (value.CR/100);
    const AOV = (value.adSpend * value.CPM) / orders;
    const totalRevenue = orders * AOV;
    const ROAS =  totalRevenue/value.adSpend;
    const enhancedTotalRevenue = totalRevenue * value.adDuration;
    const enhancedROAS = enhancedTotalRevenue / value.adSpend;


    const selectedIndustry = this.roiCalculator.get('industry')?.value;
    const benchmark = this.getBenchmarkValue(selectedIndustry);

    this.roas = Math.round(ROAS * 10) / 10;
    this.enhancedRoas = Math.round(enhancedROAS * 10) / 10;
    this.revenue = Math.round(totalRevenue * 10) / 10;
    this.revenueConverted = Math.round(enhancedTotalRevenue * 10) / 10;
    this.benchMark = benchmark ? benchmark : 'N/A';

    this.nextStep();
  }

  getBenchmarkValue(industryValue: string): string | undefined {
    const selectedIndustry = this.industriesDropdown.find(industry => industry.value === industryValue);
    return selectedIndustry ? selectedIndustry.benchMark : undefined;
  }

  metricAvailabilityChange() {
    if (!this.isMetricsReady) {
      hbspt.forms.create({
        region: 'na1',
        portalId: environment.contactPortalId,
        formId: environment.contactFormId,
        target: '#contact',
      });
    }
  }

  nextStep() {
    this.currentStep++;
  }

  prevStep() {
    this.currentStep--;
  }

  reset(){
    this.roiCalculator.reset();
    this.currentStep = 0;

    this.roas = 0;
    this.enhancedRoas = 0;
    this.revenue = 0;
    this.revenueConverted = 0;
   }
}

// When create env bind to project json as well