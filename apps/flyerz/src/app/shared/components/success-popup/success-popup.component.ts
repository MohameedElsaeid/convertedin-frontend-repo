import { NgIf } from '@angular/common';
import { Component, HostBinding, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'convertedin-success-popup',
  standalone: true,
  imports: [NgIf, ButtonModule, TranslateModule, RouterLink],
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.scss'],
})
export class SuccessPopupComponent implements OnInit {
  @HostBinding('class') class = 'flex flex-column gap-4 align-items-center';
  title!: string;
  subtitle: string | undefined;
  route!: string;
  btnText!: string;

  constructor(
    private __dialog: DynamicDialogRef,
    private __dialogData: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.title = this.__dialogData.data.title;
    this.subtitle = this.__dialogData.data.subtitle;
    this.route = this.__dialogData.data.route;
    this.btnText = this.__dialogData.data.btnText;
  }

  closeDialog(): void {
    this.__dialog.close();
  }
}
