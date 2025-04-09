import { Component, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CampaignsQuery } from '../../shared/services/campaigns-query';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'convertedin-ad-preview',
  templateUrl: './ad-preview.component.html',
  styleUrls: ['./ad-preview.component.scss']
})
export class AdPreviewComponent implements OnDestroy {
  @Input() ad: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  customOptions: OwlOptions = {
    loop: false,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
    center: true,
    margin: 15,

    // autoWidth: true,
    stagePadding: 30
  };
  configuration: any;

  constructor(private store: Store<any>, private campaignsQuery: CampaignsQuery) {
    this.store.select('configuration').pipe(takeUntil(this.destroy$)).subscribe((state) => {
      this.configuration = this.campaignsQuery.parseCircularToJSON(this.campaignsQuery.circularToJSON(state));
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
