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
  setDescriptionRecipe,
  setEditRecipeName,
  setRecipeImagesArray,
  setSelectedIngredientsList,
} from "../../../redux/edit_recipe/editRecipeStates";
import { EDIT_A_RECIPE } from "../../../gqlLib/recipes/mutations/editRecipe";
import { setLoading } from "../../../redux/slices/utilitySlice";
import imageUploadS3 from "../../../components/utility/imageUploadS3";
import reactToastifyNotification from "../../../components/utility/reactToastifyNotification";

const EditRecipeComponent = () => {
  const router = useRouter();
  const { recipeId } = router.query;
  const dispatch = useAppDispatch();
  const [bloblist, setBlobList] = useState([]);
  const [isFetching, setIsFetching] = useState(null);

  const handleSubmitData = async (images) => {
    dispatch(setLoading(true));
    let res: any;
    try {
      if (images?.length) {
        res = await imageUploadS3(images);
        return res;
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
    }
    if (res) {
      return res;
    } else console.log({ res: "something went wrong in image uploading" });
  };

  const recipeName = useAppSelector((state) => state?.editRecipeReducer?.recipeName);
  const selectedIngredientsList = useAppSelector(
    (state) => state?.editRecipeReducer?.selectedIngredientsList
  );
  const recipeInstruction = useAppSelector((state) => state?.editRecipeReducer?.recipeInstruction);
  const recipeDescription = useAppSelector((state) => state?.editRecipeReducer?.descriptionRecipe);
  const selectedBLendCategory = useAppSelector(
    (state) => state?.editRecipeReducer?.selectedBlendCategory
  );
  const imagesArray = useAppSelector((state) => state.editRecipeReducer.recipeImagesArray);
  useEffect(() => {
    console.log(imagesArray);
    let bloblist = imagesArray.filter((elem) => elem.__typename === "blobType");
    setBlobList(bloblist);
  }, [imagesArray]);

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
    })
  );

  const editARecipeFunction = async () => {
    setIsFetching(true);
    let imageUrlListObjectArray = [];
    const imageUrlList = await handleSubmitData(bloblist);
    imageUrlList?.map((elem) => {
      imageUrlListObjectArray = [
        ...imageUrlListObjectArray,
        { __typename: "ImageType", image: elem },
      ];
    });
    let updatedImageUrl = imagesArray?.filter((itm) => itm?.__typename === "ImageType");
    updatedImageUrl = [...updatedImageUrl, ...imageUrlListObjectArray];
    dispatch(setRecipeImagesArray(updatedImageUrl));
    if (
      !recipeId ||
      !recipeName ||
      !recipeDescription ||
      !selectedIngredientsList ||
      !recipeInstruction ||
      !imagesArray
    )
      return;
    await editARecipe();
    reactToastifyNotification("info", "Recipe Updated");
    setIsFetching(false);
  };

  return (
    <EditRecipePage
      recipeName={recipeName}
      allIngredients={classBasedData}
      nutritionTrayData={recipeBasedNutrition && JSON.parse(recipeBasedNutrition)}
      recipeInstructions={recipeBasedData?.recipeInstructions}
      allBlendCategories={allBlendBasedCategory}
      selectedBLendCategory={recipeBasedData?.recipeBlendCategory?.name}
      isFetching={isFetching}
      editARecipeFunction={editARecipeFunction}
    />
  );
};

export default EditRecipeComponent;
