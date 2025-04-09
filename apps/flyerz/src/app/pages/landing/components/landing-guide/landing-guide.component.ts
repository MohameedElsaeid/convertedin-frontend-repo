import { NgClass } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TimelineModule } from 'primeng/timeline';

@Component({
  selector: '[convertedin-landing-guide]',
  standalone: true,
  imports: [TranslateModule, TimelineModule, NgClass],
  templateUrl: './landing-guide.component.html',
  styleUrls: ['./landing-guide.component.scss'],
})
export class LandingGuideComponent {
  @HostBinding('class') class = 'flex flex-column gap-5 align-items-center';

  guideSteps: Array<{
    id: number;
    title: string;
    subtitle: string;
  }> = [
    {
      id: 1,
      title: 'landing.guide.insights.1.title',
      subtitle: 'landing.guide.insights.1.subtitle',
    },
    {
      id: 2,
      title: 'landing.guide.insights.2.title',
      subtitle: 'landing.guide.insights.2.subtitle',
    },
    {
      id: 3,
      title: 'landing.guide.insights.3.title',
      subtitle: 'landing.guide.insights.3.subtitle',
    },
    {
      id: 4,
      title: 'landing.guide.insights.4.title',
      subtitle: 'landing.guide.insights.4.subtitle',
    },
  ];
}
