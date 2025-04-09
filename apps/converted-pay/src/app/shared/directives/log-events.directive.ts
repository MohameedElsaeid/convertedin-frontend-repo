import { Directive, HostListener, Input } from '@angular/core';
import { LogApi } from '../api/log/base/log.base';

@Directive({
  selector: '[convertedinLogEvents]',
  standalone: true,
})
export class LogEventsDirective {
  @Input() convertedinLogEvents!: string;
  @Input() metaData: any = {};
  @Input() isFormEvent = false;
  @HostListener('click') click() {
    if (!this.isFormEvent) this.logEvents();
  }
  @HostListener('submit')
  onFormSubmit() {
    if (this.isFormEvent) this.logEvents();
  }
  constructor(private logApi: LogApi) {}

  logEvents() {
    this.logApi
      .trackEvents(this.convertedinLogEvents, this.metaData)
      .subscribe();
  }
}
