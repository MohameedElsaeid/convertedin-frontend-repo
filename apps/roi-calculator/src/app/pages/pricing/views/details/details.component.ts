import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'convertedin-details',
  standalone: true,
  imports: [CommonModule,TableComponent,RouterLink],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {

  plans = [
    {
      name: 'Free',
      price: '0',
      description: 'Up to $100 Ad Spend',
    },
    {
      name: 'Starter',
      price: '119',
      description: 'Up to $1,200 Ad Spend',
    },
    {
      name: 'Growth',
      price: '249',
      description: 'Up to $2,500 Ad Spend',
    },    {
      name: 'Pro',
      price: '599',
      description: 'Up to $6,000 Ad Spend',
    }
  ];

  scrollToDiv() {
    const element = document.getElementById('plansSection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
