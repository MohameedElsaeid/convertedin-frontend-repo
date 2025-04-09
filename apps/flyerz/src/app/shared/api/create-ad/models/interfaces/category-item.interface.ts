import { SuggestionItem } from './suggestion-item.interface';

export interface CategoryItem {
  categoryId: number;
  categoryName: string;
  categoryItems: Array<SuggestionItem>;
  subCategories?: Array<CategoryItem>;
}
