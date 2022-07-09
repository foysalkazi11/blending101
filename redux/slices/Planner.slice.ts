import { createSlice } from "@reduxjs/toolkit";

export type IPlannerRecipe = {
  _id: string;
  name: string;
  category: string;
  rxScore: number;
  calorie: number;
};

type IPlanner = {
  id: string;
  date: string;
  recipes: IPlannerRecipe[];
};

export interface IPlannerIngredients {
  ingredientId: { _id: string; ingredientName: string };
  selectedPortion: {
    name: string;
    quantity: number;
    gram: number;
  };
}

interface PlannerState {
  planners: IPlanner[];
  post: {
    recipe: {
      _id: string;
      name: string;
      image: string;
      ingredients: IPlannerIngredients[];
    };
  };
}

const initialState: PlannerState = {
  planners: [
    // {
    //   date: "2022-07-08T18:00:00.000Z",
    //   recipes: [
    //     {
    //       _id: "6214dd3b5523d9802418b075",
    //       name: "smoothie",
    //       category: "Smoothie",
    //       rxScore: 786,
    //       calorie: 250,
    //     },
    //   ],
    // },
  ],
  post: {
    recipe: {
      _id: "",
      name: "",
      image: "",
      ingredients: [],
    },
  },
};

export const PlannerSlice = createSlice({
  name: "Planner",
  initialState,
  reducers: {
    setPlanners: (state, action) => {
      state.planners = action.payload
        .map((planner) => ({
          id: planner._id,
          date: planner.assignDate,
          recipes: planner.recipes.map((recipe) => ({
            _id: recipe?._id,
            name: recipe?.name,
            category: recipe?.recipeBlendCategory?.name,
            rxScore: 786,
            calorie: 250,
          })),
        }))
        .sort(
          //@ts-ignore
          (a: any, b: any) => new Date(a.date) - new Date(b.date),
        );
    },

    addPlanner: (
      state,
      action: { payload: { id: string; date: string; recipe: IPlannerRecipe } },
    ) => {
      const date = action.payload.date;
      const planner = state.planners.find((p) => p.date === date);
      if (planner) {
        planner.recipes.push(action.payload.recipe);
      } else {
        state.planners.push({
          id: action.payload.id,
          date,
          recipes: [action.payload.recipe],
        });
        state.planners.sort(
          //@ts-ignore
          (a: any, b: any) => new Date(a.date) - new Date(b.date),
        );
      }
    },

    deleteRecipe: (
      state,
      action: { payload: { recipeId: string; plannerId: string } },
    ) => {
      const plannerIdx = state.planners.findIndex(
        (p) => p.id === action.payload.plannerId,
      );
      const recipe = state.planners[plannerIdx].recipes.filter(
        (recipe) => recipe._id !== action.payload.recipeId,
      );
      if (recipe.length === 0) {
        state.planners.splice(plannerIdx, 1);
      } else {
        state.planners[plannerIdx] = {
          ...state.planners[plannerIdx],
          recipes: recipe,
        };
      }
    },

    duplicateRecipe: (
      state,
      action: { payload: { id: string; date: Date; recipe: IPlannerRecipe } },
    ) => {
      const date = action?.payload?.date?.toISOString();
      const index = state.planners.findIndex((p) => p.date === date);
      if (index === -1) {
        state.planners.push({
          id: action.payload.id,
          date,
          recipes: [action.payload.recipe],
        });
        state.planners.sort(
          //@ts-ignore
          (a: any, b: any) => new Date(a.date) - new Date(b.date),
        );
      } else {
        const recipe = state.planners[index].recipes.find(
          (recipe) => recipe._id === action.payload.recipe._id,
        );
        if (!recipe) {
          state.planners[index].recipes.push(action.payload.recipe);
        }
      }
    },

    moveRecipe: (
      state,
      action: {
        payload: {
          currentPlannerId: string;
          newPlannerId: string;
          date: string;
          recipe: IPlannerRecipe;
        };
      },
    ) => {
      const date = action?.payload?.date;

      //Find the planner
      const plannerIdx = state.planners.findIndex(
        (planner) => planner.id === action.payload.currentPlannerId,
      );

      //Check if the current date and new date different
      if (state.planners[plannerIdx].date === date) return;

      //Find the recipe of that planner
      const recipeIdx = state.planners[plannerIdx].recipes.findIndex(
        (recipe) => recipe._id === action.payload.recipe?._id,
      );

      if (state.planners[plannerIdx].recipes.length === 1 && recipeIdx !== -1) {
        //If the recipe is only one, delete the whole planner
        state.planners.splice(plannerIdx, 1);
      } else {
        //Remove the recipe from the planner
        state.planners[plannerIdx].recipes.splice(recipeIdx, 1);
      }

      //Check if the date exist otherwise create new date
      const newPlannerIdx = state.planners.findIndex(
        (planner) => planner.date === date,
      );

      //Add the recipe to the new date
      if (newPlannerIdx === -1) {
        state.planners.push({
          id: action.payload.newPlannerId,
          date: date,
          recipes: [action.payload.recipe],
        });
        state.planners.sort(
          //@ts-ignore
          (a: any, b: any) => new Date(a.date) - new Date(b.date),
        );
      } else {
        state.planners[newPlannerIdx].recipes.push(action.payload.recipe);
      }
    },

    clearAllPlanner: (state) => {
      state.planners = [];
    },

    setRecipeInfo: (
      state,
      action: { payload: { _id: string; name: string; image: string } },
    ) => {
      state.post.recipe._id = action.payload._id;
      state.post.recipe.name = action.payload.name;
      state.post.recipe.image = action.payload.image;
    },
    setRecipeIngredients: (
      state,
      action: { payload: { ingredients: IPlannerIngredients[] } },
    ) => {
      state.post.recipe.ingredients = action.payload.ingredients;
    },
    addIngredient: (state, action: { payload: IPlannerIngredients }) => {
      state.post.recipe.ingredients.push(action.payload);
    },
  },
});

export const {
  setPlanners,
  addPlanner,
  deleteRecipe,
  duplicateRecipe,
  moveRecipe,
  clearAllPlanner,
  setRecipeInfo,
  setRecipeIngredients,
  addIngredient,
} = PlannerSlice.actions;

export default PlannerSlice.reducer;
