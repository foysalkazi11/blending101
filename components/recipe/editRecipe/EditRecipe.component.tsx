/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction } from "react";
import AContainer from "../../../containers/A.container";
import styles from "../share/recipePageLayout/recipePageLayout.module.scss";
import Center_header from "./header/centerHeader/Center_header.component";
import Center_Elements from "./recipe_elements/centerElements.component";
import IngredientList from "./recipe_elements/ingredientList/ingredientList&Howto.component";
import FooterRecipeFilter from "../../footer/footerRecipeFilter.component";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  setSelectedIngredientsList,
  setServingCounter,
} from "../../../redux/edit_recipe/editRecipeStates";
import IngredientPanel from "../share/ingredientPanel/IngredientPanel";
import IngredientFixedPanle from "../share/ingredientFixedPanel/IngredientFixedPanle";
import useWindowSize from "../../utility/useWindowSize";
import NutritionPanel from "../share/nutritionPanel/NutritionPanel";

interface editRecipe {
  recipeName: string;
  allIngredients: [];
  nutritionTrayData: any;
  recipeInstructions: string[];
  allBlendCategories: [];
  selectedBLendCategory: string;
  editARecipeFunction: any;
  calculatedIngOz?: number;
  nutritionDataLoading: boolean;
  existingImage?: string[];
  setExistingImage?: Dispatch<SetStateAction<string[]>>;
  setImages?: Dispatch<SetStateAction<any[]>>;
  images?: any[];
  nutritionState?: object;
  setNutritionState?: Dispatch<SetStateAction<object>>;
}

const EditRecipePage = ({
  recipeName,
  allIngredients,
  nutritionTrayData,
  recipeInstructions,
  allBlendCategories,
  selectedBLendCategory,
  editARecipeFunction,
  calculatedIngOz = 0,
  nutritionDataLoading,
  images = [],
  setImages = () => {},
  existingImage = [],
  setExistingImage = () => {},
  nutritionState = {},
  setNutritionState = () => {},
}: editRecipe) => {
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  const servingCounter = useAppSelector(
    (state) => state.editRecipeReducer.servingCounter,
  );
  const selectedIngredientsList = useAppSelector(
    (state) => state.editRecipeReducer.selectedIngredientsList,
  );

  const handleIngredientClick = (ingredient: any, present: boolean) => {
    let blendz = [];
    if (!present) {
      blendz = [...selectedIngredientsList, ingredient];
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
    <AContainer>
      {width < 1280 ? (
        <IngredientFixedPanle
          handleIngredientClick={handleIngredientClick}
          checkActive={checkActive}
        />
      ) : null}

      <div className={styles.main}>
        <div className={styles.left}>
          <IngredientPanel
            handleIngredientClick={handleIngredientClick}
            checkActive={checkActive}
          />
        </div>
        <div className={styles.center}>
          <Center_header editARecipeFunction={editARecipeFunction} />
          <Center_Elements
            recipeName={recipeName}
            allBlendCategories={allBlendCategories}
            selectedBLendCategory={selectedBLendCategory}
            images={images}
            setImages={setImages}
            existingImage={existingImage}
            setExistingImage={setExistingImage}
          />
          <IngredientList
            adjusterFunc={adjusterFunc}
            allIngredients={allIngredients}
            recipeInstructions={recipeInstructions}
            nutritionState={nutritionState}
            setNutritionState={setNutritionState}
            calculatedIngOz={calculatedIngOz}
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
      <div className={styles.footerMainDiv}>
        <FooterRecipeFilter />
      </div>
    </AContainer>
  );
};
export default EditRecipePage;
