import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { SuggestionPopupContainerComponent } from '../suggestion-popup-container/suggestion-popup-container.component';
import { SpinnerComponent } from '@flyerz/shared/components';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {
  CountryItem,
  CreateAdApi,
  LocationItem,
  provideCreateAdApi,
} from '@flyerz/shared/api';
import { Observable, finalize, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Store } from '@ngrx/store';
import { CreateAdActions, selectCities } from '@flyerz/store/create-ad';
import { PaginationService } from '@flyerz/shared/services';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-cities-popup',
  standalone: true,
  imports: [
    CommonModule,
    CheckboxModule,
    SuggestionPopupContainerComponent,
    SpinnerComponent,
    FormsModule,
    InfiniteScrollModule,
    TranslateModule,
  ],
  templateUrl: './cities-popup.component.html',
  styleUrls: ['./cities-popup.component.scss'],
  providers: [PaginationService, provideCreateAdApi()],
})
export class CitiesPopupComponent implements OnInit {
  //#region Declerations
  cityIds: Array<number> = [];
  locations$!: Observable<{
    cities: LocationItem[];
    countries: CountryItem[];
  }>;
  isLoading: boolean = true;
  cities$!: Observable<{ data: Array<LocationItem> }>;
  selectAllCountry: boolean = false;
  selectedCities: Array<LocationItem> = [];
  get dir() {
    return document.documentElement.dir;
  }
  //#endregion

  constructor(
    private __createAdApi: CreateAdApi,
    private __dialog: DialogService,
    private __dialogRef: DynamicDialogRef,
    private __store: Store,
    protected _pagination: PaginationService<LocationItem>
  ) {}

  ngOnInit(): void {
    this._pagination.init(undefined, '');
    this.getCities();
    this.getCurrentLocations();
  }

  //#region Methods
  isCitySelected(id: number): boolean {
    return this.cityIds.includes(id);
  }

  getCurrentLocations(): void {
    this.locations$ = this.__store.select(selectCities).pipe(
      tap((data) => {
        this.cityIds = data.cities.map((item) => item.id);
        data && (this.selectedCities = [...data.cities]);
        this.selectAllCountry = data.countries.length > 0;
      })
    );
  }

  getCities(): void {
    if (!this._pagination.pagination.reachedTotalCount) {
      this.isLoading = true;
      this.cities$ = this.__createAdApi
        .getCities(
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
    this.getCities();
  }

  itemSelected(city: LocationItem): void {
    const index = this.selectedCities.findIndex((item) => item.id === city.id);

    index === -1
      ? this.selectedCities.push(city)
      : (this.selectedCities = this.selectedCities.filter(
          (item) => item.id !== city.id
        ));

    this.selectAllCountry = this.selectedCities.length === 0;
  }

  saveSelections(): void {
    this.__store.dispatch(
      CreateAdActions.setAdCities({ cities: this.selectedCities })
    );

    this.__dialogRef.close();
  }

  selectAll(value: boolean): void {
    if (value) {
      this.selectedCities = [];
      this.cityIds = [];
    }
  }

  getAreas(item: LocationItem): void {
    if (!this.cityIds.includes(item.id)) {
      import('../areas-popup/areas-popup.component').then((component) => {
        this.__dialog.open(component.AreasPopupComponent, {
          // header: this.title,
          data: {
            id: item.id,
            title: item.name,
          },
          dismissableMask: false,
          styleClass: 'create-ad__suggestion-popup',
        });

        this.__dialogRef.close();
      });
    }
  }
  //#endregion
}
