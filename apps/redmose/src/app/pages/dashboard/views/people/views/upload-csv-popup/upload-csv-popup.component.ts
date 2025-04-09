import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { CsvFileData } from '../../models/interfaces';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FileSizePipe } from '@redmose/shared/pipes';
import { PeopleApi } from '@redmose/shared/api';

@Component({
  selector: 'convertedin-upload-csv-popup',
  standalone: true,
  imports: [CommonModule, ButtonModule, ProgressBarModule, FileSizePipe],
  templateUrl: './upload-csv-popup.component.html',
  styleUrls: ['./upload-csv-popup.component.scss'],
})
export class UploadCsvPopupComponent implements OnInit {
  //#region Declerations
  csvData: CsvFileData = {};
  mode: 'pending' | 'success' | 'fail' = 'pending';
  errorMsg: string = '';
  //#endregion

  constructor(
    private __dialog: DynamicDialogRef,
    private __dialogData: DynamicDialogConfig,
    private __peopleApi: PeopleApi
  ) {}

  ngOnInit(): void {
    this.csvData = this.__dialogData.data.csvData;

    this.uploadCsv();
  }

  //#region Methods
  close(): void {
    this.__dialog.close();
  }

  back(): void {
    this.__dialogData.data.onBack();
    this.close();
  }

  done(): void {
    this.__dialogData.data.onClose();
    this.close();
  }

  uploadCsv(): void {
    this.__peopleApi
      .uploadCustomersCsv(this.csvData.file, this.csvData.discard_duplicates)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.mode = 'fail';
          this.errorMsg = error?.error?.errors?.messages[0];
          return throwError(() => error);
        })
      )
      .subscribe(() => {
        this.mode = 'success';
      });
  }
  //#endregion
}
