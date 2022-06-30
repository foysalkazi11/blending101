export interface RecipeType {
  datePublished: null;
  name: string;
  recipeIngredients: string[];
  recipeBlendCategory: RecipeBlendCategory;
  testIngredient: any[];
  image: any[];
  description: string;
  prepTime: null;
  cookTime: null;
  totalTime: null;
  _id: string;
  url: null;
  favicon: null;
  averageRating: number;
  numberOfRating: number;
  ingredients: Ingredient[];
  notes: number;
  addedToCompare: boolean;
  userCollections: string[];
  defaultVersion: DefaultVersion;
  isMatch: boolean;

  carbs: number;
  score: number;
  calorie: number;
}

export interface DefaultVersion {
  postfixTitle: string;
}

export interface Ingredient {
  ingredientId: IngredientID;
}

export interface IngredientID {
  _id: string;
  ingredientName: string;
}

export interface RecipeBlendCategory {
  name: string;
}
