import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import RecipeDetails from "../../../components/recipe/recipeDetails/RecipeDetails";
import { GET_RECIPE } from "../../../gqlLib/recipes/queries/getRecipeDetails";
import { useRouter } from "next/router";
import { useAppSelector } from "../../../redux/hooks";
import useGetBlendNutritionBasedOnRecipexxx from "../../../customHooks/useGetBlendNutritionBasedOnRecipexxx";
import useLocalStorage from "../../../customHooks/useLocalStorage";

const Index = () => {
  const router = useRouter();
  const { recipe__Id } = router.query;
  const [nutritionState, setNutritionState] = useState(null);
  const [singleElement, setsingleElement] = useState(false);
  const { dbUser } = useAppSelector((state) => state?.user);
  const { data: recipeData, loading: recipeLoading } = useQuery(GET_RECIPE, {
    fetchPolicy: "network-only",
    variables: { recipeId: recipe__Id, userId: dbUser?._id },
  });
  const { loading: nutritionDataLoading, data: nutritionData } =
    useGetBlendNutritionBasedOnRecipexxx(
      recipeData?.getARecipe?.ingredients,
      nutritionState,
      () => {},
      true,
    );

  const [recipeDetails, setRecipeDetails] = useLocalStorage(
    "recipeDetails",
    {},
  );

  useEffect(() => {
    setRecipeDetails({});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!recipeLoading && recipeData?.getARecipe) {
      setRecipeDetails(recipeData?.getARecipe);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeData?.getARecipe]);
  //@ts-ignore
  const recipeBasedNutrition = nutritionData?.getBlendNutritionBasedOnRecipexxx;

  return (
    <RecipeDetails
      recipeData={recipeDetails}
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
