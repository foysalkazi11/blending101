import { createSlice } from "@reduxjs/toolkit";

export interface IPostIngredient {
  ingredientId: { _id: string; ingredientName: string };
  selectedPortion: {
    name: string;
    quantity: number;
    gram: number;
  };
}

export interface IPost {
  isEditMode?: boolean;
  id: string;
  docId: string;
  images: string[];
  title: string;
  category: string;
  startDate: string;
  serving: number;
  notes: string;
  ingredients: IPostIngredient[];
}

interface ChallengeState {
  activeDate: string;
  startDate: string;
  endDate: string;
  showPostForm: boolean;
  post: IPost;
}

const initialPost = {
  isEditMode: false,
  id: "",
  docId: "",
  images: [],
  title: "",
  category: "",
  startDate: "",
  serving: 0,
  notes: "",
  ingredients: [],
};

const initialState: ChallengeState = {
  activeDate: "",
  startDate: "",
  endDate: "",
  showPostForm: false,
  post: initialPost,
};

export const ChallengeSlice = createSlice({
  name: "Planner",
  initialState,
  reducers: {
    setChallengeDate: (state, action) => {
      state.activeDate = action.payload;
    },
    setChallengeInterval: (state, action) => {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
    },
    setChallengePost: (state, action: { payload: IPost }) => {
      state.post = action.payload;
    },
    setShowPostForm: (state, action) => {
      state.showPostForm = action.payload;
    },
    resetForm: (state) => {
      state.post = initialPost;
    },
    addIngredient: (state, action) => {
      const ingredientItem = action.payload.ingredient;
      const qty = Math.floor(Math.random() * 10);
      const portion =
        ingredientItem?.portions.find((portion) => portion.default)
          ?.measurement || ingredientItem?.portions[0].measurement;
      const unit =
        portion?.measurement || ingredientItem?.portions[0].measurement;
      const weight =
        portion?.meausermentWeight ||
        ingredientItem?.portions[0].meausermentWeight;

      const ingredient = {
        ingredientId: {
          _id: ingredientItem.value,
          ingredientName: ingredientItem.label,
        },
        selectedPortion: {
          gram: qty * weight,
          name: unit,
          quantity: qty,
        },
      };

      state.post.ingredients.push(ingredient);
    },

    deleteIngredient: (state, action) => {
      const id = action.payload.id;
      state.post.ingredients = state.post.ingredients.filter(
        (i) => i.ingredientId._id !== id,
      );
    },
  },
});

export const {
  setChallengeDate,
  setChallengeInterval,
  setChallengePost,
  setShowPostForm,
  resetForm,
  addIngredient,
  deleteIngredient,
} = ChallengeSlice.actions;

export default ChallengeSlice.reducer;