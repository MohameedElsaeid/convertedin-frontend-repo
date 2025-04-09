import { Component, HostBinding } from '@angular/core';
import { NgFor } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: '[convertedin-landing-pros]',
  standalone: true,
  imports: [NgFor, TranslateModule],
  templateUrl: './landing-pros.component.html',
  styleUrls: ['./landing-pros.component.scss'],
})
export class LandingProsComponent {
  @HostBinding('class') class = 'flex flex-column gap-5 align-items-center';

  flyerzPros: Array<{
    title: string;
    subtitle: string;
    icon: string;
  }> = [
    {
      title: 'landing.pros-insights.1.title',
      subtitle: 'landing.pros-insights.1.subtitle',
      icon: 'assets/icons/landing/pros-inisghts-1.svg',
    },
    {
      title: 'landing.pros-insights.2.title',
      subtitle: 'landing.pros-insights.2.subtitle',
      icon: 'assets/icons/landing/pros-inisghts-2.svg',
    },
    {
      title: 'landing.pros-insights.3.title',
      subtitle: 'landing.pros-insights.3.subtitle',
      icon: 'assets/icons/landing/pros-inisghts-3.svg',
    },
  ];
}
