import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SliderModule } from 'primeng/slider';
import { ButtonModule } from 'primeng/button';
import { Observable, Subject, debounceTime, takeUntil, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { CreateAdActions, selectAudiance } from '@flyerz/store/create-ad';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DropdownItem } from '@flyerz/shared/models/interfaces';
import { Genders } from '@flyerz/shared/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'convertedin-genders-popup',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    SliderModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './genders-popup.component.html',
  styleUrls: ['./genders-popup.component.scss'],
})
export class GendersPopupComponent implements OnInit, OnDestroy {
  //#region Declerations
  @HostBinding('class') class = 'flex flex-column gap-5';
  readonly minAge: number = 18;
  readonly maxAge: number = 65;

  private __unsubscriber: Subject<void> = new Subject();
  targetAudiance$!: Observable<{
    minimumAge: number | undefined;
    maximumAge: number | undefined;
    gender: string | string[] | undefined;
  }>;
  genders: Array<DropdownItem> = [
    {
      label: 'create-ad.audiance-popup.male',
      value: Genders.MALE,
    },
    {
      label: 'create-ad.audiance-popup.female',
      value: Genders.FEMALE,
    },
    {
      label: 'create-ad.audiance-popup.both',
      value: Genders.BOTH,
    },
  ];
  activeGender!: string;
  form: FormGroup = this.__formBuilder.group({
    ageRange: [],
  });
  //#endregion

  constructor(
    private __store: Store,
    private __formBuilder: FormBuilder,
    private __dialog: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.getAudianceData();
    this.formChanges();
  }

  ngOnDestroy(): void {
    this.__unsubscriber.complete();
    this.__unsubscriber.next();
  }

  //#region Methods
  getAudianceData(): void {
    this.targetAudiance$ = this.__store.select(selectAudiance).pipe(
      tap((data) => {
        this.activeGender = data.gender as string;

        if (!this.form.value?.ageRange) {
          this.form.controls['ageRange'].setValue(
            data.minimumAge
              ? [data.minimumAge, data.maximumAge]
              : [this.minAge, this.maxAge]
          );
        }
      })
    );
  }

  formChanges(): void {
    this.form.valueChanges
      .pipe(debounceTime(1000), takeUntil(this.__unsubscriber))
      .subscribe(() => {
        this.__store.dispatch(
          CreateAdActions.updateAdAudianceAge({
            minimumAge: this.form.value?.ageRange[0],
            maximumAge: this.form.value?.ageRange[1],
          })
        );
      });
  }

  closeDialog(): void {
    this.__dialog.close();
  }

  updateGender(gender: Genders): void {
    this.activeGender = gender;
    this.__store.dispatch(CreateAdActions.updateAdAudianceGender({ gender }));
  }
  //endregion
}
