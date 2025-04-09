import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import {
  EditCampaignContentComponent,
  EditCampaignLocationComponent,
} from './components';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CampaignApi, CampaignDetails } from '@pinads/shared/api/campaign';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { BehaviorSubject, finalize } from 'rxjs';

@Component({
  selector: 'convertedin-edit-campaign-dialog',
  standalone: true,
  imports: [
    CommonModule,
    DropdownModule,
    EditCampaignContentComponent,
    EditCampaignLocationComponent,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './edit-campaign-dialog.component.html',
  styleUrls: ['./edit-campaign-dialog.component.scss'],
})
export class EditCampaignDialogComponent {
  typeList = ['keyword', 'description', 'headline', 'location'];
  campaignContent = ['keyword', 'description', 'headline'];
  formGroup = new FormGroup({
    formArray: new FormArray<FormGroup>([this.generateFormGroup()]),
  });
  get formArrayControls(): FormGroup[] {
    return this.formGroup?.controls.formArray.controls;
  }
  campaignDetails!: CampaignDetails;
  keys: { [key: string]: keyof CampaignDetails } = {
    keyword: 'keywords',
    headline: 'headlines',
    description: 'descriptions',
  };
  isLoading$ = new BehaviorSubject(false);
  constructor(
    private dialogRef: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig,
    private campaignApi: CampaignApi,
    private translate: TranslateService
  ) {
    this.campaignDetails = this.dialogConfig.data.campaignDetails;
  }
  close(ref?:boolean) {
    this.dialogRef.close(ref);
  }

  generateFormGroup() {
    return new FormGroup({
      typeList: new FormControl(this.getAvailableTypes()),
      actions: new FormControl(this.getAvailableActions()),
      type: new FormControl('keyword'),
      actionType: new FormControl('add'),
      value: new FormControl(null, [
        RxwebValidators.required({
          message: this.translate.instant('validations.required'),
        }),
        RxwebValidators.minLength({
          value: 1,
          message: this.translate.instant('validations.required'),
        }),
      ]),
    });
  }
  getAvailableTypes() {
    const isContainLocation = this.formArrayControls
      ? !!this.formArrayControls.find(
          (formGroup) => formGroup.controls['type'].value === 'location'
        )
      : false;

    return isContainLocation
      ? ['keyword', 'description', 'headline']
      : ['keyword', 'description', 'headline', 'location'];
  }

  getAvailableActions() {
    const allRemoveAction = this.formArrayControls
      ? this.formArrayControls
          .filter((group) => group.controls['actionType'].value === 'remove')
          .map((group) => group.controls['type'].value)
      : [];

    return {
      keyword: allRemoveAction.includes('keyword')
        ? ['add']
        : ['add', 'remove'],
      description: allRemoveAction.includes('description')
        ? ['add']
        : ['add', 'remove'],
      headline: allRemoveAction.includes('headline')
        ? ['add']
        : ['add', 'remove'],
    };
  }
  addFormGroup() {
    this.disableTypesInLastIndex();
    this.formGroup.controls.formArray.push(this.generateFormGroup());
  }
  disableTypesInLastIndex() {
    const group = this.formArrayControls[this.formArrayControls.length - 1];
    group.get('type')?.disable();
    group.get('actionType')?.disable();
  }

  removeFormGroup(index: number) {
    this.formGroup.controls.formArray.removeAt(index);
  }
  onChangeType(group: FormGroup) {
    const isLocation = group.get('type')?.value === 'location';
    const value = isLocation ? this.campaignDetails.proximity : null;
    const actionType = isLocation ? null : 'add';

    //patch action type before get available actions
    group.patchValue({ actionType });
    group.patchValue({
      actions: this.getAvailableActions(),
      value,
    });
  }
  submit() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    const updatedContent: any[] = [];
    const { formArray } = this.formGroup.getRawValue();

    const addedContent = formArray.filter(
      (item) => item['actionType'] === 'add'
    );
    const removedContent = formArray.filter(
      (item) => item['actionType'] === 'remove'
    );

    const location = formArray.filter((item) => item['type'] === 'location')[0];

    const { keywords, descriptions, headlines } = this.campaignDetails;

    addedContent.forEach((item) => {
      updatedContent.push({
        request: this.keys[item['type']],
        action: 'Add',
        content: item['value'],
      });
    });

    removedContent.forEach((item) => {
      const values = item['value'].map((i: any) => {
        switch (item['type']) {
          case 'keyword':
            return keywords[i];
          case 'headline':
            return headlines[i];
          case 'description':
            return descriptions[i];
          default:
            return '';
        }
      });
      values.forEach((value: string) => {
        updatedContent.push({
          request: this.keys[item['type']],
          action: 'Remove',
          content: value,
        });
      });
    });

    if (location) {
      updatedContent.push({
        request: 'proximity',
        action: 'Add',
        content: location['value'],
      });
    }

    this.isLoading$.next(true);
    this.campaignApi
      .updateCampaign(this.campaignDetails.id, {
        changes: updatedContent,
      })
      .pipe(
        finalize(() => {
          this.isLoading$.next(false);
        })
      )
      .subscribe((res) => {
        this.close(true);
      });
  }
}
