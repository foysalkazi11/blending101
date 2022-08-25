import { useDispatch } from "react-redux";
import updateRecipeFunc from "../components/utility/updateRecipeFunc";
import { useAppSelector } from "../redux/hooks";
import { setAllRecipeWithinCollections } from "../redux/slices/collectionSlice";
import {
  setAllFilterRecipe,
  setDetailsARecipe,
  setLatest,
  setPopular,
  setRecommended,
} from "../redux/slices/recipeSlice";

type Props = (id: string, obj: object) => void;

const useUpdateRecipeField = () => {
  const dispatch = useDispatch();
  const { latest, popular, recommended, detailsARecipe, allFilterRecipe } =
    useAppSelector((state) => state?.recipe);
  const { allRecipeWithinCollections } = useAppSelector(
    (state) => state?.collections,
  );

  const updateRecipe: Props = (id = "", obj = {}) => {
    dispatch(
      setDetailsARecipe({
        ...detailsARecipe,
        ...obj,
      }),
    );

    dispatch(
      setAllRecipeWithinCollections([
        ...updateRecipeFunc(allRecipeWithinCollections, obj, id),
      ]),
    );
    dispatch(
      setAllFilterRecipe([...updateRecipeFunc(allFilterRecipe, obj, id)]),
    );
    dispatch(setRecommended(updateRecipeFunc(recommended, obj, id)));
    dispatch(setLatest(updateRecipeFunc(latest, obj, id)));
    dispatch(setPopular(updateRecipeFunc(popular, obj, id)));
  };

  return updateRecipe;
};

export default useUpdateRecipeField;
