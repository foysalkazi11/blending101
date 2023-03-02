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
    versionId: string,
    turnedOn: boolean,
    editableObject: VersionEditAbleData,
    isOriginalVersion: boolean = false,
  ) => {
    try {
      const { data } = await editAVersionOfRecipe({
        variables: {
          data: {
            editId: versionId,
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
                version?._id === versionId
                  ? { ...version, ...updateRecipeVersionObj }
                  : version,
              )
            : detailsARecipe?.turnedOnVersions,

          turnedOffVersions: turnedOn
            ? detailsARecipe?.turnedOffVersions
            : detailsARecipe?.turnedOffVersions.map((version) =>
                version?._id === versionId
                  ? { ...version, ...updateRecipeVersionObj }
                  : version,
              ),
          recipeId: {
            ...detailsARecipe?.recipeId,
            originalVersion: isOriginalVersion
              ? {
                  ...detailsARecipe?.recipeId?.originalVersion,
                  postfixTitle: editableObject.postfixTitle,
                  description: editableObject?.description,
                }
              : detailsARecipe?.recipeId?.originalVersion,
          },
          defaultVersion:
            detailsARecipe?.defaultVersion?._id === versionId
              ? {
                  ...detailsARecipe?.defaultVersion,
                  postfixTitle: editableObject.postfixTitle,
                  description: editableObject?.description,
                }
              : detailsARecipe?.defaultVersion,
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
