import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SingleCollectionInfo {
  id: string;
  name: string;
}

type collectionsSliceState = {
  allRecipeWithinCollectionsId: string[];
  changeRecipeWithinCollection: boolean;
  activeRecipeId: string;
  lastModifiedCollection: string;
  collectionDetailsId: string;
  showAllRecipes: boolean;
  allRecipeWithinCollections: any[];
  allCollections: {}[];
  recipeWithinCollection: string;
  singleCollectionInfo: SingleCollectionInfo;
};

const initialState: collectionsSliceState = {
  allRecipeWithinCollectionsId: [],
  changeRecipeWithinCollection: false,
  activeRecipeId: "",
  lastModifiedCollection: "Default",
  collectionDetailsId: "",
  showAllRecipes: false,
  allRecipeWithinCollections: [],
  allCollections: [],
  recipeWithinCollection: "",
  singleCollectionInfo: { id: "", name: "" },
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
    setRecipeWithinCollecion: (state, action: PayloadAction<string>) => {
      state.recipeWithinCollection = action?.payload;
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
    setAllRecipeWithinCollections: (state, action: PayloadAction<any[]>) => {
      state.allRecipeWithinCollections = action?.payload;
    },
    setAllCollections: (state, action: PayloadAction<{}[]>) => {
      state.allCollections = action?.payload;
    },
    setSingleCollectionInfo: (
      state,
      action: PayloadAction<SingleCollectionInfo>,
    ) => {
      state.singleCollectionInfo = action?.payload;
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
  setRecipeWithinCollecion,
  setSingleCollectionInfo,
} = collectionsSlice?.actions;

export default collectionsSlice?.reducer;
