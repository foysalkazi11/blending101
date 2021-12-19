import type { RootState } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SideTrayState = {
  nonConfirmedUser: string;
  user: string;
};

const initialState: SideTrayState = {
  nonConfirmedUser: "",
  user: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.user = action?.payload;
    },
    setNonConfirmedUser: (state, action: PayloadAction<string>) => {
      state.nonConfirmedUser = action?.payload;
    },
  },
});

export const { setNonConfirmedUser, setUser } = userSlice?.actions;

export default userSlice?.reducer;
