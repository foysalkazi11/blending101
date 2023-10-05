import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WikiType } from "../../type/wikiListType";

interface wikiSliceProps {
  wikiCommentsTrayCurrentWikiEntity: WikiCommentsTrayCurrentWikiEntity;
  isOpenWikiCommentsTray: boolean;
  isOpenWikiFilterTray: boolean;
  wikiCompareCount: number;
}
interface WikiCommentsTrayCurrentWikiEntity {
  type: WikiType;
  title: string;
  image: string;
  id: string;
}

const initialState: wikiSliceProps = {
  isOpenWikiCommentsTray: false,
  isOpenWikiFilterTray: false,
  wikiCommentsTrayCurrentWikiEntity: {
    id: "",
    image: "",
    title: "",
    type: "Ingredient",
  },
  wikiCompareCount: 0,
};

export const wikiSlice = createSlice({
  name: "wiki",
  initialState,
  reducers: {
    setWikiCommentsCurrentIngredient: (state, action: PayloadAction<WikiCommentsTrayCurrentWikiEntity>) => {
      state.wikiCommentsTrayCurrentWikiEntity = action?.payload;
    },
    setIsOpenWikiCommentsTray: (state, action: PayloadAction<boolean>) => {
      state.isOpenWikiCommentsTray = action?.payload;
    },
    setIsOpenWikiFilterTray: (state, action: PayloadAction<boolean>) => {
      state.isOpenWikiFilterTray = action?.payload;
    },
    updateWikiCompareCount: (state, action: PayloadAction<number>) => {
      state.wikiCompareCount = action.payload;
    },
  },
});

export const {
  setIsOpenWikiCommentsTray,
  setWikiCommentsCurrentIngredient,
  setIsOpenWikiFilterTray,
  updateWikiCompareCount,
} = wikiSlice?.actions;

export default wikiSlice?.reducer;
