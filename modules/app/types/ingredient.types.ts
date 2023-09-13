import { BlendNutrient, Nutrient } from "./nutrient.types";

// SCHEMA?: BlendPortion
export interface Portions {
  _id?: string;
  default?: boolean;
  measurement?: string;
  measurement2?: string;
  measurementWeight?: string;
  sourceId?: string;
}

// SCHEMA?: ReturnPortion
export interface IngredientPortion {
  name?: string;
  quantity?: number;
  default?: boolean;
  gram?: number;
}

interface SourceIngredient {
  _id?: string;
  addedToBlend?: boolean;
  blendStatus?: string;
  category?: string;
  classType?: string;
  collections?: string[];
  description?: string;
  featuredImage?: string;
  images?: string[];
  ingredientId?: string;
  ingredientName?: string;
  nutrients?: Nutrient[];
  portions?: Portions[];
  publication_date?: string;
  source?: string;
  sourceCategory?: string;
  sourceId?: string;
}

// SCHEMA?: BlendIngredientData
export interface Ingredient {
  _id?: string;
  ingredientName?: string;
  category?: string;
  blendStatus?: string;
  classType?: string;
  description?: string;
  varrient?: string;
  srcFoodReference?: SourceIngredient;
  blendNutrients?: {
    blendNutrientRefference?: BlendNutrient;
    value?: string;
  };
  portions?: Portions[];
  featuredImage?: string;
  images?: string[];
  collections?: string[];
  gi?: string;
  gl?: string;
  netCarbs?: string;
  rxScore?: string;
  notBlendNutrients?: Nutrient[];
}

// SCHEMA?: IngredientData
export interface IngredientWithPortion {
  ingredientId?: Ingredient;
  weightInGram?: number;
  selectedPortion?: {
    name?: string;
    quantity?: number;
    gram?: number;
  };
  quantityString?: string;
  portions?: IngredientPortion[];
  comment?: string;
  errorString?: string;
}
