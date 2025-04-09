import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { adCampaignImports } from './imports';
import {
  FormGroup,
  FormArray,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { CampaignApi, SuggestionPayload } from '@pinads/shared/api/campaign';
import { CampaignActions, campaignFeature } from '@pinads/store/campaign';
import { debounceTime, distinctUntilChanged, map, switchMap, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-ad-campaign',
  templateUrl: './ad-campaign.component.html',
  styleUrls: ['./ad-campaign.component.scss'],
  standalone: true,
  imports: adCampaignImports,
})
export class AdCampaignComponent implements OnInit, OnDestroy {
  @ViewChildren('descInput') descInput!: QueryList<ElementRef>;
  @ViewChildren('headlineInput') headlineInput!: QueryList<ElementRef>;

  @Output() onchangeState = new EventEmitter<boolean>();
  readonly MAX_HEADLINES_CHAR = 30;
  readonly MAX_DESCRIPTION_CHAR = 90;

  readonly MAX_HEADLINES_NUM = 15;
  readonly MAX_DESCRIPTION_NUM = 4;
  readonly MIN_HEADLINE_NUM = 3;
  readonly MIN_DESCRIPTION_NUM = 2;

  formGroup = new FormGroup({
    headlines: new FormArray<FormControl>(
      [this.getNewHeadlineControl()],
      [
        this.minLengthArray(
          this.MIN_HEADLINE_NUM,
          this.translate.instant('validations.headline.minCount')
        ),
        this.duplicatedContent(
          this.translate.instant('validations.duplicatedContent')
        ),
      ]
    ),
    description: new FormArray<FormControl>(
      [this.getNewDescriptionControl()],
      [
        this.minLengthArray(
          this.MIN_DESCRIPTION_NUM,
          this.translate.instant('validations.description.minCount')
        ),
        this.duplicatedContent(
          this.translate.instant('validations.duplicatedContent')
        ),
      ]
    ),
  });

  get headlinesArrayControls() {
    return this.formGroup.controls.headlines.controls as FormControl[];
  }
  get descriptionArrayControls() {
    return this.formGroup.controls.description.controls as FormControl[];
  }

  suggestionsHeadlines$ = this.store
    .select(campaignFeature.selectCampaignState)
    .pipe(
      take(1),
      switchMap((val) => {
        const suggestionPayload: SuggestionPayload = {
          proximity: val.proximity!,
          keywords: val.keywords!,
          lang_code: val.lang_code!,
          locations: val.locations!.map((item) => item.id),
          profile_location_id: val.locations[0].id,
        };
        if (val.brandInfo.website_url)
          suggestionPayload.website_url = val.brandInfo.website_url;
        if (val.brandInfo.phone_number)
          suggestionPayload.phone_number = val.brandInfo.phone_number;
        return this.campaignApi.getSuggestionsHeadlines(
          val.brand!.id,
          suggestionPayload
        );
      }),
      map((res) => res.data.headlines.slice(0, this.MAX_HEADLINES_NUM))
    );

  suggestionsDescriptions$ = this.store
    .select(campaignFeature.selectCampaignState)
    .pipe(
      take(1),
      switchMap((val) => {
        const suggestionPayload: SuggestionPayload = {
          proximity: val.proximity!,
          keywords: val.keywords!,
          lang_code: val.lang_code!,
          locations: val.locations!.map((item) => item.id),
          profile_location_id: val.locations[0].id,
        };
        if (val.brandInfo.website_url)
          suggestionPayload.website_url = val.brandInfo.website_url;
        if (val.brandInfo.phone_number)
          suggestionPayload.phone_number = val.brandInfo.phone_number;
        return this.campaignApi.getSuggestionsDescriptions(
          val.brand!.id,
          suggestionPayload
        );
      }),
      map((res) => res.data.descriptions.slice(0, this.MAX_DESCRIPTION_NUM))
    );

