import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FlowBuilderApi,
  FlowsListingItem,
  WorkFlowAction,
} from '@redmose/shared/api';
import { Subject, finalize, takeUntil } from 'rxjs';
import { listRowImports } from './imports';
import { DialogService } from 'primeng/dynamicdialog';
import { SideBarHeaderData } from '../../../flow-builder-create/models/interfaces';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: '[convertedin-list-row]',
  standalone: true,
  imports: listRowImports,
  templateUrl: './list-row.component.html',
  styleUrls: ['./list-row.component.scss'],
})
export class ListRowComponent implements OnInit, OnDestroy {
  //#region Declerations
  @Input({ required: true }) flow: FlowsListingItem;
  @Output() stateChange: EventEmitter<void> = new EventEmitter();

  private __unsubscriber: Subject<void> = new Subject();
  private readonly __titles: { [key: string]: SideBarHeaderData } = {
    [WorkFlowAction.DELAY]: {
      title: 'Delay',
      logo: 'app-assets/icons/flow-builder/delay.svg',
    },
    [WorkFlowAction.TRIGGER]: {
      title: 'Trigger',
      logo: 'app-assets/icons/flow-builder/trigger.svg',
    },
    [WorkFlowAction.SMS]: {
      title: 'SMS',
      logo: 'app-assets/icons/flow-builder/msg.svg',
    },
    [WorkFlowAction.NOTIFICATION]: {
      title: 'Notification',
      logo: 'app-assets/icons/flow-builder/bell.svg',
    },
    [WorkFlowAction.EMAIL]: {
      title: 'Notification',
      logo: 'app-assets/icons/flow-builder/letter.svg',
    },
  };

  active: boolean = false;
  isLoading: boolean = false;
  //#endregion

  constructor(
    private __flowBuilderApi: FlowBuilderApi,
    private __dialog: DialogService,
    private __translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.active = !!this.flow.published;
  }

  ngOnDestroy(): void {
    this.__unsubscriber.next();
    this.__unsubscriber.complete();
  }

  //#region Meethods
  switchState(): void {
    this.isLoading = true;
    this.__flowBuilderApi
      .updateFlow({ published: this.active ? 1 : 0 }, this.flow.id)
      .pipe(
        takeUntil(this.__unsubscriber),
        finalize(() => {
          this.isLoading = false;
          this.stateChange.emit();
        })
      )
      .subscribe();
  }

  deleteFlow(): void {
    import('../delete-popup/delete-popup.component').then((component) => {
      this.__dialog.open(component.DeletePopupComponent, {
        data: {
          id: this.flow.id,
          stateChange: this.stateChange,
          campaignName: this.flow.name,
        },
        header: this.__translate.instant('automation.delete-title'),
        styleClass: 'flow-listing__delete-popup',
      });
    });
  }

  getChannelIcon(channel: WorkFlowAction): string {
    return this.__titles[channel]?.logo;
  }

  showActions(): boolean {
    return true;
    return this.flow.channels[0] === 'sms';
  }
  //#endregion
}
