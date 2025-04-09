import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FlowBuilderApi } from '@redmose/shared/api';
import { Subject, finalize, takeUntil } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-delete-popup',
  standalone: true,
  imports: [TranslateModule, ButtonModule],
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.scss'],
})
export class DeletePopupComponent implements OnInit, OnDestroy {
  //#region Declerations
  private __unsubscriber: Subject<void> = new Subject();
  dialogData: any;
  //#endregion

  constructor(
    private __dialogData: DynamicDialogConfig,
    private __flowBuilderApi: FlowBuilderApi,
    private __ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.dialogData = this.__dialogData.data;
  }

  ngOnDestroy(): void {
    this.__unsubscriber.next();
    this.__unsubscriber.complete();
  }

  //#region Methods
  close(): void {
    this.__ref.close();
  }

  deleteCampaign(): void {
    this.__flowBuilderApi
      .deleteFlow(this.__dialogData.data.id)
      .pipe(
        takeUntil(this.__unsubscriber),
        finalize(() => {
          this.__dialogData.data?.stateChange.emit();
          this.__ref.close();
        })
      )
      .subscribe();
  }
  //#endregion
}
