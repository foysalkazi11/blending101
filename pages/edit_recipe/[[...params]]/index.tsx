/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from "react";
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
import {
  setLoading,
  updateSidebarActiveMenuName,
} from "../../../redux/slices/utilitySlice";
import imageUploadS3 from "../../../components/utility/imageUploadS3";
import reactToastifyNotification from "../../../components/utility/reactToastifyNotification";
import useGetBlendNutritionBasedOnRecipexxx from "../../../customHooks/useGetBlendNutritionBasedOnRecipexxx";
import useToGetARecipe from "../../../customHooks/useToGetARecipe";
import {
  setIsNewVersionInfo,
  setOpenVersionTray,
  setOpenVersionTrayFormWhichPage,
} from "../../../redux/slices/versionTraySlice";
import EDIT_A_VERSION_OF_RECIPE from "../../../gqlLib/versions/mutation/editAVersionOfRecipe";
import notification from "../../../components/utility/reactToastifyNotification";
import { RecipeDetailsType } from "../../../type/recipeDetailsType";
import { GiGl } from "../../../type/nutrationType";
import FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS from "../../../gqlLib/ingredient/query/filterIngredientByCategroyAndClass";
import { updateHeadTagInfo } from "../../../redux/slices/headDataSlice";
import useToEditOfARecipeVersion from "../../../customHooks/useToEditOfARecipeVersion";
import ConfirmationModal from "../../../theme/confirmationModal/ConfirmationModal";
import useToUpdateAfterEditVersion from "../../../customHooks/useToUpdateAfterEditVersion";
import { VersionAddDataType } from "../../../type/versionAddDataType";

