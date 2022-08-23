import { createSlice } from "@reduxjs/toolkit";

interface ChallengeState {
  activeDate: string;
  startDate: string;
  endDate: string;
}

const initialState: ChallengeState = {
  activeDate: "",
  startDate: "",
  endDate: "",
};

export const ChallengeSlice = createSlice({
  name: "Planner",
  initialState,
  reducers: {
    setChallengeDate: (state, action) => {
      state.activeDate = action.payload;
    },
    setChallengeInterval: (state, action) => {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
    },
  },
});

export const { setChallengeDate, setChallengeInterval } =
  ChallengeSlice.actions;

export default ChallengeSlice.reducer;
