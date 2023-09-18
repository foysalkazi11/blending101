import { Calorie, GiGl } from "@/app/types/misc.types";
import { PublicRecipe, UserRecipe } from "../../recipe/recipe.types";

export interface Plan {
  _id: string;
  averageRating: number;
  calorie: Calorie;
  collections: string[];
  commentsCount: number;
  createdAt: string;
  description: string;
  endDateString: string;
  gigl: GiGl;
  image: Image;
  isGlobal: boolean;
  memberId: string;
  myRating: number;
  numberOfRating: number;
  planCollections: string[];
  planCollectionsDescription: PlanCollection[];
  planData: PlanItem[];
  planName: string;
  startDateString: string;
  totalRating: number;
  totalViews: number;
  updatedAt: string;
}

export interface MyPlanItem {
  _id?: string;
  day?: number;
  formatedDate?: string;
  memberId?: string;
  recipes: UserRecipe[];
}

export interface PlanItem {
  _id?: string;
  day: number;
  recipes: PublicRecipe[];
}

interface PlanCollection {
  _id: string;
  collectionDataCount: number;
  createdAt: string;
  description: string;
  image: string;
  memberId: string;
  name: string;
  plans: string[];
  slug: string;
  updatedAt: string;
}

interface CategoryPercentage {
  _id: string;
  count: number;
  name: string;
  percentage: number;
}

interface TopIngredientData {
  _id: string;
  count: number;
  featuredImage: string;
  name: string;
}

interface MacroMakeup {
  carbs: number;
  fats: number;
  protein: number;
}

// GET API TYPES
export interface GetAPlan {
  getAPlan: {
    plan: Plan;
    recipeCategoriesPercentage: CategoryPercentage[];
    topIngredients: TopIngredientData[];
    macroMakeup: MacroMakeup;
  };
}

export interface GetPlannerByWeek {
  getPlannerByDates: {
    planners: MyPlanItem[];
    recipeCategoriesPercentage: CategoryPercentage[];
    topIngredients: TopIngredientData[];
    macroMakeup: MacroMakeup;
    calorie: number;
    rxScore: number;
    netCarbs: number;
  };
}

export interface GetPlanInsights {
  getPlannerInsights: {
    calorie: number;
    macroMakeup: MacroMakeup;
    netCarbs: number;
    recipeCategoriesPercentage: CategoryPercentage[];
    topIngredients: TopIngredientData[];
  };
}
