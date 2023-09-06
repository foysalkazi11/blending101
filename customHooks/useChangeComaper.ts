import { useMutation } from "@apollo/client";
import notification from "../components/utility/reactToastifyNotification";
import CHANGE_COMPARE from "../gqlLib/compare/mutation/changeCompare";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateUserCompareLength } from "../redux/slices/userSlice";
import { ReferenceOfRecipeUpdateFuncType } from "../type/recipeType";
import { useUser } from "../context/AuthProvider";

const useChangeCompare = () => {
  const dispatch = useAppDispatch();
  const [changeCompare, { called, client, loading, reset, data, error }] =
    useMutation(CHANGE_COMPARE, {
      fetchPolicy: "network-only",
    });
  const user = useUser();

  const handleChangeCompare = async (
    e: React.SyntheticEvent,
    id: string,
    versionId: string,
    compared: boolean,
    updateDataFunc: ReferenceOfRecipeUpdateFuncType = () => {},
  ) => {
    e.stopPropagation();

    try {
      const { data } = await changeCompare({
        variables: {
          userId: user.id,
          recipeId: id,
        },
      });
      dispatch(updateUserCompareLength(Number(data?.changeCompare)));

      updateDataFunc(id, { addedToCompare: compared }, {});

      notification(
        "success",
        ` ${!compared ? "Removed from" : "Added to"} compare list`,
      );
    } catch (error) {
      notification(
        "error",
        ` Unable to ${compared ? "remove" : "add"} from compare list`,
      );
    }
  };

  return { handleChangeCompare, called, client, loading, reset, data, error };
};

export default useChangeCompare;
