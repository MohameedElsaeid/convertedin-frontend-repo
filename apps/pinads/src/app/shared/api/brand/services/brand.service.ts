import { ApiResponse } from '@pinads/shared/models';
import { Observable } from 'rxjs';
import { BrandApi } from '../base/brand.base';
import { AdCampaignMetrics, Brand, BrandLocation, UpdateBrandPayload } from '../models';
import { QueryApi } from '@convertedin/api';
import { BrandEndpoints } from '../constants/brand.constants';
import { Injectable } from '@angular/core';

@Injectable()
export class BrandService extends BrandApi {
 
  constructor(private __queryApi: QueryApi) {
    super();
  }
  override getAllBrands(): Observable<ApiResponse<Brand[]>> {
    return this.__queryApi.get(BrandEndpoints.GET_BRANDS);
  }
  override getBrandLocations(
    brandId: string
  ): Observable<ApiResponse<BrandLocation[]>> {
    return this.__queryApi.get(BrandEndpoints.GET_BRAND_LOCATIONS(brandId));
  }

  override updateBrand(
    brandId: string,
    brandData: UpdateBrandPayload
  ): Observable<ApiResponse<Brand>> {
    return this.__queryApi.post(
      BrandEndpoints.GET_BRAND_LOCATIONS(brandId),
      brandData
    );
  }

  override getActiveBrand(): Observable<ApiResponse<Brand>> {
    return this.__queryApi.get(BrandEndpoints.GET_ACTIVE_BRAND);
  }

  override getBrandMetrics(brandId:string): Observable<ApiResponse<AdCampaignMetrics>> {
    return this.__queryApi.get(BrandEndpoints.GET_BRAND_METRICS(brandId));
  }
}
