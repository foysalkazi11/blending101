import { useMutation } from "@apollo/client";
import notification from "../components/utility/reactToastifyNotification";
import CHANGE_DEFAULT_VERSION from "../gqlLib/versions/mutation/changelDefaultVersion";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setDetailsARecipe } from "../redux/slices/recipeSlice";
import { RecipeVersionType } from "../type/recipeVersionType";

const useToChangeDefaultVersion = () => {
  const { detailsARecipe } = useAppSelector((state) => state?.recipe);
  const [changeDefaultVersion, { ...rest }] = useMutation(
    CHANGE_DEFAULT_VERSION,
  );
  const dispatch = useAppDispatch();

  const handleToUpdateDefaultVersion = async (
    userId: string,
    recipeId: string,
    versionId: string,
    isOriginalVersion: boolean = false,
  ) => {
    try {
      const { data } = await changeDefaultVersion({
        variables: {
          userId,
          recipeId,
          versionId,
        },
      });

      // let updateObj: RecipeVersionType = {} as RecipeVersionType;

      // updateObj = isOriginalVersion
      //   ? {
      //       ...detailsARecipe.defaultVersion,
      //       ...data?.changeDefaultVersion?.defaultVersion,
      //       postfixTitle: detailsARecipe?.recipeId?.name || "",
      //       description: detailsARecipe?.recipeId?.description || "",
      //       tempVersionInfo: {},
      //     }
      //   : {
      //       ...detailsARecipe.defaultVersion,
      //       ...data?.changeDefaultVersion?.defaultVersion,
      //       tempVersionInfo: {},
      //     };
      dispatch(
        setDetailsARecipe({
          ...detailsARecipe,
          isVersionActive: false,
          isMatch: isOriginalVersion,
          defaultVersion: { ...detailsARecipe.defaultVersion, _id: versionId },
        }),
      );
      notification("success", "Default version change successfully");
    } catch (error) {
      notification("error", error?.message || "Something went wrong");
    }
  };

  return { handleToUpdateDefaultVersion, ...rest };
};

export default useToChangeDefaultVersion;
