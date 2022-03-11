import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  recipeName:"",
  recipeImagesArray:[],
  selectedIngredientsList:[],
  allIngredientListBasedOnClass:[]
};

export const editRecipeStateSlice = createSlice({
  name: "editRecipeReducer",
  initialState,
  reducers: {
    setEditRecipeName:(state,action)=>{
      state.recipeName=action?.payload;
    },
    setRecipeImagesArray:(state,action)=>{
      state.recipeImagesArray=action?.payload
    },
    setSelectedIngredientsList:(state,action)=>{
      state.selectedIngredientsList=action?.payload
    },
    setAllIngredientListBasedOnClass:(state,action)=>{
      state.allIngredientListBasedOnClass=action?.payload
    },
  },
});


export const{
  setEditRecipeName,
  setRecipeImagesArray,
  setSelectedIngredientsList,
  setAllIngredientListBasedOnClass
}=editRecipeStateSlice.actions;

export default editRecipeStateSlice?.reducer;