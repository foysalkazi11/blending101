/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "../share/recipePageLayout/recipePageLayout.module.scss";
import imageUploadS3 from "../../utility/imageUploadS3";
import { BLEND_CATEGORY } from "../../../gqlLib/recipes/queries/getEditRecipe";
import { useMutation, useQuery } from "@apollo/client";
import CREATE_A_RECIPE_BY_USER from "../../../gqlLib/recipes/mutations/createARecipeByUser";
import notification from "../../utility/reactToastifyNotification";
import { useRouter } from "next/router";
import useGetBlendNutritionBasedOnRecipexxx from "../../../customHooks/useGetBlendNutritionBasedOnRecipexxx";
import IngredientPanel from "../share/ingredientPanel/IngredientPanel";
import useWindowSize from "../../utility/useWindowSize";
import NutritionPanel from "../share/nutritionPanel/NutritionPanel";
import PanelHeaderCenter from "../share/panelHeader/PanelHeaderCenter";
import TrayWrapper from "../../sidetray/TrayWrapper";
import TrayTag from "../../sidetray/TrayTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping as faBasketShoppingRegular } from "@fortawesome/pro-regular-svg-icons";
import { faBasketShopping as faBasketShoppingSolid } from "@fortawesome/pro-solid-svg-icons";
import { GiGl } from "../../../type/nutrationType";
import { useUser } from "../../../context/AuthProvider";
import IngredientSection from "../share/IngredientSection";
import InstructionsForMakingRecipe from "../share/howToSection";
import CenterSection from "../share/centerSection";
import { FormProvider, useForm } from "react-hook-form";
import { RecipeEditDefaultValuesType } from "type/recipeEditType";
import { useToArrangeIngredient, useToArrangeIngredientBeforeSave } from "../share/useToArrangeIngredient";
import useImage from "@/app/hooks/utils/useImage";
import useDimensions from "customHooks/useDimensions";

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

