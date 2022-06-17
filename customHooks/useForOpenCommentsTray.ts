import { useAppDispatch } from "../redux/hooks";
import { setActiveRecipeId } from "../redux/slices/collectionSlice";
import { setCurrentRecipeInfo } from "../redux/slices/recipeSlice";
import {
  setOpenCollectionsTary,
  setOpenCommentsTray,
} from "../redux/slices/sideTraySlice";

const useForOpenCommentsTray = () => {
  const dispatch = useAppDispatch();

  const handleComment = (
    id: string,
    title: string,
    image: string,
    e: React.SyntheticEvent,
  ) => {
    // HANDLE COMMENTS CLICK HERE
    e?.stopPropagation();
    dispatch(setActiveRecipeId(id));
    dispatch(setOpenCommentsTray(true));
    dispatch(setCurrentRecipeInfo({ name: title, image }));
    dispatch(setOpenCollectionsTary(false));
  };

  return handleComment;
};

export default useForOpenCommentsTray;
