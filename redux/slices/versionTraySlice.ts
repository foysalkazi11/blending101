import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type varsionState = {
  openVersionTray: boolean;
  openVersionTrayFormWhichPage: "details" | "edit" | "default";
  isNewVersionInfo: { [key: string]: any } | null;
};

const initialState: varsionState = {
  openVersionTray: false,
  openVersionTrayFormWhichPage: "default",
  isNewVersionInfo: null,
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
    setIsNewVersionInfo: (
      state,
      action: PayloadAction<{ [key: string]: any } | null>,
    ) => {
      state.isNewVersionInfo = action?.payload;
    },
  },
});

export const {
  setOpenVersionTray,
  setOpenVersionTrayFormWhichPage,
  setIsNewVersionInfo,
} = versionTraySlice?.actions;

export default versionTraySlice?.reducer;
