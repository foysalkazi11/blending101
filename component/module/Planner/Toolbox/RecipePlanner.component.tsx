import React, { useState } from "react";
import { format } from "date-fns";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import MealCalendarDatePlan from "../../../../theme/mealCalenderDatePlan/mealCalendarDatePlan.component";
import SeperatedButtonTray from "./recipesButtonTray/seperatedButtonTray.component";

import styles from "./RecipePlanner.module.scss";
import SharedHeader from "./SharedHeader.component";
import MealPlanner from "./MealPlanner.component";
import { MdRemoveCircleOutline } from "react-icons/md";
import CustomButton from "./customButtons/customButton.component";
import Icon from "../../../atoms/Icon/Icon.component";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../../../redux/hooks";

const RecipePlanner = (props) => {
  const { plannerList } = props;
  const [toggleOptionCard, setToggleOptionCard] = useState({});
  const planners = useAppSelector((state) => state.planner.planners);
  return (
    <div>
      <MealPlanner
        sharedStyle={{ border: "none" }}
        headerComponent={<RecipeMealHeader text="Meal Plan, Oct 5 - Oct 11" />}
      >
        <div className={styles.headings}>
          <li className={styles.headings__center}>Days</li>
          <li className={styles.headings__recipe}>Recipe</li>
          <li className={styles.headings__center}>Rx Score</li>
          <li className={styles.headings__center}>Calories</li>
          <li className={styles.headings__center}></li>
        </div>
        {/* @ts-ignore */}
        {planners?.map((planner, index) => {
          const { date, recipes } = planner;
          const days = new Date(date);
          const dayName = format(days, "E");
          const day = format(days, "d");
          return (
            <MealCalendarDatePlan
              key={date}
              plannerId={date}
              indexValue={index}
              day={dayName}
              date={day}
              recipeList={recipes}
              setToggleOptionCard={setToggleOptionCard}
              toggleOptionCard={toggleOptionCard}
            />
          );
        })}
      </MealPlanner>
    </div>
  );
};

interface RecipeMealHeader {
  text?: string;
}
const RecipeMealHeader = ({ text }: RecipeMealHeader) => {
  text = text || "";
  return (
    <div className={styles.mainContainer}>
      <div className={styles.textArrowTray}>
        <CustomButton
          text="Clear All"
          iconComponent={<MdRemoveCircleOutline />}
        />
        <AiOutlineLeft className={styles.textArrowTray__icon} />
        <h4 className={styles.textArrowTray__text}>{text}</h4>
        <AiOutlineRight className={styles.textArrowTray__icon} />
        <CustomButton
          text="Generate"
          iconComponent={<Icon fontName={faArrowsRotate} />}
        />
      </div>
    </div>
  );
};

interface RecipeMealPlanInterface {
  recipeList: Array<object>;
}
const RecipeMealPlan = ({ recipeList }: RecipeMealPlanInterface) => {
  const [toggleOptionCard, setToggleOptionCard] = useState({});

  return (
    <div>
      <SharedHeader title="Recipes" optionTray={<SeperatedButtonTray />} />

      <MealPlanner
        headerComponent={<RecipeMealHeader text="Meal Plan, Oct 5 - Oct 11" />}
      >
        {/* @ts-ignore */}
        {recipeList?.map(({ day, date, recipeList }, index) => (
          <MealCalendarDatePlan
            key={`${day} ${index}`}
            indexValue={index}
            day={day}
            date={date}
            recipeList={recipeList}
            setToggleOptionCard={setToggleOptionCard}
            toggleOptionCard={toggleOptionCard}
          />
        ))}
      </MealPlanner>
    </div>
  );
};

export { RecipePlanner, RecipeMealPlan };
