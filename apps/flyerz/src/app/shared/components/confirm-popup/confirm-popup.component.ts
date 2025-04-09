import { Component, HostBinding, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'convertedin-confirm-popup',
  standalone: true,
  imports: [NgIf, TranslateModule, ButtonModule],
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss'],
})
export class ConfirmPopupComponent implements OnInit {
  @HostBinding('class') class = 'flex flex-column gap-4 align-items-center';
  title!: string;
  subtitle: string | undefined;
  btnText!: string;
  onConfirm!: Function;

  constructor(
    private __dialog: DynamicDialogRef,
    private __dialogData: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.title = this.__dialogData.data.title;
    this.subtitle = this.__dialogData.data.subtitle;
    this.onConfirm = this.__dialogData.data.onConfirm;
    this.btnText = this.__dialogData.data.btnText;
  }

  closeDialog(): void {
    this.__dialog.close();
  }

  confirm(): void {
    this?.onConfirm();
    this.closeDialog();
  }
}
