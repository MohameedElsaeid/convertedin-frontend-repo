import { Component, OnInit } from '@angular/core';
import { behaviourPopupImports } from './imports';
import {
  CategoryItem,
  SuggestionItem,
  CreateAdApi,
  provideCreateAdApi,
} from '@flyerz/shared/api';
import {
  CreateAdActions,
  selectAdSuggestionsBehaviours,
} from '@flyerz/store/create-ad';
import { Store } from '@ngrx/store';
import { Observable, tap, finalize } from 'rxjs';
import { PaginationService } from '@flyerz/shared/services';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'convertedin-behaviour-popup',
  standalone: true,
  imports: behaviourPopupImports,
  templateUrl: './behaviour-popup.component.html',
  styleUrls: ['./behaviour-popup.component.scss'],
  providers: [PaginationService, provideCreateAdApi()],
})
export class BehaviourPopupComponent implements OnInit {
  //#region Declerations
  behaviours: Array<number> = [];
  behaviours$!: Observable<{ data: Array<CategoryItem> }>;
  currentBehaviours$!: Observable<SuggestionItem[] | undefined>;
  isLoading: boolean = true;
  selectedBehaviours: Array<SuggestionItem> = [];
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
    this.getCurrentBehaviours();
    this.getBehaviours();
  }

  //#region Methods
  getBehaviours(): void {
    if (!this._pagination.pagination.reachedTotalCount) {
      this.isLoading = true;
      this.behaviours$ = this.__createAdApi
        .getBehaviours(
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

  getCurrentBehaviours(): void {
    this.currentBehaviours$ = this.__store
      .select(selectAdSuggestionsBehaviours)
      .pipe(
        tap((data) => {
          this.behaviours = data!.map((item) => item.id);
          this.selectedBehaviours = [...data!];
        })
      );
  }

  saveChanges(): void {
    this.__store.dispatch(
      CreateAdActions.setBehaviourSuggestion({ items: this.selectedBehaviours })
    );

    this.__dialogRef.close();
  }

  itemSelected(suggestion: SuggestionItem): void {
    const index = this.selectedBehaviours.findIndex(
      (item) => item.id === suggestion.id
    );

    index === -1
      ? this.selectedBehaviours.push(suggestion)
      : (this.selectedBehaviours = this.selectedBehaviours.filter(
          (item) => item.id !== suggestion.id
        ));
  }

  searchChanged(value: string): void {
    this._pagination.pagination.query = value;
    this._pagination.resetPagination();
    this.getBehaviours();
  }
  //#endregion
}
