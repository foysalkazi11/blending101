import React, { useState } from "react";
import AContainer from "../../../containers/A.container";
import LeftSide from "./leftSide/LeftSide";
import RightSide from "./rightSide/RightSide";
import Center from "./center/Center";
import styles from "./RecipeDetails.module.scss";

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
    task === "+" && setCounter(Number(counter) + 1);
    task === "-" && counter > 1 && setCounter(Number(counter) - 1);
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
