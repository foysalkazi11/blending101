import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipeName: "",
  descriptionRecipe: "",
  recipeImagesArray: [],
  selectedBlendCategory: null,
  allBlendCategories: [],
  allIngredientListBasedOnClass: [],
  selectedIngredientsList: [],
  servingCounter: 1,
  recipeInstruction: [],
  ingredientArrayForNutrition: [],
  arrayOfSingleSelectedIngredientForNutrition: [],
  selectedIngredientBool:false
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
    setIngredientArrayForNutrition: (state, action) => {
      state.ingredientArrayForNutrition = action?.payload;
    },
    setArrayOfSingleSelectedIngredientForNutrition: (state, action) => {
      state.arrayOfSingleSelectedIngredientForNutrition = action?.payload;
    },
    setSelectedIngredientBool: (state, action) => {
      state.selectedIngredientBool = action?.payload;
    },
  },
});

export const {
  setEditRecipeName,
  setDescriptionRecipe,
  setRecipeImagesArray,
  setSelectedBlendCategory,
  setAllIngredientListBasedOnClass,
  setSelectedIngredientsList,
  setAllBlendCategories,
  setServingCounter,
  setRecipeInstruction,
  setIngredientArrayForNutrition,
  setArrayOfSingleSelectedIngredientForNutrition,
  setSelectedIngredientBool
} = editRecipeStateSlice.actions;

export default editRecipeStateSlice?.reducer;
