import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrentBlogForShowComments {
  id: string;
  image: string;
  title: string;
}
interface LastModifiedBlogCollectionType {
  _id: string;
  name: string;
}

interface BlogSliceState {
  currentBlogForShowComments: CurrentBlogForShowComments;
  isOpenBlogCommentsTray: boolean;
  isOpenBlogCollectionTray: boolean;
  lastModifiedBlogCollection: LastModifiedBlogCollectionType;
  isActiveBlogForCollection: string;
}

const initialState: BlogSliceState = {
  currentBlogForShowComments: {
    id: "",
    image: "",
    title: "",
  },
  isOpenBlogCommentsTray: false,
  isOpenBlogCollectionTray: false,
  lastModifiedBlogCollection: {
    _id: "",
    name: "",
  },
  isActiveBlogForCollection: "",
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
    setIsOpenBlogCollectionTray: (state, action: PayloadAction<boolean>) => {
      state.isOpenBlogCollectionTray = action.payload;
    },
    updateLastModifiedBlogCollection: (
      state,
      action: PayloadAction<LastModifiedBlogCollectionType>,
    ) => {
      state.lastModifiedBlogCollection = { ...action.payload };
    },
    setIsActiveBlogForCollection: (state, action: PayloadAction<string>) => {
      state.isActiveBlogForCollection = action.payload;
    },
  },
});

export const {
  setIsOpenBlogCommentsTray,
  updateCurrentBlogForShowComments,
  setIsOpenBlogCollectionTray,
  updateLastModifiedBlogCollection,
  setIsActiveBlogForCollection,
} = blogSlice.actions;

export default blogSlice.reducer;
