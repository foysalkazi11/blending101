import {
  RecipeBlendCategory,
  VersionDataType,
  Image,
  IngredientType,
  RecipeIdType,
} from "./recipeDetailsType";
import { RecipeBrandType, RecipeCreatorInfo } from "./recipeType";

export interface CompareRecipeType {
  isTemp?: boolean;
  addedToCompare: boolean;
  notes: number;
  userCollections: string[];
  defaultVersion: VersionDataType;
  allRecipes: boolean;
  isMatch: boolean;
  myRecipes: boolean;
  versionCount: number;
  personalRating?: number;
  recipeId: RecipeIdType;
}
