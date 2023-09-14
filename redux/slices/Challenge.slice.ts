import { ChallengePost } from "@/app/types/challenge.types";
import { IngredientWithPortion } from "@/app/types/ingredient.types";
import { UserRecipe } from "@/recipe/recipe.types";
import { createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";
import { mixedNumberToDecimal } from "helpers/Number";

interface Post extends ChallengePost {
  isEditMode: boolean;
  startDate: string;
  category: string;
}

interface ChallengeState {
  viewOnly: boolean;
  activeDate: string;
  startDate: string;
  endDate: string;
  showPostForm: boolean;
  post: Post;
}

const initialPost: Post = {
  isEditMode: false,
  _id: "",
  docId: "",
  images: [],
  name: "",
  category: "",
  startDate: format(new Date(), "yyyy-MM-dd"),
  servings: 0,
  note: "",
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
    setChallengePost: (state, action: { payload: Post }) => {
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

      state.post._id = action.payload.recipeId._id;
      state.post.name = action.payload.recipeId.name;
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

      const quantity = mixedNumberToDecimal(qty);
      const ingredient: IngredientWithPortion = {
        ingredientId: {
          _id: ingredientItem._id,
          ingredientName: ingredientItem.ingredientName,
          featuredImage: ingredientItem?.featuredImage,
          portions: ingredientItem?.portions,
        },
        quantityString: qty,
        selectedPortion: {
          gram: quantity * weight,
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
