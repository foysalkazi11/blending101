import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipeName: "",
  descriptionRecipe:"",
  recipeImagesArray:[],
  resImageArrayTemp:[],
  selectedBlendCategory:null,
  allBlendCategories: [],
  allIngredientListBasedOnClass: [],
  selectedIngredientsList: [],
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
    setDescriptionRecipe: (state, action) => {
      state.descriptionRecipe = action?.payload;
    },
    setRecipeImagesArray: (state, action) => {
      state.recipeImagesArray = action?.payload;
    },
    setResImageArrayTemp: (state, action) => {
      state.resImageArrayTemp = action?.payload;
    },
    setSelectedBlendCategory: (state, action) => {
      state.selectedBlendCategory = action?.payload;
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
  setDescriptionRecipe,
  setRecipeImagesArray,
  setResImageArrayTemp,
  setSelectedBlendCategory,
  setAllIngredientListBasedOnClass,
  setSelectedIngredientsList,
  setAllBlendCategories,
  setServingCounter,
  setRecipeInstruction,
} = editRecipeStateSlice.actions;

export default editRecipeStateSlice?.reducer;
