// import type { RootState } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import sampleUser from "../../data/sampleUser";
import { DbUserType } from "../../type/dbUserType";

type SideTrayState = {
  nonConfirmedUser: string;
  user: string | null;
  dbUser: DbUserType;
  provider: string;
  isNewUseImage: File[];
  userCompareLength?: number;
};

const initialState: SideTrayState = {
  nonConfirmedUser: "",
  user: "",
  dbUser: {} as DbUserType,
  provider: "email",
  isNewUseImage: [],
  userCompareLength: 0,
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
    setDbUser: (state, action: PayloadAction<DbUserType>) => {
      state.dbUser = action?.payload;
    },
    setProvider: (state, action: PayloadAction<string>) => {
      state.provider = action?.payload;
    },
    setIsNewUseImage: (state, action: PayloadAction<any>) => {
      state.isNewUseImage = action?.payload;
    },
    updateUserCompareLength: (state, action: PayloadAction<number>) => {
      state.userCompareLength = action?.payload;
    },
  },
});

export const {
  setNonConfirmedUser,
  setUser,
  setDbUser,
  setProvider,
  setIsNewUseImage,
  updateUserCompareLength,
} = userSlice?.actions;

export default userSlice?.reducer;
