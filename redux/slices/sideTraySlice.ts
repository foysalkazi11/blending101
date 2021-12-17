import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SideTrayState = {
  openFilterTray: boolean;
  blends: Array<string>
};

const initialState: SideTrayState = {
  openFilterTray: false,
  blends: []
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
  },
});

export const { setOpenFilterTray, setBlendTye } = sideTraySlice?.actions;

export default sideTraySlice?.reducer;
