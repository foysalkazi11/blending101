import { createSlice } from "@reduxjs/toolkit";

export type IPlannerRecipe = {
  _id: string;
  name: string;
  category: string;
  rxScore: number;
  calorie: number;
};

type IPlanner = {
  date: string;
  recipes: IPlannerRecipe[];
};

interface PlannerState {
  planners: IPlanner[];
}

const initialState: PlannerState = {
  planners: [],
};

export const PlannerSlice = createSlice({
  name: "Planner",
  initialState,
  reducers: {
    setPlanners: (state, action: { payload: IPlanner[] }) => {
      state.planners = action.payload;
    },
    addPlanner: (
      state,
      action: { payload: { date: string; recipe: IPlannerRecipe } },
    ) => {
      const date = action.payload.date;
      const planner = state.planners.find((p) => p.date === date);
      if (planner) {
        planner.recipes.push(action.payload.recipe);
      } else {
        state.planners.push({
          date,
          recipes: [action.payload.recipe],
        });
        state.planners.sort(
          //@ts-ignore
          (a: any, b: any) => new Date(a.date) - new Date(b.date),
        );
      }
    },
    deleteRecipeFromPlanner: (
      state,
      action: { payload: { recipeId: string; plannerId: string } },
    ) => {
      const plannerIdx = state.planners.findIndex(
        (p) => p.date === action.payload.plannerId,
      );
      const recipe = state.planners[plannerIdx].recipes.filter(
        (recipe) => recipe._id !== action.payload.recipeId,
      );
      console.log(recipe);
      if (recipe.length === 0) {
        state.planners.splice(plannerIdx, 1);
      } else {
        state.planners[plannerIdx] = {
          ...state.planners[plannerIdx],
          recipes: recipe,
        };
      }
    },
  },
});

export const { addPlanner, deleteRecipeFromPlanner } = PlannerSlice.actions;

export default PlannerSlice.reducer;
