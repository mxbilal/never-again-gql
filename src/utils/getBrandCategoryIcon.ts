import { BrandCategoryOptions } from "@/types";

export const getBrandCategoryIcon = (variant: BrandCategoryOptions) => {
  switch (variant) {
    case "Car":
      return "fas fa-car fa-2xl";
    case "Food":
      return "fas fa-pizza-slice fa-2xl";
    case "Coffee":
      return "fas fa-coffee fa-2xl";
    case "Clothing":
      return "fas fa-tshirt fa-2xl";
    case "Weapons":
      return "fas fa-crosshairs fa-2xl";
    case "Technology":
      return "fas fa-laptop fa-2xl";
    case "Supermarket":
      return "fas fa-shopping-cart fa-2xl";
    case "Perfumes":
      return "fas fa-spray-can-sparkles fa-2xl";
    case "Politics":
      return "fas fa-flag fa-2xl";
    case "Pharmaceuticals":
      return "fas fa-pills fa-2xl";
    case "Manufacturer":
      return "fas fa-industry fa-2xl";
    case "Luxury":
      return "fas fa-gem fa-2xl";
    case "Insurance":
      return "fas fa-shield-alt fa-2xl";
    case "Household":
      return "fas fa-home fa-2xl";
    case "Education":
      return "fas fa-graduation-cap fa-2xl";
    case "Healthcare":
      return "fas fa-heart fa-2xl";
    case "Finance":
      return "fas fa-money-bill-wave fa-2xl";
    case "Fashion":
      return "fas fa-shopping-bag fa-2xl";
    case "Entertainment":
      return "fas fa-film fa-2xl";
    case "Drinks":
      return "fas fa-glass-martini fa-2xl";
    case "Cosmetics":
      return "fas fa-paint-brush fa-2xl";
    case "Contractor":
      return "fas fa-tools fa-2xl";
    case "Travel":
      return "fas fa-plane fa-2xl";
    case "Hotel":
      return "fas fa-hotel fa-2xl";
    default:
      return "fas fa-question fa-2xl";
  }
};
