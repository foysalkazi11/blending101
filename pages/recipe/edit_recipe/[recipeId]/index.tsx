/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import EditRecipePage from "../../../../components/recipe/editRecipe";
import { useMutation, useQuery } from "@apollo/client";
import { BLEND_CATEGORY } from "../../../../gqlLib/recipes/queries/getEditRecipe";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  setRecipeInstruction,
  setSelectedIngredientsList,
  setServingCounter,
} from "../../../../redux/edit_recipe/editRecipeStates";
import EDIT_A_RECIPE from "../../../../gqlLib/recipes/mutations/editARecipe";
import { setLoading, updateSidebarActiveMenuName } from "../../../../redux/slices/utilitySlice";
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
import useToEditOfARecipeVersion from "../../../../customHooks/useToEditOfARecipeVersion";
import ConfirmationModal from "../../../../theme/confirmationModal/ConfirmationModal";
import useToUpdateAfterEditVersion from "../../../../customHooks/useToUpdateAfterEditVersion";
import { VersionAddDataType } from "../../../../type/versionAddDataType";
import { useUser } from "../../../../context/AuthProvider";
import { FormProvider, useForm } from "react-hook-form";
import { RecipeEditDefaultValuesType } from "type/recipeEditType";
import { useToArrangeIngredientBeforeSave } from "components/recipe/share/useToArrangeIngredient";
import useImage from "@/app/hooks/utils/useImage";

const defaultValues: RecipeEditDefaultValuesType = {
  recipeTitle: "",
  recipeDescription: "",
  blendType: "",
  blenderName: "",
  blendManufacturer: "",
  oz: "",
  cookTime: "",
  servings: 0,
};

