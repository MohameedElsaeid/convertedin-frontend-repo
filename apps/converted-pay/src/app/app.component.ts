import { Component, OnInit } from '@angular/core';
import {
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterModule,
} from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { LogApi } from './shared/api/log/base/log.base';
import { startWith } from 'rxjs';
import { ChatWidgetMovementDirective } from './shared/directives/chat-widget-movement.directive';
@Component({
  standalone: true,
  imports: [RouterModule, ToastModule, ChatWidgetMovementDirective],
  selector: 'convertedin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  hostDirectives: [ChatWidgetMovementDirective],
})
export class AppComponent implements OnInit {
  title = 'converted-pay';
  get dir() {
    return document.documentElement.dir;
  }
  constructor(private router: Router, private logApi: LogApi) {}

  ngOnInit(): void {
    this.removeSplash();
    this.subscribeRouteChanges();
  }
  subscribeRouteChanges() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.url.split('/');
        const eventName =
          url[url.length - 1].replace('-', '_').toUpperCase() + '_SCREEN';
        this.logApi.trackEvents(eventName, {}).subscribe();
      }
    });
  }
  removeSplash(): void {
    document.getElementById('loading-panel')?.remove();
    document.getElementById('loading-styles')?.remove();
  }
}
