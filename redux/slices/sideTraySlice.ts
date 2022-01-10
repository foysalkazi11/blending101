import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SideTrayState = {
  openFilterTray: boolean;
  blends: Array<string>;
  ingredients: Array<string>;
  category: string;
  openCommentsTray: boolean;
};

const initialState: SideTrayState = {
  openFilterTray: false,
  blends: [],
  category: null,
  ingredients: [],
  openCommentsTray: false,
};

export const sideTraySlice = createSlice({
  name: "sideTray",
  initialState,
  reducers: {
    setOpenFilterTray: (state, action: PayloadAction<boolean>) => {
      state.openFilterTray = action?.payload;
    },
    setBlendTye: (state, action) => {
      state.blends = action?.payload;
    },
    setCategoryTye: (state, action) => {
      state.category = action?.payload;
    },
    setIngredients: (state, action) => {
      state.ingredients = action?.payload;
    },
    setOpenCommentsTray: (state, action: PayloadAction<boolean>) => {
      state.openCommentsTray = action?.payload;
    },
  },
});

export const {
  setOpenFilterTray,
  setBlendTye,
  setIngredients,
  setCategoryTye,
  setOpenCommentsTray,
} = sideTraySlice?.actions;

export default sideTraySlice?.reducer;
