import { BlendNutrient, Nutrient } from "./nutrient.types";

interface Portions {
  _id: string;
  default: boolean;
  measurement: string;
  measurement2: string;
  measurementWeight: string;
  sourceId: string;
}

interface SourceIngredient {
  _id: string;
  addedToBlend: boolean;
  blendStatus: string;
  category: string;
  classType: string;
  collections: string[];
  description: string;
  featuredImage: string;
  images: string[];
  ingredientId: string;
  ingredientName: string;
  nutrients: Nutrient[];
  portions: Portions[];
  publication_date: string;
  source: string;
  sourceCategory: string;
  sourceId: string;
}

// SCHEMA: BlendIngredientData
export interface Ingredient {
  _id: string;
  ingredientName: string;
  category: string;
  blendStatus: string;
  classType: string;
  description: string;
  varrient: string;
  srcFoodReference: SourceIngredient;
  blendNutrients: {
    blendNutrientRefference: BlendNutrient;
    value: string;
  };
  portions: Portions[];
  featuredImage: string;
  images: string[];
  collections: string[];
  gi: string;
  gl: string;
  netCarbs: string;
  rxScore: string;
  notBlendNutrients: Nutrient[];
}

// SCHEMA: IngredientData
export interface IngredientWithPortion {
  ingredientId: Ingredient;
  weightInGram: number;
  selectedPortion: {
    name: string;
    quantity: number;
    gram: number;
  };
  portions: {
    name: string;
    quantity: number;
    default: boolean;
    gram: number;
  }[];
  comment: string;
}
