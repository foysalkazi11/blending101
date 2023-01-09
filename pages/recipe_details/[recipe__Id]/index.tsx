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

const Index = () => {
  const router = useRouter();
  const { recipe__Id }: any = router.query;
  const [nutritionState, setNutritionState] = useState(null);
  const { dbUser } = useAppSelector((state) => state?.user);
  const { detailsARecipe } = useAppSelector((state) => state?.recipe);
  const dispatch = useAppDispatch();

  const [getARecipe, { loading: recipeLoading }] = useLazyQuery(GET_RECIPE, {
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
        console.log("fetch data");

        handleToGetARecipe(recipe__Id, dbUser?._id, getARecipe);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe__Id, dbUser?._id]);

  //@ts-ignore
  const recipeBasedNutrition =
    nutritionData?.getNutrientsListAndGiGlByIngredients?.nutrients;
  const giGl: GiGl = nutritionData?.getNutrientsListAndGiGlByIngredients?.giGl;

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
