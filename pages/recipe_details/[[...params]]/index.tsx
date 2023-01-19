import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import RecipeDetails from "../../../components/recipe/recipeDetails/RecipeDetails";
import { GET_RECIPE } from "../../../gqlLib/recipes/queries/getRecipeDetails";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import useGetBlendNutritionBasedOnRecipexxx from "../../../customHooks/useGetBlendNutritionBasedOnRecipexxx";
import {
  setOpenVersionTray,
  setOpenVersionTrayFormWhichPage,
} from "../../../redux/slices/versionTraySlice";
import { GiGl } from "../../../type/nutrationType";
import useToGetARecipe from "../../../customHooks/useToGetARecipe";
import SkeletonRecipeDetails from "../../../theme/skeletons/skeletonRecipeDetails";
import AContainer from "../../../containers/A.container";
import ErrorPage from "../../../components/pages/404Page";
import { updateHeadTagInfo } from "../../../redux/slices/headDataSlice";

const Index = () => {
  const router = useRouter();
  const { params = [], token = "" } = router.query;
  const recipe__Id = params?.[0] || "";
  const versionId = params?.[1] || "";
  const [nutritionState, setNutritionState] = useState(null);
  const { dbUser } = useAppSelector((state) => state?.user);
  const { detailsARecipe } = useAppSelector((state) => state?.recipe);
  const dispatch = useAppDispatch();

  const [getARecipe, { loading: recipeLoading, error: getARecipeError }] =
    useLazyQuery(GET_RECIPE, {
      fetchPolicy: "cache-and-network",
    });
  const handleToGetARecipe = useToGetARecipe();
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
    // dispatch(setDetailsARecipe({} as RecipeDetailsType));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (detailsARecipe?._id !== recipe__Id) {
      if (dbUser?._id && recipe__Id) {
        handleToGetARecipe(recipe__Id, dbUser?._id, getARecipe, token);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe__Id, dbUser?._id]);

  useEffect(() => {
    dispatch(
      updateHeadTagInfo({
        title: "Details a recipe",
        description: "details a recipe",
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //@ts-ignore
  const recipeBasedNutrition =
    nutritionData?.getNutrientsListAndGiGlByIngredients?.nutrients;
  const giGl: GiGl = nutritionData?.getNutrientsListAndGiGlByIngredients?.giGl;

  if (recipeLoading) {
    return (
      <AContainer showHeader={true} logo={true}>
        <SkeletonRecipeDetails />;
      </AContainer>
    );
  }
  if (getARecipeError) {
    return <ErrorPage errorMessage="Recipe not found" />;
  }

  return (
    <RecipeDetails
      recipeData={recipeLoading ? {} : detailsARecipe}
      nutritionData={
        recipeBasedNutrition ? JSON.parse(recipeBasedNutrition) : []
      }
      nutritionState={nutritionState}
      setNutritionState={setNutritionState}
      nutritionDataLoading={nutritionDataLoading}
      giGl={giGl}
    />
  );
};

export default Index;