const EditRecipeComponent = () => {
  const router = useRouter();
  const { params = [] } = router.query;
  const recipeId = params?.[0] || "";
  const versionId = params?.[1] || "";
  const dispatch = useAppDispatch();
  const [newVersionInfo, setNewVersionInfo] = useState<VersionAddDataType>(
    {} as VersionAddDataType,
  );
  const [openModal, setOpenModal] = useState(false);
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
  const { handleToEditARecipeVersion, loading: editOrCreateVersionLoading } =
    useToEditOfARecipeVersion();
  const handleToUpdateARecipeVersionAfterEdit = useToUpdateAfterEditVersion();
  const recipeInstruction = useAppSelector(
    (state) => state?.editRecipeReducer?.recipeInstruction,
  );
  const { data: allBlendCategory } = useQuery(BLEND_CATEGORY);
  const [editRecipe] = useMutation(EDIT_A_RECIPE);
  const { handleToGetARecipe } = useToGetARecipe();
  const { data: ingredientCategoryData, loading: ingredientCategoryLoading } =
    useQuery(FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS, {
      variables: {
        data: {
          ingredientCategory: "All",
          IngredientClass: 1,
        },
      },
    });

  // open confirmation modal
  const openConfirmationModal = (data: VersionAddDataType) => {
    setOpenModal(true);
    setNewVersionInfo(data);
  };

  // open version tray
  const handleOpenVersionTray = () => {
    dispatch(setOpenVersionTray(true));
    dispatch(setIsNewVersionInfo(newVersionInfo));
    setOpenModal(false);
  };

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
    // dispatch(setLoading(true));

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

    try {
      if (detailsARecipe?.tempVersionInfo) {
        let versionUpdateObj = {
          editId: detailsARecipe?.tempVersionInfo?.id,
          recipeId: detailsARecipe?.recipeId?._id,
          turnedOn: detailsARecipe?.tempVersionInfo?.isShareAble,
          userId: dbUser?._id,
          editableObject: {
            recipeInstructions: howToArr,
            postfixTitle: copyDetailsRecipe?.defaultVersion.postfixTitle,
            description: copyDetailsRecipe?.defaultVersion.description,
            ingredients: ingArr,
            servingSize: calculateIngOz,
            selectedImage: copyDetailsRecipe?.defaultVersion.selectedImage,
          },
          isOriginalVersion: detailsARecipe?.tempVersionInfo?.isOriginalVersion,
        };

        const objForCreateNewVersion: VersionAddDataType = {
          postfixTitle: copyDetailsRecipe?.defaultVersion.postfixTitle,
          recipeId: detailsARecipe?.recipeId?._id,
          userId: dbUser?._id,
          description: copyDetailsRecipe?.defaultVersion.description,
          ingredients: ingArr,
          recipeInstructions: howToArr,
          servingSize: calculateIngOz,
          selectedImage: copyDetailsRecipe?.defaultVersion.selectedImage,
        };

        if (
          detailsARecipe?.tempVersionInfo?.isOriginalVersion &&
          detailsARecipe?.recipeId?.userId?._id !== dbUser?._id
        ) {
          openConfirmationModal(objForCreateNewVersion);
        } else {
          const returnObj = await handleToEditARecipeVersion(
            versionUpdateObj?.userId,
            versionUpdateObj?.recipeId,
            versionUpdateObj?.editId,
            versionUpdateObj?.turnedOn,
            versionUpdateObj?.editableObject,
            versionUpdateObj?.isOriginalVersion,
          );
          handleToUpdateARecipeVersionAfterEdit(
            versionUpdateObj?.editId,
            versionUpdateObj?.turnedOn,
            versionUpdateObj?.editableObject,
            returnObj,
            versionUpdateObj?.isOriginalVersion,
          );
        }
      } else {
        let versionUpdateObj = {
          editId: detailsARecipe?.defaultVersion?._id,
          recipeId: detailsARecipe?.recipeId?._id,
          turnedOn: null,
          userId: dbUser?._id,
          editableObject: {
            recipeInstructions: howToArr,
            postfixTitle: copyDetailsRecipe?.defaultVersion.postfixTitle,
            description: copyDetailsRecipe?.defaultVersion.description,
            ingredients: ingArr,
            servingSize: calculateIngOz,
          },
          isOriginalVersion: detailsARecipe?.isMatch,
        };

        const objForCreateNewVersion: VersionAddDataType = {
          postfixTitle: copyDetailsRecipe?.defaultVersion.postfixTitle,
          recipeId: detailsARecipe?.recipeId?._id,
          userId: dbUser?._id,
          description: copyDetailsRecipe?.defaultVersion.description,
          ingredients: ingArr,
          recipeInstructions: howToArr,
          servingSize: calculateIngOz,
        };

        if (
          detailsARecipe?.defaultVersion?._id ===
            detailsARecipe?.recipeId?.originalVersion?._id &&
          detailsARecipe?.recipeId?.userId?._id !== dbUser?._id
        ) {
          openConfirmationModal(objForCreateNewVersion);
        } else {
          const returnObj = await handleToEditARecipeVersion(
            versionUpdateObj?.userId,
            versionUpdateObj?.recipeId,
            versionUpdateObj?.editId,
            versionUpdateObj?.turnedOn,
            versionUpdateObj?.editableObject,
            versionUpdateObj?.isOriginalVersion,
          );

          handleToUpdateARecipeVersionAfterEdit(
            versionUpdateObj?.editId,
            versionUpdateObj?.turnedOn,
            versionUpdateObj?.editableObject,
            returnObj,
            versionUpdateObj?.isOriginalVersion,
          );
        }
      }
    } catch (error) {
      dispatch(setLoading(false));
      reactToastifyNotification("error", "Error while saving Recipe");
    }
  };
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
    detailsARecipe?.defaultVersion?.ingredients,
  ]);

  useEffect(() => {
    if (!detailsARecipe) return;
    setCopyDetailsRecipe({ ...detailsARecipe });
    dispatch(setServingCounter(detailsARecipe?.recipeId?.servings || 1));
    SetcalculateIngOz(detailsARecipe?.defaultVersion?.servingSize);
    setExistingImages(
      detailsARecipe?.recipeId?.image?.map((item) => `${item?.image}`),
    );
  }, [detailsARecipe?.defaultVersion]);

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

  const nutritionList = useMemo(
    () => nutritionData?.getNutrientsListAndGiGlByIngredients?.nutrients,
    [nutritionData?.getNutrientsListAndGiGlByIngredients?.nutrients],
  );

  const giGl: GiGl = useMemo(
    () => nutritionData?.getNutrientsListAndGiGlByIngredients?.giGl,
    [nutritionData?.getNutrientsListAndGiGlByIngredients?.giGl],
  );

  return (
    <>
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
        recipeEditOrVersionEditLoading={editOrCreateVersionLoading}
        versionsCount={detailsARecipe?.versionsCount}
      />
      <ConfirmationModal
        text="You can't edit original recipe but you can make a new version like original one !!!"
        cancleFunc={() => {
          setOpenModal(false);
          dispatch(setIsNewVersionInfo(null));
        }}
        submitFunc={handleOpenVersionTray}
        // loading={removeARecipeVersionLoading}
        openModal={openModal}
        setOpenModal={setOpenModal}
        submitButText="Proceed"
      />
    </>
  );
};

export default EditRecipeComponent;
