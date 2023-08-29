/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import EditRecipePage from "../../../../components/recipe/editRecipe/EditRecipe.component";
import { useMutation, useQuery } from "@apollo/client";
import { BLEND_CATEGORY } from "../../../../gqlLib/recipes/queries/getEditRecipe";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  setRecipeInstruction,
  setSelectedIngredientsList,
  setServingCounter,
} from "../../../../redux/edit_recipe/editRecipeStates";
import EDIT_A_RECIPE from "../../../../gqlLib/recipes/mutations/editARecipe";
import {
  setLoading,
  updateSidebarActiveMenuName,
} from "../../../../redux/slices/utilitySlice";
import imageUploadS3 from "../../../../components/utility/imageUploadS3";
import reactToastifyNotification from "../../../../components/utility/reactToastifyNotification";
import useGetBlendNutritionBasedOnRecipexxx from "../../../../customHooks/useGetBlendNutritionBasedOnRecipexxx";
import useToGetARecipe from "../../../../customHooks/useToGetARecipe";
import {
  setIsNewVersionInfo,
  setOpenVersionTray,
  setOpenVersionTrayFormWhichPage,
} from "../../../../redux/slices/versionTraySlice";
import { RecipeDetailsType } from "../../../../type/recipeDetailsType";
import { GiGl } from "../../../../type/nutrationType";
import FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS from "../../../../gqlLib/ingredient/query/filterIngredientByCategroyAndClass";
import useToEditOfARecipeVersion from "../../../../customHooks/useToEditOfARecipeVersion";
import ConfirmationModal from "../../../../theme/confirmationModal/ConfirmationModal";
import useToUpdateAfterEditVersion from "../../../../customHooks/useToUpdateAfterEditVersion";
import { VersionAddDataType } from "../../../../type/versionAddDataType";
import { useUser } from "../../../../context/AuthProvider";

