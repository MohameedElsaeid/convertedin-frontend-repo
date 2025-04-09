import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { campaignFeature } from '@pinads/store/campaign';
import { TranslateModule } from '@ngx-translate/core';
import { ShuffledArrayPipe } from '@pinads/shared/pipes';
import { Subject, Subscription, finalize, interval } from 'rxjs';

@Component({
  selector: 'convertedin-campaign-view',
  standalone: true,
  imports: [CommonModule, TranslateModule, ShuffledArrayPipe],
  templateUrl: './campaign-view.component.html',
  styleUrls: ['./campaign-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignViewComponent implements OnInit, OnDestroy {
  campaignState$ = this.store.select(campaignFeature.selectCampaignState);
  @Input() indicatorNum = 0;
  @Input() intervalState = true;
  @Output() changeViewState = new EventEmitter<ViewState>();
  intervalSubscription!: Subscription;

  constructor(private store: Store, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.intervalState) this.startInterval();
  }
  startInterval() {
    this.intervalState = true;
    this.intervalSubscription = interval(5000)
      .subscribe(() => {
        this.indicatorNum++;
        this.cdr.markForCheck();
      });
  }

  toggleInterval() {
    if (this.intervalState) {
      this.stopInterval();
      return;
    }
    this.startInterval();
  }
  next() {
    this.indicatorNum++;
    this.stopInterval();
    this.cdr.markForCheck();
  }
  prev() {
    this.indicatorNum--;
    this.stopInterval();
    this.cdr.markForCheck();
  }
  stopInterval() {
    this.intervalSubscription?.unsubscribe();
    this.intervalState = false;
  }
  ngOnDestroy(): void {
    this.intervalSubscription?.unsubscribe();
    this.changeViewState.emit({
      indicatorNum: this.indicatorNum,
      intervalState: this.intervalState,
    });
  }
}
export interface ViewState {
  indicatorNum: number;
  intervalState: boolean;
}
