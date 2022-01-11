import React from "react";
import { Container, Grid } from "@mui/material";
import AContainer from "../../../containers/A.container";
import LeftSide from "./leftSide/LeftSide";
import RightSide from "./rightSide/RightSide";
import Center from "./center/Center";
import styles from "./RecipeDetails.module.scss";

const RecipeDetails = () => {
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
            <div
              className={
                styles.recipeDetailsContainer__contentDiv__centerRightDiv
              }
            >
              <div
                className={
                  styles.recipeDetailsContainer__contentDiv__centerRightDiv__center
                }
              >
                <Center />
              </div>
              <div
                className={
                  styles.recipeDetailsContainer__contentDiv__centerRightDiv__right
                }
              >
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
