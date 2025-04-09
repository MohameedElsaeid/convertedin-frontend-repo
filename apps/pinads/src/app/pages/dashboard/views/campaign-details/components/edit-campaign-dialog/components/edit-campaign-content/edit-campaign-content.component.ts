import { Component, DestroyRef, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import {
  ControlContainer,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { CampaignDetails } from '@pinads/shared/api/campaign';
import { TranslateModule } from '@ngx-translate/core';
import { ControlErrorsModule } from '@convertedin/ui';
import { Observable, map, startWith, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'convertedin-edit-campaign-content',
  standalone: true,
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    MultiSelectModule,
    ReactiveFormsModule,
    TranslateModule,
    ControlErrorsModule,
  ],
  templateUrl: './edit-campaign-content.component.html',
  styleUrls: ['./edit-campaign-content.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class EditCampaignContentComponent implements OnInit {
  @Input() campaignDetails!: CampaignDetails;
  readonly MAX_HEADLINES_CHAR = 30;
  readonly MAX_DESCRIPTION_CHAR = 90;
  contentList!: { id: string; name: string }[];

  get formGroup() {
    return this.formGroupDirective.control;
  }

  get actionList() {
    const type = this.formGroup.get('type')!.value;
    return this.formGroup.get('actions')?.value[type];
  }
  keys: { [key: string]: keyof CampaignDetails } = {
    keyword: 'keywords',
    headline: 'headlines',
    description: 'descriptions',
  };

  get maxChar() {
    const type = this.formGroup.get('type')!.value;
    switch (type) {
      case 'headline':
        return this.MAX_HEADLINES_CHAR;
      case 'description':
        return this.MAX_DESCRIPTION_CHAR;
      default:
        return null;
    }
  }
  constructor(
    private formGroupDirective: FormGroupDirective,
    private destroyRef: DestroyRef
  ) {}
  ngOnInit(): void {
    this.getContentList();
  }
  getContentList() {
    this.formGroup
      .get('type')!
      .valueChanges.pipe(
        startWith(this.formGroup.get('type')!.value),
        map((type) =>
          this.campaignDetails[this.keys[type]].map((item: string,index:number) => ({
            id: index,
            name: item,
          }))
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((res) => {
        this.contentList = res;
      });
  }
}
