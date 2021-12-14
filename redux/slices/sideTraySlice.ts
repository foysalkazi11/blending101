import type { RootState } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SideTrayState = {
  openFilterTray: boolean;
};

const initialState: SideTrayState = {
  openFilterTray: false,
};

export const sideTraySlice = createSlice({
  name: "sideTray",
  initialState,
  reducers: {
    setOpenFilterTray: (state, action: PayloadAction<boolean>) => {
      state.openFilterTray = action?.payload;
    },
  },
});

export const { setOpenFilterTray } = sideTraySlice?.actions;

export default sideTraySlice?.reducer;
