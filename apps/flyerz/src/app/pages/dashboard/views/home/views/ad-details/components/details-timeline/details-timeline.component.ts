import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AdDetailsAdData, ApprovalStatus } from '@flyerz/shared/api';
import { TranslateModule } from '@ngx-translate/core';
import { TimelineModule } from 'primeng/timeline';
import { TimelineStep } from '../../models/interfaces';

@Component({
  selector: 'convertedin-details-timeline',
  templateUrl: './details-timeline.component.html',
  styleUrls: ['./details-timeline.component.scss'],
  standalone: true,
  imports: [NgClass, TimelineModule, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsTimelineComponent implements OnInit {
  //#region Declerations
  @Input({ required: true }) adData!: AdDetailsAdData;

  title!: string;
  timeline: Array<TimelineStep> = [
    this.createCheckedStep('dashboard.ad-details.timeline.send'),
  ];
  //#endregion

  ngOnInit(): void {
    this.addAdminStep();
    this.addFacebookStep();
  }

  //#region Methods
  addAdminStep(): void {
    switch (this.adData.adminStatus) {
      // Admin approved
      case ApprovalStatus.APPROVED:
        this.timeline.push(
          this.createCheckedStep('dashboard.ad-details.timeline.review')
        );
        break;

      // Admin in review
      case ApprovalStatus.IN_REVIEW:
        this.timeline.push(
          this.createCurrentStep('dashboard.ad-details.timeline.review')
        );
        this.title = 'dashboard.ad-details.timeline.review-flyerz-title';
        break;

      // Admin rejected
      case ApprovalStatus.REJECTED:
        this.timeline.push(
          this.createRejectStep('dashboard.ad-details.timeline.review')
        );
        this.title = 'dashboard.ad-details.timeline.flyerz-reject-title';
        break;
    }
  }

  addFacebookStep(): void {
    // Admin rejected
    if (this.adData.adminStatus === ApprovalStatus.REJECTED) {
      this.timeline.push(
        this.createRejectStep('dashboard.ad-details.timeline.facebook'),
        this.createRejectStep('dashboard.ad-details.timeline.rejected')
      );
    }
    // Admin in review
    else if (this.adData.adminStatus === ApprovalStatus.IN_REVIEW) {
      this.timeline.push(
        this.createPendingStep('dashboard.ad-details.timeline.facebook'),
        this.createPendingStep('dashboard.ad-details.timeline.status')
      );
    } else {
      switch (this.adData.facebookStatus) {
        // Facebook in review
        case ApprovalStatus.IN_REVIEW:
          this.timeline.push(
            this.createCurrentStep('dashboard.ad-details.timeline.facebook'),
            this.createPendingStep('dashboard.ad-details.timeline.status')
          );
          this.title = 'dashboard.ad-details.timeline.review-facebook-title';
          break;

        // Facebook approved
        case ApprovalStatus.APPROVED:
          this.timeline.push(
            this.createCheckedStep('dashboard.ad-details.timeline.facebook'),
            this.createCheckedStep(
              'dashboard.ad-details.timeline.' +
                (this.adData.is_active ? 'status' : 'finished')
            )
          );

          this.title =
            'dashboard.ad-details.timeline.' +
            (this.adData.is_active ? 'active-title' : 'finished-title');
          break;

        // Facebook rejected
        case ApprovalStatus.REJECTED:
          this.timeline.push(
            this.createRejectStep('dashboard.ad-details.timeline.facebook'),
            this.createRejectStep('dashboard.ad-details.timeline.rejected')
          );
          this.title = 'dashboard.ad-details.timeline.facebook-reject-title';
          break;
      }
    }
  }

  createPendingStep(title: string): TimelineStep {
    return {
      icon: '',
      color: '#e4e9f2',
      title,
      class: 'timeline__pending',
    };
  }

  createRejectStep(title: string): TimelineStep {
    return {
      icon: 'pi-times pi',
      color: '#f43f5e',
      title,
      class: 'timeline__error',
    };
  }

  createCheckedStep(title: string): TimelineStep {
    return {
      icon: 'pi pi-check',
      color: '#1e3ba2',
      title,
      class: 'timeline__check',
    };
  }

  createCurrentStep(title: string): TimelineStep {
    return {
      icon: 'pi pi-check',
      color: '#1e3ba2',
      title,
      class: 'timeline__current',
    };
  }
  //#endregion
}
