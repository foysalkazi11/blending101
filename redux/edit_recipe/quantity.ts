import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { howTo } from "../../components/recipe/editRecipe/recipe_elements/ingredientList/ingredientList";

interface ingredientCard {
  title?:string,
  img?:string,
  servings?:number,
  measuring_scale?:string,
  extra_sentence?:string,
  checked?:boolean
}

interface howToCard {
  step?: string;
}

type quantityState = {
  quantityNum: number;
  servingsNum: number;
  ingredientName: string;
  ingredientsList: ingredientCard[];
  ingredientSentence:string[];
  howtoState: howToCard[];
  uploadImageList: string[];
  leftbarShowState:boolean;
};

const initialState: quantityState = {
  quantityNum: 4,
  servingsNum: 1,
  ingredientName: "",
  ingredientsList: [],
  ingredientSentence:[],
  howtoState: [],
  uploadImageList: [],
  leftbarShowState:true,
};

//quantity num is for top card in edit recipe page
export const quantityStateSlice = createSlice({
  name: "quantityAdjuster",
  initialState,
  reducers: {
    setQuantity: (state, action: PayloadAction<number>) => {
      state.quantityNum = action?.payload;
    },
    setServings: (state, action: PayloadAction<number>) => {
      state.servingsNum = action?.payload;
    },
    setIngredient: (state, action: PayloadAction<string>) => {
      state.ingredientName = action?.payload;
    },
    setIngredientsSentence:(state,action:PayloadAction<string[]>)=>{
      state.ingredientSentence=action?.payload
    },
    setIngredientsToList: (state, action) => {
      state.ingredientsList = action?.payload;
    },
    setHowToSteps: (state, action) => {
      state.howtoState = action?.payload;
    },
    setUploadImageList: (state, action: PayloadAction<string[]>) => {
      state.uploadImageList = action?.payload;
    },
    setLeftbarShowState:(state,action:PayloadAction<boolean>)=>{
      state.leftbarShowState=action?.payload
    }
  },
});

export const {
  setQuantity,
  setServings,
  setIngredientsToList,
  setIngredientsSentence,
  setHowToSteps,
  setUploadImageList,
} = quantityStateSlice.actions;
export default quantityStateSlice?.reducer;
