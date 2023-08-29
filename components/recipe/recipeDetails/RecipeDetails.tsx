import React, { useState } from "react";
import LeftSide from "./leftSide/LeftSide";
import Center from "./center/Center";
import NutritionPanel from "../share/nutritionPanel/NutritionPanel";
import styles from "../share/recipePageLayout/recipePageLayout.module.scss";
import useWindowSize from "../../utility/useWindowSize";
import { useAppSelector } from "../../../redux/hooks";
import ShowRelatedItems from "../../showRelatedItems";
import { recommendedList } from "../fackData/recipeDetails";
import { RecipeDetailsType } from "../../../type/recipeDetailsType";
import { GiGl } from "../../../type/nutrationType";
import Filtertray from "../../sidetray/filter";
import RecipeCommentsTray from "../../sidetray/commentsTray/RecipeCommentsTray";
import NotificationTray from "../../sidetray/notificationTray";
import VersionTray from "../../sidetray/versionTray/VersionTray";
import CartPanel from "../../../component/templates/Panel/CartPanel.component/Panel.component";
import RecipeCollectionAndThemeTray from "../../sidetray/collection/RecipeCollectionAndThemeTray";

interface Props {
  recipeData: RecipeDetailsType;
  nutritionData: any;
  nutritionState: any;
  setNutritionState: any;
  nutritionDataLoading: boolean;
  giGl: GiGl;
  pageComeFrom?: "edit" | "details";
}

const RecipeDetails = ({
  recipeData,
  nutritionData,
  nutritionState,
  setNutritionState,
  nutritionDataLoading = false,
  giGl,
  pageComeFrom,
}: Props) => {
  const [counter, setCounter] = useState(1);
  const { width } = useWindowSize();
  const { openVersionTray } = useAppSelector((state) => state?.versionTray);

  return (
    <React.Fragment>
      <Filtertray showPanle="left" showTagByDefaut={false} />
      <RecipeCommentsTray showPanle="right" showTagByDefaut={false} />
      <NotificationTray showPanle="right" showTagByDefaut={false} />
      <VersionTray showPanle="right" showTagByDefaut={false} />
      <CartPanel showPanle="right" showTagByDefaut={false} />
      <RecipeCollectionAndThemeTray showPanle="left" showTagByDefaut={false} />
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
            pageComeFrom={pageComeFrom}
          />
        </div>
        <div className={styles.right}>
          <NutritionPanel
            nutritionTrayData={nutritionData}
            counter={counter}
            nutritionState={nutritionState}
            setNutritionState={setNutritionState}
            nutritionDataLoading={nutritionDataLoading}
            servingSize={recipeData.tempVersionInfo?.version?.servingSize}
            servings={recipeData?.recipeId?.servings}
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
    </React.Fragment>
  );
};

export default RecipeDetails;
