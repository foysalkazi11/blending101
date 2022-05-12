import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type recipeSliceState = {
  recommended: any[];
  popular: any[];
  latest: any[];
  currentRecipeInfo: { name: string; image: string };
  compareList: any[];
};

const initialState: recipeSliceState = {
  latest: [],
  popular: [],
  recommended: [],
  currentRecipeInfo: { name: "", image: "" },
  compareList: [],
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
      action: PayloadAction<{ name: string; image: string }>
    ) => {
      state.currentRecipeInfo = action?.payload;
    },
    setCompareList: (state, action: PayloadAction<any[]>) => {
      state.compareList = action?.payload;
    },
  },
});

export const {
  setLatest,
  setPopular,
  setRecommended,
  setCurrentRecipeInfo,
  setCompareList,
} = recipeSlice?.actions;

export default recipeSlice?.reducer;
