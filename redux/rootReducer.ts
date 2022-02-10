import { combineReducers } from "redux";
// import userReducer from "./users/user.reducer";
import userReducer from "./slices/userSlice";
import sideTrayReducer from "./slices/sideTraySlice";
import utilityReducer from "./slices/utilitySlice";
import editRecipeReducer from "./edit_recipe/quantity";
import collectionsReducer from "./slices/collectionSlice";
import recipeReducer from "./slices/recipeSlice";
import ingredientsReducer from "./slices/ingredientsSlice";

const rootReducer = combineReducers({
  user: userReducer,
  sideTray: sideTrayReducer,
  utility: utilityReducer,
  quantityAdjuster: editRecipeReducer,
  collections: collectionsReducer,
  recipe: recipeReducer,
  ingredients: ingredientsReducer,
});

// export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
