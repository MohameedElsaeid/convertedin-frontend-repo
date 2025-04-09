import { Component } from '@angular/core';
import { businessTypeImports } from './imports';

@Component({
  selector: 'app-business-type',
  templateUrl: './business-type.component.html',
  styleUrls: ['./business-type.component.scss'],
  standalone: true,
  imports: businessTypeImports
})
export class BusinessTypeComponent {
  typeList = [
    {
      id: 1,
      iconName: 'energy',
      text: 'Energy'
    },
    {
      id: 2,
      iconName: 'resturant',
      text: 'Resturants'
    },
    {
      id: 3,
      iconName: 'market',
      text: 'Market'
    },
    {
      id: 4,
      iconName: 'flower',
      text: 'Flower Shop'
    },
    {
      id: 5,
      iconName: 'book-store',
      text: 'Book Store'
    },
    {
      id: 6,
      iconName: 'materials',
      text: 'Materials'
    },
    {
      id: 7,
      iconName: 'industrials',
      text: 'Industrials'
    },
    {
      id: 8,
      iconName: 'health-care',
      text: 'Health Care'
    },
    {
      id: 9,
      iconName: 'financial',
      text: 'Financials'
    },
    {
      id: 10,
      iconName: 'car-service',
      text: 'Car Service'
    },
    {
      id: 11,
      iconName: 'real-estate',
      text: 'Real Estate'
    },
    {
      id: 12,
      iconName: 'network',
      text: 'Network'
    },
  ];
  selectedTypeId!: number;
  onChangeType(id: number) {
    this.selectedTypeId = id
  }
}
