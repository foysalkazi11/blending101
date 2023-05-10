import { RecipeCreatorInfo } from "./recipeType";

export interface RecipeDetailsType {
  addedToCompare: boolean;
  notes: number;
  userCollections: string[];
  defaultVersion: VersionDataType;
  allRecipes: boolean;
  isMatch: boolean;
  myRecipes: boolean;
  versionsCount: number;
  // recipeVersion: any[];
  // postfixTitle?: string;
  // versionId?: string;
  // originalVersion: VersionDataType;
  //isVersionActive: boolean;
  recipeId: {
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
    servingSize: string;
    servings: number;
    originalVersion: VersionDataType;
    token: string;
  };

  turnedOnVersions: VersionDataType[];
  turnedOffVersions: VersionDataType[];
  tempVersionInfo?: {
    // id: string;
    isShareAble: boolean;
    isOriginalVersion: boolean;
    version: VersionDataType;
  };
}

export interface VersionDataType {
  _id?: string;
  servingSize?: number;
  recipeId?: string;
  recipeInstructions?: any[];
  postfixTitle: string;
  description?: string;
  ingredients?: Ingredient[];
  selectedImage?: string;
  isVersionSharable?: boolean;
  isDefault?: boolean;
  calorie?: {
    value: number;
  };
  gigl?: {
    netCarbs: number;
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
