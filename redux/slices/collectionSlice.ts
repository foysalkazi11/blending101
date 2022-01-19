import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type collectionsSliceState = {
  allRecipeWithinCollectionsId: string[];
  changeRecipeWithinCollection: boolean;
  activeRecipeId: string;
  lastModifiedCollection: string;
};

const initialState: collectionsSliceState = {
  allRecipeWithinCollectionsId: [],
  changeRecipeWithinCollection: false,
  activeRecipeId: "",
  lastModifiedCollection: "Default",
};

export const collectionsSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    setAllRecipeWithinCollectionsId: (
      state,
      action: PayloadAction<string[]>
    ) => {
      state.allRecipeWithinCollectionsId = action?.payload;
    },
    setChangeRecipeWithinCollection: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.changeRecipeWithinCollection = action?.payload;
    },
    setActiveRecipeId: (state, action: PayloadAction<string>) => {
      state.activeRecipeId = action?.payload;
    },
    setLastModifiedCollection: (state, action: PayloadAction<string>) => {
      state.lastModifiedCollection = action?.payload;
    },
  },
});

export const {
  setAllRecipeWithinCollectionsId,
  setChangeRecipeWithinCollection,
  setActiveRecipeId,
  setLastModifiedCollection,
} = collectionsSlice?.actions;

export default collectionsSlice?.reducer;
