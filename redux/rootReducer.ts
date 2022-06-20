import { combineReducers } from "redux";
// import userReducer from "./users/user.reducer";
import userReducer from "./slices/userSlice";
import sideTrayReducer from "./slices/sideTraySlice";
import versionTrayReducer from "./slices/versionTraySlice";
import utilityReducer from "./slices/utilitySlice";
import editRecipeReducer from "./edit_recipe/quantity";
import collectionsReducer from "./slices/collectionSlice";
import recipeReducer from "./slices/recipeSlice";
import ingredientsReducer from "./slices/ingredientsSlice";
import filterRecipeSliceReducer from "./slices/filterRecipeSlice";
import categroyReducer from "./slices/categroySlice";
import CartReducer from "./slices/Cart.slice";
import editRecipeMainReducer from "./edit_recipe/editRecipeStates";

const rootReducer = combineReducers({
  user: userReducer,
  cart: CartReducer,
  sideTray: sideTrayReducer,
  versionTray: versionTrayReducer,
  utility: utilityReducer,
  quantityAdjuster: editRecipeReducer,
  collections: collectionsReducer,
  recipe: recipeReducer,
  ingredients: ingredientsReducer,
  filterRecipe: filterRecipeSliceReducer,
  categroy: categroyReducer,
  editRecipeReducer: editRecipeMainReducer,
});

// export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
