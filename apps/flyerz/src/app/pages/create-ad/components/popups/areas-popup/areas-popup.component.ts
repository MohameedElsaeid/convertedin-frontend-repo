import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '@flyerz/shared/components';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CheckboxModule } from 'primeng/checkbox';
import { SuggestionPopupContainerComponent } from '../suggestion-popup-container/suggestion-popup-container.component';
import {
  LocationItem,
  CreateAdApi,
  provideCreateAdApi,
  CountryItem,
} from '@flyerz/shared/api';
import { Observable, tap, finalize } from 'rxjs';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { CreateAdActions, selectAreas } from '@flyerz/store/create-ad';
import { PaginationService } from '@flyerz/shared/services';

@Component({
  selector: 'convertedin-areas-popup',
  standalone: true,
  imports: [
    CommonModule,
    CheckboxModule,
    SuggestionPopupContainerComponent,
    SpinnerComponent,
    FormsModule,
    InfiniteScrollModule,
  ],
  templateUrl: './areas-popup.component.html',
  styleUrls: ['./areas-popup.component.scss'],
  providers: [PaginationService, provideCreateAdApi()],
})
export class AreasPopupComponent implements OnInit {
  //#region Declerations
  areaIds: Array<number> = [];
  selectedAreas: Array<LocationItem> = [];
  isLoading: boolean = true;
  locations$!: Observable<{
    areas: LocationItem[];
    countries: CountryItem[];
  }>;
  title!: string;
  areas$!: Observable<{ data: Array<LocationItem> }>;
  get dir() {
    return document.documentElement.dir;
  }
  //#endregion

  constructor(
    private __createAdApi: CreateAdApi,
    private __dialogData: DynamicDialogConfig,
    private __dialogRef: DynamicDialogRef,
    private __dialog: DialogService,
    private __translate: TranslateService,
    private __store: Store,
    protected _pagination: PaginationService<LocationItem>
  ) {}

  ngOnInit(): void {
    this._pagination.init(undefined, '');
    this.getAreas();
    this.getCurrentLocations();
    this.title = this.__dialogData.data.title;
  }

  //#region Methods
  getCurrentLocations(): void {
    this.locations$ = this.__store.select(selectAreas).pipe(
      tap((data) => {
        this.areaIds = data.areas.map((item) => item.id);
        data && (this.selectedAreas = [...data.areas]);
      })
    );
  }

  getAreas(): void {
    if (!this._pagination.pagination.reachedTotalCount) {
      this.isLoading = true;
      this.areas$ = this.__createAdApi
        .getAreas(
          this.__dialogData.data.id,
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

  searchChanged(value: string): void {
    this._pagination.pagination.query = value;
    this._pagination.resetPagination();
    this.getAreas();
  }

  itemSelected(area: LocationItem): void {
    const index = this.selectedAreas.findIndex((item) => item.id === area.id);

    index === -1
      ? this.selectedAreas.push(area)
      : (this.selectedAreas = this.selectedAreas.filter(
          (item) => item.id !== area.id
        ));
  }

  saveSelections(): void {
    this.__store.dispatch(
      CreateAdActions.setAdAreas({ areas: this.selectedAreas })
    );

    this.__dialogRef.close();
  }

  goToCities(): void {
    import('../cities-popup/cities-popup.component').then((component) => {
      this.__dialog.open(component.CitiesPopupComponent, {
        header: this.__translate.instant('create-ad.ad-data.locations'),
        dismissableMask: false,
        styleClass: 'create-ad__suggestion-popup',
      });

      this.__dialogRef.close();
    });
  }
  //#endregion
}
