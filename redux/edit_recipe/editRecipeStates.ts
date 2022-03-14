import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  recipeName:"",
  recipeImagesArray:[],
  allIngredientListBasedOnClass:[],
  allBlendCategories:[]
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
    setAllIngredientListBasedOnClass:(state,action)=>{
      state.allIngredientListBasedOnClass=action?.payload
    },
    setAllBlendCategories:(state,action)=>{
      state.allBlendCategories=action?.payload
    },
  },
});


export const{
  setEditRecipeName,
  setRecipeImagesArray,
  setAllIngredientListBasedOnClass,
  setAllBlendCategories
}=editRecipeStateSlice.actions;

export default editRecipeStateSlice?.reducer;