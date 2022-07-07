import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/hooks";
import { setAllRecipeWithinCollections } from "../redux/slices/collectionSlice";
import {
  setAllFilterRecipe,
  setDetailsARecipe,
  setLatest,
  setPopular,
  setRecommended,
} from "../redux/slices/recipeSlice";

const useUpdateRecipeField = () => {
  const dispatch = useDispatch();
  const { latest, popular, recommended, detailsARecipe, allFilterRecipe } =
    useAppSelector((state) => state?.recipe);
  const { allRecipeWithinCollections } = useAppSelector(
    (state) => state?.collections,
  );

  const recipeUpdate = (arr: any[], obj: object, id: string): any[] => {
    if (!arr?.length) return arr;
    return arr?.map((recipe) =>
      recipe?._id === id ? { ...recipe, ...obj } : recipe,
    );
  };

  const updateRecipe = (id: string, obj: object) => {
    dispatch(
      setDetailsARecipe({
        ...detailsARecipe,
        ...obj,
      }),
    );

    dispatch(
      setAllRecipeWithinCollections([
        ...recipeUpdate(allRecipeWithinCollections, obj, id),
      ]),
    );
    dispatch(setAllFilterRecipe([...recipeUpdate(allFilterRecipe, obj, id)]));
    dispatch(setRecommended(recipeUpdate(recommended, obj, id)));
    dispatch(setLatest(recipeUpdate(latest, obj, id)));
    dispatch(setPopular(recipeUpdate(popular, obj, id)));
  };

  return updateRecipe;
};

export default useUpdateRecipeField;
