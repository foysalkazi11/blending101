import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SideTrayState = {
  loading: boolean;
  sidebarActiveMenuNo: number;
};

const initialState: SideTrayState = {
  loading: false,
  sidebarActiveMenuNo: 0,
};

export const utilitySlice = createSlice({
  name: "utility",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action?.payload;
    },
    updateSidebarActiveMenuNo: (state, action: PayloadAction<number>) => {
      state.sidebarActiveMenuNo = action.payload;
    },
  },
});

export const { setLoading, updateSidebarActiveMenuNo } = utilitySlice?.actions;

export default utilitySlice?.reducer;
