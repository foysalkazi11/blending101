import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type collectionsSliceState = {
  allRecipeWithinCollectionsId: string[];
  changeRecipeWithinCollection: boolean;
  activeRecipeId: string;
  lastModifiedCollection: string;
  collectionDetailsId: string;
  showAllRecipes: boolean;
};

const initialState: collectionsSliceState = {
  allRecipeWithinCollectionsId: [],
  changeRecipeWithinCollection: false,
  activeRecipeId: "",
  lastModifiedCollection: "Default",
  collectionDetailsId: "",
  showAllRecipes: false,
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
    setCollectionDetailsId: (state, action: PayloadAction<string>) => {
      state.collectionDetailsId = action?.payload;
    },
    setShowAllRecipes: (state, action: PayloadAction<boolean>) => {
      state.showAllRecipes = action?.payload;
    },
  },
});

export const {
  setAllRecipeWithinCollectionsId,
  setChangeRecipeWithinCollection,
  setActiveRecipeId,
  setLastModifiedCollection,
  setCollectionDetailsId,
  setShowAllRecipes,
} = collectionsSlice?.actions;

export default collectionsSlice?.reducer;