const AddRecipePage = () => {
  const [images, setImages] = useState<any[]>([]);
  // const [selectedBlendValueState, setSelectedBlendValueState] = useState("61cafc34e1f3e015e7936587");
  // const [recipeHeading, setRecipeHeading] = useState("");
  const [selectedIngredientsList, setSelectedIngredientsList] = useState([]);
  const [calculateIngOz, SetCalculateIngOz] = useState(null);
  const [nutritionState, setNutritionState] = useState(null);
  const [servingSize, setServingSize] = useState(1);
  const [howToState, setHowToSteps] = useState([]);
  // const [recipeDescription, setRecipeDescription] = useState("");
  // const [recipePrepareTime, setRecipePrepareTime] = useState(1);
  const [createNewRecipeByUser] = useMutation(CREATE_A_RECIPE_BY_USER);
  const isMounted = useRef(false);
  const router = useRouter();
  const { width } = useWindowSize();
  const [openTray, setOpenTray] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useUser();
  const {
    handleFetchIngrdients,
    loading: nutritionDataLoading,
    data: nutritionData,
  } = useGetBlendNutritionBasedOnRecipexxx();
  const { data: blendCategoriesData } = useQuery(BLEND_CATEGORY);
  const arrangeIngredient = useToArrangeIngredient();
  const arrangeIngredientBeforeSave = useToArrangeIngredientBeforeSave();
  const { postImages } = useImage();
  const [dimensionRef, dimension] = useDimensions();

  const methods = useForm({
    defaultValues,
  });

  // center

  const adjusterServingSizeFunc = useCallback((value) => {
    if (value < 1) {
      setServingSize(1);
    } else {
      setServingSize(value);
    }
  }, []);

  // submit data for add recipe

  const handleSubmitData = async (data: RecipeEditDefaultValuesType) => {
    if (selectedIngredientsList?.length) {
      setLoading(true);
      let ingArr = arrangeIngredientBeforeSave(selectedIngredientsList);
      const howToArr = howToState?.map((item) => `${item?.step}`);

      let obj = {
        userId: user.id,
        name: data?.recipeTitle,
        description: data?.recipeDescription,
        recipeBlendCategory: data?.blendType,
        ingredients: ingArr,
        servingSize: calculateIngOz,
        servings: servingSize,
        recipeInstructions: howToArr,
        totalTime: data?.cookTime,
        image: [],
      };

      try {
        if (images?.length) {
          let imageArr = await postImages(images);
          //@ts-ignore
          (imageArr = imageArr?.map((img, index) =>
            index === 0 ? { image: img?.url, default: true } : { image: img?.url, default: false },
          )),
            (obj = {
              ...obj,
              //@ts-ignore
              image: imageArr,
            });

          // const { data } = await createNewRecipeByUser({
          //   variables: {
          //     isAddToTemporaryCompareList: false,
          //     data: obj,
          //   },
          // });
          // setLoading(false);
          // notification("success", "recipe create successfully");
          // if (data?.addRecipeFromUser?.recipeId?._id) {
          //   router?.push(`/recipe/recipe_details/${data?.addRecipeFromUser?.recipeId?._id}`);
          // }
        }
        const { data } = await createNewRecipeByUser({
          variables: {
            isAddToTemporaryCompareList: false,
            data: obj,
          },
        });
        setLoading(false);
        notification("success", "recipe create successfully");
        if (data?.addRecipeFromUser?.recipeId?._id) {
          router?.push(`/recipe/recipe_details/${data?.addRecipeFromUser?.recipeId?._id}`);
        }
      } catch (error) {
        setLoading(false);
        notification("error", error?.message || "Something went wrong");
      }
    } else {
      notification("warning", "You can't save recipe without name and ingredients");
    }
  };

  //left panel

  // add ingredient
  const handleIngredientClick = (ingredient: any, present: boolean, edit?: boolean) => {
    let ingredientList = [];
    const newIngredient = arrangeIngredient(ingredient);

    if (!present) {
      ingredientList = [...selectedIngredientsList, newIngredient];
    } else {
      if (edit) {
        ingredientList = selectedIngredientsList?.map((ing) => (ing?._id === ingredient?._id ? newIngredient : ing));
      } else {
        ingredientList = selectedIngredientsList?.filter((ing) => ing?._id !== ingredient?._id);
      }
    }

    setSelectedIngredientsList(ingredientList);
  };

  // check ingredinet it's alredy exist

  const checkActive = (id: string) => {
    let present = false;
    selectedIngredientsList?.forEach((blen) => {
      //@ts-ignore
      if (blen?._id === id) {
        present = true;
      }
    });
    return present;
  };

  const removeIngredient = (id) => {
    setSelectedIngredientsList((pre) => pre?.filter((ele) => ele?._id !== id));
  };

  const handleOnDragEnd = (result, type) => {
    if (!result) return;

    if (type === "ingredients") {
      const items = [...selectedIngredientsList];
      const [reOrderedItem] = items?.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reOrderedItem);
      setSelectedIngredientsList(items);
    }

    if (type === "steps") {
      const items = [...howToState];
      const [reOrderedItem] = items?.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reOrderedItem);
      setHowToSteps(items);
    }
  };

  useEffect(() => {
    handleFetchIngrdients(selectedIngredientsList, nutritionState, SetCalculateIngOz);
  }, [selectedIngredientsList, nutritionState]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);
  const giGl: GiGl = nutritionData?.getNutrientsListAndGiGlByIngredients?.giGl;

  return (
    <FormProvider {...methods}>
      {width < 1280 ? (
        <TrayWrapper
          isolated={true}
          showPanel="left"
          showTagByDefault={true}
          openTray={openTray}
          panelTag={(hover) => (
            <TrayTag
              hover={hover}
              icon={<FontAwesomeIcon icon={hover ? faBasketShoppingRegular : faBasketShoppingSolid} />}
              placeMent="left"
              handleTagClick={() => setOpenTray((prev) => !prev)}
            />
          )}
        >
          <IngredientPanel
            handleIngredientClick={handleIngredientClick}
            checkActive={checkActive}
            showTopHeader={false}
          />
        </TrayWrapper>
      ) : null}

      <div className={styles.main}>
        <div className={styles.leftXLShow}>
          <IngredientPanel
            handleIngredientClick={handleIngredientClick}
            checkActive={checkActive}
            scrollAreaMaxHeight={dimension?.height - 220}
          />
        </div>
        <div className={styles.center}>
          <PanelHeaderCenter
            backBtnObj={{
              function: () => router.push("/"),
            }}
            editOrSavebtnFunc={methods.handleSubmit(handleSubmitData)}
            editOrSavebtnText="Save"
            loading={loading}
          />
          <div ref={dimensionRef}>
            <CenterSection
              allBlendCategories={blendCategoriesData?.getAllCategories?.map((category) => ({
                name: category?.name,
                value: category?._id,
              }))}
              images={images}
              setImages={setImages}
              giGl={giGl}
            />

            <IngredientSection
              adjusterFunc={adjusterServingSizeFunc}
              nutritionState={nutritionState}
              setNutritionState={setNutritionState}
              calculatedIngOz={calculateIngOz}
              selectedIngredientsList={selectedIngredientsList}
              handleOnDragEnd={handleOnDragEnd}
              removeIngredient={removeIngredient}
              setSelectedIngredientsList={(ing) => {
                handleIngredientClick(ing, checkActive(ing?._id), true);
              }}
              ingredientAddingType="auto"
              servingSize={servingSize}
            />
            <InstructionsForMakingRecipe
              recipeInstructions={howToState}
              setRecipeInstruction={(newList) => setHowToSteps(newList)}
            />
          </div>
        </div>
        <div className={styles.right}>
          <NutritionPanel
            counter={servingSize}
            adjusterFunc={adjusterServingSizeFunc}
            nutritionTrayData={
              nutritionData && JSON?.parse(nutritionData?.getNutrientsListAndGiGlByIngredients?.nutrients)
            }
            nutritionState={nutritionState}
            setNutritionState={setNutritionState}
            isComeFormRecipeEditPage={true}
            calculatedIngOz={calculateIngOz}
            nutritionDataLoading={nutritionDataLoading}
          />
        </div>
      </div>
    </FormProvider>
  );
};
export default AddRecipePage;
