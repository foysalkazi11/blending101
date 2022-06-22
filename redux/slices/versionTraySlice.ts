import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type varsionState = {
  openVersionTray: boolean;
  openVersionTrayFormWhichPage: "details" | "edit" | "default";
};

const initialState: varsionState = {
  openVersionTray: false,
  openVersionTrayFormWhichPage: "default",
};

export const versionTraySlice = createSlice({
  name: "versionTray",
  initialState,
  reducers: {
    setOpenVersionTray: (state, action: PayloadAction<boolean>) => {
      state.openVersionTray = action?.payload;
    },
    setOpenVersionTrayFormWhichPage: (
      state,
      action: PayloadAction<"details" | "edit" | "default">,
    ) => {
      state.openVersionTrayFormWhichPage = action?.payload;
    },
  },
});

export const { setOpenVersionTray, setOpenVersionTrayFormWhichPage } =
  versionTraySlice?.actions;

export default versionTraySlice?.reducer;
