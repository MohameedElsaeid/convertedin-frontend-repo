import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { RoutesConfig } from '../../models';
import { NgFor, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'convertedin-sidebar-loading',
  templateUrl: './sidebar-loading.component.html',
  styleUrls: ['./sidebar-loading.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SkeletonModule, NgFor, NgTemplateOutlet],
})
export class SidebarLoadingComponent {
  @Input() logo?: string;
  @Input() routes?: RoutesConfig;
}
