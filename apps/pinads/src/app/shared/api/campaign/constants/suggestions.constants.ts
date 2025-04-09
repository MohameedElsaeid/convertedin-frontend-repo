import { ApiConstants } from '@pinads/shared/constants/api/api.constant';

export class SuggestionEndpoints {
  /**
   * The get Suggestions keyword endpoint URL.
   */
  static readonly GET_KEYWORDS = (brandId: string) =>
    ApiConstants.INITIAL +
    ApiConstants.VERSION(1) +
    `/brands/${brandId}/suggestions/keywords`;

  /**
   * The get Suggestions headlines endpoint URL.
   */
  static readonly GET_HEADLINES = (brandId: string) =>
    ApiConstants.INITIAL +
    ApiConstants.VERSION(1) +
    `/brands/${brandId}/suggestions/headlines`;
  /**
   * The get Suggestions descriptions endpoint URL.
   */
  static readonly GET_DESCRIPTIONS = (brandId: string) =>
    ApiConstants.INITIAL +
    ApiConstants.VERSION(1) +
    `/brands/${brandId}/suggestions/descriptions`;

  /**
   * The get Suggestions budgets endpoint URL.
   */
  static readonly GET_BUDGETS = (brandId: string) =>
    ApiConstants.INITIAL +
    ApiConstants.VERSION(1) +
    `/brands/${brandId}/suggestions/budgets`;

  static readonly GET_PINADS_SUGGESTIONS = (brandId: string) =>
    ApiConstants.INITIAL +
    ApiConstants.VERSION(1) +
    `/categories/keywords/${brandId}`;
}
