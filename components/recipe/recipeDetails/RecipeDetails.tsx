import React, { useState } from "react";
import LeftSide from "./leftSide/LeftSide";
import Center from "./center/Center";
import NutritionPanel from "../share/nutritionPanel/NutritionPanel";
import styles from "../share/recipePageLayout/recipePageLayout.module.scss";
import useWindowSize from "../../utility/useWindowSize";
import { RecipeDetailsType } from "../../../type/recipeDetailsType";
import { GiGl } from "../../../type/nutrationType";
import Filtertray from "../../sidetray/filter";
import RecipeCommentsTray from "../../sidetray/commentsTray/RecipeCommentsTray";
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

  return (
    <React.Fragment>
      <Filtertray showPanle="left" showTagByDefaut={false} />
      <RecipeCommentsTray showPanle="right" showTagByDefaut={false} />
      <VersionTray showPanle="right" showTagByDefaut={false} />
      <CartPanel showPanle="right" showTagByDefaut={false} />
      <RecipeCollectionAndThemeTray showPanle="left" showTagByDefaut={false} />
      <div className={styles.main}>
        <div className={`${styles.left}`}>
          <LeftSide
            blendCategory={recipeData?.recipeId?.recipeBlendCategory?._id}
            sliderView={width ? (width > 1280 ? false : true) : false}
          />
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
      {/* <div className={`${width > 1280 ? "hidden" : "show_hidden"}`}>
        <LeftSide
          blendCategory={recipeData?.recipeId?.recipeBlendCategory?._id}
          sliderView={true}
        />
      </div> */}
    </React.Fragment>
  );
};

export default RecipeDetails;
