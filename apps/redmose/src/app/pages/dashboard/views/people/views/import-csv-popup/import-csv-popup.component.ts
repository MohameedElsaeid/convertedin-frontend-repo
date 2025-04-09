import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CsvFileData } from '../../models/interfaces';
import { environment } from 'apps/redmose/src/environment/environment';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-import-csv-popup',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CheckboxModule,
    TooltipModule,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './import-csv-popup.component.html',
  styleUrls: ['./import-csv-popup.component.scss'],
})
export class ImportCsvPopupComponent {
  csvData: CsvFileData = {
    discard_duplicates: true,
  };

  disclaimerChecked: boolean = false;

  constructor(
    private __dialog: DynamicDialogRef,
    private __dialogData: DynamicDialogConfig,
    private __toast: MessageService
  ) {}

  //#region Methods
  close(): void {
    this.__dialog.close();
  }

  fileSelect(event: any): void {
    const file = event.target.files[0] as File;

    if (file.size > 5000000) {
      this.showErrorToast('Max file size is 5MB');
      this.csvData.file = undefined;
    } else if (file.name.substring(file.name.lastIndexOf('.')) !== '.csv') {
      this.showErrorToast('Only CSV file types are supported');
      this.csvData.file = undefined;
    } else {
      this.csvData.file = file;
    }
    event.target.value = '';
  }

  showErrorToast(message: string): void {
    this.__toast.add({
      severity: 'error',
      summary: message,
      key: 'cin-toast',
    });
  }

  confirmFile(): void {
    this.__dialogData.data.onClose(this.csvData);
    this.close();
  }

  downloadTemplate(): void {
    window.open(
      (environment.production
        ? environment.remoteUrl
        : 'http://localhost:4200') + '/app-assets/Customers-Template.csv',
      '_blank'
    );
  }
  //#endregion
}
