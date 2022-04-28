/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import AContainer from "../../../containers/A.container";
import styles from "./EditRecipe.module.scss";
import Center_header from "./header/centerHeader/Center_header.component";
import RightTray from "../../rightTray/rightTray.component";
import Left_tray_recipe_edit from "./leftTray/left_tray_recipe_edit.component";
import Center_Elements from "./recipe_elements/centerElements.component";
import IngredientList from "./recipe_elements/ingredientList/ingredientList&Howto.component";
import Image from "next/image";
import FooterRecipeFilter from "../../footer/footerRecipeFilter.component";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setServingCounter } from "../../../redux/edit_recipe/editRecipeStates";
import RightHeader from "./header/right_header/right_header.component";
import { presetNumber } from "../../utility/numbersForServingNumber";

interface editRecipe {
  recipeName: string;
  allIngredients: [];
  nutritionTrayData: any;
  recipeInstructions: string[];
  allBlendCategories: [];
  selectedBLendCategory: string;
  editARecipeFunction: any;
  isFetching: boolean;
}

const EditRecipePage = ({
  recipeName,
  allIngredients,
  nutritionTrayData,
  recipeInstructions,
  allBlendCategories,
  selectedBLendCategory,
  editARecipeFunction,
  isFetching,
}: editRecipe) => {
  const [leftTrayVisibleState, setLeftTrayVisibleState] = useState(true);
  const dispatch = useAppDispatch();
  const servingCounter = useAppSelector(
    (state) => state.editRecipeReducer.servingCounter
  );
  const [nutritionState, setNutritionState] = useState(null);
  const [singleElement, setSingleElement] = useState(false);

  const adjusterFunc = (task) => {
    let indexValue = presetNumber?.indexOf(servingCounter);

    if (task === "+") {
      servingCounter < presetNumber[presetNumber.length - 1] &&
        dispatch(setServingCounter(presetNumber[indexValue + 1]));
      servingCounter > presetNumber[presetNumber.length - 1] &&
        dispatch(setServingCounter(presetNumber[presetNumber.length - 1]));
    }

    if (task === "-") {
      servingCounter > 0.5 &&
        dispatch(setServingCounter(presetNumber[indexValue - 1]));
    }
  };

  return (
    <AContainer>
      <div className={styles.main}>
        <div
          className={styles.left}
          style={leftTrayVisibleState ? { marginLeft: "0px" } : {}}
        >
          <div
            className={styles.left__Drag__lightGreen}
            style={
              leftTrayVisibleState
                ? {
                    backgroundImage: `url("/icons/ingr-green.svg")`,
                    backgroundSize: "contain",
                  }
                : {
                    backgroundImage: `url("/icons/ingr-white.svg")`,
                    backgroundSize: "contain",
                  }
            }
            onClick={() => setLeftTrayVisibleState(!leftTrayVisibleState)}
          >
            <div>
              {/* left basket drag button, images are used as backgound images for this div in scss files */}
            </div>
          </div>
          <div className={styles.left__title}>
            <div className={styles.left__title__bagicon}>
              <Image
                src={"/icons/basket.svg"}
                alt="Picture will load soon"
                height={"100%"}
                width={"100%"}
                layout="responsive"
                objectFit="contain"
              />
            </div>
            Ingredient List
          </div>
          <div className={styles.left__ingredientlistTray}>
            <Left_tray_recipe_edit allIngredients={allIngredients} />
          </div>
        </div>
        <div className={styles.center}>
          <Center_header
            editARecipeFunction={editARecipeFunction}
            isFetching={isFetching}
          />
          <Center_Elements
            recipeName={recipeName}
            allBlendCategories={allBlendCategories}
            selectedBLendCategory={selectedBLendCategory}
          />
          <IngredientList
            adjusterFunc={adjusterFunc}
            allIngredients={allIngredients}
            recipeInstructions={recipeInstructions}
            setSingleElement={setSingleElement}
            singleElement={singleElement}
            nutritionState={nutritionState}
            setNutritionState={setNutritionState}
          />
        </div>
        <div className={styles.right__main}>
          <RightHeader />
          <RightTray
            nutritionTrayData={nutritionTrayData}
            adjusterFunc={adjusterFunc}
            singleElement={singleElement}
            setSingleElement={setSingleElement}
            nutritionState={nutritionState}
            setNutritionState={setNutritionState}
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
