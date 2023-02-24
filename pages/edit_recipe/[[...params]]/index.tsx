/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import EditRecipePage from "../../../components/recipe/editRecipe/EditRecipe.component";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
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
import {
  setLoading,
  updateSidebarActiveMenuName,
} from "../../../redux/slices/utilitySlice";
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
import { RecipeDetailsType } from "../../../type/recipeDetailsType";
import { GiGl } from "../../../type/nutrationType";
import GET_RECIPE from "../../../gqlLib/recipes/queries/getRecipeDetails";
import FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS from "../../../gqlLib/ingredient/query/filterIngredientByCategroyAndClass";
import { updateHeadTagInfo } from "../../../redux/slices/headDataSlice";

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
  const {
    handleFetchIngrdients,
    loading: nutritionDataLoading,
    data: nutritionData,
  } = useGetBlendNutritionBasedOnRecipexxx();

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

  const handleToGetARecipeVersion = useToGetARecipeVersion();
  const { data: allBlendCategory } = useQuery(BLEND_CATEGORY);
  const [editRecipe] = useMutation(EDIT_A_RECIPE);
  const { handleToGetARecipe } = useToGetARecipe();
  const [getARecipe] = useLazyQuery(GET_RECIPE, {
    fetchPolicy: "cache-and-network",
  });
  const { data: ingredientCategoryData, loading: ingredientCategoryLoading } =
    useQuery(FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS, {
      variables: {
        data: {
          ingredientCategory: "All",
          IngredientClass: 1,
        },
      },
    });

  const updateEditRecipe = (key: string, value: any) => {
    setCopyDetailsRecipe((prev) => ({
      ...prev,
      defaultVersion: { ...prev?.defaultVersion, [key]: value },
    }));
  };

  const findIngredient = (id) =>
    detailsARecipe?.defaultVersion?.ingredients?.find(
      (item) => item?.ingredientId?._id === id,
    );

  useEffect(() => {
    if (!ingredientCategoryData?.filterIngredientByCategoryAndClass) return;
    const defaultIngredientIds =
      detailsARecipe?.defaultVersion?.ingredients?.map(
        (ing) => ing?.ingredientId?._id,
      );
    const presentIngredient = [];
    ingredientCategoryData?.filterIngredientByCategoryAndClass?.forEach(
      (elem) => {
        if (defaultIngredientIds?.includes(elem._id)) {
          presentIngredient.push({ ...elem, ...findIngredient(elem._id) });
        }
      },
    );

    dispatch(setSelectedIngredientsList(presentIngredient));
  }, [
    ingredientCategoryData?.filterIngredientByCategoryAndClass,
    detailsARecipe,
  ]);

  useEffect(() => {
    if (!detailsARecipe) return;
    setCopyDetailsRecipe({ ...detailsARecipe });
    dispatch(setServingCounter(detailsARecipe?.recipeId?.servings || 1));
    SetcalculateIngOz(detailsARecipe?.defaultVersion?.servingSize);
    setExistingImages(
      detailsARecipe?.recipeId?.image?.map((item) => `${item?.image}`),
    );
  }, [detailsARecipe]);

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
        name: copyDetailsRecipe?.recipeId?.name,
        description: copyDetailsRecipe?.recipeId?.description,
        image: imgArr,
        ingredients: ingArr,
        recipeBlendCategory: selectedBLendCategory,
        servingSize: calculateIngOz,
        servings: servingCounter,
        recipeInstructions: howToArr,
      },
    };

    try {
      if (!detailsARecipe?.isMatch) {
        let obj = {
          editId: detailsARecipe?.defaultVersion?._id,
          editableObject: {
            recipeInstructions: howToArr,
            postfixTitle: copyDetailsRecipe?.defaultVersion.postfixTitle,
            description: copyDetailsRecipe?.defaultVersion.description,
            ingredients: ingArr,
            servingSize: calculateIngOz,
          },
        };

        let orginalRecipeObj = {
          editId: recipeId,
          editableObject: {
            name: copyDetailsRecipe?.recipeId?.name,
            description: copyDetailsRecipe?.recipeId?.description,
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
    if (detailsARecipe?.recipeId?._id !== recipeId) {
      if (dbUser?._id && recipeId) {
        handleToGetARecipe(recipeId, dbUser?._id);
      }
    }
  }, [recipeId, dbUser?._id]);

  useEffect(() => {
    dispatch(
      updateHeadTagInfo({
        title: "Recipe Edit",
        description: "recipe Edit",
      }),
    );
    dispatch(updateSidebarActiveMenuName("Blends"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleFetchIngrdients(
      selectedIngredientsList,
      nutritionState,
      SetcalculateIngOz,
    );
  }, [selectedIngredientsList, nutritionState]);

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
      allIngredients={
        ingredientCategoryData?.filterIngredientByCategoryAndClass
      }
      nutritionTrayData={nutritionList ? JSON.parse(nutritionList) : []}
      recipeInstructions={
        copyDetailsRecipe?.defaultVersion?.recipeInstructions || []
      }
      allBlendCategories={allBlendCategory?.getAllCategories}
      selectedBLendCategory={
        copyDetailsRecipe?.recipeId?.recipeBlendCategory?.name
      }
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
