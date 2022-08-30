import { RecipeCreatorInfo } from "./recipeType";

export interface RecipeDetailsType {
  _id: string;
  userId: RecipeCreatorInfo;
  name: string;
  prepTime: any;
  description: string;
  versionDiscription: string;
  recipeIngredients: any[];
  recipeInstructions: string[];
  totalRating: number;
  numberOfRating: number;
  averageRating: number;
  totalViews: number;
  recipeBlendCategory: RecipeBlendCategory;
  ingredients: Ingredient[];
  image: Image[];
  servingSize: number;
  addedToCompare: boolean;
  notes: number;
  servings: number;
  recipeVersion: any[];
  userCollections: string[];
  versionId?: string;
  postfixTitle?: string;
  defaultVersion: {
    _id: string;
    servingSize: number;
    recipeId: string;
    recipeInstructions: any[];
    postfixTitle: string;
    description: string;
    ingredients: Ingredient[];
  };
  originalVersion: {
    _id: string;
    servingSize: number;
    recipeId: string;
    recipeInstructions: any[];
    postfixTitle: string;
    description: string;
    ingredients: Ingredient[];
  };
}

export interface RecipeBlendCategory {
  name: string;
  _id: string;
}

export interface Ingredient {
  ingredientId: IngredientId;
  portions: Portion[];
  weightInGram: number;
  selectedPortion: SelectedPortion;
}

export interface IngredientId {
  ingredientName: string;
  _id: string;
  images: string[];
  featuredImage?: string;
}

export interface Portion {
  name: string;
  gram: number;
  default: boolean;
  quantity: any;
}

export interface SelectedPortion {
  name: string;
  quantity: number;
  gram: number;
}

export interface Image {
  image: string;
  default: boolean;
}
