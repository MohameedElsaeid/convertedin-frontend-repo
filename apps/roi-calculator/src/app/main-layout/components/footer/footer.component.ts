import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'convertedin-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  productsFooterItems = [
    { url: 'https://convertedin.com/Feature#customer-data', text: 'Customer Segmentation' },
    { url: 'https://convertedin.com/Feature#audience-building', text: 'Audience Building & Automated Segmentation' },
    { url: 'https://convertedin.com/Feature#catalog-intelligence', text: 'Catalog Intelligence' },
    { url: 'https://convertedin.com/Feature#digital-ads', text: 'Digital Ads' },
    { url: 'https://convertedin.com/Feature#direct-messaging', text: 'Direct Messaging' },
    { url: 'https://convertedin.com/Feature#universal-campaigns', text: 'Universal Campaigns' },
    { url: 'https://convertedin.com/Feature#universal-pixel-m', text: 'Universal Pixel' },
    { url: 'https://convertedin.com/Feature#design-studio-dt', text: 'Design Studio' }
  ];

  linksFooterItems = [
    { url: 'https://convertedin.com/About-Us', text: 'About' },
    { url: 'https://roi.converted.in/pricing', text: 'Pricing' },
    { url: 'https://roi.converted.in/', text: 'ROI Calculator' },
    { url: 'https://blog.converted.in/en-us/blog', text: 'Blog' },
    { url: 'https://careers.convertedin.com/', text: 'Careers' },
    { url: 'https://careers.convertedin.com/connect', text: 'Contact' },
  ];
}
