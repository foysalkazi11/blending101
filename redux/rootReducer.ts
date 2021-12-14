import { combineReducers } from "redux";
import userReducer from "./users/user.reducer";
import sideTrayReducer from "./slices/sideTraySlice";

const rootReducer = combineReducers({
  user: userReducer,
  sideTray: sideTrayReducer,
});

// export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
