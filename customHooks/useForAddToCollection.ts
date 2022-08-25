import { useLazyQuery, useMutation } from "@apollo/client";
import React, { Dispatch, SetStateAction } from "react";
import notification from "../components/utility/reactToastifyNotification";
import updateRecipeFunc from "../components/utility/updateRecipeFunc";
import ADD_NEW_RECIPE_TO_COLLECTION from "../gqlLib/collection/mutation/addNewRecipeToCollection";
import GET_LAST_MODIFIED_COLLECTION from "../gqlLib/collection/query/getLastModifiedCollection";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  setActiveRecipeId,
  setLastModifiedCollection,
} from "../redux/slices/collectionSlice";
import { setCompareList } from "../redux/slices/recipeSlice";
import { setOpenCollectionsTary } from "../redux/slices/sideTraySlice";
import useUpdateRecipeField from "./useUpdateRecipeFirld";

const useForAddToCollection = () => {
  const { dbUser } = useAppSelector((state) => state?.user);
  const { compareList } = useAppSelector((state) => state?.recipe);
  const dispatch = useAppDispatch();
  const updateRecipe = useUpdateRecipeField();
  const [addNewRecipeToCollection] = useMutation(ADD_NEW_RECIPE_TO_COLLECTION);
  const [getLastModifiedCollection] = useLazyQuery(
    GET_LAST_MODIFIED_COLLECTION,
    { fetchPolicy: "network-only" },
  );

  const addToCollection = async (
    recipeId: string,
    setOpenCollectionModal: Dispatch<SetStateAction<boolean>>,
    e: React.SyntheticEvent,
    setcompareRecipeList?: (state: any) => void,
  ) => {
    e.stopPropagation();
    dispatch(setActiveRecipeId(recipeId));
    dispatch(setOpenCollectionsTary(false));
    const variablesData = {
      recipe: recipeId,
      userEmail: dbUser?.email,
    };

    try {
      await addNewRecipeToCollection({
        variables: {
          data: variablesData,
        },
      });

      const { data: lastModified } = await getLastModifiedCollection({
        variables: {
          userEmail: dbUser?.email,
        },
      });
      dispatch(
        setLastModifiedCollection({
          id: lastModified?.getLastModifieldCollection?._id,
          name: lastModified?.getLastModifieldCollection?.name,
        }),
      );

      const obj = {
        userCollections: [lastModified?.getLastModifieldCollection?._id],
      };
      updateRecipe(recipeId, obj);
      dispatch(setCompareList(updateRecipeFunc(compareList, obj, recipeId)));
      if (typeof setcompareRecipeList === "function") {
        setcompareRecipeList((state = []) =>
          updateRecipeFunc(state, obj, recipeId),
        );
      }

      setOpenCollectionModal(true);
      setTimeout(() => {
        setOpenCollectionModal(false);
      }, 5000);
      // reactToastifyNotification("info", `Successfully added to new collection`);
    } catch (error) {
      // updateRecipe(recipeId, { userCollections: null });
      notification("error", error?.message);
      console.log(error);
    }
  };

  return addToCollection;
};

export default useForAddToCollection;
