/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction } from "react";
import AContainer from "../../../containers/A.container";
import styles from "../share/recipePageLayout/recipePageLayout.module.scss";
import Center_Elements from "./recipe_elements/centerElements.component";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  setRecipeIngredients,
  setRecipeInstruction,
  setSelectedIngredientsList,
  setServingCounter,
} from "../../../redux/edit_recipe/editRecipeStates";
import IngredientPanel from "../share/ingredientPanel/IngredientPanel";
import useWindowSize from "../../utility/useWindowSize";
import NutritionPanel from "../share/nutritionPanel/NutritionPanel";
import PanelHeaderCenter from "../share/panelHeader/PanelHeaderCenter";
import { RecipeDetailsType } from "../../../type/recipeDetailsType";
import { GiGl } from "../../../type/nutrationType";
import FloatingLeftPanel from "./floatingLeftPanel/FloatingLeftPanel";
import { IngredientAddingType } from "../../../type/recipeEditType";
import { useRouter } from "next/router";
import InstructionsForMakingRecipe from "../share/howToSection";
import IngredientSection from "../share/IngredientSection";

interface editRecipe {
  copyDetailsRecipe?: RecipeDetailsType;
  nutritionTrayData: any;
  allBlendCategories: [];
  selectedBLendCategory: string;
  editARecipeFunction: () => void;
  calculatedIngOz?: number;
  nutritionDataLoading: boolean;
  existingImage?: string[];
  setExistingImage?: Dispatch<SetStateAction<string[]>>;
  setImages?: Dispatch<SetStateAction<any[]>>;
  images?: any[];
  nutritionState?: object;
  setNutritionState?: Dispatch<SetStateAction<object>>;
  recipeId?: string | string[];
  updateEditRecipe?: (key: string, value: any) => void;
  giGl?: GiGl;
  recipeEditOrVersionEditLoading?: boolean;
  versionsCount?: number;
  ingredientAddingType?: IngredientAddingType;
}

const EditRecipePage = ({
  copyDetailsRecipe = null,
  nutritionTrayData,
  allBlendCategories,
  selectedBLendCategory,
  editARecipeFunction = () => {},
  calculatedIngOz = 0,
  nutritionDataLoading,
  images = [],
  setImages = () => {},
  existingImage = [],
  setExistingImage = () => {},
  nutritionState = {},
  setNutritionState = () => {},
  recipeId = "",
  updateEditRecipe = () => {},
  giGl = {
    netCarbs: 0,
    totalGi: 0,
    totalGL: 0,
  },
  recipeEditOrVersionEditLoading = false,
  versionsCount = 0,
  ingredientAddingType = "auto",
}: editRecipe) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  const servingCounter = useAppSelector(
    (state) => state.editRecipeReducer.servingCounter,
  );
  const selectedIngredientsList = useAppSelector(
    (state) => state.editRecipeReducer.selectedIngredientsList,
  );
  const { recipeInstruction } = useAppSelector(
    (state) => state?.editRecipeReducer,
  );

  const updateRecipeInstruction = (recipeInstruction) => {
    dispatch(setRecipeInstruction(recipeInstruction));
  };

  const removeIngredient = (id) => {
    let updated_list = selectedIngredientsList?.filter((elem) => {
      return id !== elem?._id;
    });
    dispatch(setSelectedIngredientsList(updated_list));
  };

  const handleOnDragEnd = (result, type) => {
    if (!result) return;

    if (type === "ingredients") {
      const items = [...selectedIngredientsList];
      const [reOrderedItem] = items?.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reOrderedItem);
      dispatch(setSelectedIngredientsList(items));
    }
  };

  const handleAddIngredient = (ing: { [key: string]: any }) => {
    dispatch(setRecipeIngredients(ing));
  };

  const handleIngredientClick = (ingredient: any, present: boolean) => {
    let blendz = [];
    if (!present) {
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
          quantity: 1,
        },
        weightInGram: parseFloat(defaultPortion?.meausermentWeight),
        ingredientStatus: "ok",
      };
      blendz = [...selectedIngredientsList, newIngredient];
    } else {
      blendz = selectedIngredientsList?.filter((blen) => {
        return blen?._id !== ingredient?._id;
      });
    }

    dispatch(setSelectedIngredientsList(blendz));
  };

  const checkActive = (id: string) => {
    let present = false;
    selectedIngredientsList?.forEach((blen) => {
      if (blen?._id === id) {
        present = true;
      }
    });
    return present;
  };

  const adjusterFunc = (value) => {
    if (value < 1) {
      dispatch(setServingCounter(1));
    } else {
      dispatch(setServingCounter(value));
    }
  };

  return (
    <AContainer
      headerIcon="/icons/juicer.svg"
      headerTitle="Recipe Edit"
      showVersionTray={{
        show: true,
        showPanel: "right",
        showTagByDefault: false,
      }}
      headTagInfo={{
        title: "Recipe Edit",
        description: "recipe Edit",
      }}
    >
      {width < 1280 && (
        <FloatingLeftPanel>
          <IngredientPanel
            handleIngredientClick={handleIngredientClick}
            checkActive={checkActive}
            showHeader={true}
            showTopHeader={false}
          />
        </FloatingLeftPanel>
      )}

      <div className={styles.main}>
        <div className={styles.left}>
          <IngredientPanel
            handleIngredientClick={handleIngredientClick}
            checkActive={checkActive}
            showHeader={false}
          />
        </div>
        <div className={styles.center}>
          <PanelHeaderCenter
            backBtnObj={{
              function: () => router.push(`/recipe_details/${recipeId}`),
            }}
            editOrSavebtnFunc={editARecipeFunction}
            editOrSavebtnText="Save"
            pageComeFrom="edit"
            recipeVersionLength={versionsCount}
            loading={recipeEditOrVersionEditLoading}
          />
          <Center_Elements
            copyDetailsRecipe={copyDetailsRecipe}
            updateEditRecipe={updateEditRecipe}
            allBlendCategories={allBlendCategories}
            selectedBLendCategory={selectedBLendCategory}
            images={images}
            setImages={setImages}
            existingImage={existingImage}
            setExistingImage={setExistingImage}
            giGl={giGl}
          />
          <IngredientSection
            adjusterFunc={adjusterFunc}
            nutritionState={nutritionState}
            setNutritionState={setNutritionState}
            calculatedIngOz={calculatedIngOz}
            ingredientAddingType={ingredientAddingType}
            selectedIngredientsList={selectedIngredientsList}
            handleOnDragEnd={handleOnDragEnd}
            removeIngredient={removeIngredient}
            setSelectedIngredientsList={handleAddIngredient}
            servingSize={servingCounter}
          />
          <InstructionsForMakingRecipe
            recipeInstructions={recipeInstruction}
            setRecipeInstruction={updateRecipeInstruction}
          />
        </div>
        <div className={styles.right}>
          <NutritionPanel
            counter={servingCounter}
            nutritionTrayData={nutritionTrayData}
            nutritionState={nutritionState}
            setNutritionState={setNutritionState}
            isComeFormRecipeEditPage={true}
            calculatedIngOz={calculatedIngOz}
            nutritionDataLoading={nutritionDataLoading}
            adjusterFunc={adjusterFunc}
          />
        </div>
      </div>
    </AContainer>
  );
};
export default EditRecipePage;