  constructor(
    private store: Store,
    private campaignApi: CampaignApi,
    private destroyRef: DestroyRef,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getInitialState();
    this.subscribeFormState();
    this.subscribeFormChanges();
  }
  getNewHeadlineControl(value: any = '') {
    return new FormControl(value, [
      RxwebValidators.maxLength({
        value: this.MAX_HEADLINES_CHAR,
        message: this.translate.instant('validations.headline.maxLength'),
      }),
      // this.duplicatedContent(
      //   'headlines',
      //   this.translate.instant('validations.duplicatedContent')
      // ),
    ]);
  }
  getNewDescriptionControl(value: any = '') {
    return new FormControl(value, [
      RxwebValidators.maxLength({
        value: this.MAX_DESCRIPTION_CHAR,
        message: this.translate.instant('validations.description.maxLength'),
      }),
    ]);
  }
  getInitialState() {
    this.store
      .select(campaignFeature.selectCampaignState)
      .pipe(take(1))
      .subscribe((val) => {
        if (val.headlines.length > 0)
          this.selectSuggestions('headlines', val.headlines);
        if (val.description.length > 0)
          this.selectSuggestions('description', val.description);
      });
  }
  subscribeFormState() {
    this.formGroup.statusChanges
      .pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((status) => {
        if (status === 'VALID') this.onchangeState.emit(true);
        else this.onchangeState.emit(false);
      });
  }
  subscribeFormChanges() {
    this.formGroup.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(300))
      .subscribe((val) => {
        this.store.dispatch(
          CampaignActions.setAdCampaignForm({
            description: val.description!.filter((val) => !!val),
            headlines: val.headlines!.filter((val) => !!val),
          })
        );
      });
  }
  selectSuggestions(controlName: ControlName, val: string[]) {
    this.formGroup.controls[controlName].clear();
    val.forEach((item) => {
      this.formGroup.controls[controlName].push(
        controlName === 'description'
          ? this.getNewDescriptionControl(item)
          : this.getNewHeadlineControl(item)
      );
    });
    this.formGroup.controls[controlName].markAllAsTouched();
    this.cdr.markForCheck();
  }

  removeControl(parentControlName: ControlName, index: number) {
    this.formGroup.controls[parentControlName].removeAt(index);
  }
  addNewInput(parentControlName: ControlName) {
    // set focus on new input
    let inputElements: QueryList<ElementRef>;
    if (parentControlName === 'description') {
      inputElements = this.descInput;
    } else {
      inputElements = this.headlineInput;
    }
    inputElements.changes
      .pipe(take(1))
      .subscribe((changes) => changes.last.nativeElement.focus());

    //add new input control
    this.formGroup.controls[parentControlName].push(
      parentControlName === 'description'
        ? this.getNewDescriptionControl()
        : this.getNewHeadlineControl()
    );
    this.formGroup.controls[parentControlName].markAsTouched();
  }
  minLengthArray(min: number, message: string) {
    return (c: AbstractControl): { [key: string]: any } | null => {
      if (c.value.filter((val: any) => !!val).length >= min) return null;

      return { MinLengthArray: { message } };
    };
  }

  duplicatedContent(message: string) {
    return (c: AbstractControl): { [key: string]: any } | null => {
      // Get the array of strings from the control's value
      const array: string[] = c.value;
      // Object to keep track of occurrences of each string
      const occurrences: any = {};
      // Array to store the indices of duplicate items
      let duplicateIndices: any[] = [];

      // Iterate through the array to count occurrences and store indices
      for (let i = 0; i < array.length; i++) {
        // Trim whitespace and convert to lowercase for case-insensitive comparison
        const item = array[i]?.trim().toLocaleLowerCase();
        if (!item) continue; // Skip empty items
        // Check if the item has been seen before
        if (occurrences[item]) {
          occurrences[item].count++; // Increment count
          occurrences[item].indices.push(i); // Add index to the list
        } else {
          // If not seen before, initialize count and indices
          occurrences[item] = { count: 1, indices: [i] };
        }
      }

      // Identify indices of items that have duplicates
      for (const key in occurrences) {
        if (occurrences[key].count > 1) {
          duplicateIndices = [...duplicateIndices, ...occurrences[key].indices];
        }
      }

      // Iterate through the form array controls
      (c as FormArray).controls.forEach((control, index) => {
        // If the index is in the list of duplicates, set an error
        if (duplicateIndices.includes(index)) {
          const error = control.errors ? control.errors : {};
          control.setErrors({
            ...error,
            DuplicatedContent: { message }, // Add custom error with the message
          });
        } else {
          // If no duplicates, check and clear any existing 'DuplicatedContent' error
          let errors = control.errors;
          if (errors) {
            delete errors['DuplicatedContent']; // Remove specific error
            if (Object.keys(errors).length === 0) errors = null; // Clear errors if none left
          }
          control.setErrors(errors);
        }
      });

      return null; // Return null as the validator doesn't return a specific result
    };
  }

  ngOnDestroy(): void {
    const formValue = this.formGroup.value;
    this.store.dispatch(
      CampaignActions.setAdCampaignForm({
        description: formValue.description!.filter((val) => !!val),
        headlines: formValue.headlines!.filter((val) => !!val),
      })
    );
  }
}
type ControlName = 'description' | 'headlines';
