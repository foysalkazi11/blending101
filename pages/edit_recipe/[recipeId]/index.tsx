/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import EditRecipePage from "../../../components/recipe/editRecipe/EditRecipe.component";
import { useQuery } from "@apollo/client";
import {
  BLEND_CATEGORY,
  GET_RECIPE_NUTRITION,
  INGREDIENTS_BY_CATEGORY_AND_CLASS,
} from "../../../gqlLib/recipes/queries/getEditRecipe";
import { GET_RECIPE } from "../../../gqlLib/recipes/queries/getRecipeDetails";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  setRecipeImagesArray,
  setSelectedIngredientsList,
} from "../../../redux/edit_recipe/editRecipeStates";

const EditRecipeComponent = () => {
  const dispatch = useAppDispatch();
  const selectedIngredientsList = useAppSelector(
    (state) => state.editRecipeReducer.selectedIngredientsList
  );
  const router = useRouter();
  const { recipeId } = router.query;

  const { data: classData } = useQuery(INGREDIENTS_BY_CATEGORY_AND_CLASS, {
    variables: { classType: "All" },
  });

  const { data: recipeData } = useQuery(GET_RECIPE, {
    variables: { recipeId: recipeId },
  });
  const { data: allBlendCategory } = useQuery(BLEND_CATEGORY);
  const { data: nutritionData } = useQuery(GET_RECIPE_NUTRITION(selectedIngredientsList));

  const [classBasedData, recipeBasedData, allBlendBasedCategory, recipeBasedNutrition] = [
    classData?.filterIngredientByCategoryAndClass,
    recipeData?.getARecipe,
    allBlendCategory?.getAllCategories,
    nutritionData?.getBlendNutritionBasedOnRecipe,
  ];

  useEffect(() => {
    if (!recipeId || !classBasedData || !recipeBasedData || !allBlendBasedCategory)
      return;
    console.log({ recipeId });
    console.log({ classBasedData });
    console.log({ recipeBasedData });
    console.log({ allBlendBasedCategory });
    console.log({ recipeBasedNutrition });
  }, [recipeId, classBasedData, recipeBasedData, allBlendBasedCategory]);

  useEffect(() => {
    if (!classBasedData || !recipeBasedData) return;
    const presentIngredient = classBasedData?.filter((elem) => {
      const itemMatch = recipeBasedData?.ingredients?.filter((itm) => {
        return elem._id === itm?.ingredientId?._id;
      });
      if (itemMatch?.length) return itemMatch[0];
    });
    dispatch(setSelectedIngredientsList(presentIngredient));
    dispatch(setRecipeImagesArray(recipeBasedData?.image));
  }, [classBasedData, recipeBasedData]);

  return (
    <EditRecipePage
      recipeName={recipeBasedData?.name}
      allIngredients={classBasedData}
      nutritionTrayData={recipeBasedNutrition && JSON.parse(recipeBasedNutrition)}
      recipeInstructions={recipeBasedData?.recipeInstructions}
      allBlendCategories={allBlendBasedCategory}
      selectedBLendCategory={recipeBasedData?.recipeBlendCategory?.name}
    />
  );
};

export default EditRecipeComponent;
