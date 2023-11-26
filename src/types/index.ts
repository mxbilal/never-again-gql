import { brandCategories } from "@/constants";

export type VariantOptions = "politician" | "celebrity";
export type BrandCategoryOptions = (typeof brandCategories)[number];

export interface PeopleCardProps {
  variant: VariantOptions;
  handleClick: () => void;
  category: any;
}

export interface PublicFigureCardProps {
  name: string;
  variant: VariantOptions;
  imageUrl: string;
  people: any;
}

export interface BrandCardProps {
  imageSrc: string;
  brandTitle: string;
  brand: { id: string; name: "string" };
  isApproved?: boolean;
}

export interface ApprovedBrandCardProps {
  imageSrc: string;
  brandTitle: string;
  brand: { id: string; name: "string" };
}

export interface CorporationCardProps {
  imageSrc: string;
  corporationTitle: string;
  corporation: { id: string; name: "string" };
}

export interface ProductCardProps {
  imageSrc: string;
  productTitle: string;
  brandTitle: string;
}

export interface BrandCategoryCardProps {
  variant: BrandCategoryOptions;
  isApproved?: boolean;
}

export interface SearchProps {
  isBrandSearch: boolean;
  onSearch: (value: string) => void;
}

export interface SocialsProps {
  facebookLink?: string;
  instagramLink?: string;
  twitterLink?: string;
}
