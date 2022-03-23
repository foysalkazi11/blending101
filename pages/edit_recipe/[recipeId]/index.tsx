/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import EditRecipePage from "../../../components/recipe/editRecipe/EditRecipe.component";
import { useMutation, useQuery } from "@apollo/client";
import {
  BLEND_CATEGORY,
  GET_RECIPE_NUTRITION,
  INGREDIENTS_BY_CATEGORY_AND_CLASS,
} from "../../../gqlLib/recipes/queries/getEditRecipe";
import { GET_A_RECIPE_FOR_EDIT_RECIPE } from "../../../gqlLib/recipes/queries/getRecipeDetails";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  setEditRecipeName,
  setRecipeImagesArray,
  setSelectedIngredientsList,
} from "../../../redux/edit_recipe/editRecipeStates";
import { EDIT_A_RECIPE } from "../../../gqlLib/recipes/mutations/editRecipe";

const EditRecipeComponent = () => {
  const router = useRouter();
  const { recipeId } = router.query;
  const dispatch = useAppDispatch();

  const recipeName = useAppSelector((state) => state?.editRecipeReducer?.recipeName);
  const selectedIngredientsList = useAppSelector(
    (state) => state?.editRecipeReducer?.selectedIngredientsList
  );
  const recipeInstruction = useAppSelector((state) => state?.editRecipeReducer?.recipeInstruction);

  const { data: classData } = useQuery(INGREDIENTS_BY_CATEGORY_AND_CLASS, {
    variables: { classType: "All" },
  });

  const { data: recipeData } = useQuery(GET_A_RECIPE_FOR_EDIT_RECIPE, {
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
    if (!recipeId || !classBasedData || !recipeBasedData || !allBlendBasedCategory) return;
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
    dispatch(setEditRecipeName(recipeBasedData?.name));
    dispatch(setRecipeImagesArray(recipeBasedData?.image));
  }, [classBasedData, recipeBasedData]);

  useEffect(() => {
    console.log(recipeData);
  }, [recipeId, recipeData]);

  const [editARecipe] = useMutation(
    EDIT_A_RECIPE({
      recipeId: recipeId,
      recipeName: recipeName,
      recipeIngredients: selectedIngredientsList,
      recipeInstruction: recipeInstruction,
    })
  );

  useEffect(() => {
    console.log(selectedIngredientsList);
  }, [selectedIngredientsList]);

  return (
    <EditRecipePage
      recipeName={recipeName}
      allIngredients={classBasedData}
      nutritionTrayData={recipeBasedNutrition && JSON.parse(recipeBasedNutrition)}
      recipeInstructions={recipeBasedData?.recipeInstructions}
      allBlendCategories={allBlendBasedCategory}
      selectedBLendCategory={recipeBasedData?.recipeBlendCategory?.name}
      editARecipeFunction={editARecipe}
    />
  );
};

export default EditRecipeComponent;
