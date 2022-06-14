import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/hooks";
import { setAllRecipeWithinCollections } from "../redux/slices/collectionSlice";
import {
  setLatest,
  setPopular,
  setRecommended,
} from "../redux/slices/recipeSlice";

const useUpdateRecipeField = () => {
  const dispatch = useDispatch();
  const { latest, popular, recommended } = useAppSelector(
    (state) => state?.recipe,
  );
  const { allRecipeWithinCollections } = useAppSelector(
    (state) => state?.collections,
  );

  const updateRecipe = (id: string, obj: object) => {
    dispatch(
      setAllRecipeWithinCollections([
        ...allRecipeWithinCollections?.map((recipe) =>
          recipe?._id === id ? { ...recipe, ...obj } : recipe,
        ),
      ]),
    );

    dispatch(
      setRecommended(
        recommended?.map((recipe) =>
          recipe?._id === id ? { ...recipe, ...obj } : recipe,
        ),
      ),
    );
    dispatch(
      setLatest(
        latest?.map((recipe) =>
          recipe?._id === id ? { ...recipe, ...obj } : recipe,
        ),
      ),
    );
    dispatch(
      setPopular(
        popular?.map((recipe) =>
          recipe?._id === id ? { ...recipe, ...obj } : recipe,
        ),
      ),
    );
  };

  return updateRecipe;
};

export default useUpdateRecipeField;
