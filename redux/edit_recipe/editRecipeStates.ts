import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipeName: "",
  recipeImagesArray:[],
  recipeBlobImagesArray: [],
  recipeImagesArrayRaw: [],
  allIngredientListBasedOnClass: [],
  selectedIngredientsList: [],
  allBlendCategories: [],
  servingCounter: 1,
  recipeInstruction: [],
};

export const editRecipeStateSlice = createSlice({
  name: "editRecipeReducer",
  initialState,
  reducers: {
    setEditRecipeName: (state, action) => {
      state.recipeName = action?.payload;
    },
    setRecipeImagesArray: (state, action) => {
      state.recipeImagesArray = action?.payload;
    },
    setRecipeBlobImagesArray: (state, action) => {
      state.recipeBlobImagesArray = action?.payload;
    },
    setRecipeImagesArrayRaw: (state, action) => {
      state.recipeImagesArrayRaw = action?.payload;
    },
    setAllIngredientListBasedOnClass: (state, action) => {
      state.allIngredientListBasedOnClass = action?.payload;
    },
    setSelectedIngredientsList: (state, action) => {
      state.selectedIngredientsList = action?.payload;
    },
    setAllBlendCategories: (state, action) => {
      state.allBlendCategories = action?.payload;
    },
    setServingCounter: (state, action) => {
      state.servingCounter = action?.payload;
    },
    setRecipeInstruction: (state, action) => {
      state.recipeInstruction = action?.payload;
    },
  },
});

export const {
  setEditRecipeName,
  setRecipeImagesArray,
  setRecipeBlobImagesArray,
  setRecipeImagesArrayRaw,
  setAllIngredientListBasedOnClass,
  setSelectedIngredientsList,
  setAllBlendCategories,
  setServingCounter,
  setRecipeInstruction,
} = editRecipeStateSlice.actions;

export default editRecipeStateSlice?.reducer;
