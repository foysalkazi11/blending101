/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import EditRecipePage from '../../../components/recipe/editRecipe/EditRecipe.component';
import { useMutation, useQuery } from '@apollo/client';
import {
  BLEND_CATEGORY,
  GET_RECIPE_NUTRITION,
  INGREDIENTS_BY_CATEGORY_AND_CLASS,
} from '../../../gqlLib/recipes/queries/getEditRecipe';
import {
  GET_A_RECIPE_FOR_EDIT_RECIPE,
  GET_RECIPE,
} from '../../../gqlLib/recipes/queries/getRecipeDetails';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  setDescriptionRecipe,
  setEditRecipeName,
  setIngredientArrayForNutrition,
  setRecipeFileImagesArray,
  setRecipeImagesArray,
  setSelectedIngredientsList,
  setServingCounter,
} from '../../../redux/edit_recipe/editRecipeStates';
import { EDIT_A_RECIPE } from '../../../gqlLib/recipes/mutations/editRecipe';
import { setLoading } from '../../../redux/slices/utilitySlice';
import imageUploadS3 from '../../../components/utility/imageUploadS3';
import reactToastifyNotification from '../../../components/utility/reactToastifyNotification';

const EditRecipeComponent = () => {
  const router = useRouter();
  const { recipeId } = router.query;
  const { dbUser } = useAppSelector((state) => state?.user);
  const dispatch = useAppDispatch();
  const [isFetching, setIsFetching] = useState(null);
  const [calculateIngOz, SetcalculateIngOz] = useState(null);

  const handleSubmitData = async (images) => {
    dispatch(setLoading(true));
    let res: any;
    try {
      if (images?.length) {
        res = await imageUploadS3(images);
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
    }
    if (res) {
      return res;
    } else console.log({ res: 'something went wrong in image uploading' });
  };

  const servingCounter = useAppSelector(
    (state) => state.editRecipeReducer.servingCounter,
  );
  const recipeName = useAppSelector(
    (state) => state?.editRecipeReducer?.recipeName,
  );
  const selectedIngredientsList = useAppSelector(
    (state) => state?.editRecipeReducer?.selectedIngredientsList,
  );
  const ingredientArrayForNutrition = useAppSelector(
    (state) => state?.editRecipeReducer?.ingredientArrayForNutrition,
  );
  const recipeInstruction = useAppSelector(
    (state) => state?.editRecipeReducer?.recipeInstruction,
  );
  const recipeDescription = useAppSelector(
    (state) => state?.editRecipeReducer?.descriptionRecipe,
  );
  const selectedBLendCategory = useAppSelector(
    (state) => state?.editRecipeReducer?.selectedBlendCategory,
  );
  const imagesArray = useAppSelector(
    (state) => state.editRecipeReducer.recipeImagesArray,
  );
  const recipeFileImagesArray = useAppSelector(
    (state) => state.editRecipeReducer.recipeFileImagesArray,
  );
  const { data: classData } = useQuery(INGREDIENTS_BY_CATEGORY_AND_CLASS, {
    variables: { classType: 'All' },
  });

  const { data: recipeData, loading: recipeLoading } = useQuery(GET_RECIPE, {
    variables: { recipeId: recipeId, userId: dbUser?._id },
  });
  const { data: allBlendCategory } = useQuery(BLEND_CATEGORY);
  const { data: nutritionData, loading: nutritionDataLoading } = useQuery(
    GET_RECIPE_NUTRITION(ingredientArrayForNutrition),
  );
  const [
    classBasedData,
    recipeBasedData,
    allBlendBasedCategory,
    recipeBasedNutrition,
  ] = [
    classData?.filterIngredientByCategoryAndClass,
    recipeData?.getARecipe,
    allBlendCategory?.getAllCategories,
    nutritionData?.getBlendNutritionBasedOnRecipexxx,
  ];

  useEffect(() => {
    if (!classBasedData || !recipeBasedData) return;

    const presentIngredient = classBasedData?.filter((elem) => {
      const itemMatch = recipeBasedData?.ingredients?.filter((itm) => {
        return elem._id === itm?.ingredientId?._id;
      });
      if (itemMatch?.length) return itemMatch[0];
    });
    dispatch(setSelectedIngredientsList(presentIngredient));
    dispatch(setIngredientArrayForNutrition(presentIngredient));
    dispatch(setEditRecipeName(recipeBasedData?.name));
    dispatch(setDescriptionRecipe(recipeBasedData?.description));
    dispatch(setRecipeImagesArray(recipeBasedData?.image));
    dispatch(setServingCounter(recipeBasedData?.servingSize));
  }, [classBasedData, recipeBasedData]);

  const [editARecipe] = useMutation(
    EDIT_A_RECIPE({
      recipeId: recipeId,
      recipeName: recipeName,
      description: recipeDescription,
      recipeIngredients: selectedIngredientsList,
      recipeBlendCategory: selectedBLendCategory,
      recipeInstruction: recipeInstruction,
      imagesArray: imagesArray,
      servingSize: calculateIngOz,
      servings: servingCounter,
    }),
  );

  const editARecipeFunction = async () => {
    setIsFetching(true);
    let urlImageArray = imagesArray?.filter(
      (elem) => elem.__typename == 'ImageType',
    );
    let updatedImageArray = [];

    if (recipeFileImagesArray.length > 0) {
      let imageUrlArray = await handleSubmitData(recipeFileImagesArray);

      imageUrlArray?.forEach((elem) => {
        updatedImageArray = [
          ...updatedImageArray,
          {
            __typename: `ImageType`,
            image: elem,
            default: false,
          },
        ];
      });
    }
    dispatch(setRecipeImagesArray([...urlImageArray, ...updatedImageArray]));

    try {
      await editARecipe();
      reactToastifyNotification('info', 'Recipe Updated');
      dispatch(setRecipeFileImagesArray([]));
      setIsFetching(false);
    } catch (error) {
      reactToastifyNotification('error', 'Error while saving Recipe');
      setIsFetching(false);
      return;
    }
  };

  useEffect(() => {
    dispatch(setIngredientArrayForNutrition(selectedIngredientsList));
    let ozArr = 0;
    selectedIngredientsList?.forEach((item) => {
      const ing = item?.portions?.find((ing) => ing?.default);
      ozArr = ozArr + parseInt(ing?.meausermentWeight);
    });
    SetcalculateIngOz(Math?.round(ozArr * 0.033814));
  }, [selectedIngredientsList]);

  return (
    <EditRecipePage
      recipeName={recipeName}
      allIngredients={classBasedData}
      nutritionTrayData={
        recipeBasedNutrition && JSON.parse(recipeBasedNutrition)
      }
      recipeInstructions={recipeBasedData?.recipeInstructions}
      allBlendCategories={allBlendBasedCategory}
      selectedBLendCategory={recipeBasedData?.recipeBlendCategory?.name}
      isFetching={isFetching}
      editARecipeFunction={editARecipeFunction}
      calculatedIngOz={calculateIngOz}
      nutritionDataLoading={nutritionDataLoading}
    />
  );
};

export default EditRecipeComponent;
