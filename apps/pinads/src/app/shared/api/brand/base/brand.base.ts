import { ApiResponse } from '@pinads/shared/models';
import { Observable } from 'rxjs';
import {
  AdCampaignMetrics,
  Brand,
  BrandLocation,
  UpdateBrandPayload,
} from '../models';

export abstract class BrandApi {
  /**
   * Retrieves all brands.
   *
   * @returns {Observable<ApiResponse<Brand[]>>} - An Observable that emits values of type `ApiResponse<Brand[]>`.
   */
  abstract getAllBrands(): Observable<ApiResponse<Brand[]>>;

  /**
   * Retrieves locations for a given brand.
   *
   * @param {string} brandId - The ID of the brand for which to retrieve locations.
   * @returns {Observable<ApiResponse<BrandLocation[]>>} - An Observable that emits values of type `ApiResponse<BrandLocation[]>`.
   */
  abstract getBrandLocations(
    brandId: string
  ): Observable<ApiResponse<BrandLocation[]>>;

  /**
   * Updates the data of a specific brand.
   *
   * @param {string} brandId - The ID of the brand to update.
   * @param {UpdateBrandPayload} brandData - The payload containing the data to update the brand.
   * @returns {Observable<ApiResponse<Brand>>} - An Observable that emits values of type `ApiResponse<Brand>`.
   */
  abstract updateBrand(
    brandId: string,
    brandData: UpdateBrandPayload
  ): Observable<ApiResponse<Brand>>;

  /**
   * Retrieves the active brand.
   *
   * @returns {Observable<ApiResponse<Brand>>} - An Observable that emits values of type `ApiResponse<Brand>`.
   */
  abstract getActiveBrand(): Observable<ApiResponse<Brand>>;

  /**
   * Retrieves brand metrics.
   *
   * @param {string} brandId - The ID of the brand to retrieve metrics for.
   * @returns {Observable<ApiResponse<AdCampaignMetrics>>} - An Observable that emits values of type `ApiResponse<AdCampaignMetrics>`.
   */
  abstract getBrandMetrics(
    brandId: string
  ): Observable<ApiResponse<AdCampaignMetrics>>;
}
