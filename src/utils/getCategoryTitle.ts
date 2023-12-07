import { VariantOptions, BrandCategoryOptions } from "@/types";

export const getCategoryTitle = (peopleOrBrand: 'people' | 'brand', variant: VariantOptions | BrandCategoryOptions) => {
  if (peopleOrBrand === 'people') {
    if (variant === 'celebrity') {
      return 'Celebrity [Sellouts]';
    } else {
      return 'Politician [Liars]';
    }
  } else {
    const brandCategory = variant as BrandCategoryOptions;
    return brandCategory;
  }
};
