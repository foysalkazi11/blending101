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

interface IChallengeRecipe {
  id: string;
  name: string;
  image: string;
  category: string;
  score: number;
  calorie: number;
  ingredients: string[];
}

interface PlannerState {
  challenge: {
    date: string;
    images: string[];
    notes: string[];
    recipes: IChallengeRecipe[];
  };
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

const initialRecipe = {
  _id: "",
  name: "",
  image: "",
  ingredients: [],
};
const initialState: PlannerState = {
  challenge: {
    date: "",
    images: [],
    notes: [],
    recipes: [],
  },
  planners: [],
  post: {
    recipe: initialRecipe,
  },
};

export const PlannerSlice = createSlice({
  name: "Planner",
  initialState,
  reducers: {
    setChallenge: (state, action) => {
      state.challenge.date = action.payload.date;
      const images = [];
      const notes = [];
      const recipes = [];
      action.payload.posts.forEach((post, idx) => {
        post?.images[0] && images.push(post?.images[0]);
        post?.note && notes.push(post?.note);
        recipes.push({
          id: post?._id || idx,
          name: post?.name || "",
          image: post?.recipeImage || "",
          category: post?.recipeBlendCategory?.name || "",
          score: post?.rxScore || 900,
          calorie: post?.calorie || 60,
          ingredients:
            post?.ingredients?.map(
              (ing) => ing?.ingredientId?.ingredientName || "",
            ) || [],
        });
      });
      state.challenge.images = images;
      state.challenge.notes = notes;
      state.challenge.recipes = recipes;
    },
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

    // Upload Challenge
    resetForm: (state) => {
      state.post.recipe = initialRecipe;
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

    addIngredient: (state, action) => {
      const ingredientItem = action.payload.ingredient;
      const qty = Math.floor(Math.random() * 10);
      const portion =
        ingredientItem?.portions.find((portion) => portion.default)
          ?.measurement || ingredientItem?.portions[0].measurement;
      const unit =
        portion?.measurement || ingredientItem?.portions[0].measurement;
      const weight =
        portion?.meausermentWeight ||
        ingredientItem?.portions[0].meausermentWeight;

      const ingredient = {
        ingredientId: {
          _id: ingredientItem.value,
          ingredientName: ingredientItem.label,
        },
        selectedPortion: {
          gram: qty * weight,
          name: unit,
          quantity: qty,
        },
      };

      state.post.recipe.ingredients.push(ingredient);
    },

    deleteIngredient: (state, action) => {
      const id = action.payload.id;
      state.post.recipe.ingredients = state.post.recipe.ingredients.filter(
        (i) => i.ingredientId._id !== id,
      );
    },
  },
});

export const {
  setChallenge,
  setPlanners,
  addPlanner,
  deleteRecipe,
  duplicateRecipe,
  moveRecipe,
  clearAllPlanner,
  setRecipeInfo,
  setRecipeIngredients,
  addIngredient,
  deleteIngredient,
  resetForm,
} = PlannerSlice.actions;

export default PlannerSlice.reducer;
