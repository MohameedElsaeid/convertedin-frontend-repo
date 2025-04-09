import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';

interface SocialPlatform {
  name: string;
  logo: string;
  status: 'connected' | 'connect' | 'coming-soon';
  description: string;
  routerLink?: string;
}

@Component({
  selector: 'convertedin-social-media',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss'],
})
export class SocialMediaComponent {
  socialPlatforms: SocialPlatform[] = [
    {
      name: 'Facebook',
      logo: '/assets/icons/facebook-logo.svg',
      status: 'connect',
      description: 'Choose the Facebook page you would like to connect',
      routerLink: '/dashboard/settings/social-media/facebook',
    },
    {
      name: 'Instagram',
      logo: '/assets/icons/instagram-logo.svg',
      status: 'connected',
      description: 'Choose the Instagram page you would like to connect',
    },
    {
      name: 'Tiktok',
      logo: '/assets/icons/tiktok-logo.svg',
      status: 'coming-soon',
      description: 'Choose the Tiktok page you would like to connect',
    },
    // Add more platforms as needed
  ];
}
