import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackingService } from '@redmose/shared/base/tracking.base';
import { TrackingData } from '@redmose/shared/models/interfaces';

@Directive({
  selector: '[tracking]',
  standalone: true,
})
export class TrackingDirective implements OnInit {
  @Input() trackingMode: 'click' | 'onLoad' = 'onLoad';
  @Input() trackingData!: TrackingData;

  @HostListener('click') onClick() {
    if (this.trackingMode === 'click') {
      this.__tracking.trackEvent(this.trackingData);
    }
  }

  constructor(
    private __tracking: TrackingService,
    private __activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const trackingData = this.__activeRoute.snapshot.data['trackingData'];

    if (trackingData) {
      this.__tracking.trackEvent(trackingData);
    }
  }
}
