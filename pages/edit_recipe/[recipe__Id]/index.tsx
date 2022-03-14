/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

// import { useLazyQuery } from "@apollo/client";
// import { useRouter } from "next/router";
// import EditRecipePage from "../../../components/recipe/editRecipe/EditRecipe.component";
// import {
//   BLEND_CATEGORY,
//   GET_RECIPE_NUTRITION_EDITRECIPE,
//   INGREDIENTS_BY_CATEGORY_AND_CLASS,
// } from "../../../gqlLib/recipes/queries/getEditRecipe";
// import { GET_RECIPE } from "../../../gqlLib/recipes/queries/getRecipeDetails";
// import {
//   setAllBlendCategories,
//   setAllIngredientListBasedOnClass,
//   setEditRecipeName,
// } from "../../../redux/edit_recipe/editRecipeStates";
// import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

const EditRecipe = () => {
  // const router = useRouter();
  // const { recipe__Id } = router?.query;
  // const dispatch = useAppDispatch();
  // const recipeName = useAppSelector((state) => state?.editRecipeReducer?.recipeName);
  // const allBlendCategories = useAppSelector(
  //   (state) => state?.editRecipeReducer?.allBlendCategories
  // );
  // const allIngredientListBasedOnClass = useAppSelector(
  //   (state) => state?.editRecipeReducer?.allIngredientListBasedOnClass
  // );

  // const [getARecipe, { loading: gettingRecipe, data: recipe }] = useLazyQuery(GET_RECIPE, {
  //   fetchPolicy: "network-only",
  //   variables: { recipeId: recipe__Id },
  // });
  // const [getAllCategories, { loading: blendCategoriesInProgress, data: blendCategories }] =
  //   useLazyQuery(BLEND_CATEGORY, {
  //     fetchPolicy: "network-only",
  //   });
  // const [
  //   filterIngredientByCategoryAndClass,
  //   { loading: classBasedIngredientsListInProgress, data: classBasedIngredientsList },
  // ] = useLazyQuery(INGREDIENTS_BY_CATEGORY_AND_CLASS, {
  //   fetchPolicy: "network-only",
  //   variables: { classType: "All" },
  // });

  // useEffect(() => {
  //   getAllCategories();
  //   filterIngredientByCategoryAndClass();
  // }, []);

  // useEffect(() => {
  //   getARecipe();
  // }, [recipe__Id]);

  // useEffect(() => {
  //   if (!recipe || !blendCategories) return;
  //   const recipeData = recipe?.getARecipe;
  //   const blendCategoriesList = blendCategories?.getAllCategories;
  //   dispatch(setEditRecipeName(recipeData?.name));
  //   dispatch(setAllBlendCategories(blendCategoriesList));
  //   // dispatch(setAllIngredientListBasedOnClass(classBasedIngredientsList))
  // }, [recipe]);

  // useEffect(() => {
  //   console.log(allBlendCategories)
  // }, [allBlendCategories])



  // const recipeName = useAppSelector((state) => state?.editRecipeReducer?.recipeName);

  // const selectedIngredientsList = useAppSelector(
  //   (state) => state.editRecipeReducer.selectedIngredientsList
  // );
  // const allIngredientListBasedOnClass = useAppSelector(
  //   (state) => state.editRecipeReducer.allIngredientListBasedOnClass
  // );

  // const [
  //   getBlendNutritionBasedOnRecipe,
  //   { loading: gettingNutritionData, data: nutritionData },
  // ] = useLazyQuery(GET_RECIPE_NUTRITION_EDITRECIPE(ingredientsPortionArrayForNutrition));

  // useEffect(() => {
  //   getARecipe();
  //   getAllCategories();
  //   filterIngredientByCategoryAndClass();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [recipe__Id]);

  // useEffect(() => {
  //   if (!recipe || !blendCategories || !classBasedIngredientsList) return;
  //   if (recipe) {
  //     dispatch(setEditRecipeName(recipe?.getARecipe?.name));
  //   }
  //   if (blendCategories) {
  //     setAllBlendCategories(blendCategories?.getAllCategories);
  //   }
  //   if (classBasedIngredientsList) {
  //     dispatch(
  //       setAllIngredientListBasedOnClass(
  //         classBasedIngredientsList?.filterIngredientByCategoryAndClass
  //       )
  //     );
  //   }
  // }, [recipe]);

  // useEffect(() => {
  //   initialPopulateIngredients(recipe?.getARecipe?.ingredients);
  // }, [leftAllIngredientsList]);

  // useEffect(() => {
  //   if (!nutritionData) return;
  //   setNutritionTrayData(JSON.parse(nutritionData?.getBlendNutritionBasedOnRecipe));
  // }, [nutritionData]);

  // const initialPopulateNutrition = (list) => {
  //   let ingredientIdArray = [];
  //   let ingredientIdMainArray = [];
  //   let ingredientIdArraySet;

  //   list?.forEach((itm) => {
  //     ingredientIdArray = [...ingredientIdArray, itm?.ingredientId?._id];
  //   });
  //   ingredientIdArraySet = new Set(ingredientIdArray);
  //   ingredientIdArray = [...ingredientIdArraySet];

  //   leftAllIngredientsList?.forEach((itm) => {
  //     ingredientIdArray?.forEach((elem) => {
  //       if (elem === itm._id) {
  //         ingredientIdMainArray = [...ingredientIdMainArray, itm];
  //       }
  //     });
  //   });

  //   setIngredientsPortionArrayForNutrition(ingredientIdMainArray);
  //   getBlendNutritionBasedOnRecipe();
  // };

  // const initialPopulateIngredients = (list) => {
  //   let ingredientIdArray = [];
  //   let ingredientIdMainArray = [];
  //   let ingredientIdArraySet;

  //   list?.forEach((itm) => {
  //     ingredientIdArray = [...ingredientIdArray, itm?.ingredientId?._id];
  //   });
  //   ingredientIdArraySet = new Set(ingredientIdArray);
  //   ingredientIdArray = [...ingredientIdArraySet];

  //   leftAllIngredientsList?.forEach((itm) => {
  //     ingredientIdArray.forEach((elem) => {
  //       if (elem === itm._id) {
  //         ingredientIdMainArray = [...ingredientIdMainArray, itm];
  //       }
  //     });
  //   });
  //   dispatch(setSelectedIngredientsList(ingredientIdMainArray));
  //   initialPopulateNutrition(list);
  // };

  return (
    <div>
      {/* {recipeName}
      <EditRecipePage /> */}
    </div>
  );
};

export default EditRecipe;
