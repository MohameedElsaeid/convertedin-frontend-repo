import { Component, HostBinding, Input, OnDestroy } from '@angular/core';
import { uploadImageImports } from './imports';
import { Store } from '@ngrx/store';
import {
  CreateAiMediaActions,
  CreateAiMediaState,
} from '@flyerz/store/create-ai-media';
import { imgToBase64 } from '@flyerz/shared/utilities';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-upload-image',
  standalone: true,
  imports: uploadImageImports,
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})
export class UploadImageComponent implements OnDestroy {
  //#region Declerations
  @HostBinding('class') class =
    'flex flex-grow-1 flex-column justify-content-center py-6 gap-4 align-items-center create-ad__step max-h-full';
  @Input({ required: true }) createAiMedia!: CreateAiMediaState;
  private __unsubscriber: Subject<void> = new Subject();
  private readonly __maxFileSize: number = 10000000;
  //#endregion

  constructor(
    private __store: Store,
    private __toast: MessageService,
    private __translate: TranslateService
  ) {}

  ngOnDestroy(): void {
    this.__unsubscriber.next();
    this.__unsubscriber.complete();
  }

  //#region Methods
  imageSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      if (file.size > this.__maxFileSize) {
        this.showErrorToast(
          this.__translate.instant('create-ai-image.upload-image.wrong-size')
        );
      } else if (
        !this.isCorrectFileType(file.name.substring(file.name.lastIndexOf('.')))
      ) {
        this.showErrorToast(
          this.__translate.instant('create-ai-image.upload-image.wrong-type')
        );
      } else {
        this.convertToBase64(file);
      }
    }
  }

  isCorrectFileType(type: string): boolean {
    return type === '.png' || type === '.jpg' || type === 'jpeg';
  }

  convertToBase64(file: File): void {
    imgToBase64(file)
      .pipe(takeUntil(this.__unsubscriber))
      .subscribe((item) => {
        this.__store.dispatch(
          CreateAiMediaActions.setCreateAiMediaUserImage({
            imageFile: file,
            imagePreview: item,
          })
        );
      });
  }

  showErrorToast(summary: string): void {
    this.__toast.add({
      severity: 'error',
      summary: summary,
    });
  }

  resetFileValue(event: any): void {
    event.target.value = '';
  }

  resetSelectedImage(): void {
    this.__store.dispatch(CreateAiMediaActions.resetCreateAiMediaUserImage());
  }
  //#endregion
}
