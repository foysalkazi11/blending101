import React from "react";
import StickyBox from "react-sticky-box";

import RxScore from "component/molecules/Charts/RxScore.component";
import TopIngredients from "component/molecules/Charts/TopIngredients.component";

import BlendTrend from "component/molecules/Charts/BlendTrend.component";
import Calories from "component/molecules/Charts/Calories.component";
import MacroMakeup from "component/molecules/Charts/MacroMakeup.component";

import styles from "./Overview.module.scss";

const Overview = () => {
  return (
    <StickyBox offsetTop={0} offsetBottom={5}>
      <div className={styles.insights}>
        <div className={styles.insights__body}>
          <BlendTrend />
          <RxScore />
          <TopIngredients />
          <MacroMakeup />
          <Calories />
        </div>
      </div>
    </StickyBox>
  );
};

export default Overview;
