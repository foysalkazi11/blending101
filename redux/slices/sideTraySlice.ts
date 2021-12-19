import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SideTrayState = {
  openFilterTray: boolean;
  blends: Array<string>,
  ingredients: Array<string>,
  category: string
};

const initialState: SideTrayState = {
  openFilterTray: false,
  blends: [],
  category: null,
  ingredients: []
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
  },
});

export const { setOpenFilterTray, setBlendTye, setIngredients, setCategoryTye } = sideTraySlice?.actions;

export default sideTraySlice?.reducer;
