import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DataObject, FilterOption } from '@convertedin3/shared/models/interfaces/search-filter.interface';
import { NavbarComponent } from '@convertedin3/shared/components/index';
import { CardTemplateComponent } from '../../shared/components/card-template/card-template.component';
import { SearchFilterComponent } from '@convertedin3/shared/components/index';
@Component({
  selector: 'convertedin-templates-overview',
  standalone: true,
  imports: [DropdownModule, InputTextModule, ButtonModule, CommonModule, NavbarComponent, CardTemplateComponent, SearchFilterComponent],
  templateUrl: './templates-overview.component.html',
  styleUrls: ['./templates-overview.component.scss'],
})
export class TemplatesOverviewComponent {
  templates = [
    {
      title: 'Binge-Watchers Craving The Latest Streaming Releases',
      category: 'Fashion',
      categoryClass: 'fashion-label',
      ctr: 20,
      roas: 20,
      strategy: 'Single Campaign',
      audience: 'Men Interested in Clothing',
      platforms: ['facebook', 'snapchat', 'instagram'],
      isNew: true,
    },
    {
      title: 'Binge-Watchers Craving The Latest Streaming Releases',
      category: 'Electronics',
      categoryClass: 'electronics-label',
      ctr: 20,
      roas: 20,
      strategy: 'Single Campaign',
      audience: 'Men Interested in Clothing',
      platforms: ['facebook', 'snapchat', 'instagram'],
      isNew: false,
    },
  ];
  // Filters array with label and options
  filters: FilterOption[] = [
    { label: 'Industry', field: 'industry', options: ['Tech', 'Finance', 'Healthcare'] },
    { label: 'Strategy', field: 'strategy', options: ['B2B', 'B2C'] },
    { label: 'Platform', field: 'platform', options: ['Mobile', 'Web'] },
    { label: 'Industry', field: 'industry', options: ['Tech', 'Finance', 'Healthcare'] },
    { label: 'Strategy', field: 'strategy', options: ['B2B', 'B2C'] },

  ];

  // Sample data to be filtered (Client-side data)
  cards: DataObject[] = [
    { name: 'Binge-Watchers Craving The Latest Streaming Releases', type: 'Fashion', CTR: [{ label: 'CTR', value: 5 }],ROAS: [{ label: 'ROAS', value: 10 }], strategy: [{ label: 'Strategy', value: 'Target audience' }], audience: [{ label: 'Audience', value: '18-35 year olds' }],socialMediaLinks: { facebook: true, snapchat:true, instagram: true }, 'isNew': true },
    { name: 'Binge-Watchers Craving The Latest Streaming', type: 'electronice',  CTR: [{ label: 'CTR', value: 5 }], ROAS: [{ label: 'ROAS', value: 10 }], strategy: [{ label: 'Strategy', value: 'Target audience' }], audience: [{ label: 'Audience', value: '18-35 year olds' }], socialMediaLinks: { facebook: true, instagram: true }, 'isNew': false },
    { name: 'Competitive Gamers Seeking High-Performance ...', type: 'Automotive',  CTR: [{ label: 'CTR', value: 5 }],ROAS: [{ label: 'ROAS', value: 10 }],  strategy: [{ label: 'Strategy', value: 'Target audience' }], audience: [{ label: 'Audience', value: '18-35 year olds' }], socialMediaLinks: { facebook: true, snapchat: true }, 'isNew': true },
    { name: 'quero códigos de 6 digitos para serem identificadores de ...', type: 'Health & Beauty',  CTR: [{ label: 'CTR', value: 5 }],ROAS: [{ label: 'ROAS', value: 10 }],  strategy: [{ label: 'Strategy', value: 'Target audience' }], audience: [{ label: 'Audience', value: '18-35 year olds' }], socialMediaLinks: { facebook: true, snapchat:true, instagram: true }, 'isNew': false },
    { name: 'Men’s Who interested in fashions and styles', type: 'Marketing',  CTR: [{ label: 'CTR', value: 5 }],ROAS: [{ label: 'ROAS', value: 10 }],  strategy: [{ label: 'Strategy', value: 'Target audience' }], audience: [{ label: 'Audience', value: '18-35 year olds' }], socialMediaLinks: { facebook: true, snapchat:true, instagram: true }, 'isNew': true },
    // Add your dataset here
  ];

  useBackendSearch = false; // Toggle between backend or client-side search
  displayedCards: DataObject[] = []


  ngOnInit() {
    this.displayedCards = this.cards;
  }

  onViewTemplate(){
  }


    // Handle the filtered data for client-side search
    handleClientSearch(filteredData: DataObject[]) {
      console.log('Client-side filtered data:', filteredData);
      return this.displayedCards = filteredData
    }

    // Handle the query for backend search
    handleBackendSearch(query: any) {
      console.log('Send this query to backend:', query);
    }
}
