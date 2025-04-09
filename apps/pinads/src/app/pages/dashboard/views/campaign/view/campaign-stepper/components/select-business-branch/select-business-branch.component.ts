import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { selectBusinessBranchImports } from './imports';
import { BrandLocation } from '@pinads/shared/api/brand';
import { distinctUntilChanged, map, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { CampaignActions, campaignFeature } from '@pinads/store/campaign';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { GeoCodePayloadQuery } from '../targeting/components';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-select-business-branch',
  templateUrl: './select-business-branch.component.html',
  styleUrls: ['./select-business-branch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: selectBusinessBranchImports,
  providers: [],
})
export class SelectBusinessBranchComponent implements OnInit, OnDestroy {
  @Output() onchangeState = new EventEmitter<boolean>();

  formGroup = new FormGroup({
    locations: new FormControl<string[]>(
      [],
      RxwebValidators.minLength({ value: 1 })
    ),
    phone_number: new FormControl(''),
    website_url: new FormControl(''),
  });

  defaultLocation!: BrandLocation;

  constructor(
    private store: Store,
    private destroyRef: DestroyRef,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getInitialState();
    this.getBrandLocations();
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
      .subscribe((val) => {
        const { phone_number, website_url } =
          Object.keys(val.brandInfo).length === 0
            ? val.locations[0]
            : val.brandInfo;
        this.formGroup.patchValue({
          locations: val.locations.map((item) => item.id),
          phone_number: phone_number,
          website_url: website_url,
        });
        this.onchangeState.emit(true);
      });
  }

  getBrandLocations() {
    this.store
      .select(campaignFeature.selectCampaignState)
      .pipe(take(1))
      .subscribe((state) => {
        if (state.locations.length > 0) {
          this.defaultLocation = state.locations[0];
          if (!this.defaultLocation.location) this.getLocation();
        }
        this.cdr.markForCheck();
      });
  }

  getLocation() {
    const { geo_address, postal_address } = this.defaultLocation;
    if (postal_address) {
      const address = `${postal_address.addressLines.join(', ')}, ${
        postal_address.locality
      }, ${postal_address.postalCode}, ${postal_address.regionCode}`;
      this.getAddressDetails({ address });
    } else {
      if (geo_address) {
        const location = {
          lat: geo_address.latitude,
          lng: geo_address.longitude,
        };
        this.getAddressDetails({ location });
      }
    }
  }
  getAddressDetails(queryObj: GeoCodePayloadQuery) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      { ...queryObj, language: this.translate.currentLang },
      (results, status) => {
        if (status === 'OK' && results) {
          if (results[0]) {
            const address = results[0];
            this.defaultLocation = {
              ...this.defaultLocation,
              location: address.formatted_address,
            };
            this.store.dispatch(
              CampaignActions.setLocations({
                locations: [this.defaultLocation],
              })
            );
            this.cdr.markForCheck();
          }
        }
      }
    );
  }
  ngOnDestroy(): void {
    this.store.dispatch(
      CampaignActions.setBranchInfo({
        brandInfo:{
          website_url: this.formGroup.value.website_url!,
          phone_number: this.formGroup.value.phone_number!,
        }
      })
    );
  }
}
