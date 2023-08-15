import { useMutation } from "@apollo/client";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import notification from "../components/utility/reactToastifyNotification";
import ADD_NEW_RECIPE_TO_COLLECTION from "../gqlLib/collection/mutation/addNewRecipeToCollection";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  setActiveRecipeId,
  setLastModifiedCollection,
} from "../redux/slices/collectionSlice";
import { setReferenceOfRecipeUpdateFunc } from "../redux/slices/recipeSlice";
import { setOpenCollectionsTary } from "../redux/slices/sideTraySlice";
import { ReferenceOfRecipeUpdateFuncType } from "../type/recipeType";
import { useUser } from "../context/AuthProvider";

const useForAddToCollection = () => {
  const user = useUser();
  const dispatch = useAppDispatch();
  const [
    addNewRecipeToCollection,
    { called, client, loading, reset, data, error },
  ] = useMutation(ADD_NEW_RECIPE_TO_COLLECTION);

  let timeOut;

  const addToCollection = async (
    recipeId: string,
    setOpenCollectionModal: Dispatch<SetStateAction<boolean>>,
    e: React.SyntheticEvent,
    updateDataFunc: ReferenceOfRecipeUpdateFuncType = () => {},
  ) => {
    e.stopPropagation();
    dispatch(setActiveRecipeId(recipeId));
    dispatch(setOpenCollectionsTary(false));
    const variablesData = {
      recipe: recipeId,
      userId: user.id,
    };

    try {
      const { data } = await addNewRecipeToCollection({
        variables: {
          data: variablesData,
        },
      });

      const { _id = "", name = "" } = data?.addTolastModifiedCollection;
      dispatch(
        setLastModifiedCollection({
          id: _id,
          name: name,
        }),
      );

      const obj = {
        userCollections: [data?.addTolastModifiedCollection?._id],
      };
      updateDataFunc(recipeId, obj, {});
      dispatch(setReferenceOfRecipeUpdateFunc(updateDataFunc));

      setOpenCollectionModal(true);
      timeOut = setTimeout(() => {
        setOpenCollectionModal(false);
      }, 5000);
      // reactToastifyNotification("info", `Successfully added to new collection`);
    } catch (error) {
      // updateRecipe(recipeId, { userCollections: null });
      notification("error", error?.message || "Added to collection failed");
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeOut);
    };
  }, [timeOut]);

  return { addToCollection, called, client, loading, reset, data, error };
};

export default useForAddToCollection;
