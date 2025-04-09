import { Component, OnInit } from '@angular/core';
import {
  CategoryItem,
  CreateAdApi,
  SuggestionItem,
  provideCreateAdApi,
} from '@flyerz/shared/api';
import { Observable, finalize, tap } from 'rxjs';
import { demographicPopupImports } from './imports';
import { Store } from '@ngrx/store';
import {
  CreateAdActions,
  selectAdSuggestionsDemographics,
} from '@flyerz/store/create-ad';
import { PaginationService } from '@flyerz/shared/services';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'convertedin-demographic-popup',
  standalone: true,
  imports: demographicPopupImports,
  templateUrl: './demographic-popup.component.html',
  styleUrls: ['./demographic-popup.component.scss'],
  providers: [PaginationService, provideCreateAdApi()],
})
export class DemographicPopupComponent implements OnInit {
  //#region Declerations
  demographics: Array<number> = [];
  demographics$!: Observable<{ data: Array<CategoryItem> }>;
  currentDemograpics$!: Observable<SuggestionItem[] | undefined>;
  selectedDemographics: Array<SuggestionItem> = [];
  isLoading: boolean = true;
  get dir() {
    return document.documentElement.dir;
  }
  //#endregion

  constructor(
    private __store: Store,
    private __createAdApi: CreateAdApi,
    private __dialogRef: DynamicDialogRef,
    protected _pagination: PaginationService<CategoryItem>
  ) {}

  ngOnInit(): void {
    this._pagination.init(undefined, '');
    this.getCurrentDemographics();
    this.getDemographics();
  }

  //#region Methods
  getDemographics(): void {
    if (!this._pagination.pagination.reachedTotalCount) {
      this.isLoading = true;
      this.demographics$ = this.__createAdApi
        .getDemographics(
          this._pagination.pagination.offset,
          this._pagination.pagination.limit,
          this._pagination.pagination.query
        )
        .pipe(
          tap(({ data }) => {
            this._pagination.processData(data);
          }),
          finalize(() => {
            this.isLoading = false;
          })
        );
    }
  }

  getCurrentDemographics(): void {
    this.currentDemograpics$ = this.__store
      .select(selectAdSuggestionsDemographics)
      .pipe(
        tap((data) => {
          this.demographics = data!.map((item) => item.id);
          this.selectedDemographics = [...data!];
        })
      );
  }

  saveChanges(): void {
    this.__store.dispatch(
      CreateAdActions.setDemographicSuggestion({
        items: this.selectedDemographics,
      })
    );

    this.__dialogRef.close();
  }

  itemSelected(suggestion: SuggestionItem): void {
    const index = this.selectedDemographics.findIndex(
      (item) => item.id === suggestion.id
    );

    index === -1
      ? this.selectedDemographics.push(suggestion)
      : (this.selectedDemographics = this.selectedDemographics.filter(
          (item) => item.id !== suggestion.id
        ));
  }

  searchChanged(value: string): void {
    this._pagination.pagination.query = value;
    this._pagination.resetPagination();
    this.getDemographics();
  }
  //#endregion
}
