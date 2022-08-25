import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SideTrayState = {
  loading: boolean;
};

const initialState: SideTrayState = {
  loading: false,
};

export const utilitySlice = createSlice({
  name: "utility",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action?.payload;
    },
  },
});

export const { setLoading } = utilitySlice?.actions;

export default utilitySlice?.reducer;
