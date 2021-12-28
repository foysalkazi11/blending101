import { combineReducers } from "redux";
// import userReducer from "./users/user.reducer";
import sideTrayReducer from "./slices/sideTraySlice";
import userReducer from "./slices/userSlice";
import utilityReducer from "./slices/utilitySlice";

const rootReducer = combineReducers({
  user: userReducer,
  sideTray: sideTrayReducer,
  utility: utilityReducer,
});

// export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
