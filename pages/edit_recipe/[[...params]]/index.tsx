/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import EditRecipePage from "../../../components/recipe/editRecipe/EditRecipe.component";
import { useMutation, useQuery } from "@apollo/client";
import {
  BLEND_CATEGORY,
  INGREDIENTS_BY_CATEGORY_AND_CLASS,
} from "../../../gqlLib/recipes/queries/getEditRecipe";
import { GET_RECIPE } from "../../../gqlLib/recipes/queries/getRecipeDetails";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  setDescriptionRecipe,
  setEditRecipeName,
  setRecipeImagesArray,
  setSelectedIngredientsList,
  setServingCounter,
} from "../../../redux/edit_recipe/editRecipeStates";
import EDIT_A_RECIPE from "../../../gqlLib/recipes/mutations/editARecipe";
import { setLoading } from "../../../redux/slices/utilitySlice";
import imageUploadS3 from "../../../components/utility/imageUploadS3";
import reactToastifyNotification from "../../../components/utility/reactToastifyNotification";
import useGetBlendNutritionBasedOnRecipexxx from "../../../customHooks/useGetBlendNutritionBasedOnRecipexxx";
import useToGetARecipeVersion from "../../../customHooks/useToGetARecipeVersion";
import useToGetARecipe from "../../../customHooks/useToGetARecipe";
import {
  setOpenVersionTray,
  setOpenVersionTrayFormWhichPage,
} from "../../../redux/slices/versionTraySlice";
import { setDetailsARecipe } from "../../../redux/slices/recipeSlice";

const EditRecipeComponent = () => {
  const router = useRouter();
  const { params = [] } = router.query;
  const recipeId = params?.[0] || "";
  const versionId = params?.[2] || "";
  const { dbUser } = useAppSelector((state) => state?.user);
  const dispatch = useAppDispatch();
  const [calculateIngOz, SetcalculateIngOz] = useState(null);
  const [images, setImages] = useState<any[]>([]);
  const [existingimages, setExistingImages] = useState<string[]>([]);
  const [nutritionState, setNutritionState] = useState(null);
  const isMounted = useRef(false);
  const selectedIngredientsList = useAppSelector(
    (state) => state?.editRecipeReducer?.selectedIngredientsList,
  );
  const { detailsARecipe } = useAppSelector((state) => state?.recipe);
  const { loading: nutritionDataLoading, data: nutritionData } =
    useGetBlendNutritionBasedOnRecipexxx(
      selectedIngredientsList,
      nutritionState,
      SetcalculateIngOz,
    );

  const handleToGetARecipeVersion = useToGetARecipeVersion();
  const handleToGetARecipe = useToGetARecipe();

  const updateEditRecipe = (key: string, value: any) => {
    dispatch(setDetailsARecipe({ ...detailsARecipe, [key]: value }));
  };

  useEffect(() => {
    dispatch(setOpenVersionTray(false));
    dispatch(setOpenVersionTrayFormWhichPage("edit"));
  }, []);

  useEffect(() => {
    if (versionId) {
      //@ts-ignore
      if (detailsARecipe?.versionId !== versionId) {
        handleToGetARecipeVersion(versionId);
      }
    } else {
      if (detailsARecipe?._id !== recipeId) {
        handleToGetARecipe(recipeId);
      }
    }
  }, []);

  const servingCounter = useAppSelector(
    (state) => state.editRecipeReducer.servingCounter,
  );
  const recipeName = useAppSelector(
    (state) => state?.editRecipeReducer?.recipeName,
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
    variables: { classType: "All" },
  });

  const { data: allBlendCategory } = useQuery(BLEND_CATEGORY);
  const [editRecipe] = useMutation(EDIT_A_RECIPE);
  const [
    classBasedData,
    recipeBasedData,
    allBlendBasedCategory,
    recipeBasedNutrition,
  ] = [
    classData?.filterIngredientByCategoryAndClass,
    detailsARecipe,
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
        reactToastifyNotification("info", "Recipe Updateded successfully");
        setExistingImages(imageArr);
        setImages([]);
      } else {
        await editRecipe({
          variables: {
            data: obj,
          },
        });
        dispatch(setLoading(false));
        reactToastifyNotification("info", "Recipe Updateded successfully ");
      }
    } catch (error) {
      dispatch(setLoading(false));
      reactToastifyNotification("error", "Error while saving Recipe");
    }
  };

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <EditRecipePage
      updateEditRecipe={updateEditRecipe}
      recipeName={recipeName}
      allIngredients={classBasedData}
      nutritionTrayData={
        recipeBasedNutrition && JSON.parse(recipeBasedNutrition)
      }
      recipeInstructions={recipeBasedData?.recipeInstructions}
      allBlendCategories={allBlendBasedCategory}
      selectedBLendCategory={recipeBasedData?.recipeBlendCategory?.name}
      editARecipeFunction={editARecipeFunction}
      calculatedIngOz={calculateIngOz}
      nutritionDataLoading={nutritionDataLoading}
      images={images}
      setImages={setImages}
      existingImage={existingimages}
      setExistingImage={setExistingImages}
      nutritionState={nutritionState}
      setNutritionState={setNutritionState}
      recipeId={recipeId}
    />
  );
};

export default EditRecipeComponent;
