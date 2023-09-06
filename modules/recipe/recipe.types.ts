import { Brand } from "@/app/types/brand.types";
import { IngredientWithPortion } from "@/app/types/ingredient.types";

// SCHEMA: ProfileRecipeDesc, ProfileRecipe
export interface UserRecipe {
  addedToCompare: boolean;
  allRecipes: boolean;
  defaultVersion: Version;
  isMatch: boolean;
  myRecipes: boolean;
  notes: number;
  personalRating: number;
  recipeId: Recipe;
  sharedBy: ShareBy;
  tags: string[];
  turnedOffVersions: Version[];
  turnedOnVersions: Version[];
  userCollections: string[];
  versionsCount: number;
}

interface Recipe {
  _id: string;
  author: string[];
  averageRating?: number;
  brand: Brand;
  collections: string[];
  cookTime?: string;
  datePublished?: string;
  description?: string;
  discovery: boolean;
  favicon?: string;
  foodCategories: string[];
  image: {
    image: string;
    default: boolean;
  }[];
  mainEntityOfPage?: string;
  name: string;
  numberOfRating?: number;
  originalVersion: Version;
  prepTime?: string;
  recipeBlendCategory: RecipeCategory;
  recipeCuisines: string[];
  recipeIngredients: string[];
  recipeInstructions: string[];
  recipeYield?: string;
  scrappedByAdmin: boolean;
  seoCanonicalURL?: string;
  seoKeywords: string[];
  seoMetaDescription?: string;
  seoSiteMapPriority?: number;
  seoSlug?: string;
  seoTitle?: string;
  servingSize?: number;
  servings?: number;
  token?: string;
  totalRating?: number;
  totalTime?: string;
  totalViews?: number;
  url?: string;
  userId: Profile;
}

// SCHEMA: RecipeVersion
interface Version {
  _id: string;
  calorie: {
    value: number;
  };
  createdBy?: Profile;
  description?: string;
  errorIngredients: {
    ingredientId: string;
    qaId: string;
    errorString: string;
  }[];
  gigl: {
    totalGi: number;
    netCarbs: number;
    totalGL: number;
    rxScore: number;
  };
  ingredients: IngredientWithPortion[];
  postfixTitle?: string;
  recipeId?: string;
  recipeInstructions: string[];
  selectedImage?: string;
  servingSize?: number;
}

interface RecipeCategory {
  _id: string;
  canonicalURL: string;
  description: string;
  icon: string;
  image: string;
  isPublished: boolean;
  keywords: string[];
  metaDesc: string;
  name: string;
  siteMap: string;
  slug: string;
  title: string;
}

// SCHEMA: MemberProfileForRecipe
interface Profile {
  _id: string;
  displayName: string;
  email: string;
  firstName: string;
  image: string;
  lastName: string;
}

interface ShareBy {
  _id: string | null;
  displayName: string;
  email: string;
  firstName: string | null;
  image: string | null;
  lastName: string | null;
}
