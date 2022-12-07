import React, { useState } from "react";
import {
  faBookmark,
  faCalendarWeek,
  faMessageDots,
  faShareNodes,
} from "@fortawesome/pro-light-svg-icons";
import { faCalendarDays } from "@fortawesome/pro-solid-svg-icons";

import RXPanel from "../../../component/templates/Panel/RXFacts/RXPanel.component";
import PlanDiscovery from "../../../component/module/Planner/PlanDiscovery.component";
import PlanList from "../../../component/module/Planner/Plan/index.component";

import AContainer from "../../../containers/A.container";
import IconHeading from "../../../theme/iconHeading/iconHeading.component";

import Insights from "../../../component/module/Planner/Insights.component";
import Icon from "../../../component/atoms/Icon/Icon.component";
import { faSearch, faTimes } from "@fortawesome/pro-regular-svg-icons";
import { useRouter } from "next/router";

import styles from "../../../styles/pages/planner.module.scss";
import IconButton from "../../../component/atoms/Button/IconButton.component";

const MyPlan = () => {
  const [showGroceryTray] = useState(true);
  const router = useRouter();

  return (
    <AContainer
      headerTitle="MEAL PLAN"
      showGroceryTray={{
        show: showGroceryTray,
        showPanle: "right",
        showTagByDeafult: showGroceryTray,
      }}
    >
      <RXPanel />
      <div className={styles.windowContainer}>
        <div className={styles.planner}>
          <div className="row ai-center">
            <div className="col-4">
              <div className={styles.planner__pageTitle}>BLENDA COACH</div>
            </div>
            <div className="col-4 ta-center ">
              <button
                className={styles.discoveryBtn}
                onClick={() => {
                  router.push("/planner");
                }}
              >
                <Icon fontName={faSearch} size="2rem" className="mr-10" />
                Plan Discovery
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <PlanDiscovery isUpload={false} />
            </div>
            <div className="col-6" style={{ padding: "0 1.5rem" }}>
              <div className={styles.headingDiv}>
                <IconHeading title="My Plan" icon={faCalendarDays} />
                <div className="flex ai-center">
                  <div
                    className={`${styles.uploadDiv} ${styles.uploadDiv__save}`}
                  >
                    <span>Edit</span>
                  </div>
                  <IconButton
                    fontName={faTimes}
                    size="small"
                    variant="secondary"
                    className="ml-10"
                    onClick={() => router.push("/planner/plan")}
                  />
                </div>
              </div>
              <div className={styles.preview}>
                <h3 className={styles.preview__title}>
                  Diabetic Friendly Meal Plan
                </h3>
                <div className={styles.preview__actions}>
                  <span>
                    <img
                      src="/logo_small.svg"
                      alt=""
                      height={30}
                      className="mr-10"
                    />
                    Blending 101
                  </span>
                  <div>
                    <span>
                      <Icon
                        fontName={faCalendarWeek}
                        size="2rem"
                        className="mr-10"
                      />
                      Planner
                    </span>
                    <span>
                      <Icon
                        fontName={faBookmark}
                        size="2rem"
                        className="mr-10"
                      />
                      Planner
                    </span>
                    <span>
                      <Icon
                        fontName={faShareNodes}
                        size="2rem"
                        className="mr-10"
                      />
                      Planner
                    </span>
                    <span>
                      <Icon
                        fontName={faMessageDots}
                        size="2rem"
                        className="mr-10"
                      />
                      21
                    </span>
                  </div>
                </div>
                <hr />
                <p>
                  Great plan for building lean muscle. Seven tasty wholefood and
                  smoothie blends. All blends have at least 30 grams of protein.
                </p>
              </div>

              <div className={`${styles.plan} ${styles["plan--details"]}`}>
                <PlanList showStatic data={PLAN} />
              </div>
            </div>
            <div className="col-3">
              <Insights />
            </div>
          </div>
        </div>
      </div>
    </AContainer>
  );
};

export default MyPlan;

const PLAN = [
  {
    _id: "63844207dbe9a59fae359025",
    recipes: [
      {
        _id: "6373356aec53f6deda27a522",
        name: "Jhoy",
        recipeBlendCategory: {
          name: "WholeFood",
          __typename: "RecipeCategory",
        },
        ingredients: [
          {
            ingredientId: {
              _id: "620b6bce40d3f19b558f0bc1",
              __typename: "BlendIngredientData",
            },
            selectedPortion: {
              gram: 28,
              __typename: "SelectedPortion",
            },
            __typename: "IngredientData",
          },
        ],
        __typename: "Recipe",
      },
    ],
    formatedDate: "2022-11-30",
    __typename: "PlannerWithRecipes",
  },
];
