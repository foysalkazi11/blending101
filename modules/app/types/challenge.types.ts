import { RecipeCategory } from "@/recipe/recipe.types";
import { Ingredient, IngredientWithPortion } from "./ingredient.types";
import { Member } from "./misc.types";

interface TopIngredient {
  count?: number;
  ingredientId?: Ingredient;
}

interface SharedWith {
  blendScore?: number;
  canInviteWithOthers?: boolean;
  memberId?: Member;
}

// SCHEMA?: UserChallenge
export interface Challenge {
  _id?: string;
  canInviteWithOthers?: boolean;
  challengeName?: string;
  days?: number;
  description?: string;
  endDate?: string;
  hasCreatedByMe?: boolean;
  isActive?: boolean;
  memberId?: string;
  notification?: boolean;
  startDate?: string;
  startingDate?: string;
}

export interface ChallengeDay {
  _id?: string;
  assignDate?: string;
  date?: string;
  dayName?: string;
  disabled?: boolean;
  formattedDate?: string;
  images?: Image[];
  posts?: ChallengePost[];
}

export interface ChallengePost {
  _id?: string;
  docId?: string;
  images?: Image[];
  ingredients?: IngredientWithPortion[];
  name?: string;
  note?: string;
  recipeBlendCategory?: RecipeCategory;
  servingSize?: number;
  servings?: number;
}

export interface ChallengeInfo {
  _id?: string;
  blendScore?: number;
  challengeId?: string | null;
  challengeName?: string;
  currentStreak?: number;
  days?: number;
  daysRemaining?: number;
  endDate?: string;
  longestStreak?: number;
  memberInfo?: Member;
  sharedWith?: SharedWith[];
  startDate?: string;
  topIngredients?: TopIngredient[];
  totalChallengePosts?: number;
  viewOnly?: boolean;
}

// You may need to define the 'Member' type as appropriate for your schema

// API TYPES

export interface GetAllChallenges {
  getMyChallengeList?: Challenge[];
}

export interface Get30DaysChallenge {
  getMyThirtyDaysChallenge?: {
    challenge?: ChallengeDay[];
    challengeInfo?: ChallengeInfo;
  };
}

export interface Get7DaysChallenge {
  getLastSevenDaysChallenge?: {
    challenge?: ChallengeDay[];
    challengeInfo?: ChallengeInfo;
  };
}
