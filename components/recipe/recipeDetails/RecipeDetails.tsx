import React from "react";
import AContainer from "../../../containers/A.container";
import LeftSide from "./leftSide/LeftSide";
import RightSide from "./rightSide/RightSide";
import Center from "./center/Center";
import styles from "./RecipeDetails.module.scss";

const RecipeDetails = ({ recipeData }) => {
  console.log(recipeData);
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
                <Center recipeData={recipeData} />
              </div>
              <div className={styles.recipeDetailsContainer__contentDiv__right}>
                <RightSide />
              </div>
            </div>
          </div>
        </div>
      </AContainer>
    </div>
  );
};

export default RecipeDetails;

// direction={{ xs: "column-reverse", xl: "row" }}
