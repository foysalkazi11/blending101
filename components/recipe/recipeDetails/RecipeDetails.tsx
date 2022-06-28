import React, { useState } from "react";
import AContainer from "../../../containers/A.container";
import LeftSide from "./leftSide/LeftSide";
import Center from "./center/Center";
import NutritionPanel from "../share/nutritionPanel/NutritionPanel";
import styles from "../share/recipePageLayout/recipePageLayout.module.scss";
import useWindowSize from "../../utility/useWindowSize";
import RelatedRecipeSlider from "./leftSide/RelatedRecipeSlider";
import FooterRecipeFilter from "../../footer/footerRecipeFilter.component";

const RecipeDetails = ({
  recipeData,
  nutritionData,
  nutritionState,
  setNutritionState,
  nutritionDataLoading = false,
}) => {
  const [counter, setCounter] = useState(1);
  const { width } = useWindowSize();

  return (
    <AContainer
      showHeader={true}
      logo={true}
      headerTitle="Blend Recipe"
      showRighTray={true}
      commentsTray={true}
      showCollectionTray={{
        show: true,
        showTagByDeafult: false,
        showPanle: "left",
      }}
      showVersionTray={{
        show: true,
        showPanle: "right",
        showTagByDeafult: false,
      }}
    >
      <div className={styles.main}>
        <div className={styles.left}>
          <LeftSide />
        </div>

        <div className={styles.center}>
          <Center
            recipeData={recipeData}
            counter={counter}
            setCounter={setCounter}
            setNutritionState={setNutritionState}
            nutritionState={nutritionState}
          />
        </div>
        <div className={styles.right}>
          <NutritionPanel
            nutritionTrayData={nutritionData}
            counter={counter}
            nutritionState={nutritionState}
            setNutritionState={setNutritionState}
            nutritionDataLoading={nutritionDataLoading}
            servingSize={parseInt(recipeData?.servingSize || 0)}
            servings={recipeData?.servings}
          />
        </div>
      </div>
      {width < 1280 ? <RelatedRecipeSlider /> : null}
      <FooterRecipeFilter />
    </AContainer>
  );
};

export default RecipeDetails;
