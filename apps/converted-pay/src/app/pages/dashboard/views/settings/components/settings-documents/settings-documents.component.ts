import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ControlErrorsModule } from '@convertedin/ui';
import { InputNumberModule } from 'primeng/inputnumber';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AppActions, selectUserData } from '@converted-pay/store/app';
import { BehaviorSubject, finalize, take } from 'rxjs';
import { UserApi, provideUserApi } from '@converted-pay/shared/api/user';
import { Store } from '@ngrx/store';
import {
  DragDropDirective,
  LogEventsDirective,
} from '@converted-pay/shared/directives';
import { MessageService } from 'primeng/api';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-settings-documents',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ControlErrorsModule,
    InputNumberModule,
    DragDropDirective,
    LogEventsDirective,
    TranslateModule,
  ],
  templateUrl: './settings-documents.component.html',
  styleUrls: ['./settings-documents.component.scss'],
  providers: [provideUserApi()],
})
export class SettingsDocumentsComponent implements OnInit {
  profileForm = new FormGroup({
    taxNumber: new FormControl<string | null>(null, [
      RxwebValidators.required({
        message: this.translate.instant('validations.tax.required'),
      }),
      RxwebValidators.pattern({
        expression: { matchLength: /^\d{9}$/ },
        message: this.translate.instant('validations.tax.length'),
      }),
    ]),
    taxCardImage: new FormControl(),
  });
  imageUrl!: string;
  isLoading$ = new BehaviorSubject(false);
  constructor(
    private userApi: UserApi,
    private store: Store,
    private toast: MessageService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getProfileData();
  }
  getProfileData() {
    this.store
      .select(selectUserData)
      .pipe(take(1))
      .subscribe((profile) => {
        this.profileForm.patchValue({ taxNumber: profile?.taxNumber });
        this.imageUrl = profile!.taxCardPAth!;
      });
  }
  onChangeFileInput(e: any) {
    this.onSelectFile(e.files);
  }
  onSelectFile(files: FileList) {
    this.profileForm.controls['taxCardImage'].patchValue(files[0]);
    this.profileForm.controls['taxCardImage'].markAsDirty();
    this.imageUrl = URL.createObjectURL(files[0]);
  }

  submit() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    this.isLoading$.next(true);
    const formData = new FormData();
    formData.append('taxCardImage', this.profileForm.value.taxCardImage);
    formData.append('taxNumber', this.profileForm.value.taxNumber!);
    this.userApi
      .uploadTaxImage(formData)
      .pipe(
        finalize(() => {
          this.isLoading$.next(false);
        })
      )
      .subscribe((res) => {
        this.toast.add({
          severity: 'success',
          summary: this.translate.instant('settings.docUpdatedSuccess'),
        });
        this.store.dispatch(AppActions.setUserData({ userData: res.data }));
      });
  }
}
