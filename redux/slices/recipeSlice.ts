import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RecipeDetailsType } from "../../type/recipeDetails";

type recipeSliceState = {
  recommended: any[];
  popular: any[];
  latest: any[];
  currentRecipeInfo: { name: string; image: string };
  compareList: any[];
  detailsARecipe: RecipeDetailsType;
};

const initialState: recipeSliceState = {
  latest: [],
  popular: [],
  recommended: [],
  currentRecipeInfo: { name: "", image: "" },
  compareList: [],
  detailsARecipe: {} as RecipeDetailsType,
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setRecommended: (state, action: PayloadAction<any[]>) => {
      state.recommended = action?.payload;
    },
    setPopular: (state, action: PayloadAction<any[]>) => {
      state.popular = action?.payload;
    },
    setLatest: (state, action: PayloadAction<any[]>) => {
      state.latest = action?.payload;
    },
    setCurrentRecipeInfo: (
      state,
      action: PayloadAction<{ name: string; image: string }>,
    ) => {
      state.currentRecipeInfo = action?.payload;
    },
    setCompareList: (state, action: PayloadAction<any[]>) => {
      state.compareList = action?.payload;
    },
    setDetailsARecipe: (state, action: PayloadAction<RecipeDetailsType>) => {
      state.detailsARecipe = action?.payload;
    },
  },
});

export const {
  setLatest,
  setPopular,
  setRecommended,
  setCurrentRecipeInfo,
  setCompareList,
  setDetailsARecipe,
} = recipeSlice?.actions;

export default recipeSlice?.reducer;
