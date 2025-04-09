import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { CsvFileData } from '../../../../models/interfaces';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-customer-csv-import',
  standalone: true,
  imports: [TranslateModule, ButtonModule],
  templateUrl: './customer-csv-import.component.html',
  styleUrls: ['./customer-csv-import.component.scss'],
  providers: [DialogService],
})
export class CustomerCsvImportComponent {
  @Output() fileUploaded: EventEmitter<void> = new EventEmitter();
  private __csvData: CsvFileData = {};

  constructor(private __dialog: DialogService) {}

  //#region Methods
  openImportCsv(): void {
    import('../../../import-csv-popup/import-csv-popup.component').then(
      (component) => {
        this.__dialog.open(component.ImportCsvPopupComponent, {
          dismissableMask: false,
          header: 'Import CSV Data',
          styleClass: 'relative',
          data: {
            onClose: (csvData) => {
              this.__csvData = csvData;
              this.openUploadPopup();
            },
          },
        });
      }
    );
  }

  openUploadPopup(): void {
    import('../../../upload-csv-popup/upload-csv-popup.component').then(
      (component) => {
        {
          this.__dialog.open(component.UploadCsvPopupComponent, {
            dismissableMask: false,
            header: 'Upload CSV File',
            styleClass: 'relative',
            data: {
              csvData: this.__csvData,
              onClose: () => {
                this.fileUploaded.emit();
              },
              onBack: () => {
                this.openImportCsv();
              },
            },
          });
        }
      }
    );
  }
  //#endregion
}
