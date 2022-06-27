import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import RecipeDetails from "../../../components/recipe/recipeDetails/RecipeDetails";
import { GET_RECIPE } from "../../../gqlLib/recipes/queries/getRecipeDetails";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import useGetBlendNutritionBasedOnRecipexxx from "../../../customHooks/useGetBlendNutritionBasedOnRecipexxx";
import { setDetailsARecipe } from "../../../redux/slices/recipeSlice";
import {
  setOpenVersionTray,
  setOpenVersionTrayFormWhichPage,
} from "../../../redux/slices/versionTraySlice";

const Index = () => {
  const router = useRouter();
  const { recipe__Id } = router.query;
  const [nutritionState, setNutritionState] = useState(null);
  const [singleElement, setsingleElement] = useState(false);
  const { dbUser } = useAppSelector((state) => state?.user);
  const { detailsARecipe } = useAppSelector((state) => state?.recipe);
  const dispatch = useAppDispatch();
  const { data: recipeData, loading: recipeLoading } = useQuery(GET_RECIPE, {
    variables: { recipeId: recipe__Id, userId: dbUser?._id },
    fetchPolicy: "network-only",
  });
  const { loading: nutritionDataLoading, data: nutritionData } =
    useGetBlendNutritionBasedOnRecipexxx(
      detailsARecipe?.ingredients,
      nutritionState,
      () => {},
      true,
    );

  useEffect(() => {
    dispatch(setOpenVersionTray(false));
    dispatch(setOpenVersionTrayFormWhichPage("details"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!recipeLoading && recipeData?.getARecipe) {
      dispatch(setDetailsARecipe(recipeData?.getARecipe));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeData?.getARecipe]);
  //@ts-ignore
  const recipeBasedNutrition = nutritionData?.getBlendNutritionBasedOnRecipexxx;

  return (
    <RecipeDetails
      recipeData={recipeLoading ? {} : detailsARecipe}
      nutritionData={
        recipeBasedNutrition ? JSON.parse(recipeBasedNutrition) : []
      }
      nutritionState={nutritionState}
      setNutritionState={setNutritionState}
      singleElement={singleElement}
      setsingleElement={setsingleElement}
      nutritionDataLoading={nutritionDataLoading}
    />
  );
};

export default Index;
