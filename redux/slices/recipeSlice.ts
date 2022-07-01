import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RecipeDetailsType } from "../../type/recipeDetails";
import { RecipeType } from "../../type/recipeType";

type recipeSliceState = {
  recommended: RecipeType[];
  popular: RecipeType[];
  latest: RecipeType[];
  currentRecipeInfo: { name: string; image: string };
  compareList: any[];
  detailsARecipe: RecipeDetailsType;
};

const initialState: recipeSliceState = {
  latest: [] as RecipeType[],
  popular: [] as RecipeType[],
  recommended: [] as RecipeType[],
  currentRecipeInfo: { name: "", image: "" },
  compareList: [],
  detailsARecipe: {} as RecipeDetailsType,
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setRecommended: (state, action: PayloadAction<RecipeType[]>) => {
      state.recommended = action?.payload;
    },
    setPopular: (state, action: PayloadAction<RecipeType[]>) => {
      state.popular = action?.payload;
    },
    setLatest: (state, action: PayloadAction<RecipeType[]>) => {
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
