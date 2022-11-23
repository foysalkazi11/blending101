import React, { useState } from "react";
import AContainer from "../../../containers/A.container";
import LeftSide from "./leftSide/LeftSide";
import Center from "./center/Center";
import NutritionPanel from "../share/nutritionPanel/NutritionPanel";
import styles from "../share/recipePageLayout/recipePageLayout.module.scss";
import useWindowSize from "../../utility/useWindowSize";
import FooterRecipeFilter from "../../footer/footerRecipeFilter.component";
import { useAppSelector } from "../../../redux/hooks";
import ShowRelatedItems from "../../showRelatedItems";
import { recommendedList } from "../fackData/recipeDetails";

const RecipeDetails = ({
  recipeData,
  nutritionData,
  nutritionState,
  setNutritionState,
  nutritionDataLoading = false,
  giGl,
}) => {
  const [counter, setCounter] = useState(1);
  const { width } = useWindowSize();

  const { openVersionTray } = useAppSelector((state) => state?.versionTray);

  return (
    <AContainer
      showHeader={true}
      logo={true}
      headerTitle="Recipe details"
      showCommentsTray={{
        show: true,
        showPanle: "right",
        showTagByDeafult: false,
      }}
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
      showGroceryTray={{
        show: openVersionTray ? false : true,
        showPanle: "right",
        showTagByDeafult: openVersionTray ? false : true,
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
            giGl={giGl}
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
      {width < 1280 ? (
        <ShowRelatedItems
          category="recipe"
          title="Related Recipes"
          itemsList={recommendedList}
        />
      ) : null}
      <FooterRecipeFilter />
    </AContainer>
  );
};

export default RecipeDetails;
