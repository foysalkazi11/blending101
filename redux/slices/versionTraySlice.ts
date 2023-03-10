import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type varsionState = {
  openVersionTray: boolean;
  openVersionTrayFormWhichPage: "details" | "edit" | "default";
  isNewVersionInfo: { [key: string]: any } | null;
  shouldCloseVersionTrayWhenClickAVersion?: boolean;
};

const initialState: varsionState = {
  openVersionTray: false,
  openVersionTrayFormWhichPage: "default",
  isNewVersionInfo: null,
  shouldCloseVersionTrayWhenClickAVersion: true,
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
    setShouldCloseVersionTrayWhenClickAVersion: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.shouldCloseVersionTrayWhenClickAVersion = action.payload;
    },
  },
});

export const {
  setOpenVersionTray,
  setOpenVersionTrayFormWhichPage,
  setIsNewVersionInfo,
  setShouldCloseVersionTrayWhenClickAVersion,
} = versionTraySlice?.actions;

export default versionTraySlice?.reducer;
