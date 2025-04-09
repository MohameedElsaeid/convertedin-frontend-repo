import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { InputTextModule } from 'primeng/inputtext';
import { Store } from '@ngrx/store';
import { campaignFeature } from '@pinads/store/campaign';
import { SliderModule } from 'primeng/slider';
import { AbstractControl, FormsModule } from '@angular/forms';
import { take } from 'rxjs';
import { BrandLocation } from '@pinads/shared/api/brand';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-advertise-location',
  standalone: true,
  imports: [
    CommonModule,
    GoogleMapsModule,
    InputTextModule,
    SliderModule,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './advertise-location.component.html',
  styleUrls: ['./advertise-location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertiseLocationComponent implements AfterViewInit, OnDestroy {
  @ViewChild('addressText') addressTextInput!: ElementRef<HTMLInputElement>;
  @Input() control!: AbstractControl;
  readonly METER_TO_KILOMETER = 1000;
  readonly MICRO_DEGREE = 1000000;

  placesListener!: google.maps.MapsEventListener;

  mapCircleOptions: google.maps.CircleOptions = {
    visible: true,
    fillColor: '#f04438',
    fillOpacity: 0.3,
    strokeOpacity: 0,
  };
  mapOptions: google.maps.MapOptions = {
    fullscreenControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    zoom: 10,
  };
  mapMarkerOptions: google.maps.MarkerOptions = {
    draggable: false,
    clickable: false,
  };
  markerPosition: google.maps.LatLngLiteral | null = null;

  minArea = 5;
  maxArea = 65;
  areaValue = 5;
  addressValue!: string;
  get thumbPosition() {
    return (
      ((this.areaValue - this.minArea) / (this.maxArea - this.minArea)) * 100 +
      '%'
    );
  }
  constructor(
    private store: Store,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService
  ) {}

  ngAfterViewInit(): void {
    this.getInitialState();
    this.initialPlaceAutocomplete();
  }
  getInitialState() {
    const proximity = this.control.value;
    if (proximity) {
      this.markerPosition = {
        lat: proximity.latitude_in_micro_degrees / this.MICRO_DEGREE,
        lng: proximity.longitude_in_micro_degrees / this.MICRO_DEGREE,
      };
      this.areaValue = proximity.radius;
      this.addressValue = proximity.formatted_address!;
      this.cdr.detectChanges();
      return;
    }
    this.store
      .select(campaignFeature.selectCampaignState)
      .pipe(take(1))
      .subscribe((val) => {
        this.getDefaultBrandLocation(val.locations[0]);
      });
  }

  getDefaultBrandLocation(location: BrandLocation) {
    const { geo_address, postal_address } = location;
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
            this.addressValue = address.formatted_address;
            this.markerPosition = {
              lat: address.geometry.location.lat(),
              lng: address.geometry.location.lng(),
            };
            this.patchProximityValue();
            this.cdr.detectChanges();
          }
        }
      }
    );
  }

  private initialPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(
      this.addressTextInput.nativeElement,
      {
        componentRestrictions: { country: ['eg', 'us','sa'] },
        types: ['geocode'], // 'establishment' / 'address' / 'geocode'
      }
    );

    this.placesListener = google.maps.event.addListener(
      autocomplete,
      'place_changed',
      () => {
        const place = autocomplete.getPlace();
        this.markerPosition = place.geometry!.location!.toJSON();
        this.addressValue = place.formatted_address!;
        this.patchProximityValue();
        this.cdr.detectChanges();
      }
    );
  }
  patchProximityValue() {
    this.control.patchValue({
      latitude_in_micro_degrees: this.markerPosition!.lat * this.MICRO_DEGREE,
      longitude_in_micro_degrees: this.markerPosition!.lng * this.MICRO_DEGREE,
      radius_units: 'KILOMETERS',
      radius: this.areaValue,
      formatted_address: this.addressValue,
    });
  }
  onChangeArea(val: number) {
    if (this.markerPosition && this.areaValue != val) {
      this.areaValue = val;
      this.patchProximityValue();
      return
    }
    this.areaValue = val;
  }
  ngOnDestroy(): void {
    this.placesListener.remove();
  }
}

export type GeoCodePayloadQuery =
  | {
      location: google.maps.LatLng | google.maps.LatLngLiteral;
    }
  | { address: string };