const EditRecipeComponent = () => {
  const router = useRouter();
  const { params = [] } = router.query;
  const recipeId = params?.[0] || (router.query?.recipeId as string);
  const versionId = params?.[1] || "";
  const dispatch = useAppDispatch();
  const [newVersionInfo, setNewVersionInfo] = useState<VersionAddDataType>({} as VersionAddDataType);
  const [openModal, setOpenModal] = useState(false);
  const [calculateIngOz, SetcalculateIngOz] = useState(null);
  const [images, setImages] = useState<any[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [nutritionState, setNutritionState] = useState(null);
  const [copyDetailsRecipe, setCopyDetailsRecipe] = useState<RecipeDetailsType>(null);
  const user = useUser();
  const isMounted = useRef(false);
  const { selectedIngredientsList, recipeInstruction, servingCounter, selectedBlendCategory } = useAppSelector(
    (state) => state?.editRecipeReducer,
  );
  const { detailsARecipe } = useAppSelector((state) => state?.recipe);
  const {
    handleFetchIngrdients,
    loading: nutritionDataLoading,
    data: nutritionData,
  } = useGetBlendNutritionBasedOnRecipexxx();
  const { handleToEditARecipeVersion, loading: editOrCreateVersionLoading } = useToEditOfARecipeVersion();
  const handleToUpdateARecipeVersionAfterEdit = useToUpdateAfterEditVersion();
  const { data: allBlendCategory } = useQuery(BLEND_CATEGORY);
  const [editRecipe, { loading: editARecipeLoading }] = useMutation(EDIT_A_RECIPE);
  const { handleToGetARecipe } = useToGetARecipe();
  const arrangeIngredientBeforeSave = useToArrangeIngredientBeforeSave();
  const methods = useForm({
    defaultValues,
  });
  const { postImages } = useImage();
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
      let imageArr: { url: string; hash: string }[] = await postImages(images);
      let combineImageArr: string[] = existingImages.concat(imageArr?.map((img) => img?.url));
      let finalImageArr = combineImageArr?.map((img, index) =>
        index === 0 ? { image: img, default: true } : { image: img, default: false },
      );

      obj = {
        ...obj,
        image: finalImageArr,
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

      setExistingImages(combineImageArr);
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

  const editARecipeFunction = async (data: RecipeEditDefaultValuesType) => {
    let ingArr = arrangeIngredientBeforeSave(selectedIngredientsList);
    let errorIngredients = [];
    selectedIngredientsList.forEach((item) => {
      if (item?.ingredientStatus === "partial_ok") {
        const { errorString = "", ingredientId = null, errorIngredientId = "", qaId = "" } = item;
        errorIngredients.push({
          errorString,
          ingredientId: errorIngredientId,
          qaId,
        });
      }
    });

    const howToArr = recipeInstruction?.map((item) => `${item?.step}`);
    const isReallyOriginalVersion =
      detailsARecipe?.tempVersionInfo?.version?._id === detailsARecipe?.recipeId?.originalVersion?._id;

    try {
      // update version obj data
      let versionUpdateObj = {
        editId: detailsARecipe?.tempVersionInfo?.version?._id,
        recipeId: detailsARecipe?.recipeId?._id,
        turnedOn: isReallyOriginalVersion ? null : detailsARecipe?.tempVersionInfo?.isShareAble,
        userId: user.id,
        editableObject: {
          recipeInstructions: howToArr,
          postfixTitle: data?.recipeTitle,
          description: data?.recipeDescription,
          ingredients: ingArr,
          errorIngredients,
          servingSize: calculateIngOz,
          selectedImage: copyDetailsRecipe?.tempVersionInfo?.version?.selectedImage,
        },
        isOriginalVersion: isReallyOriginalVersion,
      };

      // create new version of a recipe
      const objForCreateNewVersion: VersionAddDataType = {
        postfixTitle: data?.recipeTitle,
        recipeId: detailsARecipe?.recipeId?._id,
        userId: user.id,
        description: data?.recipeDescription,
        ingredients: ingArr,
        errorIngredients,
        recipeInstructions: howToArr,
        servingSize: calculateIngOz,
        selectedImage: copyDetailsRecipe?.tempVersionInfo?.version?.selectedImage,
      };

      if (isReallyOriginalVersion && detailsARecipe?.recipeId?.userId?._id !== user.id) {
        openConfirmationModal(objForCreateNewVersion);
      } else {
        let originalRecipeUpdatedData = {};
        if (isReallyOriginalVersion && detailsARecipe?.recipeId?.userId?._id === user.id) {
          const updatedObj = await updateOriginalRecipe({
            servings: servingCounter,
            recipeBlendCategory: data?.blendType,
          });

          originalRecipeUpdatedData = updatedObj;
          originalRecipeUpdatedData = {
            ...originalRecipeUpdatedData,
            recipeBlendCategory: allBlendCategory?.getAllCategories?.find(
              (category) => category?._id === data?.blendType,
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

  // separate data into different state so that can work easily
  useEffect(() => {
    if (!detailsARecipe) return;
    setCopyDetailsRecipe({ ...detailsARecipe });
    dispatch(setServingCounter(detailsARecipe?.recipeId?.servings || 1));
    dispatch(
      setRecipeInstruction(
        detailsARecipe?.tempVersionInfo?.version?.recipeInstructions?.map((elem: string, index: number) => ({
          id: Date.now() + index,
          step: elem,
        })) || [],
      ),
    );
    SetcalculateIngOz(detailsARecipe?.tempVersionInfo?.version?.servingSize);
    setExistingImages(detailsARecipe?.recipeId?.image?.map((item) => `${item?.image}`));
    dispatch(
      setSelectedIngredientsList(
        detailsARecipe?.tempVersionInfo?.version?.ingredients?.map((ingredient) => {
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
            originalIngredientName: ingredient?.originalIngredientName,
            quantityString: ingredient?.quantityString,
          };
        }),
      ),
    );
    methods.reset({
      recipeTitle: detailsARecipe?.tempVersionInfo?.version.postfixTitle,
      recipeDescription: detailsARecipe?.tempVersionInfo?.version.description,
      blendType: detailsARecipe?.recipeId?.recipeBlendCategory?._id,
      cookTime: detailsARecipe?.recipeId?.totalTime,
    });
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
    handleFetchIngrdients(selectedIngredientsList, nutritionState, SetcalculateIngOz, false);
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
      <FormProvider {...methods}>
        <EditRecipePage
          detailsARecipe={detailsARecipe}
          updateEditRecipe={updateEditRecipe}
          nutritionTrayData={nutritionList ? JSON.parse(nutritionList) : []}
          allBlendCategories={allBlendCategory?.getAllCategories?.map((category) => ({
            name: category?.name,
            value: category?._id,
          }))}
          editARecipeFunction={methods.handleSubmit(editARecipeFunction)}
          calculatedIngOz={calculateIngOz}
          nutritionDataLoading={nutritionDataLoading}
          images={images}
          setImages={setImages}
          existingImage={existingImages}
          setExistingImage={setExistingImages}
          nutritionState={nutritionState}
          setNutritionState={setNutritionState}
          recipeId={recipeId}
          giGl={giGl}
          recipeEditOrVersionEditLoading={editOrCreateVersionLoading || editARecipeLoading}
          versionsCount={detailsARecipe?.versionsCount}
          ingredientAddingType="auto"
        />
      </FormProvider>
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
