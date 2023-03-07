import { useMutation } from "@apollo/client";
import notification from "../components/utility/reactToastifyNotification";
import CHANGE_COMPARE from "../gqlLib/compare/mutation/changeCompare";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setCompareList } from "../redux/slices/recipeSlice";
import { setDbUser } from "../redux/slices/userSlice";
import useUpdateRecipeField from "./useUpdateRecipeFirld";

const useChangeCompare = () => {
  const dispatch = useAppDispatch();
  const [changeCompare] = useMutation(CHANGE_COMPARE, {
    fetchPolicy: "network-only",
  });
  const { dbUser } = useAppSelector((state) => state?.user);
  const { compareList } = useAppSelector((state) => state.recipe);
  const updateRecipe = useUpdateRecipeField();

  const filterRecipe = (arr: any[], id: string): any[] => {
    if (!arr?.length) return arr;
    return arr?.filter((item) => item?._id !== id);
  };

  const handleChangeCompare = async (
    e: React.SyntheticEvent,
    id: string,
    versionId: string,
    compared: boolean,
    updateDataFunc: (
      id: string,
      obj: { [key: string]: any },
    ) => void = () => {},
  ) => {
    e.stopPropagation();

    try {
      const { data } = await changeCompare({
        variables: {
          versionId,
          userId: dbUser?._id,
          recipeId: id,
        },
      });
      dispatch(
        setDbUser({
          ...dbUser,
          compareLength: Number(data?.changeCompare),
        }),
      );

      updateDataFunc(id, { addedToCompare: compared });

      notification(
        "success",
        ` ${!compared ? "Removed from" : "Added to"} compare list`,
      );

      // if (!compared) {
      //   dispatch(setCompareList(filterRecipe(compareList, id)));
      //   setcompareRecipeList((state) => filterRecipe(state, id));
      // }
      // updateRecipeCompare(id, compared);
      // updateDataFunc(id, { addedToCompare: compared });

      // if (Number(data?.changeCompare) !== Number(dbUser?.compareLength)) {
      //   dispatch(
      //     setDbUser({
      //       ...dbUser,
      //       compareLength: Number(data?.changeCompare),
      //     }),
      //   );
      // }
    } catch (error) {
      notification(
        "error",
        ` Unable to ${compared ? "remove" : "add"} from compare list`,
      );
      // updateRecipeCompare(id, !alredyCompared);
    }
  };

  // const updateRecipeCompare = (id: string, addedToCompare: boolean) => {
  //   dispatch(
  //     setDbUser({
  //       ...dbUser,
  //       compareLength: addedToCompare
  //         ? dbUser?.compareLength + 1
  //         : dbUser?.compareLength - 1,
  //     }),
  //   );
  //   updateRecipe(id, { addedToCompare: addedToCompare });
  // };

  return handleChangeCompare;
};

export default useChangeCompare;
