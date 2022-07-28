// @ts-nocheck
import React, { useEffect, useLayoutEffect } from "react";
import styles from "./Challenge.module.scss";
import foodStyles from "./food/food.module.scss";
import foodBoxStyles from "./food-box/food-box.module.scss";
import insideStyle from "./inside/inside.module.scss";
import profileStyles from "./profile/profile.module.scss";
import mainStyles from "./main/main.module.scss";
import dateStyles from "./single-date/single-date.module.scss";
import graphStyles from "./graph-detail-container/graph-detail-container.module.scss";
import Food from "./food/food.component";
import GraphDetailContainer from "./graph-detail-container/graph-detail-container.component";
import Main from "./main/main.component";

interface CircleComponentInterface {
  categoryObject?: object;
  activities: any[];
  activityDataList?: any[];
  startDate?: number;
  startMonth?:
    | "Jan"
    | "Feb"
    | "Mar"
    | "Apr"
    | "May"
    | "Jun"
    | "Jul"
    | "Aug"
    | "Sep"
    | "Oct"
    | "Nov"
    | "Dec";
  startYear?: number;
  profileImage?: string;
  numOfDaysChallenge?: number;
  blendValue?: number;
  totalBlendValue?: number;
}

const CircleComponent = ({
  activities,
  categoryObject,
  activityDataList,
  startDate,
  startMonth,
  startYear,
  numOfDaysChallenge,
  blendValue,
  totalBlendValue,
}: CircleComponentInterface) => {
  useEffect(() => {
    function handleResize() {
      const insideWidth = 0.82;
      // For Food
      let challengeCircleBox = document.querySelector(
        `.${styles.challenge_circle_box}`,
      );

      let challengeCircleFood = document.querySelector(
        `.${foodStyles.challenge_circle_food}`,
      );

      let challengeCircleFoodBoxList = document.querySelectorAll(
        `.${foodStyles.challenge_circle_food_box}`,
      );

      challengeCircleFood.style.width =
        challengeCircleBox.clientWidth * insideWidth + "px";
      // challengeCircleFood.style.marginBottom =
      //   challengeCircleBox.clientWidth * 0.02 + "px";
      challengeCircleFoodBoxList.forEach((challengeCircleFoodBox) => {
        let challengeCircleFoodColorRepresent =
          challengeCircleFoodBox?.querySelector(
            `.${foodStyles.challenge_circle_food_color_represent}`,
          );
        let challengeCircleFoodName = challengeCircleFoodBox?.querySelector(
          `.${foodStyles.challenge_circle_food_name}`,
        );
        challengeCircleFoodColorRepresent.style.width =
          challengeCircleFood.clientWidth / 13 + "px";
        // challengeCircleFoodName.style.fontSize =
        //   challengeCircleFood.clientWidth / 35 + "px";
        // challengeCircleFoodName.style.marginTop =
        //   challengeCircleFood.clientWidth / 60 + "px";
      });

      // For Circle
      let challengeCircleMainCircleOuter = document.querySelector(
        `.${mainStyles.challenge_circle_main_circle_outer}`,
      );

      let challengeCircleMainCircle = document.querySelector(
        `.${mainStyles.challenge_circle_main_circle}`,
      );

      let challengeCircleInsideCircle = document.querySelector(
        `.${insideStyle.challenge_circle_inside_circle}`,
      );
      let challengeCircleProfile = document.querySelector(
        `.${profileStyles.challenge_circle_profile}`,
      );
      let challengeCircleInsideDate = document.querySelector(
        `.${insideStyle.challenge_circle_inside_date}`,
      );
      let challengeCircleDayChallenge = document.querySelector(
        `.${insideStyle.challenge_circle_day_challenge}`,
      );
      let challengeCircleRemainingDay = document.querySelector(
        `.${insideStyle.challenge_circle_remaining_day}`,
      );
      let challengeCircleRemainingPercentage = document.querySelector(
        `.${insideStyle.challenge_circle_remaining_percentage}`,
      );
      let challengeCircleRemainingPercentageParagraph = document.querySelector(
        `.${insideStyle.challenge_circle_remaining_percentage_paragraph}`,
      );

      // if (!challengeCircleMainCircleOuter) return;
      challengeCircleMainCircleOuter.style.width =
        challengeCircleBox.clientWidth * insideWidth + "px";
      const cCMCOWidth = challengeCircleMainCircleOuter.clientWidth;

      challengeCircleMainCircle.style.width = cCMCOWidth * 0.85 + "px";
      challengeCircleInsideCircle.style.width = cCMCOWidth * 0.7 + "px";
      challengeCircleProfile.style.width = cCMCOWidth * 0.1 + "px";
      challengeCircleInsideDate.style.fontSize = cCMCOWidth * 0.035 + "px";
      challengeCircleInsideDate.style.marginTop = cCMCOWidth * 0.01 + "px";
      challengeCircleDayChallenge.style.fontSize = cCMCOWidth * 0.07 + "px";
      challengeCircleDayChallenge.style.marginTop = cCMCOWidth * 0.03 + "px";
      challengeCircleRemainingDay.style.fontSize = cCMCOWidth * 0.035 + "px";
      challengeCircleRemainingDay.style.borderRadius = cCMCOWidth * 0.1 + "px";
      challengeCircleRemainingDay.style.padding = `${cCMCOWidth * 0.01}px ${
        cCMCOWidth * 0.05
      }px`;
      challengeCircleRemainingDay.style.marginTop = cCMCOWidth * 0.03 + "px";
      challengeCircleRemainingPercentage.style.fontSize =
        cCMCOWidth * 0.06 + "px";
      challengeCircleRemainingPercentage.style.marginTop =
        cCMCOWidth * 0.01 + "px";
      challengeCircleRemainingPercentageParagraph.style.fontSize =
        cCMCOWidth * 0.038 + "px";
      challengeCircleRemainingPercentageParagraph.style.marginTop =
        cCMCOWidth * 0.005 + "px";

      // Ring Logic
      let circles = document.querySelectorAll(
        `.${dateStyles.challenge_circle_single_date}`,
      );
      let semiCircle = document.querySelector(
        `.${mainStyles.challenge_circle_semi_circle}`,
      );
      circles.forEach((circle) => {
        circle.style.fontSize = cCMCOWidth * 0.018 + "px";
        circle.style.width = cCMCOWidth * 0.075 + "px";
      });

      circles = [...circles, semiCircle];
      let angle = 360 - 25;
      let dangle = 357 / circles.length;
      let circle;
      for (let i = 0; i < circles.length; ++i) {
        circle = circles[i];
        angle += dangle;
        circle.style.transform = `rotate(${angle}deg) translate(${
          challengeCircleMainCircle.clientWidth / 2
        }px) rotate(-${angle}deg)`;
      }
      circle.style.transform = `rotate(${angle - 2}deg) translate(${
        challengeCircleMainCircle.clientWidth / 2
      }px) rotate(-${angle - 150}deg)`;
      semiCircle.style.width =
        (cCMCOWidth - challengeCircleInsideCircle.clientWidth) / 2 + 1 + "px";

      // For Graph Container
      let challengeCircleGraphData = document.querySelector(
        `.${graphStyles.challenge_circle_graph_data}`,
      );
      let challengeCircleNoOfDaysList = document.querySelectorAll(
        `.${graphStyles.challenge_circle_no_of_days}`,
      );
      let challengeCircleParagraphsList = document.querySelectorAll(
        `.${graphStyles.challenge_circle_paragraph}`,
      );
      let challengeCircleGraphBox = document.querySelector(
        `.${graphStyles.challenge_circle_graph_box}`,
      );

      challengeCircleGraphData.style.width =
        challengeCircleBox.clientWidth * insideWidth + "px";
      challengeCircleGraphData.style.marginTop =
        challengeCircleBox.clientWidth * 0.035 + "px";
      challengeCircleGraphData.style.marginBottom =
        challengeCircleBox.clientWidth * 0.09 + "px";

      challengeCircleNoOfDaysList.forEach((challengeCircleNoOfDays) => {
        challengeCircleNoOfDays.style.fontSize =
          challengeCircleGraphData.clientWidth * 0.04 + "px";
      });
      challengeCircleParagraphsList.forEach((challengeCircleParagraph) => {
        challengeCircleParagraph.style.fontSize =
          challengeCircleGraphData.clientWidth / 35 + "px";
        challengeCircleParagraph.style.marginTop =
          challengeCircleGraphData.clientWidth / 100 + "px";
      });
      challengeCircleGraphBox.style.margin = `0 ${
        challengeCircleGraphData.clientHeight * 0.2
      }px`;
      challengeCircleGraphBox.style.height =
        challengeCircleGraphData.clientHeight * 0.4 + "px";
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.mainContainer__contentDiv__innerDiv}>
      <div className={styles.mainContainer__contentDiv__innerDiv__challengeDiv}>
        {/* {activities && activities?.length !== 0 && ( */}
        <div className={styles.challenge_circle_box}>
          <Food categoryObject={categoryObject} />
          <Main
            activities={activities}
            activityDataList={activityDataList}
            numOfDaysChallenge={numOfDaysChallenge}
            blendValue={blendValue}
            totalBlendValue={totalBlendValue}
            startDate={startDate}
            startMonth={startMonth}
            startYear={startYear}
          />
          <GraphDetailContainer
            activities={activities}
            activityDataList={activityDataList}
            categoryObject={categoryObject}
            startDate={startDate}
            startMonth={startMonth}
            startYear={startYear}
          />
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default CircleComponent;
