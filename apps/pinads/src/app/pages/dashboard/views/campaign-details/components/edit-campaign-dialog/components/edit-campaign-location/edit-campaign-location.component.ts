import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { BrandLocation } from '@pinads/shared/api/brand';

@Component({
  selector: 'convertedin-edit-campaign-location',
  standalone: true,
  imports: [
    CommonModule,
    GoogleMapsModule,
    InputTextModule,
    SliderModule,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './edit-campaign-location.component.html',
  styleUrls: ['./edit-campaign-location.component.scss'],
})
export class EditCampaignLocationComponent implements AfterViewInit, OnDestroy {
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
    private cdr: ChangeDetectorRef,
    private translate: TranslateService
  ) {}

  ngAfterViewInit(): void {
    this.getInitialState();
    this.initialPlaceAutocomplete();
  }
  getInitialState() {
    const proximity = this.control.value;
      this.markerPosition = {
        lat: proximity.latitude_in_micro_degrees / this.MICRO_DEGREE,
        lng: proximity.longitude_in_micro_degrees / this.MICRO_DEGREE,
      };
      this.areaValue = proximity.radius;
      this.cdr.detectChanges();
      this.getAddressDetails({ location:this.markerPosition });
    
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
        componentRestrictions: { country: ['eg', 'us', 'sa'] },
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
      return;
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
