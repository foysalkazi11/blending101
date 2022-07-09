import { createSlice } from '@reduxjs/toolkit';

interface UiState {
  navigateToTop: {
    enabled: boolean;
    showBelow: number;
  };
  images: string[];
}

const initialState: UiState = {
  navigateToTop: {
    enabled: false,
    showBelow: 200,
  },
  images: [],
};

export const UiSlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    addImage: (state, action) => {
      state.images.push(action.payload.url);
    },
    removeAllImages: (state) => {
      state.images = [];
    },
    setNavigateToTop: (state, action) => {
      state.navigateToTop = action.payload;
    },
  },
});

export const { addImage, removeAllImages, setNavigateToTop } = UiSlice.actions;

export default UiSlice.reducer;
