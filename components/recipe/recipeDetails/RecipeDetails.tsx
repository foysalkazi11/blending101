import React, { useState } from "react";
import AContainer from "../../../containers/A.container";
import LeftSide from "./leftSide/LeftSide";
import RightSide from "./rightSide/RightSide";
import Center from "./center/Center";
import styles from "./RecipeDetails.module.scss";
import { presetNumber } from "../../utility/numbersForServingNumber";

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
  const adjusterFunc = (task) => {
    let indexValue = presetNumber?.indexOf(counter);

    if (task === "+") {
      counter < presetNumber[presetNumber.length - 1] &&
        setCounter(presetNumber[indexValue + 1]);
      counter > presetNumber[presetNumber.length - 1] &&
        setCounter(presetNumber[presetNumber.length - 1]);
    }

    if (task === "-") {
      counter > 0.5 && setCounter(presetNumber[indexValue - 1]);
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
              <div className={styles.recipeDetailsContainer__contentDiv__center}>
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
                <RightSide
                  nutritionData={nutritionData}
                  counter={counter}
                  counterHandler={counterHandler}
                  nutritionState={nutritionState}
                  setsingleElement={setsingleElement}
                  singleElement={singleElement}
                  adjusterFunc={adjusterFunc}
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
