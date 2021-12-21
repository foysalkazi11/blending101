import type { RootState } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SideTrayState = {
  nonConfirmedUser: string;
  user: string;
  dbUser: any;
};

const initialState: SideTrayState = {
  nonConfirmedUser: "",
  user: "",
  dbUser: "",
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
    setDbUser: (state, action: PayloadAction<any>) => {
      state.dbUser = action?.payload;
    },
  },
});

export const { setNonConfirmedUser, setUser, setDbUser } = userSlice?.actions;

export default userSlice?.reducer;
