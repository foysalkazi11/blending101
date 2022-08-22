import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrentCollectionInfo {
  id: string;
  name: "All Recipes" | "My Recipes" | string;
}

type collectionsSliceState = {
  allRecipeWithinCollectionsId: string[];
  changeRecipeWithinCollection: boolean;
  activeRecipeId: string;
  lastModifiedCollection: { id: string; name: string };
  collectionDetailsId: string;
  showAllRecipes: boolean;
  allRecipeWithinCollections: any[];
  allCollections: {}[];
  singleRecipeWithinCollections: string[];
  currentCollectionInfo: CurrentCollectionInfo;
};

const initialState: collectionsSliceState = {
  allRecipeWithinCollectionsId: [],
  changeRecipeWithinCollection: false,
  activeRecipeId: "",
  lastModifiedCollection: { id: "", name: "" },
  collectionDetailsId: "",
  showAllRecipes: false,
  allRecipeWithinCollections: [],
  allCollections: [],
  singleRecipeWithinCollections: [],
  currentCollectionInfo: { id: "", name: "" },
};

export const collectionsSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    setAllRecipeWithinCollectionsId: (
      state,
      action: PayloadAction<string[]>,
    ) => {
      state.allRecipeWithinCollectionsId = action?.payload;
    },
    setChangeRecipeWithinCollection: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.changeRecipeWithinCollection = action?.payload;
    },
    setActiveRecipeId: (state, action: PayloadAction<string>) => {
      state.activeRecipeId = action?.payload;
    },
    setSingleRecipeWithinCollecions: (
      state,
      action: PayloadAction<string[]>,
    ) => {
      state.singleRecipeWithinCollections = action?.payload;
    },
    setLastModifiedCollection: (
      state,
      action: PayloadAction<{ id: string; name: string }>,
    ) => {
      state.lastModifiedCollection = action?.payload;
    },
    setCollectionDetailsId: (state, action: PayloadAction<string>) => {
      state.collectionDetailsId = action?.payload;
    },
    setShowAllRecipes: (state, action: PayloadAction<boolean>) => {
      state.showAllRecipes = action?.payload;
    },
    setAllRecipeWithinCollections: (state, action: PayloadAction<any[]>) => {
      state.allRecipeWithinCollections = action?.payload;
    },
    setAllCollections: (state, action: PayloadAction<{}[]>) => {
      state.allCollections = action?.payload;
    },

    setCurrentCollectionInfo: (
      state,
      action: PayloadAction<CurrentCollectionInfo>,
    ) => {
      state.currentCollectionInfo = action?.payload;
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
  setAllRecipeWithinCollections,
  setAllCollections,
  setSingleRecipeWithinCollecions,

  setCurrentCollectionInfo,
} = collectionsSlice?.actions;

export default collectionsSlice?.reducer;
