/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import EditRecipePage from '../../../components/recipe/editRecipe/EditRecipe.component';
import { useMutation, useQuery } from '@apollo/client';
import {
  BLEND_CATEGORY,
  GET_RECIPE_NUTRITION,
  INGREDIENTS_BY_CATEGORY_AND_CLASS,
} from '../../../gqlLib/recipes/queries/getEditRecipe';
import { GET_RECIPE } from '../../../gqlLib/recipes/queries/getRecipeDetails';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  setDescriptionRecipe,
  setEditRecipeName,
  setIngredientArrayForNutrition,
  setRecipeImagesArray,
  setSelectedIngredientsList,
  setServingCounter,
} from '../../../redux/edit_recipe/editRecipeStates';
import EDIT_A_RECIPE from '../../../gqlLib/recipes/mutations/editARecipe';
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
  const [images, setImages] = useState<any[]>([]);
  const [existingimages, setExistingImages] = useState<string[]>([]);

  const isMounted = useRef(false);

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
  const { data: classData } = useQuery(INGREDIENTS_BY_CATEGORY_AND_CLASS, {
    variables: { classType: 'All' },
  });

  const { data: recipeData, loading: recipeLoading } = useQuery(GET_RECIPE, {
    variables: { recipeId: recipeId, userId: dbUser?._id },
    fetchPolicy: 'network-only',
  });
  const { data: allBlendCategory } = useQuery(BLEND_CATEGORY);
  const { data: nutritionData, loading: nutritionDataLoading } = useQuery(
    GET_RECIPE_NUTRITION(ingredientArrayForNutrition),
  );
  const [editRecipe] = useMutation(EDIT_A_RECIPE);
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
    dispatch(setServingCounter(recipeBasedData?.servings));
    SetcalculateIngOz(recipeBasedData?.servingSize);
    setExistingImages(recipeBasedData?.image?.map((item) => `${item?.image}`));
  }, [classBasedData, recipeBasedData]);

  const editARecipeFunction = async () => {
    dispatch(setLoading(true));

    let ingArr = [];
    selectedIngredientsList?.forEach((item) => {
      let value = item?.portions?.find((item) => item.default);
      if (value) {
        ingArr?.push({
          ingredientId: item?._id,
          selectedPortionName: value?.measurement,
          weightInGram: Number(value?.meausermentWeight),
        });
      }
    });

    const howToArr = recipeInstruction?.map((item) => `${item?.step}`);
    const imgArr = existingimages?.map((img, index) =>
      index === 0
        ? { image: img, default: true }
        : { image: img, default: false },
    );

    let obj = {
      editId: recipeId,
      editableObject: {
        name: recipeName,
        description: recipeDescription,
        image: imgArr,
        ingredients: ingArr,
        recipeBlendCategory: selectedBLendCategory,
        servingSize: calculateIngOz,
        servings: servingCounter,
        recipeInstructions: howToArr,
      },
    };

    try {
      if (images?.length) {
        //@ts-ignore
        let imageArr: string[] = await imageUploadS3(images);
        imageArr = [...existingimages, ...imageArr];
        const finalImaArr = imageArr?.map((img, index) =>
          index === 0
            ? { image: img, default: true }
            : { image: img, default: false },
        );

        obj = {
          ...obj,
          editableObject: { ...obj?.editableObject, image: finalImaArr },
        };
        await editRecipe({
          variables: {
            data: obj,
          },
        });
        dispatch(setLoading(false));
        reactToastifyNotification('info', 'Recipe Updateded successfully');
        setExistingImages(imageArr);
        setImages([]);
      } else {
        await editRecipe({
          variables: {
            data: obj,
          },
        });
        dispatch(setLoading(false));
        reactToastifyNotification('info', 'Recipe Updateded successfully ');
      }
    } catch (error) {
      dispatch(setLoading(false));
      reactToastifyNotification('error', 'Error while saving Recipe');
    }
  };

  useEffect(() => {
    if (isMounted.current) {
      dispatch(setIngredientArrayForNutrition(selectedIngredientsList));
      let ozArr = 0;
      selectedIngredientsList?.forEach((item) => {
        const ing = item?.portions?.find((ing) => ing?.default);
        ozArr = ozArr + parseInt(ing?.meausermentWeight);
      });
      SetcalculateIngOz(Math?.round(ozArr * 0.033814));
    }
  }, [selectedIngredientsList]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

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
      images={images}
      setImages={setImages}
      existingImage={existingimages}
      setExistingImage={setExistingImages}
    />
  );
};

export default EditRecipeComponent;
