import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import notification from "../components/utility/reactToastifyNotification";
import CHANGE_COMPARE from "../gqlLib/compare/mutation/changeCompare";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  setCompareList,
  setLatest,
  setPopular,
  setRecommended,
} from "../redux/slices/recipeSlice";
import { setDbUser } from "../redux/slices/userSlice";
import useLocalStorage from "./useLocalStorage";

const useChangeCompare = () => {
  const dispatch = useAppDispatch();
  const [changeCompare] = useMutation(CHANGE_COMPARE, {
    fetchPolicy: "network-only",
  });
  const { dbUser } = useAppSelector((state) => state?.user);
  const { latest, popular, recommended } = useAppSelector(
    (state) => state?.recipe
  );

  const { compareList } = useAppSelector((state) => state.recipe);

  const handleChangeCompare = async (
    e: React.SyntheticEvent,
    id: string,
    compared: boolean,
    compareRecipeList: any[],
    setcompareRecipeList: (state: any) => void
  ) => {
    e.stopPropagation();
    let alredyCompared = compared;

    try {
      if (!alredyCompared) {
        dispatch(
          setCompareList([
            ...compareList?.filter((recipe) => recipe?._id !== id),
          ])
        );
        const item = compareRecipeList?.find((item) => item?._id === id);

        if (item) {
          setcompareRecipeList((state) => [
            ...state.filter((item) => item?._id !== id),
          ]);
        }
      }
      updateRecipeCompare(id, alredyCompared);

      const { data } = await changeCompare({
        variables: {
          userId: dbUser?._id,
          recipeId: id,
        },
      });

      if (Number(data?.changeCompare) !== Number(dbUser?.compareLength)) {
        dispatch(
          setDbUser({
            ...dbUser,
            compareLength: Number(data?.changeCompare),
          })
        );
      }
    } catch (error) {
      notification("error", "Unable to add compare list");
      updateRecipeCompare(id, !alredyCompared);
    }
  };

  const updateRecipeCompare = (id: string, addedToCompare: boolean) => {
    dispatch(
      setDbUser({
        ...dbUser,
        compareLength: addedToCompare
          ? dbUser?.compareLength + 1
          : dbUser?.compareLength - 1,
      })
    );
    dispatch(
      setRecommended(
        recommended?.map((recipe) =>
          recipe?._id === id ? { ...recipe, addedToCompare } : recipe
        )
      )
    );
    dispatch(
      setLatest(
        latest?.map((recipe) =>
          recipe?._id === id ? { ...recipe, addedToCompare } : recipe
        )
      )
    );
    dispatch(
      setPopular(
        popular?.map((recipe) =>
          recipe?._id === id ? { ...recipe, addedToCompare } : recipe
        )
      )
    );
  };

  return handleChangeCompare;
};

export default useChangeCompare;
