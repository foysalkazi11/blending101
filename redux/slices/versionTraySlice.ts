import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type varsionState = {
  openVersionTray: boolean;
};

const initialState: varsionState = {
  openVersionTray: false,
};

export const versionTraySlice = createSlice({
  name: "versionTray",
  initialState,
  reducers: {
    setOpenVersionTray: (state, action: PayloadAction<boolean>) => {
      state.openVersionTray = action?.payload;
    },
  },
});

export const { setOpenVersionTray } = versionTraySlice?.actions;

export default versionTraySlice?.reducer;