const EditRecipeComponent = () => {
  const router = useRouter();
  const { params = [] } = router.query;
  const recipeId = params?.[0] || (router.query?.recipeId as string);
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
  const user = useUser();
  const isMounted = useRef(false);
  const {
    selectedIngredientsList,
    recipeInstruction,
    servingCounter,
    selectedBlendCategory,
  } = useAppSelector((state) => state?.editRecipeReducer);
  const { detailsARecipe } = useAppSelector((state) => state?.recipe);
  const {
    handleFetchIngrdients,
    loading: nutritionDataLoading,
    data: nutritionData,
  } = useGetBlendNutritionBasedOnRecipexxx();
  const { handleToEditARecipeVersion, loading: editOrCreateVersionLoading } =
    useToEditOfARecipeVersion();
  const handleToUpdateARecipeVersionAfterEdit = useToUpdateAfterEditVersion();
  const { data: allBlendCategory } = useQuery(BLEND_CATEGORY);
  const [editRecipe, { loading: editARecipeLoading }] =
    useMutation(EDIT_A_RECIPE);
  const { handleToGetARecipe } = useToGetARecipe();
  // const { data: ingredientCategoryData, loading: ingredientCategoryLoading } =
  //   useQuery(FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS, {
  //     variables: {
  //       data: {
  //         ingredientCategory: "All",
  //         IngredientClass: 1,
  //       },
  //     },
  //   });

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
      tempVersionInfo: {
        ...prev?.tempVersionInfo,
        version: { ...prev?.tempVersionInfo?.version, [key]: value },
      },
    }));
  };

  // update original recipe
  const updateOriginalRecipe = async (obj: {
    recipeBlendCategory?: string;
    servings?: number;
    image?: {
      default: boolean;
      image: string;
    }[];
  }) => {
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
        image: finalImaArr,
      };
      await editRecipe({
        variables: {
          userId: user.id,
          data: {
            editId: detailsARecipe?.recipeId?._id,
            editableObject: obj,
          },
        },
      });

      setExistingImages(imageArr);
      setImages([]);
      return obj;
    }

    await editRecipe({
      variables: {
        userId: user.id,
        data: {
          editId: detailsARecipe?.recipeId?._id,
          editableObject: obj,
        },
      },
    });
    return obj;
  };

  // edit a recipe version including original version and original recipe

  const editARecipeFunction = async () => {
    let ingArr = [];
    let errorIngredients = [];
    selectedIngredientsList.forEach((item) => {
      if (item?.ingredientStatus === "ok") {
        let value = item?.portions?.find((item) => item.default);
        ingArr?.push({
          ingredientId: item?._id,
          selectedPortionName:
            item?.selectedPortion?.name || value?.measurement,
          weightInGram: item?.weightInGram
            ? Number(item?.weightInGram)
            : Number(value?.meausermentWeight),
          comment: item?.comment || null,
        });
      }
      if (item?.ingredientStatus === "partial_ok") {
        const {
          errorString = "",
          ingredientId = null,
          errorIngredientId = "",
          qaId = "",
        } = item;
        errorIngredients.push({
          errorString,
          ingredientId: errorIngredientId || ingredientId,
          qaId,
        });
      }
    });

    const howToArr = recipeInstruction?.map((item) => `${item?.step}`);
    const isReallyOriginalVersion =
      detailsARecipe?.tempVersionInfo?.version?._id ===
      detailsARecipe?.recipeId?.originalVersion?._id;

    try {
      // update version obj data
      let versionUpdateObj = {
        editId: detailsARecipe?.tempVersionInfo?.version?._id,
        recipeId: detailsARecipe?.recipeId?._id,
        turnedOn: isReallyOriginalVersion
          ? null
          : detailsARecipe?.tempVersionInfo?.isShareAble,
        userId: user.id,
        editableObject: {
          recipeInstructions: howToArr,
          postfixTitle:
            copyDetailsRecipe?.tempVersionInfo?.version?.postfixTitle,
          description: copyDetailsRecipe?.tempVersionInfo?.version?.description,
          ingredients: ingArr,
          errorIngredients,
          servingSize: calculateIngOz,
          selectedImage:
            copyDetailsRecipe?.tempVersionInfo?.version?.selectedImage,
        },
        isOriginalVersion: isReallyOriginalVersion,
      };

      // create new version of a recipe
      const objForCreateNewVersion: VersionAddDataType = {
        postfixTitle: copyDetailsRecipe?.tempVersionInfo?.version?.postfixTitle,
        recipeId: detailsARecipe?.recipeId?._id,
        userId: user.id,
        description: copyDetailsRecipe?.tempVersionInfo?.version?.description,
        ingredients: ingArr,
        errorIngredients,
        recipeInstructions: howToArr,
        servingSize: calculateIngOz,
        selectedImage:
          copyDetailsRecipe?.tempVersionInfo?.version?.selectedImage,
      };

      if (
        isReallyOriginalVersion &&
        detailsARecipe?.recipeId?.userId?._id !== user.id
      ) {
        openConfirmationModal(objForCreateNewVersion);
      } else {
        let originalRecipeUpdatedData = {};
        if (
          isReallyOriginalVersion &&
          detailsARecipe?.recipeId?.userId?._id === user.id
        ) {
          const updatedObj = await updateOriginalRecipe({
            servings: servingCounter,
            recipeBlendCategory: selectedBlendCategory,
          });

          originalRecipeUpdatedData = updatedObj;
          originalRecipeUpdatedData = {
            ...originalRecipeUpdatedData,
            recipeBlendCategory: allBlendCategory?.getAllCategories?.find(
              (category) => category?._id === selectedBlendCategory,
            ),
          };
        }
        const returnObj = await handleToEditARecipeVersion(
          versionUpdateObj?.userId,
          versionUpdateObj?.recipeId,
          versionUpdateObj?.editId,
          versionUpdateObj?.turnedOn,
          versionUpdateObj?.editableObject,
          versionUpdateObj?.isOriginalVersion,
        );

        versionUpdateObj = {
          ...versionUpdateObj,
          editableObject: {
            ...versionUpdateObj?.editableObject,
            ingredients: selectedIngredientsList,
          },
        };
        handleToUpdateARecipeVersionAfterEdit(
          versionUpdateObj?.editId,
          versionUpdateObj?.turnedOn,
          versionUpdateObj?.editableObject,
          returnObj,
          versionUpdateObj?.isOriginalVersion,
          originalRecipeUpdatedData,
        );
      }
    } catch (error) {
      dispatch(setLoading(false));
      reactToastifyNotification("error", "Error while saving Recipe");
    }
  };

  // match recipe ingredients with database ingredients
  // useEffect(() => {
  //   if (!ingredientCategoryData?.filterIngredientByCategoryAndClass) return;
  //   let ingredientObj = {};
  //   let ingredientPartialOk = [];

  //   detailsARecipe?.tempVersionInfo?.version?.ingredients?.forEach((ing) => {
  //     if (ing?.ingredientStatus === "ok") {
  //       ingredientObj[ing?.ingredientId?._id] = {
  //         ...ing,
  //         _id: ing?.ingredientId?._id,
  //         ingredientName: ing?.ingredientId?.ingredientName,
  //       };
  //     }
  //     if (ing?.ingredientStatus === "partial_ok") {
  //       ingredientPartialOk.push(ing);
  //     }
  //   });

  //   const presentIngredient = [];
  //   ingredientCategoryData?.filterIngredientByCategoryAndClass?.forEach(
  //     (elem) => {
  //       if (ingredientObj[elem._id]) {
  //         presentIngredient.push({
  //           ...elem,
  //           ...ingredientObj[elem._id],
  //           ingredientStatus: "ok",
  //         });
  //         delete ingredientObj[elem._id];
  //       }
  //     },
  //   );

  //   dispatch(
  //     setSelectedIngredientsList([
  //       ...presentIngredient,
  //       ...Object.values(ingredientObj),
  //       ...ingredientPartialOk,
  //     ]),
  //   );
  // }, [
  //   ingredientCategoryData?.filterIngredientByCategoryAndClass,
  //   detailsARecipe?.tempVersionInfo?.version,
  // ]);

  // separate data into different state so that can work easily
  useEffect(() => {
    if (!detailsARecipe) return;
    setCopyDetailsRecipe({ ...detailsARecipe });
    dispatch(setServingCounter(detailsARecipe?.recipeId?.servings || 1));
    dispatch(
      setRecipeInstruction(
        detailsARecipe?.tempVersionInfo?.version?.recipeInstructions?.map(
          (elem: string, index: number) => ({
            id: Date.now() + index,
            step: elem,
          }),
        ) || [],
      ),
    );
    SetcalculateIngOz(detailsARecipe?.tempVersionInfo?.version?.servingSize);
    setExistingImages(
      detailsARecipe?.recipeId?.image?.map((item) => `${item?.image}`),
    );
    dispatch(
      setSelectedIngredientsList(
        detailsARecipe?.tempVersionInfo?.version?.ingredients?.map(
          (ingredient) => {
            const ingredientId = ingredient?.ingredientId;
            return {
              ...ingredient,
              ingredientId: {
                ...ingredientId,
                portions: ingredient.portions?.map((portion) => ({
                  ...portion,
                  measurement: portion.name,
                  meausermentWeight: portion.gram,
                })),
              },
              featuredImage: ingredientId?.featuredImage,
              image: ingredientId?.image,
              ingredientName: ingredientId?.ingredientName,
              _id: ingredientId?._id,
            };
          },
        ),
      ),
    );
  }, [detailsARecipe?.tempVersionInfo?.version]);

  useEffect(() => {
    dispatch(setOpenVersionTray(false));
    dispatch(setOpenVersionTrayFormWhichPage("edit"));
    // active sidebar menu change
    dispatch(updateSidebarActiveMenuName("Blends"));
  }, []);

  // fetch recipe if is their existing recipe or doesn't match with current user
  useEffect(() => {
    if (detailsARecipe?.recipeId?._id !== recipeId) {
      if (user.id && recipeId) {
        handleToGetARecipe(recipeId, user.id);
      }
    }
  }, [recipeId, user.id]);

  // fetch nutrition value based on ingredient value change
  useEffect(() => {
    handleFetchIngrdients(
      selectedIngredientsList,
      nutritionState,
      SetcalculateIngOz,
      false,
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
        nutritionTrayData={nutritionList ? JSON.parse(nutritionList) : []}
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
        recipeEditOrVersionEditLoading={
          editOrCreateVersionLoading || editARecipeLoading
        }
        versionsCount={detailsARecipe?.versionsCount}
        ingredientAddingType="auto"
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

EditRecipeComponent.meta = {
  title: "Edit A Recipe",
  icon: "/icons/juicer.svg",
  sidebar: true,
};

export default EditRecipeComponent;
