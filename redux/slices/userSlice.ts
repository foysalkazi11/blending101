import type { RootState } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SideTrayState = {
  nonConfirmedUser: string;
  user: string;
  dbUser: any;
  provider: string;
};

const initialState: SideTrayState = {
  nonConfirmedUser: "",
  user: "",
  dbUser: {},
  provider: "email",
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
    setProvider: (state, action: PayloadAction<string>) => {
      state.dbUser = action?.payload;
    },
  },
});

export const { setNonConfirmedUser, setUser, setDbUser, setProvider } =
  userSlice?.actions;

export default userSlice?.reducer;
