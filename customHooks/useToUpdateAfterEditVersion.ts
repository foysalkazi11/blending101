import notification from "../components/utility/reactToastifyNotification";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setDetailsARecipe } from "../redux/slices/recipeSlice";
import { VersionDataType } from "../type/recipeDetailsType";

const useToUpdateAfterEditVersion = () => {
  const dispatch = useAppDispatch();
  const { detailsARecipe } = useAppSelector((state) => state?.recipe);
  const handleToUpdateARecipeVersionAfterEdit = (
    versionId: string,
    turnedOn: boolean,
    updatedVersionData: VersionDataType,
    returnObj: { isNew: boolean; status: string },
    isOriginalVersion: boolean = false,
  ) => {
    const { isNew, status } = returnObj;
    const updateRecipeVersionObj = isNew
      ? {
          ...updatedVersionData,
          _id: status,
        }
      : updatedVersionData;

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
                ...updateRecipeVersionObj,
              }
            : detailsARecipe?.recipeId?.originalVersion,
        },
        defaultVersion:
          detailsARecipe?.defaultVersion?._id === versionId
            ? {
                ...detailsARecipe?.defaultVersion,
                ...updateRecipeVersionObj,
              }
            : detailsARecipe?.defaultVersion,
      }),
    );

    notification("success", "Version update successfully");
  };

  return handleToUpdateARecipeVersionAfterEdit;
};

export default useToUpdateAfterEditVersion;
