import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect, useRef, useState } from 'react';
import RecipeDetails from '../../../components/recipe/recipeDetails/RecipeDetails';
import {
  GET_NUTRITION,
  GET_RECIPE,
} from '../../../gqlLib/recipes/queries/getRecipeDetails';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../../redux/hooks';
import GET_BLEND_NUTRITION_BASED_ON_RECIPE_XXX from '../../../gqlLib/recipes/queries/getBlendNutritionBasedOnRecipeXxx';

const Index = () => {
  const router = useRouter();
  const { recipe__Id } = router.query;
  const [nutritionState, setNutritionState] = useState(null);
  const [singleElement, setsingleElement] = useState(false);
  const { dbUser } = useAppSelector((state) => state?.user);
  const { data: recipeData, loading: recipeLoading } = useQuery(GET_RECIPE, {
    fetchPolicy: 'network-only',
    variables: { recipeId: recipe__Id, userId: dbUser?._id },
  });
  const [
    getBlendNutritionBasedOnRecipe,
    { loading: nutritionDataLoading, data: nutritionData },
  ] = useLazyQuery(GET_BLEND_NUTRITION_BASED_ON_RECIPE_XXX);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!recipeLoading && recipeData?.getARecipe) {
      getBlendNutritionBasedOnRecipe({
        variables: {
          ingredientsInfo: [
            ...recipeData?.getARecipe?.ingredients?.map((item) => ({
              ingredientId: item.ingredientId._id,
              value: item?.selectedPortion?.gram,
            })),
          ],
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeData]);

  // useEffect(() => {
  //   if (recipeData && singleElement === false) {
  //     setNutritionState(recipeData?.getARecipe?.ingredients);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [nutritionState, singleElement]);

  // useEffect(() => {
  //   getBlendNutritionBasedOnRecipe({
  //     variables: {
  //       ingredientsInfo: [
  //         ...nutritionState?.map((item) => ({
  //           ingredientId: item.ingredientId._id,
  //           value: item?.selectedPortion?.gram,
  //         })),
  //       ],
  //     },
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [nutritionState]);

  useEffect(() => {
    if (isMounted.current) {
      if (nutritionState?.ingredientId?._id) {
        getBlendNutritionBasedOnRecipe({
          variables: {
            ingredientsInfo: [
              {
                ingredientId: nutritionState?.ingredientId?._id,
                value: parseFloat(nutritionState?.selectedPortion?.gram),
              },
            ],
          },
        });
      } else {
        getBlendNutritionBasedOnRecipe({
          variables: {
            ingredientsInfo: [
              ...recipeData?.getARecipe?.ingredients?.map((item) => ({
                ingredientId: item.ingredientId._id,
                value: item?.selectedPortion?.gram,
              })),
            ],
          },
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nutritionState]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const recipeBasedNutrition = nutritionData?.getBlendNutritionBasedOnRecipexxx;

  return (
    <RecipeDetails
      recipeData={recipeData && recipeData?.getARecipe}
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
