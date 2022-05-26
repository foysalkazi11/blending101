import React, { useState } from "react";
import AContainer from "../../../containers/A.container";
import LeftSide from "./leftSide/LeftSide";
import Center from "./center/Center";
import styles from "./RecipeDetails.module.scss";
import { presetNumber } from "../../utility/numbersForServingNumber";
import RightTray from "../../rightTray/rightTray.component";

const RecipeDetails = ({
  recipeData,
  nutritionData,
  nutritionState,
  setNutritionState,
  singleElement,
  setsingleElement,
}) => {
  const [counter, setCounter] = useState(1);
  const counterHandler = (value) => {
    setCounter(Number(value));
  };
  const adjusterFunc = (value) => {
    if (value >= presetNumber?.length - 1) {
      setCounter(presetNumber[presetNumber?.length - 1]);
    } else if (value <= 0) {
      setCounter(presetNumber[0]);
    } else {
      setCounter(presetNumber[value]);
    }
  };

  const inputTagValueHandler = (e) => {
    if (Number(e.target.value) > presetNumber[presetNumber.length - 1]) {
      setCounter(presetNumber[presetNumber.length - 1]);
    } else if (Number(e.target.value) <= presetNumber[0]) {
      setCounter(presetNumber[0]);
    } else {
      setCounter(Number(e.target.value));
    }
  };
  return (
    <div style={{ margin: "40px auto" }}>
      <AContainer
        showHeader={true}
        logo={true}
        headerTitle="Blend Recipe"
        showRighTray={true}
        commentsTray={true}
      >
        <div className={styles.recipeDetailsContainer}>
          <div className={styles.recipeDetailsContainer__contentDiv}>
            <div className={styles.recipeDetailsContainer__contentDiv__left}>
              <LeftSide />
            </div>
            <div className={styles.recipeDetailsContainer_right}>
              <div
                className={styles.recipeDetailsContainer__contentDiv__center}
              >
                <Center
                  recipeData={recipeData}
                  counter={counter}
                  setCounter={setCounter}
                  setNutritionState={setNutritionState}
                  nutritionState={nutritionState}
                  singleElement={singleElement}
                  setsingleElement={setsingleElement}
                  adjusterFunc={adjusterFunc}
                  inputTagValueHandler={inputTagValueHandler}
                />
              </div>
              <div className={styles.recipeDetailsContainer__contentDiv__right}>
                <RightTray
                  nutritionTrayData={nutritionData}
                  counter={counter}
                  adjusterFunc={adjusterFunc}
                  singleElement={singleElement}
                  setSingleElement={setsingleElement}
                  nutritionState={nutritionState}
                  setNutritionState={setNutritionState}
                  nutrientName={
                    nutritionState &&
                    nutritionState[0]?.ingredientId?.ingredientName
                  }
                  measurement={
                    nutritionState && nutritionState[0]?.selectedPortion?.name
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </AContainer>
    </div>
  );
};

export default RecipeDetails;
