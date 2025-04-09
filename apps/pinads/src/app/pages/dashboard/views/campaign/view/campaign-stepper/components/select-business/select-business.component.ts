import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  HostBinding,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { selectBusinessImports } from './imports';
import {
  BrandApi,
  BrandLocation,
  provideBrandService,
} from '@pinads/shared/api/brand';
import {
  BehaviorSubject,
  Observable,
  distinctUntilChanged,
  finalize,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { CampaignActions, campaignFeature } from '@pinads/store/campaign';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'convertedin-select-business',
  templateUrl: './select-business.component.html',
  styleUrls: ['./select-business.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: selectBusinessImports,
  providers: [provideBrandService()],
})
export class SelectBusinessComponent implements OnInit, OnDestroy {
  @HostBinding('class') styleClass = 'flex flex-column';
  @Output() onchangeState = new EventEmitter<boolean>();

  businessList$!: Observable<BrandLocation[]>;
  formGroup = new FormGroup({
    locations: new FormControl<string>('', RxwebValidators.required()),
  });
  selectedBrand!: BrandLocation;
  isLoading$ = new BehaviorSubject(false);
  constructor(
    private brandApi: BrandApi,
    private store: Store,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.getInitialState();
    this.getBrandList();
    this.subscribeFormState();
  }
  subscribeFormState() {
    this.formGroup.statusChanges
      .pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((status) => {
        if (status === 'VALID') this.onchangeState.emit(true);
        else this.onchangeState.emit(false);
      });
  }
  getInitialState() {
    this.store
      .select(campaignFeature.selectCampaignState)
      .pipe(take(1))
      .subscribe((state) => {
        if (state.locations.length > 0) {
          this.selectedBrand = state.locations[0];
          this.formGroup.patchValue({ locations: state.locations[0].id });
        }
      });
  }

  onSelectBusiness(brand: BrandLocation) {
    this.selectedBrand = brand;
  }

  getBrandList() {
    this.isLoading$.next(true);
    this.businessList$ = this.brandApi.getActiveBrand().pipe(
      tap((res) => {
        this.store.dispatch(CampaignActions.setBrand({ brand: res.data }));
      }),
      switchMap((res) =>
        this.brandApi.getBrandLocations(res.data.id).pipe(
          finalize(() => {
            this.isLoading$.next(false);
          })
        )
      ),
      map((res) => res.data)
    );

    // this.businessList$ = this.brandApi
    //   .getAllBrands()
    //   .pipe(map((res) => res.data));
    //  this.store
    //   .select(campaignFeature.selectBrandList)
    //   .pipe(
    //     take(1),
    //     switchMap(() =>
    //       this.brandApi.getAllBrands().pipe(map((res) => res.data))
    //     )
    //   )
    //   .subscribe((res) => {
    //     // this.store.dispatch(CampaignActions.getBrandList({ brandList: res }));
    //   });
  }
  ngOnDestroy(): void {
    this.store.dispatch(
      CampaignActions.setLocations({ locations: [this.selectedBrand] })
    );
  }
}
