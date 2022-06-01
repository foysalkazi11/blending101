import React, { useState } from 'react';
import AContainer from '../../../containers/A.container';
import LeftSide from './leftSide/LeftSide';
import Center from './center/Center';
import styles from './RecipeDetails.module.scss';
import RightTray from '../../rightTray/rightTray.component';

const RecipeDetails = ({
  recipeData,
  nutritionData,
  nutritionState,
  setNutritionState,
  singleElement,
  setsingleElement,
  nutritionDataLoading = false,
}) => {
  const [counter, setCounter] = useState(1);

  return (
    <div style={{ margin: '40px auto' }}>
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
                />
              </div>
              <div className={styles.recipeDetailsContainer__contentDiv__right}>
                <RightTray
                  nutritionTrayData={nutritionData}
                  counter={counter}
                  nutritionState={nutritionState}
                  setNutritionState={setNutritionState}
                  nutritionDataLoading={nutritionDataLoading}
                  servingSize={parseInt(recipeData?.servingSize)}
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
