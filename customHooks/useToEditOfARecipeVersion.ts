import { useMutation } from "@apollo/client";
import notification from "../components/utility/reactToastifyNotification";
import EDIT_A_VERSION_OF_RECIPE from "../gqlLib/versions/mutation/editAVersionOfRecipe";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setDetailsARecipe } from "../redux/slices/recipeSlice";

interface VersionEditAbleData {
  description: string;
  postfixTitle: string;
  recipeInstructions?: string[];
  servingSize?: number;
  ingredients?: {
    ingredientId: string;
    selectedPortionName: string;
    weightInGram: number;
  }[];
}

const useToEditOfARecipeVersion = () => {
  const [editAVersionOfRecipe, { ...rest }] = useMutation(
    EDIT_A_VERSION_OF_RECIPE,
  );
  const dispatch = useAppDispatch();
  const { detailsARecipe } = useAppSelector((state) => state?.recipe);

  const handleToEditARecipeVersion = async (
    userId: string,
    recipeId: string,
    editId: string,
    turnedOn: boolean,
    editableObject: VersionEditAbleData,
  ) => {
    try {
      const { data } = await editAVersionOfRecipe({
        variables: {
          data: {
            editId,
            recipeId,
            turnedOn,
            userId,
            editableObject,
          },
        },
      });
      const { isNew, status } = data?.editAVersionOfRecipe;
      const updateRecipeVersionObj = isNew
        ? {
            _id: status,
            postfixTitle: editableObject.postfixTitle,
            description: editableObject?.description,
          }
        : {
            postfixTitle: editableObject.postfixTitle,
            description: editableObject?.description,
          };

      dispatch(
        setDetailsARecipe({
          ...detailsARecipe,
          turnedOnVersions: turnedOn
            ? detailsARecipe?.turnedOnVersions.map((version) =>
                version?._id === editId
                  ? { ...version, ...updateRecipeVersionObj }
                  : version,
              )
            : detailsARecipe?.turnedOnVersions,

          turnedOffVersions: turnedOn
            ? detailsARecipe?.turnedOffVersions.map((version) =>
                version?._id === editId
                  ? { ...version, ...updateRecipeVersionObj }
                  : version,
              )
            : detailsARecipe?.turnedOffVersions,
        }),
      );
      notification("success", "Version update successfully");
    } catch (error) {
      notification("error", "Version update failed");
    }
  };

  return { handleToEditARecipeVersion, ...rest };
};

export default useToEditOfARecipeVersion;
