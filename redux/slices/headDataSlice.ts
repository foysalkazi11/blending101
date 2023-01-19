import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HeadDataInfoType {
  title: string;
  description: string;
}

interface initialStateType {
  headTagInfo: HeadDataInfoType;
}

const initialState: initialStateType = {
  headTagInfo: {
    description: "home page content",
    title: "Home",
  },
};

export const headDataSlice = createSlice({
  initialState: initialState,
  name: "head",
  reducers: {
    updateHeadTagInfo: (state, action: PayloadAction<HeadDataInfoType>) => {
      state.headTagInfo = { ...action.payload };
    },
  },
});

export const { updateHeadTagInfo } = headDataSlice.actions;
export default headDataSlice.reducer;
