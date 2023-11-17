import { brandCategories } from "@/constants";

export type VariantOptions = "politician" | "celebrity";
export type BrandCategoryOptions = (typeof brandCategories)[number];

export interface PeopleCardProps {
  variant: VariantOptions;
  handleClick: () => void;
  category: any
}

export interface PublicFigureCardProps {
  name: string;
  variant: VariantOptions;
  imageUrl: string;
  people: any
}

export interface BrandCardProps {
  imageSrc: string;
  brandTitle: string;
  brand: { id: string; name: "string" };
}

export interface BrandCategoryCardProps {
  variant: BrandCategoryOptions;
}

export interface SearchProps {
  isBrandSearch: boolean;
  onSearch: (value: string) => void;
}
