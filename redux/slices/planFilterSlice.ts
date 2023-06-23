import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isPlanFilterOpen: boolean;
}

const initialState: InitialState = {
  isPlanFilterOpen: false,
};

export const planFilterSlice = createSlice({
  initialState,
  name: "planFilter",
  reducers: {
    setIsPlanFilterOpen: (state, action: PayloadAction<boolean>) => {
      state.isPlanFilterOpen = action.payload;
    },
  },
});

export const { setIsPlanFilterOpen } = planFilterSlice.actions;

export default planFilterSlice.reducer;
