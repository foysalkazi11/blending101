import { UserRecipe } from "@/recipe/recipe.types";
import { createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";

export interface IPostIngredient {
  ingredientId: { _id: string; ingredientName: string; featuredImage: string };
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
  images: Image[];
  title: string;
  category: string;
  startDate: string;
  serving: number;
  notes: string;
  ingredients: IPostIngredient[];
}

interface ChallengeState {
  viewOnly: boolean;
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
  startDate: format(new Date(), "yyyy-MM-dd"),
  serving: 0,
  notes: "",
  ingredients: [],
};

const initialState: ChallengeState = {
  viewOnly: true,
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
    setChallengeView: (state, action) => {
      state.viewOnly = action.payload;
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
    setPostDate: (state, action) => {
      state.post.startDate = action.payload;
    },
    setRecipeInfo: (
      state,
      action: {
        payload: UserRecipe;
      },
    ) => {
      const image = action.payload.recipeId.image[0];

      state.post.id = action.payload.recipeId._id;
      state.post.title = action.payload.recipeId.name;
      state.post.images = [{ hash: "", url: image.image }];
      state.post.category = action.payload.recipeId.recipeBlendCategory._id;
      state.post.ingredients = action.payload.defaultVersion.ingredients || [];
    },
    addIngredient: (state, action) => {
      const ingredientItem = action.payload.ingredient;
      const ingredientId = ingredientItem._id;
      const qty = action.payload.quantity;
      const portion = action.payload.portion;
      const unit = portion?.measurement;
      const weight = +portion?.meausermentWeight;
      const ingredient = {
        ingredientId: {
          _id: ingredientItem._id,
          ingredientName: ingredientItem.ingredientName,
          featuredImage: ingredientItem?.featuredImage,
          portions: ingredientItem?.portions,
        },
        selectedPortion: {
          gram: qty * weight,
          name: unit,
          quantity: qty,
        },
      };
      if (action.payload.isEditing) {
        const ingredients = state.post.ingredients.map((ing) => {
          if (ing.ingredientId._id === ingredientId) {
            return ingredient;
          } else {
            return ing;
          }
        });
        state.post.ingredients = ingredients;
      } else {
        state.post.ingredients.push(ingredient);
      }
    },
    editIngredient: (state, action) => {
      const ingredientItem = action.payload.ingredient;
      const qty = action.payload.quantity;
      const portion = action.payload.portion;
      const unit = portion?.measurement;
      const weight = +portion?.meausermentWeight;
      const ingredient = {
        ingredientId: {
          _id: ingredientItem._id,
          ingredientName: ingredientItem.ingredientName,
          featuredImage: ingredientItem?.featuredImage,
        },
        selectedPortion: {
          gram: qty * weight,
          name: unit,
          quantity: qty,
        },
      };
      console.log(ingredient);
      state.post.ingredients.push(ingredient);
    },
    deleteIngredient: (state, action) => {
      const id = action.payload.id;
      state.post.ingredients = state.post.ingredients.filter((i) => i.ingredientId._id !== id);
    },
  },
});

export const {
  setChallengeDate,
  setChallengeInterval,
  setChallengePost,
  setShowPostForm,
  resetForm,
  setPostDate,
  setRecipeInfo,
  addIngredient,
  deleteIngredient,
  setChallengeView,
} = ChallengeSlice.actions;

export default ChallengeSlice.reducer;
