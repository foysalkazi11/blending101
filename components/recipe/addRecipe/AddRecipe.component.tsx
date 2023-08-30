/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from "react";
import AContainer from "../../../containers/A.container";
import styles from "../share/recipePageLayout/recipePageLayout.module.scss";
import Center_Elements from "./recipe_elements/centerElements.component";
import { useAppDispatch } from "../../../redux/hooks";
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

const AddRecipePage = () => {
  const [images, setImages] = useState<any[]>([]);
  const [selectedBlendValueState, setSelectedBlendValueState] = useState(
    "61cafc34e1f3e015e7936587",
  );
  const [recipeHeading, setRecipeHeading] = useState("");
  const [selectedIngredientsList, setSelectedIngredientsList] = useState([]);
  const [calculateIngOz, SetCalculateIngOz] = useState(null);
  const [nutritionState, setNutritionState] = useState(null);
  const [servingSize, setServingSize] = useState(1);
  const [howToState, setHowToSteps] = useState([]);
  const [recipeDescription, setRecipeDescription] = useState("");
  const [recipePrepareTime, setRecipePrepareTime] = useState(1);
  const [createNewRecipeByUser] = useMutation(CREATE_A_RECIPE_BY_USER);
  const dispatch = useAppDispatch();
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

  const { loading: blendCategoriesInProgress, data: blendCategoriesData } =
    useQuery(BLEND_CATEGORY);

  // center

  const adjusterServingSizeFunc = useCallback((value) => {
    if (value < 1) {
      setServingSize(1);
    } else {
      setServingSize(value);
    }
  }, []);

  // submit data for add recipe

  const handleSubmitData = async () => {
    if (recipeHeading && selectedIngredientsList?.length) {
      setLoading(true);
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
      const howToArr = howToState?.map((item) => `${item?.step}`);

      let obj = {
        userId: user.id,
        name: recipeHeading,
        description: recipeDescription,
        recipeBlendCategory: selectedBlendValueState,
        ingredients: ingArr,
        servingSize: calculateIngOz,
        servings: servingSize,
        recipeInstructions: howToArr,
      };

      try {
        if (images?.length) {
          let imageArr = await imageUploadS3(images);
          //@ts-ignore
          (imageArr = imageArr?.map((img, index) =>
            index === 0
              ? { image: img, default: true }
              : { image: img, default: false },
          )),
            (obj = {
              ...obj,
              //@ts-ignore
              image: imageArr,
            });

          const { data } = await createNewRecipeByUser({
            variables: {
              isAddToTemporaryCompareList: false,
              data: obj,
            },
          });
          setLoading(false);
          notification("success", "recipe create successfully");
          if (data?.addRecipeFromUser?.recipeId?._id) {
            router?.push(
              `/recipe/recipe_details/${data?.addRecipeFromUser?.recipeId?._id}`,
            );
          }
        } else {
          const { data } = await createNewRecipeByUser({
            variables: {
              isAddToTemporaryCompareList: false,
              data: obj,
            },
          });
          setLoading(false);
          notification("success", "recipe create successfully");
          if (data?.addRecipeFromUser?.recipeId?._id) {
            router?.push(
              `/recipe/recipe_details/${data?.addRecipeFromUser?.recipeId?._id}`,
            );
          }
        }
      } catch (error) {
        setLoading(false);
        notification("error", error?.message || "Something went wrong");
      }
    } else {
      notification(
        "warning",
        "You can't save recipe without name and ingredients",
      );
    }
  };

  //left panel

  // add ingredient
  const handleIngredientClick = (
    ingredient: any,
    present: boolean,
    edit?: boolean,
  ) => {
    let ingredientList = [];
    const defaultPortion =
      ingredient?.portions?.find((ing) => ing?.default) ||
      ingredient?.portions?.[0];

    const newIngredient = {
      ...ingredient,
      ingredientId: {
        _id: ingredient?._id,
        ingredientName: ingredient?.ingredientName,
        featuredImage: ingredient?.featuredImage,
        images: ingredient?.images,
      },
      selectedPortion: {
        gram: parseFloat(defaultPortion?.meausermentWeight),
        name: defaultPortion?.measurement,
        quantity: ingredient?.selectedPortion?.quantity || 1,
      },
      weightInGram: parseFloat(defaultPortion?.meausermentWeight),
      ingredientStatus: "ok",
    };

    if (!present) {
      ingredientList = [...selectedIngredientsList, newIngredient];
    } else {
      if (edit) {
        ingredientList = selectedIngredientsList?.map((ing) =>
          ing?._id === ingredient?._id ? newIngredient : ing,
        );
      } else {
        ingredientList = selectedIngredientsList?.filter(
          (ing) => ing?._id !== ingredient?._id,
        );
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
    handleFetchIngrdients(
      selectedIngredientsList,
      nutritionState,
      SetCalculateIngOz,
    );
  }, [selectedIngredientsList, nutritionState]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);
  const giGl: GiGl = nutritionData?.getNutrientsListAndGiGlByIngredients?.giGl;

  return (
    <React.Fragment>
      {width < 1280 ? (
        <TrayWrapper
          isolated={true}
          showPanel="left"
          showTagByDefault={true}
          openTray={openTray}
          panelTag={(hover) => (
            <TrayTag
              hover={hover}
              icon={
                <FontAwesomeIcon
                  icon={hover ? faBasketShoppingRegular : faBasketShoppingSolid}
                />
              }
              placeMent="left"
              handleTagClick={() => setOpenTray((prev) => !prev)}
            />
          )}
        >
          <IngredientPanel
            handleIngredientClick={handleIngredientClick}
            checkActive={checkActive}
          />
        </TrayWrapper>
      ) : null}

      <div className={styles.main}>
        <div className={styles.left}>
          <IngredientPanel
            handleIngredientClick={handleIngredientClick}
            checkActive={checkActive}
          />
        </div>
        <div className={styles.center}>
          <PanelHeaderCenter
            backBtnObj={{
              function: () => router.push("/"),
            }}
            editOrSavebtnFunc={handleSubmitData}
            editOrSavebtnText="Save"
            loading={loading}
          />
          <Center_Elements
            blendCategoryList={
              blendCategoriesData?.getAllCategories
                ? blendCategoriesData?.getAllCategories
                : []
            }
            setDropDownState={setSelectedBlendValueState}
            selectedBlendValueState={selectedBlendValueState}
            setImages={setImages}
            images={images}
            setRecipeHeading={setRecipeHeading}
            recipeDescription={recipeDescription}
            setRecipeDescription={setRecipeDescription}
            recipeTitle={recipeHeading}
            recipePrepareTime={recipePrepareTime}
            setRecipePrepareTime={setRecipePrepareTime}
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
        <div className={styles.right}>
          <NutritionPanel
            counter={servingSize}
            adjusterFunc={adjusterServingSizeFunc}
            nutritionTrayData={
              nutritionData &&
              JSON?.parse(
                nutritionData?.getNutrientsListAndGiGlByIngredients?.nutrients,
              )
            }
            nutritionState={nutritionState}
            setNutritionState={setNutritionState}
            isComeFormRecipeEditPage={true}
            calculatedIngOz={calculateIngOz}
            nutritionDataLoading={nutritionDataLoading}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
export default AddRecipePage;
