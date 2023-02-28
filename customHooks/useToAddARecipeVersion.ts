import { useMutation } from "@apollo/client";
import notification from "../components/utility/reactToastifyNotification";
import ADD_VERSION from "../gqlLib/versions/mutation/addVersion";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setDetailsARecipe } from "../redux/slices/recipeSlice";

interface VersionAddData {
  postfixTitle: string;
  description: string;
}

const useToAddARecipeVersion = () => {
  const [addVersion, { ...rest }] = useMutation(ADD_VERSION);
  const { detailsARecipe } = useAppSelector((state) => state?.recipe);
  const dispatch = useAppDispatch();

  const handleToAddRecipeVersion = async (
    userId: string,
    recipeId: string,
    versionAddData: VersionAddData,
  ) => {
    const { description, postfixTitle } = versionAddData;

    try {
      const { data } = await addVersion({
        variables: {
          data: {
            recipeId: recipeId,
            postfixTitle: postfixTitle,
            description: description,
            userId: userId,
          },
        },
      });
      dispatch(
        setDetailsARecipe({
          ...detailsARecipe,
          turnedOnVersions: [
            data?.addVersion,
            ...detailsARecipe?.turnedOnVersions,
          ],
        }),
      );
      notification("success", `Recipe version create successfully`);
    } catch (error) {
      notification("error", `Recipe version create failed`);
    }
  };

  return { handleToAddRecipeVersion, ...rest };
};

export default useToAddARecipeVersion;
