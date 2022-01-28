import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type recipeSliceState = {
  recommended: any[];
  popular: any[];
  latest: any[];
  currentRecipeInfo: { name: string; image: string };
};

const initialState: recipeSliceState = {
  latest: [],
  popular: [],
  recommended: [],
  currentRecipeInfo: { name: "", image: "" },
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
  },
});

export const { setLatest, setPopular, setRecommended, setCurrentRecipeInfo } =
  recipeSlice?.actions;

export default recipeSlice?.reducer;
