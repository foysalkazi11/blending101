import { UserRecipe } from "../recipe/recipe.types";

// Signle Recipe under each plan day
export interface PlanRecipe {
  id: string;
  name: string;
  category: string;
  calorie: number;
  rxScore: number;
  price: number;
}

// Single day of the plan list
export interface Plan {
  day: number;
  recipes: UserRecipe[];
}

export default Plan;
