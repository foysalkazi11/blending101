import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrentBlogForShowComments {
  id: string;
  image: string;
  title: string;
}
interface BlogSliceState {
  currentBlogForShowComments: CurrentBlogForShowComments;
  isOpenBlogCommentsTray: boolean;
}

const initialState: BlogSliceState = {
  currentBlogForShowComments: {
    id: "",
    image: "",
    title: "",
  },
  isOpenBlogCommentsTray: false,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    updateCurrentBlogForShowComments: (
      state,
      action: PayloadAction<CurrentBlogForShowComments>,
    ) => {
      state.currentBlogForShowComments = { ...action.payload };
    },
    setIsOpenBlogCommentsTray: (state, action: PayloadAction<boolean>) => {
      state.isOpenBlogCommentsTray = action.payload;
    },
  },
});

export const { setIsOpenBlogCommentsTray, updateCurrentBlogForShowComments } =
  blogSlice.actions;

export default blogSlice.reducer;
