/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import EditRecipePage from "../../../components/recipe/editRecipe/EditRecipe.component";
import { useMutation, useQuery } from "@apollo/client";
import {
  BLEND_CATEGORY,
  INGREDIENTS_BY_CATEGORY_AND_CLASS,
} from "../../../gqlLib/recipes/queries/getEditRecipe";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
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
import EDIT_A_VERSION_OF_RECIPE from "../../../gqlLib/versions/mutation/editAVersionOfRecipe";
import notification from "../../../components/utility/reactToastifyNotification";
import { RecipeDetailsType } from "../../../type/recipeDetails";
import { GiGl } from "../../../type/nutrationType";

const EditRecipeComponent = () => {
  const router = useRouter();
  const { params = [] } = router.query;
  const recipeId = params?.[0] || "";
  const versionId = params?.[1] || "";
  const dispatch = useAppDispatch();
  const [calculateIngOz, SetcalculateIngOz] = useState(null);
  const [images, setImages] = useState<any[]>([]);
  const [existingimages, setExistingImages] = useState<string[]>([]);
  const [nutritionState, setNutritionState] = useState(null);
  const [copyDetailsRecipe, setCopyDetailsRecipe] =
    useState<RecipeDetailsType>(null);
  const { dbUser } = useAppSelector((state) => state?.user);
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

  const [editAVersionOfRecipe] = useMutation(EDIT_A_VERSION_OF_RECIPE);

  const servingCounter = useAppSelector(
    (state) => state.editRecipeReducer.servingCounter,
  );

  const recipeInstruction = useAppSelector(
    (state) => state?.editRecipeReducer?.recipeInstruction,
  );

  const selectedBLendCategory = useAppSelector(
    (state) => state?.editRecipeReducer?.selectedBlendCategory,
  );
  const { data: classData } = useQuery(INGREDIENTS_BY_CATEGORY_AND_CLASS, {
    variables: { classType: "All" },
  });
  const handleToGetARecipeVersion = useToGetARecipeVersion();
  const { data: allBlendCategory } = useQuery(BLEND_CATEGORY);
  const [editRecipe] = useMutation(EDIT_A_RECIPE);
  const handleToGetARecipe = useToGetARecipe();

  const updateEditRecipe = (key: string, value: any) => {
    setCopyDetailsRecipe((prev) => ({ ...prev, [key]: value }));
  };

  const [classBasedData, allBlendBasedCategory] = [
    classData?.filterIngredientByCategoryAndClass,
    allBlendCategory?.getAllCategories,
  ];

  useEffect(() => {
    if (!classBasedData || !detailsARecipe) return;

    setCopyDetailsRecipe({ ...detailsARecipe });
    const presentIngredient = [];
    classBasedData?.forEach((elem) => {
      const items = detailsARecipe?.ingredients?.find(
        (itm) => elem._id === itm?.ingredientId?._id,
      );
      if (items) return presentIngredient.push({ ...elem, ...items });
    });

    dispatch(setSelectedIngredientsList(presentIngredient));
    dispatch(setServingCounter(detailsARecipe?.servings));
    SetcalculateIngOz(detailsARecipe?.servingSize);
    setExistingImages(detailsARecipe?.image?.map((item) => `${item?.image}`));
  }, [classBasedData, detailsARecipe]);

  const updateOrginalRecipe = async (obj: any) => {
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

      setExistingImages(imageArr);
      setImages([]);
      return;
    }

    await editRecipe({
      variables: {
        data: obj,
      },
    });
    return;
  };

  const editARecipeFunction = async () => {
    dispatch(setLoading(true));

    let ingArr = [];
    selectedIngredientsList?.forEach((item) => {
      let value = item?.portions?.find((item) => item.default);
      ingArr?.push({
        ingredientId: item?._id,
        selectedPortionName: item?.selectedPortion?.name || value?.measurement,
        weightInGram: item?.weightInGram
          ? Number(item?.weightInGram)
          : Number(value?.meausermentWeight),
      });
    });

    const howToArr = recipeInstruction?.map((item) => `${item?.step}`);
    const imgArr = existingimages?.map((img, index) =>
      index === 0
        ? { image: img, default: true }
        : { image: img, default: false },
    );

    let orginalRecipeObj = {
      editId: recipeId,
      editableObject: {
        name: copyDetailsRecipe?.name,
        description: copyDetailsRecipe?.description,
        image: imgArr,
        ingredients: ingArr,
        recipeBlendCategory: selectedBLendCategory,
        servingSize: calculateIngOz,
        servings: servingCounter,
        recipeInstructions: howToArr,
      },
    };

    try {
      if (detailsARecipe?.versionId) {
        let obj = {
          editId: detailsARecipe?.versionId,
          editableObject: {
            recipeInstructions: howToArr,
            postfixTitle: copyDetailsRecipe?.postfixTitle,
            description: copyDetailsRecipe?.versionDiscription,
            ingredients: ingArr,
            servingSize: calculateIngOz,
          },
        };

        let orginalRecipeObj = {
          editId: recipeId,
          editableObject: {
            name: copyDetailsRecipe?.name,
            description: copyDetailsRecipe?.description,
            image: imgArr,
            recipeBlendCategory: selectedBLendCategory,
            servings: servingCounter,
          },
        };
        await updateOrginalRecipe(orginalRecipeObj);
        await editAVersionOfRecipe({ variables: { data: obj } });
        dispatch(setLoading(false));
        notification("info", "Version updated sucessfully");
        return;
      }

      await updateOrginalRecipe(orginalRecipeObj);
      dispatch(setLoading(false));
      reactToastifyNotification("info", "Recipe Updateded successfully ");
    } catch (error) {
      dispatch(setLoading(false));
      reactToastifyNotification("error", "Error while saving Recipe");
    }
  };

  useEffect(() => {
    dispatch(setOpenVersionTray(false));
    dispatch(setOpenVersionTrayFormWhichPage("edit"));
  }, []);

  useEffect(() => {
    if (detailsARecipe?._id !== recipeId) {
      if (dbUser?._id && recipeId) {
        handleToGetARecipe(recipeId, dbUser?._id);
      }
    }
  }, [recipeId, dbUser?._id]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const nutritionList =
    nutritionData?.getNutrientsListAndGiGlByIngredients?.nutrients;
  const giGl: GiGl = nutritionData?.getNutrientsListAndGiGlByIngredients?.giGl;

  return (
    <EditRecipePage
      copyDetailsRecipe={copyDetailsRecipe}
      updateEditRecipe={updateEditRecipe}
      allIngredients={classBasedData}
      nutritionTrayData={nutritionList && JSON.parse(nutritionList)}
      recipeInstructions={copyDetailsRecipe?.recipeInstructions}
      allBlendCategories={allBlendBasedCategory}
      selectedBLendCategory={copyDetailsRecipe?.recipeBlendCategory?.name}
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
      giGl={giGl}
    />
  );
};

export default EditRecipeComponent;
