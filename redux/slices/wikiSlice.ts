import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WikiType } from "../../type/wikiListType";

interface wikiSliceProps {
  wikiCommentsTrayCurrentWikiEntity: WikiCommentsTrayCurrentWikiEntity;
  isOpenWikiCommentsTray: boolean;
  isOpenWikiFilterTray: boolean;
  wikiCompareCount: number;
  isOpenWikiShareModal: boolean;
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
  isOpenWikiShareModal: false,
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
    setIsOpenWikiShareModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenWikiShareModal = action?.payload;
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
  setIsOpenWikiShareModal,
} = wikiSlice?.actions;

export default wikiSlice?.reducer;
