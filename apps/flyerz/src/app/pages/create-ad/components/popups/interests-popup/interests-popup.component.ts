import { Component, OnInit } from '@angular/core';
import {
  CreateAdApi,
  SuggestionItem,
  provideCreateAdApi,
} from '@flyerz/shared/api';
import { Observable, finalize, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  CreateAdActions,
  selectAdSuggestionsInterests,
} from '@flyerz/store/create-ad';
import { interestsPopupImports } from './imports';
import { PaginationService } from '@flyerz/shared/services';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'convertedin-interests-popup',
  standalone: true,
  imports: interestsPopupImports,
  templateUrl: './interests-popup.component.html',
  styleUrls: ['./interests-popup.component.scss'],
  providers: [PaginationService, provideCreateAdApi()],
})
export class InterestsPopupComponent implements OnInit {
  //#region Declerations
  interests: Array<number> = [];
  isLoading: boolean = true;
  interests$!: Observable<{ data: Array<SuggestionItem> }>;
  selectedInterests: Array<SuggestionItem> = [];
  currentInterests$!: Observable<SuggestionItem[] | undefined>;
  //#endregion

  constructor(
    private __createAdApi: CreateAdApi,
    private __store: Store,
    private __dialogRef: DynamicDialogRef,
    protected _pagination: PaginationService<SuggestionItem>
  ) {}

  ngOnInit(): void {
    this._pagination.init(undefined, '');
    this.getInterests();
    this.getCurrentInterests();
  }

  //#region Methods
  getInterests(): void {
    if (!this._pagination.pagination.reachedTotalCount) {
      this.isLoading = true;
      this.interests$ = this.__createAdApi
        .getInterests(
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

  getCurrentInterests(): void {
    this.currentInterests$ = this.__store
      .select(selectAdSuggestionsInterests)
      .pipe(
        tap((data) => {
          this.interests = data!.map((item) => item.id);
          this.selectedInterests = [...data!];
        })
      );
  }

  saveChanges(): void {
    this.__store.dispatch(
      CreateAdActions.setInterestSuggestion({
        items: this.selectedInterests,
      })
    );

    this.__dialogRef.close();
  }

  itemSelected(suggestion: SuggestionItem): void {
    const index = this.selectedInterests.findIndex(
      (item) => item.id === suggestion.id
    );

    index === -1
      ? this.selectedInterests.push(suggestion)
      : (this.selectedInterests = this.selectedInterests.filter(
          (item) => item.id !== suggestion.id
        ));
  }
  searchChanged(value: string): void {
    this._pagination.pagination.query = value;
    this._pagination.resetPagination();
    this.getInterests();
  }
  //#endregion
}
